import { describe, it, expect, afterEach } from 'vitest';
import {
  getLocalDateKey,
  getYesterdayLocalDateKey,
  getLocalDayIndex,
} from '@/lib/utils/engagement/localDate';

const ORIGINAL_TZ = process.env.TZ;

/**
 * Switches the process time zone (call BEFORE building local-time Dates) and
 * fails loudly if it did not take effect.
 */
function useTimeZone(tz: string, expectedJulyOffsetMinutes: number) {
  process.env.TZ = tz;
  // getTimezoneOffset is minutes *behind* UTC (Jerusalem summer: -180, New York summer: 240)
  expect(new Date(2024, 6, 1, 12).getTimezoneOffset()).toBe(expectedJulyOffsetMinutes);
}

afterEach(() => {
  if (ORIGINAL_TZ === undefined) delete process.env.TZ;
  else process.env.TZ = ORIGINAL_TZ;
});

describe('getLocalDateKey', () => {
  it('formats the local calendar date as YYYY-MM-DD with zero padding', () => {
    expect(getLocalDateKey(new Date(2024, 0, 5, 9, 30))).toBe('2024-01-05');
    expect(getLocalDateKey(new Date(2024, 11, 31, 23, 59, 59))).toBe('2024-12-31');
  });

  it('uses the local day in Israel, where UTC is still "yesterday" after local midnight', () => {
    useTimeZone('Asia/Jerusalem', -180);
    const instant = new Date('2024-06-14T22:30:00Z'); // 01:30 on the 15th in Israel (UTC+3)
    expect(getLocalDateKey(instant)).toBe('2024-06-15');
    expect(instant.toISOString().slice(0, 10)).toBe('2024-06-14'); // the old, wrong key
  });

  it('uses the local day in UTC-5, where UTC is already "tomorrow" in the evening', () => {
    useTimeZone('America/New_York', 240);
    const instant = new Date('2024-01-16T01:00:00Z'); // 20:00 on the 15th in New York (UTC-5)
    expect(getLocalDateKey(instant)).toBe('2024-01-15');
    expect(instant.toISOString().slice(0, 10)).toBe('2024-01-16'); // the old, wrong key
  });
});

describe('getYesterdayLocalDateKey', () => {
  it('crosses month boundaries (leap February)', () => {
    expect(getYesterdayLocalDateKey(new Date(2024, 2, 1, 0, 30))).toBe('2024-02-29');
    expect(getYesterdayLocalDateKey(new Date(2023, 2, 1, 0, 30))).toBe('2023-02-28');
    expect(getYesterdayLocalDateKey(new Date(2024, 4, 1, 23, 59))).toBe('2024-04-30');
  });

  it('crosses year boundaries', () => {
    expect(getYesterdayLocalDateKey(new Date(2025, 0, 1, 0, 5))).toBe('2024-12-31');
  });

  it('does not mutate its argument', () => {
    const now = new Date(2024, 2, 1, 10, 0);
    const before = now.getTime();
    getYesterdayLocalDateKey(now);
    expect(now.getTime()).toBe(before);
  });

  it('survives the US spring-forward day (a 23h day): 00:30 after it is still the 10th "yesterday"', () => {
    useTimeZone('America/New_York', 240);
    const now = new Date(2024, 2, 11, 0, 30); // DST began 2024-03-10 02:00 in New York
    expect(getYesterdayLocalDateKey(now)).toBe('2024-03-10');
    // subtracting a fixed 24h lands on the 9th here, which would reset a streak
    expect(getLocalDateKey(new Date(now.getTime() - 86_400_000))).toBe('2024-03-09');
  });

  it('survives the US fall-back day (a 25h day): 23:30 on the 3rd gives the 2nd, not the 3rd', () => {
    useTimeZone('America/New_York', 240);
    const now = new Date(2024, 10, 3, 23, 30); // DST ended 2024-11-03 02:00 in New York
    expect(getYesterdayLocalDateKey(now)).toBe('2024-11-02');
    // subtracting a fixed 24h lands back on the same calendar day, which would stall a streak
    expect(getLocalDateKey(new Date(now.getTime() - 86_400_000))).toBe('2024-11-03');
  });

  it('survives the Israel spring-forward day', () => {
    useTimeZone('Asia/Jerusalem', -180);
    const now = new Date(2024, 2, 30, 0, 30); // DST began 2024-03-29 02:00 in Israel
    expect(getYesterdayLocalDateKey(now)).toBe('2024-03-29');
  });

  it('is consistent with getLocalDateKey across a full year of samples around midnight and the DST hours (New York)', () => {
    useTimeZone('America/New_York', 240);
    for (let day = 0; day < 366; day++) {
      for (const hour of [0, 1, 2, 3, 12, 23]) {
        const now = new Date(2024, 0, 1 + day, hour, 30);
        const today = getLocalDateKey(now);
        const yesterday = getYesterdayLocalDateKey(now);
        const expected = getLocalDateKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 12));
        expect(yesterday).toBe(expected);
        expect(yesterday < today).toBe(true);
      }
    }
  });
});

describe('getLocalDayIndex', () => {
  it('is stable within a local day and increments at local midnight', () => {
    const start = getLocalDayIndex(new Date(2024, 5, 15, 0, 0, 0));
    expect(getLocalDayIndex(new Date(2024, 5, 15, 23, 59, 59))).toBe(start);
    expect(getLocalDayIndex(new Date(2024, 5, 16, 0, 0, 0))).toBe(start + 1);
  });

  it('matches the UTC day number of the local calendar date', () => {
    expect(getLocalDayIndex(new Date(2024, 0, 1, 15))).toBe(Date.UTC(2024, 0, 1) / 86_400_000);
  });

  it('increments by exactly 1 across DST days', () => {
    useTimeZone('America/New_York', 240);
    const a = getLocalDayIndex(new Date(2024, 2, 10, 12));
    const b = getLocalDayIndex(new Date(2024, 2, 11, 12));
    const c = getLocalDayIndex(new Date(2024, 10, 3, 12));
    const d = getLocalDayIndex(new Date(2024, 10, 4, 12));
    expect(b - a).toBe(1);
    expect(d - c).toBe(1);
  });
});
