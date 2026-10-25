"use client";

import { useEffect } from "react";

// Small pointer and scroll touches: buttons lean toward the cursor, and the
// block print in the hero drifts slower than the page. Both are skipped for
// reduced motion, and the magnetic pull only runs with a fine pointer.
export function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cleanups: (() => void)[] = [];

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const buttons = document.querySelectorAll<HTMLElement>(".btn, .nav-cta");
      buttons.forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
          el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        };
        const leave = () => {
          el.style.transform = "";
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    const hero = document.querySelector<HTMLElement>(".hero");
    if (hero) {
      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const y = Math.min(window.scrollY, hero.offsetHeight);
          hero.style.setProperty("--hero-drift", `${(y * 0.25).toFixed(1)}px`);
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", onScroll);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
