// Shared by the root layout (server) and IntroSting (client).

export const INTRO_STORAGE_KEY = "ks-intro-seen";
export const INTRO_DONE_EVENT = "intro:done";

/** Which sting ships to visitors. `?intro=1|2|3` previews any of them. */
export const DEFAULT_STING = 1;

/**
 * Inlined in <head> so the intro covers the page before first paint. Sets
 * `html[data-intro="<version>"]` on a first visit (for every visitor, by Kushal's call; it's always
 * skippable), or always when previewing with `?intro=N`, which also sets `data-intro-preview`.
 * If storage is unavailable, a normal visit skips the intro rather than replaying it on every load.
 */
export const introDecisionScript = `(function(){var d=document.documentElement,m=location.search.match(/[?&]intro=([123])/);if(m){d.dataset.intro=m[1];d.dataset.introPreview="1";return}try{if(!localStorage.getItem("${INTRO_STORAGE_KEY}")){d.dataset.intro="${DEFAULT_STING}"}}catch(e){}})()`;

/** True while the intro is (or is about to be) on screen. */
export const introActive = () =>
  typeof document !== "undefined" &&
  Boolean(document.documentElement.dataset.intro);
