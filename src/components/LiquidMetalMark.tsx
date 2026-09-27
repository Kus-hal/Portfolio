"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { person } from "@/content/site";

// The shader code only downloads when a metal mark is actually about to show.
const LiquidMetalCanvas = dynamic(() => import("./LiquidMetalCanvas"), {
  ssr: false,
});

const webglAvailable = () => {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
};

type Props = {
  className?: string;
  /** Mount only while near the viewport (unmounts when scrolled away, freeing the GPU). */
  whenVisible?: boolean;
  /** Called once the metal layer is drawn, e.g. so the sting can hide its solid mark. */
  onReady?: () => void;
};

/**
 * The KS badge: a solid mark that's always there (fallback and placeholder), with the liquid-metal
 * version fading in on top once it's ready. Reduced motion gets a still metal frame.
 */
export function LiquidMetalMark({
  className = "",
  whenVisible = false,
  onReady,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(false);
  const [near, setNear] = useState(!whenVisible);
  const [ready, setReady] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    // Capability checks need the browser; the solid mark covers the server render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(webglAvailable());
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!whenVisible || !root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        // The metal layer unmounts off-screen, so bring the solid mark back until it redraws.
        if (!entry.isIntersecting) setReady(false);
      },
      {
        rootMargin: "200px",
      },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [whenVisible]);

  const handleReady = useCallback(() => {
    setReady(true);
    onReady?.();
  }, [onReady]);

  return (
    <div
      ref={rootRef}
      className={`metal-mark @container relative ${className}`}
      data-metal={ready ? "ready" : undefined}
    >
      <div
        aria-hidden="true"
        className="metal-solid grid size-full place-items-center rounded-[24%] font-display text-[42cqw] font-semibold"
      >
        {person.initials}
      </div>
      {supported && near && (
        // Local boundary: while the lazy shader code loads, only this layer waits. Without it the
        // suspension reaches a boundary higher up and React tears down effects elsewhere on the
        // page (it removed the intro's Esc listener mid-sting).
        <Suspense fallback={null}>
          <LiquidMetalCanvas
            still={still}
            onReady={handleReady}
            className="metal-layer absolute inset-0"
          />
        </Suspense>
      )}
    </div>
  );
}
