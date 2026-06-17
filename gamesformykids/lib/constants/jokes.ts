export type JokeCategory = 'animals' | 'school' | 'food';

export interface Joke {
  id: number;
  category: JokeCategory;
  setup: string;
  punchline: string;
  emoji: string;
}

export const JOKES: Joke[] = [
  // Animals — בעלי חיים
  { id: 1,  category: 'animals', emoji: '🐟', setup: 'למה הדג לא הלך לבית ספר?',           punchline: 'כי הוא כבר ים חכם! 😂' },
  { id: 2,  category: 'animals', emoji: '🐘', setup: 'למה לפיל לא יכול להסתתר?',           punchline: 'כי הוא תמיד בולט! 😄' },
  { id: 3,  category: 'animals', emoji: '🐸', setup: 'מה אומר הצפרדע לחברו?',              punchline: 'כבה לי, ידידי! 🐸' },
  { id: 4,  category: 'animals', emoji: '🐶', setup: 'איך הכלב אומר שלום?',               punchline: 'הב הב הב — שלום רב! 🐾' },
  { id: 5,  category: 'animals', emoji: '🐱', setup: 'למה החתול ישב על המחשב?',            punchline: 'כי הוא רצה לשמור על העכבר! 😹' },
  { id: 6,  category: 'animals', emoji: '🐧', setup: 'מה הפינגווין עשה בחוף הים?',         punchline: 'הוא הצטנן — כמו תמיד! ❄️' },
  { id: 7,  category: 'animals', emoji: '🐄', setup: 'למה הפרה עברה את הכביש?',            punchline: 'כי היה שם עשב ירוק יותר! 🌿' },
  { id: 8,  category: 'animals', emoji: '🦁', setup: 'מה אומר הארי כשנפגש עם חמשה אחרים?', punchline: 'מה ה-ה-הזדמנות! 🦁' },
  { id: 9,  category: 'animals', emoji: '🐰', setup: 'מה אוכלים ארנבות מרקיסות?',          punchline: 'גזר בשמפניה! 🥕' },
  { id: 10, category: 'animals', emoji: '🐍', setup: 'למה הנחש קיבל ציון גרוע?',           punchline: 'כי לא הצליח להחזיק עט! 😂' },
  { id: 11, category: 'animals', emoji: '🦊', setup: 'מה עושה שועל שמרגיש עצוב?',          punchline: 'בוכה כמו גור! 🦊' },
  { id: 12, category: 'animals', emoji: '🐻', setup: 'למה הדב לא שמע את השעון?',           punchline: 'כי הוא ישן כל החורף! 😴' },

  // School — בית ספר
  { id: 13, category: 'school', emoji: '📚', setup: 'למה הספר ביקש הפסקה?',               punchline: 'כי היו בו יותר מדי פרקים! 😄' },
  { id: 14, category: 'school', emoji: '✏️', setup: 'מה אמר העיפרון לדף?',                punchline: 'כבר ציירתי עליך! ✏️' },
  { id: 15, category: 'school', emoji: '🎒', setup: 'למה התיק לא הצליח לרוץ?',            punchline: 'כי היה עמוס בשיעורי בית! 🎒' },
  { id: 16, category: 'school', emoji: '📐', setup: 'למה המחשבון עצוב?',                  punchline: 'כי הוא סה"כ בעניין! 🔢' },
  { id: 17, category: 'school', emoji: '🍎', setup: 'מה עשה התלמיד עם תפוח המורה?',      punchline: 'אכל אותו ואמר: זה היה חינוכי! 😂' },
  { id: 18, category: 'school', emoji: '🖊️', setup: 'למה העט לא יכול לשמור סוד?',        punchline: 'כי הוא תמיד מוציא לאור! 📝' },
  { id: 19, category: 'school', emoji: '📏', setup: 'מה אמרה הסרגל לעיפרון?',            punchline: 'אתה מאוד ישר! 📏' },
  { id: 20, category: 'school', emoji: '🔬', setup: 'למה המיקרוסקופ פחד?',               punchline: 'כי ראה דברים גדולים יותר מדי! 😨' },
  { id: 21, category: 'school', emoji: '🎓', setup: 'מה ההבדל בין מורה לרכבת?',           punchline: 'המורה אומר: תוציאו הגומי! הרכבת אומרת: תשמרו על הפסים! 🚂' },
  { id: 22, category: 'school', emoji: '📓', setup: 'למה המחברת בכתה?',                   punchline: 'כי היו בה הרבה שגיאות! 😢' },
  { id: 23, category: 'school', emoji: '🎨', setup: 'מה אמר הצבע האדום לצבע הכחול?',     punchline: 'אני צובע ממך! 🎨' },
  { id: 24, category: 'school', emoji: '📊', setup: 'למה הגרף עלה למעלה?',               punchline: 'כי הוא רצה להגיע לפסגה! 📈' },

  // Food — אוכל
  { id: 25, category: 'food', emoji: '🍕', setup: 'למה הפיצה לא הצטחקה?',               punchline: 'כי היא הייתה עגולה מאוד! 🍕' },
  { id: 26, category: 'food', emoji: '🍌', setup: 'מה אמרה הבננה לתפוח?',               punchline: 'הי, אתה מאוד אדום היום! 🍎' },
  { id: 27, category: 'food', emoji: '🥕', setup: 'למה הגזר עצוב?',                     punchline: 'כי כולם רוצים לנגוס בו! 😄' },
  { id: 28, category: 'food', emoji: '🥚', setup: 'מה אמר הביצה לחבה?',                 punchline: 'אתה מחמם את ליבי! 🍳' },
  { id: 29, category: 'food', emoji: '🍦', setup: 'למה הגלידה בכתה?',                   punchline: 'כי הילד לקח ממנה כדור! 🍦' },
  { id: 30, category: 'food', emoji: '🥪', setup: 'מה אמר הכריך לחלב?',                punchline: 'אתה מלבין את שמי! 🥛' },
  { id: 31, category: 'food', emoji: '🍫', setup: 'למה השוקולד כל כך פופולרי?',          punchline: 'כי כולם נמסים ממנו! 😍' },
  { id: 32, category: 'food', emoji: '🍇', setup: 'מה אמר הענב לחברו?',                 punchline: 'אני כזה מרוסק היום! 🍷' },
  { id: 33, category: 'food', emoji: '🥜', setup: 'למה הבוטן התגלגל ברחוב?',            punchline: 'כי הוא ניסה לברוח מחמאת הבוטנים! 😂' },
  { id: 34, category: 'food', emoji: '🍰', setup: 'מה אמרה העוגה לנרות?',              punchline: 'תפסיקו להצית אותי! 🎂' },
  { id: 35, category: 'food', emoji: '🥦', setup: 'למה הברוקולי לא רצה להיאכל?',       punchline: 'כי הוא לא רצה להיות ירוק מכעס! 🥦' },
  { id: 36, category: 'food', emoji: '🍓', setup: 'מה אמרה התות לאוכל שלה?',           punchline: 'אתה מאוד מתוק איתי! 💕' },
];

export const CATEGORY_LABELS: Record<JokeCategory, string> = {
  animals: '🐾 בעלי חיים',
  school:  '📚 בית ספר',
  food:    '🍕 אוכל',
};

export const CATEGORY_COLORS: Record<JokeCategory, string> = {
  animals: 'from-green-400 to-emerald-500',
  school:  'from-blue-400 to-indigo-500',
  food:    'from-orange-400 to-amber-500',
};
