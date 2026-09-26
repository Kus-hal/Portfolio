import { Reveal } from "./motion";

type SectionProps = {
  id: string;
  kicker: string;
  heading: string;
  children: React.ReactNode;
};

/** Shared scaffolding: bordered block, kicker, h2 — header and body reveal separately. */
export function Section({ id, kicker, heading, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="border-t border-line py-[74px]"
    >
      <div className="wrap">
        <Reveal>
          <p className="mb-3 text-sm font-semibold text-accent-ink">{kicker}</p>
          <h2
            id={headingId}
            className="mb-8 max-w-[22ch] font-display text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.08] font-semibold tracking-[-0.02em]"
          >
            {heading}
          </h2>
        </Reveal>
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}
