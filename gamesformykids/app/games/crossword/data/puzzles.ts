'use client';

export interface CrosswordClue {
  number: number;
  direction: 'across' | 'down';
  row: number;
  col: number;
  answer: string;
  clue: string;
  emoji: string;
}

export interface CrosswordPuzzle {
  id: number;
  title: string;
  gridSize: number;
  clues: CrosswordClue[];
}

// Grid is 6×6 (rows 0-5, cols 0-5), RTL: col 0 = rightmost cell.
// All answers are in Hebrew (no nikud). Letters fill left-to-right in grid coords
// but are displayed RTL so col increases going left visually.
export const CROSSWORD_PUZZLES: CrosswordPuzzle[] = [
  {
    id: 1,
    title: 'חיות',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 0, answer: 'כלב',   clue: 'חיית מחמד נובחת',          emoji: '🐕' },
      { number: 2, direction: 'down',   row: 0, col: 0, answer: 'כלב',   clue: 'חיית מחמד נובחת',          emoji: '🐕' },
      { number: 3, direction: 'across', row: 1, col: 1, answer: 'ארנב',  clue: 'קופץ ויש לו אוזניים ארוכות', emoji: '🐇' },
      { number: 4, direction: 'down',   row: 0, col: 2, answer: 'בצל',   clue: 'ירק שמבכה',                 emoji: '🧅' },
      { number: 5, direction: 'across', row: 3, col: 0, answer: 'ברווז', clue: 'שוחה ומגעגע',              emoji: '🦆' },
      { number: 6, direction: 'down',   row: 1, col: 5, answer: 'בקר',   clue: 'נותן לנו חלב',             emoji: '🐄' },
      { number: 7, direction: 'across', row: 5, col: 1, answer: 'זאב',   clue: 'כמו כלב בר',               emoji: '🐺' },
      { number: 8, direction: 'down',   row: 3, col: 3, answer: 'זית',   clue: 'פרי ירוק מלוח',            emoji: '🫒' },
    ],
  },
  {
    id: 2,
    title: 'פירות',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 0, answer: 'תפוח',  clue: 'פרי אדום או ירוק',         emoji: '🍎' },
      { number: 2, direction: 'down',   row: 0, col: 0, answer: 'תות',   clue: 'פרי אדום קטן ומתוק',       emoji: '🍓' },
      { number: 3, direction: 'across', row: 2, col: 1, answer: 'לימון', clue: 'פרי צהוב וחמוץ',           emoji: '🍋' },
      { number: 4, direction: 'down',   row: 0, col: 3, answer: 'ענב',   clue: 'גדל באשכולות',             emoji: '🍇' },
      { number: 5, direction: 'across', row: 4, col: 0, answer: 'מנגו',  clue: 'פרי טרופי כתום',           emoji: '🥭' },
      { number: 6, direction: 'down',   row: 2, col: 5, answer: 'אגס',   clue: 'פרי ירוק בצורת פעמון',     emoji: '🍐' },
      { number: 7, direction: 'across', row: 1, col: 0, answer: 'אבטיח', clue: 'גדול ירוק אדום מבפנים',    emoji: '🍉' },
    ],
  },
  {
    id: 3,
    title: 'צבעים',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 0, answer: 'אדום',  clue: 'צבע של אש',                emoji: '🔴' },
      { number: 2, direction: 'down',   row: 0, col: 0, answer: 'אדום',  clue: 'צבע של אש',                emoji: '🔴' },
      { number: 3, direction: 'across', row: 2, col: 0, answer: 'כחול',  clue: 'צבע של הים',               emoji: '🔵' },
      { number: 4, direction: 'down',   row: 0, col: 3, answer: 'ורוד',  clue: 'צבע רומנטי ורך',          emoji: '🌸' },
      { number: 5, direction: 'across', row: 4, col: 1, answer: 'ירוק',  clue: 'צבע של עשב',              emoji: '🟢' },
      { number: 6, direction: 'down',   row: 2, col: 5, answer: 'לבן',   clue: 'צבע של שלג',              emoji: '⬜' },
      { number: 7, direction: 'across', row: 1, col: 1, answer: 'צהוב',  clue: 'צבע של שמש',              emoji: '🌞' },
    ],
  },
  {
    id: 4,
    title: 'אוכל',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 0, answer: 'לחם',   clue: 'אופים בתנור ואוכלים',      emoji: '🍞' },
      { number: 2, direction: 'down',   row: 0, col: 0, answer: 'לחם',   clue: 'אופים בתנור ואוכלים',      emoji: '🍞' },
      { number: 3, direction: 'across', row: 2, col: 0, answer: 'גבינה', clue: 'עשוי מחלב',                emoji: '🧀' },
      { number: 4, direction: 'down',   row: 0, col: 2, answer: 'חלב',   clue: 'שתייה לבנה מהפרה',         emoji: '🥛' },
      { number: 5, direction: 'across', row: 4, col: 0, answer: 'ביצה',  clue: 'הכל אוכל לארוחת בוקר',    emoji: '🥚' },
      { number: 6, direction: 'down',   row: 2, col: 5, answer: 'עגל',   clue: 'בן פרה צעיר',              emoji: '🐮' },
      { number: 7, direction: 'across', row: 1, col: 1, answer: 'פיצה',  clue: 'אוכל עגול עם גבינה',       emoji: '🍕' },
    ],
  },
  {
    id: 5,
    title: 'בית ספר',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 0, answer: 'ספר',   clue: 'קוראים בו',               emoji: '📚' },
      { number: 2, direction: 'down',   row: 0, col: 0, answer: 'ספר',   clue: 'קוראים בו',               emoji: '📚' },
      { number: 3, direction: 'across', row: 2, col: 0, answer: 'עיפרון',clue: 'כותבים ומוחקים',           emoji: '✏️' },
      { number: 4, direction: 'down',   row: 0, col: 2, answer: 'עט',    clue: 'כותבים בדיו',              emoji: '🖊️' },
      { number: 5, direction: 'across', row: 4, col: 1, answer: 'מחק',   clue: 'מוחק טעויות',             emoji: '✏️' },
      { number: 6, direction: 'down',   row: 1, col: 5, answer: 'שולחן', clue: 'יושבים ממנו',             emoji: '📋' },
      { number: 7, direction: 'across', row: 1, col: 1, answer: 'כיתה', clue: 'לומדים בה',               emoji: '🏫' },
    ],
  },
  {
    id: 6,
    title: 'גוף',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 0, answer: 'יד',    clue: 'כותבים ומחזיקים',          emoji: '✋' },
      { number: 2, direction: 'down',   row: 0, col: 0, answer: 'יד',    clue: 'כותבים ומחזיקים',          emoji: '✋' },
      { number: 3, direction: 'across', row: 2, col: 0, answer: 'אוזן',  clue: 'שומעים בה',               emoji: '👂' },
      { number: 4, direction: 'down',   row: 0, col: 1, answer: 'אף',    clue: 'מריחים בו',               emoji: '👃' },
      { number: 5, direction: 'across', row: 4, col: 0, answer: 'פה',    clue: 'מדברים ואוכלים',           emoji: '👄' },
      { number: 6, direction: 'down',   row: 2, col: 4, answer: 'עין',   clue: 'רואים בה',                emoji: '👁️' },
      { number: 7, direction: 'across', row: 1, col: 1, answer: 'רגל',   clue: 'הולכים ורצים',            emoji: '🦵' },
    ],
  },
  {
    id: 7,
    title: 'חגים',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 0, answer: 'חנוכה', clue: 'חג האורות',               emoji: '🕎' },
      { number: 2, direction: 'down',   row: 0, col: 0, answer: 'חנוכה', clue: 'חג האורות',               emoji: '🕎' },
      { number: 3, direction: 'across', row: 1, col: 1, answer: 'פורים', clue: 'חג תחפושות',              emoji: '🎭' },
      { number: 4, direction: 'down',   row: 0, col: 5, answer: 'פסח',   clue: 'יוצאים ממצרים',          emoji: '🫓' },
      { number: 5, direction: 'across', row: 3, col: 0, answer: 'סוכות', clue: 'ישבים בסוכה',             emoji: '🌿' },
      { number: 6, direction: 'down',   row: 1, col: 3, answer: 'שבת',   clue: 'יום מנוחה',               emoji: '🕯️' },
      { number: 7, direction: 'across', row: 5, col: 0, answer: 'שלום',  clue: 'ברכת שלום',               emoji: '🕊️' },
    ],
  },
  {
    id: 8,
    title: 'טבע',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 0, answer: 'עץ',    clue: 'צומח ביער',               emoji: '🌲' },
      { number: 2, direction: 'down',   row: 0, col: 0, answer: 'עץ',    clue: 'צומח ביער',               emoji: '🌲' },
      { number: 3, direction: 'across', row: 2, col: 0, answer: 'ים',    clue: 'מים כחולים גדולים',        emoji: '🌊' },
      { number: 4, direction: 'down',   row: 0, col: 2, answer: 'הר',    clue: 'גבוה מאוד',               emoji: '⛰️' },
      { number: 5, direction: 'across', row: 4, col: 1, answer: 'חול',   clue: 'בחוף הים',                emoji: '🏖️' },
      { number: 6, direction: 'down',   row: 1, col: 5, answer: 'ענן',   clue: 'בשמיים לבן',              emoji: '☁️' },
      { number: 7, direction: 'across', row: 1, col: 1, answer: 'ירח',   clue: 'זורח בלילה',              emoji: '🌙' },
    ],
  },
  {
    id: 9,
    title: 'ספורט',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 0, answer: 'כדור',  clue: 'עגול ומקפץ',              emoji: '⚽' },
      { number: 2, direction: 'down',   row: 0, col: 0, answer: 'כדור',  clue: 'עגול ומקפץ',              emoji: '⚽' },
      { number: 3, direction: 'across', row: 2, col: 0, answer: 'שחייה', clue: 'ספורט במים',              emoji: '🏊' },
      { number: 4, direction: 'down',   row: 0, col: 4, answer: 'שחמט',  clue: 'משחק לוח עם מלך',        emoji: '♟️' },
      { number: 5, direction: 'across', row: 4, col: 0, answer: 'ריצה',  clue: 'הרגליים עובדות מהר',      emoji: '🏃' },
      { number: 6, direction: 'down',   row: 2, col: 5, answer: 'שלג',   clue: 'לבן וקר',                emoji: '❄️' },
      { number: 7, direction: 'across', row: 1, col: 1, answer: 'גולש',  clue: 'גולש על גלים',            emoji: '🏄' },
    ],
  },
  {
    id: 10,
    title: 'כלי תחבורה',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 0, answer: 'מכונית', clue: 'נוסעים בה בכביש',        emoji: '🚗' },
      { number: 2, direction: 'down',   row: 0, col: 0, answer: 'מסוק',  clue: 'עף עם ספינר',             emoji: '🚁' },
      { number: 3, direction: 'across', row: 2, col: 0, answer: 'אוטובוס', clue: 'גדול ומסיע הרבה',      emoji: '🚌' },
      { number: 4, direction: 'down',   row: 0, col: 3, answer: 'ספינה', clue: 'שטה בים',                emoji: '🚢' },
      { number: 5, direction: 'across', row: 4, col: 0, answer: 'רכבת',  clue: 'נוסעת על פסים',           emoji: '🚂' },
      { number: 6, direction: 'down',   row: 2, col: 5, answer: 'מטוס',  clue: 'עף בשמיים מהר',           emoji: '✈️' },
      { number: 7, direction: 'across', row: 1, col: 1, answer: 'אופניים', clue: 'שתי גלגלים ודוושים',  emoji: '🚲' },
    ],
  },
];
