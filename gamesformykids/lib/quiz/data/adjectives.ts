export type AdjectiveQuestion = {
  id: number;
  question: string;
  answer: string;
  emoji: string;
  wrongOptions: [string, string, string];
};

export const ADJECTIVE_QUESTIONS: AdjectiveQuestion[] = [
  { id: 1,  question: "🐘 הפיל הוא...",            answer: "גדול",   emoji: "🐘", wrongOptions: ["קטן",   "מהיר",  "כחול"]   },
  { id: 2,  question: "🐜 הנמלה היא...",            answer: "קטנה",   emoji: "🐜", wrongOptions: ["גדולה", "איטית", "אדומה"]  },
  { id: 3,  question: "🐢 הצב הוא...",              answer: "איטי",   emoji: "🐢", wrongOptions: ["מהיר",  "גדול",  "קטן"]    },
  { id: 4,  question: "🐆 הנמר הוא...",             answer: "מהיר",   emoji: "🐆", wrongOptions: ["איטי",  "כבד",   "קטן"]    },
  { id: 5,  question: "😄 הילד מחייך — הוא...",    answer: "שמח",    emoji: "😄", wrongOptions: ["עצוב",  "כועס",  "פוחד"]   },
  { id: 6,  question: "😢 הילדה בוכה — היא...",    answer: "עצובה",  emoji: "😢", wrongOptions: ["שמחה",  "עייפה", "רעבה"]   },
  { id: 7,  question: "☀️ השמש היא...",             answer: "חמה",    emoji: "☀️", wrongOptions: ["קרה",   "לחה",   "חשוכה"]  },
  { id: 8,  question: "❄️ השלג הוא...",             answer: "קר",     emoji: "❄️", wrongOptions: ["חם",    "רטוב",  "גדול"]   },
  { id: 9,  question: "🪨 האבן היא...",             answer: "קשה",    emoji: "🪨", wrongOptions: ["רכה",   "קלה",   "חמה"]    },
  { id: 10, question: "🧸 הבובה היא...",            answer: "רכה",    emoji: "🧸", wrongOptions: ["קשה",   "כבדה",  "חמה"]    },
  { id: 11, question: "🏔️ ההר הוא...",             answer: "גבוה",   emoji: "🏔️", wrongOptions: ["נמוך",  "רחב",   "ישן"]    },
  { id: 12, question: "🏺 הכד הנמוך הוא...",       answer: "נמוך",   emoji: "🏺", wrongOptions: ["גבוה",  "ישן",   "חדש"]    },
  { id: 13, question: "🏋️ כדור הברזל הוא...",      answer: "כבד",    emoji: "🏋️", wrongOptions: ["קל",    "רך",    "קטן"]    },
  { id: 14, question: "🪶 הנוצה היא...",            answer: "קלה",    emoji: "🪶", wrongOptions: ["כבדה",  "קשה",   "גדולה"]  },
  { id: 15, question: "🧽 הספוג הוא...",            answer: "רטוב",   emoji: "🧽", wrongOptions: ["יבש",   "קשה",   "קטן"]    },
  { id: 16, question: "📱 הטלפון החדש הוא...",      answer: "חדש",    emoji: "📱", wrongOptions: ["ישן",   "גדול",  "כבד"]    },
  { id: 17, question: "📚 הספר הישן הוא...",        answer: "ישן",    emoji: "📚", wrongOptions: ["חדש",   "קטן",   "כבד"]    },
  { id: 18, question: "🧴 הבגד הנקי הוא...",       answer: "נקי",    emoji: "👕", wrongOptions: ["מלוכלך","ישן",   "רטוב"]   },
  { id: 19, question: "😴 הילד עייף — הוא...",     answer: "עייף",   emoji: "😴", wrongOptions: ["שמח",   "ערני",  "רעב"]    },
  { id: 20, question: "😡 מה זה 'כועס'?",           answer: "לא שמח ורוצה לצעוק", emoji: "😡", wrongOptions: ["עייף ורוצה לישון", "שמח ורוצה לקפץ", "עצוב ורוצה לבכות"] },
];
