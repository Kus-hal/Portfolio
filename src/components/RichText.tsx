import type { Rich } from "@/content/site";

/** Renders content-file text runs, bolding the ones marked `strong`. */
export function RichText({
  runs,
  strongClassName = "font-semibold text-ink",
}: {
  runs: Rich;
  strongClassName?: string;
}) {
  return runs.map(({ text, strong }, i) =>
    strong ? (
      <strong key={i} className={strongClassName}>
        {text}
      </strong>
    ) : (
      text
    ),
  );
}
