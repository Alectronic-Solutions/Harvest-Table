'use client';

// The full menu page. Five parts: page hero, sticky section nav, menu sections
// (looped from data), wine and dietary notes, bottom CTA. The sticky nav uses
// IntersectionObserver to track the active section as the user scrolls.

import Image from 'next/image';
import { asset } from '@/lib/basePath';
import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { MENU, DIETARY_LABELS, type DietaryFlag } from '@/data/menu';
import { CURRENT_SEASON, MENU_UPDATED } from '@/data/restaurant';
import { ButtonLink } from '@/components/ui/Button';
import { useIsDesktop } from '@/lib/useIsDesktop';
import MenuSection from '@/components/menu/MenuSection';

// ── PART 1: Page hero ────────────────────────────────────────────────────────

function MenuHero() {
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 400], [0, 120]);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : 0));

  return (
    <div className="relative h-[280px] overflow-hidden md:h-[360px] print:h-auto print:overflow-visible">
      <m.div style={{ y: imageY }} className="absolute inset-0 scale-110 print:hidden">
        <Image
          src={asset('/images/farm-field.webp')}
          alt="California farm fields at golden hour"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 60%' }}
          sizes="100vw"
        />
      </m.div>
      <div className="absolute inset-0 bg-forest/70 print:hidden" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-5xl font-semibold text-linen md:text-6xl print:text-forest">
          The {CURRENT_SEASON} Menu
        </h1>
        <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-linen/90 print:text-ink">
          Every dish names the farm it came from. Dishes marked Seasonal change
          with the harvest.
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-gold">
          Updated {MENU_UPDATED}
        </p>
      </div>
    </div>
  );
}

// ── PART 2: Sticky section nav ───────────────────────────────────────────────

function SectionNav({ activeId }: { activeId: string }) {
  return (
    <div className="print-hide sticky top-16 z-40 border-b border-fog/30 bg-linen/95 backdrop-blur-sm md:top-20">
      <div className="mx-auto flex h-[52px] max-w-3xl items-center justify-between gap-6 overflow-x-auto px-5 scrollbar-none md:px-0">
        <nav aria-label="Menu sections" className="flex min-w-max gap-7 md:gap-8">
          {MENU.map((section) => {
            const isActive = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
                className={`relative flex h-[52px] items-center whitespace-nowrap font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                  isActive ? 'text-gold-dark' : 'text-fog-dark hover:text-ink'
                }`}
              >
                {section.navLabel}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                )}
              </a>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => window.print()}
          className="hidden min-h-[40px] items-center gap-2 whitespace-nowrap rounded-full border border-fog/40 px-4 font-sans text-xs text-fog-dark transition-colors hover:border-forest hover:text-forest md:inline-flex"
        >
          Print menu
        </button>
      </div>
    </div>
  );
}

// ── PART 4: Wine and dietary notes ──────────────────────────────────────────

function DrinksNote() {
  return (
    <div className="border-t border-fog/25 bg-linen px-5 py-14 md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:gap-12 md:text-left">
          <div>
            <h2 className="font-display text-2xl font-semibold text-forest">
              The wine list
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-fog-dark">
              We pour small-production wines from Lodi and the Sierra foothills,
              chosen to go with what is on the menu that week. Old-vine
              Zinfandel is always open. Corkage is $20 per bottle.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-forest">
              Dietary needs
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-fog-dark">
              Most dishes can be adjusted for dietary needs with advance notice.
              Please mention any allergies or restrictions when you reserve.
            </p>
          </div>
        </div>
        {/* Dietary key */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start" aria-label="Dietary key">
          {(Object.entries(DIETARY_LABELS) as [DietaryFlag, string][]).map(([flag, label]) => (
            <span key={flag} className="flex items-center gap-1.5 font-sans text-xs text-fog-dark">
              <span className="rounded-full border border-fog/40 px-1.5 py-0.5 font-mono text-[10px] text-fog-dark">
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
    <section className="print-hide bg-forest py-20 text-center">
      <div className="px-5">
        <h2 className="font-display text-4xl font-normal text-linen md:text-5xl">
          Ready to sit down?
        </h2>
        <p className="mt-3 font-sans text-sm text-linen/75">
          Dinner Tuesday through Saturday. Brunch on Sunday.
        </p>
        <ButtonLink href="/reservations" tone="dark" className="mt-8">
          Reserve a Table
        </ButtonLink>
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
