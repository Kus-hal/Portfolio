import bills from "@/assets/case-studies/omnia/bills.webp";
import brain from "@/assets/case-studies/omnia/brain.webp";
import chat from "@/assets/case-studies/omnia/chat.webp";
import driver from "@/assets/case-studies/omnia/driver.webp";
import drop from "@/assets/case-studies/omnia/drop.webp";
import ev from "@/assets/case-studies/omnia/ev.webp";
import gold from "@/assets/case-studies/omnia/gold.webp";
import home from "@/assets/case-studies/omnia/home.webp";
import login from "@/assets/case-studies/omnia/login.webp";
import merchant from "@/assets/case-studies/omnia/merchant.webp";
import metals from "@/assets/case-studies/omnia/metals.webp";
import palm from "@/assets/case-studies/omnia/palm.webp";
import parcel from "@/assets/case-studies/omnia/parcel.webp";
import pay from "@/assets/case-studies/omnia/pay.webp";
import selfie from "@/assets/case-studies/omnia/selfie.webp";
import subdistributor from "@/assets/case-studies/omnia/subdistributor.webp";
import video from "@/assets/case-studies/omnia/video.webp";
import wallet from "@/assets/case-studies/omnia/wallet.webp";
import type { CaseStudy } from "./types";

// Screens are the team's final Figma designs (file "OMNIIAAAAA"), exported by Kushal. The tour is in
// product voice, as he asked: no "I built". Facts come from his interview and E:\OMNIA_KOTLIN.
export const omnia: CaseStudy = {
  slug: "omnia",
  name: "OMNIA",
  status: "Closed testing on Google Play",
  sub: "A super-app for Guinea: payments, chat, rides, shopping and more in one app, for people and for the businesses that serve them.",
  accent: {
    strong: "#143b4a",
    soft: "#efe3cf",
    mark: "#f3e2c0",
    onStrong: "#f4efe6",
  },
  meta: [
    { label: "Role", value: "Kotlin Developer, SDLC Corp" },
    { label: "Platforms", value: "Android, plus iOS and web" },
    { label: "Stack", value: "Kotlin, Jetpack Compose" },
    { label: "Time on it", value: "1 year" },
  ],
  links: [
    {
      label: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.omniia.superapp",
    },
  ],
  heroScreen: home,
  heroAlt:
    "OMNIA home screen: a KYC prompt, the wallet balance and quick actions",

  problem: {
    heading: "Two problems, one app.",
    users: {
      label: "For the people using it",
      title: [
        { text: "Paying, chatting, travelling and shopping meant " },
        { text: "a different app for each.", mark: true },
      ],
      body: "OMNIA was made for the government of Guinea as one app for daily life: a wallet linked to local banks, chat and calls, rides and parcels, bills, a shop, gold and metals, EV charging, and a way to invest in the company. Businesses run on it too, with their own tools for merchants, distributors and selling points.",
    },
    client: {
      label: "Where I came in",
      title: [
        { text: "Huge scope, little time, and " },
        { text: "code with no architecture.", mark: true },
      ],
      body: "The Android app had grown with API calls, logic and UI in the same files. I joined SDLC Corp as a Kotlin developer to help turn it around while features kept shipping: split it into modules, make it more secure, improve the UI and UX, and bring Claude into the project.",
    },
  },

  stakes: {
    heading: "What was at stake.",
    items: [
      {
        title: "Money and identity",
        body: "A wallet tied to real bank accounts has to know who is paying. KYC had to be strict without losing people at sign-up.",
      },
      {
        title: "Five kinds of user",
        body: "An individual and four business roles each need their own screens and rules, inside one app.",
      },
      {
        title: "A government client",
        body: "Delays and crashes are seen at the very top.",
      },
      {
        title: "A big app on modest phones",
        body: "Download size and stability decide whether people keep an app like this installed.",
      },
    ],
  },

  glance: {
    heading: "If you only read one part, read this.",
    items: [
      {
        value: "5 roles",
        title: "One app, five ways to use it",
        body: "Individuals, merchants, distributors, sub-distributors and selling-point managers each get their own home and navigation.",
        tone: "strong",
        wide: true,
      },
      {
        value: "350 → 110 MB",
        title: "smaller release build",
        body: "A team effort: the release went from over 350 MB to under 110 MB.",
        tone: "ink",
        tall: true,
      },
      {
        value: "~50%",
        title: "fewer crashes",
        body: "A team effort across low-end and current phones.",
        tone: "surface",
      },
      {
        value: "3",
        title: "languages",
        body: "English, French and Chinese throughout the app.",
        tone: "soft",
      },
    ],
  },

  walkthrough: {
    heading: "A day in OMNIA.",
    steps: [
      {
        label: "Sign in",
        title: [
          { text: "Built for Guinea " },
          { text: "from the first screen", mark: true },
          { text: "." },
        ],
        body: "Sign in with a mobile number, with Guinea's +224 ready by default and a PIN for every payment after that. Choosing a role at sign-up decides which app you get.",
        screen: login,
        screenAlt:
          "Login screen asking whether you live in Guinea, with a +224 mobile number field",
        hotspot: { x: 3, y: 50 },
        callout: "The role picked at sign-up decides the navigation you get.",
        tools: ["Jetpack Compose", "Navigation", "Hilt"],
      },
      {
        label: "KYC",
        title: [
          { text: "A face check made to " },
          { text: "tell a photo from a person", mark: true },
          { text: "." },
        ],
        body: "Upload an ID card, passport or licence, then take a selfie with random live challenges: blink, turn your head, smile. Business roles can't enter the app until both steps are done.",
        screen: selfie,
        screenAlt:
          "Selfie verification with the message: your facial recognition matches",
        hotspot: { x: 3, y: 76 },
        callout:
          "Liveness runs on the phone with ML Kit before the selfie is matched to the ID.",
        tools: ["CameraX", "ML Kit face detection"],
      },
      {
        label: "Wallet",
        title: [
          { text: "Add, send, request and withdraw, " },
          { text: "from your bank", mark: true },
          { text: "." },
        ],
        body: "Link a local bank, top up, pay anyone by phone, wallet ID or QR, request money and withdraw to an account, with every transaction filterable.",
        screen: wallet,
        screenAlt:
          "Omniia Money wallet with the balance and add, send, request and withdraw buttons",
        hotspot: { x: 3, y: 31 },
        callout:
          "Card top-ups go through Stripe; balances are in Guinean francs.",
        tools: ["Stripe", "QR scanning", "Paging"],
      },
      {
        label: "Pay",
        title: [
          { text: "Every payment " },
          { text: "says what it's for", mark: true },
          { text: "." },
        ],
        body: "Type the amount, add a note, see the fee before you confirm, then enter your PIN. The receipt shows who was paid and when, with a button to pay again.",
        screen: pay,
        screenAlt:
          "Payment to Anuj Yadav of 10,000,000 GNF with the note: for my children's school fees",
        hotspot: { x: 3, y: 60 },
        callout: "The fee is shown before you pay, never after.",
        tools: ["PIN", "Ktor", "Room"],
      },
      {
        label: "Chat",
        title: [
          { text: "Messages " },
          { text: "encrypted end to end", mark: true },
          { text: "." },
        ],
        body: "One-to-one and group chat with photos, documents, location and contacts, voice and video calls, and money sent inside the conversation. Chats back up to Google Drive.",
        screen: chat,
        screenAlt:
          "Group chat marked end-to-end encrypted, with call history and an attach menu including Pay",
        hotspot: { x: 3, y: 16 },
        callout:
          "Each message gets its own AES-256 key, wrapped with the recipient's RSA key.",
        tools: ["Socket.IO", "mediasoup", "Drive backup"],
      },
      {
        label: "Omniia Brain",
        title: [
          { text: "An assistant that " },
          { text: "does it for you", mark: true },
          { text: "." },
        ],
        body: "Ask by text or voice and Omniia Brain sends money, requests it, withdraws to your account or pays a bill, confirming each step in the conversation.",
        screen: brain,
        screenAlt:
          "Omniia Brain chat sending money: pick from contacts, enter a number or a wallet ID",
        hotspot: { x: 3, y: 34 },
        callout: "Voice in, voice out, and real actions in the wallet.",
        tools: ["Socket.IO", "Speech to text", "Text to speech"],
      },
      {
        label: "Rides",
        title: [
          { text: "Book a ride or " },
          { text: "send a parcel", mark: true },
          { text: "." },
        ],
        body: "Choose a ride, a parcel or a reservation, see the fare, and pay in cash, by QR or from the wallet. Drivers take the trip in their own app.",
        screen: drop,
        screenAlt:
          "Omniia Drop with ride, parcel and reserve options and recent rides",
        hotspot: { x: 3, y: 36 },
        callout: "One booking flow for rides, parcels and reservations.",
        tools: ["Google Maps", "Live location", "Socket.IO"],
      },
    ],
  },

  layers: {
    heading: "One app, taken apart.",
    states: [
      {
        tag: "Layer 1",
        title: "What you tap",
        body: "Jetpack Compose screens in OMNIA's own design system, with a separate navigation graph for each role.",
        chips: ["Jetpack Compose", "Navigation", "Design system"],
      },
      {
        tag: "Layer 2",
        title: "What's in the middle",
        body: "Each service is its own feature with data, domain and presentation layers, wired with Hilt, so the wallet and chat can change without touching each other.",
        chips: [
          "ewallet",
          "chat",
          "call",
          "chatBot",
          "taxi",
          "homeAndShop",
          "crypto",
          "ev_charging",
        ],
      },
      {
        tag: "Layer 3",
        title: "What it talks to",
        body: "REST APIs for the money, sockets for anything live, a media server for calls, and Stripe and Maps for the rest.",
        chips: [
          "REST",
          "Socket.IO",
          "mediasoup",
          "Stripe",
          "Google Maps",
          "FCM",
        ],
      },
    ],
    plates: {
      shared: {
        sub: "features",
        title: "Kotlin modules",
        blocks: ["wallet", "chat", "calls", "taxi", "shop", "KYC"],
      },
      backend: {
        sub: "Backend",
        title: "Servers",
        blocks: ["Wallet API", "Chat", "Calls", "Payments", "Push", "Maps"],
      },
    },
  },

  apps: {
    heading: "One app for people, businesses and drivers.",
    items: [
      {
        name: "For people",
        body: "The wallet, chat, rides, shopping and everything else, on one home screen.",
        screen: home,
        alt: "Customer home screen",
        kind: "phone",
      },
      {
        name: "For businesses",
        body: "Merchants, distributors, sub-distributors and selling points each get their own home, with commission, sales and pending requests.",
        screen: subdistributor,
        alt: "Sub-distributor home with commission earned and the wallet",
        kind: "phone",
      },
      {
        name: "For drivers",
        body: "Omniia Partner: sign up with a licence, ID and vehicle papers, go online, accept trips and collect cash or a QR payment.",
        screen: driver,
        alt: "Driver app: choose ride, parcel or reserve and go online",
        kind: "phone",
      },
    ],
  },

  services: {
    heading: "And the rest of the app.",
    items: [
      {
        title: "Gold and metals",
        body: "Live rates and charts, buy and sell gold at a locked price, track a portfolio, and pay for a ride with it.",
        screen: gold,
      },
      {
        title: "Live metal prices",
        body: "Gold, silver, bauxite, iron, nickel and more, each with its own live chart.",
        screen: metals,
      },
      {
        title: "EV charging",
        body: "Find a station, pick a connector, charge by time or by percentage and pay from the wallet.",
        screen: ev,
      },
      {
        title: "Video calls",
        body: "One-to-one and group calls, voice or video, from any chat.",
        screen: video,
      },
      {
        title: "Parcels",
        body: "Send or receive a package: addresses, type, weight and delivery instructions.",
        screen: parcel,
      },
      {
        title: "Bills",
        body: "Prepaid and postpaid electricity, by tapping or by asking Omniia Brain.",
        screen: bills,
      },
      {
        title: "Shop and merchants",
        body: "The largest feature in the code: a store for customers, and sales and products for merchants.",
        screen: merchant,
      },
      {
        title: "Invest in OMNIA",
        body: "People can invest in the company itself, from the app.",
      },
      {
        title: "Airtime and a virtual card",
        body: "Phone recharge, and a virtual debit card linked to the wallet.",
      },
    ],
  },

  spotlight: {
    heading: "Pay with your palm.",
    body: "OMNIA also runs at the counter. A point-of-sale app pairs with an infrared palm-vein camera: the shop rings up the sale, the customer holds out a hand, and the payment comes from their wallet.",
    image: palm,
    alt: "OMNIA store image, in French: fast, secure palm payments with Omniia Wallet. A customer holds his scanned palm over a reader",
    points: [
      "A USB infrared camera reads the vein pattern under the skin",
      "A liveness check is there to turn away photos and fake hands",
      "One palm is matched against everyone enrolled",
      "The customer approves the payment on their phone",
    ],
  },

  pipeline: {
    heading: "One trip, start to finish.",
    note: "Parcels take the same path, from the pickup address to the door.",
    token: "TRIP-0412",
    legend: { customer: "Rider", partner: "Driver app" },
    stages: [
      {
        label: "Requested",
        who: "By the rider, in Omniia Drop",
        by: "customer",
      },
      { label: "Accepted", who: "The driver taps Accept", by: "partner" },
      {
        label: "On the way",
        who: "Driver app, with chat and call",
        by: "partner",
      },
      {
        label: "Picked up",
        who: "The driver enters the rider's PIN",
        by: "partner",
      },
      { label: "Dropped off", who: "Driver app", by: "partner" },
      { label: "Paid", who: "Cash, QR or wallet", by: "customer" },
    ],
  },

  decisions: {
    heading: "How it holds together.",
    items: [
      {
        title: [
          { text: "Every service is " },
          { text: "its own feature", mark: true },
          { text: "." },
        ],
        body: "Wallet, chat, calls, taxi, shop, KYC and the rest each live in their own folder with data, domain and presentation layers, so one team can work on chat without breaking payments.",
      },
      {
        title: [
          { text: "Chat is " },
          { text: "encrypted end to end", mark: true },
          { text: "." },
        ],
        body: "The RSA key pair is made on the phone and only the public half is shared. Each message is sealed with a fresh AES-256-GCM key, and both people can verify the encryption with a QR code or a 60-digit number.",
        fact: "RSA-2048 + AES-256-GCM",
      },
      {
        title: [
          { text: "Identity starts " },
          { text: "on the device", mark: true },
          { text: "." },
        ],
        body: "ML Kit checks for a live face on the phone, with random challenges, before the selfie is sent to be matched against the ID.",
      },
      {
        title: [
          { text: "Five apps " },
          { text: "in one install", mark: true },
          { text: "." },
        ],
        body: "The role chosen at sign-up picks the navigation graph and the bottom bar, so each business sees only what it needs, and business roles must finish KYC first.",
      },
    ],
  },

  results: {
    heading: "Where it stands.",
    body: "OMNIA is in closed testing on Google Play, with iOS and the web alongside it.",
    items: [
      { value: "10+", label: "services in one app" },
      { value: "5", label: "roles, each with its own app" },
      { value: "350 → 110", label: "MB release build, a team effort" },
      { value: "~50%", label: "fewer crashes, a team effort" },
    ],
  },

  pitch: {
    heading: "What I'd build for you.",
    items: [
      {
        who: "If you need a fintech app",
        what: "Wallets, bank top-ups, PIN-protected payments and KYC with a liveness check.",
      },
      {
        who: "If your app needs real-time",
        what: "Chat, calls and live updates over sockets, encrypted where it matters.",
      },
      {
        who: "If your codebase has grown messy",
        what: "Help splitting it into clean features without stopping the work that keeps shipping.",
      },
      {
        who: "If you're hiring for Android",
        what: "Modern Kotlin, Jetpack Compose and clean architecture, at super-app scale.",
      },
    ],
  },

  stack: {
    heading: "Built with.",
    items: [
      "Kotlin",
      "Jetpack Compose",
      "Hilt",
      "Ktor",
      "Room",
      "Paging",
      "Socket.IO",
      "mediasoup",
      "CameraX",
      "ML Kit",
      "Stripe",
      "Google Maps",
      "Firebase",
      "Media3",
    ],
  },
};
