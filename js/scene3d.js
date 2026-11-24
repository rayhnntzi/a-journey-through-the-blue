/**
 * ============================================================================
 * FULL 3D STORYBOOK ENGINE WITH REALISTIC ARTICULATED BLUE WHALE (Three.js)
 * 1) Background World 3D: Sunlit clouds, coastal hills, lighthouse & cottage,
 *    animated 3D ocean waves, floating 3D bubbles, 3D confetti, and a realistic
 *    articulated 3D Blue Whale (Balaenoptera musculus) with mottled skin
 *    texture, ventral throat pleats, and full spine-to-tail sinusoidal swim.
 * 2) Interactive Stage Prop 3D:
 *    - Step 1: Realistic 3D Blue Whale + Frosted Portal Ring + 3D Golden Key
 *    - Step 4: Real 3D translucent glass Wish Jar with cork & 6 bouncing 3D stars
 *    - Step 5: Real 3D cream envelope with hinged flap & 3D blue wax seal
 * ============================================================================
 */

(function () {
  "use strict";

  const THREE = window.THREE;

  function createClayMat(color, roughness = 0.45, metalness = 0.05) {
    return new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness
    });
  }

  // --------------------------------------------------------------------------
  // REALISTIC 3D BLUE WHALE BUILDER (Balaenoptera musculus)
  // 44-ring lofted fusiform body, procedural mottled slate-blue skin + ventral
  // throat pleats, swept pectoral flippers, aft falcate dorsal fin, notched
  // crescent horizontal flukes, and live sinusoidal spine-to-tail undulation.
  // --------------------------------------------------------------------------
  let cachedWhaleSkinTex = null;

  function getRealisticWhaleSkinTexture() {
    if (cachedWhaleSkinTex) return cachedWhaleSkinTex;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Natural blue-grey dorsal-to-pale ventral countershading
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, "#1C476B");
    grad.addColorStop(0.28, "#2B628C");
    grad.addColorStop(0.52, "#4680A8");
    grad.addColorStop(0.72, "#92BFD6");
    grad.addColorStop(1.0, "#D3E7F2");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Organic Blue Whale dorsal mottling (pale silver-blue & deeper slate spots)
    let seed = 4219;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < 520; i++) {
      const x = rand() * 512;
      const y = rand() * 310;
      const rx = 3 + rand() * 16;
      const ry = 1.6 + rand() * 6.5;
      ctx.fillStyle =
        rand() > 0.42
          ? `rgba(195, 224, 240, ${0.06 + rand() * 0.16})`
          : `rgba(15, 42, 68, ${0.07 + rand() * 0.16})`;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, (rand() - 0.5) * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Subtle ventral throat pleats (longitudinal rorqual grooves from chin to mid-belly)
    ctx.strokeStyle = "rgba(24, 58, 86, 0.28)";
    ctx.lineWidth = 2;
    for (let y = 322; y < 504; y += 8) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(318, y);
      ctx.stroke();
    }

    // Fine jawline demarcation near snout
    ctx.strokeStyle = "rgba(18, 44, 68, 0.36)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 295);
    ctx.quadraticCurveTo(90, 315, 165, 292);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    cachedWhaleSkinTex = tex;
    return tex;
  }

  function createRealisticWhaleBodyGeo() {
    const rings = 44;
    const segs = 28;
    const noseZ = 5.6;
    const tailZ = -4.75;

    const positions = [];
    const uvs = [];
    const indices = [];

    for (let i = 0; i <= rings; i++) {
      const t = i / rings;
      const z = noseZ + (tailZ - noseZ) * t;
      let rx, ryUpper, ryLower, yCenter;

      if (t < 0.04) {
        // Broad, flat U-shaped rostrum tip
        const k = t / 0.04;
        const s = Math.sin(k * Math.PI * 0.5);
        rx = 0.06 + 0.54 * s;
        ryUpper = 0.035 + 0.22 * s;
        ryLower = 0.04 + 0.26 * s;
        yCenter = -0.02;
      } else if (t < 0.34) {
        // Streamlined head widening into thoracic torso
        const k = (t - 0.04) / 0.30;
        const ease = Math.sin(k * Math.PI * 0.5);
        rx = 0.60 + 0.65 * ease;
        ryUpper = 0.255 + 0.625 * ease;
        ryLower = 0.30 + 0.72 * ease;
        yCenter = -0.04 * (1 - k);
      } else if (t < 0.64) {
        // Long sleek fuselage tapering cleanly aft
        const k = (t - 0.34) / 0.30;
        rx = 1.25 - 0.54 * Math.pow(k, 1.35);
        ryUpper = 0.88 - 0.26 * k;
        ryLower = 1.02 - 0.44 * Math.pow(k, 1.15);
        yCenter = 0.05 * k;
      } else {
        // Muscular tail stock (peduncle) tapering toward flukes
        const k = (t - 0.64) / 0.36;
        rx = Math.max(0.08, 0.71 * Math.pow(1 - k, 1.45));
        ryUpper = Math.max(0.11, 0.62 * Math.pow(1 - k, 1.05));
        ryLower = Math.max(0.10, 0.58 * Math.pow(1 - k, 1.1));
        yCenter = 0.05 * (1 - k);
      }

      // Subtle blowhole splashguard ridge (~20%) and aft dorsal crest (~71%)
      const blowholeRidge = Math.exp(-Math.pow((t - 0.21) / 0.032, 2)) * 0.08;
      const dorsalBump = Math.exp(-Math.pow((t - 0.71) / 0.045, 2)) * 0.14;

      for (let j = 0; j <= segs; j++) {
        const theta = (j / segs) * Math.PI * 2;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);
        const x = sinT * rx;
        const ridge = cosT > 0.85 ? dorsalBump + blowholeRidge : 0;
        const y =
          cosT >= 0
            ? yCenter + Math.pow(cosT, 0.92) * (ryUpper + ridge)
            : yCenter - Math.pow(-cosT, 0.88) * ryLower;

        positions.push(x, y, z);
        uvs.push(t, 0.5 - cosT * 0.5);
      }
    }

    const stride = segs + 1;
    for (let i = 0; i < rings; i++) {
      for (let j = 0; j < segs; j++) {
        const a = i * stride + j;
        const b = (i + 1) * stride + j;
        const c = (i + 1) * stride + (j + 1);
        const d = i * stride + (j + 1);
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  function createRealisticFlukesGeo() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.25);
    shape.bezierCurveTo(0.45, 0.18, 1.45, -0.35, 2.28, -0.95);
    shape.bezierCurveTo(1.78, -1.12, 0.95, -0.82, 0.14, -0.42);
    shape.lineTo(0, -0.58);
    shape.lineTo(-0.14, -0.42);
    shape.bezierCurveTo(-0.95, -0.82, -1.78, -1.12, -2.28, -0.95);
    shape.bezierCurveTo(-1.45, -0.35, -0.45, 0.18, 0, 0.25);

    const extrude = new THREE.ExtrudeGeometry(shape, {
      depth: 0.085,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.038,
      bevelThickness: 0.038
    });
    extrude.rotateX(Math.PI / 2);
    extrude.translate(0, 0.04, -4.55);
    extrude.computeVertexNormals();
    return extrude;
  }

  function createRealisticPectoralGeo(side) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.28);
    shape.bezierCurveTo(0.65 * side, 0.12, 1.55 * side, -0.55, 2.05 * side, -1.35);
    shape.bezierCurveTo(1.62 * side, -1.42, 0.72 * side, -0.92, 0, -0.35);
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.075,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.032,
      bevelThickness: 0.032
    });
    geo.rotateX(Math.PI / 2);
    geo.computeVertexNormals();
    return geo;
  }

  function createRealisticDorsalGeo() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(-0.15, 0.34, -0.48, 0.50, -0.72, 0.54);
    shape.bezierCurveTo(-0.56, 0.28, -0.52, 0.10, -0.68, 0);
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.065,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.022,
      bevelThickness: 0.022
    });
    geo.rotateY(-Math.PI / 2);
    geo.translate(0.032, 0, 0);
    geo.computeVertexNormals();
    return geo;
  }

  function buildRealisticWhale3D(scale = 0.42) {
    const group = new THREE.Group();
    const skinTex = getRealisticWhaleSkinTexture();

    const bodyMat = new THREE.MeshStandardMaterial({
      map: skinTex,
      roughness: 0.34,
      metalness: 0.08
    });

    const finMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#24577D"),
      roughness: 0.38,
      metalness: 0.08
    });

    const bodyGeo = createRealisticWhaleBodyGeo();
    const bodyBasePos = new Float32Array(bodyGeo.attributes.position.array);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(bodyMesh);

    const flukeGeo = createRealisticFlukesGeo();
    const flukeBasePos = new Float32Array(flukeGeo.attributes.position.array);
    const flukeMesh = new THREE.Mesh(flukeGeo, finMat);
    group.add(flukeMesh);

    const finL = new THREE.Mesh(createRealisticPectoralGeo(1), finMat);
    finL.position.set(0.95, -0.34, 1.55);
    finL.rotation.z = -0.32;

    const finR = new THREE.Mesh(createRealisticPectoralGeo(-1), finMat);
    finR.position.set(-0.95, -0.34, 1.55);
    finR.rotation.z = 0.32;
    group.add(finL, finR);

    const dorsal = new THREE.Mesh(createRealisticDorsalGeo(), finMat);
    dorsal.position.set(0, 0.56, -1.78);
    group.add(dorsal);

    // Subtle anatomically scaled dark lateral eyes near jaw corner
    const eyeGeo = new THREE.SphereGeometry(0.075, 14, 14);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x0a1624,
      roughness: 0.1,
      metalness: 0.35
    });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(0.93, -0.08, 2.78);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(-0.93, -0.08, 2.78);
    group.add(eyeL, eyeR);

    // Fine realistic blowhole mist particles
    const mistGroup = new THREE.Group();
    mistGroup.position.set(0, 0.88, 3.35);
    const mistMat = new THREE.MeshBasicMaterial({
      color: 0xf4fbff,
      transparent: true,
      opacity: 0.45
    });
    const mistPuffs = [];
    for (let i = 0; i < 6; i++) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), mistMat);
      puff.userData = {
        side: i % 2 === 0 ? 1 : -1,
        phase: i * 0.55
      };
      mistGroup.add(puff);
      mistPuffs.push(puff);
    }
    group.add(mistGroup);

    group.scale.setScalar(scale);

    return {
      group,
      bodyGeo,
      bodyBasePos,
      flukeGeo,
      flukeBasePos,
      finL,
      finR,
      mistPuffs,
      updateUndulation(phase) {
        const bArr = bodyGeo.attributes.position.array;
        for (let i = 0; i < bArr.length; i += 3) {
          const bx = bodyBasePos[i];
          const by = bodyBasePos[i + 1];
          const bz = bodyBasePos[i + 2];
          const dist = Math.max(0, (5.6 - bz) / 10.35);
          const amp = dist * dist * 0.68;
          bArr[i] = bx;
          bArr[i + 1] = by + Math.sin(phase - dist * 4.2) * amp;
          bArr[i + 2] = bz;
        }
        bodyGeo.attributes.position.needsUpdate = true;
        bodyGeo.computeVertexNormals();

        const fArr = flukeGeo.attributes.position.array;
        for (let i = 0; i < fArr.length; i += 3) {
          const fx = flukeBasePos[i];
          const fy = flukeBasePos[i + 1];
          const fz = flukeBasePos[i + 2];
          const dist = Math.max(0, (5.6 - fz) / 10.35);
          const amp = dist * dist * 0.78;
          fArr[i] = fx;
          fArr[i + 1] = fy + Math.sin(phase - dist * 4.2) * amp;
          fArr[i + 2] = fz;
        }
        flukeGeo.attributes.position.needsUpdate = true;

        const flap = Math.sin(phase * 0.65) * 0.11;
        finL.rotation.z = -0.32 + flap;
        finR.rotation.z = 0.32 - flap;

        mistPuffs.forEach((p) => {
          const t = ((phase * 0.28 + p.userData.phase) % 1);
          p.position.set(p.userData.side * t * 0.35, t * 1.15, -t * 0.25);
          const s = Math.sin(t * Math.PI) * (0.65 + t * 0.9);
          p.scale.setScalar(Math.max(0.01, s));
        });
      }
    };
  }

  // --------------------------------------------------------------------------
  // 5-POINTED 3D EXTRUDED STAR HELPER (For Wish Jar & Envelope Seal)
  // --------------------------------------------------------------------------
  function createStarMesh3D(color, size = 0.34, depth = 0.12) {
    const shape = new THREE.Shape();
    const spikes = 5;
    const outerR = size;
    const innerR = size * 0.48;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (i * Math.PI) / spikes - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.035,
      bevelSegments: 3
    });
    geo.center();
    return new THREE.Mesh(geo, createClayMat(color, 0.32, 0.08));
  }

  // --------------------------------------------------------------------------
  // 1. PERSISTENT FULL-VIEWPORT 3D DAYLIGHT STORYBOOK WORLD
  // --------------------------------------------------------------------------
  class BackgroundWorld3D {
    constructor() {
      this.canvas = null;
      this.renderer = null;
      this.scene = null;
      this.camera = null;
      this.rafId = null;
      this.paused = false;
      this.clock = 0;
      this.lastTime = 0;

      this.whale = null;
      this.whaleSwimPhase = 0;
      this.whaleRollBoost = 0;
      this.clouds = [];
      this.bubbles = [];
      this.confetti = [];
      this.waveMesh = null;
      this.waveBaseY = null;
      this.stepTargetZ = 14;
      this.stepTargetY = 1.1;
    }

    init() {
      if (!THREE) return false;
      this.canvas = document.getElementById("world-3d-canvas");
      if (!this.canvas) return false;

      try {
        this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        });
      } catch (e) {
        return false;
      }

      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setSize(window.innerWidth, window.innerHeight, false);

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 120);
      this.camera.position.set(0, 1.2, 14);
      this.camera.lookAt(0, 0.2, 0);

      const hemi = new THREE.HemisphereLight(0xffffff, 0xb8ebd7, 1.2);
      this.scene.add(hemi);

      const sun = new THREE.DirectionalLight(0xfff6e0, 1.15);
      sun.position.set(10, 16, 12);
      this.scene.add(sun);

      const rim = new THREE.DirectionalLight(0x70c9e8, 0.65);
      rim.position.set(-10, 6, 8);
      this.scene.add(rim);

      this._buildClouds();
      this._buildCoastalHorizon();
      this._buildOceanWaves();
      this._buildBubbles();

      // Realistic articulated 3D Blue Whale swimming gracefully along the lower ocean waves
      this.whale = buildRealisticWhale3D(0.42);
      this.whale.group.position.set(-5.5, -3.15, -3.4);
      this.scene.add(this.whale.group);

      window.addEventListener("resize", () => this.resize());
      this.lastTime = performance.now();
      this._loop();
      return true;
    }

    resize() {
      if (!this.renderer || !this.camera) return;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    }

    _buildClouds() {
      const mat = createClayMat(0xffffff, 0.85, 0.0);
      const specs = [
        { x: -10.5, y: 5.4, z: -9.5, s: 1.0, spd: 0.2 },
        { x: 9.8, y: 5.0, z: -10.2, s: 0.9, spd: -0.18 },
        { x: 0.6, y: 6.4, z: -12.0, s: 1.1, spd: 0.14 }
      ];
      specs.forEach((sp) => {
        const c = new THREE.Group();
        const p1 = new THREE.Mesh(new THREE.SphereGeometry(1.1, 14, 12), mat);
        const p2 = new THREE.Mesh(new THREE.SphereGeometry(0.85, 14, 12), mat);
        p2.position.set(-0.95, -0.15, 0.1);
        const p3 = new THREE.Mesh(new THREE.SphereGeometry(0.8, 14, 12), mat);
        p3.position.set(0.95, -0.18, -0.1);
        c.add(p1, p2, p3);
        c.position.set(sp.x, sp.y, sp.z);
        c.scale.set(sp.s * 1.35, sp.s * 0.7, sp.s * 0.72);
        c.userData = { baseX: sp.x, spd: sp.spd };
        this.scene.add(c);
        this.clouds.push(c);
      });
    }

    _buildCoastalHorizon() {
      const hillLeftGeo = new THREE.SphereGeometry(5.6, 24, 16);
      hillLeftGeo.scale(1.8, 0.55, 1.0);
      const hillLeft = new THREE.Mesh(hillLeftGeo, createClayMat(0x8bdba1, 0.78));
      hillLeft.position.set(-10.5, -5.2, -8.5);
      this.scene.add(hillLeft);

      const hillRightGeo = new THREE.SphereGeometry(5.2, 24, 16);
      hillRightGeo.scale(1.9, 0.52, 1.0);
      const hillRight = new THREE.Mesh(hillRightGeo, createClayMat(0x9ce3b0, 0.78));
      hillRight.position.set(11.0, -5.1, -9.0);
      this.scene.add(hillRight);

      const cottage = new THREE.Group();
      const walls = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.75, 0.85), createClayMat(0xfffdf6, 0.6));
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.84, 0.62, 4), createClayMat(0xe87834, 0.55));
      roof.rotation.y = Math.PI / 4;
      roof.position.y = 0.66;
      const door = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.42, 0.1), createClayMat(0x2382c2, 0.5));
      door.position.set(0, -0.15, 0.43);
      cottage.add(walls, roof, door);
      cottage.position.set(-10.2, -2.55, -7.8);
      cottage.rotation.y = 0.35;
      this.scene.add(cottage);

      const lh = new THREE.Group();
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.4, 1.8, 14), createClayMat(0xffffff, 0.5));
      const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 0.42, 14), createClayMat(0xe87834, 0.5));
      stripe.position.y = 0.15;
      const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.28, 12), createClayMat(0x69c7f0, 0.25));
      lantern.position.y = 1.02;
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.32, 12), createClayMat(0x186aa2, 0.45));
      cap.position.y = 1.3;
      lh.add(tower, stripe, lantern, cap);
      lh.position.set(10.6, -2.2, -8.2);
      this.scene.add(lh);
    }

    _buildOceanWaves() {
      const geo = new THREE.PlaneGeometry(46, 14, 38, 12);
      geo.rotateX(-Math.PI / 2.25);
      const pos = geo.attributes.position;
      this.waveBaseY = new Float32Array(pos.count);
      for (let i = 0; i < pos.count; i++) {
        this.waveBaseY[i] = pos.getY(i);
      }
      const mat = new THREE.MeshStandardMaterial({
        color: 0x5ab7e6,
        roughness: 0.28,
        metalness: 0.08,
        transparent: true,
        opacity: 0.72,
        flatShading: true
      });
      this.waveMesh = new THREE.Mesh(geo, mat);
      this.waveMesh.position.set(0, -4.45, -3.5);
      this.scene.add(this.waveMesh);
    }

    _buildBubbles() {
      const mat = new THREE.MeshStandardMaterial({
        color: 0xd9f4ff,
        roughness: 0.12,
        metalness: 0.05,
        transparent: true,
        opacity: 0.48
      });
      for (let i = 0; i < 14; i++) {
        const r = 0.13 + Math.random() * 0.2;
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 12), mat);
        mesh.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 11, -2.5 - Math.random() * 6);
        mesh.userData = {
          speed: 0.32 + Math.random() * 0.48,
          phase: Math.random() * Math.PI * 2
        };
        this.scene.add(mesh);
        this.bubbles.push(mesh);
      }
    }

    setStepCamera(stepNum) {
      const presets = {
        1: { y: 1.1, z: 14.0 },
        2: { y: 1.4, z: 13.0 },
        3: { y: 1.5, z: 14.4 },
        4: { y: 1.0, z: 13.4 },
        5: { y: 1.5, z: 12.6 }
      };
      const p = presets[stepNum] || presets[1];
      this.stepTargetY = p.y;
      this.stepTargetZ = p.z;
    }

    celebrateWhale(burstCount = 26) {
      this.whaleRollBoost = 1.0;
      if (this.paused) return;
      const palette = [0x2382c2, 0xe87834, 0x4ca147, 0xffd166, 0x69c7f0, 0xff9b85];
      for (let i = 0; i < burstCount; i++) {
        const geo = i % 2 === 0
          ? new THREE.BoxGeometry(0.22, 0.22, 0.08)
          : new THREE.OctahedronGeometry(0.16, 0);
        const mesh = new THREE.Mesh(geo, createClayMat(palette[i % palette.length], 0.35));
        mesh.position.set((Math.random() - 0.5) * 10, 4.2 + Math.random() * 2.5, 2 + Math.random() * 3);
        mesh.userData = {
          vx: (Math.random() - 0.5) * 3.2,
          vy: -1.6 - Math.random() * 2.6,
          rx: (Math.random() - 0.5) * 7,
          ry: (Math.random() - 0.5) * 7,
          life: 2.2 + Math.random() * 0.9
        };
        this.scene.add(mesh);
        this.confetti.push(mesh);
      }
    }

    setPaused(paused) {
      this.paused = paused;
      if (!paused) {
        this.lastTime = performance.now();
        if (!this.rafId) this._loop();
      }
    }

    _loop() {
      if (this.paused) {
        this.rafId = null;
        return;
      }
      this.rafId = requestAnimationFrame(() => this._loop());
      const now = performance.now();
      const dt = Math.min((now - this.lastTime) / 1000, 0.05);
      this.lastTime = now;
      this.clock += dt;

      this.camera.position.y += (this.stepTargetY - this.camera.position.y) * Math.min(1, dt * 3);
      this.camera.position.z += (this.stepTargetZ - this.camera.position.z) * Math.min(1, dt * 3);
      this.camera.lookAt(0, 0.2, 0);

      if (this.waveMesh) {
        const pos = this.waveMesh.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const z = pos.getZ(i);
          const offset = Math.sin(x * 0.42 + this.clock * 1.4) * 0.22 + Math.cos(z * 0.5 + this.clock * 1.1) * 0.14;
          pos.setY(i, this.waveBaseY[i] + offset);
        }
        pos.needsUpdate = true;
      }

      this.clouds.forEach((c) => {
        c.position.x = c.userData.baseX + Math.sin(this.clock * c.userData.spd) * 1.6;
      });

      this.bubbles.forEach((b) => {
        b.position.y += b.userData.speed * dt;
        b.position.x += Math.sin(this.clock * 1.2 + b.userData.phase) * 0.008;
        if (b.position.y > 7.5) b.position.y = -6.0;
      });

      // Realistic 3D Blue Whale swimming smoothly through the lower 3D ocean waves
      if (this.whale) {
        this.whaleSwimPhase += dt * 0.26;
        const wx = Math.sin(this.whaleSwimPhase) * 8.4;
        const wy = -3.15 + Math.sin(this.whaleSwimPhase * 2.2) * 0.28;
        const dx = Math.cos(this.whaleSwimPhase);
        this.whale.group.position.set(wx, wy, -3.4);

        // Realistic whale snout faces +Z, so rotate +PI/2 when swimming right (+X) and -PI/2 when left (-X)
        const targetYaw = dx >= 0 ? Math.PI / 2 - 0.16 : -Math.PI / 2 + 0.16;
        this.whale.group.rotation.y += (targetYaw - this.whale.group.rotation.y) * Math.min(1, dt * 4);
        this.whale.group.rotation.x = Math.cos(this.whaleSwimPhase * 2.2) * -0.06;

        if (this.whaleRollBoost > 0.01) {
          this.whale.group.rotation.z = this.whaleRollBoost * Math.PI * 2;
          this.whaleRollBoost = Math.max(0, this.whaleRollBoost - dt * 1.3);
        } else {
          this.whale.group.rotation.z = 0;
        }

        this.whale.updateUndulation(this.clock * 2.6);
      }

      for (let i = this.confetti.length - 1; i >= 0; i--) {
        const p = this.confetti[i];
        p.position.x += p.userData.vx * dt;
        p.position.y += p.userData.vy * dt;
        p.rotation.x += p.userData.rx * dt;
        p.rotation.y += p.userData.ry * dt;
        p.userData.life -= dt;
        if (p.userData.life <= 0) {
          this.scene.remove(p);
          p.geometry.dispose();
          p.material.dispose();
          this.confetti.splice(i, 1);
        }
      }

      this.renderer.render(this.scene, this.camera);
    }
  }

  // --------------------------------------------------------------------------
  // 2. INTERACTIVE STAGE PROP 3D VIEWPORT (Steps 1, 4, 5)
  // --------------------------------------------------------------------------
  class StageProp3D {
    constructor() {
      this.canvas = null;
      this.renderer = null;
      this.scene = null;
      this.camera = null;
      this.rootGroup = null;
      this.currentMode = null;
      this.paused = false;
      this.rafId = null;
      this.clock = 0;
      this.lastTime = 0;

      this.isDragging = false;
      this.dragX = 0;
      this.targetRotY = 0;
      this.currentRotY = 0;

      this.portalParts = null;
      this.jarParts = null;
      this.envelopeParts = null;
    }

    init() {
      if (!THREE) return false;
      this.canvas = document.createElement("canvas");
      this.canvas.id = "prop-3d-canvas";
      this.canvas.className = "prop-3d-canvas";

      try {
        this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          antialias: true,
          alpha: true
        });
      } catch (e) {
        return false;
      }

      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
      this.camera.position.set(0, 0.5, 6.2);
      this.camera.lookAt(0, 0, 0);

      this.scene.add(new THREE.HemisphereLight(0xffffff, 0xc3eede, 1.25));
      const key = new THREE.DirectionalLight(0xfff7e6, 1.2);
      key.position.set(5, 8, 7);
      this.scene.add(key);

      const fill = new THREE.DirectionalLight(0x7ac8ee, 0.72);
      fill.position.set(-6, 3, 5);
      this.scene.add(fill);

      this.rootGroup = new THREE.Group();
      this.scene.add(this.rootGroup);

      this.canvas.addEventListener("pointerdown", (e) => {
        if (this.currentMode === "jar") return;
        this.isDragging = true;
        this.dragX = e.clientX;
      });
      window.addEventListener("pointermove", (e) => {
        if (!this.isDragging) return;
        const dx = e.clientX - this.dragX;
        this.dragX = e.clientX;
        this.targetRotY += dx * 0.012;
      });
      window.addEventListener("pointerup", () => { this.isDragging = false; });
      window.addEventListener("resize", () => this.resize());

      this.lastTime = performance.now();
      this._loop();
      return true;
    }

    mountInto(containerId, mode) {
      const container = document.getElementById(containerId);
      if (!container || !this.canvas) return;
      container.innerHTML = "";
      container.appendChild(this.canvas);
      this.currentMode = mode;
      this.targetRotY = 0;
      this.currentRotY = 0;
      this._clearRoot();

      if (mode === "portal") this._buildPortalMode();
      else if (mode === "jar") this._buildJarMode();
      else if (mode === "envelope") this._buildEnvelopeMode();

      this.resize();
    }

    resize() {
      if (!this.canvas || !this.canvas.parentElement || !this.renderer || !this.camera) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const w = Math.max(120, Math.round(rect.width));
      const h = Math.max(120, Math.round(rect.height));
      const aspect = w / h;
      this.camera.aspect = aspect;

      // Auto-fit 3D camera distance on narrow mobile viewports so Whale/Jar/Envelope never crop
      const baseZByMode = { portal: 6.4, jar: 6.4, envelope: 5.8 };
      const baseZ = baseZByMode[this.currentMode] || 6.2;
      this.camera.position.z = aspect < 1.35 ? baseZ * (1.35 / Math.max(0.9, aspect)) : baseZ;

      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h, false);
    }

    _clearRoot() {
      while (this.rootGroup.children.length > 0) {
        this.rootGroup.remove(this.rootGroup.children[0]);
      }
      this.portalParts = null;
      this.jarParts = null;
      this.envelopeParts = null;
    }

    // STEP 1: Realistic 3D Articulated Blue Whale + Frosted Arch + Golden Key
    _buildPortalMode() {
      this.camera.position.set(0, 0.45, 6.4);

      const whale = buildRealisticWhale3D(0.39);
      whale.group.position.set(0.05, 0.12, 0.25);
      // Graceful 3/4 marine side-profile showcasing rostrum, pectoral flippers, dorsal fin & flukes
      whale.group.rotation.set(0.08, 1.18, -0.06);
      this.rootGroup.add(whale.group);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.1, 0.11, 16, 48),
        createClayMat(0x7fd2f5, 0.25)
      );
      ring.position.set(0, 0.1, -0.8);
      this.rootGroup.add(ring);

      const keyGroup = new THREE.Group();
      const goldMat = createClayMat(0xffc94d, 0.22, 0.48);
      const bow = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.08, 12, 24), goldMat);
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.82, 12), goldMat);
      shaft.rotation.z = Math.PI / 2;
      shaft.position.x = 0.64;
      const bit1 = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.22, 0.08), goldMat);
      bit1.position.set(0.84, -0.13, 0);
      const bit2 = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.16, 0.08), goldMat);
      bit2.position.set(0.98, -0.1, 0);
      keyGroup.add(bow, shaft, bit1, bit2);
      keyGroup.position.set(1.38, -0.95, 1.1);
      this.rootGroup.add(keyGroup);

      this.portalParts = { whale, ring, keyGroup };
    }

    pulsePortalError() {
      if (!this.portalParts || !window.gsap || this.paused) return;
      window.gsap.fromTo(
        this.rootGroup.rotation,
        { z: -0.16 },
        { z: 0, duration: 0.45, ease: "elastic.out(1.2, 0.35)" }
      );
    }

    pulsePortalUnlock() {
      if (!this.portalParts || !window.gsap || this.paused) return;
      window.gsap.to(this.portalParts.keyGroup.rotation, { y: Math.PI * 4, duration: 0.75, ease: "power2.out" });
      window.gsap.to(this.portalParts.whale.group.scale, { x: 0.45, y: 0.45, z: 0.45, duration: 0.35, yoyo: true, repeat: 1 });
    }

    // STEP 4: Real 3D Glass Wish Jar + Cork + 6 Bouncing 3D Origami Stars
    _buildJarMode() {
      this.camera.position.set(0, 0.35, 6.4);
      const jarGroup = new THREE.Group();

      const glassMat = new THREE.MeshPhongMaterial({
        color: 0xdff5ff,
        specular: 0xffffff,
        shininess: 110,
        transparent: true,
        opacity: 0.42,
        depthWrite: false
      });

      const body = new THREE.Mesh(new THREE.CylinderGeometry(1.42, 1.38, 2.75, 32, 1, false), glassMat);
      body.position.y = -0.22;
      jarGroup.add(body);

      const glassRim = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.13, 14, 32), createClayMat(0x8fd2f2, 0.22, 0.1));
      glassRim.rotation.x = Math.PI / 2;
      glassRim.position.y = 1.24;
      jarGroup.add(glassRim);

      const baseRing = new THREE.Mesh(new THREE.TorusGeometry(1.36, 0.08, 12, 32), createClayMat(0x7ac8ee, 0.3));
      baseRing.rotation.x = Math.PI / 2;
      baseRing.position.y = -1.55;
      jarGroup.add(baseRing);

      const cork = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.8, 0.62, 24), createClayMat(0xd58a4b, 0.72));
      cork.position.y = 1.54;
      jarGroup.add(cork);

      const starColors = [0x2e8bc0, 0xe87834, 0x4ca147, 0x52b6db, 0xf2b84b, 0x3fa68e];
      const positions = [
        [-0.55, -1.02, 0.32],
        [0.48, -1.06, -0.22],
        [0.02, -0.78, 0.48],
        [-0.48, -0.35, -0.35],
        [0.52, -0.3, 0.25],
        [0.0, 0.18, -0.05]
      ];
      const stars = [];
      for (let i = 0; i < 6; i++) {
        const st = createStarMesh3D(starColors[i], 0.34, 0.13);
        st.position.set(positions[i][0], positions[i][1], positions[i][2]);
        st.rotation.set(i * 0.5, i * 0.8, i * 0.4);
        st.userData = { basePos: st.position.clone(), phase: i * 1.1 };
        jarGroup.add(st);
        stars.push(st);
      }

      const flyStar = createStarMesh3D(0xffd166, 0.42, 0.14);
      flyStar.visible = false;
      this.rootGroup.add(flyStar);

      this.rootGroup.add(jarGroup);
      this.jarParts = { jarGroup, cork, stars, flyStar, starColors };
    }

    syncJarStars(openedCount) {
      if (!this.jarParts) return;
      this.jarParts.stars.forEach((st, idx) => {
        st.visible = idx >= openedCount;
      });
    }

    animateJarShake3D(starIndex, onComplete) {
      if (!this.jarParts || !window.gsap || this.paused) {
        if (onComplete) onComplete();
        return;
      }
      const { jarGroup, cork, stars, flyStar, starColors } = this.jarParts;
      const tl = window.gsap.timeline({ onComplete });

      tl.to(jarGroup.rotation, { z: -0.26, y: -0.2, duration: 0.08 })
        .to(jarGroup.rotation, { z: 0.28, y: 0.22, duration: 0.08 })
        .to(jarGroup.rotation, { z: -0.22, y: -0.15, duration: 0.08 })
        .to(jarGroup.rotation, { z: 0.16, y: 0.1, duration: 0.07 })
        .to(jarGroup.rotation, { z: 0, y: 0, duration: 0.2, ease: "elastic.out(1, 0.45)" });

      stars.forEach((st) => {
        if (!st.visible) return;
        tl.to(st.position, { y: st.userData.basePos.y + 0.55, duration: 0.16, yoyo: true, repeat: 1 }, 0.04);
        tl.to(st.rotation, { x: st.rotation.x + 2.2, y: st.rotation.y + 2.5, duration: 0.34 }, 0.04);
      });

      tl.to(cork.position, { y: 2.25, duration: 0.18, ease: "power2.out" }, 0.24)
        .to(cork.rotation, { z: 0.22, duration: 0.18 }, 0.24)
        .to(cork.position, { y: 1.54, duration: 0.26, ease: "bounce.out" }, 0.46)
        .to(cork.rotation, { z: 0, duration: 0.2 }, 0.46);

      flyStar.material.color.setHex(starColors[starIndex % starColors.length]);
      flyStar.visible = true;
      flyStar.position.set(0, 0.8, 0.2);
      flyStar.scale.setScalar(0.35);
      tl.to(flyStar.position, { y: 2.7, z: 1.4, duration: 0.42, ease: "power2.out" }, 0.26)
        .to(flyStar.scale, { x: 1.35, y: 1.35, z: 1.35, duration: 0.32 }, 0.26)
        .to(flyStar.rotation, { y: Math.PI * 3, z: Math.PI, duration: 0.48 }, 0.26)
        .add(() => { flyStar.visible = false; }, 0.68);
    }

    // STEP 5: Real 3D Thick Cream Envelope + Hinged Flap + 3D Blue Wax Seal
    _buildEnvelopeMode() {
      this.camera.position.set(0, 0.3, 5.8);
      const env = new THREE.Group();

      const paperMat = createClayMat(0xfff9ee, 0.55);
      const innerMat = createClayMat(0xf7dfc2, 0.6);
      const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.05, 0.22), paperMat);
      env.add(body);

      const flapPivot = new THREE.Group();
      flapPivot.position.set(0, 1.02, 0.11);
      const triShape = new THREE.Shape();
      triShape.moveTo(-1.58, 0);
      triShape.lineTo(1.58, 0);
      triShape.lineTo(0, -1.12);
      triShape.closePath();
      const flapGeo = new THREE.ExtrudeGeometry(triShape, { depth: 0.06, bevelEnabled: false });
      const flapMesh = new THREE.Mesh(flapGeo, innerMat);
      flapPivot.add(flapMesh);
      env.add(flapPivot);

      const seal = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.38, 0.14, 24), createClayMat(0x186aa2, 0.22, 0.15));
      seal.rotation.x = Math.PI / 2;
      seal.position.set(0, -0.02, 0.22);
      env.add(seal);

      const sealStar = createStarMesh3D(0xffffff, 0.18, 0.05);
      sealStar.position.set(0, -0.02, 0.29);
      env.add(sealStar);

      this.rootGroup.add(env);
      this.envelopeParts = { env, flapPivot, seal, sealStar };
    }

    animateEnvelopeOpen3D(onComplete) {
      if (!this.envelopeParts || !window.gsap || this.paused) {
        if (onComplete) onComplete();
        return;
      }
      const { env, flapPivot, seal, sealStar } = this.envelopeParts;
      const tl = window.gsap.timeline({ onComplete });
      tl.to([seal.scale, sealStar.scale], { x: 0.01, y: 0.01, z: 0.01, duration: 0.22, ease: "back.in(2)" })
        .to(flapPivot.rotation, { x: -2.45, duration: 0.42, ease: "power2.out" }, 0.14)
        .to(env.position, { y: 0.35, duration: 0.35, ease: "power2.out" }, 0.22);
    }

    setPaused(paused) {
      this.paused = paused;
      if (!paused) {
        this.lastTime = performance.now();
        if (!this.rafId) this._loop();
      }
    }

    _loop() {
      if (this.paused) {
        this.rafId = null;
        return;
      }
      this.rafId = requestAnimationFrame(() => this._loop());
      const now = performance.now();
      const dt = Math.min((now - this.lastTime) / 1000, 0.05);
      this.lastTime = now;
      this.clock += dt;

      this.currentRotY += (this.targetRotY - this.currentRotY) * Math.min(1, dt * 8);

      if (this.currentMode === "portal" && this.portalParts) {
        const { whale, ring, keyGroup } = this.portalParts;
        whale.group.position.y = 0.12 + Math.sin(this.clock * 1.7) * 0.14;
        whale.updateUndulation(this.clock * 2.5);
        ring.rotation.z = this.clock * 0.22;
        keyGroup.rotation.y = this.clock * 1.35 + this.currentRotY;
        keyGroup.position.y = -0.95 + Math.sin(this.clock * 2.4) * 0.1;
        this.rootGroup.rotation.y = this.currentRotY * 0.45;
      } else if (this.currentMode === "jar" && this.jarParts) {
        this.jarParts.jarGroup.position.y = Math.sin(this.clock * 1.8) * 0.06;
        this.jarParts.stars.forEach((st) => {
          if (!st.visible) return;
          st.rotation.y += dt * 0.45;
        });
      } else if (this.currentMode === "envelope" && this.envelopeParts) {
        this.envelopeParts.env.rotation.y = Math.sin(this.clock * 0.9) * 0.24 + this.currentRotY;
        this.envelopeParts.env.position.y = Math.sin(this.clock * 2.0) * 0.12;
      }

      this.renderer.render(this.scene, this.camera);
    }
  }

  window.BirthdayWorld3D = new BackgroundWorld3D();
  window.BirthdayProp3D = new StageProp3D();
})();
