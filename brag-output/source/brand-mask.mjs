// Precomputes the liquid-metal mask for the KS mark, so visitors never run the (slow) shape
// processing themselves. Usage: node brand-mask.mjs  →  public/brand/ks-liquid-metal.png
//
// Draws the KS badge (rounded square, letters knocked out) in headless Chrome, then runs Paper
// Shaders' own `toProcessedLiquidMetal` on it and saves the processed PNG.

import { readFile, writeFile, mkdir, unlink } from "node:fs/promises";
import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";
import { chromium } from "playwright-core";

const here = dirname(fileURLToPath(import.meta.url));
const project = join(here, "..", "..");
const FILES = {
  "/shaders/": join(project, "node_modules/@paper-design/shaders/dist/"),
  "/font/": join(project, "node_modules/@fontsource/space-grotesk/files/"),
};
const TYPES = {
  ".js": "text/javascript",
  ".woff": "font/woff",
  ".html": "text/html",
};

const PAGE = `<!doctype html><script type="module">
import { toProcessedLiquidMetal } from "/shaders/index.js";
const font = new FontFace("SG", "url(/font/space-grotesk-latin-600-normal.woff)", { weight: "600" });
await font.load();
document.fonts.add(font);
// 512 px is plenty: the mark never renders wider than ~300 px (600 px on 2x screens).
const size = 512, radius = 123;
const c = document.createElement("canvas");
c.width = c.height = size;
const g = c.getContext("2d");
g.fillStyle = "#000";
g.beginPath();
g.roundRect(0, 0, size, size, radius);
g.fill();
// Knock the letters out, so the metal flows around them like an engraved badge.
g.globalCompositeOperation = "destination-out";
g.font = "600 240px SG";
g.textAlign = "center";
g.textBaseline = "middle";
g.fillText("KS", size / 2, size / 2 + 10);
const blob = await new Promise((r) => c.toBlob(r, "image/png"));
const { pngBlob } = await toProcessedLiquidMetal(new File([blob], "ks.png", { type: "image/png" }));
const bytes = new Uint8Array(await pngBlob.arrayBuffer());
let bin = "";
for (const b of bytes) bin += String.fromCharCode(b);
window.result = btoa(bin);
</script>`;

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const page = await browser.newPage();
page.on("pageerror", (e) => console.error("page error:", e.message));
await page.route("http://local/**", async (route) => {
  const path = new URL(route.request().url()).pathname;
  if (path === "/")
    return route.fulfill({ body: PAGE, contentType: "text/html" });
  const prefix = Object.keys(FILES).find((p) => path.startsWith(p));
  if (!prefix) return route.fulfill({ status: 404 });
  const file = join(FILES[prefix], path.slice(prefix.length));
  route.fulfill({
    body: await readFile(file),
    contentType: TYPES[extname(file)] ?? "application/octet-stream",
  });
});
await page.goto("http://local/");
await page.waitForFunction(() => window.result, null, { timeout: 60000 });
const png = Buffer.from(await page.evaluate(() => window.result), "base64");
const out = join(project, "public/brand/ks-liquid-metal.png");
await mkdir(dirname(out), { recursive: true });
const raw = out.replace(/\.png$/, ".raw.png");
await writeFile(raw, png);
// Lossless recompression: the library writes PNGs with light compression.
execFileSync(ffmpeg, [
  "-y",
  "-loglevel",
  "error",
  "-i",
  raw,
  "-compression_level",
  "100",
  out,
]);
await unlink(raw);
console.log(`wrote ${out} (${(await readFile(out)).length} bytes)`);
await browser.close();
