import { capabilities } from "@/content/site";
import { Section } from "./Section";

export function Capabilities() {
  return (
    <Section
      id="build"
      kicker={capabilities.kicker}
      heading={capabilities.heading}
    >
      <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line min-[821px]:grid-cols-2">
        {capabilities.items.map(({ title, body }, i) => (
          <li key={title} className="bg-surface px-7 py-[30px]">
            <h3 className="mb-2.5 flex items-center gap-2.5 font-display text-[1.18rem] font-semibold">
              <span className="text-[0.85rem] font-medium text-accent-ink tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {title}
            </h3>
            <p className="text-[0.98rem] text-muted">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
