import { links, person } from "@/content/site";
import { ButtonLink } from "./ButtonLink";
import { NavLinks } from "./NavLinks";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/82 backdrop-blur-md">
      <div className="wrap flex items-center justify-between gap-5 py-3.5">
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
