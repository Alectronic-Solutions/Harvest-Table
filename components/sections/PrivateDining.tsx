'use client';

// One job: full-bleed private dining section with a gradient overlay that fades
// from forest/80 on the left to forest/40 on the right (desktop), letting the
// photo show more on the right. Content sits on the left third.

import Image from 'next/image';
import { asset } from '@/lib/basePath';
import { ButtonLink } from '@/components/ui/Button';
import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { useIsDesktop } from '@/lib/useIsDesktop';

const STATS = [
  { value: '24', label: 'guests max' },
  { value: '3',  label: 'menu options' },
  { value: 'Full', label: 'buyout available' },
];

export default function PrivateDining() {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ['0px', '-60px']);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : '0px'));

  return (
    <section
      ref={ref}
      aria-label="Private dining"
      className="relative overflow-hidden md:min-h-[600px]"
    >
      {/* Background image with parallax */}
      <m.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src={asset('/images/private-dining.webp')}
          alt="The private dining room set for an intimate event"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </m.div>

      {/* Overlay: darker top-to-bottom scrim on mobile so text stays readable
          over busy parts of the photo, left-to-right gradient on desktop. */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/78 to-forest/88 md:hidden" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-forest/85 via-forest/60 to-forest/20" />
      {/* Vignette edges */}
      <div className="absolute inset-0 hidden md:block bg-[radial-gradient(ellipse_at_left,rgba(44,59,45,0.3)_0%,transparent_60%)]" />

      {/* Content */}
      <m.div
        className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-center sm:px-8 sm:py-20 md:h-full md:min-h-[600px] md:items-start md:pl-16 md:pr-0 md:py-24 md:text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="max-w-xl">
          <div className="rounded-lg bg-forest/70 px-5 py-5 backdrop-blur-sm md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
            <h2
              className="font-display text-3xl font-light leading-[1.15] text-linen [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl md:leading-tight"
            >
              Host something
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>
              worth remembering
            </h2>
            <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.4)] sm:mt-5 sm:text-base md:mx-0">
              Our private dining room seats up to 24 guests. Custom menus,
              dedicated service, and a wine list curated for your event.
              Weddings, rehearsal dinners, corporate gatherings, milestone
              birthdays.
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-8 grid grid-cols-3 gap-3 sm:mt-10 sm:gap-6 md:flex md:gap-8">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-md bg-forest/60 px-3 py-3 backdrop-blur-sm md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none"
              >
                <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-white/85 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <ButtonLink
            href="/contact/?inquiry=private-dining"
            tone="dark"
            className="mt-8 w-full sm:mt-10 sm:w-auto"
          >
            Inquire About Private Dining
          </ButtonLink>
        </div>
      </m.div>
    </section>
  );
}
