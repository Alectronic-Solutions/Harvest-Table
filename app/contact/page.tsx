import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Harvest Table in Lodi, CA. Reservations, private dining inquiries, press, and careers.',
};

export default function ContactPage() {
  return <ContactClient />;
}
