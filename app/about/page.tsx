import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/basePath';
import { pageOpenGraph } from '@/lib/metadata';
import AboutClient from './AboutClient';

const description =
  'The story behind Harvest Table: a farm-to-table restaurant in Lodi, California committed to sourcing within 60 miles.';

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: pageOpenGraph({ title: 'About | Harvest Table', description, path: '/about' }),
};

export default function AboutPage() {
  return <AboutClient />;
}
