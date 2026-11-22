/**
 * ============================================================================
 * A JOURNEY THROUGH THE BLUE : GSAP TRANSITIONS & MOTION CHOREOGRAPHY
 * ============================================================================
 */

(function () {
  "use strict";

  const OceanAnimations = {
    initAmbientBubbles() {
      const container = document.getElementById("ambient-bubbles");
      if (!container) return;
      container.innerHTML = "";

      const count = window.innerWidth < 640 ? 10 : 18;
      for (let i = 0; i < count; i++) {
        const b = document.createElement("span");
        b.className = "ambient-bubble";
        const size = 6 + Math.random() * 14;
        b.style.width = `${size}px`;
        b.style.height = `${size}px`;
        b.style.left = `${Math.random() * 100}%`;
        b.style.animationDuration = `${12 + Math.random() * 16}s`;
        b.style.animationDelay = `${-Math.random() * 18}s`;
        container.appendChild(b);
      }
    },

    playTransition(type, onMidpoint, onComplete) {
      const layer = document.getElementById("transition-layer");
      const reduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.body.classList.contains("reduced-motion") ||
        document.body.classList.contains("motion-paused");

      if (!layer || reduced || typeof window.gsap === "undefined") {
        if (typeof onMidpoint === "function") onMidpoint();
        if (typeof onComplete === "function") onComplete();
        return;
      }

      if (window.OceanAudio) window.OceanAudio.playTransition();

      const gsap = window.gsap;
      const ripple = layer.querySelector(".trans-ripple");
      const depth = layer.querySelector(".trans-depth");
      const warp = layer.querySelector(".trans-warp");
      const bubbles = layer.querySelector(".trans-bubbles");
      const whale = layer.querySelector(".trans-whale");

      gsap.set([ripple, depth, warp, bubbles, whale], { opacity: 0, clearProps: "transform" });
      gsap.set(layer, { opacity: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(layer, { opacity: 0 });
          if (typeof onComplete === "function") onComplete();
        }
      });

      if (type === "ripple") {
        tl.set(ripple, { scale: 0.06, opacity: 0.95 })
          .to(ripple, { scale: 3.1, duration: 0.52, ease: "power2.inOut" })
          .add(() => onMidpoint && onMidpoint())
          .to(ripple, { opacity: 0, duration: 0.42, ease: "power2.out" });
      } else if (type === "bubbles") {
        this._spawnTransitionBubbles(bubbles);
        tl.set(bubbles, { opacity: 1 })
          .fromTo(
            bubbles.children,
            { y: "106vh", opacity: 0.85, scale: 0.75 },
            { y: "-20vh", opacity: 0.95, scale: 1.2, duration: 0.72, stagger: 0.014, ease: "power1.inOut" }
          )
          .add(() => onMidpoint && onMidpoint(), 0.34)
          .to(bubbles, { opacity: 0, duration: 0.34 });
      } else if (type === "whale") {
        tl.set(depth, { opacity: 0 })
          .set(whale, { opacity: 1, x: "-115vw" })
          .to(depth, { opacity: 0.86, duration: 0.36, ease: "power2.inOut" }, 0)
          .to(whale, { x: "115vw", duration: 0.9, ease: "power2.inOut" }, 0)
          .add(() => onMidpoint && onMidpoint(), 0.44)
          .to(depth, { opacity: 0, duration: 0.4, ease: "power2.out" }, 0.54);
      } else if (type === "warp") {
        tl.set(warp, { opacity: 0, scale: 0.75 })
          .to(warp, { opacity: 0.92, scale: 1.35, duration: 0.44, ease: "power3.in" })
          .add(() => onMidpoint && onMidpoint())
          .to(warp, { opacity: 0, scale: 1.75, duration: 0.42, ease: "power2.out" });
      } else if (type === "depth") {
        tl.set(depth, { opacity: 0, y: "-100%" })
          .to(depth, { opacity: 0.94, y: "0%", duration: 0.42, ease: "power2.inOut" })
          .add(() => onMidpoint && onMidpoint())
          .to(depth, { opacity: 0, y: "10%", duration: 0.44, ease: "power2.out" });
      } else {
        tl.set(depth, { opacity: 0 })
          .to(depth, { opacity: 0.82, duration: 0.34, ease: "sine.inOut" })
          .add(() => onMidpoint && onMidpoint())
          .to(depth, { opacity: 0, duration: 0.4, ease: "sine.out" });
      }
    },

    _spawnTransitionBubbles(container) {
      if (!container) return;
      container.innerHTML = "";
      for (let i = 0; i < 24; i++) {
        const s = document.createElement("span");
        const size = 16 + Math.random() * 48;
        s.style.position = "absolute";
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = "0";
        s.style.width = `${size}px`;
        s.style.height = `${size}px`;
        s.style.borderRadius = "50%";
        s.style.border = "1.5px solid rgba(185, 232, 245, 0.62)";
        s.style.background = "radial-gradient(circle at 30% 30%, rgba(244,251,255,0.58), rgba(112,201,232,0.2) 60%, transparent)";
        container.appendChild(s);
      }
    },

    revealElements(container) {
      if (!container || typeof window.gsap === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("motion-paused")) return;

      const targets = container.querySelectorAll(".anim-reveal, .welcome-stagger");
      if (!targets.length) return;

      window.gsap.fromTo(
        targets,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.58, stagger: 0.06, ease: "power3.out", clearProps: "transform" }
      );
    }
  };

  window.OceanAnimations = OceanAnimations;
})();
