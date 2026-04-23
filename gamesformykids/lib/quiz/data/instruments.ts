// כלי נגינה
export type InstrumentQuestion = {
  id: number;
  instrument: string;
  emoji: string;
  family: 'מיתרים' | 'נשיפה' | 'הקשה' | 'מקלדת';
  description: string;
  wrongFamilies: string[];
  wrongInstruments: [string, string, string];
};

export const INSTRUMENTS: InstrumentQuestion[] = [
  { id: 1,  instrument: 'גיטרה',     emoji: '🎸', family: 'מיתרים',  description: 'כלי מיתרים נפוץ, מנגנים עליו בצביטה',     wrongFamilies: ['נשיפה','הקשה'],      wrongInstruments: ['כינור', 'חליל', 'תוף'] },
  { id: 2,  instrument: 'כינור',     emoji: '🎻', family: 'מיתרים',  description: 'כלי מיתרים, מנגנים עליו בקשת',            wrongFamilies: ['נשיפה','מקלדת'],     wrongInstruments: ['גיטרה', 'חליל', 'פסנתר'] },
  { id: 3,  instrument: 'פסנתר',     emoji: '🎹', family: 'מקלדת',   description: 'כלי מקלדת גדול עם 88 קלידים',             wrongFamilies: ['מיתרים','הקשה'],     wrongInstruments: ['אורגן', 'גיטרה', 'כינור'] },
  { id: 4,  instrument: 'תוף',       emoji: '🥁', family: 'הקשה',    description: 'מנגנים עליו עם מקלות, שומרים על קצב',     wrongFamilies: ['מיתרים','נשיפה'],    wrongInstruments: ['חצוצרה', 'גיטרה', 'מרים'] },
  { id: 5,  instrument: 'חצוצרה',   emoji: '🎺', family: 'נשיפה',   description: 'כלי נחושת, נושפים לתוכו',                 wrongFamilies: ['מיתרים','הקשה'],     wrongInstruments: ['חליל', 'גיטרה', 'תוף'] },
  { id: 6,  instrument: 'חליל',      emoji: '🪈', family: 'נשיפה',   description: 'כלי עץ ארוך, נושפים בו ומכסים חורים',    wrongFamilies: ['מיתרים','מקלדת'],    wrongInstruments: ['חצוצרה', 'כינור', 'פסנתר'] },
  { id: 7,  instrument: 'סקסופון',   emoji: '🎷', family: 'נשיפה',   description: 'כלי מתכת עם קנה, נפוץ בג\'אז',           wrongFamilies: ['מיתרים','הקשה'],     wrongInstruments: ['חצוצרה', 'גיטרה', 'תוף'] },
  { id: 8,  instrument: 'כלי הקשה',  emoji: '🪘', family: 'הקשה',    description: 'קבוצת כלים שמנגנים עליהם בהקשה',         wrongFamilies: ['נשיפה','מיתרים'],    wrongInstruments: ['חצוצרה', 'כינור', 'פסנתר'] },
  { id: 9,  instrument: 'הרמוניקה',  emoji: '🎵', family: 'נשיפה',   description: 'כלי קטן שנושפים בו ושואפים',             wrongFamilies: ['מיתרים','הקשה'],     wrongInstruments: ['חליל', 'גיטרה', 'סקסופון'] },
  { id: 10, instrument: 'בס',        emoji: '🎸', family: 'מיתרים',  description: 'גיטרה עם צלינות עמוקות, 4 מיתרים',       wrongFamilies: ['הקשה','נשיפה'],      wrongInstruments: ['גיטרה', 'תוף', 'חצוצרה'] },
  { id: 11, instrument: 'אורגן',     emoji: '🎹', family: 'מקלדת',   description: 'כלי מקלדת שנמצא בכנסיות ובבתי כנסת',     wrongFamilies: ['מיתרים','נשיפה'],    wrongInstruments: ['פסנתר', 'גיטרה', 'חליל'] },
  { id: 12, instrument: 'כינור בס',  emoji: '🎻', family: 'מיתרים',  description: 'הכלי הגדול ביותר במשפחת הכינורות',        wrongFamilies: ['הקשה','מקלדת'],      wrongInstruments: ['כינור', 'צ\'לו', 'גיטרה'] },
];

export type QuizMode = 'family' | 'name';
export const FAMILIES = ['מיתרים', 'נשיפה', 'הקשה', 'מקלדת'] as const;
export const QUESTIONS_PER_GAME = 10;
