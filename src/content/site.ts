/**
 * Every word and link on the page lives here. Copy was approved line by line —
 * edit it here rather than in components.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const person = {
  name: "Kushal Sharma",
  initials: "KS",
  title: "Android Engineer",
  location: "Jaipur, India",
  locationShort: "Jaipur, IN",
  email: "kushals0209@gmail.com",
} as const;

export const links = {
  email: `mailto:${person.email}`,
  github: "https://github.com/Kus-hal",
  linkedin: "https://www.linkedin.com/in/kushal-0602-sharma",
  resume: "/Kushal_Sharma_Resume.pdf",
  ting: "https://play.google.com/store/apps/details?id=com.binarycoders.ting",
} as const;

export const navItems = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
] as const;

export const hero = {
  availability: "Open to Android & mobile roles — worldwide",
  role: { strong: "Android engineer.", rest: "Kotlin & Jetpack Compose." },
  lede: "I build the apps people keep on their phones: a multi-role fintech super-app, an offline engine that keeps audio in sync across devices, and Ting, live on Google Play. A year and a half of production Kotlin, owning features from first commit to Play Store release. Now looking for products at real scale.",
  tickerStatus: "in production",
} as const;

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${person.name} — ${person.title}. ${hero.role.rest}`,
} as const;

// Search-facing copy: "Android Developer" is the term recruiters search most, alongside "Engineer".
// The description is kept to ~158 characters so Google shows it without truncation.
export const seo = {
  title: `${person.name} — Android Developer · Kotlin & Jetpack Compose`,
  alternateJobTitle: "Android Developer",
} as const;

export const metaDescription =
  "Android developer in Kotlin & Jetpack Compose: fintech super-app, offline audio-sync engine, Ting on Google Play. Jaipur, India · open to remote & relocation.";

/** Text runs; `strong` runs render bold. */
export type Rich = readonly { text: string; strong?: boolean }[];

export const about: {
  kicker: string;
  heading: string;
  paragraphs: Rich[];
  facts: { label: string; value: string }[];
  stats: { value: string; label: string }[];
} = {
  kicker: "About",
  heading: "Android-first, and I follow the work all the way down.",
  paragraphs: [
    [
      {
        text: "I build software people actually carry around. On the surface that's Kotlin and Jetpack Compose; underneath it's clean architecture, real-time data, and whatever the product needs to feel fast.",
      },
    ],
    [
      { text: "Most of the last year went into " },
      { text: "OMNIA", strong: true },
      {
        text: " at SDLC Corp, a fintech super-app where one codebase served consumers, merchants and distributors, each with their own screens and permissions. Alongside it I ship my own things: ",
      },
      { text: "Ting", strong: true },
      { text: ", an interval timer live on Google Play, and " },
      { text: "Loudly", strong: true },
      {
        text: ", an engine that keeps audio in sync across a room full of phones with no internet, which I'm preparing for public release.",
      },
    ],
    [
      {
        text: "I'm looking for my next role, ideally closer to products with a lot of people on the other end of the screen, and I'm open to remote work or relocating for the right one.",
      },
    ],
  ],
  facts: [
    { label: "Status", value: "Open to new roles" },
    { label: "Now", value: "Building Loudly" },
    { label: "Previously", value: "Kotlin Dev, SDLC Corp" },
    { label: "Focus", value: "Android & mobile" },
    { label: "Based in", value: "Jaipur, India" },
    { label: "Open to", value: "Remote · Relocation" },
    { label: "Education", value: "B.Tech CSE, RIET" },
  ],
  stats: [
    { value: "1.5+ yrs", label: "production Kotlin" },
    { value: "350 → 110 MB", label: "release build at OMNIA" },
    { value: "~50%", label: "fewer crashes at OMNIA" },
    { value: "~68 ms", label: "audio drift across devices" },
  ],
};

export const capabilities = {
  kicker: "What I build",
  heading: "A few things I get hired for, and like doing.",
  items: [
    {
      title: "Android in Compose",
      body: "Native Kotlin and Jetpack Compose apps with clean architecture, MVI and multi-module builds, structured to grow well past v1.",
    },
    {
      title: "Real-time & audio",
      body: "Loudly keeps playback within ~68 ms across phones, with no internet, using an NTP-style clock-sync layer over ExoPlayer.",
    },
    {
      title: "Fintech at scale",
      body: "OMNIA's wallet, payments, KYC and trading served consumers, merchants and distributors, each with their own modules and permissions.",
    },
    {
      title: "Shipping my own apps",
      body: "Ting is an interval timer live on Google Play, with a home-screen widget and alarms that survive Doze. Built and maintained solo.",
    },
  ],
} as const;

export type Project = {
  name: string;
  badge: string;
  tone: "accent" | "ink" | "neutral";
  summary: string;
  tags: readonly string[];
  href?: string;
  cta: string;
};

export const work: { kicker: string; heading: string; projects: Project[] } = {
  kicker: "Selected work",
  heading: "Products, not just repositories.",
  projects: [
    {
      name: "Ting",
      badge: "T",
      tone: "accent",
      summary:
        "An offline-first interval timer with a home-screen widget and exact alarms that fire through Doze. Live on Google Play, built solo.",
      tags: ["Kotlin", "Jetpack Compose", "Jetpack Glance", "Play Store"],
      href: links.ting,
      cta: "View on Google Play",
    },
    {
      name: "Loudly",
      badge: "L",
      tone: "ink",
      summary:
        "An offline engine that syncs audio across multiple phones to within ~68 ms, using an NTP-inspired clock-sync layer over ExoPlayer.",
      tags: ["Kotlin", "ExoPlayer", "Real-time", "Audio sync"],
      cta: "Public release soon",
    },
    {
      name: "OMNIA",
      badge: "O",
      tone: "neutral",
      summary:
        "A multi-role fintech super-app built at SDLC Corp: wallet, payments, KYC liveness and gold trading for consumers, merchants and distributors.",
      tags: ["Kotlin", "Compose", "Clean Architecture", "Fintech"],
      cta: "Internal work · SDLC Corp",
    },
  ],
};

/** One row in the Experience or Education timeline. */
export type TimelineEntry = {
  org: string;
  role: string;
  when: string;
  context?: string;
  bullets?: readonly Rich[];
  tags?: readonly string[];
};

export const experience: {
  kicker: string;
  heading: string;
  entries: TimelineEntry[];
} = {
  kicker: "Experience",
  heading: "Where the production hours have gone.",
  entries: [
    {
      org: "SDLC Corp",
      role: "Kotlin Developer · Remote",
      when: "1 year",
      context:
        "Built OMNIA, a multi-role fintech super-app for consumers, merchants and distributors: wallet, payments, KYC and precious-metals trading, shipped in English, French and Chinese.",
      bullets: [
        [
          {
            text: "Rebuilt legacy Activity/Fragment screens into a modular, Compose-first Clean Architecture (MVI, Hilt), shrinking the release build from ",
          },
          { text: "350+ MB to under 110 MB", strong: true },
          { text: "." },
        ],
        [
          { text: "Cut the crash rate by " },
          { text: "~50%", strong: true },
          {
            text: " through profiling and Crashlytics triage across low-end and current devices.",
          },
        ],
        [
          {
            text: "Owned identity onboarding end to end: on-device document-quality checks and active liveness (blink, smile, head-turn) with ML Kit and CameraX.",
          },
        ],
        [
          {
            text: "Shipped the gold-trading surface and a real-time WebSocket wallet, validated with a ",
          },
          { text: "1,000+ user", strong: true },
          { text: " closed-testing cohort." },
        ],
      ],
      tags: [
        "Kotlin",
        "Jetpack Compose",
        "MVI",
        "Hilt",
        "ML Kit",
        "CameraX",
        "WebSocket",
        "Paging 3",
        "Crashlytics",
        "R8",
      ],
    },
    {
      org: "Codeup",
      role: "Android Developer · Jaipur",
      when: "7 months",
      context:
        "Client Android delivery alongside an in-house developer training programme.",
      bullets: [
        [
          {
            text: "Owned end-to-end delivery of a client registration product, getting sign-up under ",
          },
          { text: "15 seconds", strong: true },
          { text: " and reducing abandonment." },
        ],
        [
          { text: "Mentored " },
          { text: "30+ students", strong: true },
          {
            text: " in Java, OOP and DSA, reviewing their code until several shipped their first Android apps.",
          },
        ],
      ],
      tags: ["Android", "Java", "Mentoring"],
    },
  ],
};

export const education = {
  kicker: "Education",
  heading: "The foundation under the production work.",
  entries: [
    {
      org: "Rajasthan Institute of Engineering & Technology",
      role: "B.Tech, Computer Science",
      when: "2020 – 2024",
    },
  ],
} as const;

export const stack = {
  kicker: "Stack",
  heading: "The tools, grouped by what they're for.",
  groups: [
    { name: "Languages", items: ["Kotlin", "Java"] },
    {
      name: "UI",
      items: [
        "Jetpack Compose",
        "XML Views",
        "Material Design",
        "Jetpack Glance",
      ],
    },
    {
      name: "Architecture",
      items: [
        "Clean Architecture",
        "MVI / MVVM",
        "Multi-module",
        "Hilt",
        "Koin",
      ],
    },
    {
      name: "Async & data",
      items: [
        "Coroutines",
        "Flow / StateFlow",
        "Room",
        "DataStore",
        "Paging 3",
        "WorkManager",
      ],
    },
    {
      name: "Network & real-time",
      items: ["Retrofit", "Ktor", "OkHttp", "WebSocket", "Socket.IO"],
    },
    { name: "Media & device", items: ["CameraX", "ML Kit", "ExoPlayer"] },
    {
      name: "Firebase & quality",
      items: [
        "Firebase",
        "FCM",
        "Crashlytics",
        "Sentry",
        "Android Studio Profiler",
      ],
    },
    {
      name: "Build & tooling",
      items: ["Gradle", "R8 / ProGuard", "Git", "GitHub Actions"],
    },
    { name: "Currently exploring", items: ["KMP"] },
  ],
} as const;

export const contact = {
  kicker: "Contact",
  heading: "Let's build something people actually use.",
} as const;
