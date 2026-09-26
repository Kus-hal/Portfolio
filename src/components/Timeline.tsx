import type { TimelineEntry } from "@/content/site";
import { RichText } from "./RichText";
import { Tags } from "./Tags";

/** The two-column when/where list shared by Experience and Education. */
export function Timeline({ items }: { items: readonly TimelineEntry[] }) {
  return (
    <ol>
      {items.map(({ org, role, when, context, bullets, tags }) => (
        <li
          key={org}
          className="grid gap-2 border-t border-line py-[26px] first:border-t-0 first:pt-0 min-[821px]:grid-cols-[170px_1fr] min-[821px]:gap-7"
        >
          <p className="text-sm text-muted tabular-nums">{when}</p>
          <div>
            <h3 className="font-display text-[1.2rem] font-semibold">{org}</h3>
            <p className="mt-0.5 mb-3 text-[0.95rem] text-accent-ink">{role}</p>
            {context && (
              <p className="mb-3 text-[0.98rem] text-body">{context}</p>
            )}
            {bullets && (
              <ul className="grid gap-[9px]">
                {bullets.map((runs, i) => (
                  <li
                    key={i}
                    className="relative pl-5 text-[0.98rem] text-body before:absolute before:top-[0.62em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent"
                  >
                    <RichText runs={runs} />
                  </li>
                ))}
              </ul>
            )}
            {tags && <Tags items={tags} className="mt-3.5" />}
          </div>
        </li>
      ))}
    </ol>
  );
}
