/**
 * Every word and link on the page lives here. Copy was approved line by line;
 * edit it here rather than in components.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kushal.studio";

export const person = {
  name: "Kushal Sharma",
  initials: "KS",
  title: "Mobile Engineer",
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
  { id: "build", label: "What I build" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
] as const;

export const hero = {
  // No longer shown on the page; the OG image still uses it.
  availability: "Open to Android & Kotlin Multiplatform roles, worldwide",
  // The intro sting's role line.
  role: {
    strong: "Mobile engineer.",
    rest: "Android, Kotlin Multiplatform & Compose.",
  },
  tagline: "I build Android apps people keep using.",
  sub: "Mobile engineer. Kotlin, Jetpack Compose and Kotlin Multiplatform, from the first commit to the store release.",
  proof: [
    { value: "5 apps", label: "Built, shipped or in progress" },
    { value: "1.5+ yrs", label: "Production Kotlin" },
    { value: "350 → 110 MB", label: "OMNIA release, a team effort" },
    { value: "~11 ms", label: "Loudly timing error on two phones" },
  ],
  marquee: "From first commit to store release.",
} as const;

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${person.name}, ${person.title}. ${hero.role.rest}`,
} as const;

// Search-facing copy. "Mobile Engineer" is the headline; "Android Developer" stays as an alternate
// job title because it's the term recruiters search most.
// The description is kept to ~158 characters so Google shows it without truncation.
export const seo = {
  title: `${person.name} | Mobile Engineer · Android & Kotlin Multiplatform`,
  alternateJobTitle: "Android Developer",
} as const;

export const metaDescription =
  "Mobile engineer: Android, Kotlin Multiplatform & Compose. Building Cloth Lab solo; before that a fintech super-app at SDLC Corp. Jaipur · remote or relocation.";

/** Text runs; `strong` runs render bold. */
export type Rich = readonly { text: string; strong?: boolean }[];

export const about: {
  heading: string;
  statement: string;
  statementNote: string;
  cells: {
    label: string;
    value: string;
    tone: "tone" | "surface" | "deep" | "accent";
    span: 2 | 3 | 5 | 7;
  }[];
} = {
  heading: "About.",
  statement:
    "Most of what I build ends up in someone's pocket, so I care how it feels in the hand.",
  statementNote: "And just as much about how it holds up underneath.",
  cells: [
    {
      label: "Now",
      value: "Building Cloth Lab with its founder",
      tone: "tone",
      span: 5,
    },
    { label: "Based in", value: "Jaipur, India", tone: "tone", span: 3 },
    { label: "Works", value: "Remote or relocating", tone: "accent", span: 2 },
    {
      label: "Learning",
      value: "Swift, SwiftUI and Spring Boot, to work across the whole product",
      tone: "surface",
      span: 7,
    },
    {
      label: "Before",
      value: "A year on OMNIA at SDLC Corp",
      tone: "deep",
      span: 5,
    },
  ],
};

/** "What I build", written to whoever is reading: each offer is backed by a real result. */
export const offers = {
  heading: "What I can build for you.",
  items: [
    {
      title: "An Android app that stays fast as it grows.",
      body: "Native Kotlin and Jetpack Compose, split into modules with a clean architecture, profiled on cheap phones before release.",
      from: { label: "From OMNIA", href: "#work-omnia" },
      proof: {
        kind: "shrink",
        value: "350 → 110 MB",
        label: "OMNIA's release build, a team effort I was part of",
      },
    },
    {
      title: "One app for Android, iOS and the web.",
      body: "Kotlin Multiplatform shares the screens, rules and models, so a fix lands once instead of three times.",
      from: { label: "From Cloth Lab", href: "#work-cloth-lab" },
      proof: {
        kind: "platforms",
        value: "1 codebase",
        label: "Android, iOS and web, built by one engineer",
      },
    },
    {
      title: "Real-time features that hold up offline.",
      body: "Clock sync, sockets and media that keep working when the network doesn't.",
      from: { label: "From Loudly", href: "#work-loudly" },
      proof: {
        kind: "sync",
        value: "~11 ms",
        label:
          "Timing error on two phones by the app's reading, with no internet",
      },
    },
    {
      title: "From the idea to the store listing.",
      body: "Widgets, alarms that survive Doze, release builds and the Play Store, handled.",
      from: { label: "From Ting", href: "#work-ting" },
      proof: {
        kind: "store",
        value: "On Google Play",
        label: "Ting, built and shipped solo",
      },
    },
  ],
} as const;

export type ProjectId = "cloth-lab" | "omnia" | "loudly" | "geofence" | "ting";

export type Project = {
  id: ProjectId;
  name: string;
  status: string;
  summary: string;
  tags: readonly string[];
  /** A store or demo link; projects without one say their case study is on the way. */
  href?: string;
  hrefLabel?: string;
};

export const work: { heading: string; projects: Project[] } = {
  heading: "Work.",
  projects: [
    {
      // Client startup product; Kushal shaped the product and design with the founder and builds it solo.
      id: "cloth-lab",
      name: "Cloth Lab",
      status: "In development, startup product",
      summary:
        "Laundry pickup for Jaipur, shaped with its founder: customer app, partner app and admin portal on one Kotlin Multiplatform codebase.",
      tags: [
        "Kotlin Multiplatform",
        "Compose Multiplatform",
        "Firebase",
        "Koin",
      ],
    },
    {
      id: "omnia",
      name: "OMNIA",
      status: "SDLC Corp",
      summary:
        "A fintech super-app for consumers, merchants and distributors: wallet, payments, liveness KYC and gold trading.",
      tags: ["Kotlin", "Compose", "Hilt", "CameraX", "ML Kit"],
    },
    {
      id: "loudly",
      name: "Loudly",
      status: "In development",
      summary:
        "One song, every phone in the room, in sync. An offline engine reading ~11 ms of timing error on two phones, in sync by ear.",
      tags: ["Kotlin", "Nearby Connections", "Opus", "Clock sync"],
    },
    {
      id: "geofence",
      name: "GeoFence",
      status: "Portfolio project",
      summary:
        "A group shares a fenced area and everyone is told the moment someone leaves. A tested state machine keeps GPS drift from crying wolf.",
      tags: ["Kotlin Multiplatform", "Compose", "Firebase", "MapLibre"],
    },
    {
      id: "ting",
      name: "Ting",
      status: "Live on Google Play",
      summary:
        "An offline-first interval timer with a home-screen widget and exact alarms that fire through Doze. Built and shipped solo.",
      tags: ["Kotlin", "Compose", "Glance"],
      href: links.ting,
      hrefLabel: "View on Google Play",
    },
  ],
};

/** One row in the Experience or Education timeline. */
export type TimelineEntry = {
  org: string;
  /** Short outcomes shown on the homepage. */
  highlights?: readonly Rich[];
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
  heading: "Experience.",
  entries: [
    {
      org: "SDLC Corp",
      highlights: [
        [
          { text: "Part of the team that took OMNIA's release build from " },
          { text: "350+ MB to under 110 MB", strong: true },
          { text: "." },
        ],
        [
          { text: "Part of the push that cut the crash rate by " },
          { text: "~50%", strong: true },
          { text: " across low-end and current phones." },
        ],
        [
          { text: "Built the gold and metals trading screens, tested with a " },
          { text: "1,000+ user", strong: true },
          { text: " group." },
        ],
      ],
      role: "Kotlin Developer · Remote",
      when: "1 year",
      context:
        "Built OMNIA, a multi-role fintech super-app for consumers, merchants and distributors: wallet, payments, KYC and precious-metals trading, shipped in English, French and Chinese.",
      bullets: [
        [
          {
            text: "Worked in a modular, Compose-first Clean Architecture (MVI, Hilt) as part of the team that took the release build from ",
          },
          { text: "350+ MB to under 110 MB", strong: true },
          { text: "." },
        ],
        [
          { text: "Part of the push that cut the crash rate by " },
          { text: "~50%", strong: true },
          { text: " across low-end and current devices." },
        ],
        [
          {
            text: "Worked on identity onboarding: role-based KYC gating, the selfie step with active liveness (blink, smile, head turn) on ML Kit and CameraX.",
          },
        ],
        [
          {
            text: "Built the gold and metals trading screens, tested with a ",
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
        "Socket.IO",
        "Paging 3",
        "Ktor",
      ],
    },
    {
      org: "Codeup",
      highlights: [
        [
          { text: "Got a client's sign-up " },
          { text: "under 15 seconds", strong: true },
          { text: "." },
        ],
        [
          { text: "Mentored " },
          { text: "30+ students", strong: true },
          { text: " until several shipped their first apps." },
        ],
      ],
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
  heading: "Where I studied.",
  entries: [
    {
      org: "Rajasthan Institute of Engineering & Technology",
      role: "B.Tech, Computer Science",
      when: "2020 – 2024",
    },
  ],
} as const;

export type StackTool = {
  name: string;
  /** simple-icons slug; tools without a brand mark show their abbreviation. */
  icon?: string;
  abbr?: string;
  usedIn: readonly (ProjectId | "codeup")[];
  how: string;
};

// Which project used what, checked against the five codebases (October 2026).
export const stack: {
  heading: string;
  sub: string;
  groups: { name: string; tools: StackTool[] }[];
} = {
  heading: "Stack.",
  sub: "Pick a tool to see what I used it for, and in which projects.",
  groups: [
    {
      name: "Languages",
      tools: [
        {
          name: "Kotlin",
          icon: "kotlin",
          usedIn: ["cloth-lab", "omnia", "loudly", "ting", "geofence"],
          how: "My main language: every app here, from Compose screens to the clock-sync code in Loudly.",
        },
        {
          name: "Java",
          icon: "openjdk",
          usedIn: ["codeup"],
          how: "Client Android work at Codeup, and the language I taught 30+ students.",
        },
        {
          name: "TypeScript",
          icon: "typescript",
          usedIn: ["cloth-lab"],
          how: "Cloth Lab's Cloud Functions: pricing, promos and the order state machine.",
        },
        {
          name: "Swift",
          icon: "swift",
          usedIn: [],
          how: "Learning it now, with SwiftUI, to work across the whole product.",
        },
      ],
    },
    {
      name: "Mobile and multiplatform",
      tools: [
        {
          name: "Jetpack Compose",
          icon: "jetpackcompose",
          usedIn: ["omnia", "loudly", "ting", "geofence"],
          how: "The UI of OMNIA, Loudly, GeoFence and Ting.",
        },
        {
          name: "Kotlin Multiplatform",
          abbr: "KMP",
          usedIn: ["cloth-lab", "geofence"],
          how: "One shared codebase for Cloth Lab on Android, iOS and the web, and GeoFence's shared engine.",
        },
        {
          name: "Compose Multiplatform",
          abbr: "CMP",
          usedIn: ["cloth-lab"],
          how: "The same Cloth Lab screens drawn on every platform, and its admin portal on the web.",
        },
        {
          name: "Material 3",
          icon: "materialdesign",
          usedIn: ["cloth-lab", "omnia", "ting", "geofence"],
          how: "Theming and components, extended with each app's own tokens.",
        },
        {
          name: "Glance",
          abbr: "Gl",
          usedIn: ["ting"],
          how: "Ting's home-screen widget, with pause, resume and stop.",
        },
        {
          name: "XML Views",
          icon: "android",
          usedIn: ["codeup"],
          how: "Client Android work at Codeup.",
        },
      ],
    },
    {
      name: "Architecture",
      tools: [
        {
          name: "Clean Architecture",
          abbr: "CA",
          usedIn: ["cloth-lab", "omnia", "loudly", "ting", "geofence"],
          how: "Data, domain and UI layers per feature in every app.",
        },
        {
          name: "MVI",
          abbr: "MVI",
          usedIn: ["cloth-lab", "omnia", "loudly", "ting", "geofence"],
          how: "One state per screen, driven by actions, easy to test.",
        },
        {
          name: "Hilt",
          abbr: "H",
          usedIn: ["omnia", "loudly", "ting"],
          how: "Dependency injection in the Android-only apps.",
        },
        {
          name: "Koin",
          abbr: "K",
          usedIn: ["cloth-lab", "geofence"],
          how: "Dependency injection that works in shared Kotlin code.",
        },
      ],
    },
    {
      name: "Async and data",
      tools: [
        {
          name: "Coroutines and Flow",
          abbr: "Co",
          usedIn: ["cloth-lab", "omnia", "loudly", "ting", "geofence"],
          how: "Everything async: network, timers, playback state.",
        },
        {
          name: "Room",
          abbr: "Rm",
          usedIn: ["cloth-lab", "omnia", "loudly", "ting"],
          how: "Offline-first data: Cloth Lab's catalogue and orders, Ting's timers and history.",
        },
        {
          name: "DataStore",
          abbr: "DS",
          usedIn: ["omnia", "loudly", "ting", "geofence"],
          how: "Settings and small state, like Ting's widget.",
        },
        {
          name: "Paging 3",
          abbr: "Pg",
          usedIn: ["omnia"],
          how: "Long transaction lists in OMNIA.",
        },
        {
          name: "WorkManager",
          abbr: "WM",
          usedIn: ["ting"],
          how: "Restoring running timers after a reboot.",
        },
      ],
    },
    {
      name: "Network and real-time",
      tools: [
        {
          name: "Ktor",
          icon: "ktor",
          usedIn: ["cloth-lab", "omnia"],
          how: "The HTTP client in Cloth Lab's shared code and in OMNIA.",
        },
        {
          name: "Socket.IO",
          icon: "socketdotio",
          usedIn: ["omnia"],
          how: "OMNIA's live transaction, call and taxi events.",
        },
        {
          name: "Nearby Connections",
          abbr: "NC",
          usedIn: ["loudly"],
          how: "Loudly finds and links phones over Wi-Fi Direct and Bluetooth, with no internet.",
        },
        {
          name: "Clock sync",
          abbr: "NTP",
          usedIn: ["loudly"],
          how: "Loudly keeps every phone's clock lined up with no internet.",
        },
      ],
    },
    {
      name: "Media and device",
      tools: [
        {
          name: "CameraX",
          abbr: "Cx",
          usedIn: ["omnia"],
          how: "The KYC selfie and document capture in OMNIA.",
        },
        {
          name: "ML Kit",
          icon: "google",
          usedIn: ["omnia"],
          how: "On-device face checks for liveness: blink, smile, head turn.",
        },
        {
          name: "MediaCodec and AudioTrack",
          abbr: "AT",
          usedIn: ["loudly"],
          how: "Loudly decodes Opus and plays through AudioTrack so it can correct drift sample by sample.",
        },
        {
          name: "Exact alarms",
          abbr: "AL",
          usedIn: ["ting"],
          how: "Ting's alarms fire through Doze, even on silent.",
        },
      ],
    },
    {
      name: "Backend and cloud",
      tools: [
        {
          name: "Firebase",
          icon: "firebase",
          usedIn: ["cloth-lab", "ting", "geofence"],
          how: "Auth, Firestore, Cloud Functions and messaging for Cloth Lab. Live positions in GeoFence. Analytics and Crashlytics in Ting.",
        },
        {
          name: "Cloud Functions",
          icon: "googlecloud",
          usedIn: ["cloth-lab"],
          how: "Server-side pricing, promo checks and order stages.",
        },
        {
          name: "Crashlytics",
          icon: "firebase",
          usedIn: ["ting"],
          how: "Crash reporting in Ting.",
        },
      ],
    },
    {
      name: "Build and tooling",
      tools: [
        {
          name: "Gradle",
          icon: "gradle",
          usedIn: ["cloth-lab", "omnia", "loudly", "ting", "geofence"],
          how: "Builds and version catalogs in every app.",
        },
        {
          name: "R8",
          icon: "android",
          usedIn: ["omnia"],
          how: "Release shrinking at OMNIA, part of the team work that took it from 350+ MB to under 110 MB.",
        },
        {
          name: "Git",
          icon: "git",
          usedIn: ["cloth-lab", "omnia", "loudly", "ting", "geofence"],
          how: "Feature branches and reviewable history on every project.",
        },
      ],
    },
  ],
};

export const contact = {
  kicker: "Contact",
  heading: "Let's build something people actually use.",
} as const;
