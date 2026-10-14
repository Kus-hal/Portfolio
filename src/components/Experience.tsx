import { ArrowDownRight } from "@phosphor-icons/react/dist/ssr";
import { experience } from "@/content/site";
import { RichText } from "./RichText";
import { Section } from "./Section";

/** Jobs on their own, kept apart from the projects: who, what role, and what came out of it. */
export function Experience() {
  return (
    <Section id="experience" heading={experience.heading}>
      <ol className="grid gap-2.5">
        {experience.entries.map(({ org, role, when, highlights }) => (
          <li
            key={org}
            className="grid gap-3.5 rounded-card bg-surface p-6 min-[821px]:grid-cols-[240px_1fr_auto] min-[821px]:gap-[30px] min-[821px]:px-8 min-[821px]:py-[30px]"
          >
            <div>
              <h3 className="font-display text-[1.35rem] font-semibold tracking-[-0.02em]">
                {org}
              </h3>
              <p className="mt-1 text-[15px] text-muted">{role}</p>
            </div>
            {highlights && (
              <ul className="grid gap-2.5 text-body">
                {highlights.map((runs, i) => (
                  <li key={i} className="flex gap-3">
                    <ArrowDownRight
                      aria-hidden="true"
                      size={16}
                      className="mt-[5px] shrink-0 text-accent"
                    />
                    <span>
                      <RichText runs={runs} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-sm whitespace-nowrap text-muted tabular-nums max-[820px]:order-first">
              {when}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
