import adminAssign from "@/assets/case-studies/cloth-lab/admin-assign.webp";
import adminBoard from "@/assets/case-studies/cloth-lab/admin-board.webp";
import home from "@/assets/case-studies/cloth-lab/home.webp";
import partnerHome from "@/assets/case-studies/cloth-lab/partner-home.webp";
import pick from "@/assets/case-studies/cloth-lab/pick.webp";
import placed from "@/assets/case-studies/cloth-lab/placed.webp";
import signin from "@/assets/case-studies/cloth-lab/signin.webp";
import slot from "@/assets/case-studies/cloth-lab/slot.webp";
import tracker from "@/assets/case-studies/cloth-lab/tracker.webp";
import type { CaseStudy } from "./types";

// Screens come from Kushal's final UI design (ClothLab for Figma.pdf / Loondry UI Design.pdf) until
// his phone screenshots of the built app replace them. Facts come from his interview and E:\ClothLab.
export const clothLab: CaseStudy = {
  slug: "cloth-lab",
  name: "Cloth Lab",
  status: "In development, startup product",
  sub: "Laundry pickup for Jaipur, on Android, iPhone and the web. I designed it with the founder and I'm building every part of it.",
  accent: {
    strong: "#14432f",
    soft: "#d7e4d7",
    mark: "#fbf3c9",
    onStrong: "#f3f6f2",
  },
  meta: [
    { label: "Role", value: "Product design and engineering" },
    { label: "Platforms", value: "Android, iOS, web, admin web" },
    { label: "Stack", value: "Kotlin Multiplatform, Firebase" },
    { label: "Started", value: "September 2026" },
  ],
  heroScreen: home,
  heroAlt: "Cloth Lab home screen: a 50% off banner and the laundry services",

  problem: {
    heading: "Two problems, one app.",
    users: {
      label: "For the people using it",
      title: [
        { text: "Food, groceries and rides come to you in one tap. " },
        { text: "Laundry still doesn't.", mark: true },
      ],
      body: "I lived it, first in Pune and now in Jaipur. The man who pressed our clothes closed his shop, and we were back to asking around for someone new. A quick-commerce app for laundry, where you book a pickup and your clothes come back clean, was nowhere to be found here.",
    },
    client: {
      label: "For the founder",
      title: [
        { text: "An idea and partner laundries, but " },
        { text: "no product and no team.", mark: true },
      ],
      body: "He needed customers on Android, iPhone and the web, an app for the laundries and an admin panel to run it all, quickly and on a startup budget. With cash on delivery and a launch offer, the money had to be impossible to cheat. That's where I came in: we worked out the product together, I designed every screen, and I'm building all of it.",
    },
  },

  stakes: {
    heading: "What was at stake.",
    items: [
      {
        title: "Premium on a startup budget",
        body: "The app had to feel premium while the costs stayed as low as possible.",
      },
      {
        title: "Three builds would mean three bills",
        body: "Separate Android, iPhone and web apps would triple the time and cost for a team of one.",
      },
      {
        title: "Laundries had to want it",
        body: "If the partner side was hard to use outdoors, with one hand and cash in the other, orders would stall.",
      },
      {
        title: "Trust from day one",
        body: "In a city this size, one wrong bill or lost order spreads by word of mouth. The launch had to be right.",
      },
    ],
  },

  glance: {
    heading: "If you only read one part, read this.",
    items: [
      {
        value: "1 codebase",
        title: "Android, iPhone, web and the admin portal",
        body: "Kotlin Multiplatform shares the screens, rules and models, so a fix lands once.",
        tone: "strong",
        wide: true,
      },
      {
        value: "1 click",
        title: "to change banners, prices or promos",
        body: "The catalogue, prices, promos, service areas and notifications change from the admin portal, with no app update.",
        tone: "ink",
        tall: true,
      },
      {
        value: "40×",
        title: "cheaper sign-in codes",
        body: "One-time codes go over WhatsApp's Cloud API at about ₹0.14, against roughly ₹6 for SMS.",
        tone: "surface",
      },
      {
        value: "47",
        title: "test files",
        body: "Pricing, promos, the order state machine, OTP and settlements are tested.",
        tone: "soft",
      },
    ],
  },

  walkthrough: {
    heading: "Booking a pickup, start to finish.",
    steps: [
      {
        label: "Sign in",
        title: [
          { text: "A " },
          { text: "WhatsApp code", mark: true },
          { text: ", never a password." },
        ],
        body: "The code arrives where people already are and fills itself in on Android. It's stored as a salted hash with an expiry and an attempt limit, checked inside a transaction.",
        screen: signin,
        screenAlt: "Sign-in screen with a mobile number and a Send code button",
        hotspot: { x: 3, y: 70 },
        callout:
          "Codes come over WhatsApp: no password to forget, about 40× cheaper than SMS.",
        tools: ["WhatsApp Cloud API", "Cloud Functions", "Firebase Auth"],
      },
      {
        label: "Home",
        title: [
          { text: "Only areas we " },
          { text: "actually serve", mark: true },
          { text: "." },
        ],
        body: "Location is asked right after sign-in, with a screen that explains why first. Outside the launch area, people join a waiting list instead of hitting a dead end.",
        screen: home,
        screenAlt:
          "Home screen with the delivery area, offer banner and services",
        hotspot: { x: 3, y: 25 },
        callout:
          "A service-area check decides what you can order; the banner and services come from the admin portal.",
        tools: ["Precise location", "Service areas", "Remote config"],
      },
      {
        label: "Pick clothes",
        title: [
          { text: "A " },
          { text: "live estimate", mark: true },
          { text: " while you pick." },
        ],
        body: "Steppers on every item and a running total at the bottom. It's an estimate on purpose: the partner counts with you at pickup and the bill updates there and then.",
        screen: pick,
        screenAlt:
          "Item picker with shirts and trousers added and an estimated total of ₹410",
        hotspot: { x: 3, y: 86 },
        callout:
          "The estimate is honest about being one. The real count is agreed at your door.",
        tools: ["Offline-first catalogue", "Room"],
      },
      {
        label: "Pickup and bill",
        title: [
          { text: "Every rupee is " },
          { text: "priced on the server", mark: true },
          { text: "." },
        ],
        body: "The app sends item ids and counts only. One Firestore transaction checks the price, the slot, the service area and the promo, and takes the order number, so a failed order can never use up a promo.",
        screen: slot,
        screenAlt: "Pickup time slots with cash on delivery and the bill",
        hotspot: { x: 3, y: 74 },
        callout: "Totals come from a Cloud Function, never from the phone.",
        tools: ["Cloud Functions", "Firestore transaction", "Cash on delivery"],
      },
      {
        label: "Order placed",
        title: [
          { text: "Clear about " },
          { text: "what happens next", mark: true },
          { text: "." },
        ],
        body: "The order number, the pickup window and the cash amount, plus one line about what to do. Notifications are only asked for now, after the first order, never at launch.",
        screen: placed,
        screenAlt: "Order placed confirmation with pickup time and cash to pay",
        hotspot: { x: 3, y: 62 },
        callout:
          "Permissions are asked when they're needed: notifications only after the first order.",
        tools: ["Just-in-time permissions", "Cloud Messaging"],
      },
      {
        label: "Track",
        title: [
          { text: "The " },
          { text: "partner moves the order", mark: true },
          { text: ", you watch." },
        ],
        body: "Each tap in the partner app stamps a time and reaches the customer and the admin board. No live GPS, just a clear, timed list and a button to call your partner.",
        screen: tracker,
        screenAlt:
          "Order tracker showing confirmed, collected, washed and ironing stages",
        hotspot: { x: 3, y: 64 },
        callout:
          "Only Cloud Functions can move an order; the app can't skip a step.",
        tools: ["State machine", "Firestore rules", "Push"],
      },
    ],
  },

  layers: {
    heading: "One app, taken apart.",
    states: [
      {
        tag: "Layer 1",
        title: "What you tap",
        body: "Compose Multiplatform draws the same screens on Android, iPhone and the web, in Cloth Lab's own design system.",
        chips: ["Compose Multiplatform", "Design system", "Navigation"],
      },
      {
        tag: "Layer 2",
        title: "What's shared",
        body: "Every feature, view model and rule lives once, in shared Kotlin: data, domain and presentation layers, wired with Koin.",
        chips: [
          "auth",
          "catalogue",
          "cart",
          "checkout",
          "orders",
          "profile",
          "money",
          "connectivity",
        ],
      },
      {
        tag: "Layer 3",
        title: "What owns the rules",
        body: "Firebase Cloud Functions price orders, check promos, move order stages and send the pushes. Deny-all Firestore rules mean nothing else can.",
        chips: [
          "createOrder",
          "confirmPickup",
          "advanceOrderStatus",
          "sendOtp",
          "assignVendor",
          "recordSettlement",
        ],
      },
    ],
    plates: {
      shared: {
        sub: "commonMain",
        title: "Shared Kotlin",
        blocks: ["features", "core", "MVI", "Koin", "Room", "Firebase SDK"],
      },
      backend: {
        sub: "Backend",
        title: "Firebase",
        blocks: [
          "Functions",
          "Firestore",
          "Auth",
          "Messaging",
          "Storage",
          "WhatsApp API",
        ],
      },
    },
  },

  apps: {
    heading: "Three apps for three very different people.",
    items: [
      {
        name: "Customer app",
        body: "Android, iPhone and web from one Compose Multiplatform codebase.",
        screen: home,
        alt: "Customer app home screen",
        kind: "phone",
      },
      {
        name: "Partner app",
        body: "For the laundries: big buttons and plain words, made for one hand outdoors, with cash in the other.",
        screen: partnerHome,
        alt: "Partner app home with clothes to pick up and deliver",
        kind: "phone",
      },
      {
        name: "Admin portal",
        body: "A live board to verify and assign orders, set commission per order and settle cash with partners.",
        screen: adminBoard,
        alt: "Admin live board with order columns from To assign to Done",
        kind: "browser",
      },
    ],
  },

  control: {
    heading: "Change the app without shipping an update.",
    body: "The founder runs Cloth Lab from the admin portal. Almost everything a customer sees comes from data, so a new banner, price or service area is live in one click.",
    screen: adminAssign,
    alt: "Admin order detail with verification checklist and partner assignment",
    powers: [
      {
        title: "Catalogue and prices",
        body: "Services, items, variants, icons and images",
      },
      { title: "Home banners", body: "Images, links, order and on/off" },
      {
        title: "Promo codes",
        body: "Percent or flat, limits, expiry, audiences",
      },
      {
        title: "Service areas",
        body: "Where Cloth Lab delivers, with a waiting list",
      },
      { title: "Checkout rules", body: "Pickup slots and the delivery charge" },
      {
        title: "Orders",
        body: "Assign, edit items, set delays, resolve problems",
      },
      {
        title: "Partners and cash",
        body: "Commission per order and settlements",
      },
      {
        title: "Notifications",
        body: "Scheduled pushes to customers or partners",
      },
    ],
  },

  pipeline: {
    heading: "Eight stages, and only the server can move them.",
    note: "Washing, drying and ironing can be added between Picked up and Ready.",
    token: "CL-2041",
    legend: { customer: "Customer", admin: "Admin", partner: "Partner app" },
    stages: [
      { label: "Placed", who: "By the customer, in the app", by: "customer" },
      {
        label: "Assigned",
        who: "By the admin, after checking the order",
        by: "admin",
      },
      { label: "On the way to pick up", who: "Partner app", by: "partner" },
      {
        label: "Picked up",
        who: "Partner confirms the count with the customer",
        by: "partner",
      },
      { label: "Ready", who: "Partner app, cleaned and packed", by: "partner" },
      { label: "Out for delivery", who: "Partner app", by: "partner" },
      { label: "Delivered", who: "Partner app, at the door", by: "partner" },
      {
        label: "Cash collected",
        who: "Partner taps “Got ₹410 cash”",
        by: "partner",
      },
    ],
  },

  decisions: {
    heading: "Calls I made, and why.",
    items: [
      {
        title: [
          { text: "Order state lives " },
          { text: "on the server only", mark: true },
          { text: "." },
        ],
        body: "A state machine in the Cloud Functions decides every move, and deny-all Firestore rules mean no app can write an order, a user or a settlement directly.",
      },
      {
        title: [
          { text: "Sign-in goes over " },
          { text: "WhatsApp, not SMS", mark: true },
          { text: "." },
        ],
        body: "My own OTP flow on Meta's Cloud API: salted hashes, rate limits and attempt counts, with Android autofill. SMS verification costs about forty times more.",
        fact: "≈ 40× cheaper per sign-in",
      },
      {
        title: [
          { text: "Offline first, and " },
          { text: "permissions only when needed", mark: true },
          { text: "." },
        ],
        body: "The catalogue, orders and addresses sit in Room with a connection banner, so a weak signal never blanks the app. Location is asked after sign-in with a reason, notifications after the first order.",
      },
      {
        title: [
          { text: "New orders " },
          { text: "alert exactly once", mark: true },
          { text: "." },
        ],
        body: "The admin board treats the first snapshot as a baseline and ignores cached ones, so every genuinely new order rings once, and never twice. It's covered by tests.",
      },
    ],
  },

  results: {
    heading: "Where it stands.",
    body: "Cloth Lab hasn't launched yet. The admin portal is already in use while the launch is prepared.",
    items: [
      { value: "4", label: "surfaces: Android, iPhone, web and admin" },
      { value: "9", label: "customer features, from sign-in to reorder" },
      { value: "25+", label: "Cloud Functions and triggers" },
      { value: "47", label: "test files across app, admin and backend" },
    ],
  },

  pitch: {
    heading: "What I'd build for you.",
    items: [
      {
        who: "If you're a founder with an idea",
        what: "The whole product: customer apps, an app for your partners, an admin portal and the backend, designed and built by one person who answers for all of it.",
      },
      {
        who: "If your business still runs offline",
        what: "An app that puts your service in people's pockets and gives you one screen to run the day: orders, partners, cash and offers.",
      },
      {
        who: "If you're hiring for Kotlin Multiplatform",
        what: "Someone building one codebase for Android, iPhone and the web, who knows where to share code and where not to.",
      },
      {
        who: "If you need a freelancer",
        what: "Product thinking, design and engineering in one, with the security and tests a real business needs.",
      },
    ],
  },

  whatsNext: {
    heading: "What's next.",
    items: [
      "Partner app screens on top of the finished partner backend",
      "Launch in the first Jaipur neighbourhoods",
      "The marketing site with a pincode check",
    ],
  },

  stack: {
    heading: "Built with.",
    items: [
      "Kotlin Multiplatform",
      "Compose Multiplatform",
      "Koin",
      "Room",
      "Ktor",
      "Firebase Auth",
      "Firestore",
      "Cloud Functions",
      "TypeScript",
      "WhatsApp Cloud API",
    ],
  },
};
