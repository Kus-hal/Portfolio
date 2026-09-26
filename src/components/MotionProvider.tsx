"use client";

import { LazyMotion, domAnimation } from "motion/react";

/** Loads only Motion's DOM animation features; `strict` keeps components on the lightweight `m.*`. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
