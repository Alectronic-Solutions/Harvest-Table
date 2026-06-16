// One job: the site footer. Pulls hours, address, phone, and social links from
// the restaurant constants so nothing is hardcoded twice.

import Link from 'next/link';
import { HOURS, CONTACT, SOCIAL } from '@/data/restaurant';

function InstagramIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
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
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
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
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-3 md:px-8 md:py-16">
        {/* Brand + address */}
        <div>
          <p className="font-display text-2xl text-linen">{CONTACT.name}</p>
          <p className="mt-3 font-sans text-sm leading-relaxed text-linen/90">
            {CONTACT.address}
            <br />
            {CONTACT.city}
          </p>
          <a
            href={`tel:${CONTACT.phone.replace(/\D/g, '')}`}
            className="link-underline mt-3 inline-block font-mono text-sm text-gold"
          >
            {CONTACT.phone}
          </a>
        </div>

        {/* Hours */}
        <div>
          <p className="font-mono text-xs uppercase tracking-label text-gold">
            Hours
          </p>
          <dl className="mt-4 space-y-2">
            {HOURS.map((entry) => (
              <div
                key={entry.day}
                className="flex items-baseline justify-between gap-4"
              >
                <dt className="font-sans text-sm text-linen/80">{entry.day}</dt>
                <dd className="font-mono text-sm text-linen/80">{entry.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visit + social */}
        <div>
          <p className="font-mono text-xs uppercase tracking-label text-gold">
            Visit
          </p>
          <Link
            href="/reservations"
            className="mt-4 inline-block rounded-full bg-gold px-5 py-2.5 font-sans text-sm font-medium text-forest transition-transform duration-300 hover:scale-[1.02]"
          >
            Reserve a Table
          </Link>
          <div className="mt-6 flex gap-3">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-linen/20 text-linen/80 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <InstagramIcon />
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-linen/20 text-linen/80 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-linen/10">
        <div className="mx-auto flex max-w-content flex-col gap-1 px-5 py-6 text-xs text-linen/50 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-sans">
            &copy; {new Date().getFullYear()} {CONTACT.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="font-mono text-xs tracking-label text-linen/50 transition-colors duration-300 hover:text-gold"
          >
            Back to top
          </a>
          <p className="font-sans">
            Demo site by{' '}
            <a
              href="https://alectronicsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              Alectronic Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
