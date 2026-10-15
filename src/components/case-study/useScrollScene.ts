"use client";

import { useEffect, useRef } from "react";

/**
 * Calls `onProgress(p)` with how far the user has scrolled through `ref`'s section (0 at its top,
 * 1 when its end reaches the bottom of the viewport). Work happens only on scroll or resize, at most
 * once per frame, and only while the section is on screen; nothing runs when the page is idle.
 */
export function useScrollScene(
  ref: React.RefObject<HTMLElement | null>,
  onProgress: (p: number) => void,
  enabled: boolean,
) {
  const callback = useRef(onProgress);
  useEffect(() => {
    callback.current = onProgress;
  });

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    let raf = 0;
    let visible = false;
    const frame = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      callback.current(Math.min(1, Math.max(0, span > 0 ? -r.top / span : 0)));
    };
    const schedule = () => {
      if (visible && !raf) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    io.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);
}
