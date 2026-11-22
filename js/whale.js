/**
 * ============================================================================
 * A JOURNEY THROUGH THE BLUE : THE BLUE WHALE GUIDE (3D ARTICULATED MODEL)
 * ============================================================================
 */

(function () {
  "use strict";

  class BlueWhaleGuide {
    constructor(THREE) {
      this.THREE = THREE;
      this.group = new THREE.Group();
      this.group.name = "BlueWhaleGuide";

      this.mode = "gate";
      this.time = 0;
      this.swimSpeed = 1.65;
      this.spinBoost = 0;
      this.rollReaction = 0;

      this.currentPos = new THREE.Vector3(-12, 1.5, -18);
      this.targetPos = new THREE.Vector3(10, 2, -16);
      this.guideOverrideTarget = null;
      this.guideOverrideTimer = 0;

      this.bodyGeo = null;
      this.bodyBasePos = null;
      this.flukeGeo = null;
      this.flukeBasePos = null;
      this.leftFin = null;
      this.rightFin = null;
      this.memoryOrbsGroup = null;
      this.memoryOrbs = [];

      this._buildModel();
      this._buildMemoryFragments();

      this.group.position.copy(this.currentPos);
    }

    _createSkinTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");

      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0.0, "#153D63");
      grad.addColorStop(0.32, "#246A9B");
      grad.addColorStop(0.55, "#3E89B8");
      grad.addColorStop(0.75, "#8ACCE4");
      grad.addColorStop(1.0, "#B9E8F5");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      for (let i = 0; i < 420; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 290;
        const rx = 4 + Math.random() * 18;
        const ry = 2 + Math.random() * 7;
        ctx.fillStyle =
          Math.random() > 0.45
            ? `rgba(185, 232, 245, ${0.05 + Math.random() * 0.14})`
            : `rgba(7, 28, 54, ${0.08 + Math.random() * 0.16})`;
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, (Math.random() - 0.5) * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(10, 37, 64, 0.28)";
      ctx.lineWidth = 2;
      for (let y = 315; y < 504; y += 9) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(310, y);
        ctx.stroke();
      }

      const tex = new this.THREE.CanvasTexture(canvas);
      tex.wrapS = this.THREE.ClampToEdgeWrapping;
      tex.wrapT = this.THREE.RepeatWrapping;
      return tex;
    }

    _createBodyGeometry() {
      const THREE = this.THREE;
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
          const k = t / 0.04;
          const s = Math.sin(k * Math.PI * 0.5);
          rx = 0.05 + 0.52 * s;
          ryUpper = 0.04 + 0.24 * s;
          ryLower = 0.04 + 0.26 * s;
          yCenter = -0.02;
        } else if (t < 0.34) {
          const k = (t - 0.04) / 0.30;
          const ease = Math.sin(k * Math.PI * 0.5);
          rx = 0.57 + 0.68 * ease;
          ryUpper = 0.28 + 0.62 * ease;
          ryLower = 0.30 + 0.72 * ease;
          yCenter = -0.04 * (1 - k);
        } else if (t < 0.64) {
          const k = (t - 0.34) / 0.30;
          rx = 1.25 - 0.54 * Math.pow(k, 1.35);
          ryUpper = 0.90 - 0.28 * k;
          ryLower = 1.02 - 0.44 * Math.pow(k, 1.15);
          yCenter = 0.05 * k;
        } else {
          const k = (t - 0.64) / 0.36;
          rx = Math.max(0.08, 0.71 * Math.pow(1 - k, 1.45));
          ryUpper = Math.max(0.11, 0.62 * Math.pow(1 - k, 1.05));
          ryLower = Math.max(0.10, 0.58 * Math.pow(1 - k, 1.1));
          yCenter = 0.05 * (1 - k);
        }

        const dorsalBump = Math.exp(-Math.pow((t - 0.71) / 0.045, 2)) * 0.14;

        for (let j = 0; j <= segs; j++) {
          const theta = (j / segs) * Math.PI * 2;
          const sinT = Math.sin(theta);
          const cosT = Math.cos(theta);
          const x = sinT * rx;
          const y =
            cosT >= 0
              ? yCenter + Math.pow(cosT, 0.92) * (ryUpper + (cosT > 0.85 ? dorsalBump : 0))
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

    _createFlukesGeometry() {
      const THREE = this.THREE;
      const shape = new THREE.Shape();
      shape.moveTo(0, 0.25);
      shape.bezierCurveTo(0.45, 0.18, 1.45, -0.35, 2.28, -0.95);
      shape.bezierCurveTo(1.78, -1.12, 0.95, -0.82, 0.14, -0.42);
      shape.lineTo(0, -0.58);
      shape.lineTo(-0.14, -0.42);
      shape.bezierCurveTo(-0.95, -0.82, -1.78, -1.12, -2.28, -0.95);
      shape.bezierCurveTo(-1.45, -0.35, -0.45, 0.18, 0, 0.25);

      const extrude = new THREE.ExtrudeGeometry(shape, {
        depth: 0.09,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.04,
        bevelThickness: 0.04
      });
      extrude.rotateX(Math.PI / 2);
      extrude.translate(0, 0.04, -4.55);
      extrude.computeVertexNormals();
      return extrude;
    }

    _createPectoralFin(side) {
      const THREE = this.THREE;
      const shape = new THREE.Shape();
      shape.moveTo(0, 0.28);
      shape.bezierCurveTo(0.65 * side, 0.12, 1.55 * side, -0.55, 2.05 * side, -1.35);
      shape.bezierCurveTo(1.62 * side, -1.42, 0.72 * side, -0.92, 0, -0.35);
      shape.closePath();

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.08,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.035,
        bevelThickness: 0.035
      });
      geo.rotateX(Math.PI / 2);
      geo.computeVertexNormals();
      return geo;
    }

    _createDorsalFin() {
      const THREE = this.THREE;
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(-0.15, 0.35, -0.48, 0.52, -0.72, 0.56);
      shape.bezierCurveTo(-0.56, 0.28, -0.52, 0.1, -0.68, 0);
      shape.closePath();

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.07,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.025,
        bevelThickness: 0.025
      });
      geo.rotateY(-Math.PI / 2);
      geo.translate(0.035, 0, 0);
      geo.computeVertexNormals();
      return geo;
    }

    _buildModel() {
      const THREE = this.THREE;
      const skinTex = this._createSkinTexture();

      const bodyMat = new THREE.MeshStandardMaterial({
        map: skinTex,
        roughness: 0.42,
        metalness: 0.08,
        emissive: new THREE.Color("#103B60"),
        emissiveIntensity: 0.34
      });

      const finMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1D5682"),
        roughness: 0.45,
        metalness: 0.08,
        emissive: new THREE.Color("#12456E"),
        emissiveIntensity: 0.32
      });

      this.bodyGeo = this._createBodyGeometry();
      this.bodyBasePos = new Float32Array(this.bodyGeo.attributes.position.array);
      const bodyMesh = new THREE.Mesh(this.bodyGeo, bodyMat);
      bodyMesh.userData.isWhale = true;
      this.group.add(bodyMesh);

      this.flukeGeo = this._createFlukesGeometry();
      this.flukeBasePos = new Float32Array(this.flukeGeo.attributes.position.array);
      const flukeMesh = new THREE.Mesh(this.flukeGeo, finMat);
      flukeMesh.userData.isWhale = true;
      this.group.add(flukeMesh);

      this.leftFin = new THREE.Mesh(this._createPectoralFin(1), finMat);
      this.leftFin.position.set(0.95, -0.34, 1.55);
      this.leftFin.rotation.z = -0.34;
      this.leftFin.userData.isWhale = true;

      this.rightFin = new THREE.Mesh(this._createPectoralFin(-1), finMat);
      this.rightFin.position.set(-0.95, -0.34, 1.55);
      this.rightFin.rotation.z = 0.34;
      this.rightFin.userData.isWhale = true;

      this.group.add(this.leftFin, this.rightFin);

      const dorsalMesh = new THREE.Mesh(this._createDorsalFin(), finMat);
      dorsalMesh.position.set(0, 0.56, -1.78);
      dorsalMesh.userData.isWhale = true;
      this.group.add(dorsalMesh);

      const eyeGeo = new THREE.SphereGeometry(0.085, 14, 14);
      const eyeMat = new THREE.MeshStandardMaterial({
        color: 0x051120,
        roughness: 0.12,
        metalness: 0.4,
        emissive: 0x16446b,
        emissiveIntensity: 0.25
      });
      const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
      eyeL.position.set(0.92, -0.06, 2.75);
      const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
      eyeR.position.set(-0.92, -0.06, 2.75);
      this.group.add(eyeL, eyeR);

      const auraLight = new THREE.PointLight(0x70c9e8, 1.35, 18, 2);
      auraLight.position.set(0, 1.1, 1.0);
      this.group.add(auraLight);

      this.group.scale.setScalar(0.82);
    }

    _buildMemoryFragments() {
      const THREE = this.THREE;
      this.memoryOrbsGroup = new THREE.Group();
      this.memoryOrbsGroup.visible = false;

      const orbGeo = new THREE.SphereGeometry(0.16, 12, 12);
      for (let i = 0; i < 12; i++) {
        const mat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0xb9e8f5 : 0x70c9e8,
          transparent: true,
          opacity: 0.88
        });
        const orb = new THREE.Mesh(orbGeo, mat);
        orb.userData = {
          angle: (i / 12) * Math.PI * 2,
          radius: 2.3 + (i % 3) * 0.65,
          height: (Math.random() - 0.5) * 1.9,
          speed: 0.65 + (i % 4) * 0.18
        };
        this.memoryOrbs.push(orb);
        this.memoryOrbsGroup.add(orb);
      }

      this.group.add(this.memoryOrbsGroup);
    }

    setMode(mode) {
      this.mode = mode;
      this.guideOverrideTarget = null;
      this.guideOverrideTimer = 0;
      this.memoryOrbsGroup.visible = mode === "whale-sanctuary" || mode === "ending" || mode === "memories";

      if (mode === "gate") {
        this.group.scale.setScalar(0.88);
      } else if (mode === "welcome") {
        this.group.scale.setScalar(0.95);
        this.currentPos.set(-16, 1.5, -24);
      } else if (mode === "map") {
        this.group.scale.setScalar(0.62);
      } else if (mode === "ending") {
        this.group.scale.setScalar(0.92);
        this.currentPos.set(0, -6, 6);
      } else {
        this.group.scale.setScalar(0.76);
      }
    }

    swimToward(x, y, z, durationSec = 5.5) {
      this.guideOverrideTarget = new this.THREE.Vector3(x, y + 2.1, z + 1.5);
      this.guideOverrideTimer = durationSec;
    }

    triggerClickReaction() {
      this.rollReaction = Math.PI * 2;
      this.spinBoost = 1.45;
    }

    update(dt) {
      const clampedDt = Math.min(dt, 0.05);
      this.time += clampedDt * (this.swimSpeed + this.spinBoost);
      this.spinBoost = Math.max(0, this.spinBoost - clampedDt * 0.9);

      const t = this.time * 0.22;

      if (this.guideOverrideTarget && this.guideOverrideTimer > 0) {
        this.guideOverrideTimer -= clampedDt;
        this.targetPos.copy(this.guideOverrideTarget);
        this.targetPos.y += Math.sin(this.time * 1.1) * 0.45;
      } else if (this.mode === "gate") {
        this.targetPos.set(Math.sin(t * 0.85) * 17, 1.5 + Math.cos(t * 1.2) * 2.1, -18 + Math.cos(t * 0.85) * 5);
      } else if (this.mode === "welcome") {
        this.targetPos.set(Math.sin(t * 1.05) * 8.5, 2.4 + Math.sin(t * 1.8) * 1.2, -7.5 + Math.cos(t * 1.05) * 4.5);
      } else if (this.mode === "map") {
        this.targetPos.set(Math.sin(t * 0.9) * 14, 4.6 + Math.cos(t * 1.4) * 1.6, Math.cos(t * 0.65) * 10);
      } else if (this.mode === "ending") {
        const climbY = Math.min(10.5, this.currentPos.y + clampedDt * 1.15);
        const driftZ = Math.max(-28, this.currentPos.z - clampedDt * 2.1);
        this.targetPos.set(Math.sin(t * 1.2) * 3.5, climbY, driftZ);
      } else {
        this.targetPos.set(Math.sin(t * 0.85) * 13, 3.2 + Math.sin(t * 1.5) * 1.8, -14 + Math.cos(t * 0.75) * 5);
      }

      const prevPos = this.currentPos.clone();
      const lerpAlpha = 1 - Math.exp(-clampedDt * (this.guideOverrideTarget ? 1.8 : 0.95));
      this.currentPos.lerp(this.targetPos, lerpAlpha);
      this.group.position.copy(this.currentPos);

      const moveDir = this.currentPos.clone().sub(prevPos);
      if (moveDir.lengthSq() > 0.000001) {
        const lookPoint = this.currentPos.clone().add(moveDir.normalize().multiplyScalar(6));
        const dummy = new this.THREE.Object3D();
        dummy.position.copy(this.currentPos);
        dummy.lookAt(lookPoint);

        if (this.rollReaction > 0.01) {
          const step = Math.min(this.rollReaction, clampedDt * 4.2);
          this.rollReaction -= step;
          dummy.rotateZ(this.rollReaction);
        } else {
          dummy.rotateZ(-moveDir.x * 0.24);
        }

        this.group.quaternion.slerp(dummy.quaternion, 1 - Math.exp(-clampedDt * 3.2));
      }

      const bodyArr = this.bodyGeo.attributes.position.array;
      const baseBody = this.bodyBasePos;
      const wavePhase = this.time * 1.85;

      for (let i = 0; i < bodyArr.length; i += 3) {
        const bx = baseBody[i];
        const by = baseBody[i + 1];
        const bz = baseBody[i + 2];
        const dist = Math.max(0, (5.6 - bz) / 10.35);
        const amp = dist * dist * 0.78;
        bodyArr[i] = bx;
        bodyArr[i + 1] = by + Math.sin(wavePhase - dist * 4.4) * amp;
        bodyArr[i + 2] = bz;
      }
      this.bodyGeo.attributes.position.needsUpdate = true;
      this.bodyGeo.computeVertexNormals();

      const flukeArr = this.flukeGeo.attributes.position.array;
      const baseFluke = this.flukeBasePos;
      for (let i = 0; i < flukeArr.length; i += 3) {
        const fx = baseFluke[i];
        const fy = baseFluke[i + 1];
        const fz = baseFluke[i + 2];
        const dist = Math.max(0, (5.6 - fz) / 10.35);
        const amp = dist * dist * 0.88;
        flukeArr[i] = fx;
        flukeArr[i + 1] = fy + Math.sin(wavePhase - dist * 4.4) * amp;
        flukeArr[i + 2] = fz;
      }
      this.flukeGeo.attributes.position.needsUpdate = true;

      if (this.leftFin && this.rightFin) {
        const flap = Math.sin(wavePhase * 0.65) * 0.14;
        this.leftFin.rotation.z = -0.34 + flap;
        this.rightFin.rotation.z = 0.34 - flap;
      }

      if (this.memoryOrbsGroup && this.memoryOrbsGroup.visible) {
        for (let i = 0; i < this.memoryOrbs.length; i++) {
          const orb = this.memoryOrbs[i];
          const d = orb.userData;
          d.angle += clampedDt * d.speed;
          orb.position.set(
            Math.cos(d.angle) * d.radius,
            d.height + Math.sin(d.angle * 2) * 0.45,
            Math.sin(d.angle) * d.radius * 1.45
          );
        }
      }
    }
  }

  window.BlueWhaleGuide = BlueWhaleGuide;
})();
