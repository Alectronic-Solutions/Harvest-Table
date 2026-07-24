'use client';

// One job: sticky primary navigation. Transparent with dark ink text over the
// linen page; transitions to solid forest with linen text once scrolled past
// the hero. Logo centered (restaurant convention). Mobile: hamburger opens a
// full-screen overlay.

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { asset } from '@/lib/basePath';
import { CONTACT } from '@/data/restaurant';

const LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Farmers', href: '/farmers' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    // Focus management for mobile menu
    if (menuOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    } else if (!menuOpen && menuButtonRef.current) {
      menuButtonRef.current.focus();
    }

    if (!menuOpen) return () => { document.body.style.overflow = ''; };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  // Solid when scrolled past the hero top or mobile menu is open.
  const solid = scrolled || menuOpen;

  const textColor = 'text-ink';
  const barColor  = 'bg-ink';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-linen/90 backdrop-blur-md border-b border-ink/10 shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
          : 'bg-linen/70 backdrop-blur-sm border-b border-ink/6'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-5 md:h-20 md:px-8">

        {/* Left: logo + wordmark (all viewports) */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5"
          >
            <Image
              src={asset('/logo.svg')}
              alt=""
              width={44}
              height={44}
              className="h-9 w-9 md:h-11 md:w-11"
              priority
            />
            <span className={`font-display text-xl font-normal tracking-wide transition-colors duration-300 md:text-2xl ${textColor}`}>
              Harvest Table
            </span>
          </Link>
        </div>

        {/* Center: desktop nav links */}
        <ul className="hidden gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`link-underline font-sans text-sm font-medium transition-colors duration-300 ${textColor} ${solid ? 'opacity-80 hover:opacity-100' : 'opacity-100'} focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: mobile hamburger + desktop reserve CTA */}
        <div className="flex items-center justify-end">
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="-mr-2 flex h-12 w-12 items-center justify-center md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
          >
            <span className="relative block h-[14px] w-6">
              <span className={`absolute left-0 block h-[1.5px] w-6 transition-all duration-300 ${barColor} ${
                menuOpen ? 'top-[6px] rotate-45' : 'top-0'
              }`} />
              <span className={`absolute left-0 top-[6px] block h-[1.5px] w-6 transition-all duration-300 ${barColor} ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`} />
              <span className={`absolute left-0 block h-[1.5px] w-6 transition-all duration-300 ${barColor} ${
                menuOpen ? 'top-[6px] -rotate-45' : 'top-[12px]'
              }`} />
            </span>
          </button>

          <Link
            href="/reservations"
            className="hidden rounded-full bg-gold px-5 py-2.5 font-sans text-sm font-medium text-forest transition-all duration-300 hover:scale-[1.02] hover:opacity-90 md:inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
          >
            Reserve a Table
          </Link>
        </div>
      </nav>

      {/* Mobile full-screen overlay, portaled to <body> so it isn't clipped by
          the header's backdrop-blur, which creates a containing block for any
          fixed-position descendant and would otherwise shrink this panel down
          to the header's own height. */}
      {mounted && createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-0 top-16 z-40 flex flex-col bg-forest pb-10 pt-8 shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:top-20 md:hidden"
            >
              <ul className="flex flex-1 flex-col justify-center gap-1 px-8" role="menu">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.1, duration: 0.3, ease: 'easeOut' }}
                    className="flex items-baseline gap-4 border-b border-linen/10 py-4 first:pt-0"
                  >
                    <span className="font-mono text-[11px] text-gold/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Link
                      ref={i === 0 ? firstLinkRef : null}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-4xl font-light leading-none text-linen transition-colors duration-200 hover:text-gold focus:outline-none focus-visible:text-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
                      role="menuitem"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="px-8">
                <Link
                  href="/reservations"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-14 items-center justify-center rounded-full bg-gold font-sans text-base font-medium text-forest transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
                >
                  Reserve a Table
                </Link>
                <a
                  href={`tel:${CONTACT.phone.replace(/\D/g, '')}`}
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 block text-center font-mono text-[11px] tracking-[0.1em] text-linen/50 transition-colors duration-200 hover:text-gold focus:outline-none focus-visible:text-gold"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}