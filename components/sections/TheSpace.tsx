'use client';

// One job: asymmetric photo mosaic of the dining room.
// Desktop: 12-column CSS grid with explicit col/row spans.
// Mobile: clean single-column stack -- all panels full width.
// Each panel has its own scroll ref + parallax. Scale reveal on entry.

import Image from 'next/image';
import { asset } from '@/lib/basePath';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsDesktop } from '@/lib/useIsDesktop';

function ParallaxPanel({
  src,
  alt,
  parallaxEnd,
  revealDelay,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  parallaxEnd: string;
  revealDelay: number;
  sizes: string;
  className: string;
}) {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ['0px', parallaxEnd]);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : '0px'));

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        opacity: { duration: 0.6, delay: revealDelay },
        scale:   { duration: 1.2, ease: [0.25, 0, 0, 1], delay: revealDelay },
      }}
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </motion.div>
    </motion.div>
  );
}

export default function TheSpace() {
  return (
    <section className="bg-linen py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">

        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="font-display text-5xl font-semibold text-forest">
            The room
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-base text-fog">
            Forty seats. Natural light during the day. Candlelight after dark.
            No music loud enough to interrupt a conversation.
          </p>
        </div>

        {/* ── MOBILE LAYOUT ── single column, aspect-ratio heights scale with viewport */}
        <div className="flex flex-col gap-3 md:hidden">
          <ParallaxPanel
            src={asset('/images/space-wide.jpg')}
            alt="The full dining room at Harvest Table"
            parallaxEnd="0px"
            revealDelay={0}
            sizes="100vw"
            className="aspect-[16/9] w-full"
          />
          <ParallaxPanel
            src={asset('/images/space-detail-1.jpg')}
            alt="Candlelit place setting with crystal glasses"
            parallaxEnd="0px"
            revealDelay={0.05}
            sizes="100vw"
            className="aspect-[16/9] w-full"
          />
          <div className="flex gap-3">
            <ParallaxPanel
              src={asset('/images/space-detail-2.jpg')}
              alt="Table detail: silver cutlery and wine glass"
              parallaxEnd="0px"
              revealDelay={0.1}
              sizes="50vw"
              className="aspect-square flex-1"
            />
            <ParallaxPanel
              src={asset('/images/space-detail-3.jpg')}
              alt="Wine glass and candle flame"
              parallaxEnd="0px"
              revealDelay={0.15}
              sizes="50vw"
              className="aspect-square flex-1"
            />
          </div>
          <ParallaxPanel
            src={asset('/images/space-bar.jpg')}
            alt="The wine and spirits bar"
            parallaxEnd="0px"
            revealDelay={0.2}
            sizes="100vw"
            className="aspect-[16/9] w-full"
          />
        </div>

        {/* ── DESKTOP LAYOUT ── asymmetric 12-col grid, 3 rows
            Row 1+2 | col 1-7:   space-wide          (large, row-span-2)
            Row 1   | col 8-12:  space-detail-1
            Row 2   | col 8-10:  space-detail-2
            Row 2   | col 11-12: space-detail-3
            Row 3   | col 1-5:   space-bar
            Row 3   | col 6-12:  restaurant-interior
        */}
        <div className="hidden md:grid md:grid-cols-12 md:grid-rows-3 md:gap-3">

          <ParallaxPanel
            src={asset('/images/space-wide.jpg')}
            alt="The full dining room at Harvest Table, warm wood and candlelight"
            parallaxEnd="-40px"
            revealDelay={0}
            sizes="58vw"
            className="col-span-7 row-span-2 min-h-[320px] lg:min-h-[420px]"
          />

          <ParallaxPanel
            src={asset('/images/space-detail-1.jpg')}
            alt="Candlelit place setting, crystal glasses and polished silver"
            parallaxEnd="-25px"
            revealDelay={0.1}
            sizes="42vw"
            className="col-span-5 row-span-1 min-h-[155px] lg:min-h-[205px]"
          />

          <ParallaxPanel
            src={asset('/images/space-detail-2.jpg')}
            alt="Table detail: silver cutlery and a wine glass by candlelight"
            parallaxEnd="-30px"
            revealDelay={0.2}
            sizes="25vw"
            className="col-span-3 row-span-1 min-h-[155px] lg:min-h-[205px]"
          />

          <ParallaxPanel
            src={asset('/images/space-detail-3.jpg')}
            alt="Wine glass and candle flame, close detail"
            parallaxEnd="-20px"
            revealDelay={0.3}
            sizes="17vw"
            className="col-span-2 row-span-1 min-h-[155px] lg:min-h-[205px]"
          />

          <ParallaxPanel
            src={asset('/images/space-bar.jpg')}
            alt="The wine and spirits bar, warm wood shelving and ambient light"
            parallaxEnd="-35px"
            revealDelay={0.4}
            sizes="42vw"
            className="col-span-5 row-span-1 min-h-[170px] lg:min-h-[230px]"
          />

          <ParallaxPanel
            src={asset('/images/restaurant-interior.jpg')}
            alt="Restaurant interior, evening light through the front windows"
            parallaxEnd="-25px"
            revealDelay={0.5}
            sizes="58vw"
            className="col-span-7 row-span-1 min-h-[170px] lg:min-h-[230px]"
          />

        </div>
      </div>
    </section>
  );
}
