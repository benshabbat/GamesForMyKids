export type CannonQuestion = {
  question: string;
  correct: string;
  wrong: [string, string, string];
};

export const CANNON_QUESTIONS: CannonQuestion[] = [
  // Math
  { question: '2 + 3 = ?', correct: '5', wrong: ['4', '6', '7'] },
  { question: '8 - 5 = ?', correct: '3', wrong: ['2', '4', '1'] },
  { question: '4 × 2 = ?', correct: '8', wrong: ['6', '10', '12'] },
  { question: '10 ÷ 2 = ?', correct: '5', wrong: ['3', '4', '6'] },
  { question: '7 + 6 = ?', correct: '13', wrong: ['11', '12', '14'] },
  { question: '9 - 4 = ?', correct: '5', wrong: ['4', '6', '3'] },
  { question: '3 × 3 = ?', correct: '9', wrong: ['6', '12', '8'] },
  { question: '15 ÷ 3 = ?', correct: '5', wrong: ['4', '6', '3'] },
  { question: '6 + 7 = ?', correct: '13', wrong: ['12', '14', '11'] },
  { question: '20 - 8 = ?', correct: '12', wrong: ['10', '11', '13'] },
  // Hebrew vocab
  { question: 'מה הצבע של שמיים?', correct: 'כחול', wrong: ['אדום', 'ירוק', 'צהוב'] },
  { question: 'מה הצבע של עשב?', correct: 'ירוק', wrong: ['כחול', 'אדום', 'לבן'] },
  { question: 'איזה בעל חיים נובח?', correct: 'כלב', wrong: ['חתול', 'ציפור', 'דג'] },
  { question: 'איזה פרי צהוב?', correct: 'בננה', wrong: ['תפוח', 'ענב', 'תות'] },
  { question: 'כמה ימים בשבוע?', correct: '7', wrong: ['5', '6', '8'] },
  { question: 'מה יש לדג?', correct: 'סנפיר', wrong: ['כנפיים', 'אוזניים', 'רגליים'] },
  { question: 'מה הצבע של שמש?', correct: 'צהוב', wrong: ['כתום', 'אדום', 'לבן'] },
  { question: 'איזה חיה אומרת מיאו?', correct: 'חתול', wrong: ['כלב', 'פרה', 'ציפור'] },
  // General
  { question: 'כמה חודשים בשנה?', correct: '12', wrong: ['10', '11', '13'] },
  { question: 'כמה ימים בשבוע?', correct: '7', wrong: ['5', '6', '8'] },
  { question: 'מה צורת גלגל?', correct: 'עיגול', wrong: ['ריבוע', 'משולש', 'מלבן'] },
  { question: 'מה גדול יותר?', correct: 'פיל', wrong: ['כלב', 'חתול', 'עכבר'] },
  { question: 'כמה אצבעות ביד?', correct: '5', wrong: ['4', '6', '3'] },
  { question: 'כמה רגליים לפרה?', correct: '4', wrong: ['2', '3', '6'] },
  { question: 'מה עושים בלילה?', correct: 'ישנים', wrong: ['שוחים', 'אוכלים', 'רצים'] },
  { question: 'איפה שוחים?', correct: 'בבריכה', wrong: ['בגן', 'בכיתה', 'בבית'] },
  { question: 'כמה עיניים לאדם?', correct: '2', wrong: ['1', '3', '4'] },
  { question: 'מה עף בשמיים?', correct: 'ציפור', wrong: ['דג', 'כלב', 'חתול'] },
  { question: 'איזה ירק כתום?', correct: 'גזר', wrong: ['מלפפון', 'עגבניה', 'חסה'] },
];
