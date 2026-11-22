/**
 * ============================================================================
 * A JOURNEY THROUGH THE BLUE : 3D DIMENSIONAL UNDERWATER ENGINE (THREE.JS)
 * ============================================================================
 */

(function () {
  "use strict";

  class OceanWorld3D {
    constructor() {
      this.canvas = null;
      this.renderer = null;
      this.scene = null;
      this.camera = null;
      this.whale = null;

      this.isReady = false;
      this.isPaused = false;
      this.isLiteMode = false;
      this.rafId = null;
      this.lastTime = 0;
      this.elapsed = 0;

      this.activeDimension = "gate";
      this.dimensionGroup = null;
      this.dimensionUpdaters = [];

      this.planktonPoints = null;
      this.bubblePoints = null;
      this.bubbleVelocities = [];
      this.jellyfishList = [];
      this.sunShafts = [];
      this.ambientLight = null;
      this.sunLight = null;
      this.accentLight = null;

      this.camPosTarget = null;
      this.camLookCurrent = null;
      this.camLookTarget = null;

      this.mapYaw = 0;
      this.mapPitch = 0.34;
      this.mapRadius = 35;
      this.mapFocusOffset = { x: 0, y: 0, z: 0 };
      this.mapFocusTarget = { x: 0, y: 0, z: 0 };
      this.isDraggingMap = false;
      this.dragStart = { x: 0, y: 0 };
      this.mapBeacons = [];
      this.onMapProjection = null;

      this.pointerNDC = { x: 0, y: 0 };
      this.raycaster = null;
      this.onWhaleClick = null;
      this.constellationLinesMesh = null;
    }

    init() {
      this.canvas = document.getElementById("ocean-canvas");
      if (!this.canvas || typeof window.THREE === "undefined") {
        document.body.classList.add("no-webgl");
        return false;
      }

      const THREE = window.THREE;
      try {
        this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        });
      } catch (err) {
        document.body.classList.add("no-webgl");
        return false;
      }

      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setSize(window.innerWidth, window.innerHeight, false);
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.08;

      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x071c36, 0.022);

      this.camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 220);
      this.camera.position.set(0, 1.4, 17);

      this.camPosTarget = new THREE.Vector3(0, 1.4, 17);
      this.camLookCurrent = new THREE.Vector3(0, 0.8, 0);
      this.camLookTarget = new THREE.Vector3(0, 0.8, 0);
      this.raycaster = new THREE.Raycaster();

      this.ambientLight = new THREE.HemisphereLight(0x88d4ef, 0x05152b, 0.95);
      this.scene.add(this.ambientLight);

      this.sunLight = new THREE.DirectionalLight(0xb9e8f5, 1.25);
      this.sunLight.position.set(12, 32, 16);
      this.scene.add(this.sunLight);

      this.accentLight = new THREE.PointLight(0x70c9e8, 1.2, 65, 1.6);
      this.accentLight.position.set(-10, 6, 8);
      this.scene.add(this.accentLight);

      this._buildSoftCircleTexture();
      this._buildPlanktonField();
      this._buildBubblesField();
      this._buildJellyfishSwarm();
      this._buildSunShafts();

      if (window.BlueWhaleGuide) {
        this.whale = new window.BlueWhaleGuide(THREE);
        this.scene.add(this.whale.group);
      }

      this.dimensionGroup = new THREE.Group();
      this.scene.add(this.dimensionGroup);

      this._bindEvents();
      this.isReady = true;
      this.lastTime = performance.now();
      this._startLoop();

      this.setDimension("gate");
      return true;
    }

    _buildSoftCircleTexture() {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d");
      const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
      grad.addColorStop(0, "rgba(244, 251, 255, 1)");
      grad.addColorStop(0.35, "rgba(185, 232, 245, 0.72)");
      grad.addColorStop(0.7, "rgba(112, 201, 232, 0.2)");
      grad.addColorStop(1, "rgba(112, 201, 232, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      this.glowTex = new window.THREE.CanvasTexture(c);

      const b = document.createElement("canvas");
      b.width = 64;
      b.height = 64;
      const bctx = b.getContext("2d");
      bctx.strokeStyle = "rgba(185, 232, 245, 0.85)";
      bctx.lineWidth = 3;
      bctx.beginPath();
      bctx.arc(32, 32, 24, 0, Math.PI * 2);
      bctx.stroke();
      bctx.fillStyle = "rgba(244, 251, 255, 0.85)";
      bctx.beginPath();
      bctx.arc(23, 22, 5.5, 0, Math.PI * 2);
      bctx.fill();
      this.bubbleTex = new window.THREE.CanvasTexture(b);
    }

    _buildPlanktonField() {
      const THREE = window.THREE;
      const count = 680;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 90;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 44;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 85;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.42,
        map: this.glowTex,
        transparent: true,
        opacity: 0.68,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0x9ce2f8
      });
      this.planktonPoints = new THREE.Points(geo, mat);
      this.scene.add(this.planktonPoints);
    }

    _buildBubblesField() {
      const THREE = window.THREE;
      const count = 190;
      const positions = new Float32Array(count * 3);
      this.bubbleVelocities = [];
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 65;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 36;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 58;
        this.bubbleVelocities.push({
          vy: 0.65 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2
        });
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.46,
        map: this.bubbleTex,
        transparent: true,
        opacity: 0.52,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      this.bubblePoints = new THREE.Points(geo, mat);
      this.scene.add(this.bubblePoints);
    }

    _buildJellyfishSwarm() {
      const THREE = window.THREE;
      const bellGeo = new THREE.SphereGeometry(0.75, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.58);
      const tentacleGeo = new THREE.CylinderGeometry(0.015, 0.005, 2.2, 5);

      for (let i = 0; i < 8; i++) {
        const group = new THREE.Group();
        const bellMat = new THREE.MeshPhongMaterial({
          color: i % 2 === 0 ? 0x70c9e8 : 0xb9e8f5,
          emissive: 0x246a9b,
          emissiveIntensity: 0.5,
          transparent: true,
          opacity: 0.36,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        group.add(new THREE.Mesh(bellGeo, bellMat));

        const tMat = new THREE.MeshBasicMaterial({
          color: 0xb9e8f5,
          transparent: true,
          opacity: 0.25
        });

        for (let t = 0; t < 4; t++) {
          const ang = (t / 4) * Math.PI * 2;
          const tent = new THREE.Mesh(tentacleGeo, tMat);
          tent.position.set(Math.cos(ang) * 0.28, -1.05, Math.sin(ang) * 0.28);
          group.add(tent);
        }

        group.scale.setScalar(0.55 + Math.random() * 0.65);
        group.position.set(
          (Math.random() - 0.5) * 44,
          (Math.random() - 0.5) * 18,
          -6 - Math.random() * 28
        );
        group.userData = {
          baseY: group.position.y,
          phase: Math.random() * Math.PI * 2,
          speed: 0.55 + Math.random() * 0.4
        };

        this.jellyfishList.push(group);
        this.scene.add(group);
      }
    }

    _buildSunShafts() {
      const THREE = window.THREE;
      const coneGeo = new THREE.ConeGeometry(4.5, 36, 16, 1, true);
      for (let i = 0; i < 5; i++) {
        const mat = new THREE.MeshBasicMaterial({
          color: 0x8cd9f2,
          transparent: true,
          opacity: 0.045,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        });
        const shaft = new THREE.Mesh(coneGeo, mat);
        shaft.position.set(-16 + i * 8, 12, -16 - (i % 2) * 7);
        shaft.rotation.z = -0.18 + i * 0.03;
        shaft.userData.baseX = shaft.position.x;
        shaft.userData.phase = i * 1.1;
        this.sunShafts.push(shaft);
        this.scene.add(shaft);
      }
    }

    _clearDimensionGroup() {
      this.dimensionUpdaters = [];
      this.constellationLinesMesh = null;
      while (this.dimensionGroup.children.length > 0) {
        const obj = this.dimensionGroup.children[0];
        this.dimensionGroup.remove(obj);
        obj.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
            else child.material.dispose();
          }
        });
      }
    }

    setDimension(dimKey, options = {}) {
      this.activeDimension = dimKey;
      document.body.setAttribute("data-dimension", dimKey);

      const backdropEl = document.getElementById("dimension-backdrop");
      if (backdropEl) {
        if (options.backdropImage) {
          backdropEl.style.backgroundImage = `url("${options.backdropImage}")`;
          backdropEl.classList.add("is-visible");
        } else {
          backdropEl.classList.remove("is-visible");
        }
      }

      if (!this.isReady) return;
      this._clearDimensionGroup();
      this.isDraggingMap = false;

      let fogHex = 0x071c36;
      let fogDensity = 0.02;
      let accentHex = 0x70c9e8;
      let accentIntensity = 1.25;

      switch (dimKey) {
        case "gate":
          fogHex = 0x05152b;
          fogDensity = 0.025;
          this.camPosTarget.set(0, 1.2, 16.5);
          this.camLookTarget.set(0, 0.8, 0);
          this._buildGatePortal3D();
          if (this.whale) this.whale.setMode("gate");
          break;

        case "welcome":
          fogHex = 0x0c345a;
          fogDensity = 0.017;
          this.camPosTarget.set(0, 2.2, 15.5);
          this.camLookTarget.set(0, 1.4, -6);
          this._buildWelcomeReef3D();
          if (this.whale) this.whale.setMode("welcome");
          break;

        case "map":
          fogHex = 0x092746;
          fogDensity = 0.013;
          this.mapFocusTarget = { x: 0, y: 0, z: 0 };
          this._buildOceanMap3D();
          if (this.whale) this.whale.setMode("map");
          break;

        case "jakarta":
          fogHex = 0x071d3a;
          fogDensity = 0.018;
          this.camPosTarget.set(0, 5.2, 21);
          this.camLookTarget.set(0, 2.4, -10);
          this._buildJakartaSkyline3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "beach":
          fogHex = 0x104670;
          fogDensity = 0.017;
          this.camPosTarget.set(0, 2.6, 16);
          this.camLookTarget.set(0, 0.5, -8);
          this._buildBeachLagoon3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "blue-garden":
          fogHex = 0x0b3158;
          fogDensity = 0.019;
          this.camPosTarget.set(0, 2.2, 16.5);
          this.camLookTarget.set(0, 1.0, -8);
          this._buildBlueCoralGarden3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "whale-sanctuary":
          fogHex = 0x0b3259;
          fogDensity = 0.016;
          this.camPosTarget.set(0, 2.4, 17);
          this.camLookTarget.set(0, 2.2, -10);
          this._buildMemorySpheres3D();
          if (this.whale) this.whale.setMode("whale-sanctuary");
          break;

        case "twin-portals":
          fogHex = 0x082342;
          fogDensity = 0.019;
          this.camPosTarget.set(0, 2.0, 18);
          this.camLookTarget.set(0, 1.4, -8);
          this._buildTwinPortals3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "garlic-kitchen":
        case "bakery-martabak":
        case "bakery-roti":
        case "coffee-cafe":
          fogHex = 0x0a2747;
          fogDensity = 0.02;
          accentHex = 0xe8b870;
          accentIntensity = 1.65;
          this.camPosTarget.set(0, 2.2, 16);
          this.camLookTarget.set(0, 1.0, -8);
          this._buildWarmLanterns3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "neon-kokas":
          fogHex = 0x05142b;
          fogDensity = 0.022;
          accentHex = 0x70c9e8;
          accentIntensity = 1.85;
          this.camPosTarget.set(0, 2.0, 17);
          this.camLookTarget.set(0, 1.8, -14);
          this._buildNeonCorridor3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "private-farm":
          fogHex = 0x0b3456;
          fogDensity = 0.018;
          accentHex = 0x8cf0d5;
          accentIntensity = 1.35;
          this.camPosTarget.set(0, 3.0, 17);
          this.camLookTarget.set(0, 0.5, -8);
          this._buildPrivateFarm3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "cinema":
          fogHex = 0x061933;
          fogDensity = 0.02;
          this.camPosTarget.set(0, 2.4, 17);
          this.camLookTarget.set(0, 1.6, -10);
          this._buildUnderwaterCinema3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "music-chamber":
          fogHex = 0x082447;
          fogDensity = 0.018;
          this.camPosTarget.set(0, 2.0, 17.5);
          this.camLookTarget.set(0, 1.4, -10);
          this._buildHarmonicRings3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "library":
          fogHex = 0x092444;
          fogDensity = 0.019;
          this.camPosTarget.set(0, 2.4, 17);
          this.camLookTarget.set(0, 1.5, -9);
          this._buildFloatingBooks3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "kaliurang":
          fogHex = 0x0d3659;
          fogDensity = 0.021;
          this.camPosTarget.set(0, 3.2, 18);
          this.camLookTarget.set(0, 2.0, -10);
          this._buildKaliurangForest3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "wishes":
          fogHex = 0x05162f;
          fogDensity = 0.015;
          this.camPosTarget.set(0, 2.4, 19);
          this.camLookTarget.set(0, 2.2, -10);
          this._buildConstellation3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "letter":
          fogHex = 0x061b36;
          fogDensity = 0.018;
          this.camPosTarget.set(0, 1.8, 15.5);
          this.camLookTarget.set(0, 1.2, -6);
          this._buildGlowingBottle3D();
          if (this.whale) this.whale.setMode("chapter");
          break;

        case "ending":
          fogHex = 0x165282;
          fogDensity = 0.013;
          accentHex = 0xf4fbff;
          accentIntensity = 1.9;
          this.camPosTarget.set(0, 1.5, 16);
          this.camLookTarget.set(0, 6.2, -16);
          this._buildEndingSurface3D();
          if (this.whale) this.whale.setMode("ending");
          break;

        default:
          this.camPosTarget.set(0, 2.2, 17);
          this.camLookTarget.set(0, 1.2, -8);
          if (this.whale) this.whale.setMode(dimKey === "memories" ? "memories" : "chapter");
          break;
      }

      this.scene.fog.color.setHex(fogHex);
      this.scene.fog.density = fogDensity;
      this.accentLight.color.setHex(accentHex);
      this.accentLight.intensity = accentIntensity;
    }

    _buildGatePortal3D() {
      const THREE = window.THREE;
      const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(5.8, 0.09, 16, 80),
        new THREE.MeshBasicMaterial({ color: 0x70c9e8, transparent: true, opacity: 0.45 })
      );
      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(7.2, 0.05, 12, 80),
        new THREE.MeshBasicMaterial({ color: 0xb9e8f5, transparent: true, opacity: 0.28 })
      );
      ring1.position.set(0, 0.8, -5);
      ring2.position.set(0, 0.8, -6.5);
      this.dimensionGroup.add(ring1, ring2);
      this.dimensionUpdaters.push((t) => {
        ring1.rotation.z = t * 0.14;
        ring2.rotation.z = -t * 0.1;
      });
    }

    _buildWelcomeReef3D() {
      const THREE = window.THREE;
      const floorGeo = new THREE.PlaneGeometry(110, 90, 32, 24);
      floorGeo.rotateX(-Math.PI / 2);
      const pos = floorGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        pos.setY(i, Math.sin(pos.getX(i) * 0.12) * 1.4 + Math.cos(pos.getZ(i) * 0.14) * 1.2 - 7.5);
      }
      floorGeo.computeVertexNormals();
      this.dimensionGroup.add(new THREE.Mesh(floorGeo, new THREE.MeshStandardMaterial({ color: 0x0b2d4f, roughness: 0.85 })));

      const coralGeo = new THREE.ConeGeometry(0.45, 3.6, 7);
      for (let i = 0; i < 16; i++) {
        const coral = new THREE.Mesh(
          coralGeo,
          new THREE.MeshStandardMaterial({
            color: i % 2 === 0 ? 0x1e6091 : 0x70c9e8,
            emissive: 0x134c78,
            emissiveIntensity: 0.42
          })
        );
        coral.position.set((Math.random() - 0.5) * 34, -5.6, -4 - Math.random() * 24);
        coral.rotation.z = (Math.random() - 0.5) * 0.35;
        coral.scale.setScalar(0.6 + Math.random() * 1.1);
        this.dimensionGroup.add(coral);
      }
    }

    _buildOceanMap3D() {
      const THREE = window.THREE;
      const seaGeo = new THREE.PlaneGeometry(86, 68, 42, 34);
      seaGeo.rotateX(-Math.PI / 2);
      const pos = seaGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        pos.setY(i, Math.sin(pos.getX(i) * 0.11) * Math.cos(pos.getZ(i) * 0.11) * 2.2 - 5.2);
      }
      seaGeo.computeVertexNormals();

      const seabed = new THREE.Mesh(seaGeo, new THREE.MeshStandardMaterial({ color: 0x092442, roughness: 0.9, transparent: true, opacity: 0.88 }));
      const wire = new THREE.Mesh(seaGeo.clone(), new THREE.MeshBasicMaterial({ color: 0x3b8bb8, wireframe: true, transparent: true, opacity: 0.14 }));
      wire.position.y = 0.08;
      this.dimensionGroup.add(seabed, wire);

      [10, 19, 28].forEach((radius) => {
        const rMesh = new THREE.Mesh(
          new THREE.RingGeometry(radius - 0.06, radius + 0.06, 80),
          new THREE.MeshBasicMaterial({ color: 0x70c9e8, transparent: true, opacity: 0.18, side: THREE.DoubleSide })
        );
        rMesh.rotation.x = -Math.PI / 2;
        rMesh.position.y = -4.2;
        this.dimensionGroup.add(rMesh);
      });

      const pillarGeo = new THREE.CylinderGeometry(0.1, 0.25, 4.2, 8);
      const orbGeo = new THREE.SphereGeometry(0.46, 14, 14);
      const beacons3D = [];

      this.mapBeacons.forEach((b) => {
        const group = new THREE.Group();
        group.position.set(b.coords.x, b.coords.y, b.coords.z);
        const pillar = new THREE.Mesh(pillarGeo, new THREE.MeshBasicMaterial({ color: 0x70c9e8, transparent: true, opacity: 0.26 }));
        pillar.position.y = -2.2;
        const orb = new THREE.Mesh(orbGeo, new THREE.MeshBasicMaterial({ color: b.discovered ? 0xf4fbff : 0x70c9e8, transparent: true, opacity: 0.82 }));
        group.add(pillar, orb);
        this.dimensionGroup.add(group);
        beacons3D.push({ orb });
      });

      if (this.mapBeacons.length >= 2) {
        const pts = this.mapBeacons.map((b) => new THREE.Vector3(b.coords.x, b.coords.y - 0.5, b.coords.z));
        const curve = new THREE.CatmullRomCurve3(pts);
        this.dimensionGroup.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(curve.getPoints(160)),
            new THREE.LineBasicMaterial({ color: 0x70c9e8, transparent: true, opacity: 0.22 })
          )
        );
      }

      this.dimensionUpdaters.push((t) => {
        beacons3D.forEach((item, idx) => {
          item.orb.position.y = Math.sin(t * 1.8 + idx) * 0.26;
        });
      });
    }

    _buildJakartaSkyline3D() {
      const THREE = window.THREE;
      for (let i = 0; i < 32; i++) {
        const w = 1.1 + Math.random() * 2;
        const h = 5 + Math.random() * 14;
        const d = 1.1 + Math.random() * 2;
        const tower = new THREE.Mesh(
          new THREE.BoxGeometry(w, h, d),
          new THREE.MeshStandardMaterial({
            color: 0x103c68,
            emissive: i % 3 === 0 ? 0x2a7fb2 : 0x124670,
            emissiveIntensity: 0.52,
            transparent: true,
            opacity: 0.72
          })
        );
        const angle = (i / 32) * Math.PI * 1.5 - Math.PI * 0.75;
        const dist = 12 + Math.random() * 14;
        tower.position.set(Math.sin(angle) * dist * 1.3, h * 0.5 - 8.5, -Math.cos(angle) * dist - 4);
        this.dimensionGroup.add(tower);
      }
    }

    _buildBeachLagoon3D() {
      const THREE = window.THREE;
      const sandGeo = new THREE.PlaneGeometry(80, 60, 30, 24);
      sandGeo.rotateX(-Math.PI / 2);
      const pos = sandGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) pos.setY(i, Math.sin(pos.getX(i) * 0.25) * 0.65 - 5.4);
      sandGeo.computeVertexNormals();
      this.dimensionGroup.add(new THREE.Mesh(sandGeo, new THREE.MeshStandardMaterial({ color: 0x1a567d, roughness: 0.9 })));
    }

    _buildBlueCoralGarden3D() {
      const THREE = window.THREE;
      const shades = [0x0a2540, 0x123f67, 0x246a9b, 0x70c9e8, 0xb9e8f5];
      for (let i = 0; i < 22; i++) {
        const mesh = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.65 + Math.random() * 0.9, 1),
          new THREE.MeshStandardMaterial({
            color: shades[i % shades.length],
            emissive: shades[(i + 2) % shades.length],
            emissiveIntensity: 0.35,
            transparent: true,
            opacity: 0.76
          })
        );
        mesh.position.set((Math.random() - 0.5) * 30, -4.5 + Math.random() * 8, -6 - Math.random() * 18);
        this.dimensionGroup.add(mesh);
      }
    }

    _buildMemorySpheres3D() {
      const THREE = window.THREE;
      const orbs = [];
      const geo = new THREE.SphereGeometry(0.6, 16, 16);
      for (let i = 0; i < 16; i++) {
        const m = new THREE.Mesh(
          geo,
          new THREE.MeshStandardMaterial({ color: 0xb9e8f5, emissive: 0x70c9e8, emissiveIntensity: 0.48, transparent: true, opacity: 0.34 })
        );
        m.position.set((Math.random() - 0.5) * 26, (Math.random() - 0.5) * 10, -6 - Math.random() * 14);
        m.userData = { baseY: m.position.y, phase: Math.random() * Math.PI * 2 };
        orbs.push(m);
        this.dimensionGroup.add(m);
      }
      this.dimensionUpdaters.push((t) => {
        orbs.forEach((o) => { o.position.y = o.userData.baseY + Math.sin(t + o.userData.phase) * 0.8; });
      });
    }

    _buildTwinPortals3D() {
      const THREE = window.THREE;
      const makePortal = (x, color) => {
        const g = new THREE.Group();
        g.position.set(x, 1.5, -10);
        const outer = new THREE.Mesh(new THREE.TorusGeometry(4.1, 0.12, 16, 64), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.65 }));
        const inner = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.06, 12, 64), new THREE.MeshBasicMaterial({ color: 0xf4fbff, transparent: true, opacity: 0.4 }));
        g.add(outer, inner);
        this.dimensionGroup.add(g);
        return { outer, inner };
      };
      const left = makePortal(-7.5, 0x70c9e8);
      const right = makePortal(7.5, 0xb9e8f5);
      this.dimensionUpdaters.push((t) => {
        left.outer.rotation.z = t * 0.4;
        left.inner.rotation.z = -t * 0.65;
        right.outer.rotation.z = -t * 0.4;
        right.inner.rotation.z = t * 0.65;
      });
    }

    _buildWarmLanterns3D() {
      const THREE = window.THREE;
      const lanterns = [];
      const geo = new THREE.SphereGeometry(0.42, 14, 14);
      for (let i = 0; i < 14; i++) {
        const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0xe8b870 : 0x70c9e8, transparent: true, opacity: 0.62 }));
        m.position.set((Math.random() - 0.5) * 28, -2 + Math.random() * 10, -5 - Math.random() * 16);
        m.userData = { baseY: m.position.y, phase: i * 0.8 };
        lanterns.push(m);
        this.dimensionGroup.add(m);
      }
      this.dimensionUpdaters.push((t) => {
        lanterns.forEach((l) => { l.position.y = l.userData.baseY + Math.sin(t * 0.9 + l.userData.phase) * 0.6; });
      });
    }

    _buildNeonCorridor3D() {
      const THREE = window.THREE;
      const arches = [];
      for (let i = 0; i < 7; i++) {
        const frame = new THREE.Mesh(new THREE.TorusGeometry(6.2, 0.06, 8, 4), new THREE.MeshBasicMaterial({ color: 0x70c9e8, transparent: true, opacity: 0.4 - i * 0.04 }));
        frame.rotation.z = Math.PI / 4;
        frame.position.set(0, 1.8, -3 - i * 4.5);
        arches.push(frame);
        this.dimensionGroup.add(frame);
      }
      this.dimensionUpdaters.push((t) => {
        arches.forEach((a, i) => { a.material.opacity = 0.2 + Math.abs(Math.sin(t * 1.4 - i * 0.5)) * 0.3; });
      });
    }

    _buildPrivateFarm3D() {
      const THREE = window.THREE;
      const hillGeo = new THREE.PlaneGeometry(76, 56, 26, 20);
      hillGeo.rotateX(-Math.PI / 2);
      const pos = hillGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) pos.setY(i, Math.sin(pos.getX(i) * 0.09) * 1.6 + Math.cos(pos.getZ(i) * 0.1) * 1.3 - 5.8);
      hillGeo.computeVertexNormals();
      this.dimensionGroup.add(new THREE.Mesh(hillGeo, new THREE.MeshStandardMaterial({ color: 0x114866, roughness: 0.9 })));
    }

    _buildUnderwaterCinema3D() {
      const THREE = window.THREE;
      const beam = new THREE.Mesh(
        new THREE.ConeGeometry(8.5, 28, 24, 1, true),
        new THREE.MeshBasicMaterial({ color: 0xb9e8f5, transparent: true, opacity: 0.075, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })
      );
      beam.rotation.x = Math.PI / 2;
      beam.position.set(0, 2.5, -10);
      this.dimensionGroup.add(beam);
      this.dimensionUpdaters.push((t) => { beam.material.opacity = 0.055 + Math.sin(t * 3.1) * 0.02; });
    }

    _buildHarmonicRings3D() {
      const THREE = window.THREE;
      const rings = [];
      for (let i = 0; i < 6; i++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(2.5 + i * 1.9, 0.045, 10, 72), new THREE.MeshBasicMaterial({ color: 0x70c9e8, transparent: true, opacity: 0.36 }));
        ring.position.set(0, 1.5, -12);
        rings.push(ring);
        this.dimensionGroup.add(ring);
      }
      this.dimensionUpdaters.push((t) => {
        rings.forEach((r, idx) => {
          const s = 1 + Math.sin(t * 1.8 - idx * 0.65) * 0.09;
          r.scale.set(s, s, 1);
        });
      });
    }

    _buildFloatingBooks3D() {
      const THREE = window.THREE;
      const pages = [];
      const geo = new THREE.BoxGeometry(1.15, 0.14, 1.55);
      for (let i = 0; i < 16; i++) {
        const book = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x1d5b8c : 0x70c9e8, emissive: 0x123f67, emissiveIntensity: 0.4 }));
        book.position.set((Math.random() - 0.5) * 28, -2 + Math.random() * 11, -6 - Math.random() * 16);
        book.rotation.set(Math.random(), Math.random(), Math.random());
        book.userData = { baseY: book.position.y, phase: i * 0.7 };
        pages.push(book);
        this.dimensionGroup.add(book);
      }
      this.dimensionUpdaters.push((t) => {
        pages.forEach((b) => {
          b.position.y = b.userData.baseY + Math.sin(t * 0.8 + b.userData.phase) * 0.55;
          b.rotation.y += 0.004;
        });
      });
    }

    _buildKaliurangForest3D() {
      const THREE = window.THREE;
      const pineGeo = new THREE.ConeGeometry(1.5, 9.5, 7);
      const pineMat = new THREE.MeshStandardMaterial({ color: 0x0e3b5c, emissive: 0x0a2540, emissiveIntensity: 0.45, transparent: true, opacity: 0.82 });
      for (let i = 0; i < 20; i++) {
        const tree = new THREE.Mesh(pineGeo, pineMat);
        tree.position.set((Math.random() - 0.5) * 38, -2.8, -8 - Math.random() * 20);
        tree.scale.setScalar(0.65 + Math.random() * 0.9);
        this.dimensionGroup.add(tree);
      }
    }

    _buildConstellation3D() {
      const THREE = window.THREE;
      const wishes = (window.birthdayConfig && window.birthdayConfig.birthdayWishes) || [];
      const pts = [];
      const starGeo = new THREE.SphereGeometry(0.28, 12, 12);

      wishes.forEach((w) => {
        const x = (w.pos.x - 50) * 0.34;
        const y = (50 - w.pos.y) * 0.22 + 2.2;
        const z = -10;
        pts.push(new THREE.Vector3(x, y, z));
        const star = new THREE.Mesh(starGeo, new THREE.MeshBasicMaterial({ color: 0xf4fbff }));
        star.position.set(x, y, z);
        this.dimensionGroup.add(star);
      });

      if (pts.length >= 2) {
        this.constellationLinesMesh = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: 0x70c9e8, transparent: true, opacity: 0.14 })
        );
        this.dimensionGroup.add(this.constellationLinesMesh);
      }
    }

    setConstellationComplete(complete) {
      if (this.constellationLinesMesh && this.constellationLinesMesh.material) {
        this.constellationLinesMesh.material.opacity = complete ? 0.9 : 0.14;
      }
    }

    _buildGlowingBottle3D() {
      const THREE = window.THREE;
      const bottle = new THREE.Group();
      const glassMat = new THREE.MeshStandardMaterial({ color: 0xb9e8f5, emissive: 0x70c9e8, emissiveIntensity: 0.45, transparent: true, opacity: 0.45, roughness: 0.1 });
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.78, 2.3, 18), glassMat);
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.45, 0.9, 14), glassMat);
      neck.position.y = 1.5;
      const scroll = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.5, 12), new THREE.MeshBasicMaterial({ color: 0xf4fbff, transparent: true, opacity: 0.85 }));
      bottle.add(body, neck, scroll);
      bottle.position.set(0, 1.8, -6);
      bottle.rotation.z = 0.22;
      this.dimensionGroup.add(bottle);

      this.dimensionUpdaters.push((t) => {
        bottle.position.y = 1.8 + Math.sin(t * 1.4) * 0.45;
        bottle.rotation.y = t * 0.35;
      });
    }

    _buildEndingSurface3D() {
      const THREE = window.THREE;
      const surf = new THREE.Mesh(
        new THREE.PlaneGeometry(140, 140, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0xb9e8f5, transparent: true, opacity: 0.24, side: THREE.DoubleSide })
      );
      surf.rotation.x = Math.PI / 2;
      surf.position.set(0, 16, -18);
      this.dimensionGroup.add(surf);

      const starGeo = new THREE.SphereGeometry(0.18, 10, 10);
      const stars = [];
      for (let i = 0; i < 42; i++) {
        const s = new THREE.Mesh(starGeo, new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0xf4fbff : 0x70c9e8 }));
        s.position.set((Math.random() - 0.5) * 36, -8 + Math.random() * 24, -6 - Math.random() * 24);
        s.userData.speed = 0.8 + Math.random() * 1.3;
        stars.push(s);
        this.dimensionGroup.add(s);
      }
      this.dimensionUpdaters.push((t, dt) => {
        stars.forEach((s) => {
          s.position.y += dt * s.userData.speed;
          if (s.position.y > 16) s.position.y = -8;
        });
      });
    }

    registerMapBeacons(beacons) {
      this.mapBeacons = beacons;
      if (this.activeDimension === "map" && this.isReady) {
        this._clearDimensionGroup();
        this._buildOceanMap3D();
      }
    }

    focusMapTarget(coords) {
      this.mapFocusTarget = { x: coords.x * 0.45, y: coords.y * 0.35, z: coords.z * 0.45 };
      if (this.whale) this.whale.swimToward(coords.x, coords.y, coords.z, 6.5);
    }

    resetMapCamera() {
      this.mapYaw = 0;
      this.mapPitch = 0.34;
      this.mapRadius = 35;
      this.mapFocusTarget = { x: 0, y: 0, z: 0 };
    }

    triggerGateUnlockCamera() {
      if (!this.isReady) return;
      this.camPosTarget.set(0, 1.2, -2);
      if (this.whale) {
        this.whale.swimToward(0, 1.4, -7, 4.5);
        this.whale.triggerClickReaction();
      }
    }

    triggerWhaleInteraction() {
      if (this.whale) this.whale.triggerClickReaction();
    }

    setLiteMode(enabled) {
      this.isLiteMode = Boolean(enabled);
      document.body.classList.toggle("lite-mode", this.isLiteMode);
      if (this.isLiteMode) this.pause();
      else this.resume();
    }

    pause() {
      this.isPaused = true;
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    }

    resume() {
      if (!this.isReady || this.isLiteMode) return;
      if (!this.isPaused && this.rafId) return;
      this.isPaused = false;
      this.lastTime = performance.now();
      this._startLoop();
    }

    _bindEvents() {
      window.addEventListener("resize", () => {
        if (!this.isReady) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight, false);
      });

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) this.pause();
        else if (!this.isLiteMode) this.resume();
      });

      window.addEventListener("pointermove", (e) => {
        this.pointerNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.pointerNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;

        if (this.isDraggingMap && this.activeDimension === "map") {
          const dx = e.clientX - this.dragStart.x;
          const dy = e.clientY - this.dragStart.y;
          this.dragStart.x = e.clientX;
          this.dragStart.y = e.clientY;
          this.mapYaw -= dx * 0.0045;
          this.mapPitch = Math.max(0.14, Math.min(0.85, this.mapPitch + dy * 0.0038));
        }
      });

      window.addEventListener("pointerdown", (e) => {
        const isTrackerMode = window.OceanNavigation && window.OceanNavigation.mapViewMode === "tracker";
        if (
          this.activeDimension === "map" &&
          isTrackerMode &&
          e.target.closest(".tracker-viewport") &&
          !e.target.closest("button, a, input, aside, nav, dialog, .tracker-popover-card")
        ) {
          this.isDraggingMap = true;
          this.dragStart.x = e.clientX;
          this.dragStart.y = e.clientY;
        }
      });

      window.addEventListener("pointerup", () => { this.isDraggingMap = false; });

      window.addEventListener("wheel", (e) => {
        if (this.activeDimension !== "map") return;
        const isTrackerMode = window.OceanNavigation && window.OceanNavigation.mapViewMode === "tracker";
        if (!isTrackerMode || !e.target.closest(".tracker-viewport")) return;
        if (e.target.closest(".map-index-drawer, dialog, .tracker-popover-card")) return;
        this.mapRadius = Math.max(22, Math.min(48, this.mapRadius + e.deltaY * 0.015));
      }, { passive: true });

      window.addEventListener("click", (e) => {
        if (!this.isReady || this.isLiteMode || !this.whale) return;
        if (e.target.closest("button, a, input, dialog, .tracker-popover-card, .map-index-drawer")) return;

        const mouse = new window.THREE.Vector2(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1
        );
        this.raycaster.setFromCamera(mouse, this.camera);
        const hits = this.raycaster.intersectObjects(this.whale.group.children, true);
        if (hits.length > 0 && typeof this.onWhaleClick === "function") {
          this.whale.triggerClickReaction();
          this.onWhaleClick();
        }
      });
    }

    _startLoop() {
      const tick = (now) => {
        if (this.isPaused) return;
        this.rafId = requestAnimationFrame(tick);
        const dt = Math.min((now - this.lastTime) / 1000, 0.05);
        this.lastTime = now;
        this.elapsed += dt;
        this._updateScene(dt);
        this.renderer.render(this.scene, this.camera);
      };
      this.rafId = requestAnimationFrame(tick);
    }

    _updateScene(dt) {
      const t = this.elapsed;
      if (this.whale) this.whale.update(dt);

      if (this.planktonPoints) {
        this.planktonPoints.rotation.y = t * 0.018;
        this.planktonPoints.position.y = Math.sin(t * 0.25) * 0.6;
      }

      if (this.bubblePoints) {
        const arr = this.bubblePoints.geometry.attributes.position.array;
        for (let i = 0; i < this.bubbleVelocities.length; i++) {
          const v = this.bubbleVelocities[i];
          arr[i * 3 + 1] += v.vy * dt;
          arr[i * 3] += Math.sin(t * 1.4 + v.phase) * 0.008;
          if (arr[i * 3 + 1] > 18) arr[i * 3 + 1] = -18;
        }
        this.bubblePoints.geometry.attributes.position.needsUpdate = true;
      }

      for (let i = 0; i < this.jellyfishList.length; i++) {
        const j = this.jellyfishList[i];
        const d = j.userData;
        j.position.y = d.baseY + Math.sin(t * d.speed + d.phase) * 1.5;
      }

      for (let i = 0; i < this.sunShafts.length; i++) {
        const s = this.sunShafts[i];
        s.position.x = s.userData.baseX + Math.sin(t * 0.3 + s.userData.phase) * 1.4;
      }

      for (let i = 0; i < this.dimensionUpdaters.length; i++) {
        this.dimensionUpdaters[i](t, dt);
      }

      const ease = 1 - Math.exp(-dt * 2.4);
      if (this.activeDimension === "map") {
        this.mapFocusOffset.x += (this.mapFocusTarget.x - this.mapFocusOffset.x) * ease;
        this.mapFocusOffset.y += (this.mapFocusTarget.y - this.mapFocusOffset.y) * ease;
        this.mapFocusOffset.z += (this.mapFocusTarget.z - this.mapFocusOffset.z) * ease;

        const aspect = window.innerWidth / Math.max(1, window.innerHeight);
        const responsiveRadius = aspect < 1.3 ? this.mapRadius * (1.32 / Math.max(0.7, aspect)) : this.mapRadius;
        const targetX = this.mapFocusOffset.x + Math.sin(this.mapYaw) * Math.cos(this.mapPitch) * responsiveRadius;
        const targetY = this.mapFocusOffset.y + Math.sin(this.mapPitch) * responsiveRadius + 2.5;
        const targetZ = this.mapFocusOffset.z + Math.cos(this.mapYaw) * Math.cos(this.mapPitch) * responsiveRadius;

        this.camera.position.x += (targetX - this.camera.position.x) * ease;
        this.camera.position.y += (targetY - this.camera.position.y) * ease;
        this.camera.position.z += (targetZ - this.camera.position.z) * ease;

        this.camLookCurrent.set(this.mapFocusOffset.x, this.mapFocusOffset.y, this.mapFocusOffset.z);
        this.camera.lookAt(this.camLookCurrent);

        if (typeof this.onMapProjection === "function" && this.mapBeacons.length) {
          this.camera.updateMatrixWorld();
          const projected = [];
          const v = new window.THREE.Vector3();
          const w = window.innerWidth;
          const h = window.innerHeight;
          for (let i = 0; i < this.mapBeacons.length; i++) {
            const b = this.mapBeacons[i];
            v.set(b.coords.x, b.coords.y + 0.9, b.coords.z);
            v.project(this.camera);
            projected.push({
              id: b.id,
              x: (v.x * 0.5 + 0.5) * w,
              y: (-v.y * 0.5 + 0.5) * h,
              z: v.z,
              visible: v.z < 1 && v.z > -1
            });
          }
          this.onMapProjection(projected);
        }
      } else {
        const px = this.pointerNDC.x * 1.1;
        const py = this.pointerNDC.y * 0.65;
        this.camera.position.x += (this.camPosTarget.x + px - this.camera.position.x) * ease;
        this.camera.position.y += (this.camPosTarget.y + py - this.camera.position.y) * ease;
        this.camera.position.z += (this.camPosTarget.z - this.camera.position.z) * ease;
        this.camLookCurrent.lerp(this.camLookTarget, ease);
        this.camera.lookAt(this.camLookCurrent);
      }
    }
  }

  window.OceanWorld = new OceanWorld3D();
})();
