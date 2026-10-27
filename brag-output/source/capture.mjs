// Captures the site footage the promo and story videos are cut from.
//   node capture.mjs   → assets/new-*.png (local build on :4173) and assets/old-*.png (live kushal.studio)
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
const OUT = fileURLToPath(new URL("./assets/", import.meta.url));
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });

async function site(prefix, base, shots, mobile) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: "networkidle" });
  await p.reload({ waitUntil: "networkidle" }); // a reload skips the intro sting
  await p.addStyleTag({ content: "html{scroll-behavior:auto!important} *{caret-color:transparent}" });
  await p.waitForTimeout(1500);
  for (const s of shots) {
    if (s.url) { await p.goto(base.replace(/\/$/, "") + s.url, { waitUntil: "networkidle" }); await p.addStyleTag({ content: "html{scroll-behavior:auto!important}" }); await p.waitForTimeout(1200); }
    if (s.sel) await p.evaluate(([sel, f, off]) => { const el = document.querySelector(sel); if (!el) return; const top = el.getBoundingClientRect().top + scrollY; scrollTo(0, top + Math.max(0, el.offsetHeight - innerHeight) * (f ?? 0) - (off ?? 0)); }, [s.sel, s.f, s.off]);
    else if (!s.full) await p.evaluate(() => scrollTo(0, 0));
    if (s.click) { await p.click(s.click).catch(() => {}); }
    await p.waitForTimeout(s.wait ?? 1100);
    await p.screenshot({ path: `${OUT}${prefix}-${s.name}.png`, fullPage: !!s.full });
    console.log(prefix, s.name);
  }
  await ctx.close();
  if (mobile) {
    const m = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true })).newPage();
    await m.goto(base, { waitUntil: "networkidle" }); await m.reload({ waitUntil: "networkidle" }); await m.waitForTimeout(1500);
    await m.screenshot({ path: `${OUT}${prefix}-m-home.png` });
    for (const u of mobile) { await m.goto(base.replace(/\/$/, "") + u, { waitUntil: "networkidle" }); await m.waitForTimeout(1300); await m.screenshot({ path: `${OUT}${prefix}-m-${u.split("/").pop()}.png` }); }
    await m.context().close();
  }
}

const which = process.argv[2] ?? "both";
if (which !== "old") await site("new", "http://localhost:4173/", [
  { name: "hero" },
  { name: "offers", sel: "#build", off: 80 },
  { name: "work", sel: "#work", off: 80 },
  { name: "experience", sel: "#experience", off: 80 },
  { name: "about", sel: "#about", off: 80 },
  { name: "stack", sel: "#stack", off: 80 },
  { name: "stack-open", sel: "#stack", off: 80, click: "#stack button[aria-pressed]" , wait: 1400 },
  { name: "full", full: true },
  { name: "cs-cloth-lab", url: "/work/cloth-lab" },
  { name: "cs-cloth-walk", url: "/work/cloth-lab", sel: "li[data-i]", off: 300, wait: 1500 },
  { name: "cs-cloth-glance", url: "/work/cloth-lab", sel: "#glance", off: 60 },
  { name: "cs-omnia", url: "/work/omnia" },
  { name: "cs-omnia-services", url: "/work/omnia", sel: "#services", off: 60 },
  { name: "cs-omnia-layers", url: "/work/omnia", sel: '[aria-labelledby="layers-heading"]', f: 0.62, wait: 1400 },
  { name: "cs-loudly", url: "/work/loudly" },
  { name: "cs-loudly-pipeline", url: "/work/loudly", sel: '[aria-labelledby="pipeline-heading"]', f: 0.55, wait: 1400 },
  { name: "cs-geofence", url: "/work/geofence" },
  { name: "cs-ting", url: "/work/ting" },
  { name: "cs-ting-glance", url: "/work/ting", sel: "#glance", off: 60 },
], ["/work/omnia", "/work/ting"]);
if (which !== "new") await site("old", "https://kushal.studio/", [
  { name: "hero" },
  { name: "s1", sel: "section:nth-of-type(2)", off: 40 },
  { name: "s2", sel: "section:nth-of-type(3)", off: 40 },
  { name: "s3", sel: "section:nth-of-type(4)", off: 40 },
  { name: "full", full: true },
], []);
await b.close();
