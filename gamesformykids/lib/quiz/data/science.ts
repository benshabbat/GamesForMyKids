export type ScienceTopic = 'גוף' | 'חלל' | 'טבע' | 'פיזיקה' | 'כימיה';

export interface ScienceQuestion {
  id: string;
  topic: ScienceTopic;
  emoji: string;
  question: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
}

export const SCIENCE_QUESTIONS: ScienceQuestion[] = [
  // גוף
  { id: 's1', topic: 'גוף', emoji: '❤️', question: 'כמה פעמים הלב פועם בדקה בממוצע?', answers: ['20-30', '60-100', '150-200', '5-10'], correctIndex: 1, explanation: 'הלב פועם כ-70 פעמים בדקה — ולכל החיים!' },
  { id: 's2', topic: 'גוף', emoji: '🫁', question: 'איזה גז אנו נושמים?', answers: ['חנקן', 'חמצן', 'פחמן דו-חמצני', 'מימן'], correctIndex: 1, explanation: 'אנו שואפים חמצן ופולטים פחמן דו-חמצני.' },
  { id: 's3', topic: 'גוף', emoji: '🧠', question: 'לאיזה חלק בגוף שולח המוח פקודות?', answers: ['רק לרגליים', 'לכל הגוף', 'רק לידיים', 'רק לאינפנטריים'], correctIndex: 1, explanation: 'המוח הוא ה"מחשב" שמנהל את כל הגוף!' },
  { id: 's4', topic: 'גוף', emoji: '🦴', question: 'מה מייצרות העצמות?', answers: ['שומן', 'תאי דם', 'חמצן', 'עצבים'], correctIndex: 1, explanation: 'בתוך העצמות יש מח עצם שמייצר תאי דם!' },
  // חלל
  { id: 'c1', topic: 'חלל', emoji: '🌙', question: 'משך כמה זמן הירח מסתובב סביב כדור הארץ?', answers: ['7 ימים', '14 ימים', 'חודש', 'שנה'], correctIndex: 2, explanation: 'פעם בחודש — זאת מקור המילה "חודש"!' },
  { id: 'c2', topic: 'חלל', emoji: '☄️', question: 'מה הוא מטאוריט?', answers: ['כוכב מת', 'אבן שנופלת מהחלל', 'כוכב שלמה', 'ענן'], correctIndex: 1, explanation: 'מטאוריטים הם סלעים מהחלל שמגיעים לכדור הארץ!' },
  { id: 'c3', topic: 'חלל', emoji: '🌟', question: 'מה הכוכב הבא בבהירות אחרי השמש?', answers: ['ירח', 'נגה', 'צדק', 'שבתאי'], correctIndex: 1, explanation: 'נגה (ונוס) הוא הכוכב הלכת הבהיר ביותר בשמיים!' },
  // טבע
  { id: 'n1', topic: 'טבע', emoji: '🌊', question: 'כמה אחוז מהמים בעולם הם מים מתוקים?', answers: ['50%', '3%', '20%', '70%'], correctIndex: 1, explanation: 'רק 3% מהמים בעולם הם מתוקים — ורובם קפואים!' },
  { id: 'n2', topic: 'טבע', emoji: '🌱', question: 'מה הצמחים צריכים כדי לגדול?', answers: ['רק מים', 'אוויר ומים', 'שמש, מים, ומינרלים', 'רק אדמה'], correctIndex: 2, explanation: 'הצמח עושה "בישול שמש" — זה נקרא פוטוסינתזה!' },
  { id: 'n3', topic: 'טבע', emoji: '🦋', question: 'מה שם הגלגל שממנו יוצאת פרפרה?', answers: ['ביצה', 'קוקון', 'זחל', 'שלד'], correctIndex: 1, explanation: 'הגלגל נקרא "גולם" או "קוקון" — שם הפרפר מתגלם!' },
  { id: 'n4', topic: 'טבע', emoji: '⚡', question: 'מה גורם לברק?', answers: ['התנגשות עננים', 'חשמל אותו הצטבר בעננים', 'אש בשמיים', 'כוכבים נופלים'], correctIndex: 1, explanation: 'ברק הוא פרוץ של חשמל סטטי ענקי!' },
  // פיזיקה
  { id: 'p1', topic: 'פיזיקה', emoji: '🎯', question: 'למה חפצים נופלים לאדמה?', answers: ['בגלל כובד', 'בגלל כוח המשיכה', 'בגלל רוח', 'בגלל שהם כבדים'], correctIndex: 1, explanation: 'כוח המשיכה (גרביטציה) מושך כל דבר לכיוון מרכז כדור הארץ!' },
  { id: 'p2', topic: 'פיזיקה', emoji: '🌈', question: 'מה גורם לקשת בענן?', answers: ['ציפורים צבעוניות', 'פיזור אור בטיפות מים', 'צבע בשמיים', 'קסם'], correctIndex: 1, explanation: 'כשאור שמש עובר דרך טיפות גשם — הוא מתפצל לצבעים!' },
  { id: 'p3', topic: 'פיזיקה', emoji: '🔊', question: 'מה הוא קול?', answers: ['צבע שנע', 'גל שנע דרך אוויר', 'חשמל', 'אור מהיר'], correctIndex: 1, explanation: 'קול הוא תנודות שעוברות דרך אוויר לאוזנינו!' },
  // כימיה
  { id: 'k1', topic: 'כימיה', emoji: '💧', question: 'ממה מורכב מים?', answers: ['מחמצן בלבד', 'ממימן וחמצן', 'ממלח ומים', 'מנוזל כחול'], correctIndex: 1, explanation: 'נוסחת מים היא H₂O — שני אטומי מימן ואחד חמצן!' },
  { id: 'k2', topic: 'כימיה', emoji: '🍋', question: 'לימון הוא...?', answers: ['בסיסי', 'חומצי', 'ניטרלי', 'מלוח'], correctIndex: 1, explanation: 'לימון מכיל חומצה לימונית — לכן הוא טועם חמוץ!' },
];

export const TOPICS: ScienceTopic[] = ['גוף', 'חלל', 'טבע', 'פיזיקה', 'כימיה'];
export const TOPIC_EMOJIS: Record<ScienceTopic, string> = {
  'גוף': '🫀', 'חלל': '🚀', 'טבע': '🌿', 'פיזיקה': '⚡', 'כימיה': '🔬'
};
