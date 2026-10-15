import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { hasCaseStudy } from "@/content/case-studies";
import omniaHome from "@/assets/case-studies/omnia/home.webp";
import omniaWallet from "@/assets/case-studies/omnia/wallet.webp";
import clothLabScreen from "@/assets/work/clothlab-screen.webp";
import { work, type Project, type ProjectId } from "@/content/site";
import { ProjectIcon } from "./ProjectIcon";
import { Section } from "./Section";
import { Tags } from "./Tags";

/** Two small phones per card. Cloth Lab and OMNIA show real screens; the rest are simple drawings in
 *  each app's colours, to be swapped for real screenshots. */
function Screen({ id, front }: { id: ProjectId; front: boolean }) {
  if (id === "omnia")
    return (
      <Image
        src={front ? omniaHome : omniaWallet}
        alt=""
        sizes="64px"
        className="size-full object-cover object-top"
      />
    );
  if (id === "cloth-lab" && front)
    return (
      <Image
        src={clothLabScreen}
        alt=""
        className="size-full object-cover object-left-top"
      />
    );
  const blocks = (bg: string, rows: [number, string][]) => (
    <div
      className="grid h-full content-start gap-[5px] px-1.5 pt-3.5"
      style={{ background: bg }}
    >
      {rows.map(([h, c], i) => (
        <i
          key={i}
          className="block rounded-[5px]"
          style={{ height: h, background: c }}
        />
      ))}
    </div>
  );
  switch (id) {
    case "cloth-lab":
      return blocks("#fbf8f1", [
        [22, "#fff"],
        [30, "#fff"],
        [12, "#fbf3c9"],
      ]);
    case "loudly":
      return front ? (
        <div className="flex h-full items-center justify-center gap-[3px] bg-[#1d2027]">
          {[30, 46, 22, 38].map((h, i) => (
            <i
              key={i}
              className={`block w-1 rounded-sm ${i === 2 ? "bg-[#8fa0ff]" : "bg-white"}`}
              style={{ height: h }}
            />
          ))}
        </div>
      ) : (
        blocks("#1d2027", [
          [14, "#2c303a"],
          [14, "#2c303a"],
          [14, "#2c303a"],
        ])
      );
    case "ting":
      return front ? (
        <div className="grid h-full place-items-center bg-accent font-display text-[17px] font-semibold text-white tabular-nums">
          00:45
        </div>
      ) : (
        blocks("#f4f5f7", [
          [34, "#2743ff"],
          [14, "#e2e5ec"],
          [14, "#e2e5ec"],
        ])
      );
  }
}

function Thumbs({ id }: { id: ProjectId }) {
  return (
    <div
      aria-hidden="true"
      className="relative hidden h-[150px] w-[150px] min-[821px]:block"
    >
      <div className="thumb-back absolute right-[58px] bottom-0 h-[146px] w-[72px] rotate-[-6deg] rounded-[15px] bg-[#121316] p-1 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
        <div className="size-full overflow-hidden rounded-[11px]">
          <Screen id={id} front={false} />
        </div>
      </div>
      <div className="thumb-front absolute right-1 bottom-0 z-[1] h-[146px] w-[72px] rounded-[15px] bg-[#121316] p-1 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
        <div className="size-full overflow-hidden rounded-[11px]">
          <Screen id={id} front />
        </div>
      </div>
    </div>
  );
}

const card =
  "grid grid-cols-[52px_1fr] items-center gap-4 rounded-[20px] bg-surface px-[18px] py-[22px] min-[821px]:grid-cols-[64px_1fr_150px] min-[821px]:gap-[26px] min-[821px]:py-[26px] min-[821px]:pr-[30px] min-[821px]:pl-[26px]";

function Body({ project }: { project: Project }) {
  return (
    <div>
      <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-[1.4rem] font-semibold tracking-[-0.02em]">
        {/* Shares its name with the case-study title, so the title morphs from card to page. */}
        <ViewTransition
          name={`project-title-${project.id}`}
          share="morph"
          default="none"
        >
          <span>{project.name}</span>
        </ViewTransition>
        <span className="font-sans text-[13.5px] font-medium tracking-normal text-muted">
          {project.status}
        </span>
      </h3>
      <p className="mt-1.5 max-w-[58ch] text-body">{project.summary}</p>
      <Tags items={project.tags} className="mt-3.5" />
    </div>
  );
}

export function Work() {
  return (
    <Section id="work" heading={work.heading}>
      <ul className="grid gap-2.5">
        {work.projects.map((project) => (
          <li
            key={project.id}
            id={`work-${project.id}`}
            className="scroll-mt-24"
          >
            {hasCaseStudy(project.id) ? (
              <Link
                href={`/work/${project.id}`}
                className={`${card} group work-link transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-fine:hover:-translate-y-[3px] pointer-fine:hover:bg-white`}
              >
                <ViewTransition
                  name={`project-icon-${project.id}`}
                  share="morph"
                  default="none"
                >
                  <span className="block self-start">
                    <ProjectIcon id={project.id} />
                  </span>
                </ViewTransition>
                <div>
                  <Body project={project} />
                  <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium transition-colors duration-200 group-hover:text-accent-ink">
                    Read the case study
                    <ArrowRight
                      aria-hidden="true"
                      size={15}
                      className="transition-transform duration-200 pointer-fine:group-hover:translate-x-1"
                    />
                  </span>
                </div>
                <Thumbs id={project.id} />
              </Link>
            ) : project.href ? (
              // Only linked cards lift and fan their phones, so motion never promises a click that isn't there.
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${card} group work-link transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-fine:hover:-translate-y-[3px] pointer-fine:hover:bg-white`}
              >
                <ProjectIcon id={project.id} />
                <div>
                  <Body project={project} />
                  <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium transition-colors duration-200 group-hover:text-accent-ink">
                    {project.hrefLabel}
                    <ArrowUpRight aria-hidden="true" size={15} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </div>
                <Thumbs id={project.id} />
              </a>
            ) : (
              <article className={card}>
                <ProjectIcon id={project.id} />
                <div>
                  <Body project={project} />
                  <p className="mt-4 text-[15px] text-muted">
                    Case study coming soon
                  </p>
                </div>
                <Thumbs id={project.id} />
              </article>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
