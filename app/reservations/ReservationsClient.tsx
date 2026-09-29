'use client';

// One job: full reservations page. Short hero, two-column form + info sidebar,
// a guest FAQ, and a decorative room image strip at the bottom. Arriving from
// an event card (?event=id) pre-selects that dinner in the form.

import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { m, useScroll, useTransform } from 'framer-motion';
import { asset } from '@/lib/basePath';
import { CONTACT, HOURS, PHONE_HREF, MAPS_URL } from '@/data/restaurant';
import { upcomingEvents } from '@/data/events';
import { RESERVATION_FAQS } from '@/data/faq';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { todayISO, useTimeSlots } from '@/lib/useTimeSlots';
import { useDemoForm } from '@/components/DemoModal';

const TICKETED_EVENTS = upcomingEvents().filter((e) => e.startDate && !e.soldOut);

const labelClass = 'mb-1 block font-mono text-xs uppercase tracking-widest text-fog-dark';

const inputClass =
  'w-full min-h-[48px] border-0 border-b border-fog/40 bg-transparent py-3 font-sans text-base text-ink transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-gold-dark md:text-sm';

const selectClass = `${inputClass} cursor-pointer appearance-none disabled:cursor-not-allowed disabled:opacity-50`;

// ── Form ──────────────────────────────────────────────────────────────────────

function ReservationForm() {
  const { date, setDate, slots, closedNote, serviceLabel } = useTimeSlots();
  const { handleSubmit, modal } = useDemoForm({ onReset: () => setDate('') });
  const params = useSearchParams();
  const eventId = params.get('event') ?? '';
  const selectedEvent = TICKETED_EVENTS.find((e) => e.id === eventId);
  const [minDate, setMinDate] = useState<string>();
  useEffect(() => setMinDate(todayISO()), []);

  return (
    <>
      {modal}
      <h2 className="text-center font-display text-3xl font-semibold text-forest md:text-left md:text-4xl">
        {selectedEvent ? `Reserve seats: ${selectedEvent.title}` : 'Request a table'}
      </h2>
      <p className="mt-2 mb-8 text-center font-sans text-sm leading-relaxed text-fog-dark md:text-left">
        {selectedEvent
          ? `${selectedEvent.date} at ${selectedEvent.time}. ${selectedEvent.price}.`
          : 'Tell us when you would like to come in and we will confirm by email or text.'}
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        {TICKETED_EVENTS.length > 0 && (
          <div className="sm:col-span-2">
            <label htmlFor="res-event" className={labelClass}>Reservation for</label>
            <select id="res-event" name="event" defaultValue={selectedEvent?.id ?? ''} className={selectClass}>
              <option value="">Regular dinner or brunch</option>
              {TICKETED_EVENTS.map((e) => (
                <option key={e.id} value={e.id}>{e.title}, {e.date}</option>
              ))}
            </select>
          </div>
        )}

        <div className="sm:col-span-2">
          <label htmlFor="res-name" className={labelClass}>Full name</label>
          <input id="res-name" type="text" name="name" required autoComplete="name" className={inputClass} />
        </div>

        <div>
          <label htmlFor="res-email" className={labelClass}>Email</label>
          <input id="res-email" type="email" name="email" required autoComplete="email" inputMode="email" className={inputClass} />
        </div>

        <div>
          <label htmlFor="res-phone" className={labelClass}>Phone</label>
          <input
            id="res-phone"
            type="tel"
            name="phone"
            placeholder="(209) 555-0000"
            required
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
          />
        </div>

        {!selectedEvent && (
          <>
            <div>
              <label htmlFor="res-date" className={labelClass}>Date</label>
              <input
                id="res-date"
                type="date"
                name="date"
                required
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-describedby={closedNote ? 'res-date-note' : undefined}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="res-time" className={labelClass}>
                Time{serviceLabel ? ` (${serviceLabel.toLowerCase()})` : ''}
              </label>
              <select
                id="res-time"
                name="time"
                required
                key={date}
                defaultValue=""
                disabled={Boolean(closedNote)}
                className={selectClass}
              >
                <option value="" disabled>Select a time</option>
                {slots.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            {closedNote && (
              <p id="res-date-note" role="status" className="font-sans text-sm text-ember sm:col-span-2">
                {closedNote}
              </p>
            )}
          </>
        )}

        <div>
          <label htmlFor="res-party-size" className={labelClass}>Party size</label>
          <select id="res-party-size" name="party_size" required defaultValue="" className={selectClass}>
            <option value="" disabled>Select party size</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
            ))}
            <option value="9+">9+ guests (please call)</option>
          </select>
        </div>

        <div>
          <label htmlFor="res-occasion" className={labelClass}>Occasion</label>
          <select id="res-occasion" name="occasion" defaultValue="" className={selectClass}>
            <option value="">No special occasion</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Business dinner">Business dinner</option>
            <option value="Rehearsal dinner">Rehearsal dinner</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="res-special-requests" className={labelClass}>
            Special requests or dietary needs
          </label>
          <textarea
            id="res-special-requests"
            name="special_requests"
            rows={3}
            className="w-full resize-none border-0 border-b border-fog/40 bg-transparent py-3 font-sans text-base text-ink transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-gold-dark md:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="res-referral" className={labelClass}>How did you hear about us?</label>
          <select id="res-referral" name="referral" defaultValue="" className={selectClass}>
            <option value="">Select one</option>
            <option value="Google search">Google search</option>
            <option value="Instagram">Instagram</option>
            <option value="Friend or family">Friend or family</option>
            <option value="Food press">Food press</option>
            <option value="Walked by">Walked by</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="pt-2 sm:col-span-2">
          <button
            type="submit"
            className="min-h-[52px] w-full rounded-full bg-gold py-4 font-sans text-base font-medium text-forest transition-all duration-300 hover:scale-[1.01] hover:bg-gold/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-dark focus-visible:ring-offset-2"
          >
            {selectedEvent ? 'Request Seats' : 'Request Reservation'}
          </button>
          <p className="mt-4 font-sans text-xs leading-relaxed text-fog-dark">
            We confirm every request within 2 hours during business hours. For
            same-day tables, please call{' '}
            <a href={PHONE_HREF} className="text-forest underline underline-offset-2">{CONTACT.phone}</a>.
          </p>
        </div>
      </form>
    </>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-white px-5 py-16 text-center md:px-8 md:py-20 md:text-left">
      <div className="mx-auto max-w-3xl">
        <h2 id="faq-heading" className="font-display text-4xl font-semibold text-forest">
          Good to know
        </h2>
        <div className="mt-8 divide-y divide-fog/20 border-y border-fog/20">
          {RESERVATION_FAQS.map((f) => (
            <details key={f.question} className="group py-1">
              <summary className="grid min-h-[56px] cursor-pointer list-none grid-cols-[1fr_auto_1fr] items-center gap-4 font-sans text-base font-medium text-forest md:flex md:justify-between [&::-webkit-details-marker]:hidden">
                <span aria-hidden className="md:hidden" />
                <span className="text-center md:text-left">{f.question}</span>
                <span
                  className="justify-self-end font-mono text-lg text-gold-dark transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-center font-sans text-sm leading-relaxed text-fog-dark md:pr-8 md:text-left">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export default function ReservationsClient() {
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const rawHeroY = useTransform(scrollY, [0, 400], [0, 130]);
  const heroY = useTransform(rawHeroY, (v) => (isDesktop ? v : 0));

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[220px] items-center justify-center overflow-hidden md:h-[300px]">
        <m.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <Image
            src={asset('/images/restaurant-interior.webp')}
            alt="Candlelit dining room set for evening service"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </m.div>
        <div className="absolute inset-0 bg-forest/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(10,14,10,0.5)_0%,transparent_75%)]" />
        <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
          <h1
            className="font-display text-5xl font-semibold leading-none text-linen md:text-6xl"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.45)' }}
          >
            Reserve a Table
          </h1>
          <p
            className="mx-auto mt-3 max-w-sm font-sans text-sm text-linen/95 md:max-w-none"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}
          >
            Dinner Tuesday to Saturday · Brunch Sunday · Walk-ins welcome at the bar
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="bg-linen px-5 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-[3fr_2fr]">

            {/* Form */}
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-fog/20 bg-white p-6 md:p-10"
            >
              <Suspense fallback={<div className="min-h-[640px]" />}>
                <ReservationForm />
              </Suspense>
            </m.div>

            {/* Info sidebar */}
            <m.aside
              aria-label="Hours and location"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-10 bg-forest p-6 text-center md:p-10 md:text-left"
            >
              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-gold">Hours</h2>
                <dl className="mt-4 space-y-4">
                  {HOURS.map((h) => (
                    <div key={h.day}>
                      <dt className="font-sans text-base font-medium text-linen">{h.day}</dt>
                      <dd className="mt-0.5 font-mono text-sm text-linen/80">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-gold">Find us</h2>
                <address className="mt-3 font-sans text-base not-italic leading-relaxed text-linen/90">
                  {CONTACT.address}
                  <br />
                  {CONTACT.city}
                </address>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex min-h-[40px] items-center font-sans text-base text-linen/80 underline underline-offset-4 hover:text-gold"
                >
                  Get directions
                </a>
                <a
                  href={PHONE_HREF}
                  className="flex min-h-[40px] items-center justify-center font-mono text-base text-gold transition-opacity hover:opacity-80 md:justify-start"
                >
                  {CONTACT.phone}
                </a>
              </div>

              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-gold">
                  Parties of 9 or more
                </h2>
                <p className="mt-2 font-sans text-base leading-relaxed text-linen/90">
                  Please call us directly to arrange seating for large groups. We will do our best
                  to accommodate you.
                </p>
              </div>

              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-gold">
                  Private dining
                </h2>
                <p className="mt-2 font-sans text-base leading-relaxed text-linen/90">
                  Our private room seats up to 24 guests with a custom menu and a dedicated server.
                </p>
                <Link
                  href="/contact/?inquiry=private-dining"
                  className="mt-2 inline-flex min-h-[40px] items-center font-sans text-base text-gold underline underline-offset-4 transition-opacity hover:opacity-80"
                >
                  Inquire about private events &rarr;
                </Link>
              </div>
            </m.aside>
          </div>
        </div>
      </section>

      <Faq />

      {/* Room image strip */}
      <section className="relative h-[220px] overflow-hidden md:h-[320px]">
        <Image
          src={asset('/images/space-wide.webp')}
          alt="The Harvest Table dining room"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forest/30" />
      </section>
    </>
  );
}
