import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { Cormorant_Garamond, DM_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import SeasonalStrip from '@/components/SeasonalStrip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import GrainOverlay from '@/components/GrainOverlay';
import PageTransition from '@/components/PageTransition';
import MotionProvider from '@/components/MotionProvider';
import MobileReserveBar from '@/components/MobileReserveBar';
import JsonLd from '@/components/JsonLd';
import { CONTACT } from '@/data/restaurant';
import { restaurantSchema } from '@/lib/schema';
import { SITE_URL, asset, pageUrl } from '@/lib/basePath';

// Custom cursor is a purely decorative, client-only effect that runs a
// persistent rAF loop. Keep it out of the critical initial bundle.
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

// Display face for headings only.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

// Mono for prices, labels, and seasonal indicators only.
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-mono',
  display: 'swap',
});

// Body face for all UI and paragraph text.
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const DEFAULT_TITLE = 'Harvest Table | Farm-to-Table Restaurant in Lodi, CA';
const DEFAULT_DESCRIPTION =
  'Seasonal farm-to-table dining in downtown Lodi, California. Every ingredient sourced from farms within 60 miles, and every farm named on the menu. Dinner Tuesday to Saturday, brunch Sunday.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${CONTACT.name}, Lodi CA`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: CONTACT.name,
  alternates: { canonical: pageUrl('/') },
  formatDetection: { telephone: true, address: true, email: true },
  icons: {
    icon: [{ url: asset('/favicon.svg'), type: 'image/svg+xml' }],
    apple: [{ url: asset('/icon-192.png'), sizes: '192x192' }],
  },
  manifest: asset('/manifest.webmanifest'),
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: pageUrl('/'),
    siteName: CONTACT.name,
    type: 'website',
    locale: 'en_US',
    // Next auto-prepends basePath when resolving OG/twitter image URLs against
    // metadataBase, so this must stay un-prefixed. Prefixing it ourselves
    // (like the manifest/favicon links) would double up the base path.
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Harvest Table, a farm-to-table restaurant in Lodi, California' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#2C3B2D',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmMono.variable} ${dmSans.variable}`}
    >
      <head>
        <JsonLd data={restaurantSchema()} />
      </head>
      <body id="top">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MotionProvider>
          <CustomCursor />
          <GrainOverlay />
          <ScrollProgress />
          <SeasonalStrip />
          <Navbar />
          <PageTransition>
            <main id="main-content" tabIndex={-1}>{children}</main>
          </PageTransition>
          <Footer />
          <MobileReserveBar />
        </MotionProvider>
      </body>
    </html>
  );
}
