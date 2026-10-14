import type { StaticImageData } from "next/image";
import type { ProjectId } from "@/content/site";

/** Text runs; `mark` runs get the highlighter swipe in the project's colour. */
export type Marked = readonly { text: string; mark?: boolean }[];

/** One screen of the pinned-phone walkthrough. */
export type WalkStep = {
  label: string;
  title: Marked;
  /** Full-story paragraph; hidden in Skim mode. */
  body: string;
  screen: StaticImageData;
  screenAlt: string;
  /** Where the callout points, as a percentage of the screen. */
  hotspot: { x: number; y: number };
  callout: string;
  tools: readonly string[];
};

export type CaseStudy = {
  slug: ProjectId;
  name: string;
  status: string;
  sub: string;
  /** The project's own colours, used for highlights inside the portfolio's look. */
  accent: { strong: string; soft: string; mark: string; onStrong: string };
  meta: readonly { label: string; value: string }[];
  heroScreen: StaticImageData;
  heroAlt: string;
  problem: {
    heading: string;
    users: { label: string; title: Marked; body: string };
    client: { label: string; title: Marked; body: string };
  };
  stakes: {
    heading: string;
    items: readonly { title: string; body: string }[];
  };
  glance: {
    heading: string;
    items: readonly {
      value: string;
      title: string;
      body: string;
      tone: "strong" | "ink" | "soft" | "surface";
      wide?: boolean;
      tall?: boolean;
    }[];
  };
  walkthrough: { heading: string; steps: readonly WalkStep[] };
  layers?: {
    heading: string;
    states: readonly {
      tag: string;
      title: string;
      body: string;
      chips: readonly string[];
    }[];
    plates: { shared: readonly string[]; backend: readonly string[] };
  };
  apps?: {
    heading: string;
    items: readonly {
      name: string;
      body: string;
      screen: StaticImageData;
      alt: string;
      kind: "phone" | "browser";
    }[];
  };
  control?: {
    heading: string;
    body: string;
    screen: StaticImageData;
    alt: string;
    powers: readonly { title: string; body: string }[];
  };
  pipeline?: {
    heading: string;
    note: string;
    stages: readonly {
      label: string;
      who: string;
      by: "customer" | "admin" | "partner";
    }[];
  };
  decisions: {
    heading: string;
    items: readonly { title: Marked; body: string; fact?: string }[];
  };
  results: {
    heading: string;
    body: string;
    items: readonly { value: string; label: string }[];
  };
  pitch: {
    heading: string;
    items: readonly { who: string; what: string }[];
  };
  /** Drafted for Kushal to keep or drop. */
  whatsNext?: { heading: string; items: readonly string[] };
  stack?: { heading: string; items: readonly string[] };
};
