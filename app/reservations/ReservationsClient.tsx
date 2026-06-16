'use client';

// One job: full reservations page. Short hero, two-column form + info sidebar,
// decorative room image strip at the bottom.

import Image from 'next/image';
import { asset } from '@/lib/basePath';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTACT, HOURS } from '@/data/restaurant';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { useDemoForm } from '@/components/DemoModal';

const inputClass =
  'w-full border-0 border-b border-fog/40 bg-transparent py-3 font-sans text-sm text-ink focus:outline-none focus:border-forest transition-colors min-h-[48px]';

const selectClass =
  'w-full border-0 border-b border-fog/40 bg-transparent py-3 font-sans text-sm text-ink focus:outline-none focus:border-forest transition-colors appearance-none min-h-[48px]';

export default function ReservationsClient() {
  const { handleSubmit, modal } = useDemoForm();
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const rawHeroY = useTransform(scrollY, [0, 400], [0, 130]);
  const rawRoomY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroY = useTransform(rawHeroY, (v) => (isDesktop ? v : 0));
  const roomY = useTransform(rawRoomY, (v) => (isDesktop ? v : 0));

  return (
    <main>
      {modal}

      {/* Hero */}
      <section className="relative flex h-[220px] items-center justify-center overflow-hidden md:h-[300px]">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <Image
            src={asset('/images/restaurant-interior.jpg')}
            alt="Candlelit dining room set for evening service"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-forest/60" />
        <div className="relative z-10 px-6 text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">
            Join us for dinner
          </p>
          <h1 className="font-display text-5xl font-semibold leading-none text-white">
            Reserve a Table
          </h1>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="bg-linen py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[3fr_2fr]">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-fog/20 bg-white p-8 md:p-10"
            >
              <h2 className="mb-8 font-display text-3xl font-normal text-forest">
                Make a reservation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-fog">
                    Full Name
                  </label>
                  <input type="text" name="name" required className={inputClass} />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-fog">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(209) 555-0000"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-fog">
                    Email
                  </label>
                  <input type="email" name="email" required className={inputClass} />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-fog">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-fog">
                      Time
                    </label>
                    <select name="time" required className={selectClass}>
                      <option value="">Select a time</option>
                      {['5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM'].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-fog">
                    Party size
                  </label>
                  <select name="party_size" required className={selectClass}>
                    <option value="">Select party size</option>
                    {[1,2,3,4,5,6,7,8].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                    ))}
                    <option value="9+">9+ guests / please call</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-fog">
                    Occasion
                  </label>
                  <select name="occasion" className={selectClass}>
                    <option value="No special occasion">No special occasion</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Business dinner">Business dinner</option>
                    <option value="Rehearsal dinner">Rehearsal dinner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-fog">
                    Special requests / dietary needs
                  </label>
                  <textarea
                    name="special_requests"
                    rows={4}
                    className="w-full resize-none border-0 border-b border-fog/40 bg-transparent py-3 font-sans text-sm text-ink focus:border-forest focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-fog">
                    How did you hear about us?
                  </label>
                  <select name="referral" className={selectClass}>
                    <option value="">Select one</option>
                    <option value="Google search">Google search</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Friend or family">Friend or family</option>
                    <option value="Eater / food press">Eater / food press</option>
                    <option value="Walked by">Walked by</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="min-h-[48px] w-full bg-gold py-4 font-sans text-sm font-medium uppercase tracking-widest text-forest transition-opacity hover:opacity-90"
                  >
                    Request Reservation
                  </button>
                  <p className="mt-4 font-sans text-xs leading-relaxed text-fog">
                    We confirm all reservations within 2 hours. For same-day reservations please
                    call us directly.
                  </p>
                </div>
              </form>
            </motion.div>

            {/* Info sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-10 bg-forest p-8 md:p-10"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-gold">Hours</p>
                <div className="mt-4 space-y-4">
                  {HOURS.map((h) => (
                    <div key={h.day}>
                      <p className="font-sans text-sm font-medium text-white">{h.day}</p>
                      <p className="mt-0.5 font-mono text-xs text-linen/80">{h.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gold">
                  Find us
                </p>
                <address className="mt-2 font-sans text-sm leading-relaxed not-italic text-white/90">
                  {CONTACT.address}
                  <br />
                  {CONTACT.city}
                </address>
                <a
                  href={`tel:${CONTACT.phone.replace(/\D/g, '')}`}
                  className="mt-3 block font-sans text-sm text-gold transition-opacity hover:opacity-80"
                >
                  {CONTACT.phone}
                </a>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-gold">
                  Parties of 9 or more
                </p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-white/90">
                  Please call us directly to arrange seating for large groups. We will do our best
                  to accommodate you.
                </p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-gold">
                  Private dining
                </p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-white/90">
                  Our private room seats up to 24 guests with a custom menu. Inquire at the link
                  below.
                </p>
                <a
                  href="/contact?inquiry=private-dining"
                  className="mt-2 block font-sans text-sm text-gold underline transition-opacity hover:opacity-80"
                >
                  Learn about private events &rarr;
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Room image strip */}
      <section className="relative h-[220px] overflow-hidden md:h-[320px]">
        <motion.div style={{ y: roomY }} className="absolute inset-0 scale-110">
          <Image
            src={asset('/images/space-wide.jpg')}
            alt="The Harvest Table dining room"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-forest/30" />
      </section>
    </main>
  );
}
