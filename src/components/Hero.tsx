import Image from "next/image";
import portrait from "@/assets/kushal.jpg";
import { hero, links, person } from "@/content/site";
import { ButtonLink } from "./ButtonLink";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { Entrance, EntranceItem } from "./motion";
import { SessionTimer } from "./SessionTimer";

const socials = [
  { href: links.github, label: "GitHub", Icon: GitHubIcon },
  { href: links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: links.email, label: "Email", Icon: MailIcon },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-[104px] pb-20 max-sm:pt-16"
    >
      {/* One photo per layout, switched by CSS: beside the name below `lg`, its own column from `lg` up.
          Both use the same file, so the browser downloads it once; the hidden copy is display:none. */}
      <Entrance className="wrap lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-16">
        <div>
          <EntranceItem>
            <p className="mb-[30px] inline-flex items-center gap-[9px] rounded-full border border-line bg-surface px-[13px] py-1.5 text-[13.5px] text-muted">
              <span
                aria-hidden="true"
                className="relative size-2 rounded-full bg-tick"
              >
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-tick" />
              </span>
              {hero.availability}
            </p>
          </EntranceItem>

          <EntranceItem
            fade={false}
            className="mb-[22px] flex items-center gap-4 sm:gap-6"
          >
            {/* Phones and tablets: a round avatar beside the name, sharp at these sizes on 2× screens. */}
            <Image
              src={portrait}
              alt={`Portrait of ${person.name}`}
              loading="eager"
              className="size-20 shrink-0 rounded-full border border-line object-cover object-top sm:size-28 lg:hidden"
            />
            <h1
              id="hero-heading"
              className="font-display text-[clamp(3rem,8vw,5.4rem)] leading-[0.98] font-bold tracking-[-0.03em]"
            >
              {person.name.split(" ").map((part, i) => (
                <span key={part} className="block">
                  {i > 0 && " "}
                  {part}
                </span>
              ))}
            </h1>
          </EntranceItem>

          <EntranceItem>
            <p className="mb-[26px] font-display text-[clamp(1.15rem,2.6vw,1.55rem)] font-medium text-muted">
              <strong className="font-semibold text-ink">
                {hero.role.strong}
              </strong>{" "}
              {hero.role.rest}
            </p>
          </EntranceItem>

          {/* The name and lede are the LCP candidates (desktop / mobile), so they rise without fading. */}
          <EntranceItem fade={false}>
            <p className="mb-[34px] max-w-[60ch] text-[1.12rem] text-body">
              {hero.lede}
            </p>
          </EntranceItem>

          <EntranceItem className="mb-10 flex flex-wrap items-center gap-3">
            <ButtonLink href={links.resume} download>
              Download résumé
            </ButtonLink>
            <ButtonLink href="#work" variant="ghost">
              See the work
            </ButtonLink>
            <ul className="flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    title={label}
                    {...(href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="grid size-10 place-items-center rounded-[10px] border border-line bg-surface text-muted transition-[color,border-color,transform] duration-200 ease-out hover:border-ink hover:text-ink active:scale-[0.97] pointer-fine:hover:-translate-y-0.5"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </EntranceItem>

          <EntranceItem>
            <p className="flex max-w-[60ch] flex-wrap items-center gap-x-3.5 gap-y-1 border-t border-line pt-[22px] font-mono text-sm text-muted">
              <span className="inline-flex items-center gap-2 text-ink">
                <span
                  aria-hidden="true"
                  className="inline-flex h-4 items-end gap-[3px]"
                >
                  {/* Resting heights show when the loop is off (reduced motion). */}
                  {[0.45, 1, 0.65, 0.8].map((rest, i) => (
                    <span
                      key={i}
                      className="h-4 w-[3px] origin-bottom animate-eq rounded-sm bg-accent"
                      style={{
                        transform: `scaleY(${rest})`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </span>
                {hero.tickerStatus}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                session <SessionTimer />
              </span>
              <span aria-hidden="true">·</span>
              <span>{person.locationShort}</span>
            </p>
          </EntranceItem>
        </div>

        {/* Desktop: the portrait gets its own column. The 327 px source is sharp at 240 px on 1× screens. */}
        <EntranceItem fade={false} className="hidden lg:block">
          <Image
            src={portrait}
            alt={`Portrait of ${person.name}`}
            loading="eager"
            className="w-60 rounded-[24px] border border-line"
          />
        </EntranceItem>
      </Entrance>
    </section>
  );
}
