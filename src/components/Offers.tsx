import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import clothLabPartnerIcon from "@/assets/work/clothlab-partner-icon.png";
import clothLabIcon from "@/assets/work/clothlab-store-icon.png";
import omniaIcon from "@/assets/work/omnia-icon.png";
import tingIcon from "@/assets/work/ting-icon.png";
import { hasCaseStudy } from "@/content/case-studies";
import { offers, playApps, type ProjectId } from "@/content/site";
import { Section } from "./Section";

type Proof = (typeof offers.items)[number]["proof"];

/** "#work-cloth-lab" becomes "/work/cloth-lab" once that case study is published. */
const caseHref = (href: string) => {
  const id = href.replace("#work-", "") as ProjectId;
  return hasCaseStudy(id) ? `/work/${id}` : href;
};

const storeIcons = {
  clothlab: clothLabIcon,
  "clothlab-partner": clothLabPartnerIcon,
  omnia: omniaIcon,
  ting: tingIcon,
} as const;

const panel: Record<
  Proof["kind"],
  { box: string; value: string; label: string }
> = {
  shrink: { box: "bg-tone", value: "text-ink", label: "text-muted" },
  platforms: {
    box: "bg-[#d9e5dc]",
    value: "text-[#14432f]",
    label: "text-[#3d5547]",
  },
  sync: { box: "bg-ink", value: "text-paper", label: "text-[#b9bcc6]" },
  store: { box: "bg-accent", value: "text-white", label: "text-[#dfe3ff]" },
};

/** One small exact picture of the result, drawn in the page's own shapes. */
function ProofArt({ kind }: { kind: Proof["kind"] }) {
  if (kind === "shrink")
    return (
      <div
        aria-hidden="true"
        className="mt-[18px] h-2.5 rounded-full bg-surface"
      >
        {/* 110 of 350 MB: the bar is the new size against the old one. */}
        <div className="h-full w-[31%] rounded-full bg-accent" />
      </div>
    );
  if (kind === "platforms")
    return (
      <div aria-hidden="true" className="mt-4 flex items-end gap-2.5">
        <div className="h-12 w-[26px] rounded-[9px] bg-surface" />
        <div className="h-12 w-[26px] rounded-[11px] bg-surface" />
        <div className="h-12 w-[74px] rounded-md bg-surface" />
      </div>
    );
  if (kind === "sync")
    return (
      <div aria-hidden="true" className="mt-4 flex h-12 items-end gap-[5px]">
        {/* The same beat on every phone; one bar in the accent. */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-full w-[9px] origin-bottom animate-eq rounded-[3px] ${i === 3 ? "bg-[#8fa0ff]" : "bg-paper"}`}
            style={{
              animationDelay: `${(i % 3) * -0.35}s`,
              transform: "scaleY(0.6)",
            }}
          />
        ))}
      </div>
    );
  // The four apps on Google Play, each a link to its listing.
  return (
    <ul className="mt-4 flex flex-wrap gap-2.5">
      {playApps.map((app) => (
        <li key={app.id}>
          <a
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            title={app.name}
            className="block rounded-[13px] transition-transform duration-200 ease-out active:scale-[0.96] pointer-fine:hover:-translate-y-0.5"
          >
            <Image
              src={storeIcons[app.id]}
              alt=""
              width={48}
              height={48}
              className="size-12 rounded-[13px] shadow-[0_0_0_1px_rgb(255_255_255/0.35)]"
            />
            <span className="sr-only">
              {app.name} on Google Play (opens in a new tab)
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Offers() {
  return (
    <Section id="build" heading={offers.heading}>
      <ol className="grid gap-20 lg:pl-[min(16vw,210px)]">
        {offers.items.map(({ title, body, from, proof }) => {
          const tone = panel[proof.kind];
          return (
            <li
              key={title}
              className="grid max-w-[920px] items-start gap-4 md:grid-cols-[minmax(0,400px)_1fr] md:gap-9"
            >
              <div className={`rounded-card p-[22px] ${tone.box}`}>
                <p
                  className={`font-display text-[clamp(2rem,4vw,2.6rem)] leading-none font-semibold tracking-[-0.045em] ${tone.value}`}
                >
                  {proof.value}
                </p>
                <p className={`mt-2 text-sm ${tone.label}`}>{proof.label}</p>
                <ProofArt kind={proof.kind} />
              </div>
              <div>
                <h3 className="font-display text-[1.45rem] leading-[1.2] font-semibold tracking-[-0.02em]">
                  {title}
                </h3>
                <p className="mt-2.5 max-w-[46ch] text-body">{body}</p>
                <Link
                  href={caseHref(from.href)}
                  className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink transition-colors duration-200 hover:text-ink"
                >
                  {from.label}
                  <ArrowRight aria-hidden="true" size={14} />
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
