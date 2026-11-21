// news-image-20261120 entry program (Node 22, standard library only).
// The entry image sits beside this file as entry.png; this program
// copies it into the output directory the runner provides.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const destinationPath = join(outputDir, "entry.png");
copyFileSync(sourcePath, destinationPath);
