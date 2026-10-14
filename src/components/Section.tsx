import { Reveal } from "./motion";

type SectionProps = {
  id: string;
  heading: string;
  /** Optional small label above the heading (the redesigned homepage sections go without one). */
  kicker?: string;
  /** One supporting line under the heading. */
  sub?: string;
  children: React.ReactNode;
  /** Off when the body runs its own staggered reveal. */
  revealBody?: boolean;
};

/** Shared scaffolding: generous space above, heading, then the body; header and body reveal separately. */
export function Section({
  id,
  heading,
  kicker,
  sub,
  children,
  revealBody = true,
}: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="pt-[150px] max-sm:pt-[110px]"
    >
      <div className="wrap">
        <Reveal>
          {kicker && (
            <p className="mb-3 text-sm font-semibold text-accent-ink">
              {kicker}
            </p>
          )}
          <h2
            id={headingId}
            className="max-w-[22ch] font-display text-[clamp(2rem,4vw,2.8rem)] leading-[1.04] font-semibold tracking-[-0.035em]"
          >
            {heading}
          </h2>
          {sub && <p className="mt-3 max-w-[52ch] text-body">{sub}</p>}
        </Reveal>
        <div className="mt-12 max-sm:mt-9">
          {revealBody ? <Reveal>{children}</Reveal> : children}
        </div>
      </div>
    </section>
  );
}
