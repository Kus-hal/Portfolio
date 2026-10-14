"use client";

import { Article, Lightning } from "@phosphor-icons/react";
import { useLayoutEffect, useRef, useState } from "react";

/**
 * Skim / Full story. Skim hides every [data-full] paragraph on the case study, leaving headlines,
 * numbers, screens and callouts: made for showing a client the work in person.
 */
export function SkimToggle() {
  const [skim, setSkim] = useState(false);
  const skimRef = useRef<HTMLButtonElement>(null);
  const fullRef = useRef<HTMLButtonElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    document
      .querySelector<HTMLElement>("[data-case]")
      ?.setAttribute("data-skim", String(skim));
    const b = skim ? skimRef.current : fullRef.current;
    if (b && thumb.current) {
      thumb.current.style.width = `${b.offsetWidth}px`;
      thumb.current.style.transform = `translateX(${b.offsetLeft - 5}px)`;
    }
  }, [skim]);

  const button =
    "relative z-[1] flex items-center gap-[7px] rounded-full px-[18px] py-[9px] text-sm font-medium whitespace-nowrap transition-[color,scale] duration-200 active:scale-[0.97] aria-pressed:text-paper";
  return (
    <div
      role="group"
      aria-label="Reading mode"
      className="glass fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 rounded-full p-[5px]"
    >
      <span
        ref={thumb}
        aria-hidden="true"
        className="absolute top-[5px] bottom-[5px] left-[5px] rounded-full bg-ink transition-[transform,width] duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
      />
      <button
        ref={skimRef}
        type="button"
        aria-pressed={skim}
        onClick={() => setSkim(true)}
        className={`${button} text-muted`}
      >
        <Lightning aria-hidden="true" size={15} /> Skim
      </button>
      <button
        ref={fullRef}
        type="button"
        aria-pressed={!skim}
        onClick={() => setSkim(false)}
        className={`${button} text-muted`}
      >
        <Article aria-hidden="true" size={15} /> Full story
      </button>
    </div>
  );
}
