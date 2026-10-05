import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { computeAge, parseLocalDate } from '@/app/games/age-calculator/useAgeCalculator';

// All dates are built with the local-time constructor, exactly like the app does.
const d = (y: number, m: number, day: number, h = 12) => new Date(y, m - 1, day, h);
const ymd = (a: { years: number; months: number; days: number }) => [a.years, a.months, a.days];

describe('computeAge — years / months / days', () => {
  it('never produces negative days when the birth day does not exist in the previous month', () => {
    // Regression: born 31 Jan 2019, viewed 1 Mar 2026 used to give "7 years, 1 month and -2 days".
    const age = computeAge(d(2019, 1, 31), d(2026, 3, 1));
    expect(ymd(age)).toEqual([7, 1, 1]);
  });

  it('counts a month as complete on the last day of a shorter month', () => {
    expect(ymd(computeAge(d(2019, 1, 31), d(2026, 2, 28)))).toEqual([7, 1, 0]);
    expect(ymd(computeAge(d(2019, 1, 31), d(2026, 2, 27)))).toEqual([7, 0, 27]);
  });

  it('handles the 30th and 29th of January the same way', () => {
    expect(ymd(computeAge(d(2019, 1, 30), d(2026, 3, 1)))).toEqual([7, 1, 1]);
    expect(ymd(computeAge(d(2019, 1, 29), d(2026, 3, 1)))).toEqual([7, 1, 1]);
  });

  it('is exact on a birthday', () => {
    expect(ymd(computeAge(d(2020, 3, 15), d(2026, 3, 15)))).toEqual([6, 0, 0]);
  });

  it('is one day short of the birthday the day before', () => {
    expect(ymd(computeAge(d(2020, 3, 15), d(2026, 3, 14)))).toEqual([5, 11, 27]);
  });

  it('is 0 years 0 months 0 days on the day of birth', () => {
    expect(ymd(computeAge(d(2026, 6, 10), d(2026, 6, 10)))).toEqual([0, 0, 0]);
  });

  it('never returns a negative component for any birth day and viewing day in a year', () => {
    for (let month = 1; month <= 12; month++) {
      for (let day = 1; day <= 31; day++) {
        const birthday = d(2019, month, day);
        if (birthday.getDate() !== day) continue; // skip impossible dates (31 Apr, ...)
        for (let viewMonth = 1; viewMonth <= 12; viewMonth++) {
          for (const viewDay of [1, 15, 28, 29, 30, 31]) {
            const now = d(2026, viewMonth, viewDay);
            if (now.getDate() !== viewDay) continue;
            const age = computeAge(birthday, now);
            expect(age.years).toBeGreaterThanOrEqual(0);
            expect(age.months).toBeGreaterThanOrEqual(0);
            expect(age.months).toBeLessThan(12);
            expect(age.days).toBeGreaterThanOrEqual(0);
            expect(age.days).toBeLessThan(31);
          }
        }
      }
    }
  });
});

describe('computeAge — birthday detection and countdown', () => {
  it('detects the birthday even when the next 12 months contain 29 Feb', () => {
    // Regression: the old check assumed exactly 365 days and missed these (it saw 366).
    const age = computeAge(d(2020, 3, 15), d(2027, 3, 15, 10));
    expect(age.isBirthdayToday).toBe(true);
    expect(age.daysUntilBirthday).toBe(0);
  });

  it('detects the birthday at any time of day', () => {
    for (const hour of [0, 9, 23]) {
      expect(computeAge(d(2020, 8, 20), d(2026, 8, 20, hour)).isBirthdayToday).toBe(true);
    }
  });

  it('counts real calendar days to the next birthday across 29 Feb', () => {
    // 16 Mar 2027 -> 15 Mar 2028 spans 29 Feb 2028: 365 days, not "366".
    const age = computeAge(d(2020, 3, 15), d(2027, 3, 16));
    expect(age.isBirthdayToday).toBe(false);
    expect(age.daysUntilBirthday).toBe(365);
  });

  it('counts the days until a birthday later this year', () => {
    expect(computeAge(d(2020, 12, 25), d(2026, 12, 1)).daysUntilBirthday).toBe(24);
  });

  it('is 1 the day before the birthday and 364/365 the day after', () => {
    expect(computeAge(d(2020, 3, 15), d(2026, 3, 14)).daysUntilBirthday).toBe(1);
    expect(computeAge(d(2020, 3, 15), d(2026, 3, 16)).daysUntilBirthday).toBe(364);
  });

  it('treats the day of birth as a birthday', () => {
    const age = computeAge(d(2026, 6, 10, 8), d(2026, 6, 10, 20));
    expect(age.isBirthdayToday).toBe(true);
    expect(age.daysUntilBirthday).toBe(0);
  });
});

describe('computeAge — 29 Feb birthdays', () => {
  const born = d(2020, 2, 29);

  it('celebrates on 29 Feb in a leap year', () => {
    const age = computeAge(born, d(2028, 2, 29));
    expect(ymd(age)).toEqual([8, 0, 0]);
    expect(age.isBirthdayToday).toBe(true);
    expect(age.daysUntilBirthday).toBe(0);
  });

  it('celebrates on 28 Feb in a non-leap year, matching when the age ticks over', () => {
    const age = computeAge(born, d(2025, 2, 28));
    expect(ymd(age)).toEqual([5, 0, 0]);
    expect(age.isBirthdayToday).toBe(true);
  });

  it('is not the birthday on 1 Mar of a non-leap year, and the next one is on 28 Feb', () => {
    const age = computeAge(born, d(2025, 3, 1));
    expect(ymd(age)).toEqual([5, 0, 1]);
    expect(age.isBirthdayToday).toBe(false);
    expect(age.daysUntilBirthday).toBe(364); // 1 Mar 2025 -> 28 Feb 2026
  });

  it('counts down to the next real 29 Feb', () => {
    expect(computeAge(born, d(2028, 2, 27)).daysUntilBirthday).toBe(2);
    expect(computeAge(born, d(2027, 3, 1)).daysUntilBirthday).toBe(365); // -> 29 Feb 2028
  });

  it('does not crash or go negative the day before a non-leap-year birthday', () => {
    const age = computeAge(born, d(2025, 2, 27));
    expect(ymd(age)).toEqual([4, 11, 29]);
    expect(age.daysUntilBirthday).toBe(1);
  });
});

describe('computeAge — totals', () => {
  it('counts whole calendar days since birth', () => {
    expect(computeAge(d(2026, 1, 1, 0), d(2026, 4, 1, 0)).totalDays).toBe(90);
    expect(computeAge(d(2025, 12, 31), d(2026, 1, 1)).totalDays).toBe(1);
  });

  it('counts hours and seconds from the start of the birth day', () => {
    const age = computeAge(d(2026, 6, 10, 0), d(2026, 6, 10, 3));
    expect(age.totalHours).toBe(3);
    expect(age.liveSeconds).toBe(3 * 3600);
  });
});

describe('parseLocalDate', () => {
  const originalTz = process.env.TZ;
  beforeAll(() => { process.env.TZ = 'America/New_York'; });
  afterAll(() => {
    if (originalTz === undefined) delete process.env.TZ; else process.env.TZ = originalTz;
  });

  it('parses an <input type="date"> value as a local date, not UTC midnight', () => {
    // new Date('2019-01-31') is UTC midnight = 30 Jan in a timezone west of UTC.
    expect(new Date('2019-01-31').getDate()).toBe(30);
    const parsed = parseLocalDate('2019-01-31')!;
    expect([parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), parsed.getHours()]).toEqual([2019, 0, 31, 0]);
  });

  it('computes the same age in a timezone west of UTC', () => {
    const age = computeAge(parseLocalDate('2019-01-31')!, d(2026, 3, 1));
    expect(ymd(age)).toEqual([7, 1, 1]);
  });

  it('rejects empty, malformed and non-existent dates', () => {
    expect(parseLocalDate('')).toBeNull();
    expect(parseLocalDate('not a date')).toBeNull();
    expect(parseLocalDate('2019-02-31')).toBeNull();
    expect(parseLocalDate('2019-13-01')).toBeNull();
  });

  it('accepts a 29 Feb of a leap year only', () => {
    expect(parseLocalDate('2020-02-29')).not.toBeNull();
    expect(parseLocalDate('2021-02-29')).toBeNull();
  });
});
