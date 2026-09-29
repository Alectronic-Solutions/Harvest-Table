import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ContactClient from './ContactClient';

export const metadata = pageMetadata({
  title: 'Contact & Directions',
  description:
    'Find Harvest Table in downtown Lodi, CA. Hours, directions, parking, private dining inquiries, press, and careers.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema('Contact', '/contact')} />
      <ContactClient />
    </>
  );
}
