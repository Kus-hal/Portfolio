// Shared by the root layout (server) and IntroOverlay (client).

export const INTRO_STORAGE_KEY = "ks-intro-seen";
export const INTRO_DONE_EVENT = "intro:done";

/**
 * Inlined in <head>: flags a first visit before first paint so the overlay covers the page
 * immediately, for every first-time visitor (Kushal's call: the intro is part of the site for
 * everyone, and it's always skippable). Skipped if storage is unavailable, so it can't replay on
 * every load.
 */
export const introDecisionScript = `try{if(!localStorage.getItem("${INTRO_STORAGE_KEY}")){document.documentElement.dataset.intro="1"}}catch(e){}`;

/** True while the intro is (or is about to be) on screen. */
export const introActive = () =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.intro === "1";
