import { links, person } from "@/content/site";
import { ButtonLink } from "./ButtonLink";
import { NavLinks } from "./NavLinks";

export function Nav() {
  return (
    // A floating liquid-glass pill: the page scrolls behind it and refracts at its edges.
    <header className="sticky top-3 z-50 mx-auto max-w-[1080px] px-3 sm:top-4 sm:px-4">
      <div className="glass flex items-center justify-between gap-5 rounded-full py-1.5 pr-1.5 pl-3 sm:pl-4">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-[17px] font-bold tracking-[-0.01em] whitespace-nowrap"
        >
          <span
            aria-hidden="true"
            className="grid size-[30px] place-items-center rounded-lg bg-ink text-[13px] font-semibold text-paper"
          >
            {person.initials}
          </span>
          {person.name}
        </a>
        <nav aria-label="Sections">
          <NavLinks />
        </nav>
        <ButtonLink href={links.email}>Get in touch</ButtonLink>
      </div>
    </header>
  );
}
