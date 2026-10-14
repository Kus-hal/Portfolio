import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { links, person } from "@/content/site";
import { ButtonLink } from "../ButtonLink";

/** The case-study bar: home, back to all work, the published projects (current marked), contact. */
export function CaseNav({ current }: { current: string }) {
  return (
    <header className="sticky top-3 z-50 mx-auto w-fit max-w-full px-3 sm:top-4 sm:px-4">
      <div className="glass flex items-center gap-1.5 rounded-full py-1.5 pr-1.5 pl-2 sm:gap-3">
        <Link
          href="/"
          aria-label={`${person.initials}, ${person.name}, home`}
          className="grid size-[30px] shrink-0 place-items-center rounded-lg bg-ink font-display text-[13px] font-semibold text-paper"
        >
          {person.initials}
        </Link>
        <Link
          href="/#work"
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[15px] font-medium whitespace-nowrap transition-colors duration-200 hover:bg-ink/5"
        >
          <ArrowLeft aria-hidden="true" size={15} /> All work
        </Link>
        <nav aria-label="Case studies" className="hidden min-[821px]:block">
          <ul className="flex gap-1">
            {caseStudies.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/work/${c.slug}`}
                  aria-current={c.slug === current ? "page" : undefined}
                  className="block rounded-full px-3 py-1.5 text-[15px] whitespace-nowrap text-muted transition-colors duration-200 hover:text-ink aria-[current=page]:bg-ink/[0.07] aria-[current=page]:text-ink"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink href={links.email}>Get in touch</ButtonLink>
      </div>
    </header>
  );
}
