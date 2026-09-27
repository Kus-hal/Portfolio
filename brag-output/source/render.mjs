// Renders the compositions to MP4. Usage:
//   node render.mjs --stills [launch|reel]   → review stills in ../work/stills/
//   node render.mjs [launch|reel]            → frames in ../work/<id>/, then ../<out>.mp4 + poster
//   node render.mjs --encode [launch|reel]   → re-encode from existing frames only
//
// Music is not committed (unverified licence). Put the tracks in ../music/ — see README.md.

import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ffmpeg from "ffmpeg-static";
import { chromium } from "playwright-core";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const FPS = 30;

const VIDEOS = {
  launch: {
    html: "launch.html",
    out: "brag",
    music: "happy-beats-business-moves-vol-9-by-ende-dot-app.mp3",
    // One still per scene, plus mid-wipe and mid-transition frames.
    stills: [3.3, 3.62, 7.4, 9.9, 11.8, 13.4, 15.5, 15.95, 19.2],
  },
  reel: {
    html: "reel.html",
    out: "showreel",
    music: "happy-beats-business-moves-vol-11-by-ende-dot-app.mp3",
    stills: [1.1, 2.55, 2.9, 4.2, 6.2, 8.2, 12.0, 13.0, 14.4],
  },
};

const args = process.argv.slice(2);
const stillsOnly = args.includes("--stills");
// Re-encode from existing frames (e.g. after an audio change) without recapturing.
const encodeOnly = args.includes("--encode");
const ids = args.filter((a) => a in VIDEOS);
const chrome =
  process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await chromium.launch({ executablePath: chrome });

for (const id of ids.length ? ids : Object.keys(VIDEOS)) {
  const video = VIDEOS[id];
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(pathToFileURL(join(here, video.html)).href);
  await page.evaluate(() => window.ready);
  const { width, height, duration, poster } = await page.evaluate(() => window.VIDEO);
  await page.setViewportSize({ width, height });
  const stage = page.locator("#stage");

  const capture = async (t, path) => {
    await page.evaluate((time) => window.renderAt(time), t);
    await stage.screenshot({ path, type: "jpeg", quality: 95 });
  };

  if (stillsOnly) {
    const dir = join(root, "work", "stills");
    mkdirSync(dir, { recursive: true });
    for (const t of video.stills) await capture(t, join(dir, `${id}-${t.toFixed(2)}s.jpg`));
    console.log(`${id}: ${video.stills.length} stills → ${dir}`, errors.length ? errors : "");
    await page.close();
    continue;
  }

  const frames = join(root, "work", id);
  if (!encodeOnly) {
    rmSync(frames, { recursive: true, force: true });
    mkdirSync(frames, { recursive: true });
    const total = Math.round(duration * FPS);
    for (let f = 0; f < total; f++) {
      await capture(f / FPS, join(frames, `f${String(f).padStart(5, "0")}.jpg`));
      if (f % 60 === 0) process.stdout.write(`\r${id}: frame ${f}/${total}`);
    }
    console.log(`\r${id}: ${total} frames captured`, errors.length ? errors : "");

    // Poster: the strongest settled frame, also baked in as frame 0 so feeds show it as the thumbnail.
    const posterPath = join(root, `${video.out}.jpg`);
    await capture(poster, posterPath);
    copyFileSync(posterPath, join(frames, "f00000.jpg"));
  } else if (!existsSync(join(frames, "f00000.jpg"))) {
    throw new Error(`No frames for ${id}; run without --encode first.`);
  }
  await page.close();

  const music = join(root, "music", video.music);
  if (!existsSync(music)) throw new Error(`Missing music: ${music}`);
  const fadeOut = (duration - 1.2).toFixed(2);
  execFileSync(
    ffmpeg,
    [
      "-y",
      "-loglevel", "error",
      "-framerate", String(FPS),
      "-i", join(frames, "f%05d.jpg"),
      "-i", music,
      "-filter_complex",
      `[1:a]atrim=0:${duration},asetpts=N/SR/TB,afade=t=in:st=0:d=0.25,afade=t=out:st=${fadeOut}:d=1.2,loudnorm=I=-16:TP=-1.5:LRA=11[a]`,
      "-map", "0:v",
      "-map", "[a]",
      "-c:v", "libx264",
      "-preset", "slow",
      "-crf", "18",
      "-pix_fmt", "yuv420p",
      // loudnorm upsamples internally; social platforms expect 48 kHz.
      "-ar", "48000",
      "-c:a", "aac",
      "-b:a", "192k",
      "-t", String(duration),
      "-movflags", "+faststart",
      join(root, `${video.out}.mp4`),
    ],
    { stdio: "inherit" },
  );
  console.log(`${id}: → ${video.out}.mp4 + ${video.out}.jpg`);
}

await browser.close();
