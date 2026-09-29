// One job: answer "when are you open and how do I get there" on the homepage.
// Hours, address with directions, phone, parking, and a lazy-loaded map.

import { CONTACT, HOURS, MAPS_EMBED_URL, MAPS_URL, PHONE_HREF } from '@/data/restaurant';
import { ButtonLink } from '@/components/ui/Button';

export default function VisitStrip() {
  return (
    <section aria-labelledby="visit-heading" className="bg-linen py-16 md:py-24">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-5 md:grid-cols-12 md:gap-12 md:px-8">
        <div className="text-center md:col-span-5 md:text-left">
          <h2 id="visit-heading" className="font-display text-4xl font-semibold text-forest md:text-5xl">
            Visit us
          </h2>
          <p className="mx-auto mt-4 max-w-sm font-sans text-base leading-relaxed text-fog-dark md:mx-0">
            In downtown Lodi, a short walk from the train depot and the wine
            district tasting rooms.
          </p>

          <address className="mt-8 not-italic">
            <p className="font-sans text-lg text-forest">
              {CONTACT.address}
              <br />
              {CONTACT.city}
            </p>
            <a
              href={PHONE_HREF}
              className="mt-2 inline-flex min-h-[44px] items-center font-mono text-base text-ember transition-opacity hover:opacity-80"
            >
              {CONTACT.phone}
            </a>
          </address>

          <h3 className="mt-6 font-mono text-xs uppercase tracking-label text-fog-dark">Hours</h3>
          <dl className="mx-auto mt-3 max-w-sm divide-y divide-fog/20 border-y border-fog/20 md:mx-0">
            {HOURS.map((h) => (
              <div key={h.day} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="font-sans text-sm text-forest">{h.day}</dt>
                <dd className="text-right font-mono text-xs text-fog-dark">{h.time}</dd>
              </div>
            ))}
          </dl>

          <p className="mx-auto mt-6 max-w-sm font-sans text-sm leading-relaxed text-fog-dark md:mx-0">
            <span className="font-medium text-forest">Parking:</span> free street
            parking on Main after 5 pm, and a public lot on Sacramento Street two
            minutes away.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-stretch">
            <ButtonLink href="/reservations">Reserve a Table</ButtonLink>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-forest/40 px-8 py-3 font-sans text-sm font-medium text-forest transition-all duration-300 hover:border-forest hover:bg-forest hover:text-linen md:text-base"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="relative h-[300px] overflow-hidden rounded-sm border border-fog/20 md:h-full md:min-h-[440px]">
            <iframe
              src={MAPS_EMBED_URL}
              title={`Map showing ${CONTACT.name} at ${CONTACT.address}, ${CONTACT.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale-[30%] focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gold"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
