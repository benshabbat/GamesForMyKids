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
  { id: 6,  word: "נר",   answer: "פר",    emoji: "🕯️", wrongOptions: ["שמש",   "ילד",   "בית"]   },
  { id: 7,  word: "עץ",   answer: "חץ",    emoji: "🌳", wrongOptions: ["ספר",   "כלב",   "אמא"]   },
  { id: 8,  word: "אמא",  answer: "שמה",   emoji: "👩", wrongOptions: ["ילד",   "כוכב",  "בית"]   },
  { id: 9,  word: "אב",   answer: "גב",    emoji: "👨", wrongOptions: ["ספר",   "שמש",   "ילד"]   },
  { id: 10, word: "שן",   answer: "כן",    emoji: "🦷", wrongOptions: ["שמש",   "ילד",   "בית"]   },
  { id: 11, word: "ירח",  answer: "כרח",   emoji: "🌙", wrongOptions: ["שמש",   "כוכב",  "ענן"]   },
  { id: 12, word: "פרח",  answer: "ברח",   emoji: "🌸", wrongOptions: ["עץ",    "ילד",   "בית"]   },
  { id: 13, word: "ים",   answer: "שם",    emoji: "🌊", wrongOptions: ["ילד",   "ספר",   "כלב"]   },
  { id: 14, word: "דלת",  answer: "קלת",   emoji: "🚪", wrongOptions: ["בית",   "חלון",  "כיסא"]  },
  { id: 15, word: "חתול", answer: "גדול",  emoji: "🐱", wrongOptions: ["כלב",   "שמש",   "ירוק"]  },
  { id: 16, word: "ספינה",answer: "מכינה", emoji: "🚢", wrongOptions: ["מטוס",  "אוטו",  "אופניים"]},
  { id: 17, word: "גשר",  answer: "כשר",   emoji: "🌉", wrongOptions: ["ילד",   "בית",   "שמש"]   },
  { id: 18, word: "בן",   answer: "גן",    emoji: "👦", wrongOptions: ["בית",   "ספר",   "כלב"]   },
  { id: 19, word: "ביצה", answer: "מיצה",  emoji: "🥚", wrongOptions: ["חלב",   "גבינה", "יוגורט"] },
  { id: 20, word: "צב",   answer: "טב",    emoji: "🐢", wrongOptions: ["דג",    "ציפור", "ארנב"]   },
];
