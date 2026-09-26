"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO_DONE_EVENT, INTRO_STORAGE_KEY, introActive } from "./intro";

// Portrait screens get the vertical projects video; landscape screens get the stack showreel.
const SOURCES = {
  portrait: "/intro/projects.mp4",
  landscape: "/intro/stack.mp4",
};
const FADE_MS = 400;

const button =
  "rounded-full border border-line bg-surface/90 px-4 py-2 text-sm font-medium text-ink backdrop-blur-sm transition-[border-color,transform] duration-200 ease-out hover:border-ink active:scale-[0.97]";

/**
 * First-visit intro: autoplays for every first-time visitor, then fades into the site when it
 * ends (or on Skip / Esc). The markup is always server-rendered but hidden by CSS unless the
 * <head> script flagged this visit (`html[data-intro]`), so there's no hydration mismatch and no
 * flash. The video file is only requested when the intro actually shows.
 */
export function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);
  const [muted, setMuted] = useState(true);
  const closingRef = useRef(false);

  const finish = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    videoRef.current?.pause();
    window.setTimeout(() => {
      delete document.documentElement.dataset.intro;
      document.querySelectorAll("[data-intro-inert]").forEach((el) => {
        (el as HTMLElement).inert = false;
        el.removeAttribute("data-intro-inert");
      });
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      document.getElementById("main")?.focus({ preventScroll: true });
    }, FADE_MS);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const video = videoRef.current;
    if (!introActive() || !overlay || !video) return;

    // Remember immediately, so a refresh mid-intro doesn't replay it.
    try {
      localStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {}

    // Keep keyboard and screen-reader focus inside the intro while it plays.
    for (const el of Array.from(document.body.children)) {
      if (el !== overlay && el instanceof HTMLElement && !el.inert) {
        el.inert = true;
        el.setAttribute("data-intro-inert", "");
      }
    }

    if (!video.src) {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      video.src = portrait ? SOURCES.portrait : SOURCES.landscape;
    }
    // Browsers only allow autoplay when muted; the Sound button unmutes.
    video.muted = true;
    // Autoplay can still be refused (e.g. battery saver); never trap visitors behind it.
    // An AbortError only means a newer load superseded this one, so it isn't a refusal.
    video.play().catch((error: DOMException) => {
      if (error.name !== "AbortError") finish();
    });
    skipRef.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Intro video"
      data-closing={closing || undefined}
      className="intro-overlay fixed inset-0 z-[100] items-center justify-center"
    >
      <video
        ref={videoRef}
        playsInline
        preload="none"
        onEnded={finish}
        aria-label="Intro video: Kushal Sharma, Android engineer"
        className="size-full object-contain"
      />
      <div className="absolute top-4 right-4 flex gap-2 sm:top-6 sm:right-6">
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          className={button}
        >
          {muted ? "Sound on" : "Sound off"}
        </button>
        <button ref={skipRef} type="button" onClick={finish} className={button}>
          Skip intro
        </button>
      </div>
    </div>
  );
}
