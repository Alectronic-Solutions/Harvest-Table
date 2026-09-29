// Converts public/images/*.jpg to WebP (resizing anything wider than 1920px),
// then writes 640, 828, and 1080px responsive variants (`name-640w.webp`,
// `name-828w.webp`, `name-1080w.webp`) for every WebP. Static export can't
// resize images on request, so lib/imageLoader.ts serves these pre-built
// variants in each <img srcset>.
// Run after adding or replacing images: npm run optimize-images

import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const imagesDir = path.join(rootDir, 'public', 'images');
const MAX_WIDTH = 1920;
const QUALITY = 80;
// Keep in sync with VARIANT_WIDTHS in lib/imageLoader.ts.
const VARIANT_WIDTHS = [640, 828, 1080];
// Hero backgrounds that always sit under a heavy forest overlay: detail is
// invisible there, so they're encoded much smaller to speed up LCP.
const OVERLAY_ONLY = new Set(['hero-poster.webp', 'farm-field.webp']);
const OVERLAY_QUALITY = 55;
const VARIANT_RE = /-\d+w\.webp$/i;

// 1. JPG -> WebP
const jpgs = readdirSync(imagesDir).filter((f) => f.toLowerCase().endsWith('.jpg'));
for (const file of jpgs) {
  const inputPath = path.join(imagesDir, file);
  const outputPath = path.join(imagesDir, file.replace(/\.jpg$/i, '.webp'));

  const image = sharp(inputPath);
  const meta = await image.metadata();

  const pipeline =
    meta.width && meta.width > MAX_WIDTH ? image.resize({ width: MAX_WIDTH }) : image;

  await pipeline.webp({ quality: QUALITY }).toFile(outputPath);
  console.log(`${file} -> ${path.basename(outputPath)}`);

  unlinkSync(inputPath);
}
console.log(`Converted ${jpgs.length} images to WebP.`);

// 2. Responsive variants (regenerated whenever the source is newer)
let written = 0;
const sources = readdirSync(imagesDir).filter((f) => f.endsWith('.webp') && !VARIANT_RE.test(f));
for (const file of sources) {
  const srcPath = path.join(imagesDir, file);
  const srcTime = statSync(srcPath).mtimeMs;
  for (const width of VARIANT_WIDTHS) {
    const outPath = path.join(imagesDir, file.replace(/\.webp$/, `-${width}w.webp`));
    if (existsSync(outPath) && statSync(outPath).mtimeMs >= srcTime) continue;
    await sharp(srcPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: OVERLAY_ONLY.has(file) ? OVERLAY_QUALITY : QUALITY })
      .toFile(outPath);
    written++;
  }
}
console.log(`Wrote ${written} responsive variants for ${sources.length} images.`);
