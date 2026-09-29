import type { MetadataRoute } from 'next';
import { SITE_URL, asset } from '@/lib/basePath';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [asset('/thank-you/')],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
