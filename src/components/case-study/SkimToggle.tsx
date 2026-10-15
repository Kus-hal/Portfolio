"use client";

import { Article, Lightning } from "@phosphor-icons/react";
import { useLayoutEffect, useRef, useState } from "react";

/**
 * Skim / Full story. Skim hides every [data-full] paragraph on the case study, leaving headlines,
 * numbers, screens and callouts: made for showing a client the work in person.
 */
export function SkimToggle() {
  const [skim, setSkim] = useState(false);
  const [measured, setMeasured] = useState(false);
  const group = useRef<HTMLDivElement>(null);
  const skimRef = useRef<HTMLButtonElement>(null);
  const fullRef = useRef<HTMLButtonElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    document
      .querySelector<HTMLElement>("[data-case]")
      ?.setAttribute("data-skim", String(skim));
    const place = () => {
      const b = skim ? skimRef.current : fullRef.current;
      if (!b || !thumb.current) return;
      thumb.current.style.width = `${b.offsetWidth}px`;
      thumb.current.style.transform = `translateX(${b.offsetLeft - 5}px)`;
      setMeasured(true);
    };
    place();
    // Re-measure when fonts swap in or the viewport changes.
    const ro = new ResizeObserver(place);
    if (group.current) ro.observe(group.current);
    return () => ro.disconnect();
  }, [skim]);

  // The pressed label turns light only once the dark thumb sits under it.
  const button =
    "relative z-[1] flex items-center gap-[7px] rounded-full px-[18px] py-[9px] text-sm font-medium whitespace-nowrap text-muted transition-[color,scale] duration-200 active:scale-[0.97]";
  const pressed = measured
    ? "aria-pressed:text-paper"
    : "aria-pressed:text-ink";
  return (
    // The glass class sets position: relative, so the fixed positioning lives on this wrapper.
    <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
      <div
        ref={group}
        role="group"
        aria-label="Reading mode"
        className="glass flex rounded-full p-[5px]"
      >
        <span
          ref={thumb}
          aria-hidden="true"
          className={`absolute top-[5px] bottom-[5px] left-[5px] rounded-full bg-ink transition-[transform,width,opacity] duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${measured ? "opacity-100" : "opacity-0"}`}
        />
        <button
          ref={skimRef}
          type="button"
          aria-pressed={skim}
          onClick={() => setSkim(true)}
          className={`${button} ${pressed}`}
        >
          <Lightning aria-hidden="true" size={15} /> Skim
        </button>
        <button
          ref={fullRef}
          type="button"
          aria-pressed={!skim}
          onClick={() => setSkim(false)}
          className={`${button} ${pressed}`}
        >
          <Article aria-hidden="true" size={15} /> Full story
        </button>
      </div>
    </div>
  );
}
