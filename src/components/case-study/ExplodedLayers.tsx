"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import type { CaseStudy } from "@/content/case-studies/types";
import { REDUCED_MOTION, useMedia } from "../useMedia";
import { useScrollScene } from "./useScrollScene";

type Layers = NonNullable<CaseStudy["layers"]>;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => 1 - (1 - t) ** 3;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * "One app, taken apart": as you scroll, the phone tilts flat and separates into its three layers
 * (what you tap, what's shared, what owns the rules) while the copy steps through them. Updates run
 * only on scroll while the section is on screen; transforms are written straight to the DOM.
 * Reduced motion and phones show the finished, separated stack and all three descriptions.
 */
export function ExplodedLayers({
  layers,
  screen,
}: {
  layers: Layers;
  screen: StaticImageData;
}) {
  // Phones and reduced motion get the finished, separated stack with all three layers described.
  const reducedMotion = useMedia(REDUCED_MOTION);
  const phone = useMedia("(max-width: 900px)");
  const reduce = reducedMotion || phone;
  const section = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const ui = useRef<HTMLDivElement>(null);
  const kt = useRef<HTMLDivElement>(null);
  const fb = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState([0, 0, 0]);

  useScrollScene(
    section,
    (p) => {
      const rot = ease(seg(p, 0.04, 0.32));
      const spread = ease(seg(p, 0.22, 0.5));
      if (stack.current)
        stack.current.style.transform = `scale(0.8) rotateX(${lerp(0, 58, rot)}deg) rotateZ(${lerp(0, -38, rot)}deg) translateY(${lerp(0, 30, rot)}px)`;
      if (ui.current)
        ui.current.style.transform = `translateZ(${lerp(0, 230, spread)}px)`;
      if (kt.current) {
        kt.current.style.transform = `translateZ(${lerp(-2, 0, spread)}px)`;
        kt.current.style.opacity = String(seg(p, 0.2, 0.34));
      }
      if (fb.current) {
        fb.current.style.transform = `translateZ(${lerp(-4, -230, spread)}px)`;
        fb.current.style.opacity = String(seg(p, 0.2, 0.34));
      }
      const next = p < 0.5 ? 0 : p < 0.75 ? 1 : 2;
      setActive((a) => (a === next ? a : next));
      const bounds: [number, number][] = [
        [0, 0.5],
        [0.5, 0.75],
        [0.75, 1],
      ];
      setProgress((old) => {
        const fresh = bounds.map(([a, b], i) =>
          i < next ? 1 : i === next ? seg(p, a, b) : 0,
        );
        return fresh.every((v, i) => Math.abs(v - old[i]) < 0.02) ? old : fresh;
      });
    },
    !reduce,
  );

  const plateBase =
    "absolute inset-0 rounded-[42px] [transform-style:preserve-3d] transition-[filter,opacity] duration-400";
  const dimmed = (i: number) =>
    !reduce && active !== i
      ? "grayscale-[0.85] brightness-[1.06] contrast-[0.82]"
      : "";

  return (
    <section
      ref={section}
      aria-labelledby="layers-heading"
      className={
        reduce
          ? "py-[110px]"
          : "h-[320vh] bg-[linear-gradient(var(--color-paper),#eceef2_30%,#eceef2_70%,var(--color-paper))]"
      }
    >
      <div
        className={
          reduce
            ? "wrap grid items-center gap-10 min-[901px]:grid-cols-[0.9fr_1.1fr]"
            : "sticky top-0 grid h-svh min-h-[640px] items-start overflow-hidden min-[901px]:items-center"
        }
      >
        <div
          className={
            reduce
              ? "contents"
              : "wrap grid min-[901px]:grid-cols-[0.9fr_1.1fr] min-[901px]:items-center"
          }
        >
          <div className="order-2 min-[901px]:order-none">
            <h2
              id="layers-heading"
              className="font-display text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.04] font-semibold tracking-[-0.035em]"
            >
              {layers.heading}
            </h2>
            {!reduce && (
              <div aria-hidden="true" className="mt-2 flex gap-2">
                {progress.map((v, i) => (
                  <i
                    key={i}
                    className="relative block h-[3px] w-[46px] overflow-hidden rounded-sm bg-[#d4d6dc]"
                  >
                    <b
                      className="absolute inset-0 origin-left bg-ink"
                      style={{ transform: `scaleX(${v})` }}
                    />
                  </i>
                ))}
              </div>
            )}
            <div
              className={
                reduce
                  ? "mt-8 grid gap-8"
                  : "relative mt-8 min-h-[150px] min-[901px]:min-h-[260px]"
              }
            >
              {layers.states.map((s, i) => (
                <div
                  key={s.tag}
                  className={
                    reduce
                      ? ""
                      : `absolute inset-0 transition-[opacity,translate] duration-[450ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${active === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2.5 opacity-0"}`
                  }
                >
                  <p className="text-[13px] font-semibold text-[var(--proj)]">
                    {s.tag}
                  </p>
                  <h3 className="mt-2 mb-2.5 font-display text-[1.6rem] leading-[1.15] font-semibold tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p data-full className="max-w-[42ch] text-body">
                    {s.body}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {s.chips.map((c) => (
                      <li
                        key={c}
                        className="rounded-lg bg-surface px-2.5 py-1 text-[13px] text-body"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div
            aria-hidden="true"
            className={`order-1 grid place-items-center [perspective-origin:50%_40%] [perspective:1700px] min-[901px]:order-none ${reduce ? "h-[520px] min-[901px]:h-[560px]" : "h-[50vh] min-[901px]:h-svh min-[901px]:min-h-[640px]"}`}
          >
            <div
              ref={stack}
              className="relative h-[580px] w-[280px] [transform-style:preserve-3d]"
              style={
                reduce
                  ? {
                      transform:
                        "scale(0.52) rotateX(58deg) rotateZ(-38deg) translateY(30px)",
                    }
                  : undefined
              }
            >
              <div
                ref={fb}
                className={`${plateBase} border border-[#2c303a] bg-[#1b1d22] shadow-[0_40px_70px_-30px_rgb(23_24_28/0.6)] ${dimmed(2)}`}
                style={
                  reduce ? { transform: "translateZ(-230px)" } : { opacity: 0 }
                }
              >
                <Plate
                  sub="Backend"
                  title="Firebase"
                  blocks={layers.plates.backend}
                  dark
                />
              </div>
              <div
                ref={kt}
                className={`${plateBase} border border-[rgb(39_67_255/0.35)] bg-[rgb(252_252_253/0.78)] shadow-[0_30px_60px_-30px_rgb(39_67_255/0.45)] ${dimmed(1)}`}
                style={reduce ? undefined : { opacity: 0 }}
              >
                <Plate
                  sub="commonMain"
                  title="Shared Kotlin"
                  blocks={layers.plates.shared}
                />
              </div>
              <div
                ref={ui}
                className={`${plateBase} bg-[linear-gradient(145deg,#2a2c31,#0e0f11_60%)] p-2.5 ${dimmed(0)}`}
                style={reduce ? { transform: "translateZ(230px)" } : undefined}
              >
                <div className="relative size-full overflow-hidden rounded-[33px]">
                  <Image
                    src={screen}
                    alt=""
                    sizes="280px"
                    className="size-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Plate({
  sub,
  title,
  blocks,
  dark = false,
}: {
  sub: string;
  title: string;
  blocks: readonly string[];
  dark?: boolean;
}) {
  return (
    <div
      className={`absolute inset-[26px] flex flex-col gap-2.5 ${dark ? "text-[#e9eaee]" : "text-ink"}`}
    >
      <span className="text-xs opacity-70">{sub}</span>
      <span className="font-display text-xl font-semibold tracking-[-0.02em]">
        {title}
      </span>
      <div className="mt-1.5 grid grid-cols-2 gap-2">
        {blocks.map((b) => (
          <span
            key={b}
            className={`rounded-[10px] p-2.5 text-center text-xs ${dark ? "border border-[#353944] bg-[#262930] text-[#ffc46b]" : "border border-[#d9def7] bg-white text-accent-ink"}`}
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
