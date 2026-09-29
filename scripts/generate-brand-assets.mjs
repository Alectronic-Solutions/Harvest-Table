// Generates raster brand assets (PWA icons + OG social preview image) from the
// existing SVG logo mark and site photography, so they can't drift from the brand.
// Run manually: node scripts/generate-brand-assets.mjs

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const publicDir = path.join(rootDir, 'public');
const logoSvg = readFileSync(path.join(publicDir, 'logo.svg'));

// Matches NEXT_PUBLIC_BASE_PATH in .github/workflows/nextjs.yml. The manifest
// is a plain static file (not the app/manifest.ts route convention) because
// Next.js does not apply basePath to that convention's auto-injected <link>
// under `output: 'export'`, which 404s on GitHub Pages. Regenerate this file
// if the deployed basePath ever changes.
const BASE_PATH = '/Harvest-Table';

async function generateIcons() {
  for (const size of [192, 512]) {
    await sharp(logoSvg)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, `icon-${size}.png`));
    console.log(`Wrote icon-${size}.png`);
  }
}

// Social preview: the dining room photo, darkened toward the left, with the
// logo, name, and tagline set over it. Written as JPEG to keep it small.
async function generateOgImage() {
  const width = 1200;
  const height = 630;
  const logoSize = 120;

  const photo = await sharp(path.join(publicDir, 'images', 'space-wide.webp'))
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .toBuffer();

  const overlaySvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#2C3B2D" stop-opacity="0.96"/>
          <stop offset="0.45" stop-color="#2C3B2D" stop-opacity="0.82"/>
          <stop offset="1" stop-color="#2C3B2D" stop-opacity="0.15"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#fade)"/>
      <rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="#D4A843" stroke-opacity="0.45" stroke-width="1.5"/>
      <text x="80" y="330" font-family="Georgia, 'Cormorant Garamond', serif" font-size="76" font-weight="600" fill="#F0EBE1" letter-spacing="2">Harvest Table</text>
      <text x="82" y="382" font-family="Consolas, 'DM Mono', monospace" font-size="22" fill="#D4A843" letter-spacing="5">FARM-TO-TABLE IN LODI, CA</text>
      <text x="82" y="450" font-family="Georgia, serif" font-size="28" font-style="italic" fill="#F0EBE1" fill-opacity="0.85">Every dish sourced within 60 miles.</text>
      <text x="82" y="490" font-family="Georgia, serif" font-size="28" font-style="italic" fill="#F0EBE1" fill-opacity="0.85">Every farm named on the menu.</text>
    </svg>
  `;

  const logoBuffer = await sharp(logoSvg).resize(logoSize, logoSize).png().toBuffer();

  await sharp(photo)
    .composite([
      { input: Buffer.from(overlaySvg), top: 0, left: 0 },
      { input: logoBuffer, top: 130, left: 76 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(publicDir, 'og-image.jpg'));
  console.log('Wrote og-image.jpg');
}

function generateManifest() {
  const manifest = {
    name: 'Harvest Table',
    short_name: 'Harvest Table',
    description:
      'Farm-to-table restaurant in Lodi, CA. Seasonal menus sourced from family farms within 60 miles.',
    start_url: `${BASE_PATH}/`,
    scope: `${BASE_PATH}/`,
    display: 'standalone',
    background_color: '#F0EBE1',
    theme_color: '#2C3B2D',
    icons: [
      { src: `${BASE_PATH}/favicon.svg`, sizes: 'any', type: 'image/svg+xml' },
      { src: `${BASE_PATH}/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${BASE_PATH}/icon-512.png`, sizes: '512x512', type: 'image/png' },
    ],
  };
  writeFileSync(path.join(publicDir, 'manifest.webmanifest'), JSON.stringify(manifest));
  console.log('Wrote manifest.webmanifest');
}

await generateIcons();
await generateOgImage();
generateManifest();
