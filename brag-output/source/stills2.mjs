// Review stills: node stills2.mjs promo 169 1.2 3 5.5 ...
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const [id, r, ...times] = process.argv.slice(2);
const out = join(here, "..", "work", "stills2"); mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const p = await b.newPage();
const errs = []; p.on("pageerror", (e) => errs.push(String(e))); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.goto(pathToFileURL(join(here, `${id}.html`)).href + `?r=${r}`);
await p.evaluate(() => window.ready);
const { width, height } = await p.evaluate(() => window.VIDEO);
await p.setViewportSize({ width, height });
for (const t of times) { await p.evaluate((x) => window.renderAt(x), Number(t)); await p.locator("#stage").screenshot({ path: join(out, `${id}-${r}-${t}.jpg`), type: "jpeg", quality: 80 }); }
console.log("done", errs);
await b.close();
