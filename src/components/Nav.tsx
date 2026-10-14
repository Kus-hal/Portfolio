import { links, person } from "@/content/site";
import { ButtonLink } from "./ButtonLink";
import { NavLinks } from "./NavLinks";

export function Nav() {
  return (
    // A floating liquid-glass pill: the page scrolls behind it and refracts at its edges.
    <header className="sticky top-3 z-50 mx-auto w-fit max-w-full px-3 sm:top-4 sm:px-4">
      <div className="glass flex items-center justify-between gap-5 rounded-full py-1.5 pr-1.5 pl-3 sm:pl-4">
        {/* The hero already sets the name huge, so the bar carries only the mark. */}
        <a
          href="#top"
          aria-label={`${person.initials}, ${person.name}, back to top`}
          className="grid size-[30px] shrink-0 place-items-center rounded-lg bg-ink font-display text-[13px] font-semibold text-paper"
        >
          {person.initials}
        </a>
        <nav aria-label="Sections">
          <NavLinks />
        </nav>
        <ButtonLink href={links.email}>Get in touch</ButtonLink>
      </div>
    </header>
  );
}
