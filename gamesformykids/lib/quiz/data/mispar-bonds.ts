export type MisparBondsQuestion = {
  id: number;
  question: string;
  sum: number;
  answer: string;
  emoji: string;
  wrongOptions: [string, string, string];
};

export const HEBREW_NUMBER_NAMES: Record<number, string> = {
  1: 'אֶחָד', 2: 'שְׁתַּיִם', 3: 'שָׁלוֹשׁ', 4: 'אַרְבַּע',
  5: 'חָמֵשׁ', 6: 'שֵׁשׁ', 7: 'שֶׁבַע', 8: 'שְׁמוֹנֶה',
  9: 'תֵּשַׁע', 10: 'עֶשֶׂר',
};

export const MISPAR_BONDS_QUESTIONS: MisparBondsQuestion[] = [
  { id: 1,  question: '1 + __ = 3',   sum: 3,  answer: 'שְׁתַּיִם',  emoji: '🐰', wrongOptions: ['אֶחָד',   'שָׁלוֹשׁ',  'אַרְבַּע'] },
  { id: 2,  question: '2 + __ = 5',   sum: 5,  answer: 'שָׁלוֹשׁ',  emoji: '🍎', wrongOptions: ['שְׁתַּיִם','אַרְבַּע',  'אֶחָד']   },
  { id: 3,  question: '__ + 3 = 7',   sum: 7,  answer: 'אַרְבַּע',  emoji: '⭐', wrongOptions: ['שָׁלוֹשׁ', 'חָמֵשׁ',    'שֵׁשׁ']    },
  { id: 4,  question: '1 + __ = 6',   sum: 6,  answer: 'חָמֵשׁ',    emoji: '🎈', wrongOptions: ['אַרְבַּע', 'שֵׁשׁ',     'שָׁלוֹשׁ'] },
  { id: 5,  question: '__ + 2 = 8',   sum: 8,  answer: 'שֵׁשׁ',     emoji: '🦋', wrongOptions: ['חָמֵשׁ',   'שֶׁבַע',    'אַרְבַּע'] },
  { id: 6,  question: '3 + __ = 10',  sum: 10, answer: 'שֶׁבַע',    emoji: '🌟', wrongOptions: ['שֵׁשׁ',    'שְׁמוֹנֶה', 'חָמֵשׁ']   },
  { id: 7,  question: '__ + 4 = 12',  sum: 12, answer: 'שְׁמוֹנֶה', emoji: '🐶', wrongOptions: ['שֶׁבַע',   'תֵּשַׁע',   'שֵׁשׁ']    },
  { id: 8,  question: '1 + __ = 10',  sum: 10, answer: 'תֵּשַׁע',   emoji: '🍌', wrongOptions: ['שְׁמוֹנֶה','עֶשֶׂר',    'שֶׁבַע']   },
  { id: 9,  question: '__ + 5 = 15',  sum: 15, answer: 'עֶשֶׂר',    emoji: '🎯', wrongOptions: ['תֵּשַׁע',  'שְׁמוֹנֶה', 'שֶׁבַע']   },
  { id: 10, question: '4 + __ = 6',   sum: 6,  answer: 'שְׁתַּיִם',  emoji: '🌈', wrongOptions: ['אֶחָד',   'שָׁלוֹשׁ',  'אַרְבַּע'] },
  { id: 11, question: '__ + 1 = 4',   sum: 4,  answer: 'שָׁלוֹשׁ',  emoji: '🐱', wrongOptions: ['שְׁתַּיִם','אַרְבַּע',  'אֶחָד']   },
  { id: 12, question: '2 + __ = 6',   sum: 6,  answer: 'אַרְבַּע',  emoji: '🍕', wrongOptions: ['שָׁלוֹשׁ', 'חָמֵשׁ',    'שְׁתַּיִם'] },
  { id: 13, question: '__ + 3 = 8',   sum: 8,  answer: 'חָמֵשׁ',    emoji: '🎪', wrongOptions: ['אַרְבַּע', 'שֵׁשׁ',     'שָׁלוֹשׁ'] },
  { id: 14, question: '4 + __ = 10',  sum: 10, answer: 'שֵׁשׁ',     emoji: '🦊', wrongOptions: ['חָמֵשׁ',   'שֶׁבַע',    'אַרְבַּע'] },
  { id: 15, question: '__ + 5 = 12',  sum: 12, answer: 'שֶׁבַע',    emoji: '🌸', wrongOptions: ['שֵׁשׁ',    'שְׁמוֹנֶה', 'חָמֵשׁ']   },
  { id: 16, question: '2 + __ = 10',  sum: 10, answer: 'שְׁמוֹנֶה', emoji: '🚀', wrongOptions: ['שֶׁבַע',   'תֵּשַׁע',   'שֵׁשׁ']    },
  { id: 17, question: '6 + __ = 15',  sum: 15, answer: 'תֵּשַׁע',   emoji: '🎵', wrongOptions: ['שְׁמוֹנֶה','עֶשֶׂר',    'שֶׁבַע']   },
  { id: 18, question: '__ + 6 = 16',  sum: 16, answer: 'עֶשֶׂר',    emoji: '🐘', wrongOptions: ['תֵּשַׁע',  'שְׁמוֹנֶה', 'שֶׁבַע']   },
  { id: 19, question: '3 + __ = 4',   sum: 4,  answer: 'אֶחָד',     emoji: '🍦', wrongOptions: ['שְׁתַּיִם','שָׁלוֹשׁ',  'אַרְבַּע'] },
  { id: 20, question: '__ + 4 = 6',   sum: 6,  answer: 'שְׁתַּיִם',  emoji: '🎸', wrongOptions: ['אֶחָד',   'שָׁלוֹשׁ',  'חָמֵשׁ']   },
  { id: 21, question: '5 + __ = 8',   sum: 8,  answer: 'שָׁלוֹשׁ',  emoji: '🌻', wrongOptions: ['שְׁתַּיִם','אַרְבַּע',  'אֶחָד']   },
  { id: 22, question: '__ + 2 = 6',   sum: 6,  answer: 'אַרְבַּע',  emoji: '🐸', wrongOptions: ['שָׁלוֹשׁ', 'חָמֵשׁ',    'שְׁתַּיִם'] },
  { id: 23, question: '3 + __ = 8',   sum: 8,  answer: 'חָמֵשׁ',    emoji: '🍇', wrongOptions: ['אַרְבַּע', 'שֵׁשׁ',     'שָׁלוֹשׁ'] },
  { id: 24, question: '4 + __ = 10',  sum: 10, answer: 'שֵׁשׁ',     emoji: '🎭', wrongOptions: ['חָמֵשׁ',   'שֶׁבַע',    'אַרְבַּע'] },
  { id: 25, question: '__ + 4 = 11',  sum: 11, answer: 'שֶׁבַע',    emoji: '🦁', wrongOptions: ['שֵׁשׁ',    'שְׁמוֹנֶה', 'חָמֵשׁ']   },
];
