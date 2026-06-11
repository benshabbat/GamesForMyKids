export type AlphabetOrderQuestion = {
  id: number;
  question: string;
  answer: string;
  emoji: string;
  wrongOptions: [string, string, string];
};

const ALEF_BET = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];

export const ALPHABET_ORDER_QUESTIONS: AlphabetOrderQuestion[] = [
  { id: 1,  question: "מה האות הראשונה באלפבית?",       answer: "א",  emoji: "🔠", wrongOptions: ["ב", "ג", "ד"] },
  { id: 2,  question: "מה האות השנייה באלפבית?",        answer: "ב",  emoji: "2️⃣", wrongOptions: ["א", "ג", "ד"] },
  { id: 3,  question: "מה האות השלישית באלפבית?",       answer: "ג",  emoji: "3️⃣", wrongOptions: ["ב", "ד", "ה"] },
  { id: 4,  question: "מה האות האחרונה באלפבית?",       answer: "ת",  emoji: "🔚", wrongOptions: ["ש", "ר", "ק"] },
  { id: 5,  question: "מה האות שאחרי ג?",               answer: "ד",  emoji: "➡️", wrongOptions: ["ה", "ב", "ו"] },
  { id: 6,  question: "מה האות שאחרי ז?",               answer: "ח",  emoji: "➡️", wrongOptions: ["ט", "ו", "י"] },
  { id: 7,  question: "מה האות שאחרי כ?",               answer: "ל",  emoji: "➡️", wrongOptions: ["מ", "י", "נ"] },
  { id: 8,  question: "מה האות שאחרי מ?",               answer: "נ",  emoji: "➡️", wrongOptions: ["ל", "ס", "ע"] },
  { id: 9,  question: "מה האות שלפני ת?",               answer: "ש",  emoji: "⬅️", wrongOptions: ["ר", "ק", "צ"] },
  { id: 10, question: "מה האות שלפני ש?",               answer: "ר",  emoji: "⬅️", wrongOptions: ["ת", "ק", "פ"] },
  { id: 11, question: "כמה אותיות יש באלפבית העברי?",   answer: "22", emoji: "🔢", wrongOptions: ["20", "24", "26"] },
  { id: 12, question: "מה האות בסדר ה-10 באלפבית?",     answer: "י",  emoji: "🔟", wrongOptions: ["ט", "כ", "ח"] },
  { id: 13, question: "מה האות בסדר ה-5 באלפבית?",      answer: "ה",  emoji: "5️⃣", wrongOptions: ["ד", "ו", "ג"] },
  { id: 14, question: "מה האות בסדר ה-12 באלפבית?",     answer: "ל",  emoji: "🔢", wrongOptions: ["כ", "מ", "י"] },
  { id: 15, question: "איזו אות בין ד לו?",             answer: "ה",  emoji: "🔤", wrongOptions: ["ג", "ז", "ח"] },
  { id: 16, question: "איזו אות בין ח לי?",             answer: "ט",  emoji: "🔤", wrongOptions: ["ז", "כ", "ו"] },
  { id: 17, question: "מה האות שאחרי ת?",               answer: "אין — ת היא האחרונה", emoji: "🛑", wrongOptions: ["א", "ב", "כ"] },
  { id: 18, question: "מה האות שאחרי ס?",               answer: "ע",  emoji: "➡️", wrongOptions: ["פ", "נ", "צ"] },
  { id: 19, question: "מה האות שאחרי ר?",               answer: "ש",  emoji: "➡️", wrongOptions: ["ת", "ק", "פ"] },
  { id: 20, question: "מה האות בסדר ה-18 באלפבית?",     answer: "צ",  emoji: "🔢", wrongOptions: ["פ", "ק", "ס"] },
];

export { ALEF_BET };
