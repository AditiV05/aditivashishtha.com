"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroReveal({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set("[data-reveal]", { opacity: 1, y: 0 });

      if (reduce) return;

      gsap.set("[data-reveal='eyebrow']", { opacity: 0 });
      gsap.set("[data-reveal='line']", { opacity: 0, y: 40 });
      gsap.set("[data-reveal='sub']", { opacity: 0 });

      gsap
        .timeline()
        .to("[data-reveal='eyebrow']", {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(
          "[data-reveal='line']",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.2",
        )
        .to(
          "[data-reveal='sub']",
          { opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.4",
        );
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
