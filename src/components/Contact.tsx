import { contact, links, person } from "@/content/site";
import { Reveal } from "./motion";

const footerLinks = [
  { href: links.github, label: "GitHub", external: true },
  { href: links.linkedin, label: "LinkedIn", external: true },
  { href: links.resume, label: "Résumé", external: false },
];

export function Contact() {
  return (
    <footer id="contact" className="border-t border-line pt-[88px] pb-24">
      <div className="wrap">
        <Reveal>
          <p className="mb-3 text-sm font-semibold text-accent-ink">
            {contact.kicker}
          </p>
          <h2 className="mb-6 max-w-[16ch] font-display text-[clamp(2rem,5.5vw,3.2rem)] leading-[1.02] font-bold tracking-[-0.025em]">
            {contact.heading}
          </h2>
          <a
            href={links.email}
            className="font-display text-[clamp(1.1rem,3vw,1.5rem)] break-all text-accent-ink underline decoration-[1.5px] underline-offset-[5px]"
          >
            {person.email}
          </a>
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-[22px] border-t border-line pt-[26px] text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {person.name} · {person.location}
          </p>
          <ul className="flex gap-5">
            {footerLinks.map(({ href, label, external }) => (
              <li key={label}>
                <a
                  href={href}
                  className="transition-colors duration-200 hover:text-ink"
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : { download: true })}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
