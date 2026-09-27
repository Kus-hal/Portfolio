import { about } from "@/content/site";
import { RichText } from "./RichText";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" kicker={about.kicker} heading={about.heading}>
      <div className="grid items-start gap-14 max-[820px]:gap-[34px] min-[821px]:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-[18px] text-body">
          {about.paragraphs.map((runs, i) => (
            <p key={i}>
              <RichText runs={runs} />
            </p>
          ))}
        </div>

        <div>
          <dl className="overflow-hidden rounded-card border border-line bg-surface">
            {about.facts.map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between gap-4 border-b border-line px-[18px] py-[15px] text-[15px] last:border-b-0"
              >
                <dt className="text-muted">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <dl className="mt-11 grid grid-cols-2 gap-[26px] min-[821px]:grid-cols-4 min-[821px]:gap-5">
        {about.stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col-reverse">
            <dt className="mt-0.5 text-sm text-muted">{label}</dt>
            <dd className="font-display text-[1.9rem] leading-tight font-semibold tracking-[-0.02em]">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
