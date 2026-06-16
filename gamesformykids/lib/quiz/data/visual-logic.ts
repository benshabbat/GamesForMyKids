export type VisualLogicQuestion = {
  id: number;
  grid: [string, string, string, string, string, string, string, string];
  answer: string;
  wrongOptions: [string, string, string];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export const VISUAL_LOGIC_QUESTIONS: VisualLogicQuestion[] = [
  // ─── Arithmetic sequences ───────────────────────────────────────────────────
  {
    id: 1, difficulty: 'easy',
    grid: ['1','2','3','4','5','6','7','8'],
    answer: '9',
    wrongOptions: ['10','7','11'],
    explanation: 'הסדרה עולה ב-1 בכל פעם: 1, 2, 3 … עד 9!',
  },
  {
    id: 2, difficulty: 'easy',
    grid: ['2','4','6','8','10','12','14','16'],
    answer: '18',
    wrongOptions: ['17','20','15'],
    explanation: 'הסדרה עולה ב-2 בכל פעם — מספרים זוגיים!',
  },
  {
    id: 3, difficulty: 'easy',
    grid: ['5','10','15','20','25','30','35','40'],
    answer: '45',
    wrongOptions: ['44','50','42'],
    explanation: 'הסדרה עולה ב-5 בכל פעם: 5, 10, 15 …',
  },
  {
    id: 4, difficulty: 'easy',
    grid: ['10','20','30','40','50','60','70','80'],
    answer: '90',
    wrongOptions: ['85','100','88'],
    explanation: 'הסדרה עולה ב-10 בכל פעם: 10, 20, 30 …',
  },
  {
    id: 5, difficulty: 'easy',
    grid: ['9','8','7','6','5','4','3','2'],
    answer: '1',
    wrongOptions: ['0','10','3'],
    explanation: 'הסדרה יורדת ב-1 בכל פעם: 9, 8, 7 … עד 1!',
  },
  {
    id: 6, difficulty: 'medium',
    grid: ['3','6','9','12','15','18','21','24'],
    answer: '27',
    wrongOptions: ['25','30','26'],
    explanation: 'הסדרה עולה ב-3 בכל פעם: לוח הכפל של 3!',
  },
  {
    id: 7, difficulty: 'medium',
    grid: ['4','8','12','16','20','24','28','32'],
    answer: '36',
    wrongOptions: ['34','40','38'],
    explanation: 'הסדרה עולה ב-4 בכל פעם: לוח הכפל של 4!',
  },
  {
    id: 8, difficulty: 'medium',
    grid: ['7','14','21','28','35','42','49','56'],
    answer: '63',
    wrongOptions: ['60','70','64'],
    explanation: 'הסדרה עולה ב-7 בכל פעם: לוח הכפל של 7!',
  },
  {
    id: 9, difficulty: 'medium',
    grid: ['100','90','80','70','60','50','40','30'],
    answer: '20',
    wrongOptions: ['10','25','15'],
    explanation: 'הסדרה יורדת ב-10 בכל פעם: 100, 90, 80 … 20!',
  },
  {
    id: 10, difficulty: 'medium',
    grid: ['11','22','33','44','55','66','77','88'],
    answer: '99',
    wrongOptions: ['90','100','98'],
    explanation: 'הסדרה עולה ב-11 בכל פעם: 11, 22, 33 …',
  },

  // ─── Geometric / doubling ────────────────────────────────────────────────────
  {
    id: 11, difficulty: 'hard',
    grid: ['1','2','4','8','16','32','64','128'],
    answer: '256',
    wrongOptions: ['192','512','200'],
    explanation: 'כל מספר כפול ב-2: 1, 2, 4, 8 … 256!',
  },

  // ─── Square numbers ──────────────────────────────────────────────────────────
  {
    id: 12, difficulty: 'hard',
    grid: ['1','4','9','16','25','36','49','64'],
    answer: '81',
    wrongOptions: ['72','100','78'],
    explanation: 'אלה המספרים הריבועיים: 1², 2², 3² … 9²=81!',
  },

  // ─── Fibonacci ───────────────────────────────────────────────────────────────
  {
    id: 13, difficulty: 'hard',
    grid: ['1','1','2','3','5','8','13','21'],
    answer: '34',
    wrongOptions: ['29','32','42'],
    explanation: 'סדרת פיבונאצ׳י: כל מספר = סכום שני הקודמים!',
  },

  // ─── Skip by 9 ───────────────────────────────────────────────────────────────
  {
    id: 14, difficulty: 'hard',
    grid: ['9','18','27','36','45','54','63','72'],
    answer: '81',
    wrongOptions: ['80','90','75'],
    explanation: 'הסדרה עולה ב-9 בכל פעם: לוח הכפל של 9!',
  },

  // ─── Repeating 3-element cycle (ABCABCAB → C) ───────────────────────────────
  {
    id: 15, difficulty: 'easy',
    grid: ['🍎','🍊','🍋','🍎','🍊','🍋','🍎','🍊'],
    answer: '🍋',
    wrongOptions: ['🍎','🍇','🍑'],
    explanation: 'התבנית חוזרת כל 3: 🍎🍊🍋, 🍎🍊🍋, 🍎🍊… 🍋!',
  },
  {
    id: 16, difficulty: 'easy',
    grid: ['🔴','🟡','🔵','🔴','🟡','🔵','🔴','🟡'],
    answer: '🔵',
    wrongOptions: ['🔴','🟢','🟣'],
    explanation: 'התבנית: אדום, צהוב, כחול — חוזרת שוב ושוב!',
  },
  {
    id: 17, difficulty: 'easy',
    grid: ['⭐','🌙','☀️','⭐','🌙','☀️','⭐','🌙'],
    answer: '☀️',
    wrongOptions: ['⭐','🌟','🌈'],
    explanation: 'התבנית: כוכב, ירח, שמש — חוזרת שוב ושוב!',
  },
  {
    id: 18, difficulty: 'easy',
    grid: ['🐶','🐱','🐭','🐶','🐱','🐭','🐶','🐱'],
    answer: '🐭',
    wrongOptions: ['🐶','🐰','🦊'],
    explanation: 'התבנית: כלב, חתול, עכבר — חוזרת שוב ושוב!',
  },
  {
    id: 19, difficulty: 'easy',
    grid: ['⚽','🏀','🎾','⚽','🏀','🎾','⚽','🏀'],
    answer: '🎾',
    wrongOptions: ['⚽','🏐','⚾'],
    explanation: 'התבנית: כדורגל, כדורסל, טניס — חוזרת שוב ושוב!',
  },
  {
    id: 20, difficulty: 'easy',
    grid: ['🌹','🌻','🌷','🌹','🌻','🌷','🌹','🌻'],
    answer: '🌷',
    wrongOptions: ['🌹','🌸','🌺'],
    explanation: 'התבנית: ורד, חמנייה, צבעוני — חוזרת שוב ושוב!',
  },
  {
    id: 21, difficulty: 'easy',
    grid: ['😀','😢','😡','😀','😢','😡','😀','😢'],
    answer: '😡',
    wrongOptions: ['😀','😎','😴'],
    explanation: 'התבנית: שמח, עצוב, כועס — חוזרת שוב ושוב!',
  },
  {
    id: 22, difficulty: 'easy',
    grid: ['🍕','🍔','🌮','🍕','🍔','🌮','🍕','🍔'],
    answer: '🌮',
    wrongOptions: ['🍕','🌯','🥙'],
    explanation: 'התבנית: פיצה, המבורגר, טאקו — חוזרת שוב ושוב!',
  },
  {
    id: 23, difficulty: 'medium',
    grid: ['🚀','🌍','🌙','🚀','🌍','🌙','🚀','🌍'],
    answer: '🌙',
    wrongOptions: ['🚀','🌟','☀️'],
    explanation: 'התבנית: רקטה, כדור הארץ, ירח — חוזרת שוב ושוב!',
  },
  {
    id: 24, difficulty: 'medium',
    grid: ['🦁','🐘','🦒','🦁','🐘','🦒','🦁','🐘'],
    answer: '🦒',
    wrongOptions: ['🦁','🐆','🦏'],
    explanation: 'התבנית: אריה, פיל, ג׳ירפה — חוזרת שוב ושוב!',
  },

  // ─── Alternating 2-element (ABABABAB → A at pos 8) ──────────────────────────
  {
    id: 25, difficulty: 'easy',
    grid: ['🌞','🌚','🌞','🌚','🌞','🌚','🌞','🌚'],
    answer: '🌞',
    wrongOptions: ['🌚','🌝','🌛'],
    explanation: 'לסירוגין: שמש, ירח, שמש, ירח … השורה ה-9 היא שמש!',
  },
  {
    id: 26, difficulty: 'easy',
    grid: ['🐝','🦋','🐝','🦋','🐝','🦋','🐝','🦋'],
    answer: '🐝',
    wrongOptions: ['🦋','🐞','🦗'],
    explanation: 'לסירוגין: דבורה, פרפר, דבורה, פרפר … הבא הוא דבורה!',
  },
  {
    id: 27, difficulty: 'easy',
    grid: ['👑','💎','👑','💎','👑','💎','👑','💎'],
    answer: '👑',
    wrongOptions: ['💎','🏆','💍'],
    explanation: 'לסירוגין: כתר, יהלום, כתר, יהלום … הבא הוא כתר!',
  },
  {
    id: 28, difficulty: 'easy',
    grid: ['☀️','🌧️','☀️','🌧️','☀️','🌧️','☀️','🌧️'],
    answer: '☀️',
    wrongOptions: ['🌧️','⛅','❄️'],
    explanation: 'לסירוגין: שמש, גשם, שמש, גשם … הבא הוא שמש!',
  },
  {
    id: 29, difficulty: 'easy',
    grid: ['🍰','🍩','🍰','🍩','🍰','🍩','🍰','🍩'],
    answer: '🍰',
    wrongOptions: ['🍩','🧁','🍪'],
    explanation: 'לסירוגין: עוגה, דונאט, עוגה, דונאט … הבא הוא עוגה!',
  },

  // ─── Row pattern (same emoji × 3 per row) ────────────────────────────────────
  {
    id: 30, difficulty: 'easy',
    grid: ['🌞','🌞','🌞','🌧️','🌧️','🌧️','❄️','❄️'],
    answer: '❄️',
    wrongOptions: ['🌞','🌧️','⛅'],
    explanation: 'כל שורה מכילה אותו סמל שלוש פעמים! השורה השלישית = ❄️❄️❄️',
  },
  {
    id: 31, difficulty: 'easy',
    grid: ['🔴','🔴','🔴','🟡','🟡','🟡','🔵','🔵'],
    answer: '🔵',
    wrongOptions: ['🔴','🟡','🟢'],
    explanation: 'כל שורה מכילה אותו צבע שלוש פעמים! השורה השלישית = 🔵🔵🔵',
  },
  {
    id: 32, difficulty: 'easy',
    grid: ['🐟','🐟','🐟','🐦','🐦','🐦','🦋','🦋'],
    answer: '🦋',
    wrongOptions: ['🐟','🐦','🐠'],
    explanation: 'כל שורה מכילה אותו חיה שלוש פעמים! השורה השלישית = 🦋🦋🦋',
  },
  {
    id: 33, difficulty: 'easy',
    grid: ['🌹','🌹','🌹','🌻','🌻','🌻','🌷','🌷'],
    answer: '🌷',
    wrongOptions: ['🌹','🌻','🌸'],
    explanation: 'כל שורה מכילה אותו פרח שלוש פעמים! השורה השלישית = 🌷🌷🌷',
  },

  // ─── Latin square / each item appears once per row ───────────────────────────
  {
    id: 34, difficulty: 'medium',
    grid: ['🍎','🍊','🍋','🍊','🍋','🍎','🍋','🍎'],
    answer: '🍊',
    wrongOptions: ['🍎','🍋','🍇'],
    explanation: 'כל שורה מכילה תפוח, תפוז ולימון בדיוק פעם אחת!',
  },
  {
    id: 35, difficulty: 'medium',
    grid: ['🔴','🟡','🔵','🟡','🔵','🔴','🔵','🔴'],
    answer: '🟡',
    wrongOptions: ['🔴','🔵','🟢'],
    explanation: 'כל שורה מכילה אדום, צהוב וכחול בדיוק פעם אחת!',
  },
  {
    id: 36, difficulty: 'medium',
    grid: ['⭐','🌙','☀️','🌙','☀️','⭐','☀️','⭐'],
    answer: '🌙',
    wrongOptions: ['⭐','☀️','🌟'],
    explanation: 'כל שורה מכילה כוכב, ירח ושמש בדיוק פעם אחת!',
  },
  {
    id: 37, difficulty: 'medium',
    grid: ['🐶','🐱','🐭','🐱','🐭','🐶','🐭','🐶'],
    answer: '🐱',
    wrongOptions: ['🐶','🐭','🐰'],
    explanation: 'כל שורה מכילה כלב, חתול ועכבר בדיוק פעם אחת!',
  },

  // ─── Hebrew letter sequences ─────────────────────────────────────────────────
  {
    id: 38, difficulty: 'medium',
    grid: ['א','ב','ג','ד','ה','ו','ז','ח'],
    answer: 'ט',
    wrongOptions: ['י','כ','ן'],
    explanation: 'אותיות האלף-בית לפי הסדר: א, ב, ג … ט!',
  },
  {
    id: 39, difficulty: 'medium',
    grid: ['י','כ','ל','מ','נ','ס','ע','פ'],
    answer: 'צ',
    wrongOptions: ['ק','ר','ש'],
    explanation: 'אותיות האלף-בית לפי הסדר: י, כ, ל … צ!',
  },
  {
    id: 40, difficulty: 'hard',
    grid: ['ת','ש','ר','ק','צ','פ','ע','ס'],
    answer: 'נ',
    wrongOptions: ['מ','ל','ו'],
    explanation: 'האלף-בית בסדר הפוך: ת, ש, ר … נ!',
  },

  // ─── Mixed patterns ───────────────────────────────────────────────────────────
  {
    id: 41, difficulty: 'medium',
    grid: ['50','45','40','35','30','25','20','15'],
    answer: '10',
    wrongOptions: ['5','12','8'],
    explanation: 'הסדרה יורדת ב-5 בכל פעם: 50, 45, 40 … 10!',
  },
  {
    id: 42, difficulty: 'hard',
    grid: ['🎵','🎶','🎸','🎵','🎶','🎸','🎵','🎶'],
    answer: '🎸',
    wrongOptions: ['🎵','🥁','🎹'],
    explanation: 'התבנית: תו, נגינה, גיטרה — חוזרת שוב ושוב!',
  },
];
