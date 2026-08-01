"use client";

import { useEffect, useRef } from "react";
import { toolkit } from "@/content/site";

const ROTATIONS = [-3, 2, -1.5];

const items = toolkit.flatMap((g) =>
  g.items.map((label) => ({ label, ink: g.group === "ai & retrieval" })),
);

type Body = {
  el: HTMLSpanElement;
  x: number;
  y: number;
  rx: number;
  ry: number;
  vx: number;
  vy: number;
  rot: number;
  cx: number;
  cy: number;
  w: number;
};

export function ToolkitPills() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const els = Array.from(field.querySelectorAll<HTMLSpanElement>(".pill"));

    const bodies: Body[] = els.map((el, i) => ({
      el,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      rot: ROTATIONS[i % 3],
      cx: 0,
      cy: 0,
      w: 0,
      rx: 0,
      ry: 0,
    }));

    const home = { left: 0, right: 0, top: 0, bottom: 0 };

    const measure = () => {
      bodies.forEach((b) => {
        b.x = b.y = b.rx = b.ry = b.vx = b.vy = 0;
        b.el.style.transform = `rotate(${b.rot}deg)`;
      });
      bodies.forEach((b) => {
        const r = b.el.getBoundingClientRect();
        b.cx = r.left + r.width / 2;
        b.cy = r.top + r.height / 2;
        b.w = r.width;
      });
      const fr = field.getBoundingClientRect();
      home.left = fr.left;
      home.right = fr.right;
      home.top = fr.top;
      home.bottom = fr.bottom;
    };

    measure();
    field.classList.add("pills-live");

    let dragged: Body | null = null;
    let ox = 0;
    let oy = 0;
    let px = 0;
    let py = 0;

    const onDown = (e: PointerEvent) => {
      const b = bodies.find((n) => n.el === e.target);
      if (!b) return;
      e.preventDefault();
      b.el.setPointerCapture(e.pointerId);
      dragged = b;
      ox = e.clientX - b.x;
      oy = e.clientY - b.y;
      px = b.x;
      py = b.y;
    };

    const onMove = (e: PointerEvent) => {
      if (!dragged) return;
      const nx = e.clientX - ox;
      const ny = e.clientY - oy;
      const halfW = dragged.w / 2;
      px = Math.min(
        Math.max(nx, home.left + halfW - dragged.cx),
        home.right - halfW - dragged.cx,
      );
      py = Math.min(
        Math.max(ny, home.top + 20 - dragged.cy),
        home.bottom - 20 - dragged.cy,
      );
      dragged.rx = px;
      dragged.ry = py;
    };

    const onUp = () => {
      dragged = null;
    };

    field.addEventListener("pointerdown", onDown);
    field.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    let raf = 0;
    const frame = () => {
      for (const b of bodies) {
        if (b === dragged) {
          b.x += (px - b.x) * 0.25;
          b.y += (py - b.y) * 0.25;
          b.el.style.transform = `translate(${b.x.toFixed(2)}px, ${b.y.toFixed(2)}px) rotate(${b.rot}deg)`;
          continue;
        }
        let fx = -(b.x - b.rx) * 0.09;
        let fy = -(b.y - b.ry) * 0.09;

        if (dragged) {
          const dx = b.cx + b.x - (dragged.cx + dragged.x);
          const dy = b.cy + b.y - (dragged.cy + dragged.y);
          const dist = Math.hypot(dx, dy) || 0.001;
          const reach = (b.w + dragged.w) / 2 + 22;
          if (dist < reach) {
            const push = (reach - dist) * 0.5;
            fx += (dx / dist) * push;
            fy += (dy / dist) * push;
          }
        }

        b.vx = (b.vx + fx) * 0.85;
        b.vy = (b.vy + fy) * 0.85;
        b.x += b.vx;
        b.y += b.vy;
        b.el.style.transform = `translate(${b.x.toFixed(2)}px, ${b.y.toFixed(2)}px) rotate(${b.rot}deg)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      field.removeEventListener("pointerdown", onDown);
      field.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      field.classList.remove("pills-live");
    };
  }, []);

  return (
    <div className="pills" ref={fieldRef}>
      {items.map((item) => (
        <span key={item.label} className={item.ink ? "pill pill-ink" : "pill"}>
          {item.label}
        </span>
      ))}
    </div>
  );
}
