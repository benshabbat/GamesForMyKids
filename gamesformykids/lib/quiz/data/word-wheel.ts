export type WordWheelQuestion = {
  id: number;
  letter: string;
  category: string;
  categoryEmoji: string;
  prompt: string;
  answer: string;
  answerEmoji: string;
  wrongOptions: [string, string, string];
  wrongEmojis: [string, string, string];
};

export const WORD_WHEEL_QUESTIONS: WordWheelQuestion[] = [
  // ── בעלי חיים 🐾 ──────────────────────────────────────────────────────────
  {
    id: 1, letter: 'א', category: 'בעלי חיים', categoryEmoji: '🐾',
    prompt: 'מצא בעל חיים שמתחיל ב-א!',
    answer: 'ארנב', answerEmoji: '🐰',
    wrongOptions: ['כלב', 'נמר', 'פיל'], wrongEmojis: ['🐕', '🐯', '🐘'],
  },
  {
    id: 2, letter: 'נ', category: 'בעלי חיים', categoryEmoji: '🐾',
    prompt: 'מצא בעל חיים שמתחיל ב-נ!',
    answer: 'נמר', answerEmoji: '🐯',
    wrongOptions: ['כלב', 'פיל', 'ארנב'], wrongEmojis: ['🐕', '🐘', '🐰'],
  },
  {
    id: 3, letter: 'פ', category: 'בעלי חיים', categoryEmoji: '🐾',
    prompt: 'מצא בעל חיים שמתחיל ב-פ!',
    answer: 'פיל', answerEmoji: '🐘',
    wrongOptions: ['ארנב', 'נמר', 'חתול'], wrongEmojis: ['🐰', '🐯', '🐈'],
  },
  {
    id: 4, letter: 'ח', category: 'בעלי חיים', categoryEmoji: '🐾',
    prompt: 'מצא בעל חיים שמתחיל ב-ח!',
    answer: 'חתול', answerEmoji: '🐈',
    wrongOptions: ['כלב', 'פיל', 'נמר'], wrongEmojis: ['🐕', '🐘', '🐯'],
  },
  {
    id: 5, letter: 'כ', category: 'בעלי חיים', categoryEmoji: '🐾',
    prompt: 'מצא בעל חיים שמתחיל ב-כ!',
    answer: 'כלב', answerEmoji: '🐕',
    wrongOptions: ['ארנב', 'פיל', 'חתול'], wrongEmojis: ['🐰', '🐘', '🐈'],
  },
  // ── אוכל 🍎 ───────────────────────────────────────────────────────────────
  {
    id: 6, letter: 'ת', category: 'אוכל', categoryEmoji: '🍎',
    prompt: 'מצא אוכל שמתחיל ב-ת!',
    answer: 'תפוח', answerEmoji: '🍎',
    wrongOptions: ['בננה', 'ענב', 'גזר'], wrongEmojis: ['🍌', '🍇', '🥕'],
  },
  {
    id: 7, letter: 'ב', category: 'אוכל', categoryEmoji: '🍎',
    prompt: 'מצא אוכל שמתחיל ב-ב!',
    answer: 'בננה', answerEmoji: '🍌',
    wrongOptions: ['תפוח', 'ענב', 'גזר'], wrongEmojis: ['🍎', '🍇', '🥕'],
  },
  {
    id: 8, letter: 'ג', category: 'אוכל', categoryEmoji: '🍎',
    prompt: 'מצא אוכל שמתחיל ב-ג!',
    answer: 'גזר', answerEmoji: '🥕',
    wrongOptions: ['בננה', 'תפוח', 'לחם'], wrongEmojis: ['🍌', '🍎', '🍞'],
  },
  {
    id: 9, letter: 'ל', category: 'אוכל', categoryEmoji: '🍎',
    prompt: 'מצא אוכל שמתחיל ב-ל!',
    answer: 'לחם', answerEmoji: '🍞',
    wrongOptions: ['גזר', 'תפוח', 'בננה'], wrongEmojis: ['🥕', '🍎', '🍌'],
  },
  {
    id: 10, letter: 'ע', category: 'אוכל', categoryEmoji: '🍎',
    prompt: 'מצא אוכל שמתחיל ב-ע!',
    answer: 'ענב', answerEmoji: '🍇',
    wrongOptions: ['תפוח', 'בננה', 'לחם'], wrongEmojis: ['🍎', '🍌', '🍞'],
  },
  // ── פעלים ⚡ ───────────────────────────────────────────────────────────────
  {
    id: 11, letter: 'ר', category: 'פעלים', categoryEmoji: '⚡',
    prompt: 'מצא פעולה שמתחילה ב-ר!',
    answer: 'רץ', answerEmoji: '🏃',
    wrongOptions: ['קופץ', 'ישן', 'שר'], wrongEmojis: ['🏃‍♂️', '😴', '🎤'],
  },
  {
    id: 12, letter: 'ש', category: 'פעלים', categoryEmoji: '⚡',
    prompt: 'מצא פעולה שמתחילה ב-ש!',
    answer: 'שר', answerEmoji: '🎤',
    wrongOptions: ['רץ', 'קופץ', 'ישן'], wrongEmojis: ['🏃', '🏃‍♂️', '😴'],
  },
  {
    id: 13, letter: 'י', category: 'פעלים', categoryEmoji: '⚡',
    prompt: 'מצא פעולה שמתחילה ב-י!',
    answer: 'ישן', answerEmoji: '😴',
    wrongOptions: ['רץ', 'שר', 'קופץ'], wrongEmojis: ['🏃', '🎤', '🏃‍♂️'],
  },
  {
    id: 14, letter: 'ק', category: 'פעלים', categoryEmoji: '⚡',
    prompt: 'מצא פעולה שמתחילה ב-ק!',
    answer: 'קופץ', answerEmoji: '🤸',
    wrongOptions: ['רץ', 'שר', 'ישן'], wrongEmojis: ['🏃', '🎤', '😴'],
  },
  {
    id: 15, letter: 'כ', category: 'פעלים', categoryEmoji: '⚡',
    prompt: 'מצא פעולה שמתחילה ב-כ!',
    answer: 'כותב', answerEmoji: '✏️',
    wrongOptions: ['רץ', 'ישן', 'שר'], wrongEmojis: ['🏃', '😴', '🎤'],
  },
  // ── שמות 👶 ───────────────────────────────────────────────────────────────
  {
    id: 16, letter: 'ד', category: 'שמות', categoryEmoji: '👶',
    prompt: 'מצא שם שמתחיל ב-ד!',
    answer: 'דוד', answerEmoji: '👦',
    wrongOptions: ['משה', 'נועה', 'רחל'], wrongEmojis: ['👦', '👧', '👧'],
  },
  {
    id: 17, letter: 'מ', category: 'שמות', categoryEmoji: '👶',
    prompt: 'מצא שם שמתחיל ב-מ!',
    answer: 'משה', answerEmoji: '👦',
    wrongOptions: ['דוד', 'רחל', 'נועה'], wrongEmojis: ['👦', '👧', '👧'],
  },
  {
    id: 18, letter: 'ר', category: 'שמות', categoryEmoji: '👶',
    prompt: 'מצא שם שמתחיל ב-ר!',
    answer: 'רחל', answerEmoji: '👧',
    wrongOptions: ['דוד', 'משה', 'נועה'], wrongEmojis: ['👦', '👦', '👧'],
  },
  {
    id: 19, letter: 'נ', category: 'שמות', categoryEmoji: '👶',
    prompt: 'מצא שם שמתחיל ב-נ!',
    answer: 'נועה', answerEmoji: '👧',
    wrongOptions: ['דוד', 'משה', 'רחל'], wrongEmojis: ['👦', '👦', '👧'],
  },
  {
    id: 20, letter: 'א', category: 'שמות', categoryEmoji: '👶',
    prompt: 'מצא שם שמתחיל ב-א!',
    answer: 'אריאל', answerEmoji: '👧',
    wrongOptions: ['משה', 'דוד', 'נועה'], wrongEmojis: ['👦', '👦', '👧'],
  },
  // ── מקומות 🗺️ ─────────────────────────────────────────────────────────────
  {
    id: 21, letter: 'י', category: 'מקומות', categoryEmoji: '🗺️',
    prompt: 'מצא מקום שמתחיל ב-י!',
    answer: 'ירושלים', answerEmoji: '🏙️',
    wrongOptions: ['תל אביב', 'חיפה', 'אילת'], wrongEmojis: ['🌆', '⛴️', '🏝️'],
  },
  {
    id: 22, letter: 'ת', category: 'מקומות', categoryEmoji: '🗺️',
    prompt: 'מצא מקום שמתחיל ב-ת!',
    answer: 'תל אביב', answerEmoji: '🌆',
    wrongOptions: ['ירושלים', 'חיפה', 'אילת'], wrongEmojis: ['🏙️', '⛴️', '🏝️'],
  },
  {
    id: 23, letter: 'ח', category: 'מקומות', categoryEmoji: '🗺️',
    prompt: 'מצא מקום שמתחיל ב-ח!',
    answer: 'חיפה', answerEmoji: '⛴️',
    wrongOptions: ['ירושלים', 'תל אביב', 'אילת'], wrongEmojis: ['🏙️', '🌆', '🏝️'],
  },
  {
    id: 24, letter: 'א', category: 'מקומות', categoryEmoji: '🗺️',
    prompt: 'מצא מקום שמתחיל ב-א!',
    answer: 'אילת', answerEmoji: '🏝️',
    wrongOptions: ['ירושלים', 'תל אביב', 'חיפה'], wrongEmojis: ['🏙️', '🌆', '⛴️'],
  },
  {
    id: 25, letter: 'ב', category: 'מקומות', categoryEmoji: '🗺️',
    prompt: 'מצא מקום שמתחיל ב-ב!',
    answer: 'באר שבע', answerEmoji: '🏜️',
    wrongOptions: ['ירושלים', 'חיפה', 'אילת'], wrongEmojis: ['🏙️', '⛴️', '🏝️'],
  },
];
