export type GenderQuestion = {
  id: number;
  question: string;
  answer: string;
  emoji: string;
  wrongOptions: [string, string, string];
};

export const GENDER_QUESTIONS: GenderQuestion[] = [
  { id: 1,  question: "ילד — זכר או נקבה?",        answer: "זכר",   emoji: "👦", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 2,  question: "ילדה — זכר או נקבה?",       answer: "נקבה",  emoji: "👧", wrongOptions: ["זכר",   "שניהם", "אין מין"] },
  { id: 3,  question: "כלב — זכר או נקבה?",        answer: "זכר",   emoji: "🐕", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 4,  question: "חתולה — זכר או נקבה?",      answer: "נקבה",  emoji: "🐱", wrongOptions: ["זכר",   "שניהם", "אין מין"] },
  { id: 5,  question: "ספר — זכר או נקבה?",        answer: "זכר",   emoji: "📚", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 6,  question: "שמש — זכר או נקבה?",        answer: "נקבה",  emoji: "☀️", wrongOptions: ["זכר",   "שניהם", "אין מין"] },
  { id: 7,  question: "כסא — זכר או נקבה?",        answer: "זכר",   emoji: "🪑", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 8,  question: "מנורה — זכר או נקבה?",      answer: "נקבה",  emoji: "💡", wrongOptions: ["זכר",   "שניהם", "אין מין"] },
  { id: 9,  question: "בית — זכר או נקבה?",        answer: "זכר",   emoji: "🏠", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 10, question: "שולחן — זכר או נקבה?",      answer: "זכר",   emoji: "🪑", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 11, question: "תפוח — זכר או נקבה?",       answer: "זכר",   emoji: "🍎", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 12, question: "עוגה — זכר או נקבה?",       answer: "נקבה",  emoji: "🎂", wrongOptions: ["זכר",   "שניהם", "אין מין"] },
  { id: 13, question: "אריה — זכר או נקבה?",       answer: "זכר",   emoji: "🦁", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 14, question: "פרפר — זכר או נקבה?",       answer: "זכר",   emoji: "🦋", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 15, question: "ציפור — זכר או נקבה?",      answer: "נקבה",  emoji: "🐦", wrongOptions: ["זכר",   "שניהם", "אין מין"] },
  { id: 16, question: "עיר — זכר או נקבה?",        answer: "נקבה",  emoji: "🏙️", wrongOptions: ["זכר",   "שניהם", "אין מין"] },
  { id: 17, question: "ים — זכר או נקבה?",         answer: "זכר",   emoji: "🌊", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 18, question: "ירח — זכר או נקבה?",        answer: "זכר",   emoji: "🌙", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 19, question: "מכונית — זכר או נקבה?",     answer: "נקבה",  emoji: "🚗", wrongOptions: ["זכר",   "שניהם", "אין מין"] },
  { id: 20, question: "עץ — זכר או נקבה?",         answer: "זכר",   emoji: "🌳", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 21, question: "פרח — זכר או נקבה?",        answer: "זכר",   emoji: "🌸", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 22, question: "דלת — זכר או נקבה?",        answer: "נקבה",  emoji: "🚪", wrongOptions: ["זכר",   "שניהם", "אין מין"] },
  { id: 23, question: "כוכב — זכר או נקבה?",       answer: "זכר",   emoji: "⭐", wrongOptions: ["נקבה",  "שניהם", "אין מין"] },
  { id: 24, question: "שמיכה — זכר או נקבה?",      answer: "נקבה",  emoji: "🛏️", wrongOptions: ["זכר",   "שניהם", "אין מין"] },
];
