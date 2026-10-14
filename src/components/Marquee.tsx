import { hero } from "@/content/site";

/** The page's one loud move: the promise, travelling across the full width. Paused on hover,
 *  and still under reduced motion (globals.css stops every animation there). */
export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="group overflow-hidden pt-[120px] whitespace-nowrap max-sm:pt-20"
    >
      <div className="inline-flex animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="pr-[0.6em] font-display text-[clamp(3rem,8vw,7rem)] leading-none font-semibold tracking-[-0.045em]"
          >
            {hero.marquee}
          </span>
        ))}
      </div>
    </div>
  );
}
