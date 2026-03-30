// מילים קשות לכתיב לילדים
export type SpellingWord = {
  id: number;
  word: string;      // התשובה הנכונה
  emoji: string;
  hint: string;
  wrong: [string, string, string]; // 3 שיבושים
};

export const SPELLING_WORDS: SpellingWord[] = [
  { id: 1,  word: 'שמש',       emoji: '☀️', hint: 'מאירה ביום',               wrong: ['שמס', 'שמאש', 'שמסש'] },
  { id: 2,  word: 'ירח',       emoji: '🌙', hint: 'מאיר בלילה',              wrong: ['ירחה', 'יריח', 'יראח'] },
  { id: 3,  word: 'כוכב',      emoji: '⭐', hint: 'נוצץ בשמים',              wrong: ['כוכוב', 'כוב', 'כוכוב'] },
  { id: 4,  word: 'מים',       emoji: '💧', hint: 'שותים אותם',              wrong: ['מיים', 'מאים', 'מים'] },
  { id: 5,  word: 'תפוח',      emoji: '🍎', hint: 'פרי אדום',                wrong: ['תפואח', 'תפוש', 'תפוחח'] },
  { id: 6,  word: 'ספר',       emoji: '📚', hint: 'קוראים אותו',             wrong: ['ספור', 'ספרר', 'סיפר'] },
  { id: 7,  word: 'בית',       emoji: '🏠', hint: 'גרים בו',                 wrong: ['ביית', 'בייט', 'בית'] },
  { id: 8,  word: 'אריה',      emoji: '🦁', hint: 'מלך החיות',              wrong: ['אריא', 'ארייה', 'אריה'] },
  { id: 9,  word: 'ילד',       emoji: '👦', hint: 'ילד קטן',                 wrong: ['יילד', 'ילוד', 'יוולד'] },
  { id: 10, word: 'ירוק',      emoji: '🟢', hint: 'צבע הדשא',               wrong: ['ירואק', 'יארוק', 'ירוקק'] },
  { id: 11, word: 'עץ',        emoji: '🌳', hint: 'גדל באדמה',              wrong: ['אץ', 'עצ', 'עיץ'] },
  { id: 12, word: 'פרח',       emoji: '🌸', hint: 'ריחני וצבעוני',          wrong: ['פרחח', 'פרוח', 'פיירח'] },
  { id: 13, word: 'דג',        emoji: '🐟', hint: 'שוחה בים',               wrong: ['דאג', 'דוג', 'דגג'] },
  { id: 14, word: 'כלב',       emoji: '🐕', hint: 'חיית מחמד',              wrong: ['קלב', 'כלוב', 'כלבב'] },
  { id: 15, word: 'תות',       emoji: '🍓', hint: 'פרי אדום וקטן',          wrong: ['תות', 'תואת', 'תוותת'] },
  { id: 16, word: 'שוקולד',    emoji: '🍫', hint: 'ממתק מתוק',              wrong: ['שוקולוד', 'שוקולט', 'שוקולוד'] },
  { id: 17, word: 'אגרוף',     emoji: '✊', hint: 'יד סגורה',               wrong: ['אגרופ', 'אגגרוף', 'אגריף'] },
  { id: 18, word: 'חברים',     emoji: '👫', hint: 'משחקים ביחד',            wrong: ['חברייים', 'חיברים', 'חברמים'] },
  { id: 19, word: 'גשר',       emoji: '🌉', hint: 'עוברים מעליו',           wrong: ['גישר', 'גשרר', 'גשור'] },
  { id: 20, word: 'מטוס',      emoji: '✈️', hint: 'טס בשמיים',              wrong: ['מאטוס', 'מטואס', 'מיטוס'] },
];

export const QUESTIONS_PER_GAME = 10;
