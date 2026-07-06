import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your message has been received.',
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-[calc(100svh-36px-80px)] items-center justify-center bg-linen px-5">
      <div className="text-center">
        <div className="mx-auto mb-6 h-0.5 w-12 bg-gold" />
        <h1 className="font-display text-5xl font-semibold text-forest">
          Thank you.
        </h1>
        <p className="mx-auto mt-4 max-w-sm font-sans text-base leading-relaxed text-fog">
          We will be in touch within 2 hours during business hours. We look
          forward to having you at the table.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[48px] items-center bg-gold px-8 py-3 font-sans text-sm font-medium text-forest transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
