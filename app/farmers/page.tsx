import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/basePath';
import { pageOpenGraph } from '@/lib/metadata';
import FarmersClient from './FarmersClient';

const description =
  'We source from 12 farms within 60 miles. Meet the people who grow what we cook.';

export const metadata: Metadata = {
  title: 'Our Farm Partners',
  description,
  alternates: { canonical: `${SITE_URL}/farmers` },
  openGraph: pageOpenGraph({
    title: 'Our Farm Partners | Harvest Table',
    description,
    path: '/farmers',
  }),
};

export default function FarmersPage() {
  return <FarmersClient />;
}
