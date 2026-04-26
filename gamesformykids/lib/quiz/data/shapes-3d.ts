// גופים גיאומטריים תלת-ממדיים
export type Shape3DQuestion = {
  id: number;
  shape: string;
  emoji: string;
  faces: number;
  edges: number;
  vertices: number;
  realExample: string;
  description: string;
  wrongOptions: [string, string, string];
};

export type QuestionType = 'name' | 'faces' | 'example';

export const SHAPES_3D: Shape3DQuestion[] = [
  { id: 1,  shape: 'קובייה',          emoji: '🎲', faces: 6,  edges: 12, vertices: 8,  realExample: 'קוביית משחק',  description: '6 פנים ריבועיים שווים',           wrongOptions: ['מנסרה', 'פירמידה', 'כדור'] },
  { id: 2,  shape: 'כדור',            emoji: '⚽', faces: 0,  edges: 0,  vertices: 0,  realExample: 'כדור כדורגל',   description: 'גוף עגול ללא פנים שטוחים',        wrongOptions: ['קובייה', 'גליל', 'חרוט'] },
  { id: 3,  shape: 'גליל',            emoji: '🥫', faces: 3,  edges: 2,  vertices: 0,  realExample: 'פחית שתייה',    description: '2 מעגלים עם מלבן מסביב',          wrongOptions: ['קובייה', 'כדור', 'מנסרה'] },
  { id: 4,  shape: 'חרוט',            emoji: '🍦', faces: 2,  edges: 1,  vertices: 1,  realExample: 'גלידת קרם',     description: 'עיגול בסיס עם צד מחודד',          wrongOptions: ['גליל', 'פירמידה', 'כדור'] },
  { id: 5,  shape: 'פירמידה',         emoji: '🔺', faces: 5,  edges: 8,  vertices: 5,  realExample: 'פירמידה של מצרים', description: 'בסיס ריבועי עם 4 משולשים',     wrongOptions: ['קובייה', 'מנסרה', 'חרוט'] },
  { id: 6,  shape: 'מנסרה משולשת',    emoji: '🔷', faces: 5,  edges: 9,  vertices: 6,  realExample: 'אוהל עם בסיס',  description: '2 משולשים ו-3 מלבנים',           wrongOptions: ['קובייה', 'פירמידה', 'גליל'] },
  { id: 7,  shape: 'תיבה',            emoji: '📦', faces: 6,  edges: 12, vertices: 8,  realExample: 'קופסת נעליים',  description: '6 פנים מלבניים (לאו בהכרח ריבועים)', wrongOptions: ['קובייה', 'פירמידה', 'גליל'] },
  { id: 8,  shape: 'כדורי (ספירה)',   emoji: '🌐', faces: 0,  edges: 0,  vertices: 0,  realExample: 'כדור הארץ',     description: 'גוף סגור ועגול מכל כיוון',        wrongOptions: ['גליל', 'חרוט', 'קובייה'] },
];

export const QUIZ_QUESTIONS = [
  { qId: 1,  shapeId: 1, type: 'name'    as QuestionType, question: 'איזה גוף גיאומטרי יש ל-6 פנים ריבועיים שווים?', answer: 'קובייה' },
  { qId: 2,  shapeId: 2, type: 'name'    as QuestionType, question: 'איזה גוף גיאומטרי עגול לחלוטין ללא פנים שטוחים?', answer: 'כדור' },
  { qId: 3,  shapeId: 3, type: 'name'    as QuestionType, question: 'איזה גוף הוא כמו פחית שתייה?', answer: 'גליל' },
  { qId: 4,  shapeId: 4, type: 'name'    as QuestionType, question: 'איזה גוף נראה כמו גלידת קרם?', answer: 'חרוט' },
  { qId: 5,  shapeId: 5, type: 'name'    as QuestionType, question: 'איזה גוף יש לו בסיס ריבועי ו-4 פנים משולשים?', answer: 'פירמידה' },
  { qId: 6,  shapeId: 1, type: 'faces'   as QuestionType, question: 'כמה פנים יש לקובייה?', answer: '6' },
  { qId: 7,  shapeId: 5, type: 'faces'   as QuestionType, question: 'כמה פנים יש לפירמידה?', answer: '5' },
  { qId: 8,  shapeId: 3, type: 'example' as QuestionType, question: 'דוגמה לגליל בחיי היומיום:', answer: 'פחית שתייה' },
  { qId: 9,  shapeId: 4, type: 'example' as QuestionType, question: 'דוגמה לחרוט בחיי היומיום:', answer: 'גלידת קרם' },
  { qId: 10, shapeId: 6, type: 'name'    as QuestionType, question: 'גוף עם 2 פנים משולשים ו-3 פנים מלבניים:', answer: 'מנסרה משולשת' },
];

export type Shape3DQuizQuestion = typeof QUIZ_QUESTIONS[number];
