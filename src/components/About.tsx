import { about } from "@/content/site";
import { Section } from "./Section";

const tones = {
  tone: { box: "bg-tone", label: "text-muted" },
  surface: { box: "bg-surface", label: "text-muted" },
  deep: { box: "bg-tone-2", label: "text-muted" },
  accent: { box: "bg-accent text-white", label: "text-[#dfe3ff]" },
} as const;

// Column spans on the 12-column desktop grid; phones stack, with the two short facts side by side.
const spans = {
  2: "col-span-1 min-[821px]:col-span-2",
  3: "col-span-1 min-[821px]:col-span-3",
  5: "col-span-2 min-[821px]:col-span-5",
  7: "col-span-2 min-[821px]:col-span-7",
} as const;

/** About in shapes: one statement, then short facts. Nobody reads three paragraphs here. */
export function About() {
  return (
    <Section id="about" heading={about.heading}>
      <div className="grid grid-cols-2 gap-2 min-[821px]:grid-cols-12 min-[821px]:gap-2.5">
        <div className="col-span-2 flex flex-col justify-between gap-[30px] rounded-card bg-ink p-[26px] text-paper min-[821px]:col-span-7 min-[821px]:row-span-2 min-[821px]:p-9">
          <p className="max-w-[24ch] font-display text-[clamp(1.4rem,2.3vw,2rem)] leading-[1.25] font-medium tracking-[-0.02em]">
            {about.statement}
          </p>
          <p className="text-[15px] text-[#b9bcc6]">{about.statementNote}</p>
        </div>
        {about.cells.map(({ label, value, tone, span }) => (
          <div
            key={label}
            className={`rounded-card px-[26px] py-6 ${tones[tone].box} ${spans[span]}`}
          >
            <p className={`text-sm ${tones[tone].label}`}>{label}</p>
            <p className="mt-1.5 font-display text-[1.2rem] leading-[1.3] font-semibold tracking-[-0.015em]">
              {value}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
