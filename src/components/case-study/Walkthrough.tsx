"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { WalkStep } from "@/content/case-studies/types";
import { Marked } from "./Marked";

const SCREEN_W = 270; // the Device screen is 290px wide minus its 10px bezels
const GAP = 34; // room between the phone and the callout

/**
 * The pinned phone walkthrough: the step in the middle of the viewport drives the screen, a hotspot on
 * that screen, a leader line and a callout. Screens slide forward or back like app navigation.
 * Callout text is also in each step (visible on phones, for screen readers on desktop).
 */
export function Walkthrough({ steps }: { steps: readonly WalkStep[] }) {
  const [active, setActive] = useState(0);
  const [settled, setSettled] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) =>
            e.isIntersecting &&
            setActive(Number((e.target as HTMLElement).dataset.i)),
        ),
      { rootMargin: "-48% 0px -48% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // The callout follows once the screen has slid in, so they never move at the same time.
  useEffect(() => {
    const t = window.setTimeout(() => setSettled(active), 340);
    return () => window.clearTimeout(t);
  }, [active]);

  const step = steps[settled];
  const showCallout = settled === active;
  const hotX = 10 + (SCREEN_W * step.hotspot.x) / 100;

  return (
    <div className="grid min-[901px]:grid-cols-[minmax(0,1fr)_600px] min-[901px]:gap-6">
      <ol className="relative pl-6 min-[901px]:pl-[34px]">
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 w-0.5 bg-line"
        >
          <span
            className="block h-full origin-top bg-[var(--proj)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ transform: `scaleY(${(active + 0.5) / steps.length})` }}
          />
        </span>
        {steps.map((s, i) => (
          <li
            key={s.label}
            data-i={i}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            aria-current={active === i ? "step" : undefined}
            className="group relative flex flex-col justify-start py-10 min-[901px]:min-h-[82vh] min-[901px]:justify-center min-[901px]:py-0"
          >
            <span
              aria-hidden="true"
              className="absolute top-[46px] -left-[29px] size-3 rounded-full border-2 border-line bg-paper transition-colors duration-300 group-aria-[current=step]:border-[var(--proj)] group-aria-[current=step]:bg-[var(--proj)] min-[901px]:top-1/2 min-[901px]:-left-[39px] min-[901px]:-mt-1.5"
            />
            <p className="text-sm text-muted">{s.label}</p>
            <h3 className="mt-2.5 mb-4 max-w-[17ch] font-display text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-muted transition-colors duration-300 group-aria-[current=step]:text-ink">
              <Marked runs={s.title} />
            </h3>
            {/* Phones see each screen in place; desktop pins one phone beside the steps. */}
            <div className="mb-4 flex justify-center min-[901px]:hidden">
              <div className="aspect-[290/600] w-[200px] overflow-hidden rounded-[30px] bg-[#0e0f11] p-[7px]">
                <Image
                  src={s.screen}
                  alt={s.screenAlt}
                  sizes="200px"
                  className="size-full rounded-[24px] object-cover object-top"
                />
              </div>
            </div>
            <p className="rounded-xl bg-[var(--proj-soft)] px-3.5 py-2.5 text-[15px] text-ink min-[901px]:sr-only">
              {s.callout}
            </p>
            <p data-full className="mt-3 max-w-[46ch] text-body">
              {s.body}
            </p>
            <ul className="mt-[18px] flex flex-wrap gap-1.5">
              {s.tools.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-surface px-2.5 py-1 text-[13px] text-body"
                >
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="sticky top-0 hidden h-svh items-center justify-end pr-5 min-[901px]:flex">
        <div
          role="img"
          aria-label={steps[active].screenAlt}
          className="relative aspect-[290/600] w-[290px] rounded-[46px] bg-[linear-gradient(145deg,#2a2c31,#0e0f11_60%)] p-2.5 shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.12),0_50px_80px_-40px_rgb(23_24_28/0.55)]"
        >
          <div className="relative size-full overflow-hidden rounded-[37px] bg-paper">
            {steps.map((s, i) => (
              <Image
                key={s.label}
                src={s.screen}
                alt=""
                sizes="290px"
                className="absolute inset-0 size-full object-cover object-top transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  opacity: i === active ? 1 : 0,
                  translate:
                    i < active ? "-26% 0" : i > active ? "26% 0" : "0 0",
                }}
              />
            ))}
          </div>

          {/* Hotspot, leader line and callout: desktop only, decorative (the text is in the step). */}
          <div aria-hidden="true" className="hidden min-[901px]:block">
            <span
              className="absolute z-[3] -mt-2 -ml-2 size-4 rounded-full bg-accent shadow-[0_0_0_5px_rgb(39_67_255/0.18)] transition-opacity duration-200 after:absolute after:inset-0 after:animate-ping-soft after:rounded-full after:bg-accent"
              style={{
                left: hotX,
                top: `calc(10px + (100% - 20px) * ${step.hotspot.y / 100})`,
                opacity: showCallout ? 1 : 0,
              }}
            />
            <span
              className="absolute z-[2] h-[1.5px] origin-right bg-accent transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                left: -GAP,
                width: GAP + hotX,
                top: `calc(10px + (100% - 20px) * ${step.hotspot.y / 100})`,
                transform: `scaleX(${showCallout ? 1 : 0})`,
              }}
            />
            <p
              className="absolute z-[4] w-[220px] rounded-2xl bg-ink px-[15px] py-[13px] text-sm leading-[1.42] text-[#f1f2f5] shadow-[0_22px_44px_-22px_rgb(23_24_28/0.65)] transition-[opacity,scale] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                right: `calc(100% + ${GAP}px)`,
                top: `calc(10px + (100% - 20px) * ${step.hotspot.y / 100} - 34px)`,
                opacity: showCallout ? 1 : 0,
                scale: showCallout ? "1" : "0.96",
                transitionDelay: showCallout ? "180ms" : "0ms",
              }}
            >
              <span className="mb-1 block text-[11px] font-semibold text-[#9eabff]">
                {step.label}
              </span>
              {step.callout}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
