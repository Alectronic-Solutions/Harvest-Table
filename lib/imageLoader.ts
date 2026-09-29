// Custom next/image loader for the static export. Next can't resize images at
// request time under `output: 'export'`, so scripts/optimize-images.mjs
// pre-generates `name-640w.webp`, `-828w`, and `-1080w` next to every WebP in
// /images. This loader maps each srcset width Next asks for to the smallest
// variant that covers it, so phones stop downloading 1920px originals.
// Anything that isn't a /images/*.webp (the SVG logo, for example) passes
// through untouched.

export const VARIANT_WIDTHS = [640, 828, 1080] as const;

export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const match = src.match(/^(.*\/images\/[^/]+?)\.webp$/);
  if (!match) return src;
  const variant = VARIANT_WIDTHS.find((w) => width <= w);
  return variant ? `${match[1]}-${variant}w.webp` : src;
}
