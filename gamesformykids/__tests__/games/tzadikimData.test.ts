import { describe, expect, it } from 'vitest';
import { CHOFETZ_CHAIM_STORY } from '@/app/games/tzadikim/data/stories/chofetzChaim';

// Hebrew year letters -> Gregorian year (thousands omitted), e.g. תקצ"ח = 598 -> 5598 -> 1838
const LETTER_VALUES: Record<string, number> = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9, י: 10, כ: 20, ל: 30, מ: 40, נ: 50, ס: 60, ע: 70,
  פ: 80, צ: 90, ק: 100, ר: 200, ש: 300, ת: 400,
};
const hebrewYearToGregorian = (letters: string) =>
  5000 + [...letters.replace(/["״']/g, '')].reduce((sum, ch) => sum + (LETTER_VALUES[ch] ?? 0), 0) - 3760;

describe('tzadikim data', () => {
  it('gives the Chofetz Chaim Hebrew years that match the Gregorian years next to them', () => {
    const match = /^(\S+) – (\S+) \((\d{4})–(\d{4})\)$/.exec(CHOFETZ_CHAIM_STORY.years)!;
    const [, bornHe, diedHe, bornGreg, diedGreg] = match;
    // A Hebrew year straddles two Gregorian years, so allow one year of slack.
    expect(Math.abs(hebrewYearToGregorian(bornHe!) - Number(bornGreg))).toBeLessThanOrEqual(1);
    expect(Math.abs(hebrewYearToGregorian(diedHe!) - Number(diedGreg))).toBeLessThanOrEqual(1);
  });
});
