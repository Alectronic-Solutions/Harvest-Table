import type { Metadata } from 'next';
import FarmersClient from './FarmersClient';

export const metadata: Metadata = {
  title: 'Our Farm Partners',
  description:
    'We source from 12 farms within 60 miles. Meet the people who grow what we cook.',
};

export default function FarmersPage() {
  return <FarmersClient />;
}
