/**
 * ============================================================================
 * ULIL AZMI · 23RD BIRTHDAY FULL 3D SEQUENTIAL CONTROLLER (ENGLISH, ZERO ICONS)
 * Strict mandatory 5-step flow with realistic 3D Blue Whale, clean 14 Things,
 * 3D shakeable Wish Jar, 3D Envelope, and Final Page Soundtrack.
 * ============================================================================
 */

(function () {
  "use strict";

  const cfg = window.birthdayStoryConfig;
  if (!cfg) return;

  const state = {
    currentStep: 1,
    maxUnlockedStep: 1,
    wrongAttempts: 0,
    photoIndex: 0,
    seenPhotos: new Set([0]),
    discoveredThings: new Set(),
    selectedThingId: null,
    openedWishIds: [],
    activeWishId: null,
    isShaking: false,
    envelopeOpened: false,
    bgmPlaying: false,
    bgmIframe: null
  };

  function isMotionPaused() {
    return document.body.classList.contains("motion-paused") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function whaleSay(message) {
    const textEl = document.getElementById("whale-speech-text");
    const strip = document.getElementById("whale-guide-strip");
    if (textEl) textEl.textContent = message;
    if (strip && window.gsap && !isMotionPaused()) {
      window.gsap.fromTo(
        strip,
        { scale: 0.97, y: 4 },
        { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }

  function celebrate3D(count = 26) {
    if (window.BirthdayWorld3D) window.BirthdayWorld3D.celebrateWhale(count);
  }

  // --------------------------------------------------------------------------
  // FINAL PAGE BACKSOUND: HANNAH MONTANA BY REX ORANGE COUNTY (STEP 5 ONLY)
  // --------------------------------------------------------------------------
  function syncBgmButton() {
    const btn = document.getElementById("bgm-toggle-btn");
    const text = document.getElementById("bgm-toggle-text");
    const badge = document.querySelector(".soundtrack-badge");
    if (btn) btn.setAttribute("aria-pressed", String(state.bgmPlaying));
    if (text) text.textContent = state.bgmPlaying ? "Pause Music" : "Play Music";
    if (badge) badge.textContent = state.bgmPlaying ? "NOW PLAYING" : "PAUSED";
  }

  function postYouTubeCmd(funcName) {
    if (!state.bgmIframe || !state.bgmIframe.contentWindow) return;
    try {
      state.bgmIframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: funcName, args: "" }),
        "*"
      );
    } catch (e) {
      // Ignore cross-origin postMessage edge cases
    }
  }

  function startFinalBacksound() {
    const st = cfg.letter && cfg.letter.soundtrack;
    if (!st) return;

    const globalMuted = window.StoryAudio && window.StoryAudio.muted;
    if (globalMuted) {
      state.bgmPlaying = false;
      syncBgmButton();
      return;
    }

    const localAudio = document.getElementById("bgm-local-audio");
    const embedHost = document.getElementById("bgm-embed-host");

    if (st.useLocalAudio && localAudio && st.localAudioSrc) {
      if (!localAudio.src) localAudio.src = st.localAudioSrc;
      localAudio.volume = 0.55;
      localAudio.play().catch(() => {});
      state.bgmPlaying = true;
      syncBgmButton();
      return;
    }

    if (embedHost && st.youtubeId) {
      if (!state.bgmIframe) {
        const iframe = document.createElement("iframe");
        iframe.title = `${st.title} by ${st.artist}`;
        iframe.width = "1";
        iframe.height = "1";
        iframe.allow = "autoplay; encrypted-media";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.src =
          `https://www.youtube.com/embed/${encodeURIComponent(st.youtubeId)}` +
          `?autoplay=1&loop=1&playlist=${encodeURIComponent(st.youtubeId)}&enablejsapi=1&playsinline=1&rel=0`;
        embedHost.innerHTML = "";
        embedHost.appendChild(iframe);
        state.bgmIframe = iframe;
      } else {
        postYouTubeCmd("playVideo");
      }
      state.bgmPlaying = true;
      syncBgmButton();
    }
  }

  function pauseFinalBacksound() {
    const localAudio = document.getElementById("bgm-local-audio");
    if (localAudio && !localAudio.paused) localAudio.pause();
    postYouTubeCmd("pauseVideo");
    state.bgmPlaying = false;
    syncBgmButton();
  }

  function stopAndResetBacksound() {
    const localAudio = document.getElementById("bgm-local-audio");
    if (localAudio) {
      localAudio.pause();
      localAudio.currentTime = 0;
    }
    const embedHost = document.getElementById("bgm-embed-host");
    if (embedHost) embedHost.innerHTML = "";
    state.bgmIframe = null;
    state.bgmPlaying = false;
    syncBgmButton();
  }

  // --------------------------------------------------------------------------
  // MANDATORY 5-STEP SEQUENTIAL NAVIGATION
  // --------------------------------------------------------------------------
  function syncStepHeader() {
    document.querySelectorAll("[data-step-nav]").forEach((btn) => {
      const stepNum = Number(btn.getAttribute("data-step-nav"));
      const isCurrent = stepNum === state.currentStep;
      const isDone = stepNum < state.maxUnlockedStep || (stepNum === 5 && state.envelopeOpened);
      const isLocked = stepNum > state.maxUnlockedStep;

      btn.classList.toggle("is-current", isCurrent);
      btn.classList.toggle("is-done", isDone && !isCurrent);
      btn.classList.toggle("is-locked", isLocked);
      btn.disabled = isLocked;

      if (isCurrent) btn.setAttribute("aria-current", "step");
      else btn.removeAttribute("aria-current");
    });
  }

  function unlockUpTo(stepNum) {
    if (stepNum > state.maxUnlockedStep) {
      state.maxUnlockedStep = stepNum;
    }
    syncStepHeader();
  }

  function mountStep3DProp(stepNum) {
    const prop = window.BirthdayProp3D;
    if (!prop) return;

    if (stepNum === 1) {
      prop.mountInto("portal-3d-slot", "portal");
    } else if (stepNum === 4) {
      prop.mountInto("jar-3d-slot", "jar");
      prop.syncJarStars(state.openedWishIds.length);
    } else if (stepNum === 5 && !state.envelopeOpened) {
      prop.mountInto("envelope-3d-slot", "envelope");
    }
  }

  function goToStep(stepNum) {
    if (stepNum < 1 || stepNum > 5) return;
    if (stepNum > state.maxUnlockedStep) return;

    // Keep Hannah Montana playing strictly on Step 5
    if (state.currentStep === 5 && stepNum !== 5) {
      pauseFinalBacksound();
    }

    state.currentStep = stepNum;

    for (let i = 1; i <= 5; i++) {
      const el = document.getElementById(`step-${i}`);
      if (!el) continue;
      const active = i === stepNum;
      el.hidden = !active;
      el.classList.toggle("is-active", active);
    }

    syncStepHeader();
    if (window.BirthdayWorld3D) window.BirthdayWorld3D.setStepCamera(stepNum);

    requestAnimationFrame(() => mountStep3DProp(stepNum));
    window.scrollTo({ top: 0, behavior: isMotionPaused() ? "auto" : "smooth" });

    const activeSection = document.getElementById(`step-${stepNum}`);
    if (activeSection && window.gsap && !isMotionPaused()) {
      window.gsap.fromTo(
        activeSection,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" }
      );
    }

    if (stepNum === 1) {
      whaleSay(cfg.passcode.whaleIntro);
    } else if (stepNum === 2) {
      whaleSay(
        state.seenPhotos.size >= cfg.birthday.photos.length
          ? cfg.birthday.whaleDone
          : cfg.birthday.whaleGuide
      );
    } else if (stepNum === 3) {
      whaleSay(
        state.discoveredThings.size >= cfg.things.items.length
          ? cfg.things.whaleDone
          : cfg.things.whaleGuide
      );
    } else if (stepNum === 4) {
      whaleSay(
        state.openedWishIds.length >= cfg.jar.wishes.length
          ? cfg.jar.whaleDone
          : cfg.jar.whaleGuide
      );
    } else if (stepNum === 5) {
      whaleSay(state.envelopeOpened ? cfg.letter.whaleOpened : cfg.letter.whaleSealed);
      if (state.envelopeOpened) startFinalBacksound();
    }
  }

  // --------------------------------------------------------------------------
  // STEP 1: PASSCODE GATE
  // --------------------------------------------------------------------------
  function setupStep1() {
    const p = cfg.passcode;
    const sub = document.getElementById("passcode-subtitle");
    const hint = document.getElementById("passcode-hint");
    const input = document.getElementById("passcode-input");
    const form = document.getElementById("passcode-form");
    const feedback = document.getElementById("passcode-feedback");
    const submitBtn = document.getElementById("passcode-submit-btn");

    if (sub) sub.textContent = p.subtitle;
    if (hint) hint.textContent = p.hint;
    if (input) input.placeholder = p.placeholder;
    if (submitBtn) {
      const s = submitBtn.querySelector("span");
      if (s) s.textContent = p.buttonLabel;
    }

    const accepted = p.acceptedAnswers.map((a) => String(a).trim().toLowerCase());
    let opening = false;

    if (form && input) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (opening) return;

        const val = input.value.trim().toLowerCase();
        if (val && accepted.includes(val)) {
          opening = true;
          if (feedback) {
            feedback.textContent = "Passcode matched. Opening the gate now...";
            feedback.classList.add("is-success");
          }
          if (window.StoryAudio) window.StoryAudio.playCelebrate();
          if (window.BirthdayProp3D) window.BirthdayProp3D.pulsePortalUnlock();
          celebrate3D(30);
          whaleSay(p.whaleOpened);

          unlockUpTo(2);
          window.setTimeout(() => {
            goToStep(2);
            opening = false;
            input.value = "";
            if (feedback) {
              feedback.textContent = "";
              feedback.classList.remove("is-success");
            }
          }, 760);
        } else {
          const msg = p.wrongMessages[state.wrongAttempts % p.wrongMessages.length];
          state.wrongAttempts += 1;
          if (feedback) {
            feedback.textContent = msg;
            feedback.classList.remove("is-success");
          }
          form.classList.remove("shake-error");
          void form.offsetWidth;
          form.classList.add("shake-error");
          if (window.BirthdayProp3D) window.BirthdayProp3D.pulsePortalError();
          if (window.StoryAudio) window.StoryAudio.playError();
          whaleSay(msg);
          input.focus();
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // STEP 2: 3D TILTING REAL PHOTO DECK & 23RD BIRTHDAY GREETING
  // --------------------------------------------------------------------------
  function renderBirthdayPhoto(animateFlip = false) {
    const photos = cfg.birthday.photos;
    const item = photos[state.photoIndex];
    if (!item) return;

    const img = document.getElementById("birthday-photo-img");
    const tag = document.getElementById("birthday-photo-tag");
    const cap = document.getElementById("birthday-photo-caption");
    const counter = document.getElementById("photo-deck-counter");
    const card = document.getElementById("birthday-photo-deck");
    const progressLabel = document.getElementById("photo-progress-label");
    const progressFill = document.getElementById("photo-progress-fill");
    const nextBtn = document.getElementById("to-step-3-btn");
    const nextText = document.getElementById("to-step-3-text");

    if (img) {
      img.src = item.src;
      img.alt = `Ulil Azmi - ${item.tag}`;
      img.style.objectPosition = item.objectPosition || "50% 25%";
    }
    if (tag) tag.textContent = item.tag;
    if (cap) cap.textContent = item.caption;
    if (counter) counter.textContent = `${state.photoIndex + 1} / ${photos.length}`;

    const seenCount = state.seenPhotos.size;
    const total = photos.length;
    if (progressLabel) progressLabel.textContent = `Photos viewed: ${seenCount} / ${total}`;
    if (progressFill) progressFill.style.width = `${Math.round((seenCount / total) * 100)}%`;

    const allSeen = seenCount >= total;
    if (nextBtn) nextBtn.disabled = !allSeen;
    if (nextText) {
      nextText.textContent = allSeen
        ? "Continue to 14 Things"
        : `View all ${total} photos first (${seenCount}/${total})`;
    }

    if (animateFlip && card && window.gsap && !isMotionPaused()) {
      window.gsap.fromTo(
        card,
        { rotateY: -22, scale: 0.94 },
        { rotateY: 0, scale: 1, duration: 0.44, ease: "back.out(1.6)" }
      );
    }
  }

  function setupStep2() {
    const sub = document.getElementById("birthday-subtitle");
    if (sub) sub.textContent = cfg.birthday.subtitle;

    const deck = document.getElementById("birthday-photo-deck");
    const nextBtn = document.getElementById("to-step-3-btn");

    renderBirthdayPhoto(false);

    if (deck) {
      deck.addEventListener("pointermove", (e) => {
        if (isMotionPaused()) return;
        const rect = deck.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        deck.style.transform = `rotateY(${(nx * 8).toFixed(2)}deg) rotateX(${(-ny * 6).toFixed(2)}deg)`;
      });

      deck.addEventListener("pointerleave", () => {
        deck.style.transform = "";
      });

      deck.addEventListener("click", () => {
        const photos = cfg.birthday.photos;
        const wasDone = state.seenPhotos.size >= photos.length;

        state.photoIndex = (state.photoIndex + 1) % photos.length;
        state.seenPhotos.add(state.photoIndex);

        if (window.StoryAudio) window.StoryAudio.playPop(460 + state.photoIndex * 45);
        renderBirthdayPhoto(true);

        const nowDone = state.seenPhotos.size >= photos.length;
        if (!wasDone && nowDone) {
          unlockUpTo(3);
          if (window.StoryAudio) window.StoryAudio.playCelebrate();
          celebrate3D(28);
          whaleSay(cfg.birthday.whaleDone);
        } else if (!nowDone) {
          const left = photos.length - state.seenPhotos.size;
          whaleSay(`Photo ${state.photoIndex + 1} shown. Flip ${left} more ${left === 1 ? "photo" : "photos"} to continue.`);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (state.seenPhotos.size < cfg.birthday.photos.length) return;
        if (window.StoryAudio) window.StoryAudio.playPop(560);
        unlockUpTo(3);
        goToStep(3);
      });
    }
  }

  // --------------------------------------------------------------------------
  // STEP 3: 14 THINGS (CLEAN TEXT CARDS, NO OBJECT GRAPHICS)
  // --------------------------------------------------------------------------
  function syncThingsProgress() {
    const total = cfg.things.items.length;
    const count = state.discoveredThings.size;

    const countText = document.getElementById("things-count-text");
    const fill = document.getElementById("things-progress-fill");
    const nextBtn = document.getElementById("to-step-4-btn");
    const nextText = document.getElementById("to-step-4-text");

    if (countText) countText.textContent = `${count} / ${total} opened`;
    if (fill) fill.style.width = `${Math.round((count / total) * 100)}%`;

    const done = count >= total;
    if (nextBtn) nextBtn.disabled = !done;
    if (nextText) {
      nextText.textContent = done
        ? "Continue to 3D Wish Jar"
        : `Open all ${total} items first (${count}/${total})`;
    }
  }

  function setupStep3() {
    const sub = document.getElementById("things-subtitle");
    const grid = document.getElementById("things-grid");
    const nextBtn = document.getElementById("to-step-4-btn");

    if (sub) sub.textContent = cfg.things.subtitle;

    if (grid) {
      grid.innerHTML = "";
      cfg.things.items.forEach((item, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `thing-pill-3d tint-${item.tint}`;
        btn.setAttribute("role", "listitem");
        btn.setAttribute("data-thing-id", item.id);

        const num = String(idx + 1).padStart(2, "0");
        btn.innerHTML = `<span class="thing-num-tag">${num}</span><span>${item.label}</span>`;

        btn.addEventListener("click", () => {
          const wasDone = state.discoveredThings.size >= cfg.things.items.length;
          state.discoveredThings.add(item.id);
          state.selectedThingId = item.id;

          grid.querySelectorAll(".thing-pill-3d").forEach((el) => {
            const id = el.getAttribute("data-thing-id");
            el.classList.toggle("is-discovered", state.discoveredThings.has(id));
            el.classList.toggle("is-selected", id === item.id);
          });

          const spotCard = document.getElementById("thing-spotlight");
          const kEl = document.getElementById("spotlight-kicker");
          const tEl = document.getElementById("spotlight-title");
          const nEl = document.getElementById("spotlight-note");

          if (kEl) kEl.textContent = `Item ${num} of ${cfg.things.items.length}`;
          if (tEl) tEl.textContent = item.label;
          if (nEl) nEl.textContent = item.note;

          if (spotCard && window.gsap && !isMotionPaused()) {
            window.gsap.fromTo(
              spotCard,
              { scale: 0.97, y: 6 },
              { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
            );
          }

          if (window.StoryAudio) window.StoryAudio.playPop(420 + (idx % 7) * 42);
          syncThingsProgress();

          const nowDone = state.discoveredThings.size >= cfg.things.items.length;
          if (!wasDone && nowDone) {
            unlockUpTo(4);
            if (window.StoryAudio) window.StoryAudio.playCelebrate();
            celebrate3D(34);
            whaleSay(cfg.things.whaleDone);
          } else {
            whaleSay(item.whaleSay);
          }
        });

        grid.appendChild(btn);
      });
    }

    syncThingsProgress();

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (state.discoveredThings.size < cfg.things.items.length) return;
        if (window.StoryAudio) window.StoryAudio.playPop(580);
        unlockUpTo(4);
        goToStep(4);
      });
    }
  }

  // --------------------------------------------------------------------------
  // STEP 4: REAL 3D SHAKEABLE WISH JAR
  // --------------------------------------------------------------------------
  function renderWishDisplay(wish) {
    const card = document.getElementById("active-wish-card");
    const tag = document.getElementById("wish-card-tag");
    const title = document.getElementById("wish-card-title");
    const body = document.getElementById("wish-card-body");

    if (!wish) return;
    state.activeWishId = wish.id;

    if (tag) {
      tag.textContent = wish.tag;
      tag.style.background = wish.pastel;
      tag.style.color = "#18222C";
    }
    if (title) title.textContent = wish.title;
    if (body) body.textContent = wish.body;
    if (card) {
      card.style.borderColor = wish.color;
      if (window.gsap && !isMotionPaused()) {
        window.gsap.fromTo(
          card,
          { scale: 0.96, y: 10, opacity: 0.6 },
          { scale: 1, y: 0, opacity: 1, duration: 0.36, ease: "back.out(1.6)" }
        );
      }
    }

    document.querySelectorAll(".wish-chip-btn").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-wish-id") === wish.id);
    });
  }

  function syncJarUI() {
    const total = cfg.jar.wishes.length;
    const count = state.openedWishIds.length;

    const shakeLabel = document.getElementById("shake-jar-label");
    const shakeBtn = document.getElementById("shake-jar-btn");
    const countBadge = document.getElementById("wishes-count-badge");
    const list = document.getElementById("collected-wishes-list");
    const nextBtn = document.getElementById("to-step-5-btn");
    const nextText = document.getElementById("to-step-5-text");

    if (countBadge) countBadge.textContent = `${count} / ${total}`;
    if (shakeLabel) {
      shakeLabel.textContent = count >= total
        ? "All 6 Wishes Collected"
        : `Shake the Jar (${count} / ${total})`;
    }
    if (shakeBtn) shakeBtn.disabled = count >= total;

    if (window.BirthdayProp3D) window.BirthdayProp3D.syncJarStars(count);

    if (list) {
      list.innerHTML = "";
      if (count === 0) {
        const empty = document.createElement("span");
        empty.className = "collected-empty-note";
        empty.textContent = "No wishes out yet. Shake the 3D jar to release the first star.";
        list.appendChild(empty);
      } else {
        state.openedWishIds.forEach((wid, idx) => {
          const w = cfg.jar.wishes.find((x) => x.id === wid);
          if (!w) return;
          const chip = document.createElement("button");
          chip.type = "button";
          chip.className = `wish-chip-btn${state.activeWishId === w.id ? " is-active" : ""}`;
          chip.setAttribute("data-wish-id", w.id);
          chip.textContent = `Wish 0${idx + 1}`;
          chip.addEventListener("click", () => {
            if (window.StoryAudio) window.StoryAudio.playPop(520);
            renderWishDisplay(w);
          });
          list.appendChild(chip);
        });
      }
    }

    const done = count >= total;
    if (nextBtn) nextBtn.disabled = !done;
    if (nextText) {
      nextText.textContent = done
        ? "Open the Main Letter"
        : `Collect all ${total} wishes first (${count}/${total})`;
    }
  }

  function triggerJarShake() {
    const wishes = cfg.jar.wishes;
    if (state.isShaking) return;
    if (state.openedWishIds.length >= wishes.length) {
      whaleSay(cfg.jar.whaleDone);
      return;
    }

    state.isShaking = true;
    const nextIndex = state.openedWishIds.length;
    const nextWish = wishes[nextIndex];

    if (window.StoryAudio) window.StoryAudio.playJarShake();

    const finishReveal = () => {
      state.openedWishIds.push(nextWish.id);
      syncJarUI();
      renderWishDisplay(nextWish);
      state.isShaking = false;

      if (state.openedWishIds.length >= wishes.length) {
        unlockUpTo(5);
        if (window.StoryAudio) window.StoryAudio.playCelebrate();
        celebrate3D(36);
        whaleSay(cfg.jar.whaleDone);
      } else {
        whaleSay(nextWish.whaleSay);
      }
    };

    if (window.BirthdayProp3D) {
      window.BirthdayProp3D.animateJarShake3D(nextIndex, finishReveal);
    } else {
      finishReveal();
    }
  }

  function setupStep4() {
    const sub = document.getElementById("jar-subtitle");
    if (sub) sub.textContent = cfg.jar.subtitle;

    const jarZone = document.getElementById("jar-interactive-zone");
    const shakeBtn = document.getElementById("shake-jar-btn");
    const nextBtn = document.getElementById("to-step-5-btn");

    syncJarUI();

    if (shakeBtn) shakeBtn.addEventListener("click", triggerJarShake);

    if (jarZone) {
      let dragging = false;
      let startX = 0;
      let dragTravel = 0;
      let didDragShake = false;

      jarZone.addEventListener("pointerdown", (e) => {
        dragging = true;
        startX = e.clientX;
        dragTravel = 0;
        didDragShake = false;
      });

      jarZone.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        dragTravel += Math.abs(dx);
        startX = e.clientX;
        if (dragTravel >= 48 && !state.isShaking) {
          didDragShake = true;
          dragging = false;
          triggerJarShake();
        }
      });

      const stopDrag = () => { dragging = false; };
      jarZone.addEventListener("pointerup", stopDrag);
      jarZone.addEventListener("pointercancel", stopDrag);

      jarZone.addEventListener("click", () => {
        if (didDragShake) {
          didDragShake = false;
          return;
        }
        triggerJarShake();
      });

      jarZone.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerJarShake();
        }
      });
    }

    if (window.DeviceMotionEvent) {
      let lastShake = 0;
      window.addEventListener("devicemotion", (e) => {
        if (state.currentStep !== 4 || state.isShaking) return;
        const acc = e.accelerationIncludingGravity;
        if (!acc) return;
        const mag = Math.abs(acc.x || 0) + Math.abs(acc.y || 0) + Math.abs(acc.z || 0);
        const now = Date.now();
        if (mag > 28 && now - lastShake > 1000) {
          lastShake = now;
          triggerJarShake();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (state.openedWishIds.length < cfg.jar.wishes.length) return;
        if (window.StoryAudio) window.StoryAudio.playPop(620);
        unlockUpTo(5);
        goToStep(5);
      });
    }
  }

  // --------------------------------------------------------------------------
  // STEP 5: 3D SEALED ENVELOPE, HANNAH MONTANA SOUNDTRACK & MAIN LETTER
  // --------------------------------------------------------------------------
  function setupStep5() {
    const l = cfg.letter;
    const hint = document.getElementById("envelope-hint");
    const dateLine = document.getElementById("letter-date-line");
    const salutation = document.getElementById("letter-salutation");
    const bodyWrap = document.getElementById("letter-body-paragraphs");
    const closing = document.getElementById("letter-closing");
    const signature = document.getElementById("letter-signature");
    const openBtn = document.getElementById("open-envelope-btn");
    const envCard = document.getElementById("envelope-3d-card");
    const envStage = document.getElementById("envelope-stage");
    const letterCard = document.getElementById("letter-opened-card");
    const replayBtn = document.getElementById("replay-journey-btn");
    const bgmToggleBtn = document.getElementById("bgm-toggle-btn");
    const stTitle = document.getElementById("soundtrack-title-text");
    const stLink = document.getElementById("bgm-youtube-link");

    if (hint) hint.textContent = l.envelopeHint;
    if (dateLine) dateLine.textContent = l.dateLine;
    if (salutation) salutation.textContent = l.salutation;
    if (closing) closing.textContent = l.closing;
    if (signature) signature.textContent = l.signature;
    if (stTitle && l.soundtrack) stTitle.textContent = `${l.soundtrack.title} by ${l.soundtrack.artist}`;
    if (stLink && l.soundtrack && l.soundtrack.youtubeUrl) stLink.href = l.soundtrack.youtubeUrl;

    if (bodyWrap) {
      bodyWrap.innerHTML = "";
      l.paragraphs.forEach((pText) => {
        const p = document.createElement("p");
        p.textContent = pText;
        bodyWrap.appendChild(p);
      });
    }

    if (bgmToggleBtn) {
      bgmToggleBtn.addEventListener("click", () => {
        if (state.bgmPlaying) {
          pauseFinalBacksound();
        } else {
          // Unmute global audio if muted when user explicitly hits Play Music
          if (window.StoryAudio && window.StoryAudio.muted) {
            window.StoryAudio.muted = false;
            const audioBtn = document.getElementById("audio-toggle-btn");
            const audioText = document.getElementById("audio-toggle-text");
            if (audioBtn) audioBtn.setAttribute("aria-pressed", "true");
            if (audioText) audioText.textContent = "Sound";
          }
          startFinalBacksound();
        }
      });
    }

    let openingEnvelope = false;
    const openEnvelope = () => {
      if (openingEnvelope || state.envelopeOpened) return;
      openingEnvelope = true;
      if (window.StoryAudio) window.StoryAudio.playCelebrate();
      celebrate3D(46);

      // Trigger final soundtrack directly inside the user click gesture!
      startFinalBacksound();

      const revealLetter = () => {
        state.envelopeOpened = true;
        openingEnvelope = false;
        if (envStage) envStage.hidden = true;
        if (letterCard) letterCard.hidden = false;
        syncStepHeader();
        whaleSay(l.whaleOpened);

        if (letterCard && window.gsap && !isMotionPaused()) {
          window.gsap.fromTo(
            letterCard,
            { opacity: 0, y: 24, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" }
          );
        }
      };

      if (window.BirthdayProp3D) {
        window.BirthdayProp3D.animateEnvelopeOpen3D(revealLetter);
      } else {
        revealLetter();
      }
    };

    if (openBtn) openBtn.addEventListener("click", openEnvelope);
    if (envCard) {
      envCard.addEventListener("click", openEnvelope);
      envCard.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openEnvelope();
        }
      });
    }

    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        stopAndResetBacksound();

        state.currentStep = 1;
        state.maxUnlockedStep = 1;
        state.wrongAttempts = 0;
        state.photoIndex = 0;
        state.seenPhotos = new Set([0]);
        state.discoveredThings.clear();
        state.selectedThingId = null;
        state.openedWishIds = [];
        state.activeWishId = null;
        state.envelopeOpened = false;

        if (envStage) envStage.hidden = false;
        if (letterCard) letterCard.hidden = true;

        renderBirthdayPhoto(false);
        document.querySelectorAll(".thing-pill-3d").forEach((el) => {
          el.classList.remove("is-discovered", "is-selected");
        });
        const kEl = document.getElementById("spotlight-kicker");
        const tEl = document.getElementById("spotlight-title");
        const nEl = document.getElementById("spotlight-note");
        if (kEl) kEl.textContent = "Pick any of the 14 items below";
        if (tEl) tEl.textContent = "Tap an item to read its note";
        if (nEl) nEl.textContent = "Each tile holds a short note on why it reminds me of Ulil Azmi.";
        syncThingsProgress();

        const wTag = document.getElementById("wish-card-tag");
        const wTitle = document.getElementById("wish-card-title");
        const wBody = document.getElementById("wish-card-body");
        const wCard = document.getElementById("active-wish-card");
        if (wTag) {
          wTag.textContent = "Ready to shake";
          wTag.style.background = "";
          wTag.style.color = "";
        }
        if (wTitle) wTitle.textContent = "Shake the 3D jar to release your first wish";
        if (wBody) wBody.textContent = "Each shake pops the cork and sends out one 3D star carrying a wish for your 23rd year.";
        if (wCard) wCard.style.borderColor = "";
        syncJarUI();

        if (window.StoryAudio) window.StoryAudio.playPop(520);
        goToStep(1);
      });
    }
  }

  // --------------------------------------------------------------------------
  // GLOBAL BAR & WHALE COMPANION CONTROLS
  // --------------------------------------------------------------------------
  function setupGlobalControls() {
    document.querySelectorAll("[data-step-nav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = Number(btn.getAttribute("data-step-nav"));
        if (target <= state.maxUnlockedStep && target !== state.currentStep) {
          if (window.StoryAudio) window.StoryAudio.playPop(480);
          goToStep(target);
        }
      });
    });

    const audioBtn = document.getElementById("audio-toggle-btn");
    const audioText = document.getElementById("audio-toggle-text");
    if (audioBtn) {
      audioBtn.addEventListener("click", () => {
        const isOn = window.StoryAudio ? window.StoryAudio.toggleMute() : false;
        audioBtn.setAttribute("aria-pressed", String(isOn));
        if (audioText) audioText.textContent = isOn ? "Sound" : "Muted";
        if (!isOn) {
          pauseFinalBacksound();
        } else if (state.currentStep === 5 && state.envelopeOpened) {
          startFinalBacksound();
        }
      });
    }

    const motionBtn = document.getElementById("motion-toggle-btn");
    const motionText = document.getElementById("motion-toggle-text");
    if (motionBtn) {
      motionBtn.addEventListener("click", () => {
        const paused = !document.body.classList.contains("motion-paused");
        document.body.classList.toggle("motion-paused", paused);
        if (window.BirthdayWorld3D) window.BirthdayWorld3D.setPaused(paused);
        if (window.BirthdayProp3D) window.BirthdayProp3D.setPaused(paused);
        motionBtn.setAttribute("aria-pressed", String(paused));
        if (motionText) motionText.textContent = paused ? "Calm" : "3D On";
      });
    }

    const guideBtn = document.getElementById("whale-guide-strip");
    if (guideBtn) {
      const tips = {
        1: "Hint from your whale: type your age today or your favorite colour.",
        2: "Tap the 3D photo card to flip through all six photos of Ulil Azmi.",
        3: "Tap every item below to read why it reminds me of Ulil Azmi.",
        4: "Drag left and right on the 3D glass jar, tap it, or press Shake until all six stars pop out.",
        5: "Happy 23rd birthday, Ulil Azmi. Enjoy Hannah Montana while reading your letter."
      };
      guideBtn.addEventListener("click", () => {
        if (window.StoryAudio) window.StoryAudio.playWhaleChirp();
        celebrate3D(12);
        whaleSay(tips[state.currentStep] || "Your blue whale guide is right here.");
      });
    }
  }

  function boot() {
    if (window.BirthdayWorld3D) window.BirthdayWorld3D.init();
    if (window.BirthdayProp3D) window.BirthdayProp3D.init();

    setupGlobalControls();
    setupStep1();
    setupStep2();
    setupStep3();
    setupStep4();
    setupStep5();
    goToStep(1);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
