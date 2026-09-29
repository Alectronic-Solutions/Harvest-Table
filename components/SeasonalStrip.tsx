'use client';

// One job: render the thin seasonal announcement bar that sits ABOVE the navbar
// on every page. Forest background, gold DM Mono text, fixed 36px tall. On
// desktop it also shows today's open/closed status, computed in the
// restaurant's time zone after mount so the static HTML never goes stale.

import { useEffect, useState } from 'react';
import { SEASONAL_STRIP_TEXT, openStatus } from '@/data/restaurant';

function nowInLodi(): Date {
  // Re-express "now" as a Date whose local fields match Pacific wall time.
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
}

export default function SeasonalStrip() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const update = () => setStatus(openStatus(nowInLodi()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <aside aria-label="Seasonal announcement" className="print-hide flex h-9 items-center justify-center gap-4 bg-forest px-4">
      <p className="truncate text-center font-mono text-[10px] uppercase tracking-[0.12em] text-gold md:text-[11px] md:tracking-label">
        {SEASONAL_STRIP_TEXT}
      </p>
      {status && (
        <>
          <span className="hidden h-1 w-1 rotate-45 bg-gold/40 md:inline-block" aria-hidden />
          <p className="hidden font-mono text-[11px] uppercase tracking-label text-linen/70 md:block">
            {status}
          </p>
        </>
      )}
    </aside>
  );
}
