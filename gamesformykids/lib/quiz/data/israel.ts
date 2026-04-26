// ידע על ישראל
export type IsraelQuestion = {
  id: number;
  question: string;
  answers: [string, string, string, string];
  correctIndex: number;
  emoji: string;
  category: 'גאוגרפיה' | 'היסטוריה' | 'תרבות' | 'טבע' | 'ערים';
  funFact: string;
};

export const ISRAEL_QUESTIONS: IsraelQuestion[] = [
  { id: 1,  category: 'ערים',      emoji: '🏙️', question: 'מהי בירת ישראל?',                                          answers: ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע'],             correctIndex: 1, funFact: 'ירושלים היא עיר הקודש של שלוש דתות!' },
  { id: 2,  category: 'גאוגרפיה', emoji: '🌊', question: 'מהו הים הגדול ביותר שגובל בישראל?',                        answers: ['ים כינרת', 'ים המלח', 'הים התיכון', 'ים סוף'],       correctIndex: 2, funFact: 'הים התיכון מתפרס על פני 2.5 מיליון קמ"ר!' },
  { id: 3,  category: 'טבע',       emoji: '🌺', question: 'מהי פרח הלאום של ישראל?',                                  answers: ['ורד', 'נרקיס', 'כלנית', 'חמצית'],                    correctIndex: 2, funFact: 'הכלנית פורחת בדרך כלל בחודשי ינואר-מרץ' },
  { id: 4,  category: 'גאוגרפיה', emoji: '🏔️', question: 'מהו ההר הגבוה ביותר בישראל?',                              answers: ['הר הכרמל', 'הר מירון', 'הר הנגב', 'הר תבור'],       correctIndex: 1, funFact: 'הר מירון מגיע לגובה 1,208 מטרים!' },
  { id: 5,  category: 'היסטוריה',  emoji: '📅', question: 'באיזו שנה הוכרזה מדינת ישראל?',                            answers: ['1946', '1947', '1948', '1949'],                       correctIndex: 2, funFact: 'ישראל הוכרזה ב-5 באייר תש"ח, 14 במאי 1948' },
  { id: 6,  category: 'תרבות',    emoji: '✡️', question: 'כמה כוכבים יש על דגל ישראל?',                              answers: ['0', '1', '2', '6'],                                   correctIndex: 0, funFact: 'מגן דוד על הדגל הוא בעצם שישה מרובעים!' },  
  { id: 7,  category: 'גאוגרפיה', emoji: '🌊', question: 'מהו הים הנמוך ביותר בעולם?',                               answers: ['ים סוף', 'ים כינרת', 'ים המלח', 'הים התיכון'],       correctIndex: 2, funFact: 'ים המלח נמצא 430 מטר מתחת לפני הים!' },
  { id: 8,  category: 'ערים',      emoji: '🏖️', question: 'איזו עיר נקראת "עיר ללא הפסקה"?',                         answers: ['ירושלים', 'חיפה', 'תל אביב', 'אילת'],                correctIndex: 2, funFact: 'תל אביב-יפו היא מרכז הטכנולוגיה של ישראל' },
  { id: 9,  category: 'טבע',       emoji: '🦅', question: 'מהו ציפור הלאום של ישראל?',                                answers: ['נשר', 'יונה', 'שחף', 'דוכיפת'],                      correctIndex: 3, funFact: 'הדוכיפת נבחרה בשנת 2008 בהצבעה עממית!' },
  { id: 10, category: 'היסטוריה',  emoji: '🏛️', question: 'כמה שנים ישראל קיימת בשנת 2023?',                         answers: ['65', '70', '75', '80'],                               correctIndex: 2, funFact: 'ישראל חגגה 75 שנה לעצמאות ב-2023' },
  { id: 11, category: 'גאוגרפיה', emoji: '🌊', question: 'מהו הנהר הארוך ביותר בישראל?',                             answers: ['ירמוך', 'קישון', 'ירדן', 'זבולון'],                  correctIndex: 2, funFact: 'גובה מקור הירדן הוא 520 מטר מעל פני הים' },
  { id: 12, category: 'תרבות',    emoji: '🎵', question: 'מה שם ההמנון הלאומי של ישראל?',                             answers: ['ארצנו', 'התקווה', 'שיר השירים', 'עם ישראל חי'],    correctIndex: 1, funFact: 'התקווה מבוסס על שיר שנכתב ב-1878' },
  { id: 13, category: 'ערים',      emoji: '🏔️', question: 'עיר מי ממוקמת על הכרמל?',                                 answers: ['תל אביב', 'ירושלים', 'חיפה', 'נצרת'],               correctIndex: 2, funFact: 'חיפה היא עיר הנמל הגדולה בישראל' },
  { id: 14, category: 'טבע',       emoji: '🌊', question: 'כמה קילומטרים חוף ים ים-תיכוני לישראל?',                  answers: ['100', '150', '190', '250'],                           correctIndex: 2, funFact: 'חוף הים התיכון של ישראל הוא כ-190 ק"מ' },
  { id: 15, category: 'היסטוריה',  emoji: '🕍', question: 'מי כתב את "מדינת היהודים"?',                               answers: ['חיים ויצמן', 'דוד בן גוריון', 'תאודור הרצל', 'זאב ז\'בוטינסקי'], correctIndex: 2, funFact: 'הרצל כתב את הספר ב-1896 בוינה' },
];

export const CATEGORIES = ['הכל', 'גאוגרפיה', 'היסטוריה', 'תרבות', 'טבע', 'ערים'] as const;
export type IsraelCategory = typeof CATEGORIES[number];

export const CATEGORY_COLORS: Record<IsraelCategory, string> = {
  'הכל':      'bg-blue-600 text-white',
  'גאוגרפיה': 'bg-teal-500 text-white',
  'היסטוריה': 'bg-amber-500 text-white',
  'תרבות':    'bg-purple-500 text-white',
  'טבע':      'bg-green-500 text-white',
  'ערים':     'bg-rose-500 text-white',
};
