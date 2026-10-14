// The static export writes dynamic-route prefetch segments as nested folders
// (out/work/cloth-lab/__next.work/$d$slug/__PAGE__.txt), but the client asks for the dotted name
// (__next.work.$d$slug.__PAGE__.txt). Copy each nested file to the dotted name so prefetches
// resolve instead of 404ing. Runs after `next build`; the export itself is untouched.
import { copyFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../out/", import.meta.url));

async function walk(dir) {
  for (const name of await readdir(dir)) {
    const full = join(dir, name);
    if (!(await stat(full)).isDirectory()) continue;
    if (name.startsWith("__next.")) await flatten(dir, full, name);
    else await walk(full);
  }
}

async function flatten(parent, dir, prefix) {
  for (const name of await readdir(dir)) {
    const full = join(dir, name);
    if ((await stat(full)).isDirectory())
      await flatten(parent, full, `${prefix}.${name}`);
    else await copyFile(full, join(parent, `${prefix}.${name}`));
  }
}

await walk(OUT);
