// Renders promo.html and story.html. Usage:
//   node render2.mjs promo 169            → frames + ../promo-169.mp4 (16:9)
//   node render2.mjs story 45             → frames + ../story-45.mp4 (4:5)
//   node render2.mjs promo 169 --encode   → re-encode from existing frames (e.g. once music is added)
// Music: set MUSIC=<path to an mp3> (and MUSIC_START=<seconds> to start later in the track).
// Without it the video carries only the synthesised sound effects.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ffmpeg from "ffmpeg-static";
import { chromium } from "playwright-core";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const FPS = 30;
const [id, r = "169", flag] = process.argv.slice(2);
const encodeOnly = flag === "--encode";
const name = `${id}-${r}`;
const frames = join(root, "work", name);

const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(pathToFileURL(join(here, `${id}.html`)).href + `?r=${r}`);
await page.evaluate(() => window.ready);
const { width, height, duration, poster } = await page.evaluate(() => window.VIDEO);
const cues = await page.evaluate(() => window.SFX);
await page.setViewportSize({ width, height });
const stage = page.locator("#stage");
const capture = async (t, path) => {
  await page.evaluate((time) => window.renderAt(time), t);
  await stage.screenshot({ path, type: "jpeg", quality: 92 });
};

if (!encodeOnly) {
  rmSync(frames, { recursive: true, force: true });
  mkdirSync(frames, { recursive: true });
  const total = Math.round(duration * FPS);
  for (let f = 0; f < total; f++) {
    await capture(f / FPS, join(frames, `f${String(f).padStart(5, "0")}.jpg`));
    if (f % 90 === 0) process.stdout.write(`\r${name}: ${f}/${total}`);
  }
  console.log(`\r${name}: ${total} frames`, errors.length ? errors : "");
  await capture(poster, join(root, `${name}.jpg`));
}
await browser.close();

// Sound effects from the cue list.
const cueFile = join(frames, "cues.json");
const sfx = join(frames, "sfx.wav");
writeFileSync(cueFile, JSON.stringify(cues));
execFileSync("python", [join(here, "sfx.py"), cueFile, String(duration), sfx], { stdio: "inherit" });

const music = process.env.MUSIC;
const inputs = ["-framerate", String(FPS), "-i", join(frames, "f%05d.jpg"), "-i", sfx];
let filter;
if (music && existsSync(music)) {
  // MUSIC_START skips into the track so its drop lands on the video's key cut.
  inputs.push("-ss", process.env.MUSIC_START ?? "0", "-i", music);
  const fade = (duration - 1.5).toFixed(2);
  filter = `[2:a]atrim=0:${duration},asetpts=N/SR/TB,afade=t=in:st=0:d=0.4,afade=t=out:st=${fade}:d=1.5,volume=0.62[m];[1:a]volume=1.0[s];[m][s]amix=inputs=2:normalize=0,loudnorm=I=-15:TP=-1.5:LRA=11[a]`;
} else {
  filter = `[1:a]loudnorm=I=-18:TP=-1.5:LRA=11[a]`;
}
execFileSync(
  ffmpeg,
  ["-y", "-loglevel", "error", ...inputs, "-filter_complex", filter, "-map", "0:v", "-map", "[a]",
    "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p",
    "-ar", "48000", "-c:a", "aac", "-b:a", "192k", "-t", String(duration), "-movflags", "+faststart",
    join(root, `${name}.mp4`)],
  { stdio: "inherit" },
);
console.log(`${name}: → ../${name}.mp4`, music ? "(with music)" : "(sound effects only)");
