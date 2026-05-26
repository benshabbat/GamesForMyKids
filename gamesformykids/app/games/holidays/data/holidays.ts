import type { QuizQuestion as HolidayQuestion } from '@/lib/types';
export type { HolidayQuestion };

export interface Holiday {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bg: string;
  when: string;
  description: string;
  questions: HolidayQuestion[];
}

export const HOLIDAYS: Holiday[] = [
  {
    id: 'rosh-hashana',
    name: 'ראש השנה',
    emoji: '🍎',
    color: 'from-red-500 to-rose-600',
    bg: 'from-red-50 to-rose-100',
    when: 'א׳ תשרי',
    description: 'ראש השנה הוא ראשית שנה חדשה. אוכלים תפוח בדבש ומאחלים שנה טובה ומתוקה!',
    questions: [
      { question: 'מה אוכלים בראש השנה לסמן שנה מתוקה?', answers: ['תפוח בדבש', 'מצה', 'לחם', 'סופגניות'], correctIndex: 0 },
      { question: 'מה תוקעים בראש השנה?', answers: ['תוף', 'שופר', 'חצוצרה', 'גיטרה'], correctIndex: 1 },
      { question: 'מה מאחלים בראש השנה?', answers: ['חג שמח', 'שנה טובה', 'חנוכה שמח', 'פסח כשר'], correctIndex: 1 },
    ],
  },
  {
    id: 'yom-kippur',
    name: 'יום כיפור',
    emoji: '🤍',
    color: 'from-slate-500 to-gray-600',
    bg: 'from-slate-50 to-gray-100',
    when: 'י׳ תשרי',
    description: 'יום כיפור הוא יום הצום הגדול. מבקשים מחילה מה׳ ומכפרים על כל חטאי השנה.',
    questions: [
      { question: 'מה עושים ביום כיפור?', answers: ['שרים ורוקדים', 'צמים ומתפללים', 'אוכלים הרבה', 'הולכים לים'], correctIndex: 1 },
      { question: 'באיזה צבע לובשים ביום כיפור?', answers: ['אדום', 'שחור', 'לבן', 'כחול'], correctIndex: 2 },
      { question: 'מה כינויו של יום כיפור?', answers: ['יום גדול', 'יום הדין', 'שבת שבתון', 'יום הרחמים'], correctIndex: 2 },
    ],
  },
  {
    id: 'sukkot',
    name: 'סוכות',
    emoji: '🌿',
    color: 'from-green-500 to-emerald-600',
    bg: 'from-green-50 to-emerald-100',
    when: 'ט"ו תשרי',
    description: 'בסוכות בונים סוכה ואוכלים בה שבעה ימים! מנענעים לולב, אתרוג, הדס וערבה.',
    questions: [
      { question: 'מה בונים בחג הסוכות?', answers: ['בית קטן', 'סוכה', 'מגדל', 'תפאורה'], correctIndex: 1 },
      { question: 'כמה מינים יש ב"ארבעת המינים"?', answers: ['שניים', 'שלושה', 'ארבעה', 'חמישה'], correctIndex: 2 },
      { question: 'מה אחד מארבעת המינים?', answers: ['תפוח', 'לולב', 'עץ אורן', 'גזר'], correctIndex: 1 },
    ],
  },
  {
    id: 'chanukka',
    name: 'חנוכה',
    emoji: '🕎',
    color: 'from-blue-500 to-indigo-600',
    bg: 'from-blue-50 to-indigo-100',
    when: 'כ"ה כסלו',
    description: 'חנוכה הוא חג האורות! מדליקים נרות שמונה לילות לזכר נס פך השמן.',
    questions: [
      { question: 'כמה לילות אורך חנוכה?', answers: ['שבעה', 'שמונה', 'תשעה', 'ששה'], correctIndex: 1 },
      { question: 'על איזה נס מדליקים חנוכיה?', answers: ['נס הים', 'נס פך השמן', 'נס המן', 'נס המצות'], correctIndex: 1 },
      { question: 'מה אוכלים בחנוכה?', answers: ['מצות', 'עוגיות', 'סופגניות ולביבות', 'עוגת דבש'], correctIndex: 2 },
    ],
  },
  {
    id: 'purim',
    name: 'פורים',
    emoji: '🎭',
    color: 'from-purple-500 to-violet-600',
    bg: 'from-purple-50 to-violet-100',
    when: 'י"ד אדר',
    description: 'בפורים מתחפשים ושמחים! קוראים מגילת אסתר וזוכרים את הנס שהיה בפרס.',
    questions: [
      { question: 'מיהי גיבורת פורים?', answers: ['מרים', 'רחל', 'אסתר', 'דבורה'], correctIndex: 2 },
      { question: 'מה נותנים לחברים בפורים?', answers: ['פרחים', 'משלוח מנות', 'שוקולד', 'ספרים'], correctIndex: 1 },
      { question: 'מה קוראים בפורים בבית הכנסת?', answers: ['תורה', 'מגילת אסתר', 'תהילים', 'ספר תפילה'], correctIndex: 1 },
    ],
  },
  {
    id: 'pesach',
    name: 'פסח',
    emoji: '🫓',
    color: 'from-amber-500 to-yellow-600',
    bg: 'from-amber-50 to-yellow-100',
    when: 'ט"ו ניסן',
    description: 'פסח הוא חג החירות! זוכרים את יציאת מצרים ואוכלים מצה במקום לחם.',
    questions: [
      { question: 'מה אוכלים במקום לחם בפסח?', answers: ['עוגה', 'לחמניות', 'מצה', 'פיתה'], correctIndex: 2 },
      { question: 'בפסח יצאנו מאיזה ארץ?', answers: ['בבל', 'מצרים', 'יון', 'פרס'], correctIndex: 1 },
      { question: 'מה שם ה"ספר" שקוראים בליל הסדר?', answers: ['הגדה של פסח', 'מגילה', 'סידור', 'חומש'], correctIndex: 0 },
    ],
  },
  {
    id: 'shavuot',
    name: 'שבועות',
    emoji: '📜',
    color: 'from-cyan-500 to-teal-600',
    bg: 'from-cyan-50 to-teal-100',
    when: 'ו׳ סיון',
    description: 'שבועות הוא חג מתן תורה! ה׳ נתן לנו את התורה בהר סיני. אוכלים מאכלי חלב.',
    questions: [
      { question: 'מה קיבלנו בחג השבועות?', answers: ['מצות', 'חנוכיה', 'את התורה', 'לולב ואתרוג'], correctIndex: 2 },
      { question: 'מה אוכלים בשבועות?', answers: ['בשר', 'מאכלי חלב', 'פירות', 'קנאפה'], correctIndex: 1 },
      { question: 'על איזה הר ניתנה התורה?', answers: ['הר הכרמל', 'הר ציון', 'הר סיני', 'הר תבור'], correctIndex: 2 },
    ],
  },
  {
    id: 'shabbat',
    name: 'שבת',
    emoji: '🕯️',
    color: 'from-yellow-400 to-orange-500',
    bg: 'from-yellow-50 to-orange-100',
    when: 'יום שישי ערב',
    description: 'שבת היא יום המנוחה! מדליקים נרות, מקדשים על יין ואוכלים חלות.',
    questions: [
      { question: 'מה מדליקים בשבת?', answers: ['נרות', 'חנוכיה', 'מדורה', 'אבוקה'], correctIndex: 0 },
      { question: 'מה אוכלים בסעודת שבת?', answers: ['מצה', 'חלות', 'סופגניות', 'פיתה'], correctIndex: 1 },
      { question: 'מה אומרים על הכוס בשבת?', answers: ['ברכת המזון', 'קידוש', 'הגדה', 'הלל'], correctIndex: 1 },
    ],
  },
];
