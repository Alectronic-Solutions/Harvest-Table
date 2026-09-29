import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import FarmersClient from './FarmersClient';

export const metadata = pageMetadata({
  title: 'Our Farm Partners',
  description:
    'Meet the fifteen farms, ranches, and producers within 60 miles of Lodi, CA who grow what we cook. Every dish on our menu names its farm.',
  path: '/farmers',
});

export default function FarmersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema('Farm Partners', '/farmers')} />
      <FarmersClient />
    </>
  );
}
