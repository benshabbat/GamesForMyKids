// כלי תחבורה
export type TransportQuestion = {
  id: number;
  vehicle: string;
  emoji: string;
  type: 'יבשה' | 'ים' | 'אוויר' | 'מסילה';
  question: string;
  answers: [string, string, string, string];
  correctIndex: number;
  funFact: string;
};

export const TRANSPORT_QUESTIONS: TransportQuestion[] = [
  { id: 1,  vehicle: 'מטוס',        emoji: '✈️', type: 'אוויר',  question: 'מהו כלי תחבורה שעף בשמיים ומוביל נוסעים לארצות שונות?',          answers: ['ספינה', 'רכבת', 'מטוס', 'מסוק'],            correctIndex: 2, funFact: 'מטוס הנוסעים הגדול ביותר הוא ה-Airbus A380!' },
  { id: 2,  vehicle: 'ספינה',       emoji: '🚢', type: 'ים',     question: 'מה כלי התחבורה הגדול ביותר שנוסע על הים?',                         answers: ['סירה', 'ספינה', 'מנוף', 'אוניה'],            correctIndex: 1, funFact: 'ספינת המשא הגדולה בעולם ארוכה כמעט כמו 4 מגדלי אייפל!' },
  { id: 3,  vehicle: 'רכבת',        emoji: '🚂', type: 'מסילה', question: 'כלי תחבורה שנוסע על פסי ברזל מעיר לעיר:',                           answers: ['אוטובוס', 'טרם', 'רכבת', 'מכונית'],          correctIndex: 2, funFact: 'הרכבת המהירה ביותר בעולם נוסעת ב-600 קמ"ש ביפן!' },
  { id: 4,  vehicle: 'אוטובוס',     emoji: '🚌', type: 'יבשה',  question: 'כלי תחבורה ציבורי גדול בעיר שמסיע הרבה נוסעים:',                   answers: ['מונית', 'אוטובוס', 'אופנוע', 'קורקינט'],     correctIndex: 1, funFact: 'אוטובוס ממוצע יכול להסיע 50-80 נוסעים!' },
  { id: 5,  vehicle: 'מסוק',        emoji: '🚁', type: 'אוויר',  question: 'כלי טיס שיכול לרחף במקום אחד ולנחות בכל מקום:',                    answers: ['מטוס', 'מסוק', 'בלון', 'רחפן'],              correctIndex: 1, funFact: 'מסוקים משמשים להצלה, לרפואה ולמשטרה!' },
  { id: 6,  vehicle: 'אופניים',     emoji: '🚲', type: 'יבשה',  question: 'כלי רכב ידידותי לסביבה שמונעים בכוח הרגליים:',                     answers: ['קורקינט', 'אופנוע', 'אופניים', 'כיסא גלגלים'], correctIndex: 2, funFact: 'יש יותר אופניים בעולם מכלי רכב ממונעים!' },
  { id: 7,  vehicle: 'סירת משוטים', emoji: '🚣', type: 'ים',     question: 'כלי שיט קטן שמונע בכוח האדם עם משוטים:',                           answers: ['ספינה', 'קיאק', 'סירת משוטים', 'גלשן'],      correctIndex: 2, funFact: 'משוטים שימשו בני אדם לפני אלפי שנים!' },
  { id: 8,  vehicle: 'רכבת תחתית',  emoji: '🚇', type: 'מסילה', question: 'רכבת שנוסעת מתחת לאדמה בעיר:',                                      answers: ['טרם', 'רכבת תחתית', 'רכבל', 'מנהרה'],        correctIndex: 1, funFact: 'לונדון היא בעלת הרכבת התחתית הוותיקה בעולם — משנת 1863!' },
  { id: 9,  vehicle: 'מכונית',      emoji: '🚗', type: 'יבשה',  question: 'כלי תחבורה פרטי עם 4 גלגלים שרוב המשפחות משתמשות בו:',             answers: ['אופנוע', 'מכונית', 'אוטובוס', 'ג\'יפ'],     correctIndex: 1, funFact: 'הרכב הנפוץ ביותר בישראל הוא טויוטה קורולה!' },
  { id: 10, vehicle: 'רחפן',        emoji: '🛸', type: 'אוויר',  question: 'כלי טיס קטן וממונע שנשלט מרחוק בלי טייס:',                         answers: ['מסוק', 'בלון', 'רחפן', 'מטוס'],              correctIndex: 2, funFact: 'רחפנים משמשים לצילום, למסירת חבילות ועוד!' },
  { id: 11, vehicle: 'אמבולנס',     emoji: '🚑', type: 'יבשה',  question: 'מכונית מיוחדת שמסיעה חולים לבית חולים במהירות:',                   answers: ['מכונית משטרה', 'אמבולנס', 'מכבי אש', 'ג\'יפ'], correctIndex: 1, funFact: 'אמבולנס בעברית זה "ניידת הצלה"!' },
  { id: 12, vehicle: 'שייט',        emoji: '⛵', type: 'ים',     question: 'כלי שיט שמונע בעזרת רוח ומפרש:',                                   answers: ['ספינה', 'קיאק', 'שייט', 'יאכטה'],            correctIndex: 2, funFact: 'ספינות מפרש הכי מהירות יכולות להגיע ל-60 קמ"ש!' },
  { id: 13, vehicle: 'טרקטור',      emoji: '🚜', type: 'יבשה',  question: 'כלי רכב חזק שמשמש בחקלאות לחרישת שדות:',                           answers: ['עגורן', 'טרקטור', 'מכונת חפירה', 'משאית'],   correctIndex: 1, funFact: 'טרקטור יכול לגרור משא של עשרות טונות!' },
  { id: 14, vehicle: 'מטוס קרב',    emoji: '🛩️', type: 'אוויר',  question: 'מטוס מיוחד של הצבא שיכול לפגוע במטרות ממרחק:',                    answers: ['מסוק', 'מטוס נוסעים', 'מטוס קרב', 'רחפן'],  correctIndex: 2, funFact: 'מטוסי קרב יכולים לתמרן ב-G שבני אדם רגילים לא יכולים לעמוד בהם!' },
  { id: 15, vehicle: 'קיאק',        emoji: '🛶', type: 'ים',     question: 'סירה קטנה צרה שמשוטטת בנהרות ובים בעזרת משוטים:',                  answers: ['גלשן', 'קיאק', 'ספינה', 'סירת מנוע'],        correctIndex: 1, funFact: 'קיאק מגיע ממסורת הציד של האינואיטים!' },
];

export const QUESTIONS_PER_GAME = 10;
export const TRANSPORT_TYPES = ['הכל', 'יבשה', 'ים', 'אוויר', 'מסילה'] as const;
export type TransportType = typeof TRANSPORT_TYPES[number];
