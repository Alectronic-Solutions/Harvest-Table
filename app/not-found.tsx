import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100svh-36px-80px)] items-center justify-center bg-linen px-5">
      <div className="text-center">
        <h1 className="font-display text-5xl font-semibold text-forest">
          This page has gone out of season.
        </h1>
        <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-fog">
          It may have moved or been removed. Try the menu or head back home.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/menu"
            className="inline-flex min-h-[48px] items-center bg-gold px-8 py-3 font-sans text-sm font-medium text-forest transition-opacity hover:opacity-90"
          >
            View the menu
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center border border-forest px-8 py-3 font-sans text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-linen"
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
