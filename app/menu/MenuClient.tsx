'use client';

// The full menu page. Five parts: page hero, sticky section nav, menu sections
// (looped from data), drinks notes, bottom CTA. The sticky nav uses
// IntersectionObserver to track the active section as the user scrolls.

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MENU } from '@/data/menu';
import { CURRENT_SEASON } from '@/data/restaurant';
import { useIsDesktop } from '@/lib/useIsDesktop';
import MenuSection from '@/components/menu/MenuSection';

// ── PART 1: Page hero ────────────────────────────────────────────────────────

function MenuHero() {
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 400], [0, 120]);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : 0));

  return (
    <div className="relative h-[260px] overflow-hidden md:h-[340px]">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src="/images/farm-field.jpg"
          alt="California farm fields at golden hour"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 60%' }}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-forest/70" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-gold">
          Updated with the seasons
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold text-white md:text-6xl">
          Our Menu
        </h1>
        <p className="mt-3 max-w-md font-sans text-sm text-white/90">
          Dishes marked Seasonal change based on availability. Menu current as
          of {CURRENT_SEASON}.
        </p>
      </div>
    </div>
  );
}

// ── PART 2: Sticky section nav ───────────────────────────────────────────────

function SectionNav({ activeId }: { activeId: string }) {
  return (
    <div className="sticky top-16 z-40 border-b border-fog/30 bg-linen md:top-20">
      <div className="mx-auto flex h-[52px] max-w-3xl items-center overflow-x-auto px-4 scrollbar-none md:px-0">
        <nav className="flex min-w-max gap-8">
          {MENU.map((section) => {
            const isActive = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
                className={`relative whitespace-nowrap font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                  isActive ? 'text-gold' : 'text-fog hover:text-ink'
                }`}
              >
                {section.navLabel}
                {isActive && (
                  <span className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] bg-gold" />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

// ── PART 4: Drinks note ──────────────────────────────────────────────────────

function DrinksNote() {
  return (
    <div className="border-t border-fog/25 bg-linen py-12">
      <div className="mx-auto max-w-3xl px-4 md:px-0">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-fog">
              Natural wine list
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-fog">
              We pour small-production California wines, chosen to complement
              what is on the menu that week. Our list changes often. Ask your
              server what is open.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-fog">
              Dietary accommodations
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-fog">
              Most dishes can be adjusted for dietary needs with advance notice.
              Please mention any allergies or restrictions when you reserve.
            </p>
          </div>
        </div>
        {/* Dietary key */}
        <div className="mt-8 flex flex-wrap gap-4">
          {[
            { flag: 'V', label: 'Vegetarian' },
            { flag: 'VE', label: 'Vegan' },
            { flag: 'GF', label: 'Gluten-free' },
          ].map(({ flag, label }) => (
            <span key={flag} className="flex items-center gap-1.5 font-sans text-xs text-fog">
              <span className="rounded-full border border-fog/40 px-1.5 py-0.5 font-mono text-[10px] text-fog">
                {flag}
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PART 5: Bottom CTA ───────────────────────────────────────────────────────

function BottomCta() {
  return (
    <section className="bg-forest py-20 text-center">
      <div className="px-5">
        <h2 className="font-display text-4xl font-normal text-white">
          Ready to sit down?
        </h2>
        <p className="mt-3 font-sans text-sm text-fog">
          Reservations open Tuesday through Sunday.
        </p>
        <Link
          href="/reservations"
          className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-gold px-10 py-4 font-sans text-base font-medium text-forest transition-opacity duration-200 hover:opacity-90"
        >
          Reserve a Table
        </Link>
      </div>
    </section>
  );
}

// ── Page root ────────────────────────────────────────────────────────────────

export default function MenuClient() {
  const [activeId, setActiveId] = useState(MENU[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Track which section is most visible. When a section crosses the 50%
    // threshold into view, promote it as the active nav item.
    const sectionEls = MENU.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' }
    );

    sectionEls.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <MenuHero />
      <SectionNav activeId={activeId} />
      {MENU.map((section, i) => (
        <MenuSection key={section.id} section={section} isEven={i % 2 === 0} />
      ))}
      <DrinksNote />
      <BottomCta />
    </>
  );
}
