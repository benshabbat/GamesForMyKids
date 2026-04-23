// אוכל בריא ותזונה
export type FoodQuestion = {
  id: number;
  food: string;
  emoji: string;
  group: 'פירות' | 'ירקות' | 'חלבונים' | 'פחמימות' | 'מוצרי חלב';
  isHealthy: boolean;
  benefit: string;
  wrongOptions: [string, string, string];
};

export type NutritionQuestion = {
  id: number;
  question: string;
  answers: [string, string, string, string];
  correctIndex: number;
  emoji: string;
  funFact: string;
};

export const FOOD_ITEMS: FoodQuestion[] = [
  { id: 1,  food: 'תפוח',      emoji: '🍎', group: 'פירות',        isHealthy: true,  benefit: 'עשיר בסיבים תזונתיים וויטמין C', wrongOptions: ['ירק', 'חלבון', 'שומן'] },
  { id: 2,  food: 'גזר',       emoji: '🥕', group: 'ירקות',        isHealthy: true,  benefit: 'עשיר בבטא קרוטן לבריאות העיניים', wrongOptions: ['פרי', 'חלב', 'לחם'] },
  { id: 3,  food: 'ביצה',      emoji: '🥚', group: 'חלבונים',      isHealthy: true,  benefit: 'מכיל חלבון איכותי לבניית שרירים', wrongOptions: ['ירק', 'פרי', 'חלב'] },
  { id: 4,  food: 'לחם',       emoji: '🍞', group: 'פחמימות',      isHealthy: true,  benefit: 'מספק אנרגיה לפעילות יומיומית', wrongOptions: ['חלבון', 'ויטמין', 'שמן'] },
  { id: 5,  food: 'חלב',       emoji: '🥛', group: 'מוצרי חלב',    isHealthy: true,  benefit: 'עשיר בסידן לחיזוק עצמות ושיניים', wrongOptions: ['פרי', 'ירק', 'חלבון'] },
  { id: 6,  food: 'בננה',      emoji: '🍌', group: 'פירות',        isHealthy: true,  benefit: 'עשיר באשלגן ואנרגיה מהירה', wrongOptions: ['ירק', 'חלב', 'שומן'] },
  { id: 7,  food: 'ברוקולי',   emoji: '🥦', group: 'ירקות',        isHealthy: true,  benefit: 'עשיר בויטמין K ומונע מחלות', wrongOptions: ['פרי', 'חלבון', 'לחם'] },
  { id: 8,  food: 'שקדים',     emoji: '🥜', group: 'חלבונים',      isHealthy: true,  benefit: 'עשיר בשומנים בריאים ואנרגיה', wrongOptions: ['פרי', 'ירק', 'קמח'] },
];

export const NUTRITION_QUESTIONS: NutritionQuestion[] = [
  { id: 1,  emoji: '🥗', question: 'כמה ספלים של ירקות ופירות מומלץ לאכול כל יום?', answers: ['1', '2-3', '5 ומעלה', '10'],     correctIndex: 2, funFact: 'WHO ממליצה על 5 מנות פירות וירקות ביום!' },
  { id: 2,  emoji: '💧', question: 'כמה כוסות מים מומלץ לשתות ביום?',               answers: ['2', '4', '8', '15'],              correctIndex: 2, funFact: 'גוף האדם מורכב מ-60% מים!' },
  { id: 3,  emoji: '🍊', question: 'איזה ויטמין יש בתפוז שמחזק את מערכת החיסון?',  answers: ['ויטמין A', 'ויטמין B', 'ויטמין C', 'ויטמין D'], correctIndex: 2, funFact: 'ויטמין C עוזר לגוף להילחם בהצטננות!' },
  { id: 4,  emoji: '🥩', question: 'איזה מינרל חשוב בבשר אדום לבנייה הגוף?',        answers: ['ברזל', 'סידן', 'אשלגן', 'מגנזיום'], correctIndex: 0, funFact: 'ברזל חיוני לייצור כדוריות דם אדומות!' },
  { id: 5,  emoji: '☀️', question: 'איזה ויטמין מייצר הגוף מאור שמש?',               answers: ['ויטמין A', 'ויטמין B12', 'ויטמין C', 'ויטמין D'], correctIndex: 3, funFact: 'ויטמין D חיוני לספיגת סידן ובריאות העצמות!' },
  { id: 6,  emoji: '🥛', question: 'מה המינרל החשוב ביותר בחלב לעצמות?',            answers: ['ברזל', 'סידן', 'אשלגן', 'זרחן'], correctIndex: 1, funFact: 'סידן הוא המינרל הנפוץ ביותר בגוף האדם!' },
  { id: 7,  emoji: '🌾', question: 'מה הפחמימה הבריאה יותר — לחם לבן או חיטה מלאה?', answers: ['לבן', 'חיטה מלאה', 'שניהם שווים', 'תלוי בכמות'], correctIndex: 1, funFact: 'לחם חיטה מלאה מכיל פי 3 יותר סיבים מלחם לבן!' },
  { id: 8,  emoji: '🐟', question: 'איזה חומץ חשוב יש בדגים שמועיל למוח?',          answers: ['ויטמין C', 'אומגה 3', 'סידן', 'ברזל'], correctIndex: 1, funFact: 'אומגה 3 מסייע לפעילות תקינה של המוח!' },
  { id: 9,  emoji: '🥦', question: 'איזה ירק נחשב ל"מלך הירקות" מבחינה תזונתית?',   answers: ['גזר', 'מלפפון', 'ברוקולי', 'פלפל'], correctIndex: 2, funFact: 'ברוקולי מכיל יותר ויטמין C מפרי תפוז!' },
  { id: 10, emoji: '🍫', question: 'אוכל מה נחשב ל"לא בריא" ואסור לאכול הרבה ממנו?', answers: ['גזר', 'תפוח', 'שוקולד לבן', 'בננה'], correctIndex: 2, funFact: 'שוקולד לבן מכיל הרבה סוכר ושומן - עדיף לאכול מעט!' },
];

export const QUESTIONS_PER_GAME = 10;
