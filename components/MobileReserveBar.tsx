'use client';

// One job: keep "Reserve a Table" and "Call" one tap away on phones. Fixed to
// the bottom of the viewport below md, it appears after the visitor scrolls
// past the first screen, and steps aside on /reservations and whenever the
// footer (which carries the same actions) is on screen.

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PHONE_HREF } from '@/data/restaurant';

function PhoneIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

export default function MobileReserveBar() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Step aside for the footer and for any section that already has its own
  // reservation form (marked with data-hide-mobile-bar) so the bar never
  // covers a submit button.
  useEffect(() => {
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setFooterVisible(visible.size > 0);
    });
    // Wait for PageTransition to swap in the new route's DOM before querying.
    const timer = setTimeout(() => {
      document.querySelectorAll('footer, [data-hide-mobile-bar]').forEach((t) => observer.observe(t));
    }, 400);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      setFooterVisible(false);
    };
  }, [pathname]);

  const onReservations = pathname?.replace(/\/$/, '').endsWith('/reservations');
  const show = pastHero && !footerVisible && !onReservations;

  return (
    <nav
      aria-label="Quick actions"
      className={`print-hide fixed inset-x-0 bottom-0 z-40 border-t border-linen/10 bg-forest/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      aria-hidden={!show}
    >
      <div className="flex gap-3">
        <a
          href={PHONE_HREF}
          tabIndex={show ? 0 : -1}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-linen/30 px-5 font-sans text-sm font-medium text-linen"
        >
          <PhoneIcon />
          Call
        </a>
        <Link
          href="/reservations"
          tabIndex={show ? 0 : -1}
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-gold font-sans text-sm font-medium text-forest"
        >
          Reserve a Table
        </Link>
      </div>
    </nav>
  );
}
