"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * The hero phone starts turned away and faces you as you scroll; on fine pointers it also leans
 * toward the cursor on a critically damped spring. Transform only; still under reduced motion.
 */
export function HeroDevice({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const k = ((2 * Math.PI) / 0.5) ** 2; // response 0.5 s, damping ratio 1
    const c = 2 * Math.sqrt(k);
    const sx = { x: 0, v: 0, to: 0 };
    const sy = { x: 0, v: 0, to: 0 };
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const onMove = (e: PointerEvent) => {
      sx.to = (e.clientX / window.innerWidth - 0.5) * 10;
      sy.to = (e.clientY / window.innerHeight - 0.5) * -8;
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const step = (s: typeof sx, dt: number) => {
      s.v += (-k * (s.x - s.to) - c * s.v) * dt;
      s.x += s.v * dt;
    };
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      step(sx, dt);
      step(sy, dt);
      const t =
        1 -
        (1 -
          Math.min(
            1,
            Math.max(0, window.scrollY / (window.innerHeight * 0.6)),
          )) **
          3;
      el.style.transform = `rotateY(${-22 * (1 - t) + sx.x}deg) rotateX(${9 * (1 - t) + sy.x}deg)`;
      if (visible) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce]);

  return (
    <div className="grid place-items-center [perspective:1600px]">
      <div
        ref={ref}
        className="[transform-style:preserve-3d]"
        style={
          reduce ? undefined : { transform: "rotateY(-22deg) rotateX(9deg)" }
        }
      >
        {children}
      </div>
    </div>
  );
}
