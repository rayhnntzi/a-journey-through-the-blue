/**
 * ============================================================================
 * A JOURNEY THROUGH THE BLUE : HYBRID EXPLORATION, ADVENTURE TRAIL & 3D TRACKER
 * ============================================================================
 */

(function () {
  "use strict";

  const STORAGE_KEY = "journey_through_the_blue_progress_v1";

  const OceanNavigation = {
    currentScene: "gate",
    currentChapterId: null,
    selectedMapId: null,
    mapViewMode: "trail", // "trail" (Adventure Trail) | "tracker" (OCEARCH 3D Console)
    discovered: new Set(),
    toastTimer: null,
    hintIndex: 0,
    markerNodes: new Map(),

    getAllDestinations() {
      const cfg = window.birthdayConfig;
      if (!cfg) return [];
      return [cfg.jakartaChapter, ...cfg.chapters];
    },

    getDestinationThumb(dest) {
      if (!dest) return "assets/images/fantasy/ocean-whale-realm.jpg";
      if (dest.backdropImage) return dest.backdropImage;
      if (dest.mystery && dest.mystery.photo) return dest.mystery.photo;
      if (dest.portals && dest.portals.perpusat && dest.portals.perpusat.photos[0]) return dest.portals.perpusat.photos[0].src;
      if (dest.treasureChest && dest.treasureChest.photos[0]) return dest.treasureChest.photos[0].src;
      if (dest.loaves && dest.loaves[0]) return dest.loaves[0].photo;
      if (dest.cups && dest.cups[0]) return dest.cups[0].photo;
      if (dest.mishapCards && dest.mishapCards[0]) return dest.mishapCards[0].photo;
      if (dest.farmSpots && dest.farmSpots[0]) return dest.farmSpots[0].photo;
      if (dest.filmReels && dest.filmReels[0]) return dest.filmReels[0].photo;
      if (dest.musicSections && dest.musicSections[0]) return dest.musicSections[0].photo;
      if (dest.books && dest.books[0]) return dest.books[0].photo;
      if (dest.mistObjects && dest.mistObjects[0]) return dest.mistObjects[0].photo;
      if (dest.seashells && dest.seashells[0]) return dest.seashells[0].photo;
      if (dest.blueObjects && dest.blueObjects[0]) return dest.blueObjects[0].photo;
      return "assets/images/fantasy/ocean-whale-realm.jpg";
    },

    init() {
      this._loadProgress();
      this._buildAdventureTrail();
      this._buildTrackerAndDirectory();
      this._bindMapEvents();
      this._syncProgressUI();
      this._syncStaticCounts();

      if (window.OceanWorld) {
        this._syncWorldBeacons();
        window.OceanWorld.onMapProjection = (projectedList) => this._positionProjectedMarkers(projectedList);
      }
    },

    _syncStaticCounts() {
      const cfg = window.birthdayConfig;
      if (!cfg) return;
      const realmsCount = this.getAllDestinations().length;
      const memCount = (cfg.personalMemories || []).length;
      const envCount = (cfg.forgottenMemories || []).length;
      const wishCount = (cfg.birthdayWishes || []).length;

      const setText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = String(val);
      };

      setText("welcome-stat-realms", realmsCount);
      setText("welcome-stat-memories", memCount);
      setText("welcome-stat-wishes", wishCount);
      setText("interlude-realms", realmsCount);
      setText("interlude-memories", memCount);
      setText("interlude-envelopes", envCount);
      setText("interlude-wishes", wishCount);
    },

    _loadProgress() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        this.discovered = new Set(parsed.discovered || []);
        if (window.OceanMemory && parsed.memoryState) {
          window.OceanMemory.loadSavedState(parsed.memoryState);
        }
      } catch (err) {
        // Storage unavailable
      }
    },

    saveProgress() {
      try {
        const payload = {
          discovered: Array.from(this.discovered),
          memoryState: window.OceanMemory ? window.OceanMemory.exportState() : {}
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (err) {
        // Ignore storage errors
      }
      this._syncProgressUI();
    },

    resetAllProgress() {
      this.discovered.clear();
      this.selectedMapId = null;
      if (window.OceanMemory) window.OceanMemory.resetState();
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        // Ignore
      }
      this._syncProgressUI();
      this._syncWorldBeacons();
    },

    _syncWorldBeacons() {
      if (!window.OceanWorld) return;
      const list = this.getAllDestinations().map((d) => ({
        id: d.id,
        coords: d.mapCoords || { x: 0, y: 0, z: 0 },
        discovered: this.discovered.has(d.id)
      }));
      window.OceanWorld.registerMapBeacons(list);
    },

    // ------------------------------------------------------------------------
    // VIEW A: WINDING UNDERWATER ADVENTURE TRAIL (Reference 1 Ali Hamza)
    // ------------------------------------------------------------------------
    _buildAdventureTrail() {
      const mount = document.getElementById("adventure-trail-nodes");
      if (!mount) return;
      mount.innerHTML = "";

      const destinations = this.getAllDestinations();
      const warmThemes = new Set(["bakery-martabak", "bakery-roti", "coffee-cafe"]);

      destinations.forEach((dest, idx) => {
        const thumb = this.getDestinationThumb(dest);
        const isWarm = warmThemes.has(dest.dimensionTheme);
        const isReversed = idx % 2 === 1;

        const article = document.createElement("article");
        article.className = `trail-node${isReversed ? " is-reversed" : ""}`;
        article.setAttribute("data-trail-id", dest.id);
        article.setAttribute("data-level-num", dest.number);

        article.innerHTML = `
          <button type="button" class="trail-portal-visual${isWarm ? " is-warm" : ""}" data-open-dest="${dest.id}" aria-label="Enter Level ${dest.number}: ${dest.title}">
            <img src="${thumb}" width="640" height="400" loading="lazy" decoding="async" alt="${dest.title}" />
            <span class="trail-signpost">LEVEL ${dest.number}</span>
          </button>

          <div class="trail-copy-card">
            <div class="trail-zone-row">
              <span>${dest.zone || "Underwater Realm"}</span>
              <span class="trail-status-pill" data-trail-status="${dest.id}">Unexplored</span>
            </div>
            <h3 class="trail-title">${dest.title}</h3>
            <p class="trail-desc">${dest.shortDescription}</p>
            <button type="button" class="btn-ocean-primary" data-open-dest="${dest.id}">
              <span>Enter Chapter</span>
            </button>
          </div>
        `;

        article.querySelectorAll("[data-open-dest]").forEach((btn) => {
          btn.addEventListener("click", () => {
            if (window.OceanWorld && dest.mapCoords) {
              window.OceanWorld.focusMapTarget(dest.mapCoords);
            }
            this.openChapter(dest.id);
          });
        });

        mount.appendChild(article);
      });
    },

    // ------------------------------------------------------------------------
    // VIEW B: OCEARCH 3D TRACKER CONSOLE & SLIDE-OUT DIRECTORY DRAWER
    // ------------------------------------------------------------------------
    _buildTrackerAndDirectory() {
      const layer = document.getElementById("map-markers-layer");
      const sidebarList = document.getElementById("tracker-realm-list");
      const drawerList = document.getElementById("map-index-list");
      if (!layer || !sidebarList || !drawerList) return;

      layer.innerHTML = "";
      sidebarList.innerHTML = "";
      drawerList.innerHTML = "";
      this.markerNodes.clear();

      const destinations = this.getAllDestinations();
      destinations.forEach((dest, idx) => {
        // 1. Projected glowing beacon inside Tracker 3D Viewport
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "ocean-marker";
        btn.setAttribute("data-dest-id", dest.id);
        btn.setAttribute("aria-label", `Inspect ${dest.number}: ${dest.title}`);
        btn.innerHTML = `
          <span class="ocean-marker-orb">${dest.number}</span>
          <span class="ocean-marker-label">${dest.title}</span>
        `;
        btn.addEventListener("click", () => this.selectMapDestination(dest.id));
        layer.appendChild(btn);
        this.markerNodes.set(dest.id, { el: btn, dest, idx });

        // 2. Tracker Sidebar Row (OCEARCH Global Tracker style)
        const sbRow = document.createElement("button");
        sbRow.type = "button";
        sbRow.className = "tracker-list-btn";
        sbRow.setAttribute("data-tracker-id", dest.id);
        sbRow.innerHTML = `
          <div>
            <span class="tracker-list-title">${dest.title}</span>
            <span class="tracker-list-zone">${dest.zone || ""}</span>
          </div>
          <span class="tracker-list-num">${dest.number}</span>
        `;
        sbRow.addEventListener("click", () => this.selectMapDestination(dest.id));
        sidebarList.appendChild(sbRow);

        // 3. Slide-out Atlas Drawer Item
        const row = document.createElement("button");
        row.type = "button";
        row.className = "drawer-item";
        row.setAttribute("data-drawer-dest", dest.id);
        row.innerHTML = `
          <div>
            <span class="drawer-item-title">${dest.number}: ${dest.title}</span>
            <span class="drawer-item-zone">${dest.zone || ""}</span>
          </div>
          <span class="drawer-badge" data-drawer-badge="${dest.id}">Unexplored</span>
        `;
        row.addEventListener("click", () => {
          this.toggleIndexDrawer(false);
          this.openChapter(dest.id);
        });
        drawerList.appendChild(row);
      });

      this._layoutFallbackMarkers();
    },

    setMapView(mode) {
      this.mapViewMode = mode === "tracker" ? "tracker" : "trail";
      const trailPanel = document.getElementById("map-trail-view");
      const trackerPanel = document.getElementById("map-tracker-view");
      const trailTab = document.getElementById("tab-map-trail");
      const trackerTab = document.getElementById("tab-map-tracker");

      if (trailPanel) trailPanel.hidden = this.mapViewMode !== "trail";
      if (trackerPanel) trackerPanel.hidden = this.mapViewMode !== "tracker";
      if (trailTab) {
        trailTab.classList.toggle("is-active", this.mapViewMode === "trail");
        trailTab.setAttribute("aria-selected", String(this.mapViewMode === "trail"));
      }
      if (trackerTab) {
        trackerTab.classList.toggle("is-active", this.mapViewMode === "tracker");
        trackerTab.setAttribute("aria-selected", String(this.mapViewMode === "tracker"));
      }

      if (this.mapViewMode === "tracker") {
        this._layoutFallbackMarkers();
      } else {
        this.closeMapPreview();
      }

      if (window.OceanAudio) window.OceanAudio.playBubble();
    },

    _layoutFallbackMarkers() {
      const destinations = this.getAllDestinations();
      const total = destinations.length;
      const layer = document.getElementById("map-markers-layer");
      const width = layer ? layer.clientWidth : window.innerWidth;
      const isNarrow = width < 560;
      const cols = isNarrow ? 3 : 5;
      const rows = Math.ceil(total / cols);

      destinations.forEach((d, idx) => {
        const entry = this.markerNodes.get(d.id);
        if (!entry) return;
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const xPct = isNarrow
          ? 18 + (col / Math.max(1, cols - 1)) * 64
          : 14 + (col / Math.max(1, cols - 1)) * 72;
        const yPct = 18 + (row / Math.max(1, rows - 1)) * 64;

        if (isNarrow || document.body.classList.contains("lite-mode") || document.body.classList.contains("no-webgl")) {
          entry.el.style.left = `${xPct}%`;
          entry.el.style.top = `${yPct}%`;
          entry.el.style.opacity = "1";
          entry.el.style.pointerEvents = "auto";
          entry.el.style.transform = "translate(-50%, -50%) scale(1)";
        }
      });
    },

    _positionProjectedMarkers(projectedList) {
      if (this.currentScene !== "map" || this.mapViewMode !== "tracker") return;
      const layer = document.getElementById("map-markers-layer");
      if (!layer) return;

      const rect = layer.getBoundingClientRect();
      if (rect.width < 120 || rect.height < 120) return;
      if (rect.width < 520 || document.body.classList.contains("lite-mode") || document.body.classList.contains("no-webgl")) {
        return;
      }

      const padX = 78;
      const padTop = 58;
      const padBottom = 46;
      const maxX = rect.width - padX;
      const maxY = rect.height - padBottom;

      const items = [];
      projectedList.forEach((p) => {
        const entry = this.markerNodes.get(p.id);
        if (!entry) return;
        if (!p.visible) {
          entry.el.style.opacity = "0";
          entry.el.style.pointerEvents = "none";
          return;
        }
        // Map full-viewport projection proportionally into tracker viewport box
        const localX = (p.x / Math.max(1, window.innerWidth)) * rect.width;
        const localY = (p.y / Math.max(1, window.innerHeight)) * rect.height;
        items.push({
          entry,
          z: p.z,
          x: Math.max(padX, Math.min(maxX, localX)),
          y: Math.max(padTop, Math.min(maxY, localY))
        });
      });

      const minW = 122;
      const minH = 56;
      for (let pass = 0; pass < 5; pass++) {
        for (let i = 0; i < items.length; i++) {
          for (let j = i + 1; j < items.length; j++) {
            const a = items[i];
            const b = items[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const overlapX = minW - Math.abs(dx);
            const overlapY = minH - Math.abs(dy);
            if (overlapX > 0 && overlapY > 0) {
              if (overlapX < overlapY) {
                const shift = overlapX * 0.52 * (dx >= 0 ? 1 : -1);
                a.x -= shift;
                b.x += shift;
              } else {
                const shift = overlapY * 0.52 * (dy >= 0 ? 1 : -1);
                a.y -= shift;
                b.y += shift;
              }
              a.x = Math.max(padX, Math.min(maxX, a.x));
              b.x = Math.max(padX, Math.min(maxX, b.x));
              a.y = Math.max(padTop, Math.min(maxY, a.y));
              b.y = Math.max(padTop, Math.min(maxY, b.y));
            }
          }
        }
      }

      items.forEach((item) => {
        const el = item.entry.el;
        const depthScale = Math.max(0.86, Math.min(1.08, 1.35 - item.z * 0.4));
        el.style.left = `${item.x.toFixed(1)}px`;
        el.style.top = `${item.y.toFixed(1)}px`;
        el.style.opacity = "1";
        el.style.pointerEvents = "auto";
        el.style.zIndex = String(Math.round((1 - item.z) * 100));
        el.style.transform = `translate(-50%, -50%) scale(${depthScale.toFixed(3)})`;
      });
    },

    selectMapDestination(destId) {
      const dest = this.getAllDestinations().find((d) => d.id === destId);
      if (!dest) return;
      this.selectedMapId = destId;

      if (window.OceanAudio) window.OceanAudio.playBubble();

      this.markerNodes.forEach((entry, id) => {
        entry.el.classList.toggle("is-selected", id === destId);
      });

      document.querySelectorAll(".tracker-list-btn").forEach((btn) => {
        btn.classList.toggle("is-selected", btn.getAttribute("data-tracker-id") === destId);
      });

      if (window.OceanWorld && dest.mapCoords) {
        window.OceanWorld.focusMapTarget(dest.mapCoords);
      }

      const card = document.getElementById("map-preview-card");
      const thumbEl = document.getElementById("preview-thumb");
      const numEl = document.getElementById("preview-number");
      const zoneEl = document.getElementById("preview-zone");
      const statusEl = document.getElementById("preview-status");
      const titleEl = document.getElementById("preview-title");
      const descEl = document.getElementById("preview-desc");

      const isDisc = this.discovered.has(dest.id);
      if (thumbEl) {
        thumbEl.src = this.getDestinationThumb(dest);
        thumbEl.alt = dest.title;
      }
      if (numEl) numEl.textContent = dest.id === "jakarta" ? "Level 00" : `Level ${dest.number}`;
      if (zoneEl) zoneEl.textContent = dest.zone || "";
      if (statusEl) {
        statusEl.textContent = isDisc ? "Discovered" : "Unexplored";
        statusEl.classList.toggle("is-discovered", isDisc);
      }
      if (titleEl) titleEl.textContent = dest.title;
      if (descEl) descEl.textContent = dest.shortDescription;
      if (card) {
        card.classList.add("is-open");
        card.setAttribute("aria-hidden", "false");
      }
    },

    closeMapPreview() {
      this.selectedMapId = null;
      this.markerNodes.forEach((entry) => entry.el.classList.remove("is-selected"));
      document.querySelectorAll(".tracker-list-btn").forEach((btn) => btn.classList.remove("is-selected"));
      const card = document.getElementById("map-preview-card");
      if (card) {
        card.classList.remove("is-open");
        card.setAttribute("aria-hidden", "true");
      }
    },

    toggleIndexDrawer(forceState) {
      const drawer = document.getElementById("map-index-drawer");
      const mobileBtn = document.getElementById("hud-mobile-menu");
      if (!drawer) return;
      const open = typeof forceState === "boolean" ? forceState : !drawer.classList.contains("is-open");
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      if (mobileBtn) mobileBtn.setAttribute("aria-expanded", String(open));
    },

    _bindMapEvents() {
      const mapTabs = Array.from(document.querySelectorAll(".map-tab-btn"));
      mapTabs.forEach((tab, idx) => {
        tab.addEventListener("click", () => {
          this.setMapView(tab.getAttribute("data-map-view"));
        });
        tab.addEventListener("keydown", (e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
          e.preventDefault();
          let nextIdx = idx;
          if (e.key === "ArrowRight") nextIdx = (idx + 1) % mapTabs.length;
          if (e.key === "ArrowLeft") nextIdx = (idx - 1 + mapTabs.length) % mapTabs.length;
          if (e.key === "Home") nextIdx = 0;
          if (e.key === "End") nextIdx = mapTabs.length - 1;
          const nextTab = mapTabs[nextIdx];
          if (nextTab) {
            nextTab.focus();
            this.setMapView(nextTab.getAttribute("data-map-view"));
          }
        });
      });

      const exploreBtn = document.getElementById("preview-explore-btn");
      if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
          if (this.selectedMapId) this.openChapter(this.selectedMapId);
        });
      }

      const closePreview = document.getElementById("map-preview-close");
      if (closePreview) closePreview.addEventListener("click", () => this.closeMapPreview());

      const resetCam = document.getElementById("map-reset-camera");
      if (resetCam) {
        resetCam.addEventListener("click", () => {
          this.closeMapPreview();
          if (window.OceanWorld) window.OceanWorld.resetMapCamera();
          if (window.OceanAudio) window.OceanAudio.playBubble();
        });
      }

      const drawerClose = document.getElementById("map-drawer-close");
      if (drawerClose) drawerClose.addEventListener("click", () => this.toggleIndexDrawer(false));

      document.querySelectorAll("[data-drawer-scene]").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.toggleIndexDrawer(false);
          this.goToScene(btn.getAttribute("data-drawer-scene"));
        });
      });

      document.querySelectorAll(".folded-step[data-goto], .current-beacon[data-goto]").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.goToScene(btn.getAttribute("data-goto"));
        });
      });

      window.addEventListener("resize", () => this._layoutFallbackMarkers());
    },

    // ------------------------------------------------------------------------
    // LIVE PROGRESS SYNC ACROSS ALL VIEWS (Welcome, Trail, Tracker, HUD, Drawer)
    // ------------------------------------------------------------------------
    _syncProgressUI() {
      const total = this.getAllDestinations().length;
      const count = this.discovered.size;
      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
      const labelStr = `${count} of ${total} destinations discovered.`;

      const hudText = document.getElementById("hud-progress-text");
      const mapLabel = document.getElementById("map-progress-label");
      const mapPct = document.getElementById("map-progress-percent");
      const mapFill = document.getElementById("map-progress-fill");
      const progressbar = document.getElementById("map-progressbar");
      const welcomeDisc = document.getElementById("welcome-stat-discovered");
      const welcomePct = document.getElementById("welcome-overlay-pct");
      const welcomeFill = document.getElementById("welcome-overlay-fill");

      if (hudText) hudText.textContent = `${count}/${total}`;
      if (mapLabel) mapLabel.textContent = labelStr;
      if (mapPct) mapPct.textContent = `${pct}%`;
      if (mapFill) mapFill.style.width = `${pct}%`;
      if (progressbar) progressbar.setAttribute("aria-valuenow", String(count));
      if (welcomeDisc) welcomeDisc.textContent = `${count}/${total}`;
      if (welcomePct) welcomePct.textContent = `${pct}% Explored`;
      if (welcomeFill) welcomeFill.style.width = `${pct}%`;

      this.markerNodes.forEach((entry, id) => {
        const isDisc = this.discovered.has(id);
        entry.el.classList.toggle("is-discovered", isDisc);

        const drawerBadge = document.querySelector(`[data-drawer-badge="${id}"]`);
        if (drawerBadge) {
          drawerBadge.textContent = isDisc ? "Discovered" : "Unexplored";
          drawerBadge.classList.toggle("is-discovered", isDisc);
        }

        const trailNode = document.querySelector(`[data-trail-id="${id}"]`);
        if (trailNode) trailNode.classList.toggle("is-discovered", isDisc);

        const trailPill = document.querySelector(`[data-trail-status="${id}"]`);
        if (trailPill) trailPill.textContent = isDisc ? "Discovered" : "Unexplored";

        const trackerRow = document.querySelector(`[data-tracker-id="${id}"]`);
        if (trackerRow) trackerRow.classList.toggle("is-discovered", isDisc);
      });
    },

    // ------------------------------------------------------------------------
    // SCENE & CHAPTER NAVIGATION
    // ------------------------------------------------------------------------
    openChapter(destId) {
      const dest = this.getAllDestinations().find((d) => d.id === destId);
      if (!dest) return;

      this.closeMapPreview();
      this.toggleIndexDrawer(false);

      const newlyDiscovered = !this.discovered.has(dest.id);
      this.discovered.add(dest.id);
      this.currentChapterId = dest.id;
      this.saveProgress();
      this._syncWorldBeacons();

      const transition = dest.transitionType || "ripple";

      window.OceanAnimations.playTransition(transition, () => {
        this._switchSceneDOM("chapter", dest.id);
        if (window.OceanWorld) {
          window.OceanWorld.setDimension(dest.dimensionTheme || "chapter", {
            backdropImage: dest.backdropImage || ""
          });
        }
        if (window.OceanInteractions) {
          window.OceanInteractions.renderDestination(dest.id);
        }
        window.scrollTo({ top: 0, behavior: "auto" });

        if (newlyDiscovered && this.discovered.size === this.getAllDestinations().length) {
          this.showWhaleWhisper("You have discovered all 15 realms. Follow the Story Map toward Six Wishes and the Ocean Letter.");
        }
      });
    },

    goToScene(sceneName, customTransition, options = {}) {
      this.closeMapPreview();
      this.toggleIndexDrawer(false);
      if (window.OceanInteractions) window.OceanInteractions.closeAllModals();
      if (window.OceanMemory) window.OceanMemory.stopTypewriter();

      const defaultTransitions = {
        gate: "fade",
        welcome: "warp",
        map: "whale",
        memories: "bubbles",
        forgotten: "depth",
        wishes: "ripple",
        letter: "fade",
        ending: "whale"
      };
      const transType = customTransition || defaultTransitions[sceneName] || "fade";

      window.OceanAnimations.playTransition(transType, () => {
        this._switchSceneDOM(sceneName);

        const dimBackdrops = {
          welcome: "assets/images/fantasy/ocean-whale-realm.jpg",
          memories: "assets/images/fantasy/coral-beach-realm.jpg",
          ending: "assets/images/fantasy/ocean-whale-realm.jpg"
        };

        if (window.OceanWorld) {
          window.OceanWorld.setDimension(sceneName, {
            backdropImage: dimBackdrops[sceneName] || ""
          });
        }

        if (sceneName === "map") {
          if (options.mapView) this.setMapView(options.mapView);
          this._layoutFallbackMarkers();
          this._syncWorldBeacons();
        } else if (sceneName === "memories" && window.OceanMemory) {
          window.OceanMemory.renderMemoriesScene();
        } else if (sceneName === "forgotten" && window.OceanMemory) {
          window.OceanMemory.renderForgottenScene();
        } else if (sceneName === "wishes" && window.OceanMemory) {
          window.OceanMemory.renderWishesScene();
        } else if (sceneName === "letter" && window.OceanMemory) {
          window.OceanMemory.renderLetterScene();
        } else if (sceneName === "ending" && window.OceanMemory) {
          window.OceanMemory.renderEndingScene();
        } else if (sceneName === "welcome") {
          const welcomeEl = document.getElementById("scene-welcome");
          if (window.OceanAnimations) window.OceanAnimations.revealElements(welcomeEl);
        }

        window.scrollTo({ top: 0, behavior: "auto" });
      });
    },

    _switchSceneDOM(sceneName, activeChapterId = null) {
      this.currentScene = sceneName;
      document.body.setAttribute("data-scene", sceneName);

      const scenes = ["gate", "welcome", "map", "chapter", "memories", "forgotten", "wishes", "letter", "ending"];
      scenes.forEach((name) => {
        const el = document.getElementById(`scene-${name}`);
        if (!el) return;
        const active = name === sceneName;
        el.hidden = !active;
        el.classList.toggle("is-active", active);
      });

      const hud = document.getElementById("ocean-hud");
      const backBtn = document.getElementById("hud-back-map");
      if (hud) hud.classList.toggle("is-hidden", sceneName === "gate");
      if (backBtn) {
        const showBack = sceneName !== "gate" && sceneName !== "welcome" && sceneName !== "map";
        backBtn.classList.toggle("is-hidden", !showBack);
      }

      // Highlight active top-bar realm link
      document.querySelectorAll(".hud-nav-link").forEach((link) => {
        const s = link.getAttribute("data-hud-scene");
        const c = link.getAttribute("data-hud-chapter");
        const active = (s && s === sceneName) || (c && sceneName === "chapter" && activeChapterId === c);
        link.classList.toggle("is-active", Boolean(active));
      });
    },

    showWhaleWhisper(customMessage) {
      const toast = document.getElementById("whale-toast");
      const textEl = document.getElementById("whale-toast-text");
      if (!toast || !textEl) return;

      const cfg = window.birthdayConfig;
      const hints = (cfg && cfg.whaleGuide && cfg.whaleGuide.clickHints) || [
        "Follow the stepping stones or open the 3D Tracker to discover every realm."
      ];

      const message = customMessage || hints[this.hintIndex % hints.length];
      if (!customMessage) this.hintIndex += 1;

      textEl.textContent = message;
      toast.classList.add("is-visible");
      toast.setAttribute("aria-hidden", "false");

      if (this.toastTimer) window.clearTimeout(this.toastTimer);
      this.toastTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
        toast.setAttribute("aria-hidden", "true");
      }, 5200);
    }
  };

  window.OceanNavigation = OceanNavigation;
})();
