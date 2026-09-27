import { work, type Project } from "@/content/site";
import { Section } from "./Section";
import { Tags } from "./Tags";

const badgeTone: Record<Project["tone"], string> = {
  accent: "bg-accent text-white",
  ink: "bg-ink text-paper",
  neutral: "border border-line bg-paper text-ink",
  outline: "border-2 border-accent bg-surface text-accent-ink",
};

const card =
  // Phones stack the badge above the copy so tags get the full width.
  "grid items-center gap-4 rounded-card border border-line bg-surface px-5 py-6 min-[521px]:grid-cols-[auto_1fr] min-[521px]:gap-[22px] min-[521px]:px-[26px] min-[821px]:grid-cols-[auto_1fr_auto]";

function ProjectBody({ project }: { project: Project }) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`grid size-11 place-items-center self-start rounded-xl font-display text-[1.2rem] font-bold min-[521px]:size-[52px] ${badgeTone[project.tone]}`}
      >
        {project.badge}
      </span>
      <div>
        <h3 className="mb-1 font-display text-[1.2rem] font-semibold">
          {project.name}
        </h3>
        <p className="mb-2.5 text-[0.97rem] text-muted">{project.summary}</p>
        <Tags items={project.tags} />
      </div>
    </>
  );
}

export function Work() {
  return (
    <Section id="work" kicker={work.kicker} heading={work.heading}>
      <ul className="grid gap-4">
        {work.projects.map((project) => (
          <li key={project.name}>
            {project.href ? (
              // Only linked cards lift on hover, so the motion never promises a click that isn't there.
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${card} group transition-[border-color,transform] duration-200 ease-out hover:border-ink pointer-fine:hover:-translate-y-0.5`}
              >
                <ProjectBody project={project} />
                <span className="col-span-full text-sm whitespace-nowrap text-muted transition-colors duration-200 group-hover:text-accent-ink min-[821px]:col-auto">
                  {project.cta}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            ) : (
              <article className={card}>
                <ProjectBody project={project} />
                <span className="col-span-full text-sm whitespace-nowrap text-muted min-[821px]:col-auto">
                  {project.cta}
                </span>
              </article>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
