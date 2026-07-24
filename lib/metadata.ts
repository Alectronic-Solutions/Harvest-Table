// Next.js does not deep-merge `openGraph` between a layout and a page. If a
// page declares its own `openGraph`, it replaces the layout's wholesale. Any
// page that overrides openGraph.title/description/url must go through this
// helper or it silently loses siteName/type/locale/images.

import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/basePath';
import { CONTACT } from '@/data/restaurant';

export function pageOpenGraph({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): NonNullable<Metadata['openGraph']> {
  return {
    title,
    description,
    url: `${SITE_URL}${path}`,
    siteName: CONTACT.name,
    type: 'website',
    locale: 'en_US',
    // Next auto-prepends basePath when resolving this against metadataBase.
    // It must stay un-prefixed or the base path ends up doubled.
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Harvest Table' }],
  };
}
