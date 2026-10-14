import type { Marked as MarkedRuns } from "@/content/case-studies/types";

/** Text with highlighter runs; the swipe is a scroll-driven CSS animation (see .cs-mark). */
export function Marked({ runs }: { runs: MarkedRuns }) {
  return runs.map(({ text, mark }, i) =>
    mark ? (
      <mark key={i} className="cs-mark">
        {text}
      </mark>
    ) : (
      text
    ),
  );
}
