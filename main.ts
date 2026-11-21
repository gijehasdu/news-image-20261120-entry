// news-image-20261120 entry program (Node 22, standard library only).
// The entry image sits beside this file as entry.png; this program
// copies it into the output directory the runner provides.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");

// Sanity check before copying: the bundled image must be a whole PNG or
// JPEG within the 1 MiB gate limit, otherwise fail loudly instead of
// writing a file that cannot pass.
const MAX_BYTES = 1_048_576;
const size = statSync(sourcePath).size;
if (size === 0 || size > MAX_BYTES) {
  throw new Error(`entry.png is ${size} bytes, outside the 1..${MAX_BYTES} range`);
}
const head = readFileSync(sourcePath).subarray(0, 3);
const isPng = head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e;
const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
if (!isPng && !isJpeg) {
  throw new Error("entry.png is neither PNG nor JPEG (bad magic bytes)");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const destinationPath = join(outputDir, "entry.png");
copyFileSync(sourcePath, destinationPath);
console.log(`wrote ${destinationPath} (${size} bytes, ${isJpeg ? "JPEG" : "PNG"})`);
