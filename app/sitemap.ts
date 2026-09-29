import type { MetadataRoute } from 'next';
import { pageUrl } from '@/lib/basePath';
import { BUILD_DATE } from '@/data/restaurant';

const ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/menu', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/reservations', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/events', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/farmers', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: pageUrl(path),
    lastModified: BUILD_DATE,
    changeFrequency,
    priority,
  }));
}
