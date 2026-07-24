// Generates raster brand assets (PWA icons + OG social preview image) from the
// existing SVG logo mark, so they can't visually drift from the brand.
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

async function generateOgImage() {
  const width = 1200;
  const height = 630;
  const logoSize = 220;

  const ogSvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#2C3B2D"/>
      <rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="#D4A843" stroke-opacity="0.35" stroke-width="1.5"/>
      <text x="${width / 2}" y="${height / 2 + logoSize / 2 + 92}" font-family="Georgia, 'Cormorant Garamond', serif" font-size="72" font-weight="600" fill="#F0EBE1" text-anchor="middle" letter-spacing="4">Harvest Table</text>
      <text x="${width / 2}" y="${height / 2 + logoSize / 2 + 140}" font-family="Georgia, monospace" font-size="22" fill="#D4A843" text-anchor="middle" letter-spacing="6">FARM-TO-TABLE IN LODI, CA</text>
    </svg>
  `;

  const logoBuffer = await sharp(logoSvg).resize(logoSize, logoSize).png().toBuffer();

  await sharp(Buffer.from(ogSvg))
    .composite([
      {
        input: logoBuffer,
        top: Math.round(height / 2 - logoSize / 2 - 60),
        left: Math.round(width / 2 - logoSize / 2),
      },
    ])
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Wrote og-image.png');
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
