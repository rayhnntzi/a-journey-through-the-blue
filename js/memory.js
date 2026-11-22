/**
 * ============================================================================
 * A JOURNEY THROUGH THE BLUE : MEMORIES, ENVELOPES, WISHES, LETTER & ENDING
 * ============================================================================
 * Scenes 06 to 10 with semantic native controls, clean inline SVG icons,
 * empty-state handling, zero decorative emojis, and zero em dashes.
 * ============================================================================
 */

(function () {
  "use strict";

  const MEM_ICONS = {
    envelope: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>',
    star: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.4l-5.6 3.1 1.3-6.2L3 9l6.3-.7L12 2.5z"/></svg>',
    bottle: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#70C9E8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 2h4v3l3 4v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9l3-4V2z"/><path d="M9 13h6"/><path d="M9 16h4"/></svg>'
  };

  const OceanMemory = {
    activeCategory: "All",
    openedEnvelopes: new Set(),
    unlockedStars: new Set(),
    letterOpened: false,
    typewriterTimer: null,

    loadSavedState(state) {
      this.openedEnvelopes = new Set(state.openedEnvelopes || []);
      this.unlockedStars = new Set(state.unlockedStars || []);
      this.letterOpened = Boolean(state.letterOpened);
    },

    exportState() {
      return {
        openedEnvelopes: Array.from(this.openedEnvelopes),
        unlockedStars: Array.from(this.unlockedStars),
        letterOpened: this.letterOpened
      };
    },

    resetState() {
      this.activeCategory = "All";
      this.openedEnvelopes.clear();
      this.unlockedStars.clear();
      this.letterOpened = false;
      this.stopTypewriter();
    },

    stopTypewriter() {
      if (this.typewriterTimer) {
        window.clearInterval(this.typewriterTimer);
        this.typewriterTimer = null;
      }
    },

    // ========================================================================
    // SCENE 06 : LITTLE THINGS I REMEMBER ABOUT YOU (SCRAPBOOK)
    // ========================================================================
    renderMemoriesScene() {
      const mount = document.getElementById("memories-mount");
      const cfg = window.birthdayConfig;
      const ui = window.OceanInteractions;
      if (!mount || !cfg || !ui) return;

      const categories = ["All", ...cfg.memoryCategories];

      mount.innerHTML = `
        <header class="realm-hero realm-hero-centered anim-reveal">
          <p class="scene-meta-line">Scene 06: Interactive Scrapbook</p>
          <h2 id="memories-heading" class="realm-title">Little Things I Remember About You</h2>
          <p class="realm-intro">
            Polaroids drifting gently in blue water and glass bottles holding the small details that make you unmistakably you.
          </p>
        </header>

        <div class="scrapbook-controls anim-reveal">
          <p style="font-size:0.9rem; color:var(--ice-blue);">Filter by category or draw a surprise note from the tide:</p>
          <button type="button" id="random-memory-btn" class="btn-ocean-primary">
            <span>Tell Me Something You Remember</span>
          </button>
        </div>

        <div class="category-pills anim-reveal" role="tablist" aria-label="Memory Categories">
          ${categories
            .map(
              (cat) => `
            <button type="button" role="tab" class="cat-pill ${this.activeCategory === cat ? "is-active" : ""}" data-mem-cat="${ui.esc(cat)}" aria-selected="${this.activeCategory === cat}">
              ${ui.esc(cat)}
            </button>
          `
            )
            .join("")}
        </div>

        <div id="scrapbook-grid" class="scrapbook-grid anim-reveal"></div>

        <nav class="chapter-footer-nav anim-reveal" aria-label="Memories Navigation">
          <button type="button" class="btn-ocean-ghost" data-goto-scene="map">← Return to Ocean Map</button>
          <button type="button" class="btn-ocean-primary" data-goto-scene="forgotten">Continue to Hidden Envelopes</button>
        </nav>
      `;

      const renderGrid = () => {
        const grid = mount.querySelector("#scrapbook-grid");
        if (!grid) return;

        const filtered =
          this.activeCategory === "All"
            ? cfg.personalMemories
            : cfg.personalMemories.filter((m) => m.category === this.activeCategory);

        if (!filtered.length) {
          grid.innerHTML = `
            <div class="empty-state-box">
              <h3 style="font-size:1.25rem; margin-bottom:0.45rem;">No memories in "${ui.esc(this.activeCategory)}" yet</h3>
              <p style="color:var(--ice-blue); margin-bottom:1.1rem;">Add an entry under this category in js/content.js or view all saved memories.</p>
              <button type="button" class="btn-ocean-ghost" id="reset-mem-filter">Show All Memories</button>
            </div>
          `;
          const resetBtn = grid.querySelector("#reset-mem-filter");
          if (resetBtn) {
            resetBtn.addEventListener("click", () => {
              this.activeCategory = "All";
              this.renderMemoriesScene();
            });
          }
          return;
        }

        grid.innerHTML = filtered
          .map((item, idx) => {
            if (item.style === "bottle") {
              return `
                <article class="memory-bottle-card">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                    <span class="preview-number">${ui.esc(item.category)}</span>
                    <span style="font-size:0.76rem; color:var(--ice-blue);">${ui.esc(item.date)}</span>
                  </div>
                  ${ui.buildPhotoFrame({ src: item.image, title: item.title, caption: item.caption }, { aspect: "square", lightboxGroup: "scrapbook", lightboxIndex: idx })}
                  <h3 style="font-size:1.15rem;">${ui.esc(item.title)}</h3>
                  <p style="font-size:0.88rem; color:var(--ice-blue);">${ui.esc(item.caption)}</p>
                  ${
                    item.hiddenMessage
                      ? `<button type="button" class="hud-pill hud-pill-sm" data-mem-secret="${idx}">Read Bottle Note</button>`
                      : ""
                  }
                </article>
              `;
            }

            return `
              <article class="memory-polaroid">
                ${ui.buildPhotoFrame({ src: item.image, title: item.title, caption: item.caption }, { aspect: "square", lightboxGroup: "scrapbook", lightboxIndex: idx })}
                <div style="padding-top:0.85rem; display:flex; flex-direction:column; gap:0.35rem; flex:1;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                    <span style="font-size:0.74rem; font-weight:600; color:var(--soft-cyan);">${ui.esc(item.category)}</span>
                    <span style="font-size:0.74rem; color:var(--ice-blue);">${ui.esc(item.date)}</span>
                  </div>
                  <h3 style="font-size:1.12rem;">${ui.esc(item.title)}</h3>
                  <p class="handwritten" style="font-size:0.94rem; color:var(--ice-blue); line-height:1.45; margin-bottom:0.5rem;">${ui.esc(item.caption)}</p>
                  ${
                    item.hiddenMessage
                      ? `<button type="button" class="hud-pill hud-pill-sm" style="margin-top:auto; align-self:flex-start;" data-mem-secret="${idx}">Read Footnote</button>`
                      : ""
                  }
                </div>
              </article>
            `;
          })
          .join("");

        const lbList = filtered.map((m) => ({
          src: m.image,
          title: m.title,
          caption: m.caption,
          date: m.date,
          hiddenMessage: m.hiddenMessage
        }));
        ui.hydratePhotos(grid, { scrapbook: lbList });

        grid.querySelectorAll("[data-mem-secret]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const m = filtered[Number(btn.getAttribute("data-mem-secret"))];
            if (!m) return;
            ui.openDetailModal({
              eyebrow: `Remembered: ${m.category}`,
              title: m.title,
              photo: m.image,
              caption: m.caption,
              date: m.date,
              extraQuote: m.hiddenMessage
            });
          });
        });
      };

      renderGrid();

      mount.querySelectorAll(".cat-pill").forEach((pill) => {
        pill.addEventListener("click", () => {
          this.activeCategory = pill.getAttribute("data-mem-cat");
          mount.querySelectorAll(".cat-pill").forEach((p) => {
            const active = p === pill;
            p.classList.toggle("is-active", active);
            p.setAttribute("aria-selected", String(active));
          });
          renderGrid();
          if (window.OceanAudio) window.OceanAudio.playBubble();
        });
      });

      const randomBtn = mount.querySelector("#random-memory-btn");
      if (randomBtn) {
        randomBtn.addEventListener("click", () => {
          const pool = cfg.personalMemories;
          const pick = pool[Math.floor(Math.random() * pool.length)];
          if (!pick) return;
          if (window.OceanWorld) window.OceanWorld.triggerWhaleInteraction();
          ui.openDetailModal({
            eyebrow: `Something I Remember: ${pick.category}`,
            title: pick.title,
            photo: pick.image,
            caption: pick.caption,
            date: pick.date,
            extraQuote: pick.hiddenMessage
          });
        });
      }

      this._bindSceneNavButtons(mount);
      if (window.OceanAnimations) window.OceanAnimations.revealElements(mount);
    },

    // ========================================================================
    // SCENE 07 : THINGS YOU MIGHT HAVE FORGOTTEN (NATIVE BUTTON ENVELOPES)
    // ========================================================================
    renderForgottenScene() {
      const mount = document.getElementById("forgotten-mount");
      const cfg = window.birthdayConfig;
      const ui = window.OceanInteractions;
      if (!mount || !cfg || !ui) return;

      mount.innerHTML = `
        <header class="realm-hero realm-hero-centered anim-reveal">
          <p class="scene-meta-line">Scene 07: Ocean Floor Keepsakes</p>
          <h2 id="forgotten-heading" class="realm-title">Things You Might Have Forgotten</h2>
          <p class="realm-intro">
            Sealed quietly along the seabed are six envelopes holding small observations and gentle reminders worth keeping. Select any envelope to open its note.
          </p>
        </header>

        <div class="envelopes-grid anim-reveal">
          ${cfg.forgottenMemories
            .map(
              (env, idx) => `
            <button type="button" class="envelope-card ${this.openedEnvelopes.has(env.id) ? "is-opened" : ""}" data-env-idx="${idx}" aria-label="Open ${ui.esc(env.sealLabel)}: ${ui.esc(env.title)}">
              <span class="envelope-shell">
                <span class="envelope-flap" aria-hidden="true"></span>
                <span class="envelope-seal">${MEM_ICONS.envelope}</span>
                <span style="font-size:0.74rem; font-weight:600; color:var(--soft-cyan); margin-top:0.3rem;">${ui.esc(env.category)}</span>
                <strong style="font-size:1.15rem; color:var(--white);">${ui.esc(env.sealLabel)}</strong>
                <span style="font-size:0.82rem; color:var(--ice-blue);">${this.openedEnvelopes.has(env.id) ? "Opened, tap to reread" : "Tap to open envelope"}</span>
              </span>
            </button>
          `
            )
            .join("")}
        </div>

        <nav class="chapter-footer-nav anim-reveal" aria-label="Forgotten Memories Navigation">
          <button type="button" class="btn-ocean-ghost" data-goto-scene="map">← Return to Ocean Map</button>
          <button type="button" class="btn-ocean-primary" data-goto-scene="wishes">Continue to Six Wishes</button>
        </nav>
      `;

      mount.querySelectorAll(".envelope-card").forEach((card) => {
        card.addEventListener("click", () => {
          const env = cfg.forgottenMemories[Number(card.getAttribute("data-env-idx"))];
          if (!env) return;
          this.openedEnvelopes.add(env.id);
          card.classList.add("is-opened");
          if (window.OceanNavigation) window.OceanNavigation.saveProgress();

          ui.openDetailModal({
            eyebrow: `${env.sealLabel}: ${env.category}`,
            title: env.title,
            bodyText: env.note,
            extraQuote: env.signature
          });
        });
      });

      this._bindSceneNavButtons(mount);
      if (window.OceanAnimations) window.OceanAnimations.revealElements(mount);
    },

    // ========================================================================
    // SCENE 08 : SIX WISHES FOR YOU (CONSTELLATION)
    // ========================================================================
    renderWishesScene() {
      const mount = document.getElementById("wishes-mount");
      const cfg = window.birthdayConfig;
      const ui = window.OceanInteractions;
      if (!mount || !cfg || !ui) return;

      const wishes = cfg.birthdayWishes;
      const isComplete = this.unlockedStars.size >= wishes.length;

      const linesSVG = wishes
        .slice(0, -1)
        .map((w, i) => {
          const next = wishes[i + 1];
          return `<line class="constellation-line" vector-effect="non-scaling-stroke" x1="${w.pos.x}" y1="${w.pos.y}" x2="${next.pos.x}" y2="${next.pos.y}" />`;
        })
        .join("");

      mount.innerHTML = `
        <header class="realm-hero realm-hero-centered anim-reveal">
          <p class="scene-meta-line">Scene 08: Celestial Reef</p>
          <h2 id="wishes-heading" class="realm-title">Six Wishes For You</h2>
          <p class="realm-intro">
            Six stars float quietly beneath the tide. Tap each star to reveal its wish. Once all six shine, they connect into your birthday constellation.
          </p>
        </header>

        <div class="constellation-sky anim-reveal ${isComplete ? "is-complete" : ""}" id="constellation-sky">
          <svg class="constellation-lines-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            ${linesSVG}
          </svg>
          ${wishes
            .map(
              (w, idx) => `
            <button
              type="button"
              class="wish-star-btn ${this.unlockedStars.has(w.id) ? "is-unlocked" : ""}"
              data-star-idx="${idx}"
              style="left:${w.pos.x}%; top:${w.pos.y}%;"
              aria-label="Open wish ${w.number}: ${ui.esc(w.category)}"
            >
              <span class="wish-star-core">${MEM_ICONS.star}</span>
              <span class="wish-star-tag">${ui.esc(w.category)}</span>
            </button>
          `
            )
            .join("")}
        </div>

        <div class="wish-reading-vessel anim-reveal" id="wish-reading-vessel" aria-live="polite">
          <p class="scene-meta-line" id="wish-counter-tag">
            ${this.unlockedStars.size} of ${wishes.length} Stars Illuminated
          </p>
          <h3 id="wish-active-title" style="font-size:1.45rem;">
            ${isComplete ? "Constellation Complete" : "Select a Star Above"}
          </h3>
          <p id="wish-active-message" style="color:var(--ice-blue); max-width:58ch; font-size:1.02rem;">
            ${
              isComplete
                ? "All six birthday wishes are connected across your ocean. Tap any star again anytime to reread it."
                : "Each star holds one sincere birthday wish waiting for you."
            }
          </p>
        </div>

        <nav class="chapter-footer-nav anim-reveal" aria-label="Wishes Navigation">
          <button type="button" class="btn-ocean-ghost" data-goto-scene="map">← Return to Ocean Map</button>
          <button type="button" class="btn-ocean-primary" data-goto-scene="letter">Open A Letter Across the Ocean</button>
        </nav>
      `;

      if (window.OceanWorld) {
        window.OceanWorld.setConstellationComplete(isComplete);
      }

      const sky = mount.querySelector("#constellation-sky");
      const counterTag = mount.querySelector("#wish-counter-tag");
      const titleEl = mount.querySelector("#wish-active-title");
      const msgEl = mount.querySelector("#wish-active-message");

      mount.querySelectorAll(".wish-star-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.getAttribute("data-star-idx"));
          const w = wishes[idx];
          if (!w) return;

          this.unlockedStars.add(w.id);
          btn.classList.add("is-unlocked");
          if (window.OceanNavigation) window.OceanNavigation.saveProgress();

          const allDone = this.unlockedStars.size >= wishes.length;
          if (counterTag) {
            counterTag.textContent = allDone
              ? `All ${wishes.length} Stars Illuminated: Constellation Formed`
              : `Star ${w.number} (${this.unlockedStars.size} of ${wishes.length} Illuminated)`;
          }
          if (titleEl) titleEl.textContent = w.category;
          if (msgEl) msgEl.textContent = `"${w.message}"`;

          if (window.OceanAudio) window.OceanAudio.playChime(0.92 + idx * 0.08);

          if (allDone && sky && !sky.classList.contains("is-complete")) {
            sky.classList.add("is-complete");
            if (window.OceanWorld) {
              window.OceanWorld.setConstellationComplete(true);
              window.OceanWorld.triggerWhaleInteraction();
            }
            if (window.OceanAudio) window.OceanAudio.playUnlock();
            if (window.OceanNavigation) {
              window.OceanNavigation.showWhaleWhisper("All six wishes have connected into your underwater constellation.");
            }
          }
        });
      });

      this._bindSceneNavButtons(mount);
      if (window.OceanAnimations) window.OceanAnimations.revealElements(mount);
    },

    // ========================================================================
    // SCENE 09 : A LETTER ACROSS THE OCEAN (BOTTLE + TYPEWRITER)
    // ========================================================================
    renderLetterScene() {
      const mount = document.getElementById("letter-mount");
      const cfg = window.birthdayConfig;
      const ui = window.OceanInteractions;
      if (!mount || !cfg || !ui) return;

      this.stopTypewriter();
      const fullLetterText = ui.formatTokens(cfg.letter);

      mount.innerHTML = `
        <header class="realm-hero realm-hero-centered anim-reveal">
          <p class="scene-meta-line">Scene 09: Carried by The Blue Whale</p>
          <h2 id="letter-heading" class="realm-title">A Letter Across the Ocean</h2>
          <p class="realm-intro">
            Drifting quietly beneath the light is a corked glass bottle carried across every current for your birthday.
          </p>
        </header>

        <div class="letter-bottle-stage anim-reveal">
          <button type="button" class="bottle-trigger-btn" id="open-bottle-btn">
            ${MEM_ICONS.bottle}
            <strong style="font-size:1.18rem;">
              ${this.letterOpened ? "Bottle Uncorked: Letter Open Below" : "Uncork the Glass Bottle"}
            </strong>
            <span style="font-size:0.84rem; color:var(--soft-cyan);">
              ${this.letterOpened ? "Tap again to replay the typewriter" : "A personal birthday letter waits inside"}
            </span>
          </button>

          <article class="letter-parchment" id="letter-parchment" ${this.letterOpened ? "" : "hidden"}>
            <div class="letter-typewriter-text" id="letter-typewriter-text"></div>
            <div class="letter-controls">
              <button type="button" class="hud-pill hud-pill-sm" id="letter-instant-btn">Reveal Full Letter</button>
              <button type="button" class="hud-pill hud-pill-sm" id="letter-replay-btn">Replay Typewriter</button>
            </div>
          </article>
        </div>

        <nav class="chapter-footer-nav anim-reveal" aria-label="Letter Navigation">
          <button type="button" class="btn-ocean-ghost" data-goto-scene="map">← Return to Ocean Map</button>
          <button type="button" class="btn-ocean-primary" data-goto-scene="ending">Rise Toward Until the Next Tide</button>
        </nav>
      `;

      const bottleBtn = mount.querySelector("#open-bottle-btn");
      const parchment = mount.querySelector("#letter-parchment");
      const textEl = mount.querySelector("#letter-typewriter-text");
      const instantBtn = mount.querySelector("#letter-instant-btn");
      const replayBtn = mount.querySelector("#letter-replay-btn");

      const startTypewriter = () => {
        this.stopTypewriter();
        if (!textEl || !parchment) return;
        parchment.hidden = false;
        textEl.textContent = "";

        const reduced =
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          document.body.classList.contains("reduced-motion") ||
          document.body.classList.contains("motion-paused");

        if (reduced) {
          textEl.textContent = fullLetterText;
          return;
        }

        let cursor = 0;
        this.typewriterTimer = window.setInterval(() => {
          const step = fullLetterText.slice(cursor, cursor + 3);
          textEl.textContent += step;
          cursor += 3;
          if (cursor >= fullLetterText.length) {
            this.stopTypewriter();
          }
        }, 22);
      };

      if (this.letterOpened && textEl) {
        textEl.textContent = fullLetterText;
      }

      if (bottleBtn) {
        bottleBtn.addEventListener("click", () => {
          this.letterOpened = true;
          if (window.OceanNavigation) window.OceanNavigation.saveProgress();
          if (window.OceanAudio) window.OceanAudio.playUnlock();
          if (window.OceanWorld) window.OceanWorld.triggerWhaleInteraction();
          startTypewriter();
        });
      }

      if (instantBtn) {
        instantBtn.addEventListener("click", () => {
          this.stopTypewriter();
          if (textEl) textEl.textContent = fullLetterText;
        });
      }

      if (replayBtn) {
        replayBtn.addEventListener("click", () => startTypewriter());
      }

      this._bindSceneNavButtons(mount);
      if (window.OceanAnimations) window.OceanAnimations.revealElements(mount);
    },

    // ========================================================================
    // SCENE 10 : UNTIL THE NEXT TIDE
    // ========================================================================
    renderEndingScene() {
      const mount = document.getElementById("ending-mount");
      const cfg = window.birthdayConfig;
      const ui = window.OceanInteractions;
      if (!mount || !cfg || !ui) return;

      const headline = ui.formatTokens(cfg.ending.mainHeadline);
      const subHeadline = ui.formatTokens(cfg.ending.subHeadline);
      const finalMsg = ui.formatTokens(cfg.ending.finalMessage);

      mount.innerHTML = `
        <p class="scene-meta-line anim-reveal">Scene 10: Until the Next Tide</p>
        <h2 id="ending-heading" class="ending-headline anim-reveal">${ui.esc(headline)}</h2>
        <p class="ending-subheadline anim-reveal">${ui.esc(subHeadline)}</p>
        <p class="ending-final-message anim-reveal">"${ui.esc(finalMsg)}"</p>
        <p class="handwritten anim-reveal" style="font-size:1.05rem; color:var(--soft-cyan); margin-bottom:2rem;">
          With all the best wishes, ${ui.esc(ui.formatTokens("[YOUR NAME]"))}
        </p>

        <div class="ending-actions anim-reveal">
          <button type="button" id="ending-explore-again" class="btn-ocean-primary btn-lg">
            <span>Explore Again</span>
          </button>
          <button type="button" id="ending-replay-btn" class="btn-ocean-ghost">
            <span>Replay Our Journey</span>
          </button>
        </div>
      `;

      const exploreBtn = mount.querySelector("#ending-explore-again");
      const replayBtn = mount.querySelector("#ending-replay-btn");

      if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
          if (window.OceanNavigation) window.OceanNavigation.goToScene("map", "ripple");
        });
      }

      if (replayBtn) {
        replayBtn.addEventListener("click", () => {
          const confirmModal = document.getElementById("confirm-modal");
          if (confirmModal) {
            if (typeof confirmModal.showModal === "function") {
              if (!confirmModal.open) confirmModal.showModal();
            } else {
              confirmModal.setAttribute("open", "");
            }
          }
          if (window.OceanAudio) window.OceanAudio.playBubble();
        });
      }

      if (window.OceanAnimations) window.OceanAnimations.revealElements(mount);
    },

    _bindSceneNavButtons(mount) {
      mount.querySelectorAll("[data-goto-scene]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-goto-scene");
          if (window.OceanNavigation) window.OceanNavigation.goToScene(target);
        });
      });
    }
  };

  window.OceanMemory = OceanMemory;
})();
