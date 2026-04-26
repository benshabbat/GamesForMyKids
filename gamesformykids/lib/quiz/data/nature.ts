// עולם הטבע - שאלות מדעי הטבע לילדים
export type NatureQuestion = {
  id: number;
  question: string;
  answers: [string, string, string, string];
  correctIndex: number;
  emoji: string;
  category: 'בעלי חיים' | 'צמחים' | 'מזג אוויר' | 'חלל' | 'מים';
  funFact: string;
};

export const NATURE_QUESTIONS: NatureQuestion[] = [
  { id: 1,  category: 'בעלי חיים', emoji: '🦋', question: 'איך קוראים לתהליך שבו זחל הופך לפרפר?',           answers: ['שינה', 'גדילה', 'גלגול', 'מטמורפוזה'],       correctIndex: 3, funFact: 'המטמורפוזה לוקחת בין שבועיים לחודשיים!' },
  { id: 2,  category: 'בעלי חיים', emoji: '🐬', question: 'מה בעל החיים החכם ביותר בים?',                    answers: ['כריש', 'דולפין', 'לוויתן', 'תמנון'],          correctIndex: 1, funFact: 'דולפינים יכולים לזהות את עצמם במראה!' },
  { id: 3,  category: 'צמחים',    emoji: '🌵', question: 'באיזה אזור גדל הקקטוס?',                           answers: ['יער גשם', 'מדבר', 'ים', 'הרים'],              correctIndex: 1, funFact: 'הקקטוס יכול לאחסן מאות ליטרים של מים!' },
  { id: 4,  category: 'חלל',      emoji: '🌙', question: 'כמה זמן לוקח לירח להקיף את כדור הארץ?',           answers: ['שבוע', 'חודש', 'שנה', 'יום'],                  correctIndex: 1, funFact: 'הירח מתרחק מכדור הארץ ב-3.8 ס"מ בשנה!' },
  { id: 5,  category: 'מזג אוויר', emoji: '⚡', question: 'מה קודם — ברק או רעם?',                           answers: ['רעם', 'ברק', 'שניהם יחד', 'תלוי במזג האוויר'], correctIndex: 1, funFact: 'הברק מהיר אור, הרעם מהיר קול — ולכן הברק מגיע ראשון!' },
  { id: 6,  category: 'מים',      emoji: '🌊', question: 'כמה אחוז ממים כיסוי כדור הארץ?',                  answers: ['50%', '60%', '71%', '80%'],                    correctIndex: 2, funFact: 'רק 3% ממי כדור הארץ הם מים מתוקים!' },
  { id: 7,  category: 'בעלי חיים', emoji: '🐙', question: 'כמה ידיים יש לתמנון?',                            answers: ['6', '7', '8', '10'],                            correctIndex: 2, funFact: 'לתמנון יש 3 לבבות ו-9 מוחות!' },
  { id: 8,  category: 'צמחים',    emoji: '🌳', question: 'מה הדבר שעצים קולטים ומשחררים לסביבה?',           answers: ['חמצן בלבד', 'פחמן דו-חמצני בלבד', 'בולעים CO₂ ופולטים O₂', 'מים'],  correctIndex: 2, funFact: 'עץ אחד יכול לספוג כ-22 ק"ג CO₂ בשנה!' },
  { id: 9,  category: 'חלל',      emoji: '☀️', question: 'כמה דקות אור השמש מגיע לכדור הארץ?',              answers: ['5 דקות', '8 דקות', '15 דקות', '1 שעה'],         correctIndex: 1, funFact: 'אם השמש תכבה, נדע על כך רק לאחר 8 דקות!' },
  { id: 10, category: 'בעלי חיים', emoji: '🦜', question: 'איזה ציפור יכולה לדבר?',                          answers: ['נשר', 'פינגווין', 'תוכי', 'עורב'],             correctIndex: 2, funFact: 'תוכים יכולים לחיות עד 80 שנה!' },
  { id: 11, category: 'מזג אוויר', emoji: '🌈', question: 'מתי נוצרת קשת בענן?',                             answers: ['לפני גשם', 'בזמן גשם', 'אחרי גשם ובשמש', 'בלילה'],          correctIndex: 2, funFact: 'קשת בענן היא למעשה עיגול שלם — אנחנו רואים חצי!' },
  { id: 12, category: 'מים',      emoji: '❄️', question: 'ב-כמה מעלות קופא מים?',                           answers: ['-10°C', '0°C', '10°C', '100°C'],               correctIndex: 1, funFact: 'מי ים קופאים ב-2°C- כי הם מלוחים!' },
  { id: 13, category: 'חלל',      emoji: '🪐', question: 'מה הכוכב הלכת הגדול ביותר במערכת השמש?',          answers: ['שבתאי', 'נפטון', 'צדק', 'אורנוס'],             correctIndex: 2, funFact: 'צדק כל כך גדול — 1,300 כדורי ארץ נכנסים בתוכו!' },
  { id: 14, category: 'בעלי חיים', emoji: '🦎', question: 'איזה זוחל יכול לשנות צבע?',                       answers: ['נחש', 'תנין', 'כמאליאון', 'לטאה'],             correctIndex: 2, funFact: 'הכמאליאון משנה צבע בעיקר בגלל רגשות ולא הסוואה!' },
  { id: 15, category: 'צמחים',    emoji: '🌺', question: 'מה פונקציית העלים של הצמח?',                       answers: ['הגנה', 'פוטוסינתזה', 'נשיאת מזון', 'רבייה'],  correctIndex: 1, funFact: 'פוטוסינתזה היא התהליך שבו צמחים מייצרים אוכל מאור שמש!' },
];

export const CATEGORIES = ['הכל', 'בעלי חיים', 'צמחים', 'מזג אוויר', 'חלל', 'מים'] as const;
export type NatureCategory = typeof CATEGORIES[number];

export const CATEGORY_COLORS: Record<NatureCategory, string> = {
  'הכל':       'bg-green-600 text-white',
  'בעלי חיים': 'bg-amber-500 text-white',
  'צמחים':     'bg-emerald-500 text-white',
  'מזג אוויר': 'bg-blue-500 text-white',
  'חלל':       'bg-indigo-600 text-white',
  'מים':       'bg-cyan-500 text-white',
};
