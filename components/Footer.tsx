// One job: site footer. Brand column, nav links, hours, and visit CTA.
// Four columns on desktop, clean stacked sections on mobile with dividers.

import Link from 'next/link';
import Image from 'next/image';
import { HOURS, CONTACT, SOCIAL } from '@/data/restaurant';

const NAV_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Farmers', href: '/farmers' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function InstagramIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
      strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
      strokeLinejoin="round" aria-hidden>
      <path d="M15 8h-2a2 2 0 0 0-2 2v11" />
      <path d="M8 13h6" />
      <path d="M11 21V10a4 4 0 0 1 4-4h0" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-forest text-linen">

      {/* Main grid */}
      <div className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-4 md:gap-10">

          {/* Col 1: Brand */}
          <div className="pb-10 md:pb-0">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Harvest Table"
                width={44}
                height={44}
                className="h-11 w-11 flex-shrink-0"
              />
              <span className="font-display text-xl text-linen">{CONTACT.name}</span>
            </Link>
            <address className="mt-5 not-italic font-sans text-sm leading-relaxed text-linen/70">
              {CONTACT.address}<br />
              {CONTACT.city}
            </address>
            <a
              href={`tel:${CONTACT.phone.replace(/\D/g, '')}`}
              className="mt-2 inline-block font-mono text-sm text-gold transition-opacity hover:opacity-80"
            >
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-1 block font-sans text-xs text-linen/50 transition-colors hover:text-linen/80"
            >
              {CONTACT.email}
            </a>
          </div>

          {/* Divider - mobile only */}
          <div className="border-t border-linen/10 md:hidden" />

          {/* Col 2: Nav links */}
          <div className="py-10 md:py-0">
            <p className="font-mono text-xs uppercase tracking-label text-gold">Explore</p>
            <nav aria-label="Footer navigation">
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-linen/80 transition-colors hover:text-linen"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Divider - mobile only */}
          <div className="border-t border-linen/10 md:hidden" />

          {/* Col 3: Hours */}
          <div className="py-10 md:py-0">
            <p className="font-mono text-xs uppercase tracking-label text-gold">Hours</p>
            <dl className="mt-4 space-y-3">
              {HOURS.map((entry) => (
                <div key={entry.day} className="flex flex-col gap-0.5">
                  <dt className="font-sans text-sm text-linen/80">{entry.day}</dt>
                  <dd className="font-mono text-xs text-linen/50">{entry.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Divider - mobile only */}
          <div className="border-t border-linen/10 md:hidden" />

          {/* Col 4: Visit + social */}
          <div className="pt-10 md:pt-0">
            <p className="font-mono text-xs uppercase tracking-label text-gold">Visit us</p>
            <Link
              href="/reservations"
              className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-gold px-6 py-2.5 font-sans text-sm font-medium text-forest transition-opacity hover:opacity-90"
            >
              Reserve a Table
            </Link>
            <div className="mt-6 flex gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Harvest Table on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-linen/20 text-linen/70 transition-colors hover:border-gold hover:text-gold"
              >
                <InstagramIcon />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Harvest Table on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-linen/20 text-linen/70 transition-colors hover:border-gold hover:text-gold"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Gold gradient rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Bottom bar */}
      <div>
        <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-5 py-6 md:flex-row md:justify-between md:gap-0 md:px-8">
          <p className="font-sans text-xs text-linen/35">
            &copy; {new Date().getFullYear()} {CONTACT.name}. All rights reserved.
          </p>

          {/* Centered back-to-top with ornament */}
          <a
            href="#top"
            className="group flex items-center gap-2 font-mono text-xs tracking-label text-linen/35 transition-colors hover:text-gold"
          >
            <span className="inline-block h-px w-6 bg-current opacity-40 transition-all group-hover:w-8" />
            Back to top
            <span className="inline-block h-px w-6 bg-current opacity-40 transition-all group-hover:w-8" />
          </a>

          <p className="font-sans text-xs text-linen/35">
            Built by{' '}
            <a
              href="https://alectronicsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-linen/35 transition-colors hover:text-gold/80"
            >
              Alectronic Solutions
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}
