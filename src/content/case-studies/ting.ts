import active from "@/assets/case-studies/ting/active.webp";
import create from "@/assets/case-studies/ting/create.webp";
import home from "@/assets/case-studies/ting/home.webp";
import run from "@/assets/case-studies/ting/run.webp";
import tour from "@/assets/case-studies/ting/tour.webp";
import { links } from "@/content/site";
import type { CaseStudy } from "./types";

// Screens are from the debug build on an emulator. Facts come from Kushal's interview and E:\Ting.
export const ting: CaseStudy = {
  slug: "ting",
  name: "Ting",
  status: "Live on Google Play",
  sub: "An interval timer that ends with one desk-bell ting instead of an alarm that won't stop, and still fires on time with the phone locked.",
  accent: {
    strong: "#1c2740",
    soft: "#f4ecd6",
    mark: "#f7e8bb",
    onStrong: "#f3e3b5",
  },
  meta: [
    { label: "Role", value: "Design, build and release, solo" },
    { label: "Platform", value: "Android" },
    { label: "Stack", value: "Kotlin, Jetpack Compose" },
    { label: "Shipped", value: "June 2026" },
  ],
  links: [{ label: "Google Play", href: links.ting }],
  heroScreen: run,
  heroAlt:
    "Ting running a 25-minute timer with a five-minute warning, and Pause and Stop buttons",

  problem: {
    heading: "Two problems, one app.",
    users: {
      label: "For the people using it",
      title: [
        { text: "Most timers " },
        { text: "buzz until you find your phone.", mark: true },
      ],
      body: "I wanted what an audition panel has: one ting of a desk bell, and everyone knows time is up. Plus small heads-ups, like five minutes before the end, or a ting every five minutes until twenty. Nothing did just that, so I built it, thinking other people would want it too.",
    },
    client: {
      label: "Why it's hard",
      title: [
        { text: "Android works hard to " },
        { text: "keep apps quiet.", mark: true },
      ],
      body: "Battery saving delays timers, silent mode and Do Not Disturb mute them, and a sound that starts after the buzz feels broken. A timer has to fire on the second, be heard when it should be, and keep going when the app is closed or the phone restarts.",
    },
  },

  stakes: {
    heading: "What was at stake.",
    items: [
      {
        title: "On time, every time",
        body: "Android's battery saving can push ordinary alarms back by minutes.",
      },
      {
        title: "Heard, not missed",
        body: "Silent mode, low volume and Do Not Disturb all stand between a timer and your ears.",
      },
      {
        title: "Ting and buzz together",
        body: "Loading a sound takes longer than starting a vibration, and the gap is easy to notice.",
      },
      {
        title: "It can't just vanish",
        body: "Swiping the app away or restarting the phone mustn't lose a running timer.",
      },
    ],
  },

  glance: {
    heading: "If you only read one part, read this.",
    items: [
      {
        value: "1 ting",
        title: "and time is up",
        body: "A desk-bell sound instead of a ringing that won't stop. With a heads-up set, the end rings twice so you can tell them apart.",
        tone: "strong",
        wide: true,
      },
      {
        value: "Doze-proof",
        title: "exact alarms",
        body: "Scheduled with Android's alarm-clock API, which battery saving never delays.",
        tone: "ink",
        tall: true,
      },
      {
        value: "1 tap",
        title: "to start a timer",
        body: "Quick-start buttons, presets, a home-screen widget and app shortcuts.",
        tone: "surface",
      },
      {
        value: "Live",
        title: "on Google Play",
        body: "Shipped solo, with its first downloads and reviews.",
        tone: "soft",
      },
    ],
  },

  walkthrough: {
    heading: "From a tap to a ting.",
    steps: [
      {
        label: "First run",
        title: [
          { text: "A tour, " },
          { text: "then out of the way", mark: true },
          { text: "." },
        ],
        body: "The first launch walks through creating timers and starting them fast, and can be skipped in one tap.",
        screen: tour,
        screenAlt:
          "Welcome to Ting tour card with Skip and Next over the presets",
        hotspot: { x: 3, y: 10 },
        callout: "A short first-run tour that points at each control.",
        tools: ["Jetpack Compose", "DataStore"],
      },
      {
        label: "Start",
        title: [
          { text: "One tap for " },
          { text: "10, 20 or 30 minutes", mark: true },
          { text: "." },
        ],
        body: "Quick-start buttons sit on top, with presets for deep work, gym intervals and short bursts underneath. Your last timer also shows up as an app shortcut.",
        screen: home,
        screenAlt:
          "Ting home with 10, 20 and 30 minute quick starts and Deep Work, Gym Interval and Micro-Productivity presets",
        hotspot: { x: 3, y: 16 },
        callout: "Quick start, presets, a widget and app shortcuts.",
        tools: ["Material 3", "Room", "App shortcuts"],
      },
      {
        label: "Make one",
        title: [
          { text: "Choose " },
          { text: "how it warns you", mark: true },
          { text: "." },
        ],
        body: "Set the length, repeat it automatically, pick a ting, vibration or silence, and add a heads-up: every few minutes, or a few minutes before the end.",
        screen: create,
        screenAlt:
          "Create timer screen named Audition, 25 minutes, with a Before end warning reminder",
        hotspot: { x: 3, y: 75 },
        callout: "Every N minutes, or N minutes before the end.",
        tools: ["Wheel picker", "Room"],
      },
      {
        label: "Running",
        title: [
          { text: "A heads-up, then " },
          { text: "time's up", mark: true },
          { text: "." },
        ],
        body: "The timer counts down on an exact alarm and warns with one ting five minutes out. The end rings twice, with the buzz at the same moment, so you can tell the two apart.",
        screen: run,
        screenAlt:
          "Running timer at 24 minutes 53 seconds with a 300 second warning badge",
        hotspot: { x: 3, y: 11 },
        callout: "The warning is one ting; the end is two.",
        tools: ["Alarm clock API", "Foreground service"],
      },
      {
        label: "Keep going",
        title: [
          { text: "Leave it, " },
          { text: "it keeps time", mark: true },
          { text: "." },
        ],
        body: "Go back home and the running timer sits on top with Pause and Stop. Close the app or restart the phone and it carries on.",
        screen: active,
        screenAlt:
          "Ting home with the Audition timer active on top, 24 minutes 38 seconds remaining",
        hotspot: { x: 3, y: 22 },
        callout: "Restored by WorkManager after a restart.",
        tools: ["WorkManager", "Glance widget"],
      },
    ],
  },

  layers: {
    heading: "One app, taken apart.",
    states: [
      {
        tag: "Layer 1",
        title: "What you tap",
        body: "Jetpack Compose and Material 3 in a dark theme with a warm gold accent, plus a home-screen widget built with Glance.",
        chips: ["Jetpack Compose", "Material 3", "Glance"],
      },
      {
        tag: "Layer 2",
        title: "What keeps time",
        body: "A foreground service runs the timer, while Room and DataStore remember timers, sessions and settings, wired with Hilt.",
        chips: ["Foreground service", "Room", "DataStore", "Hilt", "Flow"],
      },
      {
        tag: "Layer 3",
        title: "What Android gives",
        body: "The alarm-clock API, WorkManager for restarts, the alarm audio stream, notification channels, and Play's in-app updates.",
        chips: ["AlarmManager", "WorkManager", "Alarm audio", "In-app updates"],
      },
    ],
    plates: {
      shared: {
        sub: "app",
        title: "Timer core",
        blocks: ["Service", "Room", "DataStore", "Hilt", "Use cases", "Flow"],
      },
      backend: {
        sub: "Android",
        title: "System",
        blocks: [
          "Alarm clock",
          "WorkManager",
          "Alarm audio",
          "Notifications",
          "Widget",
          "Updates",
        ],
      },
    },
  },

  pipeline: {
    heading: "One timer, start to finish.",
    note: "Phone restarted halfway? The timer is restored when it boots.",
    token: "Audition",
    legend: { customer: "You", admin: "Ting", partner: "Android" },
    stages: [
      {
        label: "Started",
        who: "Quick start, a preset or the widget",
        by: "customer",
      },
      {
        label: "Scheduled",
        who: "An exact alarm clock is set",
        by: "partner",
      },
      {
        label: "Running",
        who: "A foreground service keeps it alive",
        by: "admin",
      },
      {
        label: "Heads-up",
        who: "One ting, five minutes before the end",
        by: "admin",
      },
      {
        label: "Time's up",
        who: "Two tings and a buzz, together",
        by: "admin",
      },
      {
        label: "Next round",
        who: "Repeating timers restart on their own",
        by: "admin",
      },
    ],
  },

  decisions: {
    heading: "Calls I made, and why.",
    items: [
      {
        title: [
          { text: "The " },
          { text: "alarm-clock API", mark: true },
          { text: ", not a plain alarm." },
        ],
        body: "It's the one kind of alarm battery saving never delays, and it copes with the app being killed far better than an ordinary exact alarm.",
        fact: "Never deferred by Doze",
      },
      {
        title: [
          { text: "Loud " },
          { text: "when it should be", mark: true },
          { text: "." },
        ],
        body: "The ting plays on the alarm stream, on a high-priority channel that can get past Do Not Disturb after a one-time permission. If the bundled sound fails, the system alarm tone steps in.",
      },
      {
        title: [
          { text: "Sound and buzz " },
          { text: "in the same moment", mark: true },
          { text: "." },
        ],
        body: "The ting is loaded before it's needed, so it starts with the vibration instead of trailing behind it.",
      },
      {
        title: [
          { text: "Back after " },
          { text: "a restart", mark: true },
          { text: "." },
        ],
        body: "Each timer stores when it started, and WorkManager restores running timers after the phone boots, so nothing is lost to a reboot.",
      },
    ],
  },

  results: {
    heading: "Where it stands.",
    body: "Ting is live on Google Play with its first downloads and reviews. Crash reporting and in-app updates are built in. The screens here are from a test build on an emulator.",
    items: [
      { value: "Live", label: "on Google Play" },
      { value: "10+", label: "downloads so far" },
      { value: "4", label: "ways to start a timer" },
      { value: "3", label: "alerts: ting, vibration or silent" },
    ],
  },

  pitch: {
    heading: "What I'd build for you.",
    items: [
      {
        who: "If your app has to act on time",
        what: "Alarms, reminders and background work that Android won't quietly delay or kill.",
      },
      {
        who: "If you need a small app shipped",
        what: "From the idea to a live Google Play listing, with updates and crash reporting from day one.",
      },
      {
        who: "If you're hiring for Android",
        what: "Compose, Glance widgets, foreground services, WorkManager and exact alarms.",
      },
      {
        who: "If the details matter",
        what: "The sound, the timing of a vibration and the first-run tour get the same care as the code.",
      },
    ],
  },

  stack: {
    heading: "Built with.",
    items: [
      "Kotlin",
      "Jetpack Compose",
      "Material 3",
      "Glance",
      "Hilt",
      "Room",
      "DataStore",
      "WorkManager",
      "AlarmManager",
      "Firebase Analytics",
      "Crashlytics",
      "Play In-App Updates",
    ],
  },
};
