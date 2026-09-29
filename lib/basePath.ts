const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// GitHub Pages origin this site actually deploys to (see .github/workflows/nextjs.yml).
// There is no custom domain/CNAME configured, so this is the real canonical origin.
const PRODUCTION_ORIGIN = 'https://alectronic-solutions.github.io';

export function asset(src: string): string {
  return `${BASE_PATH}${src}`;
}

// Canonical site origin including the GitHub Pages base path. Single source of
// truth for metadata, sitemap, robots, and JSON-LD so they can't drift from
// where the site is actually deployed.
export const SITE_URL = `${PRODUCTION_ORIGIN}${BASE_PATH}`;

// Absolute URL for a route. next.config sets `trailingSlash: true`, so every
// page is served at `/route/`. Canonicals and the sitemap must match that
// exactly or crawlers see a redirect on every canonical URL.
export function pageUrl(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
}

// Absolute URL for a static file in /public (images, icons).
export function assetUrl(src: string): string {
  return `${SITE_URL}${src}`;
}
