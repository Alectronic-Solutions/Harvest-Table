// One job: render the thin seasonal announcement bar that sits ABOVE the navbar
// on every page. Forest background, gold DM Mono text, fixed 36px tall.

import { SEASONAL_STRIP_TEXT } from '@/data/restaurant';

export default function SeasonalStrip() {
  return (
    <div className="flex h-9 items-center justify-center bg-forest px-4">
      <p className="text-center font-mono text-[9px] uppercase tracking-[0.08em] text-gold md:text-[11px] md:tracking-label">
        {SEASONAL_STRIP_TEXT}
      </p>
    </div>
  );
}
