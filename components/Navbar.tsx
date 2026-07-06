'use client';

// One job: sticky primary navigation. Transparent with dark ink text over the
// linen page; transitions to solid forest with linen text once scrolled past
// the hero. Logo centered (restaurant convention). Mobile: hamburger opens a
// full-screen overlay.

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { asset } from '@/lib/basePath';

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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

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

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 flex flex-col bg-forest px-8 pb-12 pt-10 md:top-20 md:hidden"
          >
            <ul className="flex flex-col gap-2" role="menu">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.08, duration: 0.3 }}
                  className="border-b border-linen/10 py-5"
                >
                  <Link
                    ref={i === 0 ? firstLinkRef : null}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl font-light text-linen focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/reservations"
              onClick={() => setMenuOpen(false)}
              className="mt-auto flex h-14 items-center justify-center rounded-full bg-gold font-sans text-base font-medium text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
            >
              Reserve a Table
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}