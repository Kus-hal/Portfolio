import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { CaseStudy } from "@/content/case-studies/types";
import { nextCaseStudy } from "@/content/case-studies";
import { links } from "@/content/site";
import { ButtonLink } from "../ButtonLink";
import { Contact } from "../Contact";
import { Reveal } from "../motion";
import { ProjectIcon } from "../ProjectIcon";
import { CaseNav } from "./CaseNav";
import { Device } from "./Device";
import { ExplodedLayers } from "./ExplodedLayers";
import { HeroDevice } from "./HeroDevice";
import { Marked } from "./Marked";
import { Pipeline } from "./Pipeline";
import { SkimToggle } from "./SkimToggle";
import { Walkthrough } from "./Walkthrough";

const h2 =
  "max-w-[20ch] font-display text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.04] font-semibold tracking-[-0.035em]";

function Block({
  id,
  heading,
  children,
  className = "",
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`wrap pt-[150px] max-sm:pt-[110px] ${className}`}
    >
      <Reveal>
        <h2 id={`${id}-heading`} className={h2}>
          {heading}
        </h2>
      </Reveal>
      <Reveal className="mt-12 max-sm:mt-9">{children}</Reveal>
    </section>
  );
}

const glanceTone = {
  strong: "bg-[var(--proj)] text-[var(--proj-on)]",
  ink: "bg-ink text-paper",
  soft: "bg-[var(--proj-soft)] text-ink",
  surface: "bg-surface text-ink",
} as const;
const glanceNote = {
  strong: "opacity-80",
  ink: "text-[#a4a8b2]",
  soft: "text-body",
  surface: "text-muted",
} as const;

/** One project's case study: problem, stakes, what was built, results and the pitch. */
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const next = nextCaseStudy(study.slug);
  const style = {
    "--proj": study.accent.strong,
    "--proj-soft": study.accent.soft,
    "--proj-mark": study.accent.mark,
    "--proj-on": study.accent.onStrong,
  } as React.CSSProperties;

  return (
    <div data-case style={style} className="overflow-x-clip">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <CaseNav current={study.slug} />
      <main id="main" tabIndex={-1} className="pb-[150px] outline-none">
        {/* Hero */}
        <section
          aria-labelledby="case-title"
          className="wrap grid items-center gap-10 pt-16 min-[901px]:min-h-[calc(100svh-80px)] min-[901px]:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <div className="mb-6 flex items-center gap-3.5">
              <ViewTransition
                name={`project-icon-${study.slug}`}
                share="morph"
                default="none"
              >
                <span className="block">
                  <ProjectIcon id={study.slug} size={60} />
                </span>
              </ViewTransition>
              <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-[13px] text-body">
                <span
                  aria-hidden="true"
                  className="size-[7px] rounded-full bg-tick"
                />
                {study.status}
              </span>
            </div>
            <ViewTransition
              name={`project-title-${study.slug}`}
              share="morph"
              default="none"
            >
              <h1
                id="case-title"
                className="font-display text-[clamp(3.4rem,8.4vw,7rem)] leading-[0.92] font-bold tracking-[-0.05em]"
              >
                {study.name}
              </h1>
            </ViewTransition>
            <p className="mt-6 max-w-[34ch] text-[clamp(1.15rem,2vw,1.42rem)] leading-[1.4] text-body">
              {study.sub}
            </p>
            <dl className="mt-10 grid max-w-[480px] grid-cols-2 gap-x-9 gap-y-[18px]">
              {study.meta.map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-[13px] text-muted">{label}</dt>
                  <dd className="mt-0.5 text-[15px] font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            {study.links && (
              <div className="mt-9 flex flex-wrap gap-2.5">
                {study.links.map((l) => (
                  <ButtonLink
                    key={l.href}
                    href={l.href}
                    variant={l.soft ? "soft" : "solid"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label} <ArrowUpRight aria-hidden="true" size={16} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </ButtonLink>
                ))}
              </div>
            )}
          </div>
          <div className="max-[900px]:hidden">
            <HeroDevice>
              <Device screen={study.heroScreen} alt={study.heroAlt} preload />
            </HeroDevice>
          </div>
        </section>

        {/* The problem, in two parts */}
        <Block id="problem" heading={study.problem.heading}>
          <div className="grid gap-2.5 min-[901px]:grid-cols-2">
            {[study.problem.users, study.problem.client].map((p, i) => (
              <article
                key={p.label}
                data-tone={i === 0 ? undefined : "dark"}
                className={`rounded-[22px] p-7 min-[901px]:p-9 ${i === 0 ? "bg-surface" : "bg-ink text-paper"}`}
              >
                <p
                  className={`text-sm ${i === 0 ? "text-muted" : "text-[#a4a8b2]"}`}
                >
                  {p.label}
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.45rem,2.6vw,1.95rem)] leading-[1.18] font-semibold tracking-[-0.025em]">
                  <Marked runs={p.title} />
                </h3>
                <p
                  data-full
                  className={`mt-4 max-w-[52ch] ${i === 0 ? "text-body" : "text-[#c9ccd4]"}`}
                >
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </Block>

        {/* What was at stake */}
        <Block id="stakes" heading={study.stakes.heading}>
          <ol className="grid gap-x-10 gap-y-8 min-[621px]:grid-cols-2">
            {study.stakes.items.map((s) => (
              <li key={s.title}>
                <span
                  aria-hidden="true"
                  className="mb-4 block h-1 w-7 rounded-full bg-[var(--proj)]"
                />
                <h3 className="font-display text-[1.3rem] font-semibold tracking-[-0.02em]">
                  {s.title}
                </h3>
                <p data-full className="mt-1.5 max-w-[46ch] text-body">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </Block>

        {/* At a glance */}
        <Block id="glance" heading={study.glance.heading}>
          <div className="grid gap-3.5 min-[901px]:auto-rows-[minmax(210px,auto)] min-[901px]:grid-cols-3">
            {study.glance.items.map((g) => (
              <article
                key={g.title}
                className={`rounded-[22px] p-7 ${glanceTone[g.tone]} ${g.wide ? "min-[901px]:col-span-2" : ""} ${g.tall ? "min-[901px]:row-span-2" : ""}`}
              >
                <h3>
                  <span className="block font-display text-[clamp(2.6rem,5vw,4rem)] leading-[0.95] font-semibold tracking-[-0.05em]">
                    {g.value}
                  </span>
                  <span className="sr-only"> </span>
                  <span className="mt-3 block max-w-[26ch] text-[17px] leading-[1.35] font-semibold">
                    {g.title}
                  </span>
                </h3>
                <p
                  data-full
                  className={`mt-2 max-w-[40ch] text-[14.5px] ${glanceNote[g.tone]}`}
                >
                  {g.body}
                </p>
              </article>
            ))}
          </div>
        </Block>

        {/* What I built: the walkthrough */}
        <section
          aria-labelledby="walk-heading"
          className="wrap pt-[150px] max-sm:pt-[110px]"
        >
          <h2 id="walk-heading" className={h2}>
            {study.walkthrough.heading}
          </h2>
          <div className="mt-8">
            <Walkthrough steps={study.walkthrough.steps} />
          </div>
        </section>

        {study.layers && (
          <ExplodedLayers layers={study.layers} screen={study.heroScreen} />
        )}

        {study.apps && (
          <Block id="apps" heading={study.apps.heading}>
            <div
              className={`grid gap-14 min-[901px]:gap-7 ${study.apps.items.some((a) => a.kind === "browser") ? "items-end min-[901px]:grid-cols-[1fr_1fr_1.6fr]" : "items-start min-[901px]:grid-cols-3"}`}
            >
              {study.apps.items.map((a) => (
                <figure key={a.name}>
                  {a.kind === "phone" ? (
                    <Device
                      screen={a.screen}
                      alt={a.alt}
                      className="mx-auto w-[230px] rounded-[38px]"
                      sizes="230px"
                    />
                  ) : (
                    <div className="overflow-hidden rounded-2xl bg-surface shadow-[0_34px_60px_-34px_rgb(23_24_28/0.45)]">
                      <div className="flex items-center gap-1.5 bg-[#fafafb] px-3 py-2.5">
                        <i className="size-[9px] rounded-full bg-[#dcdde2]" />
                        <i className="size-[9px] rounded-full bg-[#dcdde2]" />
                        <i className="size-[9px] rounded-full bg-[#dcdde2]" />
                      </div>
                      <Image
                        src={a.screen}
                        alt={a.alt}
                        sizes="(min-width: 901px) 560px, 100vw"
                        className="w-full"
                      />
                    </div>
                  )}
                  <figcaption className="mt-5">
                    <b className="block font-display text-[1.15rem] font-semibold tracking-[-0.01em]">
                      {a.name}
                    </b>
                    <span
                      data-full
                      className="mt-1 block max-w-[36ch] text-[14.5px] text-muted"
                    >
                      {a.body}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Block>
        )}

        {study.services && (
          <Block id="services" heading={study.services.heading}>
            <ul className="grid gap-2.5 min-[621px]:grid-cols-2 min-[1001px]:grid-cols-3">
              {study.services.items.map((v) => (
                <li
                  key={v.title}
                  className={`flex flex-col overflow-hidden rounded-[22px] ${v.screen ? "bg-surface" : "bg-[var(--proj-soft)]"}`}
                >
                  <div className="p-6">
                    <h3 className="font-display text-[1.2rem] font-semibold tracking-[-0.02em]">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 max-w-[40ch] text-[14.5px] text-body">
                      {v.body}
                    </p>
                  </div>
                  {v.screen && (
                    // The top of the screen peeks up from the bottom of the card.
                    <div className="mt-auto h-[230px] overflow-hidden px-10">
                      <div className="mx-auto max-w-[220px] overflow-hidden rounded-t-[26px] border-x-[6px] border-t-[6px] border-[#16171b]">
                        {/* Decorative: the card's title and line already say what it shows. */}
                        <Image src={v.screen} alt="" className="w-full" />
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Block>
        )}

        {study.spotlight && (
          <Block id="spotlight" heading={study.spotlight.heading}>
            <div className="grid items-center gap-10 min-[901px]:grid-cols-[0.8fr_1fr] min-[901px]:gap-16">
              <Image
                src={study.spotlight.image}
                alt={study.spotlight.alt}
                className="mx-auto w-full max-w-[280px] rounded-[28px] shadow-[0_34px_60px_-34px_rgb(23_24_28/0.45)] min-[901px]:max-w-[380px]"
              />
              <div>
                {/* Kept in Skim mode: the points below need it for context. */}
                <p className="max-w-[46ch] text-[clamp(1.1rem,1.8vw,1.3rem)] leading-[1.45] text-body">
                  {study.spotlight.body}
                </p>
                <ul className="mt-8 grid gap-2.5">
                  {study.spotlight.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-3 rounded-card bg-[var(--proj-soft)] px-4 py-3.5 text-[15px]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--proj)]"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Block>
        )}

        {study.control && (
          <Block id="control" heading={study.control.heading}>
            <p data-full className="-mt-6 mb-10 max-w-[56ch] text-body">
              {study.control.body}
            </p>
            <div className="grid items-start gap-10 min-[1001px]:grid-cols-[1.2fr_1fr]">
              <div className="overflow-hidden rounded-2xl bg-surface shadow-[0_34px_60px_-34px_rgb(23_24_28/0.45)]">
                <Image
                  src={study.control.screen}
                  alt={study.control.alt}
                  sizes="(min-width: 1001px) 640px, 100vw"
                  className="w-full"
                />
              </div>
              <ul className="grid grid-cols-2 gap-2.5">
                {study.control.powers.map((p) => (
                  <li
                    key={p.title}
                    className="rounded-card bg-[var(--proj-soft)] p-4"
                  >
                    <b className="block text-[15px] font-semibold">{p.title}</b>
                    <span className="text-[13.5px] text-body">{p.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Block>
        )}

        {study.pipeline && <Pipeline data={study.pipeline} />}

        {/* Decisions */}
        <Block id="decisions" heading={study.decisions.heading}>
          <div>
            {study.decisions.items.map((d, i) => (
              <article
                key={i}
                className="grid gap-3 border-t border-line py-10 last:border-b min-[901px]:grid-cols-[1.05fr_1fr] min-[901px]:gap-10"
              >
                <h3 className="max-w-[22ch] font-display text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.15] font-semibold tracking-[-0.025em]">
                  <Marked runs={d.title} />
                </h3>
                <div>
                  <p data-full className="max-w-[48ch] text-body">
                    {d.body}
                  </p>
                  {d.fact && (
                    <span className="mt-3.5 inline-block rounded-lg bg-[var(--proj-soft)] px-2.5 py-1 text-[13px] font-medium">
                      {d.fact}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Block>

        {/* Results */}
        <Block id="results" heading={study.results.heading}>
          <p data-full className="-mt-6 mb-10 max-w-[56ch] text-body">
            {study.results.body}
          </p>
          <dl className="grid grid-cols-2 gap-2.5 min-[901px]:grid-cols-4">
            {study.results.items.map((r) => (
              <div
                key={r.label}
                className="flex flex-col-reverse justify-end rounded-[22px] bg-ink p-6 text-paper"
              >
                <dt className="mt-2 text-sm text-[#b9bcc6]">{r.label}</dt>
                <dd className="font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none font-semibold tracking-[-0.045em]">
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
        </Block>

        {/* What I'd build for you */}
        <Block id="pitch" heading={study.pitch.heading}>
          <div className="grid gap-2.5 min-[821px]:grid-cols-2">
            {study.pitch.items.map((p) => (
              <article key={p.who} className="rounded-[22px] bg-surface p-7">
                <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.02em] text-[var(--proj)]">
                  {p.who}
                </h3>
                <p className="mt-2 max-w-[48ch] text-body">{p.what}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <ButtonLink href={links.email}>
              Get in touch <ArrowUpRight aria-hidden="true" size={16} />
            </ButtonLink>
            <ButtonLink href={links.resume} variant="soft" download>
              Download résumé
            </ButtonLink>
          </div>
        </Block>

        {/* Drafted options: kept or dropped per project */}
        {(study.whatsNext || study.stack) && (
          <section aria-label="Status and stack" className="wrap pt-[110px]">
            <div className="grid gap-2.5 min-[821px]:grid-cols-2">
              {study.whatsNext && (
                <div className="rounded-[22px] bg-tone p-7">
                  <h2 className="font-display text-[1.25rem] font-semibold">
                    {study.whatsNext.heading}
                  </h2>
                  <ul className="mt-4 grid gap-2.5 text-body">
                    {study.whatsNext.items.map((n) => (
                      <li key={n} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--proj)]"
                        />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {study.stack && (
                <div className="rounded-[22px] bg-tone p-7">
                  <h2 className="font-display text-[1.25rem] font-semibold">
                    {study.stack.heading}
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {study.stack.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-surface px-3 py-1 text-[13.5px] text-body"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/#stack"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink hover:text-ink"
                  >
                    See the whole stack{" "}
                    <ArrowRight aria-hidden="true" size={14} />
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Next project */}
        <section aria-label="Next" className="wrap pt-[110px]">
          <Link
            href={next ? `/work/${next.slug}` : "/#work"}
            className="group relative block overflow-hidden rounded-[28px] bg-ink p-9 text-paper min-[821px]:p-[52px]"
          >
            <span className="text-sm text-[#9ea2ad]">
              {next ? "Next project" : "More work"}
            </span>
            <span className="mt-3.5 block font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] font-semibold tracking-[-0.05em]">
              {next ? next.name : "Back to all work"}
            </span>
            <span className="mt-3.5 block max-w-[44ch] text-[#b9bcc6]">
              {next ? next.sub : "More case studies are on the way."}
            </span>
            <span
              aria-hidden="true"
              className="mt-7 grid size-16 place-items-center rounded-full bg-paper text-ink transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] min-[821px]:absolute min-[821px]:right-[46px] min-[821px]:bottom-[46px] min-[821px]:mt-0 pointer-fine:group-hover:translate-x-1.5"
            >
              <ArrowRight size={24} />
            </span>
          </Link>
        </section>
      </main>
      <Contact />
      <SkimToggle />
    </div>
  );
}
