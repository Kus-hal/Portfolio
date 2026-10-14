"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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
const isPhone = () => window.matchMedia("(max-width: 820px)").matches;

/**
 * Tool tiles; picking one opens a panel on the right (a bottom sheet on phones) that says what the
 * tool did and which projects used it. Opening re-settles the tiles in a short wave; the panel
 * leaves the way it came in. Everything is transform and opacity.
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
  const reduce = useReducedMotion();
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Runs after the layout has changed but before paint, so the panel never flashes in place.
  useLayoutEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    const phone = isPhone();
    if (open && phone) {
      document.body.style.overflow = "hidden";
      closeButton.current?.focus({ preventScroll: true });
    }
    if (reduce) return;
    if (!phone) {
      tiles.current.forEach((t, i) =>
        t?.animate(
          [
            { opacity: 0, transform: "translateY(10px) scale(0.97)" },
            { opacity: 1, transform: "none" },
          ],
          {
            duration: 420,
            easing: DRAWER,
            delay: Math.min(i * 14, 260),
            fill: "backwards",
          },
        ),
      );
    }
    if (open)
      panel.current?.animate(
        phone
          ? [{ transform: "translateY(110%)" }, { transform: "none" }]
          : [
              { opacity: 0, transform: "translateX(48px) scale(0.98)" },
              { opacity: 1, transform: "none" },
            ],
        { duration: 520, easing: DRAWER },
      );
  }, [open, reduce]);

  const close = useCallback(() => {
    const finish = () => {
      setCurrent(null);
      document.body.style.overflow = "";
      opener.current?.focus({ preventScroll: true });
    };
    const el = panel.current;
    if (!el || reduce) return finish();
    // Leave the way it came in, quicker than the entrance.
    const exit = el.animate(
      isPhone()
        ? [{ transform: "none" }, { transform: "translateY(110%)" }]
        : [
            { opacity: 1, transform: "none" },
            { opacity: 0, transform: "translateX(48px) scale(0.98)" },
          ],
      { duration: 240, easing: EASE_OUT, fill: "forwards" },
    );
    exit.onfinish = () => {
      finish();
      exit.cancel();
    };
  }, [reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Never leave the page locked if the component goes away while the sheet is up.
  useEffect(() => () => void (document.body.style.overflow = ""), []);

  const pick = (i: number, el: HTMLButtonElement) => {
    if (current === i) return close();
    opener.current = el;
    setCurrent(i);
  };
  const step = (by: number) =>
    setCurrent((c) =>
      c === null ? c : (c + by + tools.length) % tools.length,
    );

  const tool = current === null ? null : tools[current];

  return (
    <div
      data-open={open}
      className="grid items-start min-[821px]:data-[open=true]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] min-[821px]:data-[open=true]:gap-9"
    >
      <ul className="grid grid-cols-3 gap-2 min-[521px]:grid-cols-[repeat(auto-fill,minmax(124px,1fr))]">
        {tools.map((t, i) => (
          <li key={t.name}>
            <button
              type="button"
              ref={(el) => {
                tiles.current[i] = el;
              }}
              aria-pressed={current === i}
              aria-controls="stack-panel"
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
          aria-hidden="true"
          onClick={close}
          className="fixed inset-0 z-50 bg-ink/30 min-[821px]:hidden"
        />
      )}

      {tool && (
        <aside
          id="stack-panel"
          ref={panel}
          aria-label={`${tool.name}: where I used it`}
          className="rounded-card bg-tone p-7 max-[820px]:fixed max-[820px]:inset-x-2 max-[820px]:bottom-2 max-[820px]:z-[51] max-[820px]:max-h-[82svh] max-[820px]:overflow-auto max-[820px]:bg-paper max-[820px]:shadow-[0_30px_80px_-30px_rgb(23_24_28/0.45)] min-[821px]:sticky min-[821px]:top-24"
        >
          <div className="flex items-center gap-3.5">
            <span className="grid size-[50px] shrink-0 place-items-center rounded-[14px] bg-surface p-3">
              {tool.mark}
            </span>
            <div aria-live="polite">
              <h3 className="font-display text-[1.6rem] leading-[1.1] font-semibold tracking-[-0.03em]">
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

          {/* Keyed by tool so the contents replay their entrance when stepping through. */}
          <div key={current}>
            <p className="stage-in mt-5 font-display text-[1.12rem] leading-[1.4] font-medium tracking-[-0.01em]">
              {tool.how}
            </p>
            {tool.usedIn.length > 0 ? (
              <>
                <p className="stage-in mt-[22px] text-sm text-muted [animation-delay:50ms]">
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
                        style={{ animationDelay: `${100 + n * 50}ms` }}
                      >
                        <a
                          href={p.href}
                          onClick={() => isPhone() && close()}
                          className="grid grid-cols-[44px_1fr_auto] items-center gap-3.5 rounded-2xl bg-surface px-3.5 py-3 transition-[background-color,translate] duration-300 hover:translate-x-[3px] hover:bg-white"
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
                        </a>
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
        </aside>
      )}
    </div>
  );
}
