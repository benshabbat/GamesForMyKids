import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getDailyLoginStreak } from '@/lib/utils/engagement/trackDailyLogin';

const ORIGINAL_TZ = process.env.TZ;

function installFakeBrowserStorage() {
  const store = new Map<string, string>();
  vi.stubGlobal('window', {});
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  });
}

describe('getDailyLoginStreak uses the local calendar day', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    installFakeBrowserStorage();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    if (ORIGINAL_TZ === undefined) delete process.env.TZ;
    else process.env.TZ = ORIGINAL_TZ;
  });

  it('Israel: playing at 23:00 and again at 00:30 the next local day extends the streak', () => {
    process.env.TZ = 'Asia/Jerusalem';
    expect(new Date(2024, 6, 1, 12).getTimezoneOffset()).toBe(-180);

    vi.setSystemTime(new Date(2024, 5, 14, 23, 0)); // 20:00Z on the 14th
    expect(getDailyLoginStreak()).toEqual({ count: 1, isNew: true });

    // 00:30 local on the 15th is 21:30Z on the 14th: same UTC date, new local date
    vi.setSystemTime(new Date(2024, 5, 15, 0, 30));
    expect(getDailyLoginStreak()).toEqual({ count: 2, isNew: true });

    // later the same local day nothing changes
    vi.setSystemTime(new Date(2024, 5, 15, 18, 0));
    expect(getDailyLoginStreak()).toEqual({ count: 2, isNew: false });
  });

  it('UTC-5: an evening visit and the next evening visit do not skip or repeat a day', () => {
    process.env.TZ = 'America/New_York';
    expect(new Date(2024, 0, 1, 12).getTimezoneOffset()).toBe(300);

    vi.setSystemTime(new Date(2024, 0, 14, 20, 0)); // 01:00Z on the 15th
    expect(getDailyLoginStreak()).toEqual({ count: 1, isNew: true });

    vi.setSystemTime(new Date(2024, 0, 15, 20, 0)); // 01:00Z on the 16th
    expect(getDailyLoginStreak()).toEqual({ count: 2, isNew: true });
  });

  it('keeps the streak across the US spring-forward night', () => {
    process.env.TZ = 'America/New_York';
    expect(new Date(2024, 0, 1, 12).getTimezoneOffset()).toBe(300);

    vi.setSystemTime(new Date(2024, 2, 10, 12, 0));
    expect(getDailyLoginStreak().count).toBe(1);

    vi.setSystemTime(new Date(2024, 2, 11, 0, 30));
    expect(getDailyLoginStreak()).toEqual({ count: 2, isNew: true });
  });

  it('resets to 1 after a skipped day', () => {
    process.env.TZ = 'Asia/Jerusalem';
    vi.setSystemTime(new Date(2024, 5, 14, 12, 0));
    getDailyLoginStreak();
    vi.setSystemTime(new Date(2024, 5, 16, 12, 0));
    expect(getDailyLoginStreak()).toEqual({ count: 1, isNew: true });
  });
});
