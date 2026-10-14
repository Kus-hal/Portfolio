import { ChalkboardTeacher } from "@phosphor-icons/react/dist/ssr";
import * as simpleIcons from "simple-icons";
import { stack, work, type ProjectId } from "@/content/site";
import { ProjectIcon } from "./ProjectIcon";
import { Section } from "./Section";
import {
  StackExplorer,
  type ExplorerProject,
  type ExplorerTool,
} from "./StackExplorer";

type SimpleIcon = { title: string; path: string };

/** A brand mark from simple-icons (CC0), drawn in the current text colour so it can invert. */
function BrandMark({ slug }: { slug: string }) {
  const key =
    `si${slug[0].toUpperCase()}${slug.slice(1)}` as keyof typeof simpleIcons;
  const icon = simpleIcons[key] as SimpleIcon | undefined;
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-full"
    >
      <path d={icon.path} />
    </svg>
  );
}

const blurbs: Record<ProjectId | "codeup", string> = {
  "cloth-lab": "Laundry startup, three platforms",
  omnia: "Fintech super-app, SDLC Corp",
  loudly: "Offline audio sync",
  ting: "Interval timer on Google Play",
  codeup: "Client work and mentoring",
};

export function Stack() {
  const projects: Record<string, ExplorerProject> = Object.fromEntries([
    ...work.projects.map((p) => [
      p.id,
      {
        name: p.name,
        blurb: blurbs[p.id],
        href: `#work-${p.id}`,
        icon: <ProjectIcon id={p.id} size={44} />,
      },
    ]),
    [
      "codeup",
      {
        name: "Codeup",
        blurb: blurbs.codeup,
        href: "#experience",
        icon: (
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-tone"
          >
            <ChalkboardTeacher size={20} />
          </span>
        ),
      },
    ],
  ]);

  const tools: ExplorerTool[] = stack.groups.flatMap(({ name: group, tools }) =>
    tools.map((t) => ({
      name: t.name,
      group,
      how: t.how,
      usedIn: [...t.usedIn],
      mark: t.icon ? (
        <BrandMark slug={t.icon} />
      ) : (
        <span className="grid size-full place-items-center rounded-[7px] bg-tone font-display text-[10.5px] font-bold group-aria-pressed:bg-[#33363d]">
          {t.abbr}
        </span>
      ),
    })),
  );

  return (
    <Section
      id="stack"
      heading={stack.heading}
      sub={stack.sub}
      // No transformed wrapper: the phone sheet is position: fixed and must anchor to the viewport.
      revealBody={false}
    >
      <StackExplorer tools={tools} projects={projects} />
    </Section>
  );
}
