// Cinematic helpers for promo.html and story.html. Loaded after shared.js (clamp, prog, easeOut, easeInOut).
// Every frame is a pure function of t, so frames can be captured in any order.

// ?r=45 renders the 4:5 cut (1080×1350); anything else is 16:9 (1920×1080).
const PORTRAIT = new URLSearchParams(location.search).get("r") === "45";
const SIZE = PORTRAIT ? { width: 1080, height: 1350 } : { width: 1920, height: 1080 };
document.documentElement.dataset.r = PORTRAIT ? "45" : "169";

const lerp = (a, b, p) => a + (b - a) * p;
const easeIn = (p) => p * p * p;

/** Piecewise value over time: keys = [[t, v], ...], eased in and out between keys. */
function keys(t, ks, ease = easeInOut) {
  if (t <= ks[0][0]) return ks[0][1];
  for (let i = 1; i < ks.length; i++) {
    const [t1, v1] = ks[i];
    if (t <= t1) {
      const [t0, v0] = ks[i - 1];
      return lerp(v0, v1, ease((t - t0) / (t1 - t0)));
    }
  }
  return ks[ks.length - 1][1];
}

/** Splits an element's text into masked words for a staggered reveal. */
function words(el) {
  el.innerHTML = el.textContent
    .trim()
    .split(/\s+/)
    .map((w) => `<span class="w"><span>${w}</span></span>`)
    .join(" ");
  return [...el.querySelectorAll(".w > span")];
}

/** Words rise out of their masks one after another; `out` (optional) sends them up and away. */
function revealWords(spans, t, start, { stagger = 0.06, dur = 0.55, out } = {}) {
  spans.forEach((s, i) => {
    const p = easeOut(prog(t, start + i * stagger, dur));
    let y = (1 - p) * 110;
    let o = p;
    if (out !== undefined) {
      const q = easeIn(prog(t, out + i * 0.03, 0.35));
      y -= q * 110;
      o *= 1 - q;
    }
    s.style.transform = `translateY(${y}%)`;
    s.style.opacity = o;
  });
}

/** Camera on a .cam element: position (in % of stage), scale and 3D rotation. */
function cam(el, { x = 0, y = 0, s = 1, rx = 0, ry = 0, rz = 0, blur = 0, o = 1 } = {}) {
  el.style.transform = `translate(-50%, -50%) perspective(2200px) translate(${x}vw, ${y}vh) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${s})`;
  el.style.filter = blur > 0.05 ? `blur(${blur}px)` : "none";
  el.style.opacity = o;
}

/** A whip: blur that peaks mid-transition, for cuts that should feel like a fast camera move. */
const whip = (t, at, dur = 0.35, peak = 18) => peak * Math.sin(Math.PI * clamp((t - (at - dur / 2)) / dur));

/** Film grain that changes every frame, seeded by time so renders stay deterministic. */
function makeGrain() {
  const c = document.createElement("canvas");
  c.width = c.height = 220;
  const g = c.getContext("2d");
  const img = g.createImageData(220, 220);
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = rnd() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return c.toDataURL();
}
function grainAt(el, t) {
  const f = Math.floor(t * 24);
  el.style.backgroundPosition = `${(f * 73) % 220}px ${(f * 151) % 220}px`;
}

/** Two drifting light leaks; `boost` lifts them during transitions. */
function leaks(a, b, t, boost = 0) {
  a.style.left = `${-30 + 25 * Math.sin(t * 0.35)}%`;
  a.style.top = `${-40 + 20 * Math.cos(t * 0.27)}%`;
  a.style.opacity = 0.55 + boost * 0.45;
  b.style.left = `${40 + 22 * Math.cos(t * 0.31)}%`;
  b.style.top = `${30 + 18 * Math.sin(t * 0.22)}%`;
  b.style.opacity = 0.35 + boost * 0.5;
}

/** Cursor travel with a click: path = [[t, xPct, yPct], ...]; clicks = [t, ...]. */
function pointer(cursor, ripple, t, path, clicks = []) {
  const x = keys(t, path.map(([tt, xx]) => [tt, xx]));
  const y = keys(t, path.map(([tt, , yy]) => [tt, yy]));
  cursor.style.left = x + "%";
  cursor.style.top = y + "%";
  const press = clicks.some((c) => t >= c && t < c + 0.12);
  cursor.style.transform = press ? "scale(0.86)" : "none";
  ripple.style.left = x + "%";
  ripple.style.top = y + "%";
  const last = clicks.filter((c) => t >= c).pop();
  if (last === undefined) return (ripple.style.opacity = 0);
  const p = prog(t, last, 0.5);
  ripple.style.opacity = p < 1 ? 0.8 * (1 - p) : 0;
  ripple.style.transform = `scale(${0.4 + p * 1.4})`;
}

const CURSOR_SVG =
  '<svg viewBox="0 0 24 24"><path d="M4 2l16 9-7 1.6L9.5 20z" fill="#fff" stroke="#17181c" stroke-width="1.4" stroke-linejoin="round"/></svg>';

/** Shows a shot only inside its time window and hands it local time. */
function play(shots, t) {
  for (const s of shots) {
    const on = t >= s.from && t < s.to;
    show(s.el, on);
    if (on) s.run(t);
  }
}
