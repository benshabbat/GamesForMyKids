export const LETTER_WORDS = [
  { letter: 'א', word: 'אַרְיֵה', emoji: '🦁' },
  { letter: 'ב', word: 'בַּיִת', emoji: '🏠' },
  { letter: 'ג', word: 'גָּמָל', emoji: '🐪' },
  { letter: 'ד', word: 'דָּג', emoji: '🐟' },
  { letter: 'ה', word: 'הַר', emoji: '⛰️' },
  { letter: 'ו', word: 'וֶרֶד', emoji: '🌹' },
  { letter: 'ז', word: 'זְאֵב', emoji: '🐺' },
  { letter: 'ח', word: 'חָתוּל', emoji: '🐱' },
  { letter: 'ט', word: 'טָלֶה', emoji: '🐑' },
  { letter: 'י', word: 'יָרֵחַ', emoji: '🌙' },
  { letter: 'כ', word: 'כֶּלֶב', emoji: '🐶' },
  { letter: 'ל', word: 'לֵב', emoji: '❤️' },
  { letter: 'מ', word: 'מְכוֹנִית', emoji: '🚗' },
  { letter: 'נ', word: 'נָחָשׁ', emoji: '🐍' },
  { letter: 'ס', word: 'סוּס', emoji: '🐴' },
  { letter: 'ע', word: 'עֵץ', emoji: '🌳' },
  { letter: 'פ', word: 'פִּיל', emoji: '🐘' },
  { letter: 'צ', word: 'צָב', emoji: '🐢' },
  { letter: 'ק', word: 'קוֹף', emoji: '🐒' },
  { letter: 'ר', word: 'רַכֶּבֶת', emoji: '🚂' },
  { letter: 'ש', word: 'שֶׁמֶשׁ', emoji: '☀️' },
  { letter: 'ת', word: 'תַּפּוּחַ', emoji: '🍎' },
];

export const ROUNDS_PER_GAME = 5;
export const CATCHES_TO_EVOLVE = 5;
export const MAX_LIVES = 3;
export const BUCKET_W = 90;
export const BUCKET_H = 26;
export const LETTER_RADIUS = 30;
export const SPAWN_INTERVAL = 1000;
export const FALL_SPEED_MIN = 0.14;
export const FALL_SPEED_MAX = 0.22;

export const LETTER_COLORS = [
  '#f43f5e', '#f97316', '#eab308', '#22c55e',
  '#0ea5e9', '#8b5cf6', '#ec4899', '#06b6d4',
];

export type FallingLetter = { id: number; x: number; y: number; vy: number; letter: string; isTarget: boolean };
export type LetterWord = typeof LETTER_WORDS[number];
