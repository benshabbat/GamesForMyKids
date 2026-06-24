export type RacerQuestion = {
  id: number;
  question: string;
  answer: string;
  wrongOptions: [string, string, string];
  emoji: string;
};

export const RACER_QUESTIONS: RacerQuestion[] = [
  { id: 1,  question: 'כמה זה 2 + 3?',                   answer: 'חמש',    wrongOptions: ['שלוש',  'שבע',    'שש'],       emoji: '🔢' },
  { id: 2,  question: 'כמה זה 4 + 2?',                   answer: 'שש',     wrongOptions: ['חמש',   'שמונה',  'שבע'],      emoji: '🔢' },
  { id: 3,  question: 'כמה זה 7 - 3?',                   answer: 'ארבע',   wrongOptions: ['שלוש',  'חמש',    'שתיים'],    emoji: '🔢' },
  { id: 4,  question: 'מה הצבע של השמים?',               answer: 'כחול',   wrongOptions: ['ירוק',  'אדום',   'צהוב'],     emoji: '☁️' },
  { id: 5,  question: 'מה הצבע של עשב?',                 answer: 'ירוק',   wrongOptions: ['כחול',  'אדום',   'לבן'],      emoji: '🌿' },
  { id: 6,  question: 'איזה בעל חיים נובח?',             answer: 'כלב',    wrongOptions: ['חתול',  'פרה',    'חמור'],     emoji: '🐕' },
  { id: 7,  question: 'מה הצבע של בננה?',                answer: 'צהוב',   wrongOptions: ['אדום',  'ירוק',   'כחול'],     emoji: '🍌' },
  { id: 8,  question: 'האות הראשונה באלפבית?',           answer: 'אָלֶף',  wrongOptions: ['בֵּית', 'גִּימֶל','דָּלֶת'],  emoji: '🔤' },
  { id: 9,  question: 'האות האחרונה באלפבית?',           answer: 'תָּו',   wrongOptions: ['שִׁין', 'רֵישׁ',  'קוֹף'],    emoji: '🔤' },
  { id: 10, question: 'כמה אצבעות יש ביד?',              answer: 'חמש',    wrongOptions: ['ארבע',  'שש',     'שלוש'],     emoji: '✋' },
  { id: 11, question: 'כמה ימים יש בשבוע?',              answer: 'שבעה',   wrongOptions: ['חמישה', 'עשרה',   'שישה'],     emoji: '📅' },
  { id: 12, question: 'מה הצבע של תפוח אדום?',           answer: 'אדום',   wrongOptions: ['צהוב',  'ירוק',   'כחול'],     emoji: '🍎' },
  { id: 13, question: 'איזה בעל חיים יש לו חטוטרת?',    answer: 'גמל',    wrongOptions: ['סוס',   'כלב',    'פיל'],      emoji: '🐪' },
  { id: 14, question: 'כמה זה 3 × 2?',                   answer: 'שש',     wrongOptions: ['חמש',   'שבע',    'ארבע'],     emoji: '✖️' },
  { id: 15, question: 'מה עושים עם עיפרון?',             answer: 'כותבים', wrongOptions: ['אוכלים','שותים',  'ישנים'],    emoji: '✏️' },
  { id: 16, question: 'מה הצבע של עגבנייה?',             answer: 'אדום',   wrongOptions: ['צהוב',  'ירוק',   'לבן'],      emoji: '🍅' },
  { id: 17, question: 'כמה זה 10 - 5?',                  answer: 'חמש',    wrongOptions: ['שלוש',  'שבע',    'עשר'],      emoji: '🔢' },
  { id: 18, question: 'מה עושה ציפור?',                  answer: 'עפה',    wrongOptions: ['שוחה',  'רצה',    'ישנה'],     emoji: '🐦' },
  { id: 19, question: 'מאיזה בעל חיים מקבלים חלב?',     answer: 'פרה',    wrongOptions: ['כלב',   'חתול',   'עוף'],      emoji: '🐄' },
  { id: 20, question: 'כמה זה 1 + 1?',                   answer: 'שתיים',  wrongOptions: ['שלוש',  'ארבע',   'אחת'],      emoji: '🔢' },
  { id: 21, question: 'מה האות שבאה אחרי א?',            answer: 'בֵּית',  wrongOptions: ['גִּימֶל','דָּלֶת','הֵא'],    emoji: '🔤' },
  { id: 22, question: 'כמה זה 5 + 5?',                   answer: 'עשר',    wrongOptions: ['שמונה', 'תשע',    'שתים עשרה'], emoji: '🔢' },
  { id: 23, question: 'כמה עיניים יש לאדם?',             answer: 'שתיים',  wrongOptions: ['אחת',   'שלוש',   'ארבע'],     emoji: '👁️' },
  { id: 24, question: 'איזה בעל חיים מיאו?',             answer: 'חתול',   wrongOptions: ['כלב',   'פרה',    'כבשה'],     emoji: '🐱' },
  { id: 25, question: 'מה עושים עם ספר?',                answer: 'קוראים', wrongOptions: ['אוכלים','שותים',  'שרים'],     emoji: '📚' },
  { id: 26, question: 'מה הצבע של שמש?',                 answer: 'צהוב',   wrongOptions: ['כחול',  'ירוק',   'לבן'],      emoji: '☀️' },
  { id: 27, question: 'כמה זה 8 - 4?',                   answer: 'ארבע',   wrongOptions: ['חמש',   'שלוש',   'שש'],       emoji: '🔢' },
  { id: 28, question: 'מה עושים עם מגבת?',               answer: 'מתנגבים',wrongOptions: ['אוכלים','שותים',  'ישנים'],    emoji: '🛁' },
  { id: 29, question: 'איזה פרי צהוב וארוך?',            answer: 'בננה',   wrongOptions: ['תפוח',  'ענב',    'תות'],      emoji: '🍌' },
  { id: 30, question: 'כמה זה 6 + 4?',                   answer: 'עשר',    wrongOptions: ['שמונה', 'תשע',    'אחת עשרה'], emoji: '🔢' },
];

export const TOTAL_CHECKPOINTS = 10;
