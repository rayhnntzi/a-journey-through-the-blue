/**
 * ============================================================================
 * A JOURNEY THROUGH THE BLUE : CHAPTERS, JAKARTA & GLOBAL INTERACTIONS
 * ============================================================================
 * Renders Scene 04 (The Jakarta Chapter) and ALL 14 unique Personal Chapters,
 * using native semantic buttons, purposeful bespoke SVG marks, zero em dashes,
 * zero decorative emojis, intrinsic image dimensions, and graceful fallbacks.
 * ============================================================================
 */

(function () {
  "use strict";

  const ICONS = {
    whale: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 13c0-4 4-6 9-6 4 0 6.5 2 8 4 1.2-1 2.2-2.2 3-2.5-.5 1.8-1.4 3-2.5 3.7 1.2.8 2 2 2.2 3.3-1.6-.2-2.8-1.1-3.7-2.2-2.2 1.8-5.5 2.7-9.2 2.7-4.2 0-6.8-1.2-6.8-3z"/><circle cx="8" cy="12" r="0.9" fill="currentColor"/></svg>',
    pot: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-6z"/><path d="M2 10h20"/><path d="M9 6h6"/></svg>',
    jar: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="7" width="12" height="14" rx="3"/><path d="M8 4h8v3H8z"/><path d="M9 12h6"/></svg>',
    basket: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 11h14l-1.5 8h-11z"/><path d="M8 11l4-6 4 6"/></svg>',
    cloche: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18h18"/><path d="M5 18a7 7 0 0 1 14 0"/><circle cx="12" cy="8" r="1.5"/></svg>',
    chest: '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#E8B870" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M3 12h18"/><path d="M10 12v3h4v-3"/><path d="M5 8a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4"/></svg>',
    loaf: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#E8B870" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15c0-4 3.5-7 8-7s8 3 8 7v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z"/><path d="M9 11l2 2"/><path d="M13 11l2 2"/></svg>',
    cup: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#E8B870" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-5z"/><path d="M16 11h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M8 6c0-1 .8-1.5.8-2.5"/><path d="M12 6c0-1 .8-1.5.8-2.5"/></svg>',
    reel: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#70C9E8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.2"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="14" r="1"/><circle cx="8" cy="14" r="1"/></svg>',
    sprout: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#70C9E8" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20V9"/><path d="M12 12C12 8 8 6 5 6c0 3 2 6 7 6z"/><path d="M12 10c0-3 3-5 6-5 0 3-2 5-6 5z"/></svg>',
    animal: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#70C9E8" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 15a4 4 0 0 1 1-7.8 4.5 4.5 0 0 1 8.5-.4A3.8 3.8 0 0 1 18 14.5V18h-2v-2H8v2H6v-3z"/></svg>',
    barn: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#70C9E8" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-7 9 7v9H3v-9z"/><path d="M9 20v-7h6v7"/></svg>',
    lantern: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#70C9E8" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="12" rx="3"/><path d="M9 4h6"/><path d="M12 11v4"/></svg>'
  };

  const OceanInteractions = {
    lightboxItems: [],
    lightboxIndex: 0,
    openedShells: new Set(),
    solvedGarlic: false,
    checkedSuspects: new Set(),
    activePortalKey: "perpusat",
    chestUnlocked: false,

    esc(str) {
      return String(str == null ? "" : str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    },

    formatTokens(text) {
      const cfg = window.birthdayConfig || {};
      const recipient = cfg.recipientName || "You";
      const sender = cfg.senderName || "Someone Who Remembers";
      return String(text || "")
        .replace(/\[NAME\]/g, recipient)
        .replace(/\[YOUR NAME\]/g, sender);
    },

    /**
     * Native semantic <button> photo frame (or <div> when non-interactive in modal)
     * with intrinsic dimensions to prevent layout shift (R-39, R-40).
     */
    buildPhotoFrame(photoObj, options = {}) {
      const src = photoObj.src || photoObj.photo || photoObj.image || "";
      const title = photoObj.title || photoObj.name || "Memory Frame";
      const caption = photoObj.caption || "";
      const aspectClass = options.aspect ? `aspect-${options.aspect}` : "";
      const interactive = !options.noZoom && Boolean(options.lightboxGroup);
      const tag = interactive ? "button" : "div";
      const extraAttrs = interactive
        ? `type="button" data-lb-group="${this.esc(options.lightboxGroup)}" data-lb-index="${Number(options.lightboxIndex || 0)}" aria-label="Open full photo: ${this.esc(title)}"`
        : "";
      const hint = interactive ? `<span class="photo-zoom-hint">View photo</span>` : "";

      return `
        <${tag} class="photo-frame ${aspectClass}" ${extraAttrs}>
          <img src="${this.esc(src)}" width="800" height="500" alt="${this.esc(caption || title)}" loading="lazy" decoding="async" />
          <div class="photo-placeholder-art">
            <div class="placeholder-label">${this.esc(title)}</div>
            <div class="placeholder-path">${this.esc(src || "Add photo path in js/content.js")}</div>
          </div>
          ${hint}
        </${tag}>
      `;
    },

    hydratePhotos(container, lightboxMap = {}) {
      if (!container) return;
      const frames = container.querySelectorAll(".photo-frame");
      frames.forEach((frame) => {
        const img = frame.querySelector("img");
        if (img) {
          const markPlaceholder = () => frame.classList.add("is-placeholder");
          img.addEventListener("error", markPlaceholder, { once: true });
          if (!img.getAttribute("src") || (img.complete && img.naturalWidth === 0)) {
            markPlaceholder();
          }
        }

        const group = frame.getAttribute("data-lb-group");
        const idx = Number(frame.getAttribute("data-lb-index") || 0);
        if (group && lightboxMap[group]) {
          frame.addEventListener("click", () => this.openLightbox(lightboxMap[group], idx));
        }
      });
    },

    // ------------------------------------------------------------------------
    // NATIVE <dialog> LIGHTBOX & REVELATION MODALS
    // ------------------------------------------------------------------------
    _showDialog(dialog) {
      if (!dialog) return;
      if (typeof dialog.showModal === "function") {
        if (!dialog.open) dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    },

    _closeDialog(dialog) {
      if (!dialog) return;
      if (typeof dialog.close === "function") {
        if (dialog.open) dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    },

    openLightbox(items, startIndex = 0) {
      if (!items || !items.length) return;
      this.lightboxItems = items;
      this.lightboxIndex = Math.max(0, Math.min(startIndex, items.length - 1));
      this._renderLightboxSlide();

      const modal = document.getElementById("lightbox-modal");
      if (modal) {
        this._showDialog(modal);
        if (window.OceanAudio) window.OceanAudio.playBubble();
      }
    },

    _renderLightboxSlide() {
      const item = this.lightboxItems[this.lightboxIndex];
      if (!item) return;

      const media = document.getElementById("lightbox-media");
      const title = document.getElementById("lightbox-title");
      const date = document.getElementById("lightbox-date");
      const caption = document.getElementById("lightbox-caption");
      const hiddenNote = document.getElementById("lightbox-hidden-note");
      const counter = document.getElementById("lightbox-counter");

      if (media) {
        media.innerHTML = this.buildPhotoFrame(item, { noZoom: true });
        this.hydratePhotos(media);
      }
      if (title) title.textContent = item.title || item.name || "Captured Moment";
      if (date) date.textContent = item.date || "";
      if (caption) caption.textContent = item.caption || item.story || "";
      if (hiddenNote) {
        hiddenNote.textContent = item.hiddenMessage ? `"${item.hiddenMessage}"` : "";
        hiddenNote.style.display = item.hiddenMessage ? "block" : "none";
      }
      if (counter) {
        counter.textContent = `${this.lightboxIndex + 1} / ${this.lightboxItems.length}`;
      }
    },

    stepLightbox(delta) {
      if (!this.lightboxItems.length) return;
      this.lightboxIndex = (this.lightboxIndex + delta + this.lightboxItems.length) % this.lightboxItems.length;
      this._renderLightboxSlide();
      if (window.OceanAudio) window.OceanAudio.playBubble();
    },

    openDetailModal({ eyebrow, title, subtitle, bodyText, extraQuote, photo, caption, date, badge }) {
      const modal = document.getElementById("detail-modal");
      const body = document.getElementById("detail-body");
      if (!modal || !body) return;

      const photoHTML = photo
        ? `<div style="margin: 1rem 0 1.15rem;">${this.buildPhotoFrame({ src: photo, title, caption }, { noZoom: true })}</div>`
        : "";

      body.innerHTML = `
        ${eyebrow ? `<p class="scene-meta-line">${this.esc(eyebrow)}</p>` : ""}
        <h3 id="detail-title" style="font-size: clamp(1.38rem, 2.8vw, 1.85rem); margin-bottom: 0.35rem; padding-right: 2.5rem;">${this.esc(title)}</h3>
        ${subtitle ? `<p style="font-size: 0.88rem; color: var(--soft-cyan); margin-bottom: 0.7rem;">${this.esc(subtitle)}</p>` : ""}
        ${badge ? `<span class="preview-number" style="display:inline-block; margin-bottom: 0.85rem;">${this.esc(badge)}</span>` : ""}
        ${photoHTML}
        ${caption ? `<p style="font-size: 0.85rem; color: var(--ice-blue); margin-bottom: 0.8rem;">${this.esc(caption)}${date ? ` (${this.esc(date)})` : ""}</p>` : ""}
        ${bodyText ? `<p style="color: var(--white); font-size: 0.96rem; line-height: 1.72; margin-bottom: 0.95rem;">${this.esc(bodyText)}</p>` : ""}
        ${extraQuote ? `<p class="handwritten" style="font-size: 1.05rem; color: var(--ice-blue); border-top: 1px solid var(--border-subtle); padding-top: 0.85rem;">${this.esc(extraQuote)}</p>` : ""}
      `;

      this.hydratePhotos(body);
      this._showDialog(modal);
      if (window.OceanAudio) window.OceanAudio.playChime(1.05);
    },

    closeAllModals() {
      ["lightbox-modal", "detail-modal", "confirm-modal"].forEach((id) => {
        const m = document.getElementById(id);
        this._closeDialog(m);
      });
    },

    // ------------------------------------------------------------------------
    // SHARED CHAPTER FOOTER
    // ------------------------------------------------------------------------
    buildChapterFooter(chapterObj, nextChapterId) {
      return `
        <div class="hidden-discovery-bar anim-reveal">
          <div>
            <p class="scene-meta-line" style="margin-bottom:0.2rem;">Hidden Note</p>
            <p style="font-size:0.88rem; color:var(--ice-blue);">One quiet personal note is tucked beneath this chapter.</p>
          </div>
          <button type="button" class="hidden-orb-btn" data-hidden-note="${this.esc(chapterObj.hiddenMessage || "")}" data-hidden-title="${this.esc(chapterObj.title)}">
            <span>Read Hidden Message</span>
          </button>
        </div>

        <nav class="chapter-footer-nav anim-reveal" aria-label="Chapter Navigation">
          <button type="button" class="btn-ocean-ghost" data-nav-action="map">
            <span>← Return to Ocean Map</span>
          </button>
          ${
            nextChapterId
              ? `<button type="button" class="btn-ocean-primary" data-nav-chapter="${this.esc(nextChapterId)}">
                   <span>Continue to Next Chapter</span>
                 </button>`
              : `<button type="button" class="btn-ocean-primary" data-nav-action="memories">
                   <span>Open Little Memories Scrapbook</span>
                 </button>`
          }
        </nav>
      `;
    },

    bindCommonChapterControls(mount) {
      const hiddenBtn = mount.querySelector(".hidden-orb-btn");
      if (hiddenBtn) {
        hiddenBtn.addEventListener("click", () => {
          this.openDetailModal({
            eyebrow: "Hidden Message",
            title: hiddenBtn.getAttribute("data-hidden-title"),
            bodyText: hiddenBtn.getAttribute("data-hidden-note")
          });
          if (window.OceanWorld) window.OceanWorld.triggerWhaleInteraction();
        });
      }

      mount.querySelectorAll("[data-nav-action]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-nav-action");
          if (window.OceanNavigation) window.OceanNavigation.goToScene(target);
        });
      });

      mount.querySelectorAll("[data-nav-chapter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-nav-chapter");
          if (window.OceanNavigation) window.OceanNavigation.openChapter(id);
        });
      });
    },

    // ------------------------------------------------------------------------
    // DISPATCHER
    // ------------------------------------------------------------------------
    renderDestination(destId) {
      const mount = document.getElementById("chapter-mount");
      const cfg = window.birthdayConfig;
      if (!mount || !cfg) return;

      if (destId === "jakarta") {
        this.renderJakartaChapter(mount, cfg.jakartaChapter);
        return;
      }

      const idx = cfg.chapters.findIndex((c) => c.id === destId);
      const chapter = cfg.chapters[idx];
      if (!chapter) return;

      const nextChapter = cfg.chapters[idx + 1] ? cfg.chapters[idx + 1].id : null;

      switch (chapter.id) {
        case "ch01": this.renderCh01Beach(mount, chapter, nextChapter); break;
        case "ch02": this.renderCh02Blue(mount, chapter, nextChapter); break;
        case "ch03": this.renderCh03Whale(mount, chapter, nextChapter); break;
        case "ch04": this.renderCh04Garlic(mount, chapter, nextChapter); break;
        case "ch05": this.renderCh05Circles(mount, chapter, nextChapter); break;
        case "ch06": this.renderCh06Martabak(mount, chapter, nextChapter); break;
        case "ch07": this.renderCh07RotiAbon(mount, chapter, nextChapter); break;
        case "ch08": this.renderCh08Coffee(mount, chapter, nextChapter); break;
        case "ch09": this.renderCh09Kokas(mount, chapter, nextChapter); break;
        case "ch10": this.renderCh10Farm(mount, chapter, nextChapter); break;
        case "ch11": this.renderCh11Cinema(mount, chapter, nextChapter); break;
        case "ch12": this.renderCh12Music(mount, chapter, nextChapter); break;
        case "ch13": this.renderCh13Library(mount, chapter, nextChapter); break;
        case "ch14": this.renderCh14Kaliurang(mount, chapter, nextChapter); break;
        default: break;
      }

      this.bindCommonChapterControls(mount);
      if (window.OceanAnimations) window.OceanAnimations.revealElements(mount);
    },

    // ========================================================================
    // SCENE 04 : THE JAKARTA CHAPTER
    // ========================================================================
    renderJakartaChapter(mount, jkt) {
      const timelinePhotos = jkt.sections.map((s) => ({
        src: s.photo,
        title: s.title,
        caption: s.caption,
        date: s.date
      }));

      mount.innerHTML = `
        <header class="jakarta-skyline-banner anim-reveal">
          <p class="scene-meta-line">${this.esc(jkt.zone)}</p>
          <h2 class="realm-title">${this.esc(jkt.title)}</h2>
          <p class="realm-intro">${this.esc(jkt.introNarrative)}</p>
        </header>

        <section class="anim-reveal" style="margin-bottom: 2.8rem;">
          <p class="scene-meta-line">Interactive City Chart</p>
          <h3 style="font-size: 1.65rem; margin-bottom: 0.9rem;">Submerged Routes of Jakarta</h3>
          <div class="jakarta-map-stage" id="jakarta-map-stage">
            <svg class="jakarta-map-svg" viewBox="0 0 900 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M40 270 Q210 190 360 175 T720 140 T870 90" stroke="#70C9E8" stroke-width="2" stroke-dasharray="6 8" opacity="0.55"/>
              <path d="M120 70 Q320 120 450 220 T760 280" stroke="#B9E8F5" stroke-width="1.5" opacity="0.4"/>
              <path d="M220 330 L340 120 L650 160 L580 290 Z" stroke="#246A9B" stroke-width="1.4" fill="rgba(36,106,155,0.12)"/>
            </svg>
            ${jkt.mapPins
              .map(
                (pin, i) => `
              <button type="button" class="jkt-pin ${i === 0 ? "is-active" : ""}" data-jkt-pin="${i}" style="left:${pin.x}%; top:${pin.y}%;">
                <span class="jkt-pin-dot" aria-hidden="true"></span>
                <span class="jkt-pin-label">${this.esc(pin.label)}</span>
              </button>
            `
              )
              .join("")}
          </div>
          <div class="jkt-pin-detail" id="jakarta-pin-detail"></div>
        </section>

        <section class="anim-reveal" style="margin-bottom: 2.8rem;">
          <p class="scene-meta-line">Expedition Timeline</p>
          <h3 style="font-size: 1.65rem; margin-bottom: 0.75rem;">Five Movements of the City</h3>
          <div class="ocearch-timeline-track" role="tablist" aria-label="Jakarta Timeline Movements">
            ${jkt.sections
              .map(
                (sec, idx) => `
              <button type="button" class="ocearch-node-btn ${idx === 0 ? "is-active" : ""}" data-tl-jump="${idx}">
                ${this.esc(sec.number)}: ${this.esc(sec.date)}
              </button>
            `
              )
              .join("")}
          </div>
          <div class="jakarta-timeline">
            ${jkt.sections
              .map(
                (sec, idx) => `
              <article class="timeline-node ${idx === 0 ? "is-highlighted" : ""}" data-tl-card="${idx}">
                ${this.buildPhotoFrame(timelinePhotos[idx], { lightboxGroup: "jktTimeline", lightboxIndex: idx })}
                <div>
                  <span class="preview-number" style="display:inline-block; margin-bottom:0.5rem;">${this.esc(sec.number)}: ${this.esc(sec.date)}</span>
                  <h4 style="font-size: 1.2rem; margin-bottom: 0.25rem;">${this.esc(sec.title)}</h4>
                  <p style="font-size: 0.82rem; color: var(--soft-cyan); margin-bottom: 0.55rem;">${this.esc(sec.subtitle)}</p>
                  <p style="color: var(--ice-blue); font-size: 0.88rem; line-height: 1.55;">${this.esc(sec.story)}</p>
                </div>
              </article>
            `
              )
              .join("")}
          </div>
        </section>

        <section class="anim-reveal" style="margin-bottom: 2.8rem;">
          <p class="scene-meta-line">Interactive Footnotes</p>
          <h3 style="font-size: 1.65rem; margin-bottom: 1.1rem;">Tap Any Card to Flip</h3>
          <div class="flip-grid">
            ${jkt.flipCards
              .map(
                (fc) => `
              <button type="button" class="flip-card" aria-pressed="false">
                <div class="flip-card-inner">
                  <div class="flip-face flip-front">
                    <span class="preview-number" style="align-self:flex-start;">${this.esc(fc.frontLabel)}</span>
                    <p style="font-size:1.05rem; font-weight:600; color:var(--white);">${this.esc(fc.frontPrompt)}</p>
                    <span style="font-size:0.78rem; color:var(--soft-cyan);">Tap to flip</span>
                  </div>
                  <div class="flip-face flip-back">
                    <p class="handwritten" style="font-size:1rem; color:var(--white); line-height:1.55;">${this.esc(fc.backText)}</p>
                  </div>
                </div>
              </button>
            `
              )
              .join("")}
          </div>
        </section>

        <section class="anim-reveal" style="margin-bottom: 2.8rem;">
          <p class="scene-meta-line">Floating Frames</p>
          <h3 style="font-size: 1.65rem; margin-bottom: 1.1rem;">Jakarta Gallery</h3>
          <div class="jakarta-gallery">
            ${jkt.gallery
              .map(
                (item, i) => `
              <figure>
                ${this.buildPhotoFrame(item, { lightboxGroup: "jktGallery", lightboxIndex: i })}
                <figcaption style="margin-top:0.45rem; font-size:0.82rem; color:var(--ice-blue);">
                  <strong>${this.esc(item.title)}</strong>: ${this.esc(item.caption)}
                </figcaption>
              </figure>
            `
              )
              .join("")}
          </div>
        </section>

        <section class="jakarta-special-tribute anim-reveal">
          <p class="scene-meta-line">A Quiet Note</p>
          <h3>${this.esc(jkt.specialSection.title)}</h3>
          <p>${this.esc(jkt.specialSection.message)}</p>
        </section>

        ${this.buildChapterFooter(jkt, "ch01")}
      `;

      const detailBox = mount.querySelector("#jakarta-pin-detail");
      const renderPin = (index) => {
        const pin = jkt.mapPins[index];
        if (!pin || !detailBox) return;
        mount.querySelectorAll(".jkt-pin").forEach((el, idx) => el.classList.toggle("is-active", idx === index));
        detailBox.innerHTML = `
          <div>
            <span class="preview-number" style="display:inline-block; margin-bottom:0.5rem;">${this.esc(pin.tag)}</span>
            <h4 style="font-size:1.3rem; margin-bottom:0.45rem;">${this.esc(pin.label)}</h4>
            <p style="color:var(--ice-blue); font-size:0.94rem;">${this.esc(pin.note)}</p>
          </div>
          <div>${this.buildPhotoFrame({ src: pin.photo, title: pin.label, caption: pin.note }, { lightboxGroup: "jktPins", lightboxIndex: index })}</div>
        `;
        this.hydratePhotos(detailBox, {
          jktPins: jkt.mapPins.map((p) => ({ src: p.photo, title: p.label, caption: p.note }))
        });
      };

      renderPin(0);
      mount.querySelectorAll(".jkt-pin").forEach((btn) => {
        btn.addEventListener("click", () => {
          renderPin(Number(btn.getAttribute("data-jkt-pin")));
          if (window.OceanAudio) window.OceanAudio.playBubble();
        });
      });

      mount.querySelectorAll(".ocearch-node-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const targetIdx = btn.getAttribute("data-tl-jump");
          mount.querySelectorAll(".ocearch-node-btn").forEach((b) => b.classList.toggle("is-active", b === btn));
          mount.querySelectorAll("[data-tl-card]").forEach((card) => {
            const match = card.getAttribute("data-tl-card") === targetIdx;
            card.classList.toggle("is-highlighted", match);
            if (match) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
          });
          if (window.OceanAudio) window.OceanAudio.playBubble();
        });
      });

      mount.querySelectorAll(".flip-card").forEach((card) => {
        card.addEventListener("click", () => {
          const flipped = card.classList.toggle("is-flipped");
          card.setAttribute("aria-pressed", String(flipped));
          if (window.OceanAudio) window.OceanAudio.playBubble();
        });
      });

      this.hydratePhotos(mount, {
        jktTimeline: timelinePhotos,
        jktGallery: jkt.gallery
      });
      this.bindCommonChapterControls(mount);
      if (window.OceanAnimations) window.OceanAnimations.revealElements(mount);
    },

    // ========================================================================
    // CHAPTER 01 : THE GUIDING LIGHT (Beach)
    // ========================================================================
    renderCh01Beach(mount, ch, nextId) {
      mount.innerHTML = `
        <header class="realm-hero anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="beach-shore-stage anim-reveal">
          <p class="scene-meta-line" style="text-align:center; margin-bottom:1.25rem;">Tap any seashell along the tide</p>
          <div class="seashell-scatter">
            ${ch.seashells
              .map(
                (sh, idx) => `
              <button type="button" class="seashell-btn ${this.openedShells.has(sh.id) ? "is-opened" : ""}" data-shell-idx="${idx}">
                <svg class="seashell-svg" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                  <path d="M40 66C20 66 10 52 10 38C10 22 23 12 40 12C57 12 70 22 70 38C70 52 60 66 40 66Z" fill="#123F67" stroke="#B9E8F5" stroke-width="1.6"/>
                  <path d="M40 64V15M40 64L24 19M40 64L56 19M40 64L15 33M40 64L65 33" stroke="#F4FBFF" stroke-opacity="0.45" stroke-width="1.2"/>
                  <circle cx="40" cy="48" r="4.5" fill="#F4FBFF" opacity="0.85"/>
                </svg>
                <strong style="font-size:0.98rem;">${this.esc(sh.name)}</strong>
                <span style="font-size:0.78rem; color:var(--soft-cyan);">Open shell</span>
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      mount.querySelectorAll(".seashell-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const sh = ch.seashells[Number(btn.getAttribute("data-shell-idx"))];
          if (!sh) return;
          this.openedShells.add(sh.id);
          btn.classList.add("is-opened");
          this.openDetailModal({
            eyebrow: `Seashell Opened: ${sh.name}`,
            title: sh.title,
            photo: sh.photo,
            caption: sh.caption,
            date: sh.date,
            bodyText: sh.note
          });
        });
      });
    },

    // ========================================================================
    // CHAPTER 02 : BENEATH THE BLUE
    // ========================================================================
    renderCh02Blue(mount, ch, nextId) {
      mount.innerHTML = `
        <header class="realm-hero realm-hero-centered anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="blue-spectrum-stage anim-reveal">
          ${ch.blueObjects
            .map(
              (obj, idx) => `
            <button type="button" class="blue-specimen-orb" data-blue-idx="${idx}">
              <span class="blue-swatch" style="background: ${this.esc(obj.hex)};" aria-hidden="true"></span>
              <span style="font-size:0.74rem; color:var(--soft-cyan); font-weight:600;">${this.esc(obj.shadeName)}</span>
              <strong style="font-size:0.98rem;">${this.esc(obj.name)}</strong>
              <span style="font-size:0.78rem; color:var(--ice-blue);">Inspect shade</span>
            </button>
          `
            )
            .join("")}
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      mount.querySelectorAll(".blue-specimen-orb").forEach((btn) => {
        btn.addEventListener("click", () => {
          const obj = ch.blueObjects[Number(btn.getAttribute("data-blue-idx"))];
          if (!obj) return;
          this.openDetailModal({
            eyebrow: `${obj.shadeName} (${obj.hex})`,
            title: obj.title,
            subtitle: obj.name,
            photo: obj.photo,
            caption: obj.caption,
            bodyText: obj.note
          });
        });
      });
    },

    // ========================================================================
    // CHAPTER 03 : THE WHALE THAT CARRIED MEMORIES
    // ========================================================================
    renderCh03Whale(mount, ch, nextId) {
      mount.innerHTML = `
        <header class="realm-hero realm-hero-centered anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="whale-sanctuary-stage anim-reveal">
          <button type="button" class="whale-click-trigger" id="ch03-whale-random-btn">
            ${ICONS.whale}
            <span>Surface a Random Memory Bubble</span>
          </button>

          <div class="memory-bubbles-field">
            ${ch.memoryBubbles
              .map(
                (b, idx) => `
              <button type="button" class="memory-bubble-orb" data-wb-idx="${idx}">
                <span style="font-size:0.72rem; color:var(--soft-cyan); font-weight:600;">Bubble 0${idx + 1}</span>
                <strong style="font-size:0.95rem; margin:0.25rem 0;">${this.esc(b.title)}</strong>
                <span style="font-size:0.76rem; color:var(--ice-blue);">Open bubble</span>
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      const openBubble = (idx) => {
        const b = ch.memoryBubbles[idx];
        if (!b) return;
        this.openDetailModal({
          eyebrow: `Carried by The Blue Whale: Bubble 0${idx + 1}`,
          title: b.title,
          photo: b.photo,
          caption: b.caption,
          date: b.date,
          bodyText: b.story
        });
      };

      const whaleBtn = mount.querySelector("#ch03-whale-random-btn");
      if (whaleBtn) {
        whaleBtn.addEventListener("click", () => {
          if (window.OceanAudio) window.OceanAudio.playWhaleSong();
          if (window.OceanWorld) window.OceanWorld.triggerWhaleInteraction();
          const randIdx = Math.floor(Math.random() * ch.memoryBubbles.length);
          openBubble(randIdx);
        });
      }

      mount.querySelectorAll(".memory-bubble-orb").forEach((btn) => {
        btn.addEventListener("click", () => openBubble(Number(btn.getAttribute("data-wb-idx"))));
      });
    },

    // ========================================================================
    // CHAPTER 04 : THE MYSTERY OF BAWANG PUTIH
    // ========================================================================
    renderCh04Garlic(mount, ch, nextId) {
      const m = ch.mystery;

      mount.innerHTML = `
        <header class="realm-hero anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="garlic-kitchen-stage anim-reveal">
          <p style="color:var(--soft-cyan); font-weight:600; font-size:0.94rem;">${this.esc(m.prompt)}</p>

          <div class="suspect-grid">
            ${m.suspects
              .map(
                (s, idx) => `
              <button type="button" class="suspect-btn ${this.checkedSuspects.has(s.id) ? "is-checked" : ""} ${this.solvedGarlic && s.isGarlic ? "is-solved" : ""}" data-suspect-idx="${idx}">
                <span style="color:var(--soft-cyan);">${ICONS[s.icon] || ""}</span>
                <strong style="font-size:0.96rem;">${this.esc(s.label)}</strong>
                <span style="font-size:0.78rem; color:var(--ice-blue);">Inspect clue</span>
              </button>
            `
              )
              .join("")}
          </div>

          <div class="detective-log" id="garlic-log" aria-live="polite">
            <p style="color:var(--ice-blue); font-size:0.92rem;">
              ${
                this.solvedGarlic
                  ? this.esc(m.suspects.find((x) => x.isGarlic).clueText)
                  : "Tap any kitchen object above to follow the unmistakable aroma."
              }
            </p>
          </div>

          <div id="garlic-reveal-box" style="margin-top: 1.5rem; ${this.solvedGarlic ? "" : "display:none;"}">
            <div class="garlic-solved-spread">
              <div>
                <span class="preview-number" style="display:inline-block; margin-bottom:0.55rem;">Case Solved</span>
                <h3 style="font-size:1.38rem; margin-bottom:0.45rem;">${this.esc(m.solvedTitle)}</h3>
                <p style="color:var(--ice-blue); font-size:0.94rem;">${this.esc(m.solvedNote)}</p>
              </div>
              <div>
                ${this.buildPhotoFrame({ src: m.photo, title: m.solvedTitle, caption: m.caption }, { lightboxGroup: "garlicPhoto", lightboxIndex: 0 })}
                <p style="font-size:0.8rem; color:var(--ice-blue); margin-top:0.45rem;">${this.esc(m.caption)}</p>
              </div>
            </div>
          </div>
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      const logEl = mount.querySelector("#garlic-log");
      const revealBox = mount.querySelector("#garlic-reveal-box");

      mount.querySelectorAll(".suspect-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const s = m.suspects[Number(btn.getAttribute("data-suspect-idx"))];
          if (!s) return;
          this.checkedSuspects.add(s.id);

          if (s.isGarlic) {
            this.solvedGarlic = true;
            btn.classList.add("is-solved");
            if (logEl) logEl.innerHTML = `<p style="color:#8CF0D5; font-weight:500;">${this.esc(s.clueText)}</p>`;
            if (revealBox) revealBox.style.display = "block";
            if (window.OceanAudio) window.OceanAudio.playChime(1.2);
          } else {
            btn.classList.add("is-checked");
            if (logEl) logEl.innerHTML = `<p style="color:var(--ice-blue);">${this.esc(s.clueText)}</p>`;
            if (window.OceanAudio) window.OceanAudio.playBubble();
          }
        });
      });

      this.hydratePhotos(mount, {
        garlicPhoto: [{ src: m.photo, title: m.solvedTitle, caption: m.caption }]
      });
    },

    // ========================================================================
    // CHAPTER 05 : PERPUSAT AND BOMBA CIRCLE
    // ========================================================================
    renderCh05Circles(mount, ch, nextId) {
      mount.innerHTML = `
        <header class="realm-hero realm-hero-centered anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="twin-portals-grid anim-reveal">
          <button type="button" class="portal-gate-card ${this.activePortalKey === "perpusat" ? "is-active" : ""}" data-portal-key="perpusat" style="background-image:url('${this.esc(ch.portals.perpusat.photos[0].src)}');">
            <span class="scene-meta-line">Portal I</span>
            <h3 style="font-size:1.65rem; letter-spacing:0.04em; text-transform:uppercase;">${this.esc(ch.portals.perpusat.name)}</h3>
            <p style="font-size:0.86rem; color:var(--ice-blue); max-width:34ch;">${this.esc(ch.portals.perpusat.tagline)}</p>
            <span class="portal-enter-chip">Open Circle</span>
          </button>

          <button type="button" class="portal-gate-card ${this.activePortalKey === "bomba" ? "is-active" : ""}" data-portal-key="bomba" style="background-image:url('${this.esc(ch.portals.bomba.photos[0].src)}');">
            <span class="scene-meta-line">Portal II</span>
            <h3 style="font-size:1.65rem; letter-spacing:0.04em; text-transform:uppercase;">${this.esc(ch.portals.bomba.name)}</h3>
            <p style="font-size:0.86rem; color:var(--ice-blue); max-width:34ch;">${this.esc(ch.portals.bomba.tagline)}</p>
            <span class="portal-enter-chip">Open Circle</span>
          </button>
        </div>

        <div class="portal-chamber-panel anim-reveal" id="portal-chamber-mount"></div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      const chamber = mount.querySelector("#portal-chamber-mount");
      const renderPortal = (key) => {
        this.activePortalKey = key;
        const p = ch.portals[key];
        if (!p || !chamber) return;

        mount.querySelectorAll(".portal-gate-card").forEach((el) => {
          el.classList.toggle("is-active", el.getAttribute("data-portal-key") === key);
        });

        chamber.innerHTML = `
          <p class="scene-meta-line">Inside ${this.esc(p.name)}</p>
          <h3 style="font-size:1.55rem; margin-bottom:0.6rem;">${this.esc(p.name)}</h3>
          <p style="color:var(--ice-blue); margin-bottom:0.95rem;">${this.esc(p.story)}</p>
          <p class="handwritten" style="font-size:1.05rem; color:var(--soft-cyan); margin-bottom:1.4rem;">"${this.esc(p.personalMessage)}"</p>
          <div class="jakarta-gallery" style="margin-bottom:0;">
            ${p.photos
              .map(
                (ph, idx) => `
              <figure>
                ${this.buildPhotoFrame(ph, { lightboxGroup: `portal_${key}`, lightboxIndex: idx })}
                <figcaption style="margin-top:0.45rem; font-size:0.8rem; color:var(--ice-blue);">
                  <strong>${this.esc(ph.title)}</strong>: ${this.esc(ph.caption)}
                </figcaption>
              </figure>
            `
              )
              .join("")}
          </div>
        `;
        this.hydratePhotos(chamber, { [`portal_${key}`]: p.photos });
      };

      renderPortal(this.activePortalKey);
      mount.querySelectorAll(".portal-gate-card").forEach((btn) => {
        btn.addEventListener("click", () => {
          renderPortal(btn.getAttribute("data-portal-key"));
          if (window.OceanAudio) window.OceanAudio.playChime(1.1);
        });
      });
    },

    // ========================================================================
    // CHAPTER 06 : MARTABAK MANIS KEJU WITHOUT SUGAR
    // ========================================================================
    renderCh06Martabak(mount, ch, nextId) {
      const tc = ch.treasureChest;
      mount.innerHTML = `
        <header class="realm-hero anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="bakery-chest-stage anim-reveal">
          <button type="button" class="chest-interactive-box" id="martabak-chest-btn">
            ${ICONS.chest}
            <h3 style="font-size:1.3rem;">${this.esc(tc.chestTitle)}</h3>
            <p style="font-size:0.86rem; color:var(--warm-accent);" id="chest-status-label">
              ${this.chestUnlocked ? "Vault unlocked: secret recipe revealed" : "Open the bakery chest"}
            </p>
          </button>

          <div class="recipe-scroll-card" id="martabak-scroll">
            ${
              this.chestUnlocked
                ? this._buildMartabakScrollHTML(tc)
                : `<p class="scene-meta-line" style="color:var(--warm-accent);">Sealed Bakery Vault</p>
                   <h3 style="font-size:1.35rem; margin-bottom:0.55rem;">A Very Specific Order Waits Inside</h3>
                   <p style="color:var(--ice-blue); font-size:0.94rem;">Open the treasure chest beside this panel to inspect the golden no-sugar cheese martabak blueprint.</p>`
            }
          </div>
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      const chestBtn = mount.querySelector("#martabak-chest-btn");
      const scrollBox = mount.querySelector("#martabak-scroll");
      const statusLabel = mount.querySelector("#chest-status-label");
      const hydrateScroll = () => this.hydratePhotos(scrollBox, { martabakPhotos: tc.photos });

      if (this.chestUnlocked) hydrateScroll();

      if (chestBtn) {
        chestBtn.addEventListener("click", () => {
          this.chestUnlocked = true;
          if (statusLabel) statusLabel.textContent = "Vault unlocked: secret recipe revealed";
          if (scrollBox) {
            scrollBox.innerHTML = this._buildMartabakScrollHTML(tc);
            hydrateScroll();
          }
          if (window.OceanAudio) window.OceanAudio.playUnlock();
        });
      }
    },

    _buildMartabakScrollHTML(tc) {
      return `
        <p class="scene-meta-line" style="color:var(--warm-accent);">Secret Underwater Recipe</p>
        <h3 style="font-size:1.42rem; margin-bottom:0.45rem;">${this.esc(tc.recipeName)}</h3>
        <p style="font-size:0.9rem; color:#FCE9C8; margin-bottom:0.8rem;">${this.esc(tc.goldenRule)}</p>
        <ul class="recipe-list">
          ${tc.ingredients.map((item) => `<li>${this.esc(item)}</li>`).join("")}
        </ul>
        <p style="color:var(--ice-blue); font-size:0.92rem; margin-bottom:1.1rem;">${this.esc(tc.personalNote)}</p>
        <div style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:0.85rem;">
          ${tc.photos.map((ph, i) => this.buildPhotoFrame(ph, { lightboxGroup: "martabakPhotos", lightboxIndex: i })).join("")}
        </div>
      `;
    },

    // ========================================================================
    // CHAPTER 07 : ROTI ABON BLOK M
    // ========================================================================
    renderCh07RotiAbon(mount, ch, nextId) {
      mount.innerHTML = `
        <header class="realm-hero realm-hero-centered anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="bakery-window-arch anim-reveal">
          <p class="scene-meta-line" style="text-align:center; color:var(--warm-accent);">Illuminated Bakery Showcase</p>
          <div class="loaf-shelf">
            ${ch.loaves
              .map(
                (loaf, idx) => `
              <button type="button" class="loaf-card-btn" data-loaf-idx="${idx}">
                ${ICONS.loaf}
                <span class="preview-number" style="color:var(--warm-accent);">${this.esc(loaf.tag)}</span>
                <h3 style="font-size:1.15rem;">${this.esc(loaf.name)}</h3>
                <span style="font-size:0.8rem; color:var(--ice-blue);">Open loaf story</span>
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      mount.querySelectorAll(".loaf-card-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const loaf = ch.loaves[Number(btn.getAttribute("data-loaf-idx"))];
          if (!loaf) return;
          this.openDetailModal({
            eyebrow: `Roti Abon Blok M: ${loaf.tag}`,
            title: loaf.name,
            photo: loaf.photo,
            caption: loaf.caption,
            date: loaf.date,
            bodyText: loaf.story
          });
        });
      });
    },

    // ========================================================================
    // CHAPTER 08 : A THOUSAND STORIES IN A CUP OF COFFEE
    // ========================================================================
    renderCh08Coffee(mount, ch, nextId) {
      mount.innerHTML = `
        <header class="realm-hero anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="cafe-bistro-stage anim-reveal">
          <p class="scene-meta-line" style="color:var(--warm-accent); margin-bottom:1.2rem;">Floating Bistro Tables</p>
          <div class="coffee-cups-grid">
            ${ch.cups
              .map(
                (cup, idx) => `
              <button type="button" class="coffee-cup-btn" data-cup-idx="${idx}">
                ${ICONS.cup}
                <span style="font-size:0.74rem; font-weight:600; color:var(--warm-accent);">${this.esc(cup.mood)}</span>
                <strong style="font-size:0.98rem;">${this.esc(cup.brewName)}</strong>
                <span style="font-size:0.78rem; color:var(--ice-blue);">Open cup note</span>
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      mount.querySelectorAll(".coffee-cup-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const cup = ch.cups[Number(btn.getAttribute("data-cup-idx"))];
          if (!cup) return;
          this.openDetailModal({
            eyebrow: `Underwater Cafe: ${cup.mood}`,
            title: cup.brewName,
            photo: cup.photo,
            caption: cup.caption,
            date: cup.date,
            bodyText: cup.story
          });
        });
      });
    },

    // ========================================================================
    // CHAPTER 09 : NIGHTMARE OF KOKAS
    // ========================================================================
    renderCh09Kokas(mount, ch, nextId) {
      mount.innerHTML = `
        <header class="realm-hero anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="kokas-corridor anim-reveal">
          <p class="scene-meta-line" style="margin-bottom:1.15rem;">Submerged Arcade Signs</p>
          <div class="neon-signs-grid">
            ${ch.mishapCards
              .map(
                (card, idx) => `
              <button type="button" class="neon-sign-btn" data-kokas-idx="${idx}">
                <span class="neon-badge-text">${this.esc(card.signLabel)}</span>
                <h3 style="font-size:1.18rem;">${this.esc(card.objectName)}</h3>
                <span style="font-size:0.8rem; color:var(--ice-blue);">${this.esc(card.luckRating)}</span>
                <span style="font-size:0.78rem; color:var(--soft-cyan); margin-top:0.25rem;">Read story</span>
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      mount.querySelectorAll(".neon-sign-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const card = ch.mishapCards[Number(btn.getAttribute("data-kokas-idx"))];
          if (!card) return;
          this.openDetailModal({
            eyebrow: card.signLabel,
            title: card.title,
            subtitle: card.objectName,
            badge: card.luckRating,
            photo: card.photo,
            caption: card.caption,
            bodyText: card.story
          });
        });
      });
    },

    // ========================================================================
    // CHAPTER 10 : THE SECRET LIFE OF A PRIVATE FARM
    // ========================================================================
    renderCh10Farm(mount, ch, nextId) {
      mount.innerHTML = `
        <header class="realm-hero anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="farm-meadow-stage anim-reveal">
          <p class="scene-meta-line" style="margin-bottom:1.15rem;">Meadow Landmarks</p>
          <div class="farm-spots-grid">
            ${ch.farmSpots
              .map(
                (spot, idx) => `
              <button type="button" class="farm-spot-btn" data-farm-idx="${idx}">
                <span style="flex-shrink:0;">${ICONS[spot.icon] || ICONS.sprout}</span>
                <div>
                  <span style="font-size:0.76rem; color:var(--soft-cyan); font-weight:600;">${this.esc(spot.name)}</span>
                  <h3 style="font-size:1.15rem; margin:0.18rem 0;">${this.esc(spot.title)}</h3>
                  <span style="font-size:0.8rem; color:var(--ice-blue);">Open meadow note</span>
                </div>
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      mount.querySelectorAll(".farm-spot-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const spot = ch.farmSpots[Number(btn.getAttribute("data-farm-idx"))];
          if (!spot) return;
          this.openDetailModal({
            eyebrow: `Private Farm: ${spot.name}`,
            title: spot.title,
            photo: spot.photo,
            caption: spot.caption,
            bodyText: spot.note
          });
        });
      });
    },

    // ========================================================================
    // CHAPTER 11 : THE WOMAN WHO CHANGED THE STORY
    // ========================================================================
    renderCh11Cinema(mount, ch, nextId) {
      mount.innerHTML = `
        <header class="realm-hero realm-hero-centered anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="cinema-screen-stage anim-reveal">
          <div style="text-align:center; padding-bottom:1rem; border-bottom:1px solid var(--border-subtle);">
            <span class="preview-number">Original Tribute Reels</span>
            <p style="font-size:0.88rem; color:var(--ice-blue); margin-top:0.5rem;">Select any floating film reel to open its story card.</p>
          </div>
          <div class="cinema-reels-row">
            ${ch.filmReels
              .map(
                (reel, idx) => `
              <button type="button" class="film-reel-btn" data-reel-idx="${idx}">
                ${ICONS.reel}
                <span class="preview-number">${this.esc(reel.reelNumber)}</span>
                <h3 style="font-size:1.15rem;">${this.esc(reel.seriesTitle)}</h3>
                <p style="font-size:0.82rem; color:var(--soft-cyan);">${this.esc(reel.archetype)}</p>
                <span style="font-size:0.78rem; color:var(--ice-blue);">${this.esc(reel.vibeTag)}</span>
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      mount.querySelectorAll(".film-reel-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const reel = ch.filmReels[Number(btn.getAttribute("data-reel-idx"))];
          if (!reel) return;
          this.openDetailModal({
            eyebrow: `${reel.reelNumber}: ${reel.archetype}`,
            title: reel.seriesTitle,
            badge: reel.vibeTag,
            photo: reel.photo,
            caption: reel.caption,
            bodyText: reel.note
          });
        });
      });
    },

    // ========================================================================
    // CHAPTER 12 : SONGS WE LEFT BENEATH THE TIDE
    // ========================================================================
    renderCh12Music(mount, ch, nextId) {
      const bars = Array.from({ length: 16 }, (_, i) => {
        const delay = (i * 0.12).toFixed(2);
        return `<span class="wave-bar" style="animation-delay:-${delay}s;"></span>`;
      }).join("");

      const musicPhotos = ch.musicSections.map((s) => ({
        src: s.photo,
        title: s.title,
        caption: s.caption
      }));

      mount.innerHTML = `
        <header class="realm-hero realm-hero-centered anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="music-wave-banner anim-reveal" aria-hidden="true">${bars}</div>

        <div class="music-split-grid anim-reveal">
          ${ch.musicSections
            .map(
              (sec, idx) => `
            <article class="music-vessel">
              <span class="preview-number" style="align-self:flex-start;">${this.esc(sec.badge)}</span>
              <h3 style="font-size:1.6rem;">${this.esc(sec.title)}</h3>
              <p style="font-size:0.86rem; color:var(--soft-cyan);">${this.esc(sec.subtitle)}</p>
              ${this.buildPhotoFrame(musicPhotos[idx], { lightboxGroup: "musicPhotos", lightboxIndex: idx })}
              <p style="color:var(--ice-blue); font-size:0.94rem;">${this.esc(sec.description)}</p>
              <p class="handwritten" style="font-size:0.98rem; color:var(--white);">"${this.esc(sec.personalNote)}"</p>
              <div class="music-links-row">
                ${sec.links
                  .map(
                    (lk) => `
                  <a class="music-ext-link" href="${this.esc(lk.url)}" target="_blank" rel="noopener noreferrer">
                    <span>Listen on ${this.esc(lk.label)}</span>
                  </a>
                `
                  )
                  .join("")}
              </div>
            </article>
          `
            )
            .join("")}
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      this.hydratePhotos(mount, { musicPhotos });
    },

    // ========================================================================
    // CHAPTER 13 : THE WORLD BETWEEN THE PAGES
    // ========================================================================
    renderCh13Library(mount, ch, nextId) {
      mount.innerHTML = `
        <header class="realm-hero anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="library-shelves-stage anim-reveal">
          <p class="scene-meta-line" style="margin-bottom:1.15rem;">Select a Floating Volume</p>
          <div class="floating-books-grid">
            ${ch.books
              .map(
                (book, idx) => `
              <button type="button" class="floating-book-btn" data-book-idx="${idx}" style="border-left-color:${this.esc(book.spineColor)};">
                <span style="font-size:0.74rem; font-weight:600; color:var(--soft-cyan);">Volume 0${idx + 1}</span>
                <h3 style="font-size:1.22rem;">${this.esc(book.title)}</h3>
                <p style="font-size:0.84rem; color:var(--ice-blue);">${this.esc(book.author)}</p>
                <span style="font-size:0.8rem; color:var(--soft-cyan); margin-top:0.65rem;">Open pages</span>
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      mount.querySelectorAll(".floating-book-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const book = ch.books[Number(btn.getAttribute("data-book-idx"))];
          if (!book) return;
          this.openDetailModal({
            eyebrow: `${book.leftPageHeading}: ${book.author}`,
            title: book.title,
            photo: book.photo,
            caption: book.caption,
            bodyText: book.leftPageText,
            extraQuote: book.rightPageQuote
          });
        });
      });
    },

    // ========================================================================
    // CHAPTER 14 : WHERE THE MIST MEETS KALIURANG
    // ========================================================================
    renderCh14Kaliurang(mount, ch, nextId) {
      const kaliPhotos = ch.mistObjects.map((o) => ({
        src: o.photo,
        title: o.title,
        caption: o.caption,
        date: o.date
      }));

      mount.innerHTML = `
        <header class="realm-hero anim-reveal">
          <p class="scene-meta-line">Chapter ${ch.number}: ${this.esc(ch.zone)}</p>
          <h2 class="realm-title">${this.esc(ch.title)}</h2>
          <p class="realm-intro">${this.esc(ch.introNarrative)}</p>
        </header>

        <div class="kaliurang-mist-stage anim-reveal">
          <p class="scene-meta-line" style="margin-bottom:1.15rem;">Submerged Pine Highlands</p>
          <div class="kaliurang-grid">
            ${ch.mistObjects
              .map(
                (obj, idx) => `
              <div class="mist-card-btn">
                ${this.buildPhotoFrame(kaliPhotos[idx], { lightboxGroup: "kaliPhotos", lightboxIndex: idx })}
                <div>
                  <span style="font-size:0.76rem; color:var(--soft-cyan); font-weight:600;">${this.esc(obj.name)}</span>
                  <h3 style="font-size:1.2rem; margin:0.2rem 0 0.4rem;">${this.esc(obj.title)}</h3>
                  <p style="font-size:0.9rem; color:var(--ice-blue); margin-bottom:0.75rem;">${this.esc(obj.note)}</p>
                  <button type="button" class="hud-pill hud-pill-sm" data-kali-idx="${idx}">Read Mist Postcard</button>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <blockquote class="realm-quote-ribbon anim-reveal">
          <p>"${this.esc(ch.message)}"</p>
        </blockquote>

        ${this.buildChapterFooter(ch, nextId)}
      `;

      mount.querySelectorAll("[data-kali-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const obj = ch.mistObjects[Number(btn.getAttribute("data-kali-idx"))];
          if (!obj) return;
          this.openDetailModal({
            eyebrow: `Kaliurang Mist: ${obj.name}`,
            title: obj.title,
            photo: obj.photo,
            caption: obj.caption,
            date: obj.date,
            bodyText: obj.note
          });
        });
      });

      this.hydratePhotos(mount, { kaliPhotos });
    }
  };

  window.OceanInteractions = OceanInteractions;
})();
