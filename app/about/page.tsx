import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story behind Harvest Table: a farm-to-table restaurant in Lodi, California committed to sourcing within 60 miles.',
};

export default function AboutPage() {
  return <AboutClient />;
}
