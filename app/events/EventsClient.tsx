'use client';

// One job: display upcoming and private events with horizontal cards,
// a newsletter signup strip, and a hero. Sold-out state handled per card.

import Image from 'next/image';
import { asset } from '@/lib/basePath';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { EVENTS, type Event, type EventCategory } from '@/data/events';
import { useDemoForm } from '@/components/DemoModal';

const CATEGORY_LABELS: Record<EventCategory, string> = {
  wine: 'Wine Dinner',
  'chefs-table': "Chef's Table",
  harvest: 'Harvest Dinner',
  private: 'Private Dining',
};

// Maps spec image paths that don't exist to available images.
const IMAGE_FALLBACKS: Record<string, string> = {
  '/images/event-wine.jpg': '/images/space-bar.jpg',
  '/images/event-chefs-table.jpg': '/images/dish-salmon.jpg',
  '/images/event-harvest.jpg': '/images/farm-field.jpg',
};
function resolveImage(src: string): string {
  return asset(IMAGE_FALLBACKS[src] ?? src);
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function EventsHero() {
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 400], [0, 120]);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : 0));

  return (
    <section className="relative flex h-[260px] items-center justify-center overflow-hidden md:h-[360px]">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src={asset('/images/restaurant-interior.jpg')}
          alt="Harvest Table dining room set for an evening event"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 30%' }}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-forest/65" />
      <div className="relative z-10 px-6 text-center">
        <h1 className="font-display text-5xl font-semibold text-white md:text-6xl">
          Events
        </h1>
        <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-white/90">
          We host a small number of special dinners each season. Seats go quickly.
        </p>
      </div>
    </section>
  );
}

// ── Event card ────────────────────────────────────────────────────────────────

function EventCard({ event, index }: { event: Event; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], ['0px', '-35px']);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : '0px'));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="mb-12 flex flex-col overflow-hidden md:flex-row"
    >
      {/* Image column */}
      <div className="relative aspect-video flex-shrink-0 overflow-hidden md:aspect-auto md:min-h-[320px] md:w-[40%]">
        <motion.div style={{ y: imageY }} className="absolute inset-0 hidden md:block scale-110">
          <Image
            src={resolveImage(event.image)}
            alt={event.title}
            fill
            className="object-cover"
            sizes="40vw"
          />
        </motion.div>
        <div className="absolute inset-0 md:hidden">
          <Image
            src={resolveImage(event.image)}
            alt={event.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {event.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-forest/70">
            <span className="font-mono text-sm uppercase tracking-widest text-gold">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content column */}
      <div className="flex h-full flex-col justify-between bg-white p-6 md:w-[60%] md:p-10">
        <div>
          <span className="w-fit border border-fog/40 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-fog">
            {CATEGORY_LABELS[event.category]}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest">{event.title}</h2>
          <p className="mt-1 font-sans text-base italic text-fog">{event.subtitle}</p>
          <p className="mt-4 max-w-prose font-sans text-sm leading-relaxed text-fog">
            {event.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-6">
            {[
              { label: 'Date', value: event.date },
              { label: 'Time', value: event.time },
              { label: 'Price', value: event.price },
              {
                label: 'Seats',
                value: event.soldOut
                  ? null
                  : `${event.seatsRemaining} of ${event.seats} remaining`,
                soldOut: event.soldOut,
              },
            ].map(({ label, value, soldOut }) => (
              <div key={label} className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-wide text-fog">{label}</span>
                {soldOut ? (
                  <span className="mt-0.5 font-sans text-sm text-ember">Sold out</span>
                ) : (
                  <span className="mt-0.5 font-sans text-sm text-forest">{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {event.soldOut ? (
            <button
              disabled
              className="cursor-not-allowed border border-fog/40 px-6 py-3 font-sans text-sm text-fog opacity-60"
            >
              Join Waitlist
            </button>
          ) : event.category === 'private' ? (
            <Link
              href="/contact?inquiry=private-dining"
              className="inline-block bg-gold px-6 py-3 font-sans text-sm font-medium text-forest transition-opacity hover:opacity-90"
            >
              Inquire About This Space
            </Link>
          ) : (
            <Link
              href={`/contact?inquiry=${event.id}`}
              className="inline-block bg-gold px-6 py-3 font-sans text-sm font-medium text-forest transition-opacity hover:opacity-90"
            >
              Reserve a Table
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Newsletter strip ──────────────────────────────────────────────────────────

function NewsletterStrip() {
  const { handleSubmit, modal } = useDemoForm();
  return (
    <section className="bg-forest py-16">
      {modal}
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-3xl font-normal text-white">Be the first to know</h2>
        <p className="mt-3 font-sans text-sm text-fog">
          Events sell out quickly. We announce new dinners to our list before anyone else.
        </p>
        <form onSubmit={handleSubmit} className="mt-8">

          <div className="mx-auto flex max-w-sm">
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="flex-1 border border-fog/40 bg-transparent px-4 py-3 font-sans text-sm text-white placeholder:text-fog/60 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-gold px-6 py-3 font-sans text-sm font-medium text-forest transition-opacity hover:opacity-90"
            >
              Notify Me
            </button>
          </div>
        </form>
        <p className="mt-3 font-sans text-xs italic text-fog/50">
          No spam. Announcements only. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export default function EventsClient() {
  return (
    <main>
      <EventsHero />

      <section className="bg-linen py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 flex items-center gap-6">
            <span className="font-mono text-xs uppercase tracking-widest text-fog">Upcoming</span>
            <div className="h-px flex-1 bg-fog/20" />
          </div>

          {EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </section>

      <NewsletterStrip />
    </main>
  );
}
