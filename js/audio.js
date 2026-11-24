/**
 * ============================================================================
 * PLAYFUL STORYBOOK WEB AUDIO ENGINE (No external audio files needed)
 * Warm marimba pops, gentle ocean chime, cork pop & glass jar rattle.
 * ============================================================================
 */

(function () {
  "use strict";

  class StorybookAudio {
    constructor() {
      this.ctx = null;
      this.muted = false;
      this.initialized = false;
    }

    ensure() {
      if (this.muted) return null;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!this.ctx) {
        this.ctx = new AC();
        this.initialized = true;
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    toggleMute() {
      this.muted = !this.muted;
      if (!this.muted) {
        this.ensure();
        this.playPop(560);
      }
      return !this.muted;
    }

    _tone(freq, dur, type, vol, delay = 0, slideTo = null) {
      const ctx = this.ensure();
      if (!ctx) return;
      const now = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, now);
      if (slideTo) {
        osc.frequency.exponentialRampToValueAtTime(slideTo, now + dur);
      }
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(vol, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    }

    playPop(baseFreq = 440) {
      this._tone(baseFreq, 0.12, "sine", 0.09, 0, baseFreq * 1.45);
    }

    playError() {
      this._tone(240, 0.14, "triangle", 0.08, 0, 185);
      this._tone(190, 0.16, "triangle", 0.07, 0.1, 155);
    }

    playWhaleChirp() {
      this._tone(360, 0.22, "sine", 0.08, 0, 580);
      this._tone(580, 0.26, "sine", 0.07, 0.14, 480);
    }

    playJarShake() {
      // Soft glass clinks + bubbly cork pop
      const notes = [880, 1046, 932, 1175];
      notes.forEach((n, i) => {
        this._tone(n, 0.07, "triangle", 0.045, i * 0.055, n * 1.06);
      });
      this._tone(320, 0.11, "sine", 0.09, 0.26, 690);
    }

    playCelebrate() {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((n, i) => {
        this._tone(n, 0.28, "sine", 0.08, i * 0.085);
      });
    }
  }

  window.StoryAudio = new StorybookAudio();
})();
