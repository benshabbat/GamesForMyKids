export interface VerbQuestion {
  id: number;
  question: string;
  answer: string;
  emoji: string;
  wrongOptions: [string, string, string];
}

export const VERBS_QUESTIONS: VerbQuestion[] = [
  { id: 1,  question: "🏃 הילד...",           answer: "רץ",      emoji: "🏃", wrongOptions: ["ישן",    "שר",     "קופץ"]    },
  { id: 2,  question: "😴 הילדה...",          answer: "ישנה",    emoji: "😴", wrongOptions: ["אוכלת", "שרה",    "בוכה"]    },
  { id: 3,  question: "🍽️ הכלב...",           answer: "אוכל",    emoji: "🍽️", wrongOptions: ["שותה",  "ישן",    "קופץ"]    },
  { id: 4,  question: "📚 הילד...",           answer: "קורא",    emoji: "📚", wrongOptions: ["כותב",  "ישן",    "מחייך"]   },
  { id: 5,  question: "🎵 הילדה...",          answer: "שרה",     emoji: "🎵", wrongOptions: ["רצה",   "ישנה",   "בוכה"]    },
  { id: 6,  question: "✏️ הילדה...",          answer: "כותבת",   emoji: "✏️", wrongOptions: ["קוראת", "שרה",    "צובעת"]   },
  { id: 7,  question: "🐟 הדג...",            answer: "שוחה",    emoji: "🐟", wrongOptions: ["עף",    "קופץ",   "רץ"]      },
  { id: 8,  question: "🐦 הציפור...",         answer: "עפה",     emoji: "🐦", wrongOptions: ["שוחה",  "רצה",    "קופצת"]   },
  { id: 9,  question: "😢 הילד...",           answer: "בוכה",    emoji: "😢", wrongOptions: ["צוחק",  "שר",     "ישן"]     },
  { id: 10, question: "😄 הילדה...",          answer: "צוחקת",   emoji: "😄", wrongOptions: ["בוכה",  "ישנה",   "שרה"]     },
  { id: 11, question: "🧗 הילד...",           answer: "מטפס",    emoji: "🧗", wrongOptions: ["קופץ",  "שוחה",   "רץ"]      },
  { id: 12, question: "🎨 הילדה...",          answer: "מציירת",  emoji: "🎨", wrongOptions: ["כותבת", "קוראת",  "שרה"]     },
  { id: 13, question: "⚽ הילד...",           answer: "משחק",    emoji: "⚽", wrongOptions: ["קורא",  "ישן",    "אוכל"]    },
  { id: 14, question: "🐇 הארנב...",          answer: "קופץ",    emoji: "🐇", wrongOptions: ["שוחה",  "עף",     "רץ"]      },
  { id: 15, question: "🚿 הילדה...",          answer: "מתרחצת",  emoji: "🚿", wrongOptions: ["ישנה",  "שרה",    "אוכלת"]   },
  { id: 16, question: "👕 הילד...",           answer: "לובש",    emoji: "👕", wrongOptions: ["אוכל",  "שותה",   "קורא"]    },
  { id: 17, question: "💃 הילדה...",          answer: "רוקדת",   emoji: "💃", wrongOptions: ["שרה",   "ישנה",   "בוכה"]    },
  { id: 18, question: "🐱 החתול...",          answer: "ישן",     emoji: "🐱", wrongOptions: ["שוחה",  "עף",     "רץ"]      },
  { id: 19, question: "🌱 הצמח...",           answer: "גדל",     emoji: "🌱", wrongOptions: ["רץ",    "קופץ",   "עף"]      },
  { id: 20, question: "☕ הילד...",           answer: "שותה",    emoji: "☕", wrongOptions: ["אוכל",  "קורא",   "ישן"]     },
];
