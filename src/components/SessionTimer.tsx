"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const pad = (n: number) => String(n).padStart(2, "0");

function split(totalSeconds: number) {
  return {
    h: Math.floor(totalSeconds / 3600),
    m: Math.floor((totalSeconds % 3600) / 60),
    s: totalSeconds % 60,
  };
}

/** Counts up from page load, a nod to Ting. Frozen at 00:00:00 under reduced motion. */
export function SessionTimer() {
  const reduce = useReducedMotion();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (reduce) return;
    // Derive from elapsed time rather than incrementing, so throttled tabs don't drift.
    const tick = () => setSeconds(Math.floor(performance.now() / 1000));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const { h, m, s } = split(reduce ? 0 : seconds);

  return (
    <time
      role="timer"
      dateTime={`PT${h}H${m}M${s}S`}
      className="text-ink tabular-nums"
    >
      {pad(h)}:{pad(m)}:{pad(s)}
    </time>
  );
}
