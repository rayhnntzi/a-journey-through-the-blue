/**
 * ============================================================================
 * A JOURNEY THROUGH THE BLUE : PERSISTENT UNDERWATER AUDIO ENGINE
 * ============================================================================
 * - Starts only after explicit user interaction (never autoplays).
 * - Persists seamlessly across all scenes and chapters without restarting.
 * - Uses custom audio files from birthdayConfig.audio if provided, otherwise
 *   generates a gentle procedural underwater soundscape via Web Audio API.
 * ============================================================================
 */

(function () {
  "use strict";

  const ICON_ON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
  const ICON_OFF = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';

  class OceanAudioEngine {
    constructor() {
      this.ctx = null;
      this.masterGain = null;
      this.ambientGain = null;
      this.sfxGain = null;

      this.isInitialized = false;
      this.isEnabled = false;
      this.volume = (window.birthdayConfig && window.birthdayConfig.audio && window.birthdayConfig.audio.defaultVolume) || 0.42;

      this.customAmbientEl = null;
      this.customCurrentEl = null;
      this.chordTimer = null;
      this.chordIndex = 0;

      this.chords = [
        [146.83, 220.0, 277.18, 329.63, 440.0],
        [130.81, 196.0, 246.94, 293.66, 392.0],
        [123.47, 185.0, 220.0, 293.66, 369.99],
        [110.0, 164.81, 220.0, 277.18, 329.63]
      ];
    }

    initOnUserGesture(autoEnable = true) {
      if (this.isInitialized) {
        if (this.ctx && this.ctx.state === "suspended" && this.isEnabled) {
          this.ctx.resume().catch(() => {});
        }
        return;
      }

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      try {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.0001;
        this.masterGain.connect(this.ctx.destination);

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.value = 0.55;
        this.ambientGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = 0.85;
        this.sfxGain.connect(this.masterGain);

        this.isInitialized = true;
        this._setupAmbientSource();

        if (autoEnable) {
          this.setEnabled(true);
        }
      } catch (err) {
        // AudioContext unavailable; remain silent gracefully
      }
    }

    _setupAmbientSource() {
      const cfg = (window.birthdayConfig && window.birthdayConfig.audio) || {};

      if (cfg.ambientMusic && cfg.ambientMusic.trim()) {
        this.customAmbientEl = new Audio(cfg.ambientMusic);
        this.customAmbientEl.loop = true;
        this.customAmbientEl.volume = this.volume * 0.7;
        this.customAmbientEl.addEventListener("error", () => {
          this.customAmbientEl = null;
          this._startProceduralAmbient();
        });
      } else {
        this._startProceduralAmbient();
      }

      if (cfg.oceanCurrent && cfg.oceanCurrent.trim()) {
        this.customCurrentEl = new Audio(cfg.oceanCurrent);
        this.customCurrentEl.loop = true;
        this.customCurrentEl.volume = this.volume * 0.4;
      } else {
        this._startOceanCurrentNoise();
      }
    }

    _startOceanCurrentNoise() {
      if (!this.ctx || !this.ambientGain) return;
      const sampleRate = this.ctx.sampleRate;
      const length = sampleRate * 4;
      const buffer = this.ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      let lastOut = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 2.4;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 280;
      filter.Q.value = 0.7;

      const lfo = this.ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.11;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 110;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const currentGain = this.ctx.createGain();
      currentGain.gain.value = 0.24;

      noise.connect(filter);
      filter.connect(currentGain);
      currentGain.connect(this.ambientGain);

      noise.start();
      lfo.start();
    }

    _startProceduralAmbient() {
      if (!this.ctx || !this.ambientGain) return;
      const triggerChord = () => {
        if (!this.ctx || !this.isEnabled) return;
        const now = this.ctx.currentTime;
        const freqs = this.chords[this.chordIndex % this.chords.length];
        this.chordIndex += 1;

        freqs.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.value = freq;
          osc.detune.value = (idx - 2) * 3.5;

          filter.type = "lowpass";
          filter.frequency.value = 680;

          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(0.036 / (1 + idx * 0.15), now + 3.4);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 10.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ambientGain);

          osc.start(now);
          osc.stop(now + 10.5);
        });
      };

      triggerChord();
      this.chordTimer = window.setInterval(triggerChord, 8600);
    }

    setEnabled(enabled) {
      if (!this.isInitialized && enabled) {
        this.initOnUserGesture(false);
      }
      this.isEnabled = Boolean(enabled);

      if (this.ctx) {
        if (this.isEnabled) {
          this.ctx.resume().catch(() => {});
        }
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setTargetAtTime(this.isEnabled ? this.volume : 0.0001, now, 0.25);
      }

      if (this.customAmbientEl) {
        if (this.isEnabled) {
          this.customAmbientEl.volume = this.volume * 0.7;
          this.customAmbientEl.play().catch(() => {});
        } else {
          this.customAmbientEl.pause();
        }
      }

      if (this.customCurrentEl) {
        if (this.isEnabled) {
          this.customCurrentEl.volume = this.volume * 0.4;
          this.customCurrentEl.play().catch(() => {});
        } else {
          this.customCurrentEl.pause();
        }
      }

      this._syncUI();
    }

    toggle() {
      this.setEnabled(!this.isEnabled);
    }

    setVolume(val) {
      this.volume = Math.max(0, Math.min(1, Number(val)));
      if (this.ctx && this.masterGain && this.isEnabled) {
        this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.08);
      }
      if (this.customAmbientEl) this.customAmbientEl.volume = this.volume * 0.7;
      if (this.customCurrentEl) this.customCurrentEl.volume = this.volume * 0.4;
      if (this.volume > 0 && !this.isEnabled && this.isInitialized) {
        this.setEnabled(true);
      }
      this._syncUI();
    }

    _syncUI() {
      const btn = document.getElementById("hud-audio-toggle");
      const glyph = document.getElementById("audio-icon-glyph");
      const slider = document.getElementById("hud-volume-slider");
      const active = this.isEnabled && this.volume > 0;
      if (btn) btn.setAttribute("aria-pressed", String(active));
      if (glyph) glyph.innerHTML = active ? ICON_ON : ICON_OFF;
      if (slider) slider.value = String(this.volume);
    }

    playBubble() {
      const cfg = (window.birthdayConfig && window.birthdayConfig.audio) || {};
      if (cfg.bubbleSfx && this.isEnabled) {
        const a = new Audio(cfg.bubbleSfx);
        a.volume = this.volume * 0.55;
        a.play().catch(() => {});
        return;
      }
      if (!this.ctx || !this.isEnabled) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const base = 360 + Math.random() * 240;

      osc.type = "sine";
      osc.frequency.setValueAtTime(base, now);
      osc.frequency.exponentialRampToValueAtTime(base * 2.15, now + 0.14);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.11, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.18);
    }

    playChime(pitchMult = 1) {
      if (!this.ctx || !this.isEnabled) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = f * pitchMult;

        const t = now + idx * 0.055;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.055 / (idx + 1), t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 1.15);
      });
    }

    playWhaleSong() {
      if (!this.ctx || !this.isEnabled) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(165, now);
      osc.frequency.exponentialRampToValueAtTime(248, now + 0.55);
      osc.frequency.exponentialRampToValueAtTime(142, now + 1.65);

      filter.type = "lowpass";
      filter.frequency.value = 460;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.11, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.85);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 1.9);
    }

    playTransition() {
      const cfg = (window.birthdayConfig && window.birthdayConfig.audio) || {};
      if (cfg.transitionSfx && this.isEnabled) {
        const a = new Audio(cfg.transitionSfx);
        a.volume = this.volume * 0.5;
        a.play().catch(() => {});
        return;
      }
      if (!this.ctx || !this.isEnabled) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.85);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.075, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.95);
    }

    playUnlock() {
      if (!this.ctx || !this.isEnabled) return;
      const now = this.ctx.currentTime;
      const arp = [293.66, 369.99, 440.0, 587.33, 739.99, 880.0];
      arp.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;

        const t = now + i * 0.11;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.075, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 1.9);
      });
    }
  }

  window.OceanAudio = new OceanAudioEngine();
})();
