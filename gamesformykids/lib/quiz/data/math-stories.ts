export type MathStoryQuestion = {
  id: number;
  question: string;
  answer: string;
  wrongOptions: [string, string, string];
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed';
};

export const MATH_STORY_QUESTIONS: MathStoryQuestion[] = [
  // EASY — single operation, small numbers
  {
    id: 1, emoji: '🍎', difficulty: 'easy', operation: 'subtraction',
    question: 'לאורי יש 7 תפוחים. הוא אכל 3. כמה תפוחים נשארו?',
    answer: '4',
    wrongOptions: ['3', '5', '10'],
  },
  {
    id: 2, emoji: '🐠', difficulty: 'easy', operation: 'addition',
    question: 'באקווריום יש 5 דגים כתומים ו-3 דגים כחולים. כמה דגים יש בסך הכל?',
    answer: '8',
    wrongOptions: ['6', '9', '7'],
  },
  {
    id: 3, emoji: '🌸', difficulty: 'easy', operation: 'addition',
    question: 'אמא קנתה 4 ורדים אדומים ו-6 ורדים צהובים. כמה ורדים קנתה?',
    answer: '10',
    wrongOptions: ['8', '9', '11'],
  },
  {
    id: 4, emoji: '🍪', difficulty: 'easy', operation: 'subtraction',
    question: 'היו 12 עוגיות בקופסה. אכלנו 5. כמה עוגיות נשארו?',
    answer: '7',
    wrongOptions: ['6', '8', '17'],
  },
  {
    id: 5, emoji: '✏️', difficulty: 'easy', operation: 'addition',
    question: 'לדן יש 8 עפרונות. אביו קנה לו עוד 4. כמה עפרונות יש לו עכשיו?',
    answer: '12',
    wrongOptions: ['11', '13', '10'],
  },
  {
    id: 6, emoji: '🐔', difficulty: 'easy', operation: 'subtraction',
    question: 'בלול יש 15 תרנגולות. 6 ברחו. כמה תרנגולות נשארו?',
    answer: '9',
    wrongOptions: ['8', '10', '21'],
  },
  {
    id: 7, emoji: '⚽', difficulty: 'easy', operation: 'addition',
    question: 'קבוצת ילד כבשה 3 שערים בחצי הראשון ו-2 שערים בחצי השני. כמה שערים בסך הכל?',
    answer: '5',
    wrongOptions: ['4', '6', '7'],
  },
  {
    id: 8, emoji: '🎈', difficulty: 'easy', operation: 'subtraction',
    question: 'היו 20 בלונים במסיבה. 7 התפוצצו. כמה בלונים נשארו?',
    answer: '13',
    wrongOptions: ['12', '14', '27'],
  },
  // MEDIUM — two-step or larger numbers
  {
    id: 9, emoji: '📚', difficulty: 'medium', operation: 'division',
    question: 'בכיתה יש 24 ילדים. חצי מהם ילדות. כמה ילדות יש?',
    answer: '12',
    wrongOptions: ['8', '16', '24'],
  },
  {
    id: 10, emoji: '🍕', difficulty: 'medium', operation: 'multiplication',
    question: 'קניתי 3 פיצות. כל פיצה חתוכה ל-8 חתיכות. כמה חתיכות יש בסך הכל?',
    answer: '24',
    wrongOptions: ['11', '16', '32'],
  },
  {
    id: 11, emoji: '💰', difficulty: 'medium', operation: 'subtraction',
    question: 'לשרה יש 30 שקלים. היא קנתה ספר ב-15 שקלים ועיפרון ב-4 שקלים. כמה כסף נשאר לה?',
    answer: '11',
    wrongOptions: ['15', '19', '9'],
  },
  {
    id: 12, emoji: '🎠', difficulty: 'medium', operation: 'multiplication',
    question: 'בגן יש 5 שולחנות. על כל שולחן יושבים 4 ילדים. כמה ילדים יש בגן?',
    answer: '20',
    wrongOptions: ['9', '15', '25'],
  },
  {
    id: 13, emoji: '🚗', difficulty: 'medium', operation: 'division',
    question: 'צריך להסיע 18 ילדים. כל מכונית מסיעה 3 ילדים. כמה מכוניות דרושות?',
    answer: '6',
    wrongOptions: ['5', '7', '9'],
  },
  {
    id: 14, emoji: '🍊', difficulty: 'medium', operation: 'mixed',
    question: 'אמא קנתה 4 חבילות של 5 תפוזים, ועוד 3 תפוזים בודדים. כמה תפוזים יש בסך הכל?',
    answer: '23',
    wrongOptions: ['20', '17', '25'],
  },
  {
    id: 15, emoji: '📦', difficulty: 'medium', operation: 'multiplication',
    question: 'קניתי 3 חבילות של 6 ביסקוויטים. כמה ביסקוויטים יש בסך הכל?',
    answer: '18',
    wrongOptions: ['9', '15', '24'],
  },
  {
    id: 16, emoji: '🏀', difficulty: 'medium', operation: 'mixed',
    question: 'בשחקן כדורסל היה 45 נקודות. בחצי שני הוא קבל 12 נקודות נוספות וקיבל קנס של 4. כמה נקודות יש לו?',
    answer: '53',
    wrongOptions: ['57', '49', '61'],
  },
  {
    id: 17, emoji: '🐑', difficulty: 'medium', operation: 'division',
    question: 'יש 35 כבשים. הרועה מחלק אותן ל-5 עדרים שווים. כמה כבשים בכל עדר?',
    answer: '7',
    wrongOptions: ['5', '6', '8'],
  },
  {
    id: 18, emoji: '🎂', difficulty: 'medium', operation: 'mixed',
    question: 'עוגת יום הולדת חתוכה ל-12 חתיכות. אכלנו 5 חתיכות ונשארו. כמה אחוז נשאר?',
    answer: '7 חתיכות',
    wrongOptions: ['5 חתיכות', '8 חתיכות', '6 חתיכות'],
  },
  // HARD — multi-step or requires choosing the right operation
  {
    id: 19, emoji: '🏫', difficulty: 'hard', operation: 'mixed',
    question: 'בבית הספר יש 6 כיתות. בכל כיתה יש 28 תלמידים. כמה תלמידים יש בבית הספר?',
    answer: '168',
    wrongOptions: ['144', '180', '156'],
  },
  {
    id: 20, emoji: '🌿', difficulty: 'hard', operation: 'mixed',
    question: 'לגינה יש 4 שורות של עצים. בכל שורה 7 עצים. כל עץ נותן 15 תפוזים. כמה תפוזים יש בסך הכל?',
    answer: '420',
    wrongOptions: ['280', '105', '210'],
  },
  {
    id: 21, emoji: '💼', difficulty: 'hard', operation: 'mixed',
    question: 'קיוסק מרוויח 120 שקלים ביום. בשבוע עובד 6 ימים. כמה שקלים ירוויח בחודש של 4 שבועות?',
    answer: '2880',
    wrongOptions: ['2400', '720', '3600'],
  },
  {
    id: 22, emoji: '🚌', difficulty: 'hard', operation: 'mixed',
    question: 'אוטובוס יצא עם 48 נוסעים. ב-3 תחנות עלו 6 נוסעים בכל תחנה, וב-2 תחנות ירדו 8 נוסעים בכל תחנה. כמה נוסעים יש באוטובוס?',
    answer: '46',
    wrongOptions: ['50', '42', '54'],
  },
  {
    id: 23, emoji: '🏊', difficulty: 'hard', operation: 'division',
    question: 'שחיין שחה 500 מטר ב-10 דקות. כמה מטר שחה בדקה אחת?',
    answer: '50',
    wrongOptions: ['25', '100', '40'],
  },
  {
    id: 24, emoji: '🍕', difficulty: 'hard', operation: 'mixed',
    question: '5 חברים חולקים 3 פיצות שוות. כל פיצה ב-60 שקל. כמה ישלם כל אחד?',
    answer: '36',
    wrongOptions: ['30', '40', '45'],
  },
  {
    id: 25, emoji: '🏗️', difficulty: 'hard', operation: 'mixed',
    question: 'בנאי מניח 45 לבנים בשעה. כמה לבנים יניח ב-8 שעות עבודה?',
    answer: '360',
    wrongOptions: ['320', '400', '270'],
  },
];
