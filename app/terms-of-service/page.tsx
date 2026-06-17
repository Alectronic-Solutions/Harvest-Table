import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Harvest Table',
  description: 'Terms of Service for Harvest Table restaurant.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-linen pt-24">
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <h1 className="font-display text-3xl text-forest md:text-4xl">Terms of Service</h1>
        <p className="mt-2 font-mono text-xs text-gold">Last updated: January 2025</p>

        <div className="prose prose-stone mt-8 font-sans text-forest/80">
          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing and using the Harvest Table website and services,
              you accept and agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">2. Reservations</h2>
            <p className="mt-2">
              Reservation policies:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Reservations are subject to availability</li>
              <li>We hold tables for 15 minutes past reservation time</li>
              <li>Cancellations must be made at least 24 hours in advance</li>
              <li>Large parties (8+) may require a deposit</li>
              <li>No-shows may result in future reservation restrictions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">3. Menu and Pricing</h2>
            <p className="mt-2">
              Menu items and prices are subject to change based on seasonal
              availability. We reserve the right to modify our menu at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">4. Dietary Restrictions</h2>
            <p className="mt-2">
              While we accommodate dietary restrictions when possible, we cannot
              guarantee allergen-free preparation. Please inform your server of
              any allergies or dietary needs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">5. Conduct</h2>
            <p className="mt-2">
              We reserve the right to refuse service to anyone who is disruptive,
              disrespectful to staff, or violates our dress code policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">6. Private Events</h2>
            <p className="mt-2">
              Private dining reservations require a signed agreement and deposit.
              Specific terms will be provided upon inquiry.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">7. Website Use</h2>
            <p className="mt-2">
              The content on this website is for informational purposes only.
              You may not use our website for any commercial purpose without
              written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">8. Limitation of Liability</h2>
            <p className="mt-2">
              Harvest Table is not liable for any indirect, incidental, or
              consequential damages arising from the use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">9. Changes to Terms</h2>
            <p className="mt-2">
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting to the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">10. Contact</h2>
            <p className="mt-2">
              For questions about these Terms of Service, please contact us at:{' '}
              <a href="mailto:hello@harvesttable.com" className="text-gold underline">
                hello@harvesttable.com
              </a>
            </p>
          </section>

          <div className="mt-12 border-t border-forest/10 pt-6">
            <Link href="/" className="text-sm text-gold hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}