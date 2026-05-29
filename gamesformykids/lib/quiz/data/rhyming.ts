export type RhymingQuestion = {
  id: number;
  word: string;
  answer: string;
  emoji: string;
  wrongOptions: [string, string, string];
};

export const RHYMING_QUESTIONS: RhymingQuestion[] = [
  { id: 1,  word: "כלב",  answer: "גנב",   emoji: "🐕", wrongOptions: ["שולחן", "עוגה",  "חתול"]  },
  { id: 2,  word: "בית",  answer: "שיט",   emoji: "🏠", wrongOptions: ["ירח",   "כדור",  "עץ"]    },
  { id: 3,  word: "שמש",  answer: "חמש",   emoji: "☀️", wrongOptions: ["ילד",   "דג",    "כלב"]   },
  { id: 4,  word: "ילד",  answer: "גדל",   emoji: "👦", wrongOptions: ["בית",   "אור",   "שמש"]   },
  { id: 5,  word: "ספר",  answer: "פרח",   emoji: "📚", wrongOptions: ["בית",   "כוכב",  "ירוק"]  },
  { id: 6,  word: "דג",   answer: "בג",    emoji: "🐟", wrongOptions: ["עוף",   "ילד",   "אחד"]   },
  { id: 7,  word: "עץ",   answer: "חץ",    emoji: "🌳", wrongOptions: ["ספר",   "כלב",   "אמא"]   },
  { id: 8,  word: "אמא",  answer: "שמה",   emoji: "👩", wrongOptions: ["ילד",   "כוכב",  "בית"]   },
  { id: 9,  word: "לב",   answer: "חב",    emoji: "❤️", wrongOptions: ["רגל",   "שמש",   "עוגה"]  },
  { id: 10, word: "כוכב", answer: "לוקב",  emoji: "⭐", wrongOptions: ["ירח",   "שמש",   "ענן"]   },
  { id: 11, word: "ירח",  answer: "כרח",   emoji: "🌙", wrongOptions: ["שמש",   "כוכב",  "ענן"]   },
  { id: 12, word: "פרח",  answer: "כרח",   emoji: "🌸", wrongOptions: ["עץ",    "ילד",   "בית"]   },
  { id: 13, word: "עוגה", answer: "לוגה",  emoji: "🎂", wrongOptions: ["כלב",   "ספר",   "שמש"]   },
  { id: 14, word: "דלת",  answer: "קלת",   emoji: "🚪", wrongOptions: ["בית",   "חלון",  "כיסא"]  },
  { id: 15, word: "חתול", answer: "גדול",  emoji: "🐱", wrongOptions: ["כלב",   "שמש",   "ירוק"]  },
  { id: 16, word: "ספינה",answer: "אבינה", emoji: "🚢", wrongOptions: ["מטוס",  "אוטו",  "אופניים"]},
  { id: 17, word: "תפוח", answer: "ראפוח", emoji: "🍎", wrongOptions: ["ספר",   "כלב",   "בית"]   },
  { id: 18, word: "כסא",  answer: "לסא",   emoji: "🪑", wrongOptions: ["שולחן", "מיטה",  "ספה"]   },
  { id: 19, word: "ביצה", answer: "מיצה",  emoji: "🥚", wrongOptions: ["חלב",   "גבינה", "יוגורט"] },
  { id: 20, word: "צב",   answer: "טב",    emoji: "🐢", wrongOptions: ["דג",    "ציפור", "ארנב"]   },
];
