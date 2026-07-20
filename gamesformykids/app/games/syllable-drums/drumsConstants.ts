export type DrumWord = { word: string; letters: string[] };

export const DRUM_WORDS: DrumWord[] = [
  { word: 'שָׁלוֹם', letters: ['ש', 'ל', 'ו', 'ם'] },
  { word: 'חָתוּל', letters: ['ח', 'ת', 'ו', 'ל'] },
  { word: 'כֶּלֶב', letters: ['כ', 'ל', 'ב'] },
  { word: 'סֵפֶר', letters: ['ס', 'פ', 'ר'] },
  { word: 'יֶלֶד', letters: ['י', 'ל', 'ד'] },
  { word: 'שֶׁמֶשׁ', letters: ['ש', 'מ', 'ש'] },
  { word: 'צִפּוֹר', letters: ['צ', 'י', 'פ', 'ו', 'ר'] },
  { word: 'אַרְיֵה', letters: ['א', 'ר', 'י', 'ה'] },
  { word: 'אַרְנָב', letters: ['א', 'ר', 'נ', 'ב'] },
  { word: 'יָרֵחַ', letters: ['י', 'ר', 'ח'] },
  { word: 'בַּיִת', letters: ['ב', 'י', 'ת'] },
  { word: 'כִּסֵּא', letters: ['כ', 'י', 'ס', 'א'] },
  { word: 'מַיִם', letters: ['מ', 'י', 'מ'] },
  { word: 'אַהֲבָה', letters: ['א', 'ה', 'ב', 'ה'] },
];

export const WORDS_PER_GAME = 8;
export const BEAT_INTERVAL_MS = 700;
export const FALL_DURATION_MS = 1400;
export const HIT_FRAC = 0.73;
export const PERFECT_WINDOW = 160;
export const GOOD_WINDOW = 340;
export const CIRCLE_R = 30;

export type BeatCircle = {
  id: number; letter: string; y: number; vy: number; perfectTimeMs: number;
  tapped: boolean; missed: boolean; ripple: number; rippleOk: boolean;
};
export type BeatScore = 'perfect' | 'good' | 'miss';
export type TapFeedback = { text: string; ok: boolean };

export const CIRCLE_COLORS = ['#f43f5e', '#f97316', '#eab308', '#22c55e', '#0ea5e9', '#8b5cf6'];
