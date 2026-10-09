// Shared by the root layout (server) and IntroSting (client).

export const INTRO_DONE_EVENT = "intro:done";

/** Which sting ships to visitors. `?intro=1|2|3` previews any of them. */
export const DEFAULT_STING = 1;

/**
 * Inlined in <head> so the intro covers the page before first paint. Sets
 * `html[data-intro="<version>"]` every time someone opens the site (Kushal's call; it's always
 * skippable), but not on a reload, on back/forward, or when arriving from another page of this
 * site. `?intro=N` always previews a version and also sets `data-intro-preview`.
 */
export const introDecisionScript = `(function(){var d=document.documentElement,m=location.search.match(/[?&]intro=([123])/);if(m){d.dataset.intro=m[1];d.dataset.introPreview="1";return}try{var n=performance.getEntriesByType("navigation")[0],t=n?n.type:"navigate";if(t==="reload"||t==="back_forward")return;if(document.referrer&&new URL(document.referrer).origin===location.origin)return}catch(e){}d.dataset.intro="${DEFAULT_STING}"})()`;

/** True while the intro is (or is about to be) on screen. */
export const introActive = () =>
  typeof document !== "undefined" &&
  Boolean(document.documentElement.dataset.intro);
