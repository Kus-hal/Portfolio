"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { hero, person } from "@/content/site";
import { INTRO_DONE_EVENT, INTRO_STORAGE_KEY, introActive } from "./intro";
import { LiquidMetalMark } from "./LiquidMetalMark";

/**
 * First-visit intro sting: KS mark → name → role, cut to a track's beat grid, then the name flies
 * into the real hero heading so the sting becomes the page. Animated with the Web Animations API
 * (no library), silent for visitors; `?intro=N` previews a version with its music.
 */

type Version = 1 | 2 | 3;

// `period` is one beat. The drop lands HIT seconds into each (local-only) preview clip.
const VERSIONS: Record<
  Version,
  { label: string; track: string; bpm: number; period: number }
> = {
  1: {
    label: "Pop",
    track: "Different Heaven — Nekozilla",
    bpm: 129,
    period: 0.4644,
  },
  2: {
    label: "Reveal",
    track: "Electro-Light — Symbolism",
    bpm: 112,
    period: 0.5341,
  },
  3: { label: "Slam", track: "HXI — Lock n' Load", bpm: 129, period: 0.4644 },
};
const HIT = 0.35;

const EASE = {
  out: "cubic-bezier(0.23, 1, 0.32, 1)",
  back: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  inOut: "cubic-bezier(0.77, 0, 0.175, 1)",
};

type Els = {
  bg: HTMLElement;
  flash: HTMLElement;
  stage: HTMLElement;
  mark: HTMLElement;
  ring: HTMLElement;
  sweep: HTMLElement;
  lines: HTMLElement[];
  role: HTMLElement;
  rule: HTMLElement;
};

/** Schedules one keyframe animation `at` seconds from the start. */
type Play = (
  el: HTMLElement,
  frames: Keyframe[],
  at: number,
  dur: number,
  easing?: string,
) => void;

/** Each version builds its own motion language and returns when the handoff starts. */
const TIMELINES: Record<Version, (e: Els, p: number, play: Play) => number> = {
  // Pop: bright, bouncy scale-pops on paper.
  1: (e, p, play) => {
    play(
      e.mark,
      [
        { opacity: 0, transform: "scale(0.55)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      HIT,
      0.45,
      EASE.back,
    );
    play(
      e.ring,
      [
        { opacity: 0.5, transform: "scale(0.6)" },
        { opacity: 0, transform: "scale(2.4)" },
      ],
      HIT,
      0.7,
      EASE.out,
    );
    const nameAt = HIT + 2 * p;
    play(
      e.mark,
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.8)" },
      ],
      nameAt,
      0.25,
      EASE.out,
    );
    e.lines.forEach((line, i) =>
      play(
        line,
        [
          { opacity: 0, transform: "translateY(30px) scale(0.92)" },
          { opacity: 1, transform: "none" },
        ],
        nameAt + i * 0.5 * p,
        0.45,
        EASE.back,
      ),
    );
    play(
      e.role,
      [
        { opacity: 0, transform: "translateY(18px)" },
        { opacity: 1, transform: "none" },
      ],
      HIT + 4 * p,
      0.4,
      EASE.out,
    );
    return HIT + 9 * p;
  },

  // Reveal: slow masked reveals with a cobalt light sweep.
  2: (e, p, play) => {
    play(
      e.mark,
      [
        { opacity: 1, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, clipPath: "inset(0 0 0 0)" },
      ],
      HIT,
      0.6,
      EASE.out,
    );
    play(
      e.sweep,
      [
        { opacity: 1, transform: "translateX(-120%)" },
        { opacity: 1, transform: "translateX(260%)" },
      ],
      HIT - 0.05,
      0.75,
      EASE.inOut,
    );
    const nameAt = HIT + 2 * p;
    play(
      e.mark,
      [{ opacity: 1 }, { opacity: 0 }],
      nameAt - 0.1,
      0.35,
      EASE.out,
    );
    e.lines.forEach((line, i) =>
      play(
        line,
        [
          { opacity: 1, transform: "translateY(105%)" },
          { opacity: 1, transform: "none" },
        ],
        nameAt + i * 0.5 * p,
        0.75,
        EASE.out,
      ),
    );
    const roleAt = HIT + 4 * p;
    play(
      e.role,
      [
        { opacity: 0, transform: "translateY(12px)" },
        { opacity: 1, transform: "none" },
      ],
      roleAt,
      0.6,
      EASE.out,
    );
    play(
      e.rule,
      [
        { opacity: 1, transform: "scaleX(0)" },
        { opacity: 1, transform: "scaleX(1)" },
      ],
      roleAt + 0.1,
      0.7,
      EASE.out,
    );
    return HIT + 8 * p;
  },

  // Slam: hard cuts on ink, type slams with a cobalt flash.
  3: (e, p, play) => {
    const slam = (el: HTMLElement, at: number) =>
      play(
        el,
        [
          { opacity: 1, transform: "scale(1.7)" },
          { opacity: 1, transform: "none" },
        ],
        at,
        0.1,
        "ease-in",
      );
    const flash = (at: number, peak: number) =>
      play(
        e.flash,
        [{ opacity: 0 }, { opacity: peak, offset: 0.2 }, { opacity: 0 }],
        at,
        0.22,
        "linear",
      );
    const shake = (at: number) =>
      play(
        e.stage,
        [
          { transform: "none" },
          { transform: "translate(-6px, 3px)" },
          { transform: "translate(5px, -4px)" },
          { transform: "none" },
        ],
        at + 0.08,
        0.14,
        "linear",
      );
    slam(e.mark, HIT);
    flash(HIT, 0.85);
    shake(HIT);
    const nameAt = HIT + 2 * p;
    play(e.mark, [{ opacity: 1 }, { opacity: 0 }], nameAt, 0.01, "linear");
    e.lines.forEach((line, i) => {
      slam(line, nameAt + i * p);
      shake(nameAt + i * p);
    });
    flash(nameAt, 0.35);
    const roleAt = HIT + 5 * p;
    slam(e.role, roleAt);
    flash(roleAt, 0.25);
    return HIT + 9 * p;
  },
};

/**
 * Compiling the liquid-metal shader costs ~2 s of main thread on a slow phone, right as the page
 * loads, so only capable devices get it in the sting (the footer metal loads later, on scroll).
 * Laptops/desktops need 4+ cores; phones need 8+ cores and 6+ GB; Data Saver always opts out.
 */
function canAffordMetal() {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return false;
  const cores = nav.hardwareConcurrency ?? 2;
  const memory = nav.deviceMemory ?? 8;
  const desktop = window.matchMedia("(pointer: fine)").matches;
  return desktop ? cores >= 4 : cores >= 8 && memory >= 6;
}

const button =
  "glass rounded-full px-4 py-2 text-sm font-medium transition-transform duration-200 ease-out active:scale-[0.97]";

export function IntroSting() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [preview, setPreview] = useState(false);
  const [started, setStarted] = useState(false);
  const [metal, setMetal] = useState(false);
  const running = useRef({
    anims: [] as Animation[],
    timers: [] as number[],
    audio: null as HTMLAudioElement | null,
    announced: false,
    started: false,
    done: false,
  });

  /** Lets the hero entrance start (once): at the handoff, or immediately on skip. */
  const announce = useCallback(() => {
    if (running.current.announced) return;
    running.current.announced = true;
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
  }, []);

  /** Tears the intro down and hands the page back. */
  const release = useCallback(() => {
    const r = running.current;
    if (r.done) return;
    r.done = true;
    setMetal(false); // unmounts the shader, so the GPU stops once the intro is gone
    r.timers.forEach(clearTimeout);
    r.audio?.pause();
    delete document.documentElement.dataset.intro;
    delete document.documentElement.dataset.introPreview;
    document.querySelectorAll("[data-intro-inert]").forEach((el) => {
      (el as HTMLElement).inert = false;
      el.removeAttribute("data-intro-inert");
    });
    const heading = document.getElementById("hero-heading");
    if (heading) heading.style.visibility = "";
    announce();
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [announce]);

  /** Skip / Esc: fade out quickly from wherever the timeline is. */
  const skip = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay || running.current.done) return;
    running.current.anims.forEach((a) => a.pause());
    overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 300,
      easing: EASE.out,
      fill: "forwards",
    });
    window.setTimeout(release, 300);
  }, [release]);

  const start = useCallback(
    async (v: Version, withSound: boolean) => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      // Timeline parts are marked with data-el, so one ref covers them all.
      const el = (name: string) =>
        overlay.querySelector(`[data-el="${name}"]`) as HTMLElement;
      const nameEl = el("name");
      const els: Els = {
        bg: el("bg"),
        flash: el("flash"),
        stage: el("stage"),
        mark: el("mark"),
        ring: el("ring"),
        sweep: el("sweep"),
        lines: Array.from(nameEl.querySelectorAll<HTMLElement>("[data-line]")),
        role: el("role"),
        rule: el("rule"),
      };
      const r = running.current;
      // The setup effect can re-run (e.g. a Suspense re-reveal); the timeline must start only once.
      if (r.started) return;
      r.started = true;
      setStarted(true);

      if (withSound) {
        r.audio = new Audio(`/intro/audio/sting-${v}.mp3`);
        // Start the visuals when the audio actually starts, so beats line up.
        await r.audio.play().catch(() => (r.audio = null));
      }
      const t0 = performance.now();
      const play: Play = (target, frames, at, dur, easing = EASE.out) => {
        const delay = at * 1000 - (performance.now() - t0);
        r.anims.push(
          target.animate(frames, {
            delay,
            duration: dur * 1000,
            easing,
            fill: "forwards",
          }),
        );
      };

      const handoffAt = TIMELINES[v](els, VERSIONS[v].period, play);

      // Handoff: the sting name flies onto the real hero heading while the backdrop dissolves.
      r.timers.push(
        window.setTimeout(() => {
          const heading = document.getElementById("hero-heading");
          const wrapper = heading?.parentElement;
          if (!heading || !wrapper) return release();
          // The hero entrance hasn't run yet, so remove its pending offset to get the final spot.
          const offset = new DOMMatrixReadOnly(
            getComputedStyle(wrapper).transform === "none"
              ? undefined
              : getComputedStyle(wrapper).transform,
          );
          const to = heading.getBoundingClientRect();
          const from = nameEl.getBoundingClientRect();
          const scale = to.height / from.height;
          const dx = to.left - offset.m41 - from.left;
          const dy = to.top - offset.m42 - from.top;
          // Hide the real heading while its entrance runs underneath; it reappears exactly where
          // the flying name lands (the entrance takes ~0.66 s, the flight 0.7 s).
          heading.style.visibility = "hidden";
          announce();
          const fly = 0.7;
          play(
            nameEl,
            [
              { transform: "none" },
              { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
            ],
            handoffAt,
            fly,
            EASE.inOut,
          );
          play(
            nameEl,
            [
              { color: getComputedStyle(nameEl).color },
              { color: "var(--color-ink)" },
            ],
            handoffAt,
            fly,
            EASE.inOut,
          );
          play(
            els.role,
            [{ opacity: 1 }, { opacity: 0 }],
            handoffAt,
            0.2,
            EASE.out,
          );
          play(
            els.bg,
            [{ opacity: 1 }, { opacity: 0 }],
            handoffAt + 0.1,
            0.5,
            EASE.out,
          );
          r.timers.push(window.setTimeout(release, fly * 1000 + 30));
        }, handoffAt * 1000),
      );
    },
    [release, announce],
  );

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!introActive() || !overlay) return;
    const data = document.documentElement.dataset;
    const v = Number(data.intro) as Version;
    const isPreview = data.introPreview === "1";
    setVersion(v);
    setPreview(isPreview);
    setMetal(canAffordMetal());

    if (!isPreview) {
      // Remember immediately, so a refresh mid-intro doesn't replay it.
      try {
        localStorage.setItem(INTRO_STORAGE_KEY, "1");
      } catch {}
    }
    // Keep keyboard and screen-reader focus inside the intro while it's up.
    for (const child of Array.from(document.body.children)) {
      if (child !== overlay && child instanceof HTMLElement && !child.inert) {
        child.inert = true;
        child.setAttribute("data-intro-inert", "");
      }
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    window.addEventListener("keydown", onKey);
    if (!isPreview) {
      start(v, false);
      skipRef.current?.focus();
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [start, skip]);

  const info = version ? VERSIONS[version] : null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Intro: ${person.name}, ${person.title}`}
      className="intro-overlay fixed inset-0 z-[100]"
    >
      <div data-el="bg" className="intro-bg absolute inset-0" />
      <div
        data-el="flash"
        className="pointer-events-none absolute inset-0 bg-accent opacity-0"
      />

      <div
        className="relative wrap flex h-full flex-col justify-center"
        aria-hidden="true"
      >
        <div data-el="stage" className="intro-stage relative">
          <div className="absolute top-1/2 left-0 -translate-y-1/2">
            <div
              data-el="ring"
              className="intro-ring absolute inset-0 rounded-[28px] border-4 border-accent"
            />
            <div
              data-el="mark"
              className="intro-mark relative size-32 overflow-hidden rounded-[30px]"
            >
              {/* Liquid metal only while the intro runs, so other visits never load the shader. */}
              {metal ? (
                <LiquidMetalMark className="size-full" />
              ) : (
                <div className="metal-solid grid size-full place-items-center rounded-[30px] font-display text-5xl font-semibold">
                  {person.initials}
                </div>
              )}
              <div
                data-el="sweep"
                className="intro-sweep absolute inset-y-0 left-0 w-1/2 bg-accent"
              />
            </div>
          </div>
          <p
            data-el="name"
            className="intro-name origin-top-left font-display text-[clamp(3rem,8vw,5.4rem)] leading-[0.98] font-bold tracking-[-0.03em]"
          >
            {person.name.split(" ").map((part) => (
              <span key={part} className="intro-line block">
                <span data-line className="block">
                  {part}
                </span>
              </span>
            ))}
          </p>
          <p
            data-el="role"
            className="intro-role mt-[22px] font-display text-[clamp(1.15rem,2.6vw,1.55rem)] font-medium"
          >
            <strong className="font-semibold">{hero.role.strong}</strong>{" "}
            {hero.role.rest}
          </p>
          <div
            data-el="rule"
            className="intro-rule mt-4 h-[3px] w-40 origin-left rounded-full bg-accent"
          />
        </div>
      </div>

      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          ref={skipRef}
          type="button"
          onClick={skip}
          className={`intro-button ${button}`}
        >
          Skip intro
        </button>
      </div>

      {preview && info && !started && (
        <div className="absolute inset-x-4 bottom-6 mx-auto max-w-md rounded-card border border-line bg-surface p-5 text-ink shadow-lg">
          <p className="text-sm font-semibold text-accent-ink">
            Preview · version {version} of 3 · {info.label}
          </p>
          <p className="mt-1 text-sm text-muted">
            {info.track} · {info.bpm} BPM
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => start(version!, true)}
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-accent"
            >
              Play with sound
            </button>
            <button
              type="button"
              onClick={() => start(version!, false)}
              className="rounded-full border border-line px-4 py-2 text-sm font-medium hover:border-ink"
            >
              Play silent (as visitors see it)
            </button>
          </div>
          <p className="mt-4 flex gap-3 text-sm text-muted">
            Compare:
            {([1, 2, 3] as const).map((n) => (
              <a
                key={n}
                href={`/?intro=${n}`}
                aria-current={n === version ? "page" : undefined}
                className="underline underline-offset-2 aria-[current]:font-semibold aria-[current]:text-ink"
              >
                Version {n}
              </a>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
