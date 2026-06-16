import type { Metadata } from 'next';
import MenuClient from './MenuClient';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Our seasonal menu changes with the harvest. Every dish names its farm source. Current as of Summer 2026.',
};

export default function MenuPage() {
  return <MenuClient />;
}
