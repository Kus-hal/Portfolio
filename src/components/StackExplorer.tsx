"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useMedia } from "./useMedia";

export type ExplorerTool = {
  name: string;
  group: string;
  how: string;
  usedIn: string[];
  mark: React.ReactNode;
};

export type ExplorerProject = {
  name: string;
  blurb: string;
  href: string;
  icon: React.ReactNode;
};

const DRAWER = "cubic-bezier(0.32, 0.72, 0, 1)"; // iOS-style sheet curve
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const PHONE_QUERY = "(max-width: 820px)";

/**
 * Tool tiles; picking one opens a panel on the right (a modal bottom sheet on phones) that says what
 * the tool did and which projects used it. Opening re-settles the tiles in a short wave; the panel
 * leaves the way it came in. Movement is transform and opacity; the panel contents also unblur.
 */
export function StackExplorer({
  tools,
  projects,
}: {
  tools: ExplorerTool[];
  projects: Record<string, ExplorerProject>;
}) {
  const [current, setCurrent] = useState<number | null>(null);
  const open = current !== null;
  const phone = useMedia(PHONE_QUERY);
  const reduce = useReducedMotion();
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const exiting = useRef<Animation[] | null>(null);
  const wasOpen = useRef(false);

  // Runs after the layout has changed but before paint, so the panel never flashes in place.
  useLayoutEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    if (open) {
      // Phones get a modal sheet, so focus its close button; desktop moves focus to the panel title.
      (phone ? closeButton.current : heading.current)?.focus({
        preventScroll: true,
      });
    }
    if (reduce) return;
    if (!phone) {
      tiles.current.forEach((t, i) =>
        t?.animate(
          [
            { opacity: 0, transform: "translateY(8px) scale(0.98)" },
            { opacity: 1, transform: "none" },
          ],
          {
            duration: 360,
            easing: DRAWER,
            delay: Math.min(i * 10, 160),
            fill: "backwards",
          },
        ),
      );
    }
    if (open) {
      panel.current?.animate(
        phone
          ? [{ transform: "translateY(110%)" }, { transform: "none" }]
          : [
              { opacity: 0, transform: "translateX(40px) scale(0.98)" },
              { opacity: 1, transform: "none" },
            ],
        { duration: 380, easing: DRAWER },
      );
      scrim.current?.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        easing: EASE_OUT,
      });
    }
  }, [open, phone, reduce]);

  // The page behind a phone sheet can't scroll; released as soon as the sheet goes or the width grows.
  useEffect(() => {
    if (!open || !phone) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, phone]);

  const close = useCallback(() => {
    if (exiting.current) return;
    const finish = () => {
      exiting.current = null;
      setCurrent(null);
      opener.current?.focus({ preventScroll: true });
    };
    if (!panel.current || reduce) return finish();
    // Leave the way it came in, quicker than the entrance.
    const out = panel.current.animate(
      phone
        ? [{ transform: "none" }, { transform: "translateY(110%)" }]
        : [
            { opacity: 1, transform: "none" },
            { opacity: 0, transform: "translateX(40px) scale(0.98)" },
          ],
      { duration: 220, easing: EASE_OUT, fill: "forwards" },
    );
    const fade = scrim.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 160,
      easing: EASE_OUT,
      fill: "forwards",
    });
    exiting.current = fade ? [out, fade] : [out];
    out.onfinish = () => {
      exiting.current?.forEach((a) => a.cancel());
      finish();
    };
  }, [phone, reduce]);

  // A pick during the exit wins: the panel stays and shows the new tool.
  const cancelExit = () => {
    exiting.current?.forEach((a) => {
      a.onfinish = null;
      a.cancel();
    });
    exiting.current = null;
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      // Keep Tab inside the sheet while it is modal on phones.
      if (e.key !== "Tab" || !phone || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, phone, close]);

  const pick = (i: number, el: HTMLButtonElement) => {
    if (current === i && !exiting.current) return close();
    cancelExit();
    opener.current = el;
    setCurrent(i);
  };
  const step = (by: number) => {
    if (current === null) return;
    const next = (current + by + tools.length) % tools.length;
    opener.current = tiles.current[next];
    setCurrent(next);
  };

  const tool = current === null ? null : tools[current];
  const modal = open && phone;

  return (
    <div
      data-open={open}
      className="grid items-start min-[821px]:data-[open=true]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] min-[821px]:data-[open=true]:gap-9"
    >
      <ul
        inert={modal}
        className="grid grid-cols-3 gap-2 min-[521px]:grid-cols-[repeat(auto-fill,minmax(124px,1fr))]"
      >
        {tools.map((t, i) => (
          <li key={t.name}>
            <button
              type="button"
              ref={(el) => {
                tiles.current[i] = el;
              }}
              aria-pressed={current === i}
              aria-controls={current === i ? "stack-panel" : undefined}
              onClick={(e) => pick(i, e.currentTarget)}
              className="group flex size-full flex-col items-start gap-3 rounded-card bg-surface p-3.5 text-left text-sm font-medium transition-[background-color,color,scale] duration-200 ease-out active:scale-[0.97] aria-pressed:bg-ink aria-pressed:text-paper pointer-fine:hover:not-aria-pressed:bg-white"
            >
              <span className="grid size-[26px] place-items-center rounded-[7px]">
                {t.mark}
              </span>
              {t.name}
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div
          ref={scrim}
          aria-hidden="true"
          onClick={close}
          className="fixed inset-0 z-50 bg-ink/30 min-[821px]:hidden"
        />
      )}

      {tool && (
        <section
          id="stack-panel"
          ref={panel}
          role={modal ? "dialog" : "region"}
          aria-modal={modal || undefined}
          aria-labelledby="stack-panel-title"
          className="rounded-card bg-tone p-7 max-[820px]:fixed max-[820px]:inset-x-2 max-[820px]:bottom-2 max-[820px]:z-[51] max-[820px]:max-h-[82svh] max-[820px]:overflow-auto max-[820px]:bg-paper max-[820px]:shadow-[0_30px_80px_-30px_rgb(23_24_28/0.45)] min-[821px]:sticky min-[821px]:top-24"
        >
          <div className="flex items-center gap-3.5">
            <span className="grid size-[50px] shrink-0 place-items-center rounded-[14px] bg-surface p-3">
              {tool.mark}
            </span>
            <div aria-live="polite">
              <h3
                id="stack-panel-title"
                ref={heading}
                tabIndex={-1}
                className="font-display text-[1.6rem] leading-[1.1] font-semibold tracking-[-0.03em] outline-none"
              >
                {tool.name}
              </h3>
              <p className="mt-0.5 text-sm text-muted">{tool.group}</p>
            </div>
            <button
              ref={closeButton}
              type="button"
              onClick={close}
              aria-label="Close"
              className="ml-auto grid size-10 shrink-0 place-items-center rounded-full bg-surface transition-[background-color,scale] duration-200 hover:bg-white active:scale-[0.94]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Keyed by tool so the contents replay a short entrance when stepping through. */}
          <div key={current}>
            <p className="stage-in mt-5 font-display text-[1.12rem] leading-[1.4] font-medium tracking-[-0.01em]">
              {tool.how}
            </p>
            {tool.usedIn.length > 0 ? (
              <>
                <p className="stage-in mt-[22px] text-sm text-muted [animation-delay:30ms]">
                  Used in{" "}
                  {tool.usedIn.length === 1
                    ? "1 project"
                    : `${tool.usedIn.length} projects`}
                </p>
                <ul className="mt-2.5 grid gap-2">
                  {tool.usedIn.map((id, n) => {
                    const p = projects[id];
                    return (
                      <li
                        key={id}
                        className="stage-in"
                        style={{ animationDelay: `${60 + n * 30}ms` }}
                      >
                        <Link
                          href={p.href}
                          onClick={() => phone && close()}
                          className="grid grid-cols-[44px_1fr_auto] items-center gap-3.5 rounded-2xl bg-surface px-3.5 py-3 transition-[background-color,translate] duration-300 pointer-fine:hover:translate-x-[3px] pointer-fine:hover:bg-white"
                        >
                          {p.icon}
                          <span>
                            <span className="block font-display text-[1.05rem] font-semibold">
                              {p.name}
                            </span>
                            <span className="text-sm text-muted">
                              {p.blurb}
                            </span>
                          </span>
                          <ArrowUpRight aria-hidden="true" size={16} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <p className="stage-in mt-[22px] text-sm text-muted">
                Not in a shipped project yet.
              </p>
            )}
          </div>

          <div className="mt-[22px] flex justify-between gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-medium transition-[background-color,scale] duration-200 hover:bg-surface active:scale-[0.97]"
            >
              <ArrowLeft aria-hidden="true" size={16} /> Previous
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-medium transition-[background-color,scale] duration-200 hover:bg-surface active:scale-[0.97]"
            >
              Next <ArrowRight aria-hidden="true" size={16} />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
