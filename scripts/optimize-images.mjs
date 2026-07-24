// Converts public/images/*.jpg to WebP (resizing anything wider than 1920px),
// since `images.unoptimized: true` (required for static export) means Next
// can't transcode/resize images at request time, so this has to happen at build.
// Run manually after adding new images: node scripts/optimize-images.mjs

import sharp from 'sharp';
import { readdirSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const imagesDir = path.join(rootDir, 'public', 'images');
const MAX_WIDTH = 1920;
const QUALITY = 80;

const files = readdirSync(imagesDir).filter((f) => f.toLowerCase().endsWith('.jpg'));

for (const file of files) {
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

console.log(`Converted ${files.length} images to WebP.`);
