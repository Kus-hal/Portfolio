"use client";

import { useEffect, useRef } from "react";
import { REDUCED_MOTION, useMedia } from "../useMedia";

/**
 * The hero phone starts turned away and faces you as you scroll; on fine pointers it also leans
 * toward the cursor on a critically damped spring. Frames run only while something is moving
 * (a scroll, the pointer, or a spring still settling). Transform only; still under reduced motion.
 */
export function HeroDevice({ children }: { children: React.ReactNode }) {
  const reduce = useMedia(REDUCED_MOTION);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const k = ((2 * Math.PI) / 0.5) ** 2; // response 0.5 s, damping ratio 1
    const c = 2 * Math.sqrt(k);
    const sx = { x: 0, v: 0, to: 0 };
    const sy = { x: 0, v: 0, to: 0 };
    let raf = 0;
    let last = 0;
    let visible = true;

    const step = (s: typeof sx, dt: number) => {
      s.v += (-k * (s.x - s.to) - c * s.v) * dt;
      s.x += s.v * dt;
    };
    const settled = (s: typeof sx) =>
      Math.abs(s.x - s.to) < 0.01 && Math.abs(s.v) < 0.01;

    const frame = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
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
      raf = 0;
      if (!settled(sx) || !settled(sy)) kick();
      else last = 0;
    };
    function kick() {
      if (visible && !raf) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      sx.to = (e.clientX / window.innerWidth - 0.5) * 10;
      sy.to = (e.clientY / window.innerHeight - 0.5) * -8;
      kick();
    };
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", kick, { passive: true });
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      kick();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", kick);
    };
  }, [reduce]);

  return (
    <div className="grid place-items-center [perspective:1600px]">
      {/* The turned-away start lives in CSS so server and client markup match; reduced motion
          (globals.css) and the effect take it from there. */}
      <div
        ref={ref}
        className="[transform:rotateY(-22deg)_rotateX(9deg)] [transform-style:preserve-3d] motion-reduce:[transform:none]"
      >
        {children}
      </div>
    </div>
  );
}
