import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/basePath';
import { pageOpenGraph } from '@/lib/metadata';
import { MENU } from '@/data/menu';
import { menuSchema } from '@/lib/schema';
import MenuClient from './MenuClient';

const description =
  'Our seasonal menu changes with the harvest. Every dish names its farm source. Current as of Summer 2026.';

export const metadata: Metadata = {
  title: 'Menu',
  description,
  alternates: { canonical: `${SITE_URL}/menu` },
  openGraph: pageOpenGraph({ title: 'Menu | Harvest Table', description, path: '/menu' }),
};

export default function MenuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema(MENU)) }}
      />
      <MenuClient />
    </>
  );
}
