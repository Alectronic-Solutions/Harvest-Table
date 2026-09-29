'use client';

// One job: list upcoming events as horizontal cards with a date badge, seat
// availability, and the right action for each (reserve seats, join the
// waitlist, or inquire), followed by a newsletter signup strip.

import Image from 'next/image';
import { asset } from '@/lib/basePath';
import { useRef, useState } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { useIsDesktop } from '@/lib/useIsDesktop';
import type { Event, EventCategory } from '@/data/events';
import { useDemoForm } from '@/components/DemoModal';
import { ButtonLink, buttonClasses } from '@/components/ui/Button';

const CATEGORY_LABELS: Record<EventCategory, string> = {
  wine: 'Wine Dinner',
  'chefs-table': "Chef's Table",
  holiday: 'Holiday Dinner',
  private: 'Private Dining',
};

// Parts of a date for the badge, read in Pacific time.
function badgeParts(iso: string) {
  const d = new Date(iso);
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles', ...opts });
  return { month: fmt({ month: 'short' }), day: fmt({ day: 'numeric' }), weekday: fmt({ weekday: 'short' }) };
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function EventsHero() {
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 400], [0, 120]);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : 0));

  return (
    <section className="relative flex h-[280px] items-center justify-center overflow-hidden md:h-[380px]">
      <m.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src={asset('/images/event-harvest-moon.webp')}
          alt="A candlelit dinner table set outdoors in the evening"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 55%' }}
          sizes="100vw"
        />
      </m.div>
      <div className="absolute inset-0 bg-forest/60" />
      <div className="relative z-10 px-6 text-center">
        <h1 className="font-display text-5xl font-semibold text-linen md:text-6xl">
          Events
        </h1>
        <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-linen/90 md:text-base">
          A handful of special dinners each season, in the vineyard, at the
          pass, and around the holidays. Seats go quickly.
        </p>
      </div>
    </section>
  );
}

// ── Waitlist (sold-out events) ────────────────────────────────────────────────

function WaitlistForm({ event }: { event: Event }) {
  const { handleSubmit, modal } = useDemoForm();
  const [open, setOpen] = useState(false);
  const inputId = `waitlist-${event.id}`;

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className={buttonClasses('outline')}>
        Join the Waitlist
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-3 sm:flex-row">
      {modal}
      <input type="hidden" name="event" value={event.title} />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label htmlFor={inputId} className="sr-only">Email for the {event.title} waitlist</label>
      <input
        id={inputId}
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="your@email.com"
        className="min-h-[48px] flex-1 rounded-full border border-fog/40 bg-transparent px-5 font-sans text-sm text-ink placeholder:text-fog-dark/70 focus:border-forest focus:outline-none focus:ring-2 focus:ring-gold-dark"
      />
      <button type="submit" className={buttonClasses('primary')}>
        Notify Me
      </button>
    </form>
  );
}

// ── Event card ────────────────────────────────────────────────────────────────

function EventCard({ event, index }: { event: Event; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], ['0px', '-35px']);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : '0px'));
  const badge = event.startDate ? badgeParts(event.startDate) : null;

  return (
    <m.article
      ref={ref}
      id={event.id}
      aria-labelledby={`${event.id}-title`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: Math.min(index, 2) * 0.08 }}
      className="flex flex-col overflow-hidden rounded-sm bg-white shadow-[0_18px_40px_-28px_rgba(44,59,45,0.45)] md:flex-row"
    >
      {/* Image column */}
      <div className="relative aspect-[4/3] flex-shrink-0 overflow-hidden md:aspect-auto md:min-h-[360px] md:w-[42%]">
        <m.div style={{ y: imageY }} className="absolute inset-[-24px]">
          <Image
            src={asset(event.image)}
            alt={event.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 430px, (min-width: 768px) 42vw, 100vw"
          />
        </m.div>

        {badge && (
          <div className="absolute left-4 top-4 flex min-w-[64px] flex-col items-center rounded-sm bg-linen px-3 py-2 text-center shadow-md">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember">{badge.month}</span>
            <span className="font-display text-3xl font-semibold leading-none text-forest">{badge.day}</span>
            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fog-dark">{badge.weekday}</span>
          </div>
        )}

        {event.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-forest/65">
            <span className="rounded-full border border-gold/60 px-4 py-1.5 font-mono text-sm uppercase tracking-widest text-gold">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content column */}
      <div className="flex flex-1 flex-col justify-between p-6 text-center md:p-10 md:text-left">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ember">
            {CATEGORY_LABELS[event.category]}
            {event.venue ? ` · At ${event.venue.name}` : ''}
          </p>
          <h2 id={`${event.id}-title`} className="mt-2 font-display text-3xl font-semibold leading-tight text-forest md:text-4xl">
            {event.title}
          </h2>
          <p className="mt-1 font-display text-lg italic text-fog-dark">{event.subtitle}</p>
          <p className="mx-auto mt-4 max-w-prose font-sans text-sm leading-relaxed text-fog-dark md:mx-0">
            {event.description}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-fog/20 pt-5 text-center md:text-left">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wide text-fog-dark">Date</dt>
              <dd className="mt-0.5 font-sans text-sm text-forest">
                {event.startDate ? <time dateTime={event.startDate}>{event.date}</time> : event.date}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wide text-fog-dark">Time</dt>
              <dd className="mt-0.5 font-sans text-sm text-forest">{event.time}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wide text-fog-dark">Price</dt>
              <dd className="mt-0.5 font-mono text-sm text-ember">{event.price}</dd>
            </div>
            {event.category !== 'private' && (
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-fog-dark">Seats</dt>
                <dd className={`mt-0.5 font-sans text-sm ${event.soldOut ? 'text-ember' : 'text-forest'}`}>
                  {event.soldOut ? 'Sold out' : `${event.seatsRemaining} of ${event.seats} left`}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="mt-8 flex justify-center md:justify-start">
          {event.soldOut ? (
            <WaitlistForm event={event} />
          ) : event.category === 'private' ? (
            <ButtonLink href="/contact/?inquiry=private-dining">Inquire About Private Dining</ButtonLink>
          ) : (
            <ButtonLink href={`/reservations/?event=${event.id}`}>Reserve Seats</ButtonLink>
          )}
        </div>
      </div>
    </m.article>
  );
}

// ── Newsletter strip ──────────────────────────────────────────────────────────

function NewsletterStrip() {
  const { handleSubmit, modal } = useDemoForm();
  return (
    <section aria-labelledby="newsletter-heading" className="bg-forest py-16 md:py-20" data-hide-mobile-bar>
      {modal}
      <div className="mx-auto max-w-2xl px-5 text-center">
        <h2 id="newsletter-heading" className="font-display text-4xl font-normal text-linen">Be the first to know</h2>
        <p className="mt-3 font-sans text-sm text-linen/75">
          Events sell out quickly. We announce new dinners to our list before anyone else.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="your@email.com"
            className="min-h-[48px] flex-1 rounded-full border border-linen/30 bg-transparent px-5 font-sans text-sm text-linen placeholder:text-linen/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-forest"
          />
          <button type="submit" className={buttonClasses('primary', 'dark')}>
            Notify Me
          </button>
        </form>
        <p className="mt-4 font-sans text-xs text-linen/60">
          A few emails a season. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export default function EventsClient({ events }: { events: Event[] }) {
  return (
    <>
      <EventsHero />

      <section aria-label="Upcoming events" className="bg-linen px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl space-y-10 md:space-y-14">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </section>

      <NewsletterStrip />
    </>
  );
}
