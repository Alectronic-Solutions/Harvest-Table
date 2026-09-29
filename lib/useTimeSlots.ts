import { useMemo, useState } from 'react';
import { DAY_NAMES, periodForDay, reservationSlots } from '@/data/restaurant';

// Friday's dinner service is the widest range, so it doubles as the list
// shown before a date is picked.
const DEFAULT_SLOTS = reservationSlots(5);

/**
 * Tracks the chosen reservation date and returns the bookable times for it:
 * brunch slots on Sunday, dinner slots Tuesday to Saturday, none on Monday.
 */
export function useTimeSlots() {
  const [date, setDate] = useState('');

  return useMemo(() => {
    if (!date) return { date, setDate, slots: DEFAULT_SLOTS, closedNote: '', serviceLabel: '' };
    // Noon avoids the date shifting across a time zone boundary.
    const day = new Date(`${date}T12:00:00`).getDay();
    const period = periodForDay(day);
    return {
      date,
      setDate,
      slots: reservationSlots(day),
      closedNote: period ? '' : `We are closed on ${DAY_NAMES[day]}s. Please choose another date.`,
      serviceLabel: period?.label ?? '',
    };
  }, [date]);
}

/** Today's date as YYYY-MM-DD in the visitor's local time, for the date input's min. */
export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
