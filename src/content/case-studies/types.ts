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

type Plate = { sub: string; title: string; blocks: readonly string[] };
type PipelineBy = "customer" | "admin" | "partner";

export type CaseStudy = {
  slug: ProjectId;
  name: string;
  status: string;
  sub: string;
  /** What search results show: a title under ~45 characters (the site name is added) and a
   *  ~150-character description that says what the app is and what it's built with. */
  seo: { title: string; description: string; keywords: readonly string[] };
  /** The project's own colours, used for highlights inside the portfolio's look. */
  accent: { strong: string; soft: string; mark: string; onStrong: string };
  meta: readonly { label: string; value: string }[];
  /** Store or live links shown under the hero. */
  links?: readonly { label: string; href: string; soft?: boolean }[];
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
    /** The two lower plates of the 3D stack: the middle layer and what it talks to. */
    plates: { shared: Plate; backend: Plate };
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
    /** The label on the token that travels the stages. */
    token: string;
    /** What each kind of stage owner is called on this project. */
    legend: Partial<Record<PipelineBy, string>>;
    stages: readonly {
      label: string;
      who: string;
      by: PipelineBy;
    }[];
  };
  /** A grid of the rest of the product: one line each, some with a small screen. */
  services?: {
    heading: string;
    items: readonly {
      title: string;
      body: string;
      /** Shown cropped and decorative, so no alt text. */
      screen?: StaticImageData;
    }[];
  };
  /** One feature shown large with a single image. */
  spotlight?: {
    heading: string;
    body: string;
    image: StaticImageData;
    alt: string;
    points: readonly string[];
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
