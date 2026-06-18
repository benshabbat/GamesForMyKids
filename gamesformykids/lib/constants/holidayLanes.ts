export interface HolidayConfig {
  id: string;
  name: string;
  emoji: string;
  color: string;
  gameIds: string[];
  // Each occurrence: show lane from (start - 14 days) until (end + 1 day)
  occurrences: { start: string; end: string }[];
}

export const HOLIDAY_CONFIGS: HolidayConfig[] = [
  {
    id: 'rosh-hashana',
    name: 'ראש השנה',
    emoji: '🍎',
    color: 'from-amber-400 to-yellow-500',
    gameIds: ['jewish-holidays', 'seasons-holidays', 'family', 'blessings', 'fruits', 'counting'],
    occurrences: [
      { start: '2025-09-22', end: '2025-09-24' },
      { start: '2026-09-11', end: '2026-09-13' },
      { start: '2027-10-01', end: '2027-10-03' },
    ],
  },
  {
    id: 'sukkot',
    name: 'סוכות',
    emoji: '🌿',
    color: 'from-green-400 to-emerald-500',
    gameIds: ['jewish-holidays', 'seasons-holidays', 'garden-plants', 'nature', 'fruits', 'weather'],
    occurrences: [
      { start: '2025-09-27', end: '2025-10-04' },
      { start: '2026-09-16', end: '2026-09-23' },
      { start: '2027-10-06', end: '2027-10-13' },
    ],
  },
  {
    id: 'chanukah',
    name: 'חנוכה',
    emoji: '🕎',
    color: 'from-blue-500 to-indigo-600',
    gameIds: ['jewish-holidays', 'shapes', 'colors', 'counting', 'math', 'seasons-holidays'],
    occurrences: [
      { start: '2025-12-14', end: '2025-12-22' },
      { start: '2026-12-04', end: '2026-12-12' },
      { start: '2027-12-24', end: '2028-01-01' },
    ],
  },
  {
    id: 'purim',
    name: 'פורים',
    emoji: '🎭',
    color: 'from-purple-500 to-pink-500',
    gameIds: ['jewish-holidays', 'emotions', 'clothing', 'superheroes', 'art-craft', 'drawing'],
    occurrences: [
      { start: '2026-03-13', end: '2026-03-14' },
      { start: '2027-03-02', end: '2027-03-03' },
      { start: '2028-02-22', end: '2028-02-23' },
    ],
  },
  {
    id: 'pesach',
    name: 'פסח',
    emoji: '🫓',
    color: 'from-yellow-400 to-orange-400',
    gameIds: ['jewish-holidays', 'family', 'seasons-holidays', 'food', 'healthy-food', 'world-food'],
    occurrences: [
      { start: '2026-04-01', end: '2026-04-09' },
      { start: '2027-03-22', end: '2027-03-30' },
      { start: '2028-04-10', end: '2028-04-18' },
    ],
  },
  {
    id: 'yom-haatzmaut',
    name: 'יום העצמאות',
    emoji: '🇮🇱',
    color: 'from-blue-400 to-cyan-500',
    gameIds: ['israel', 'israel-map', 'flags', 'world-landmarks', 'capitals', 'geography-flags'],
    occurrences: [
      { start: '2026-04-29', end: '2026-04-30' },
      { start: '2027-04-20', end: '2027-04-21' },
      { start: '2028-05-10', end: '2028-05-11' },
    ],
  },
  {
    id: 'shavuot',
    name: 'שבועות',
    emoji: '📜',
    color: 'from-emerald-400 to-teal-500',
    gameIds: ['jewish-holidays', 'letters', 'blessings', 'seasons-holidays', 'hebrew-letters', 'fruits'],
    occurrences: [
      { start: '2026-05-21', end: '2026-05-23' },
      { start: '2027-05-11', end: '2027-05-13' },
      { start: '2028-05-30', end: '2028-06-01' },
    ],
  },
];

const DAY_MS = 24 * 60 * 60 * 1000;
const LEAD_DAYS = 14;

export function getActiveHoliday(today: Date = new Date()): HolidayConfig | null {
  const ts = today.getTime();
  for (const holiday of HOLIDAY_CONFIGS) {
    for (const occ of holiday.occurrences) {
      const start = new Date(occ.start).getTime();
      const end = new Date(occ.end).getTime() + DAY_MS; // inclusive end day
      const showFrom = start - LEAD_DAYS * DAY_MS;
      if (ts >= showFrom && ts < end) {
        return holiday;
      }
    }
  }
  return null;
}

export function daysUntilHoliday(holiday: HolidayConfig, today: Date = new Date()): number {
  const ts = today.getTime();
  for (const occ of holiday.occurrences) {
    const start = new Date(occ.start).getTime();
    if (start > ts) {
      return Math.ceil((start - ts) / DAY_MS);
    }
    const end = new Date(occ.end).getTime() + DAY_MS;
    if (ts >= start && ts < end) return 0;
  }
  return 0;
}
