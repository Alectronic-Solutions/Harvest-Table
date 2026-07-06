'use client';

// One job: two-column reservation section. Left: FormSubmit form on a forest
// background with underline-only inputs. Right: restaurant interior photo with
// per-element parallax. Stacks to form-over-image on mobile.

import Image from 'next/image';
import { asset } from '@/lib/basePath';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTACT } from '@/data/restaurant';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { useDemoForm } from '@/components/DemoModal';

// Chevron SVG used inside the custom select dropdowns.
function SelectChevron() {
  return (
    <svg
      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-fog"
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
const inputClass =
  'w-full border-b border-linen/30 bg-transparent py-3 font-sans text-base text-white placeholder-linen/50 focus:border-gold focus:outline-none transition-colors duration-200';

const selectClass =
  'w-full appearance-none border-b border-linen/30 bg-transparent py-3 font-sans text-base text-white focus:border-gold focus:outline-none transition-colors duration-200 cursor-pointer';

export default function ReservationSection() {
  const { handleSubmit, modal } = useDemoForm();
  const isDesktop = useIsDesktop();
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  // Right-column image drifts up 80px as the section scrolls through.
  // Disabled on mobile where the image is a fixed-height decorative block.
  const rawY = useTransform(scrollYProgress, [0, 1], ['0px', '-80px']);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : '0px'));

  // Today's date in YYYY-MM-DD for the date input min attribute.
  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="flex flex-col md:flex-row md:items-stretch">
      {/* LEFT: form column (55%) */}
      <div className="bg-forest px-6 py-14 md:w-[55%] md:px-12 md:py-20">
        <div className="mx-auto max-w-lg">
          {/* Header */}
          <h2 className="font-display text-4xl font-normal text-white">
            Reserve a table
          </h2>
          <p className="mt-3 font-sans text-sm text-linen/90">
            For parties larger than 8 or private events, call us at{' '}
            <a
              href={`tel:${CONTACT.phone.replace(/\D/g, '')}`}
              className="text-gold underline underline-offset-2"
            >
              {CONTACT.phone}
            </a>
          </p>

          {modal}
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-5"
          >

            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className={inputClass}
            />

            <input
              type="tel"
              name="phone"
              placeholder="(xxx) xxx-xxxx"
              className={inputClass}
            />

            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className={inputClass}
            />

            <input
              type="date"
              name="date"
              required
              min={today}
              className={inputClass}
            />

            {/* Time select with custom chevron */}
            <div className="relative">
              <select name="time" required defaultValue="" className={selectClass}>
                <option value="" disabled className="bg-forest text-white">
                  Preferred time
                </option>
                {[
                  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
                  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
                  '9:00 PM', '9:30 PM',
                ].map((t) => (
                  <option key={t} value={t} className="bg-forest text-white">
                    {t}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>

            {/* Party size select */}
            <div className="relative">
              <select name="party_size" required defaultValue="" className={selectClass}>
                <option value="" disabled className="bg-forest text-white">
                  Party size
                </option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-forest text-white">
                    {n} {n === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
                <option value="9+" className="bg-forest text-white">
                  9+ guests / please call
                </option>
              </select>
              <SelectChevron />
            </div>

            <textarea
              name="special_requests"
              rows={3}
              placeholder="Dietary needs, celebrations, accessibility..."
              className={`${inputClass} resize-none`}
            />

            {/* FormSubmit sends a confirmation email automatically */}
            <button
              type="submit"
              className="mt-1 min-h-[48px] w-full bg-gold py-4 font-sans text-base font-medium text-forest transition-opacity duration-200 hover:opacity-90"
            >
              Request Reservation
            </button>

            <p className="mt-1 text-center font-sans text-xs text-linen/80">
              We will confirm within 2 hours during business hours.
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT: image column (45%) */}
      <div
        ref={imageRef}
        className="relative h-[300px] overflow-hidden md:h-auto md:min-h-full md:w-[45%] md:self-stretch"
      >
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
          <Image
            src={asset('/images/restaurant-interior.jpg')}
            alt="The warm, wood-paneled dining room at Harvest Table"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
        </motion.div>
        {/* Subtle forest color wash over the photo */}
        <div className="absolute inset-0 bg-forest/20" />
      </div>
    </section>
  );
}
