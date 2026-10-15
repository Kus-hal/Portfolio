"use client";

import { useRef, useState } from "react";
import type { CaseStudy } from "@/content/case-studies/types";
import { REDUCED_MOTION, useMedia } from "../useMedia";
import { useScrollScene } from "./useScrollScene";

type PipelineData = NonNullable<CaseStudy["pipeline"]>;

const dot = {
  customer: "bg-accent border-accent",
  admin: "bg-tick border-tick",
  partner: "bg-ink border-ink",
} as const;

/**
 * The order pipeline, scrubbed by scroll: an order token travels the stages and the big label says who
 * moved it. Reduced motion shows every stage at once as a list.
 */
export function Pipeline({ data }: { data: PipelineData }) {
  const reduce = useMedia(REDUCED_MOTION);
  const section = useRef<HTMLElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const token = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const last = data.stages.length - 1;

  useScrollScene(
    section,
    (p) => {
      const q = Math.min(1, Math.max(0, (p - 0.08) / 0.84));
      if (fill.current) fill.current.style.transform = `scaleX(${q})`;
      if (token.current)
        token.current.style.transform = `translateX(${q * 100}%)`;
      const i = Math.round(q * last);
      setStage((s) => (s === i ? s : i));
    },
    !reduce,
  );

  const legend = (
    <div className="mt-8 flex flex-wrap gap-6 text-sm text-body">
      <span className="flex items-center gap-2.5">
        <i className="size-2.5 rounded-full bg-accent" />
        Customer
      </span>
      <span className="flex items-center gap-2.5">
        <i className="size-2.5 rounded-full bg-tick" />
        Admin
      </span>
      <span className="flex items-center gap-2.5">
        <i className="size-2.5 rounded-full bg-ink" />
        Partner app
      </span>
    </div>
  );
  const heading = (
    <h2
      id="pipeline-heading"
      className="max-w-[20ch] font-display text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.04] font-semibold tracking-[-0.035em]"
    >
      {data.heading}
    </h2>
  );

  if (reduce)
    return (
      <section aria-labelledby="pipeline-heading" className="wrap pt-[150px]">
        {heading}
        <ol className="mt-10 grid gap-2.5 min-[621px]:grid-cols-2">
          {data.stages.map((s, i) => (
            <li
              key={s.label}
              className="flex items-start gap-3 rounded-card bg-surface p-4"
            >
              <span
                className={`mt-1.5 size-3 shrink-0 rounded-full border-2 ${dot[s.by]}`}
              />
              <span>
                <span className="block font-semibold">
                  {i + 1}. {s.label}
                </span>
                <span className="text-sm text-muted">{s.who}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">{data.note}</p>
        {legend}
      </section>
    );

  const current = data.stages[stage];
  return (
    <section
      ref={section}
      aria-labelledby="pipeline-heading"
      className="h-[240vh]"
    >
      <div className="sticky top-0 grid h-svh min-h-[620px] items-center">
        <div className="wrap">
          {heading}
          <div
            className="mt-11 flex min-h-[96px] items-baseline gap-[18px]"
            aria-hidden="true"
          >
            <span className="text-sm text-muted tabular-nums">
              {String(stage + 1).padStart(2, "0")} /{" "}
              {String(data.stages.length).padStart(2, "0")}
            </span>
            <div key={stage} className="stage-in">
              <p className="font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-none font-semibold tracking-[-0.045em]">
                {current.label}
              </p>
              <p className="mt-2 text-[15px] text-muted">{current.who}</p>
            </div>
          </div>
          <ol className="sr-only">
            {data.stages.map((s) => (
              <li key={s.label}>
                {s.label}: {s.who}
              </li>
            ))}
          </ol>
          <div aria-hidden="true" className="relative mt-11 h-[60px]">
            <div className="absolute inset-x-0 top-[29px] h-0.5 bg-line" />
            <div
              ref={fill}
              className="absolute inset-x-0 top-[29px] h-0.5 origin-left scale-x-0 bg-ink"
            />
            {data.stages.map((s, i) => (
              <span
                key={s.label}
                className={`absolute top-[22px] -ml-2 size-4 rounded-full border-2 transition-[background-color,border-color,scale] duration-200 ${i <= stage ? dot[s.by] : "border-[#cfd1d8] bg-paper"} ${i === stage ? "scale-[1.35]" : ""}`}
                style={{ left: `${(i / last) * 100}%` }}
              />
            ))}
            <div ref={token} className="absolute inset-x-0 top-0">
              <span className="absolute top-[-6px] -translate-x-1/2 rounded-lg bg-ink px-2.5 py-1 text-xs whitespace-nowrap text-paper tabular-nums">
                CL-2041
              </span>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted">{data.note}</p>
          {legend}
        </div>
      </div>
    </section>
  );
}
