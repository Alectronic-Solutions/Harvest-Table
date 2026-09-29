// Next.js does not deep-merge `openGraph` or `twitter` between a layout and a
// page. If a page declares its own, it replaces the layout's wholesale. Every
// page builds its metadata through `pageMetadata` so none of them silently
// lose siteName/type/locale/images or end up with a mismatched canonical.

import type { Metadata } from 'next';
import { pageUrl } from '@/lib/basePath';
import { CONTACT } from '@/data/restaurant';

const DEFAULT_OG_IMAGE = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Harvest Table, a farm-to-table restaurant in Lodi, California' };

type OgImage = { url: string; width: number; height: number; alt: string };

export function pageOpenGraph({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: OgImage;
}): NonNullable<Metadata['openGraph']> {
  return {
    title,
    description,
    url: pageUrl(path),
    siteName: CONTACT.name,
    type: 'website',
    locale: 'en_US',
    // Next auto-prepends basePath when resolving this against metadataBase.
    // It must stay un-prefixed or the base path ends up doubled.
    images: [image],
  };
}

/**
 * Full metadata for a page. `title` is the short page name; the layout's
 * title template appends the brand. `socialTitle` is used for OG/Twitter
 * cards, where no template is applied.
 */
export function pageMetadata({
  title,
  socialTitle,
  description,
  path,
  image,
}: {
  title: string;
  socialTitle?: string;
  description: string;
  path: string;
  image?: OgImage;
}): Metadata {
  const shareTitle = socialTitle ?? `${title} | ${CONTACT.name}, Lodi CA`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: pageUrl(path) },
    openGraph: pageOpenGraph({ title: shareTitle, description, path, image: ogImage }),
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [ogImage],
    },
  };
}
