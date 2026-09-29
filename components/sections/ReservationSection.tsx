'use client';

// One job: two-column reservation section. Left: reservation request form on
// a forest background with underline-only inputs and date-aware time slots.
// Right: restaurant interior photo with desktop-only parallax. Stacks to
// form-over-image on mobile.

import Image from 'next/image';
import { asset } from '@/lib/basePath';
import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { CONTACT, PHONE_HREF } from '@/data/restaurant';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { useDemoForm } from '@/components/DemoModal';
import { todayISO, useTimeSlots } from '@/lib/useTimeSlots';

// Chevron SVG used inside the custom select dropdowns.
function SelectChevron() {
  return (
    <svg
      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-linen/60"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

// Shared class strings kept as constants to avoid repetition.
const labelClass = 'block font-mono text-[11px] uppercase tracking-[0.14em] text-linen/70';

const inputClass =
  'mt-1 min-h-[48px] w-full border-b border-linen/30 bg-transparent py-3 font-sans text-base text-linen placeholder-linen/40 transition-colors duration-200 [color-scheme:dark] focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-forest';

const selectClass = `${inputClass} cursor-pointer appearance-none pr-6 disabled:cursor-not-allowed disabled:opacity-50`;

export default function ReservationSection() {
  const { date, setDate, slots, closedNote, serviceLabel } = useTimeSlots();
  const { handleSubmit, modal } = useDemoForm({ onReset: () => setDate('') });
  const isDesktop = useIsDesktop();
  const imageRef = useRef<HTMLDivElement>(null);
  // Set after mount so the static HTML and the first client render agree.
  const [minDate, setMinDate] = useState<string>();
  useEffect(() => setMinDate(todayISO()), []);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  // Right-column image drifts up 80px as the section scrolls through.
  // Disabled on mobile where the image is a fixed-height decorative block.
  const rawY = useTransform(scrollYProgress, [0, 1], ['0px', '-80px']);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : '0px'));

  return (
    <section
      aria-labelledby="home-reserve-heading"
      data-hide-mobile-bar
      className="flex flex-col md:flex-row md:items-stretch"
    >
      {/* LEFT: form column (55%) */}
      <div className="bg-forest px-5 py-12 md:w-[55%] md:px-12 md:py-20">
        <div className="mx-auto max-w-lg">
          <h2 id="home-reserve-heading" className="text-center font-display text-4xl font-normal text-linen md:text-left md:text-5xl">
            Reserve a table
          </h2>
          <p className="mx-auto mt-3 max-w-xs text-center font-sans text-sm leading-relaxed text-linen/85 md:mx-0 md:max-w-none md:text-left">
            Dinner Tuesday through Saturday, brunch on Sunday. For parties larger
            than 8 or private events, call us at{' '}
            <a href={PHONE_HREF} className="text-gold underline underline-offset-2">
              {CONTACT.phone}
            </a>
            .
          </p>

          {modal}
          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            {/* FormSubmit honeypot: real visitors never see or fill this. */}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="sm:col-span-2">
              <label htmlFor="home-name" className={labelClass}>Name</label>
              <input id="home-name" type="text" name="name" required autoComplete="name" className={inputClass} />
            </div>

            <div>
              <label htmlFor="home-email" className={labelClass}>Email</label>
              <input id="home-email" type="email" name="email" required autoComplete="email" inputMode="email" className={inputClass} />
            </div>

            <div>
              <label htmlFor="home-phone" className={labelClass}>Phone</label>
              <input
                id="home-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                placeholder="(209) 555-0000"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="home-date" className={labelClass}>Date</label>
              <input
                id="home-date"
                type="date"
                name="date"
                required
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-describedby={closedNote ? 'home-date-note' : undefined}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="home-time" className={labelClass}>
                Time{serviceLabel ? ` (${serviceLabel.toLowerCase()})` : ''}
              </label>
              <div className="relative">
                <select
                  id="home-time"
                  name="time"
                  required
                  defaultValue=""
                  key={date}
                  disabled={Boolean(closedNote)}
                  className={selectClass}
                >
                  <option value="" disabled className="bg-forest text-linen">
                    Select a time
                  </option>
                  {slots.map((t) => (
                    <option key={t} value={t} className="bg-forest text-linen">
                      {t}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
            </div>

            {closedNote && (
              <p id="home-date-note" role="status" className="font-sans text-sm text-gold sm:col-span-2">
                {closedNote}
              </p>
            )}

            <div className="sm:col-span-2">
              <label htmlFor="home-party" className={labelClass}>Party size</label>
              <div className="relative">
                <select id="home-party" name="party_size" required defaultValue="" className={selectClass}>
                  <option value="" disabled className="bg-forest text-linen">
                    Select party size
                  </option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n} className="bg-forest text-linen">
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                  <option value="9+" className="bg-forest text-linen">
                    9+ guests (please call)
                  </option>
                </select>
                <SelectChevron />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="home-requests" className={labelClass}>
                Dietary needs or occasion <span className="normal-case tracking-normal text-linen/70">(optional)</span>
              </label>
              <textarea
                id="home-requests"
                name="special_requests"
                rows={2}
                placeholder="Allergies, a birthday, accessibility needs..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="mt-2 min-h-[52px] w-full rounded-full bg-gold py-4 font-sans text-base font-medium text-forest transition-all duration-300 hover:scale-[1.01] hover:bg-gold/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
              >
                Request Reservation
              </button>
              <p className="mt-3 text-center font-sans text-xs text-linen/75">
                We confirm every request within 2 hours during business hours.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT: image column (45%) */}
      <div
        ref={imageRef}
        className="relative h-[280px] overflow-hidden md:h-auto md:min-h-full md:w-[45%] md:self-stretch"
      >
        <m.div style={{ y: imageY }} className="absolute inset-0 scale-110">
          <Image
            src={asset('/images/restaurant-interior.webp')}
            alt="The warm, wood-paneled dining room at Harvest Table"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
        </m.div>
        {/* Subtle forest color wash over the photo */}
        <div className="absolute inset-0 bg-forest/20" />
      </div>
    </section>
  );
}
