export type TriviaCategory = 'טבע' | 'מדע' | 'היסטוריה' | 'חלל' | 'בעלי חיים' | 'גוף האדם';

export interface TriviaQuestion {
  id: string;
  category: TriviaCategory;
  question: string;
  answers: string[];
  correctIndex: number;
  funFact: string;
}

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  // טבע
  { id: 't1', category: 'טבע', question: 'מה הצמח הגבוה ביותר בעולם?', answers: ['עץ אלון', 'עץ סקוויה', 'עץ תמר', 'עץ ברוש'], correctIndex: 1, funFact: 'עץ הסקוויה יכול להגיע לגובה של 115 מטר!' },
  { id: 't2', category: 'טבע', question: 'מה נקרא ים המלח בפני ישראל?', answers: ['הים התיכון', 'ים כינרת', 'ים המלח', 'אילת'], correctIndex: 2, funFact: 'ים המלח הוא הנקודה הנמוכה ביותר בעולם!' },
  { id: 't3', category: 'טבע', question: 'מאיזה צמח מכינים שוקולד?', answers: ['וניל', 'קקאו', 'קינמון', 'קפה'], correctIndex: 1, funFact: 'עץ הקאקאו גדל רק באזורים טרופיים חמים!' },
  { id: 't4', category: 'טבע', question: 'כמה עצמות יש לנחש?', answers: ['אפס', 'כמה עשרות', 'מאות', 'בדיוק 100'], correctIndex: 2, funFact: 'לנחש יש בין 200 ל-400 חוליות שדרה!' },
  // מדע
  { id: 'm1', category: 'מדע', question: 'מה קורה כשמחממים מים ל-100 מעלות?', answers: ['הם קופאים', 'הם מתאדים', 'הם נהיים צהובים', 'הם מתרחבים'], correctIndex: 1, funFact: 'מים רותחים הופכים לאדים — כך עובדות מכונות קיטור!' },
  { id: 'm2', category: 'מדע', question: 'מה הגורם לרעם?', answers: ['ענן גדול', 'גשם חזק', 'חשמל בין עננים', 'רוח חזקה'], correctIndex: 2, funFact: 'הברק חם יותר מפני השמש! הוא מחמם את האוויר מהר מאד.' },
  { id: 'm3', category: 'מדע', question: 'מה גורם לשמיים להיות כחולים?', answers: ['מים בשמיים', 'פיזור אור שמש', 'קרח בשמיים', 'ציפורים כחולות'], correctIndex: 1, funFact: 'אור השמש מתפזר באווירה, והצבע הכחול מתפזר הכי הרבה!' },
  { id: 'm4', category: 'מדע', question: 'מה הוא המגנט?', answers: ['אבן חמה', 'חומר שמושך ברזל', 'חומר שמריח', 'חומר צהוב'], correctIndex: 1, funFact: 'כדור הארץ עצמו הוא מגנט ענקי!' },
  // היסטוריה
  { id: 'h1', category: 'היסטוריה', question: 'מי בנה את הפירמידות?', answers: ['הרומאים', 'המצרים העתיקים', 'היוונים', 'הישראלים'], correctIndex: 1, funFact: 'הפירמידה הגדולה של גיזה נבנתה לפני כ-4,500 שנה!' },
  { id: 'h2', category: 'היסטוריה', question: 'מי היה גיבור ישראל הראשון שניצח ענק?', answers: ['שאול', 'יהושע', 'דוד', 'שמשון'], correctIndex: 2, funFact: 'דוד המלך ניצח את גלית עם אבן ומציאל!' },
  { id: 'h3', category: 'היסטוריה', question: 'איפה התרחשו משחקי האולימפיאדה הראשונים?', answers: ['רומא', 'אתונה', 'אולימפיה, יוון', 'פריז'], correctIndex: 2, funFact: 'האולימפיאדה העתיקה החלה ביוון לפני כ-2,800 שנה!' },
  // חלל
  { id: 'c1', category: 'חלל', question: 'מה הכוכב הלכת הקרוב ביותר לשמש?', answers: ['ונוס', 'כדור הארץ', 'מאדים', 'כוכב חמה'], correctIndex: 3, funFact: 'כוכב חמה (מרקורי) סובב את השמש תוך 88 יום בלבד!' },
  { id: 'c2', category: 'חלל', question: 'מה צבע כוכב הלכת מאדים?', answers: ['כחול', 'ירוק', 'אדום', 'לבן'], correctIndex: 2, funFact: 'מאדים אדום בגלל חלודת ברזל על פניו!' },
  { id: 'c3', category: 'חלל', question: 'כמה זמן לוקח לאור מהשמש להגיע לכדור הארץ?', answers: ['1 שנייה', '8 דקות', '1 שעה', '1 יום'], correctIndex: 1, funFact: 'אור נוסע במהירות 300,000 ק"מ לשנייה!' },
  { id: 'c4', category: 'חלל', question: 'מה הכוכב הגדול ביותר במערכת השמש?', answers: ['שבתאי', 'מאדים', 'נגה', 'צדק'], correctIndex: 3, funFact: 'צדק (יופיטר) גדול פי 1,300 מכדור הארץ!' },
  // בעלי חיים
  { id: 'a1', category: 'בעלי חיים', question: 'לאיזה בעל חיים יש מחבט הכי ארוך?', answers: ['ג\'ירף', 'פיל', 'פנגווין', 'נחש'], correctIndex: 0, funFact: 'הצוואר של הגירף יכול להיות באורך 2 מטר!' },
  { id: 'a2', category: 'בעלי חיים', question: 'איזה בעל חיים ישן 20+ שעות ביום?', answers: ['כלב', 'קואלה', 'דג', 'ציפור'], correctIndex: 1, funFact: 'הקואלה ישן הרבה כי עלי האיקליפטוס שהוא אוכל קשים לעיכול!' },
  { id: 'a3', category: 'בעלי חיים', question: 'מה בעל החיים המהיר ביותר ביבשה?', answers: ['אריה', 'נמר', 'צ\'יטה', 'עיט'], correctIndex: 2, funFact: 'הצ\'יטה יכול להגיע ל-120 ק"מ לשעה!' },
  { id: 'a4', category: 'בעלי חיים', question: 'לכמה לבבות יש לתמנון?', answers: ['1', '2', '3', '4'], correctIndex: 2, funFact: 'יש לתמנון 3 לבבות ו-8 ידיים!' },
  // גוף האדם
  { id: 'g1', category: 'גוף האדם', question: 'כמה עצמות יש לאדם בוגר?', answers: ['100', '206', '350', '50'], correctIndex: 1, funFact: 'תינוקות נולדים עם כ-300 עצמות, אבל חלקן מתאחות!' },
  { id: 'g2', category: 'גוף האדם', question: 'מה האיבר הגדול ביותר בגוף?', answers: ['הלב', 'המוח', 'העור', 'הכבד'], correctIndex: 2, funFact: 'העור של מבוגר שוקל כ-4 ק"ג!' },
  { id: 'g3', category: 'גוף האדם', question: 'מאיזה תא בנוי הגוף?', answers: ['אטומים', 'תאים', 'מולקולות', 'חוטים'], correctIndex: 1, funFact: 'גוף האדם מכיל כ-37 טריליון תאים!' },
  { id: 'g4', category: 'גוף האדם', question: 'כמה שיניים יש לאדם בוגר?', answers: ['20', '28-32', '40', '16'], correctIndex: 1, funFact: 'שיניות חלב הן 20, שיניות קבועות הן 32 (כולל בינה)!' },
];

export const CATEGORIES: TriviaCategory[] = ['טבע', 'מדע', 'היסטוריה', 'חלל', 'בעלי חיים', 'גוף האדם'];
export const CATEGORY_EMOJIS: Record<TriviaCategory, string> = {
  'טבע': '🌿', 'מדע': '🔬', 'היסטוריה': '📜', 'חלל': '🚀', 'בעלי חיים': '🐘', 'גוף האדם': '🫀'
};
export const QUESTIONS_PER_GAME = 10;
