import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Fragment } from "react";
import portrait from "@/assets/kushal.jpg";
import { hero, links, person } from "@/content/site";
import { ButtonLink } from "./ButtonLink";
import { Entrance, EntranceItem } from "./motion";

// Light to dark down the rail; the last tile carries the accent.
const railTones = [
  "bg-[#e3e6ec] text-ink",
  "bg-[#c9cfda] text-ink",
  "bg-ink text-paper",
  "bg-accent text-white",
];
const railNotes = [
  "text-body",
  "text-body",
  "text-[#b8bcc6]",
  "text-[#dfe3ff]",
];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-24 max-sm:pt-[84px]">
      <Entrance className="mx-auto max-w-[1440px] px-7 max-sm:px-[18px]">
        {/* The name leads: one line from md up, about half the width; two lines on phones.
            The intro sting sets its name the same way, so the hand-off lands exactly. The name is
            the LCP element, so it rises without fading. */}
        <EntranceItem fade={false}>
          <h1
            id="hero-heading"
            className="font-display text-[15vw] leading-[0.86] font-bold tracking-[-0.05em] md:text-[min(calc((100vw-56px)/13),110px)] md:whitespace-nowrap"
          >
            {person.name.split(" ").map((part, i) => (
              <Fragment key={part}>
                {i > 0 && " "}
                <span className="block md:inline-block">{part}</span>
              </Fragment>
            ))}
          </h1>
        </EntranceItem>

        <div className="mt-6 grid grid-cols-2 gap-2 md:min-h-[clamp(380px,50vh,500px)] md:grid-cols-12 md:gap-2.5">
          <EntranceItem className="relative col-span-1 min-h-[260px] overflow-hidden rounded-card md:col-span-3 md:min-h-0">
            <Image
              src={portrait}
              alt={`Portrait of ${person.name}`}
              loading="eager"
              className="absolute inset-0 size-full object-cover object-[50%_20%]"
            />
          </EntranceItem>

          <EntranceItem className="order-first col-span-2 flex flex-col justify-between gap-7 rounded-card bg-surface p-6 md:order-none md:col-span-6 md:p-[30px]">
            <div>
              <p className="max-w-[16ch] font-display text-[clamp(1.9rem,3.3vw,3rem)] leading-[1.04] font-semibold tracking-[-0.035em]">
                {hero.tagline}
              </p>
              <p className="mt-4 max-w-[44ch] text-body">{hero.sub}</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <ButtonLink href={links.email}>
                Get in touch <ArrowUpRight aria-hidden="true" size={16} />
              </ButtonLink>
              <ButtonLink href="#work" variant="soft">
                See the work
              </ButtonLink>
            </div>
          </EntranceItem>

          <EntranceItem className="col-span-1 md:col-span-3">
            <ul className="grid h-full gap-2 md:grid-rows-4 md:gap-2.5">
              {hero.proof.map(({ value, label }, i) => (
                <li
                  key={label}
                  className={`flex flex-col justify-center rounded-card px-[18px] py-4 ${railTones[i]}`}
                >
                  <span className="font-display text-[clamp(1.2rem,1.9vw,1.55rem)] leading-none font-semibold tracking-[-0.03em]">
                    {value}
                  </span>
                  <span className={`mt-1.5 text-sm ${railNotes[i]}`}>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </EntranceItem>
        </div>
      </Entrance>
    </section>
  );
}
