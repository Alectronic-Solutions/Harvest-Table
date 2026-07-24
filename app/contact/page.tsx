import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/basePath';
import { pageOpenGraph } from '@/lib/metadata';
import ContactClient from './ContactClient';

const description =
  'Get in touch with Harvest Table in Lodi, CA. Reservations, private dining inquiries, press, and careers.';

export const metadata: Metadata = {
  title: 'Contact',
  description,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: pageOpenGraph({ title: 'Contact | Harvest Table', description, path: '/contact' }),
};

export default function ContactPage() {
  return <ContactClient />;
}
