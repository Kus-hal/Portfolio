import alert from "@/assets/case-studies/geofence/alert.webp";
import create from "@/assets/case-studies/geofence/create.webp";
import inside from "@/assets/case-studies/geofence/inside.webp";
import outside from "@/assets/case-studies/geofence/outside.webp";
import signin from "@/assets/case-studies/geofence/signin.webp";
import simulator from "@/assets/case-studies/geofence/simulator-full.webp";
import type { CaseStudy } from "./types";

// Screens are the README screenshots of an earlier design (E:\GeoFenceTracker\docs\screenshots); the
// MapLibre redesign doesn't render in a headless emulator. Facts come from the README, PRODUCT.md and
// docs/ARCHITECTURE.md, plus Kushal's interview.
export const geofence: CaseStudy = {
  slug: "geofence",
  name: "GeoFence",
  status: "Portfolio project",
  sub: "A group shares a fenced area, and the moment anyone leaves it, everyone else is told, without GPS drift crying wolf.",
  seo: {
    title: "GeoFence: group geofence alerts in Kotlin",
    description:
      "Case study: a Kotlin Multiplatform app that alerts a group when someone leaves a shared area, with a tested engine that filters out GPS drift and MapLibre maps.",
    keywords: [
      "Kotlin Multiplatform",
      "geofencing",
      "Android",
      "MapLibre",
      "Firebase",
      "location app",
    ],
  },
  accent: {
    strong: "#1d5fc4",
    soft: "#e2ecfb",
    mark: "#dce9fc",
    onStrong: "#f2f7ff",
  },
  meta: [
    { label: "Role", value: "Solo developer" },
    { label: "Platform", value: "Android, shared Kotlin core" },
    { label: "Stack", value: "Kotlin Multiplatform, Compose" },
    { label: "Built", value: "August 2026" },
  ],
  heroScreen: outside,
  heroAlt:
    "Weekend Trek group: Alice is outside the fence, shown in red, with the activity feed below",

  problem: {
    heading: "Two problems, one app.",
    users: {
      label: "For the people using it",
      title: [
        { text: "Groups need to know " },
        { text: "when someone wanders off.", mark: true },
      ],
      body: "On a trek, at a festival or on a work site, someone drifts away and nobody notices until it matters. I kept seeing companies and families wanting a simple way to know when someone has left an area. GeoFence does that: create a fence, share a code, and the whole group is told when anyone steps outside.",
    },
    client: {
      label: "Why I built it",
      title: [
        { text: "GPS drifts, and " },
        { text: "naive fences cry wolf.", mark: true },
      ],
      body: "I wanted to try OpenStreetMap and the free alternatives to Google Maps, and to solve the part that's actually hard. Checking whether someone crossed a circle is one line of maths. Deciding they really did is the whole problem: near the edge, GPS wanders tens of metres either way, and a naive check tells your friends you left and came back nine times while you queued for coffee.",
    },
  },

  stakes: {
    heading: "What was at stake.",
    items: [
      {
        title: "False alarms get muted",
        body: "An app that cries wolf trains people to ignore it, and then the real alert is missed too.",
      },
      {
        title: "Signal drops where it matters",
        body: "Treks, festivals and car parks are exactly where the network is weakest.",
      },
      {
        title: "No budget for maps or servers",
        body: "No Maps API key and no paid Firebase plan, so the maps and the logic had to be free.",
      },
      {
        title: "Anyone can run it",
        body: "Clone it and it builds against a demo project, with nothing to sign up for.",
      },
    ],
  },

  glance: {
    heading: "If you only read one part, read this.",
    items: [
      {
        value: "25 m",
        title: "dead band either side of the fence",
        body: "GPS drift inside the band can't flip anyone from inside to outside. That's the demo setting; a release build uses 30 m.",
        tone: "strong",
        wide: true,
      },
      {
        value: "5 s",
        title: "outside before it counts",
        body: "A step out and back, or a fix that jumps and returns, never reaches the group. A release build waits 30 s.",
        tone: "ink",
        tall: true,
      },
      {
        value: "50 m",
        title: "accuracy gate",
        body: "A fix less accurate than this proves nothing, so it's dropped, not guessed at.",
        tone: "surface",
      },
      {
        value: "19",
        title: "tests, in milliseconds",
        body: "The engine is a pure function of its inputs, so a whole walk replays in a unit test.",
        tone: "soft",
      },
    ],
  },

  walkthrough: {
    heading: "From a fence to an alert.",
    steps: [
      {
        label: "Join",
        title: [
          { text: "No account, " },
          { text: "just a name", mark: true },
          { text: "." },
        ],
        body: "Type the name the group will see and you're in. Sign-in is anonymous, and only your name is shared.",
        screen: signin,
        screenAlt:
          "GeoFence Tracker sign-in asking what the group should call you",
        hotspot: { x: 3, y: 63 },
        callout: "Anonymous Firebase sign-in: nothing to remember.",
        tools: ["Firebase Auth"],
      },
      {
        label: "Place a fence",
        title: [
          { text: "Pick a centre and " },
          { text: "a radius", mark: true },
          { text: "." },
        ],
        body: "Name the group, place the fence and slide the radius. If location permission is denied, the screen falls back to a default centre instead of a dead end.",
        screen: create,
        screenAlt:
          "New group screen with a fence on the map and a radius slider at 200 m",
        hotspot: { x: 3, y: 85 },
        callout: "The fence is drawn to scale, so it stays true as you zoom.",
        tools: ["Compose", "Material 3", "Play services location"],
      },
      {
        label: "Share the code",
        title: [
          { text: "A code you can " },
          { text: "read out loud", mark: true },
          { text: "." },
        ],
        body: "Each group gets a six-character join code. Start sharing and you appear on everyone's map with your distance from the centre.",
        screen: inside,
        screenAlt:
          "Weekend Trek group with the join code M9477X, the fence and a Start sharing button",
        hotspot: { x: 3, y: 5 },
        callout: "0/O and 1/I are left out, because people read codes aloud.",
        tools: ["Firestore", "Foreground service"],
      },
      {
        label: "Someone left",
        title: [
          { text: "Out means " },
          { text: "really out", mark: true },
          { text: "." },
        ],
        body: "Alice walks past the band and stays out. Only then does her dot turn red on every phone and the crossing land in the activity feed, with how far out she is.",
        screen: outside,
        screenAlt:
          "Alice shown outside the fence in red, 500 m from the centre",
        hotspot: { x: 3, y: 56 },
        callout:
          "Past the band, for long enough, with an accurate fix: 25 m and 5 s in the demo, 30 m and 30 s in release.",
        tools: ["GeofenceEvaluator", "Firestore"],
      },
      {
        label: "The alert",
        title: [
          { text: "Everyone else " },
          { text: "is told", mark: true },
          { text: "." },
        ],
        body: "Once the crossing is confirmed, the other phones raise a notification. You're never told about yourself, and opening a group doesn't replay its old history as a burst of alerts.",
        screen: alert,
        screenAlt:
          "Notification on a second phone: Alice left Weekend Trek, now 500 m from the centre of the fence",
        hotspot: { x: 3, y: 31 },
        callout: "One alert per real crossing, never a storm.",
        tools: ["Notifications", "Firestore listeners"],
      },
    ],
  },

  layers: {
    heading: "One app, taken apart.",
    states: [
      {
        tag: "Layer 1",
        title: "What you tap",
        body: "Jetpack Compose and Material 3 screens, and a real vector map with no API key. The screens on this page show the earlier, simpler map.",
        chips: ["Jetpack Compose", "Material 3", "MapLibre", "OpenFreeMap"],
      },
      {
        tag: "Layer 2",
        title: "What's shared",
        body: "The geofence engine, the domain and the whole presentation layer live in shared Kotlin with no Android types, wired with Koin.",
        chips: ["GeofenceEvaluator", "Haversine", "MVI", "Koin", "Flow"],
      },
      {
        tag: "Layer 3",
        title: "What it talks to",
        body: "Firebase for sign-in, live positions and crossings, and Play services for location. Alerts travel over live Firestore listeners.",
        chips: ["Firebase Auth", "Firestore", "Location"],
      },
    ],
    plates: {
      shared: {
        sub: "commonMain",
        title: "Shared Kotlin",
        blocks: ["Evaluator", "Haversine", "MVI", "Koin", "Repos", "Models"],
      },
      backend: {
        sub: "Services",
        title: "Firebase + maps",
        blocks: [
          "Auth",
          "Firestore",
          "Listeners",
          "Location",
          "MapLibre",
          "OpenFreeMap",
        ],
      },
    },
  },

  spotlight: {
    heading: "Walk out without leaving your chair.",
    body: "A built-in simulator feeds made-up positions into the same pipeline as real GPS, so anyone can watch a crossing happen, and watch drift do nothing, from a desk.",
    image: simulator,
    alt: "Simulate movement sheet with Walk out and Return presets and +25 m nudges",
    points: [
      "Walk out and Return presets for the whole journey",
      "Small nudges park you inside the band, where nothing should happen",
      "The same dwell and accuracy rules apply to simulated positions",
      "It moves the input, not the result, so the demo can't cheat",
    ],
  },

  pipeline: {
    heading: "One crossing, start to finish.",
    note: "Drift inside the band, or a step back before the wait is over, ends the journey early: nobody is told. Demo settings shown; a release build uses 30 m and 30 s.",
    token: "Alice",
    legend: {
      customer: "Member's phone",
      admin: "The engine",
      partner: "The group",
    },
    stages: [
      {
        label: "Position arrives",
        who: "With its accuracy and time",
        by: "customer",
      },
      {
        label: "Accuracy gate",
        who: "Worse than 50 m is dropped",
        by: "admin",
      },
      { label: "Past the band", who: "25 m beyond the fence", by: "admin" },
      { label: "Dwell", who: "Still outside after 5 seconds", by: "admin" },
      {
        label: "Crossing confirmed",
        who: "Written once to Firestore",
        by: "admin",
      },
      {
        label: "Everyone told",
        who: "A notification on every other phone",
        by: "partner",
      },
    ],
  },

  decisions: {
    heading: "Calls I made, and why.",
    items: [
      {
        title: [
          { text: "The engine runs " },
          { text: "on the phone", mark: true },
          { text: "." },
        ],
        body: "A server could check every position, but losing signal is the normal case on a trek or at a festival. On the device, a crossing is still detected offline, queued and synced later, and each check is one cheap distance calculation.",
        fact: "Works with no signal",
      },
      {
        title: [
          { text: "Not Play services " },
          { text: "geofencing", mark: true },
          { text: "." },
        ],
        body: "Android's built-in geofencing hides its debounce rules, can't be driven by a simulator and leaves nothing to test. Doing it in shared Kotlin makes every rule explicit, tuned and tested.",
      },
      {
        title: [
          { text: "Real maps, " },
          { text: "no key, no bill", mark: true },
          { text: "." },
        ],
        body: "MapLibre with OpenFreeMap vector tiles in light and dark. The fence is drawn as a geodesic shape, not a pixel circle, so it keeps its true size at every zoom.",
      },
      {
        title: [
          { text: "Edge cases are " },
          { text: "handled on purpose", mark: true },
          { text: "." },
        ],
        body: "Joining while already outside never alerts. Your own writes don't echo back as news. A wrong device clock can't hide a real crossing. A broken document is skipped instead of taking the listener down.",
        fact: "17 edge cases written down",
      },
    ],
  },

  results: {
    heading: "Where it stands.",
    body: "A working portfolio project: two phones on real Firebase, a fence, and alerts that only fire for real crossings. The screens here are from an earlier version of the design.",
    items: [
      { value: "19", label: "tests, milliseconds to run" },
      { value: "<100", label: "lines of code in the geofence engine" },
      { value: "17", label: "edge cases handled on purpose" },
      { value: "0", label: "API keys or billing to run it" },
    ],
  },

  pitch: {
    heading: "What I'd build for you.",
    items: [
      {
        who: "If your app depends on location",
        what: "Geofences, tracking and alerts that people trust because they don't cry wolf.",
      },
      {
        who: "If costs matter",
        what: "Real maps with no API key or billing, and logic that runs on the phone instead of a server.",
      },
      {
        who: "If you're hiring for Kotlin Multiplatform",
        what: "Shared domain and presentation, with platform code only where it has to be.",
      },
      {
        who: "If your code will be reviewed",
        what: "Tests that read like the spec, with the trade-offs and the limits written down.",
      },
    ],
  },

  whatsNext: {
    heading: "What's next.",
    items: [
      "Deploy the push-alert Cloud Function, already written, so alerts arrive with the app closed",
      "Ask for background location properly",
      "An iPhone app on the shared Kotlin core",
      "Editable fences",
    ],
  },

  stack: {
    heading: "Built with.",
    items: [
      "Kotlin Multiplatform",
      "Jetpack Compose",
      "Material 3",
      "Koin",
      "Coroutines and Flow",
      "Firebase Auth",
      "Firestore",
      "Play services location",
      "MapLibre",
      "OpenFreeMap",
    ],
  },
};
