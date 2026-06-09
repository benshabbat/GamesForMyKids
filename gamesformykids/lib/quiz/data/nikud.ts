export type NikudQuestion = {
  id: number;
  syllable: string;
  answer: string;
  wrongOptions: [string, string, string];
};

// Consistent vowel choice labels used across all questions
export const NIKUD_VOWELS = {
  a: 'פַּתַח / קָמַץ — a',
  i: 'חִירִיק — i',
  e: 'צֵירֵי / סֶגּוֹל — e',
  o: 'חוֹלֵם — o',
  u: 'שׁוּרוּק / קֻבּוּץ — u',
} as const;

const { a, i, e, o, u } = NIKUD_VOWELS;

export const NIKUD_QUESTIONS: NikudQuestion[] = [
  // ── פַּתַח (a) ──────────────────────────────────────────────────────────────
  { id: 1,  syllable: 'בַּ', answer: a, wrongOptions: [i, e, o] },
  { id: 2,  syllable: 'מַ',  answer: a, wrongOptions: [u, e, i] },
  { id: 3,  syllable: 'שַׁ',  answer: a, wrongOptions: [e, i, o] },

  // ── קָמַץ (a) ──────────────────────────────────────────────────────────────
  { id: 4,  syllable: 'דָּ',  answer: a, wrongOptions: [i, o, e] },
  { id: 5,  syllable: 'כָּ',  answer: a, wrongOptions: [u, i, o] },

  // ── חִירִיק (i) ─────────────────────────────────────────────────────────────
  { id: 6,  syllable: 'בִּ',  answer: i, wrongOptions: [a, o, e] },
  { id: 7,  syllable: 'מִ',   answer: i, wrongOptions: [a, u, e] },
  { id: 8,  syllable: 'כִּ',  answer: i, wrongOptions: [o, a, e] },
  { id: 9,  syllable: 'לִ',   answer: i, wrongOptions: [u, a, o] },
  { id: 10, syllable: 'שִׁ',  answer: i, wrongOptions: [a, e, o] },

  // ── צֵירֵי (e) ─────────────────────────────────────────────────────────────
  { id: 11, syllable: 'בֵּ',  answer: e, wrongOptions: [a, i, o] },
  { id: 12, syllable: 'מֵ',   answer: e, wrongOptions: [u, a, i] },
  { id: 13, syllable: 'כֵּ',  answer: e, wrongOptions: [i, o, a] },

  // ── סֶגּוֹל (e) ────────────────────────────────────────────────────────────
  { id: 14, syllable: 'כֶּ',  answer: e, wrongOptions: [i, o, a] },
  { id: 15, syllable: 'לֶ',   answer: e, wrongOptions: [u, i, a] },
  { id: 16, syllable: 'שֶׁ',  answer: e, wrongOptions: [a, i, o] },
  { id: 17, syllable: 'מֶ',   answer: e, wrongOptions: [a, u, o] },

  // ── חוֹלֵם (o) ─────────────────────────────────────────────────────────────
  { id: 18, syllable: 'בוֹ',  answer: o, wrongOptions: [a, i, u] },
  { id: 19, syllable: 'מוֹ',  answer: o, wrongOptions: [a, e, i] },
  { id: 20, syllable: 'כּוֹ', answer: o, wrongOptions: [u, a, e] },
  { id: 21, syllable: 'לוֹ',  answer: o, wrongOptions: [i, a, u] },
  { id: 22, syllable: 'שׁוֹ', answer: o, wrongOptions: [a, e, i] },

  // ── שׁוּרוּק (u) ────────────────────────────────────────────────────────────
  { id: 23, syllable: 'בּוּ', answer: u, wrongOptions: [o, i, a] },
  { id: 24, syllable: 'מוּ',  answer: u, wrongOptions: [e, a, o] },
  { id: 25, syllable: 'לוּ',  answer: u, wrongOptions: [o, i, e] },

  // ── קֻבּוּץ (u) ─────────────────────────────────────────────────────────────
  { id: 26, syllable: 'כֻּ',  answer: u, wrongOptions: [i, o, a] },
  { id: 27, syllable: 'שֻׁ',  answer: u, wrongOptions: [o, i, e] },
];
