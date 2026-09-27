"use client";

import {
  m,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";
import { useEffect, useState } from "react";
import { INTRO_DONE_EVENT, introActive } from "./intro";

const easeOut: Transition["ease"] = [0.23, 1, 0.32, 1];

// `transform` strings (not `y`) keep Motion on the compositor.
const rise: Variants = {
  hidden: { opacity: 0, transform: "translateY(14px)" },
  shown: { opacity: 1, transform: "translateY(0px)" },
};

/**
 * Staggers its `EntranceItem` children once on load. Server HTML always carries the hidden
 * state (so hydration matches); reduced motion zeroes the timing and globals.css shows it instantly.
 */
export function Entrance({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // While the first-visit intro covers the page, hold the entrance so it plays when revealed.
  const [ready, setReady] = useState(() => !introActive());
  useEffect(() => {
    if (ready) return;
    const onDone = () => setReady(true);
    window.addEventListener(INTRO_DONE_EVENT, onDone);
    return () => window.removeEventListener(INTRO_DONE_EVENT, onDone);
  }, [ready]);

  return (
    <m.div
      className={className}
      initial="hidden"
      animate={ready ? "shown" : "hidden"}
      transition={
        reduce
          ? { duration: 0 }
          : { staggerChildren: 0.06, delayChildren: 0.05 }
      }
    >
      {children}
    </m.div>
  );
}

// For LCP candidates: they move but never start invisible, so they count as painted immediately.
const riseOnly: Variants = {
  hidden: { transform: "translateY(14px)" },
  shown: { transform: "translateY(0px)" },
};

export function EntranceItem({
  children,
  className,
  fade = true,
}: {
  children: React.ReactNode;
  className?: string;
  fade?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      data-animate
      className={className}
      variants={fade ? rise : riseOnly}
      transition={reduce ? { duration: 0 } : { duration: 0.55, ease: easeOut }}
    >
      {children}
    </m.div>
  );
}

/** Fades a block up the first time it scrolls into view. Use on section-level blocks only. */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      data-animate
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.12 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: easeOut }}
    >
      {children}
    </m.div>
  );
}
