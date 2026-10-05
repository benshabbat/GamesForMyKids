/**
 * Local-calendar day helpers for streaks and "once per day" gates.
 *
 * `new Date().toISOString().slice(0, 10)` is the UTC date, so the "day" rolls
 * over at 02:00/03:00 in Israel and at ~19:00 in UTC-5, which breaks streaks.
 * These helpers use the device's local calendar day instead. Keep using
 * toISOString() for real timestamps (DB columns); use these only for day keys.
 */

/** Local calendar date of `date` as `YYYY-MM-DD`. */
export function getLocalDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Local calendar date of the day before `now` as `YYYY-MM-DD`.
 * Steps by calendar day (setDate), not by 24h, so 23h/25h DST days and month or
 * year boundaries are handled; anchored at noon so no DST gap can shift the date.
 */
export function getYesterdayLocalDateKey(now: Date = new Date()): string {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  d.setDate(d.getDate() - 1);
  return getLocalDateKey(d);
}

/** Whole days since the epoch for the local calendar day; changes at local midnight. */
export function getLocalDayIndex(date: Date = new Date()): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
}
