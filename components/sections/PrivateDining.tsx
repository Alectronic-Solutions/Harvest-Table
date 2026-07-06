'use client';

// One job: full-bleed private dining section with a gradient overlay that fades
// from forest/80 on the left to forest/40 on the right (desktop), letting the
// photo show more on the right. Content sits on the left third.

import Image from 'next/image';
import { asset } from '@/lib/basePath';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
      className="relative min-h-[500px] overflow-hidden md:min-h-[600px]"
    >
      {/* Background image with parallax */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src={asset('/images/private-dining.jpg')}
          alt="The private dining room set for an intimate event"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay: uniform forest/70 on mobile, left-to-right gradient on desktop. */}
      <div className="absolute inset-0 bg-forest/72 md:hidden" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-forest/85 via-forest/60 to-forest/20" />
      {/* Vignette edges */}
      <div className="absolute inset-0 hidden md:block bg-[radial-gradient(ellipse_at_left,rgba(44,59,45,0.3)_0%,transparent_60%)]" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full min-h-[500px] flex-col items-center justify-center px-8 py-24 text-center md:min-h-[600px] md:items-start md:pl-16 md:pr-0 md:text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="max-w-xl">
          <h2 className="font-display text-5xl font-light leading-tight text-white md:text-6xl">
            Host something
            <br />
            worth remembering
          </h2>
          <p className="mt-6 max-w-sm font-sans text-base leading-relaxed text-white/90">
            Our private dining room seats up to 24 guests. Custom menus,
            dedicated service, and a wine list curated for your event.
            Weddings, rehearsal dinners, corporate gatherings, milestone
            birthdays.
          </p>

          {/* Stats row */}
          <div className="mt-8 grid grid-cols-2 gap-6 md:flex md:gap-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wide text-white/85">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/contact?inquiry=private-dining"
            className="mt-10 flex min-h-[48px] items-center justify-center border-[1.5px] border-gold px-9 py-4 font-sans text-base font-medium text-gold transition-all duration-300 hover:bg-gold hover:text-forest hover:shadow-[0_0_24px_rgba(212,168,67,0.3)] md:inline-flex md:w-auto"
          >
            Inquire About Events
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
