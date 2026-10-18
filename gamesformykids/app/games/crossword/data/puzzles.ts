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

// Grid is 6×6 (rows 0-5, cols 0-5), displayed RTL: col 0 is the rightmost cell, and an
// across answer's letters run from `col` towards higher columns (right-to-left on screen).
// All answers are in Hebrew (no nikud). Every crossing must share the same letter and every
// answer must fit inside the grid — __tests__/games/crosswordPuzzles.test.ts enforces both.
// Clue numbers follow reading order (top row first, right to left) and no two clues start on
// the same cell, since a cell only shows one number.
export const CROSSWORD_PUZZLES: CrosswordPuzzle[] = [
  {
    id: 1,
    title: 'חיות',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 1, answer: 'כבש', clue: 'יש לו צמר לבן ורך', emoji: '🐑' },
      { number: 2, direction: 'down',  row: 0, col: 2, answer: 'ברווז', clue: 'שוחה בבריכה ועושה גע-גע', emoji: '🦆' },
      { number: 3, direction: 'down',  row: 0, col: 5, answer: 'דבורה', clue: 'עפה מפרח לפרח ומכינה דבש', emoji: '🐝' },
      { number: 4, direction: 'down',  row: 1, col: 0, answer: 'נחש', clue: 'זוחל על הבטן ואין לו רגליים', emoji: '🐍' },
      { number: 5, direction: 'across', row: 1, col: 4, answer: 'צב', clue: 'הולך לאט ויש לו שריון', emoji: '🐢' },
      { number: 6, direction: 'across', row: 2, col: 0, answer: 'חמור', clue: 'סוחב משאות ועושה אי-אה', emoji: '🫏' },
      { number: 7, direction: 'across', row: 4, col: 2, answer: 'זברה', clue: 'יש לה פסים בשחור ולבן', emoji: '🦓' },
    ],
  },
  {
    id: 2,
    title: 'פירות',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 2, answer: 'שזיף', clue: 'פרי סגול קטן עם גלעין', emoji: '🟣' },
      { number: 2, direction: 'down',  row: 0, col: 3, answer: 'זית', clue: 'פרי קטן שעושים ממנו שמן', emoji: '🫒' },
      { number: 3, direction: 'down',  row: 1, col: 1, answer: 'קיווי', clue: 'חום ושעיר מבחוץ, ירוק מבפנים', emoji: '🥝' },
      { number: 4, direction: 'across', row: 2, col: 3, answer: 'תמר', clue: 'פרי מתוק שגדל על עץ דקל', emoji: '🌴' },
      { number: 5, direction: 'down',  row: 2, col: 4, answer: 'מלון', clue: 'פרי עגול וכתום מבפנים', emoji: '🍈' },
      { number: 6, direction: 'across', row: 3, col: 0, answer: 'תות', clue: 'פרי קטן, אדום ומתוק', emoji: '🍓' },
      { number: 7, direction: 'across', row: 5, col: 0, answer: 'לימון', clue: 'פרי צהוב וחמוץ', emoji: '🍋' },
    ],
  },
  {
    id: 3,
    title: 'צבעים',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 1, answer: 'תכלת', clue: 'הצבע של השמיים', emoji: '🩵' },
      { number: 2, direction: 'down',  row: 0, col: 2, answer: 'כתום', clue: 'הצבע של גזר', emoji: '🟠' },
      { number: 3, direction: 'down',  row: 1, col: 5, answer: 'אדום', clue: 'הצבע של עגבנייה', emoji: '🔴' },
      { number: 4, direction: 'down',  row: 2, col: 0, answer: 'כחול', clue: 'הצבע של הים', emoji: '🔵' },
      { number: 5, direction: 'across', row: 2, col: 2, answer: 'ורוד', clue: 'הצבע של פלמינגו', emoji: '🦩' },
      { number: 6, direction: 'across', row: 3, col: 0, answer: 'חום', clue: 'הצבע של שוקולד', emoji: '🟤' },
      { number: 7, direction: 'across', row: 5, col: 0, answer: 'לבן', clue: 'הצבע של השלג', emoji: '⬜' },
    ],
  },
  {
    id: 4,
    title: 'אוכל',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 1, col: 1, answer: 'עוגה', clue: 'אוכלים אותה ביום הולדת', emoji: '🎂' },
      { number: 2, direction: 'down',  row: 1, col: 3, answer: 'גבינה', clue: 'עושים אותה מחלב', emoji: '🧀' },
      { number: 3, direction: 'down',  row: 2, col: 5, answer: 'פסטה', clue: 'ספגטי היא סוג של...', emoji: '🍝' },
      { number: 4, direction: 'down',  row: 3, col: 0, answer: 'חלב', clue: 'משקה לבן שמגיע מהפרה', emoji: '🥛' },
      { number: 5, direction: 'across', row: 3, col: 2, answer: 'תירס', clue: 'קלח צהוב עם גרגרים', emoji: '🌽' },
      { number: 6, direction: 'across', row: 5, col: 0, answer: 'ביצה', clue: 'התרנגולת מטילה אותה', emoji: '🥚' },
    ],
  },
  {
    id: 5,
    title: 'בית ספר',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'down',  row: 0, col: 1, answer: 'כיסא', clue: 'יושבים עליו ליד השולחן', emoji: '🪑' },
      { number: 2, direction: 'down',  row: 0, col: 5, answer: 'עיפרון', clue: 'כותבים בו ואפשר למחוק', emoji: '✏️' },
      { number: 3, direction: 'across', row: 1, col: 0, answer: 'כיתה', clue: 'החדר שבו לומדים', emoji: '🏫' },
      { number: 4, direction: 'down',  row: 1, col: 3, answer: 'הפסקה', clue: 'זמן לשחק בחצר', emoji: '⏰' },
      { number: 5, direction: 'across', row: 3, col: 3, answer: 'ספר', clue: 'קוראים בו סיפורים', emoji: '📚' },
      { number: 6, direction: 'across', row: 5, col: 0, answer: 'מורה', clue: 'מלמדת אותנו בכיתה', emoji: '🧑‍🏫' },
    ],
  },
  {
    id: 6,
    title: 'גוף',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'down',  row: 0, col: 0, answer: 'אצבע', clue: 'יש לנו עשר כאלה בידיים', emoji: '☝️' },
      { number: 2, direction: 'down',  row: 0, col: 2, answer: 'אוזן', clue: 'שומעים איתה', emoji: '👂' },
      { number: 3, direction: 'across', row: 1, col: 0, answer: 'צוואר', clue: 'מחבר את הראש לגוף', emoji: '🦒' },
      { number: 4, direction: 'down',  row: 1, col: 4, answer: 'רגל', clue: 'הולכים ורצים איתה', emoji: '🦵' },
      { number: 5, direction: 'across', row: 3, col: 0, answer: 'עין', clue: 'רואים איתה', emoji: '👁️' },
      { number: 6, direction: 'down',  row: 3, col: 1, answer: 'יד', clue: 'מחזיקים בה דברים', emoji: '✋' },
      { number: 7, direction: 'across', row: 3, col: 4, answer: 'לב', clue: 'פועם בתוך החזה', emoji: '❤️' },
      { number: 8, direction: 'down',  row: 3, col: 5, answer: 'בטן', clue: 'האוכל מגיע אליה', emoji: '🍽️' },
      { number: 9, direction: 'across', row: 5, col: 2, answer: 'לשון', clue: 'טועמים איתה', emoji: '👅' },
    ],
  },
  {
    id: 7,
    title: 'חגים',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 0, answer: 'פסח', clue: 'חג היציאה ממצרים', emoji: '🫓' },
      { number: 2, direction: 'down',  row: 0, col: 2, answer: 'חלה', clue: 'לחם קלוע של שבת', emoji: '🍞' },
      { number: 3, direction: 'down',  row: 0, col: 5, answer: 'סביבון', clue: 'מסובבים אותו בחנוכה', emoji: '🪀' },
      { number: 4, direction: 'across', row: 1, col: 2, answer: 'לולב', clue: 'מנענעים אותו בסוכות', emoji: '🌿' },
      { number: 5, direction: 'across', row: 2, col: 0, answer: 'מצה', clue: 'אוכלים אותה בפסח', emoji: '🫓' },
      { number: 6, direction: 'down',  row: 4, col: 2, answer: 'נר', clue: 'מדליקים אותו בשבת ובחנוכה', emoji: '🕯️' },
      { number: 7, direction: 'across', row: 5, col: 2, answer: 'רעשן', clue: 'מרעישים בו כששומעים את המן', emoji: '🪇' },
    ],
  },
  {
    id: 8,
    title: 'טבע',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 1, answer: 'דשא', clue: 'ירוק ורך, משחקים עליו', emoji: '🌱' },
      { number: 2, direction: 'down',  row: 0, col: 3, answer: 'אבן', clue: 'קשה ונמצאת על האדמה', emoji: '🪨' },
      { number: 3, direction: 'across', row: 1, col: 3, answer: 'ברק', clue: 'אור חזק בסערה', emoji: '⚡' },
      { number: 4, direction: 'down',  row: 1, col: 5, answer: 'קשת', clue: 'צבעונית, מופיעה אחרי גשם', emoji: '🌈' },
      { number: 5, direction: 'across', row: 2, col: 1, answer: 'ענן', clue: 'לבן ורך בשמיים', emoji: '☁️' },
      { number: 6, direction: 'down',  row: 2, col: 2, answer: 'נהר', clue: 'מים שזורמים אל הים', emoji: '🏞️' },
      { number: 7, direction: 'across', row: 4, col: 0, answer: 'יער', clue: 'מקום עם הרבה עצים', emoji: '🌲' },
      { number: 8, direction: 'down',  row: 4, col: 1, answer: 'עץ', clue: 'יש לו גזע וענפים', emoji: '🌳' },
    ],
  },
  {
    id: 9,
    title: 'ספורט',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'across', row: 0, col: 1, answer: 'גביע', clue: 'הקבוצה המנצחת מרימה אותו', emoji: '🏆' },
      { number: 2, direction: 'down',  row: 0, col: 3, answer: 'יוגה', clue: 'מתמתחים ונושמים לאט', emoji: '🧘' },
      { number: 3, direction: 'down',  row: 1, col: 0, answer: 'שער', clue: 'מבקיעים אליו גול', emoji: '🥅' },
      { number: 4, direction: 'down',  row: 1, col: 5, answer: 'גלישה', clue: 'עומדים על גלשן בגלים', emoji: '🏄' },
      { number: 5, direction: 'across', row: 2, col: 3, answer: 'גול', clue: 'מה שצועקים כשהכדור נכנס לשער', emoji: '⚽' },
      { number: 6, direction: 'across', row: 3, col: 0, answer: 'ריצה', clue: 'הרגליים עובדות מהר', emoji: '🏃' },
      { number: 7, direction: 'across', row: 5, col: 1, answer: 'קפיצה', clue: 'עולים באוויר ונוחתים', emoji: '🦘' },
    ],
  },
  {
    id: 10,
    title: 'כלי תחבורה',
    gridSize: 6,
    clues: [
      { number: 1, direction: 'down',  row: 0, col: 0, answer: 'מטוס', clue: 'עף בשמיים מהר', emoji: '✈️' },
      { number: 2, direction: 'down',  row: 0, col: 5, answer: 'מכונית', clue: 'נוסעים בה בכביש', emoji: '🚗' },
      { number: 3, direction: 'across', row: 1, col: 0, answer: 'טיל', clue: 'טס לחלל', emoji: '🚀' },
      { number: 4, direction: 'across', row: 3, col: 0, answer: 'סירה', clue: 'שטה באגם או בים', emoji: '⛵' },
      { number: 5, direction: 'down',  row: 3, col: 2, answer: 'רכב', clue: 'שם אחר למכונית', emoji: '🚙' },
      { number: 6, direction: 'across', row: 5, col: 1, answer: 'כבאית', clue: 'מכבה שריפות', emoji: '🚒' },
    ],
  },
];
