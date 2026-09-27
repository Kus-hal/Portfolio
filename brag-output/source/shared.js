// Time helpers. Every frame is a pure function of t (seconds), so capture order never matters.

const clamp = (x, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, x));

/** 0→1 progress of t through [start, start + dur]. */
const prog = (t, start, dur) => clamp((t - start) / dur);

// Strong ease-out for entrances (matches the site's cubic-bezier(0.23, 1, 0.32, 1) feel).
const easeOut = (p) => 1 - Math.pow(1 - p, 4);
const easeInOut = (p) => (p < 0.5 ? 8 * p ** 4 : 1 - Math.pow(-2 * p + 2, 4) / 2);

/** Rise-and-fade entrance used everywhere: `dist` px up, over `dur` seconds. */
function rise(el, t, start, { dur = 0.6, dist = 40, scale = 1 } = {}) {
  const p = easeOut(prog(t, start, dur));
  const s = scale + (1 - scale) * p;
  el.style.opacity = p;
  el.style.transform = `translateY(${(1 - p) * dist}px) scale(${s})`;
}

/** Fade an element out (multiplies on top of whatever opacity it already has). */
function fadeOut(el, t, start, dur = 0.3) {
  const p = prog(t, start, dur);
  if (p > 0) el.style.opacity = String(Number(el.style.opacity || 1) * (1 - p));
}

const show = (el, visible) => (el.style.visibility = visible ? "visible" : "hidden");

/** Resolves once fonts and every <img> have loaded, so no frame is captured half-drawn. */
async function assetsReady() {
  // Load every face up front: hidden text doesn't trigger a font load on its own.
  const faces = ["500", "600", "700"].map((w) => `${w} 40px "Space Grotesk"`);
  faces.push(...["400", "500", "600"].map((w) => `${w} 40px Inter`));
  await Promise.all(faces.map((f) => document.fonts.load(f)));
  await document.fonts.ready;
  await Promise.all(
    [...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))),
  );
}
