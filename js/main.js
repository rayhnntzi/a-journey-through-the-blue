/**
 * ============================================================================
 * A JOURNEY THROUGH THE BLUE : MAIN ORCHESTRATOR & SECRET GATE EXPERIENCE
 * ============================================================================
 */

(function () {
  "use strict";

  let wrongAttemptCount = 0;

  function applyConfigThemeAndCopy() {
    const cfg = window.birthdayConfig;
    if (!cfg) return;

    if (cfg.theme) {
      const root = document.documentElement.style;
      if (cfg.theme.deepNavy) root.setProperty("--deep-navy", cfg.theme.deepNavy);
      if (cfg.theme.midnightBlue) root.setProperty("--midnight-blue", cfg.theme.midnightBlue);
      if (cfg.theme.oceanBlue) root.setProperty("--ocean-blue", cfg.theme.oceanBlue);
      if (cfg.theme.royalBlue) root.setProperty("--royal-blue", cfg.theme.royalBlue);
      if (cfg.theme.softCyan) root.setProperty("--soft-cyan", cfg.theme.softCyan);
      if (cfg.theme.iceBlue) root.setProperty("--ice-blue", cfg.theme.iceBlue);
      if (cfg.theme.white) root.setProperty("--white", cfg.theme.white);
      if (cfg.theme.warmAccent) root.setProperty("--warm-accent", cfg.theme.warmAccent);
    }

    document.title = cfg.siteTitle || "A JOURNEY THROUGH THE BLUE";

    const gateHeading = document.getElementById("gate-heading");
    const gateIntro = document.getElementById("gate-intro-text");
    const gateQuestion = document.getElementById("gate-question-label");
    const gateInput = document.getElementById("gate-answer-input");
    const gateBtn = document.getElementById("gate-unlock-btn");

    if (gateHeading) gateHeading.textContent = cfg.siteTitle || "A Journey Through The Blue";
    if (gateIntro && cfg.verification) gateIntro.textContent = cfg.verification.introText;
    if (gateQuestion && cfg.verification) gateQuestion.textContent = cfg.verification.question;
    if (gateInput && cfg.verification) gateInput.placeholder = cfg.verification.inputPlaceholder || "Type your answer...";
    if (gateBtn && cfg.verification) {
      const span = gateBtn.querySelector("span");
      if (span) span.textContent = cfg.verification.unlockButtonText || "Unlock the Ocean";
    }

    const welcomeHeading = document.getElementById("welcome-heading");
    const welcomeSub = document.getElementById("welcome-subtitle");
    const welcomeTagline = document.getElementById("welcome-tagline");
    const welcomeBadge = document.getElementById("welcome-date-badge");
    const startBtn = document.getElementById("start-journey-btn");

    if (welcomeHeading && cfg.welcome && cfg.welcome.title) {
      const rawTitle = String(cfg.welcome.title).trim();
      const blueMatch = rawTitle.match(/^(.*?)\s+(the\s+blue\.?)$/i);
      if (blueMatch) {
        welcomeHeading.textContent = "";
        welcomeHeading.appendChild(document.createTextNode(`${blueMatch[1]} `));
        const accentSpan = document.createElement("span");
        accentSpan.className = "title-accent";
        accentSpan.textContent = blueMatch[2].endsWith(".") ? blueMatch[2] : `${blueMatch[2]}.`;
        welcomeHeading.appendChild(accentSpan);
      } else {
        welcomeHeading.textContent = rawTitle;
      }
    }
    if (welcomeSub && cfg.welcome) welcomeSub.textContent = cfg.welcome.subtitle;
    if (welcomeTagline) welcomeTagline.textContent = `"${cfg.tagline}"`;
    if (welcomeBadge) {
      const hasName = cfg.recipientName && cfg.recipientName !== "You" && cfg.recipientName !== "EDIT_NAME";
      const nameStr = hasName ? `For ${cfg.recipientName}` : "A Personal Underwater World";
      const dateStr = cfg.birthdayDate ? `, ${cfg.birthdayDate}` : "";
      welcomeBadge.textContent = `${nameStr}${dateStr}`;
    }
    if (startBtn && cfg.welcome) {
      const span = startBtn.querySelector("span");
      if (span) span.textContent = cfg.welcome.ctaText || "Start Our Journey";
    }
  }

  function setupSecretGate() {
    const form = document.getElementById("gate-form");
    const input = document.getElementById("gate-answer-input");
    const feedback = document.getElementById("gate-feedback");
    const portalFrame = document.querySelector(".gate-portal-frame");
    const cfg = window.birthdayConfig;

    if (!form || !input || !cfg || !cfg.verification) return;

    const acceptedList = (Array.isArray(cfg.verification.answer)
      ? cfg.verification.answer
      : [cfg.verification.answer]
    )
      .filter(Boolean)
      .map((a) => String(a).trim().toLowerCase());

    let isUnlocking = false;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (isUnlocking) return;

      if (window.OceanAudio) window.OceanAudio.initOnUserGesture(true);

      const guess = input.value.trim().toLowerCase();
      const matched = guess.length > 0 && acceptedList.includes(guess);

      if (!matched) {
        const wrongPool = cfg.verification.wrongResponses || ["Not quite right. Try again."];
        const msg = wrongPool[wrongAttemptCount % wrongPool.length];
        wrongAttemptCount += 1;

        if (feedback) {
          feedback.textContent = msg;
          feedback.classList.remove("is-success");
        }
        if (portalFrame) {
          portalFrame.classList.remove("shake-error");
          void portalFrame.offsetWidth;
          portalFrame.classList.add("shake-error");
        }
        if (window.OceanAudio) window.OceanAudio.playBubble();
        input.focus();
        return;
      }

      isUnlocking = true;
      if (feedback) {
        feedback.textContent = "The portal recognizes you. Entering the ocean...";
        feedback.classList.add("is-success");
      }
      if (portalFrame) portalFrame.classList.add("is-unlocking");
      if (window.OceanAudio) window.OceanAudio.playUnlock();
      if (window.OceanWorld) window.OceanWorld.triggerGateUnlockCamera();

      window.setTimeout(() => {
        if (window.OceanNavigation) window.OceanNavigation.goToScene("welcome", "warp");
        window.setTimeout(() => {
          isUnlocking = false;
          if (portalFrame) portalFrame.classList.remove("is-unlocking");
          input.value = "";
          if (feedback) feedback.textContent = "";
        }, 1200);
      }, 900);
    });
  }

  function setupWelcomeAndHUD() {
    const startBtn = document.getElementById("start-journey-btn");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        if (window.OceanAudio) window.OceanAudio.initOnUserGesture(true);
        if (window.OceanWorld) window.OceanWorld.triggerWhaleInteraction();
        if (window.OceanNavigation) window.OceanNavigation.goToScene("map", "whale", { mapView: "trail" });
      });
    }

    const trackerQuickBtn = document.getElementById("welcome-open-tracker");
    if (trackerQuickBtn) {
      trackerQuickBtn.addEventListener("click", () => {
        if (window.OceanAudio) window.OceanAudio.initOnUserGesture(true);
        if (window.OceanNavigation) window.OceanNavigation.goToScene("map", "ripple", { mapView: "tracker" });
      });
    }

    const brandBtn = document.getElementById("hud-brand-btn");
    if (brandBtn) {
      brandBtn.addEventListener("click", () => {
        if (window.OceanNavigation) window.OceanNavigation.goToScene("map", "ripple");
      });
    }

    document.querySelectorAll(".hud-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        const scene = link.getAttribute("data-hud-scene");
        const ch = link.getAttribute("data-hud-chapter");
        if (scene && window.OceanNavigation) window.OceanNavigation.goToScene(scene);
        if (ch && window.OceanNavigation) window.OceanNavigation.openChapter(ch);
      });
    });

    const mobileMenuBtn = document.getElementById("hud-mobile-menu");
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => {
        if (window.OceanNavigation) window.OceanNavigation.toggleIndexDrawer();
      });
    }

    const hudBack = document.getElementById("hud-back-map");
    if (hudBack) {
      hudBack.addEventListener("click", () => {
        if (window.OceanNavigation) window.OceanNavigation.goToScene("map", "ripple");
      });
    }

    const hudProgress = document.getElementById("hud-progress-pill");
    if (hudProgress) {
      hudProgress.addEventListener("click", () => {
        if (window.OceanNavigation) window.OceanNavigation.toggleIndexDrawer();
      });
    }

    const triggerWhaleCompanion = () => {
      if (window.OceanAudio) {
        window.OceanAudio.initOnUserGesture(true);
        window.OceanAudio.playWhaleSong();
      }
      if (window.OceanWorld) window.OceanWorld.triggerWhaleInteraction();
      if (window.OceanNavigation) window.OceanNavigation.showWhaleWhisper();
    };

    const hudWhale = document.getElementById("hud-whale-btn");
    if (hudWhale) hudWhale.addEventListener("click", triggerWhaleCompanion);

    const fallbackWhale = document.getElementById("fallback-whale");
    if (fallbackWhale) fallbackWhale.addEventListener("click", triggerWhaleCompanion);

    if (window.OceanWorld) {
      window.OceanWorld.onWhaleClick = () => {
        if (window.OceanAudio) window.OceanAudio.playWhaleSong();
        if (window.OceanNavigation) window.OceanNavigation.showWhaleWhisper();
      };
    }

    const audioBtn = document.getElementById("hud-audio-toggle");
    const volumeSlider = document.getElementById("hud-volume-slider");
    if (audioBtn) {
      audioBtn.addEventListener("click", () => {
        if (window.OceanAudio) window.OceanAudio.toggle();
      });
    }
    if (volumeSlider) {
      volumeSlider.addEventListener("input", (e) => {
        if (window.OceanAudio) {
          if (!window.OceanAudio.isInitialized) window.OceanAudio.initOnUserGesture(true);
          window.OceanAudio.setVolume(e.target.value);
        }
      });
    }

    // Pause continuous 3D & ambient motion (R-39 pause control)
    const perfBtn = document.getElementById("hud-perf-toggle");
    const perfGlyph = document.getElementById("perf-icon-glyph");
    if (perfBtn) {
      perfBtn.addEventListener("click", () => {
        const nextPaused = !document.body.classList.contains("lite-mode");
        if (window.OceanWorld) window.OceanWorld.setLiteMode(nextPaused);
        else document.body.classList.toggle("lite-mode", nextPaused);
        document.body.classList.toggle("motion-paused", nextPaused);

        perfBtn.setAttribute("aria-pressed", String(nextPaused));
        if (perfGlyph) perfGlyph.textContent = nextPaused ? "Calm" : "3D";
        if (window.OceanNavigation) {
          window.OceanNavigation._layoutFallbackMarkers();
          window.OceanNavigation.showWhaleWhisper(
            nextPaused
              ? "Calm mode active: continuous 3D motion is paused."
              : "Full 3D underwater immersion resumed."
          );
        }
      });
    }

    document.querySelectorAll("[data-close-modal]").forEach((el) => {
      el.addEventListener("click", () => {
        if (window.OceanInteractions) window.OceanInteractions.closeAllModals();
      });
    });

    // Native <dialog> light-dismiss on backdrop click
    ["lightbox-modal", "detail-modal", "confirm-modal"].forEach((id) => {
      const dlg = document.getElementById(id);
      if (!dlg) return;
      dlg.addEventListener("click", (e) => {
        if (e.target === dlg && window.OceanInteractions) {
          window.OceanInteractions.closeAllModals();
        }
      });
    });

    const lbPrev = document.getElementById("lightbox-prev");
    const lbNext = document.getElementById("lightbox-next");
    if (lbPrev) lbPrev.addEventListener("click", () => window.OceanInteractions && window.OceanInteractions.stepLightbox(-1));
    if (lbNext) lbNext.addEventListener("click", () => window.OceanInteractions && window.OceanInteractions.stepLightbox(1));

    const confirmAccept = document.getElementById("confirm-accept-btn");
    if (confirmAccept) {
      confirmAccept.addEventListener("click", () => {
        if (window.OceanInteractions) window.OceanInteractions.closeAllModals();
        if (window.OceanNavigation) {
          window.OceanNavigation.resetAllProgress();
          window.OceanNavigation.goToScene("gate", "depth");
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (window.OceanInteractions) window.OceanInteractions.closeAllModals();
        if (window.OceanNavigation) {
          window.OceanNavigation.closeMapPreview();
          window.OceanNavigation.toggleIndexDrawer(false);
        }
      }
      const lbModal = document.getElementById("lightbox-modal");
      if (lbModal && lbModal.open) {
        if (e.key === "ArrowLeft" && window.OceanInteractions) window.OceanInteractions.stepLightbox(-1);
        if (e.key === "ArrowRight" && window.OceanInteractions) window.OceanInteractions.stepLightbox(1);
      }
    });
  }

  function boot() {
    applyConfigThemeAndCopy();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.classList.add("reduced-motion");
    }

    if (window.OceanAnimations) window.OceanAnimations.initAmbientBubbles();
    if (window.OceanWorld) window.OceanWorld.init();
    if (window.OceanNavigation) window.OceanNavigation.init();

    setupSecretGate();
    setupWelcomeAndHUD();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
