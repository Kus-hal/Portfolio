import create from "@/assets/case-studies/loudly/create.webp";
import home from "@/assets/case-studies/loudly/home.webp";
import join from "@/assets/case-studies/loudly/join.webp";
import room from "@/assets/case-studies/loudly/room.webp";
import type { CaseStudy } from "./types";

// Screens are from the debug build on an emulator until Kushal's real multi-phone screenshots arrive.
// Copy uses only the 🟢 public parts of E:\Loudly\DEEP_DIVE.md, plus the 8 Oct 2026 hardware result.
export const loudly: CaseStudy = {
  slug: "loudly",
  name: "Loudly",
  status: "In development, not on Google Play yet",
  sub: "Turns a room full of phones into one speaker: every phone plays the same song at the same moment, with no internet.",
  seo: {
    title: "Loudly: offline multi-phone audio sync app",
    description:
      "Case study: an Android app that turns a room of phones into one speaker with no internet, built in Kotlin with Nearby Connections, Opus and clock sync.",
    keywords: [
      "Android",
      "audio sync",
      "Nearby Connections",
      "offline app",
      "Kotlin",
      "Jetpack Compose",
    ],
  },
  accent: {
    strong: "#5b5bd6",
    soft: "#e7e6fb",
    mark: "#e4e1ff",
    onStrong: "#f6f5ff",
  },
  meta: [
    { label: "Role", value: "Solo developer" },
    { label: "Platform", value: "Android" },
    { label: "Stack", value: "Kotlin, Jetpack Compose" },
    { label: "Started", value: "April 2026" },
  ],
  heroScreen: room,
  heroAlt:
    "Loudly party room: the host's room code, an everyone-in-sync banner and the playing track",

  problem: {
    heading: "Two problems, one app.",
    users: {
      label: "For the people using it",
      title: [
        { text: "Friends, music, and " },
        { text: "nobody brought a speaker.", mark: true },
      ],
      body: "It started at a jam with friends in college. Nobody had a speaker, but everyone had a phone. Loudly turns those phones into one sound system: one person hosts, everyone else joins with a code, and every phone plays the same song at the same moment.",
    },
    client: {
      label: "Why it's hard",
      title: [
        { text: "Press play on five phones and they " },
        { text: "drift apart in seconds.", mark: true },
      ],
      body: "Every phone has a different processor, scheduler and speaker delay, and ears hear 20 to 30 ms as an echo. Sonos, AirPlay and Chromecast solve this with their own hardware. Loudly does it in software, on ordinary Android phones, with no internet. I'm building it alone.",
    },
  },

  stakes: {
    heading: "What was at stake.",
    items: [
      {
        title: "Ears are unforgiving",
        body: "A gap of 20 to 30 ms between two phones already sounds like an echo.",
      },
      {
        title: "No two phones are alike",
        body: "Different processors, schedulers and speaker delays all pull the timing apart.",
      },
      {
        title: "No internet, no server",
        body: "Discovery, timing and the music itself all have to travel phone to phone.",
      },
      {
        title: "Links change mid-song",
        body: "A connection can drop to Bluetooth or a guest can walk away, and the party has to carry on.",
      },
    ],
  },

  glance: {
    heading: "If you only read one part, read this.",
    items: [
      {
        value: "~11 ms",
        title: "timing error, by the app's own reading",
        body: "Steady on two phones on 8 October 2026, and in sync by ear. A microphone test is still to come.",
        tone: "strong",
        wide: true,
      },
      {
        value: "0",
        title: "internet needed",
        body: "Phones talk directly over Wi-Fi Direct or Bluetooth, picked automatically.",
        tone: "ink",
        tall: true,
      },
      {
        value: "5+",
        title: "phones tested together",
        body: "In one room, playing the same song.",
        tone: "surface",
      },
      {
        value: "15",
        title: "phones per room, the goal",
        body: "One host and up to 14 guests. Scaling to it is the work now.",
        tone: "soft",
      },
    ],
  },

  walkthrough: {
    heading: "From no speaker to one big one.",
    steps: [
      {
        label: "Host",
        title: [
          { text: "Create a room " },
          { text: "in one tap", mark: true },
          { text: "." },
        ],
        body: "One room, one speaker. The host creates a room; everyone else joins it. Rooms you've hosted are kept for next time.",
        screen: home,
        screenAlt:
          "Loudly home: one room, one speaker, with Create Room and Join Room buttons",
        hotspot: { x: 3, y: 89 },
        callout: "Hosting is one tap; joining is a 6-character code.",
        tools: ["Jetpack Compose", "Material 3", "Navigation"],
      },
      {
        label: "Name it",
        title: [
          { text: "Name the room, " },
          { text: "get a code", mark: true },
          { text: "." },
        ],
        body: "Give the room a name friends will recognise. The code is made for you and the room is saved, so the next party starts faster.",
        screen: create,
        screenAlt:
          "Create a room sheet with the name Friday jam and a Create and start hosting button",
        hotspot: { x: 3, y: 53 },
        callout: "A 6-character code is generated automatically.",
        tools: ["Room", "DataStore"],
      },
      {
        label: "Join",
        title: [
          { text: "Join by code, or " },
          { text: "just walk in", mark: true },
          { text: "." },
        ],
        body: "Guests type the code or pick the room from the nearby list. Phones connect to each other directly, with no internet needed.",
        screen: join,
        screenAlt:
          "Join a room screen with six code boxes and a nearby-rooms scanner, no rooms found yet",
        hotspot: { x: 3, y: 23 },
        callout: "Wi-Fi Direct or Bluetooth, chosen automatically.",
        tools: ["Nearby Connections", "Wi-Fi Direct", "Bluetooth"],
      },
      {
        label: "Play",
        title: [
          { text: "Every phone, " },
          { text: "the same moment", mark: true },
          { text: "." },
        ],
        body: "The host picks a song from their library and controls play, pause, seek, volume and track for the whole room. A banner says whether everyone is in sync, and late joiners drop into the song mid-play.",
        screen: room,
        screenAlt:
          "Party room playing a track, with an everyone-in-sync banner and the speakers list",
        hotspot: { x: 3, y: 12 },
        callout: "Live sync status for the room, and for every speaker.",
        tools: ["MediaCodec", "AudioTrack", "Opus"],
      },
    ],
  },

  layers: {
    heading: "One app, taken apart.",
    states: [
      {
        tag: "Layer 1",
        title: "What you tap",
        body: "Jetpack Compose and Material 3, with one ViewModel, state and intent per screen. Screens never touch audio or radios.",
        chips: ["Jetpack Compose", "Material 3", "MVI"],
      },
      {
        tag: "Layer 2",
        title: "What keeps time",
        body: "Pure Kotlin rules in the middle, and one sync engine that is the only place allowed to work out clock offsets.",
        chips: ["SyncEngine", "Audio pipeline", "Use cases", "Hilt", "Flow"],
      },
      {
        tag: "Layer 3",
        title: "What makes the sound",
        body: "Android's own decoders and low-level audio output, with Opus over a peer-to-peer link.",
        chips: ["Nearby Connections", "MediaCodec", "AudioTrack", "Opus"],
      },
    ],
    plates: {
      shared: {
        sub: "domain + data",
        title: "Engines",
        blocks: ["Sync", "Audio", "Rooms", "Peers", "Room DB", "DataStore"],
      },
      backend: {
        sub: "Android",
        title: "Radios and audio",
        blocks: [
          "Nearby",
          "Wi-Fi Direct",
          "Bluetooth",
          "MediaCodec",
          "AudioTrack",
          "Opus",
        ],
      },
    },
  },

  pipeline: {
    heading: "One song, start to finish.",
    note: "Everything happens phone to phone. There is no server anywhere in the loop.",
    token: "Night Drive",
    legend: { customer: "Host", admin: "Loudly", partner: "Guests" },
    stages: [
      {
        label: "Room created",
        who: "The host gets a 6-character code",
        by: "customer",
      },
      {
        label: "Guests join",
        who: "By code or nearby, peer to peer",
        by: "partner",
      },
      {
        label: "Clocks agree",
        who: "Every phone's clock is lined up",
        by: "admin",
      },
      {
        label: "Song streams",
        who: "Sent to every phone as Opus",
        by: "admin",
      },
      {
        label: "Play together",
        who: "Every phone starts at the same instant",
        by: "admin",
      },
      {
        label: "Late joiners",
        who: "Snap into the song mid-play",
        by: "partner",
      },
    ],
  },

  decisions: {
    heading: "Calls I made, and why.",
    items: [
      {
        title: [
          { text: "One place " },
          { text: "owns time", mark: true },
          { text: "." },
        ],
        body: "Only the sync engine works out clock offsets and drift. Screens never touch audio, codecs or radios, so timing bugs have one place to live.",
      },
      {
        title: [
          { text: "Never " },
          { text: "fail silently", mark: true },
          { text: "." },
        ],
        body: "When a guest drops to a slow Bluetooth link, the room says so, the sync targets relax and the stream bitrate falls from 128 to 48 kbps.",
        fact: "128 → 48 kbps on slow links",
      },
      {
        title: [
          { text: "People leave and " },
          { text: "come back", mark: true },
          { text: "." },
        ],
        body: "A guest that loses the host tries three times, four seconds apart. The host keeps a dropped guest's place for 15 seconds, and a returning guest rejoins mid-song.",
      },
      {
        title: [
          { text: "Measured, " },
          { text: "not guessed", mark: true },
          { text: "." },
        ],
        body: "Changes are checked on real phones with the app's own timing readings, and by ear. A microphone recording of the phones playing together is the next check.",
      },
    ],
  },

  results: {
    heading: "Where it stands.",
    body: "Loudly isn't on Google Play yet. On 8 October 2026, on two phones, the app's own timing reading settled at about 11 ms and the music was in sync by ear. A microphone test on two and three phones is next. The screens here are from a test build on an emulator.",
    items: [
      { value: "~11 ms", label: "timing error, app reading on two phones" },
      { value: "0", label: "internet or servers needed" },
      { value: "5+", label: "phones tested together" },
      { value: "15", label: "phones per room, the goal" },
    ],
  },

  pitch: {
    heading: "What I'd build for you.",
    items: [
      {
        who: "If your product lives in real time",
        what: "Audio, timing and live updates where milliseconds matter, measured on real devices.",
      },
      {
        who: "If your app has to work offline",
        what: "Peer-to-peer features that keep going with no internet and no server.",
      },
      {
        who: "If you're hiring for Android",
        what: "Kotlin from Compose screens down to MediaCodec and AudioTrack, with coroutines and Flow throughout.",
      },
      {
        who: "If you have a hard problem",
        what: "Someone who checks on real devices before claiming a result.",
      },
    ],
  },

  whatsNext: {
    heading: "What's next.",
    items: [
      "A microphone test on two and three phones",
      "Release on Google Play",
    ],
  },

  stack: {
    heading: "Built with.",
    items: [
      "Kotlin",
      "Jetpack Compose",
      "Material 3",
      "Hilt",
      "Coroutines and Flow",
      "Nearby Connections",
      "MediaCodec",
      "AudioTrack",
      "Opus",
      "Room",
      "DataStore",
    ],
  },
};
