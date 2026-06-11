export type FinalLetterQuestion = {
  id: number;
  question: string;
  answer: string;
  emoji: string;
  wrongOptions: [string, string, string];
};

export const FINAL_LETTER_QUESTIONS: FinalLetterQuestion[] = [
  { id: 1,  question: "מה האות הסופית של מ?",    answer: "ם",  emoji: "מ", wrongOptions: ["ן", "ף", "ץ"] },
  { id: 2,  question: "מה האות הסופית של נ?",    answer: "ן",  emoji: "נ", wrongOptions: ["ם", "ך", "ץ"] },
  { id: 3,  question: "מה האות הסופית של פ?",    answer: "ף",  emoji: "פ", wrongOptions: ["ץ", "ם", "ן"] },
  { id: 4,  question: "מה האות הסופית של צ?",    answer: "ץ",  emoji: "צ", wrongOptions: ["ף", "ן", "ם"] },
  { id: 5,  question: "מה האות הסופית של כ?",    answer: "ך",  emoji: "כ", wrongOptions: ["ם", "ן", "ף"] },
  { id: 6,  question: "לאיזו אות שייכת הצורה ם?", answer: "מ",  emoji: "ם", wrongOptions: ["נ", "פ", "כ"] },
  { id: 7,  question: "לאיזו אות שייכת הצורה ן?", answer: "נ",  emoji: "ן", wrongOptions: ["מ", "פ", "צ"] },
  { id: 8,  question: "לאיזו אות שייכת הצורה ף?", answer: "פ",  emoji: "ף", wrongOptions: ["כ", "מ", "צ"] },
  { id: 9,  question: "לאיזו אות שייכת הצורה ץ?", answer: "צ",  emoji: "ץ", wrongOptions: ["כ", "נ", "פ"] },
  { id: 10, question: "לאיזו אות שייכת הצורה ך?", answer: "כ",  emoji: "ך", wrongOptions: ["מ", "נ", "פ"] },
  { id: 11, question: "במילה \"שָׁלוֹם\" — איזו אות בסוף?", answer: "מ — ם",  emoji: "✌️", wrongOptions: ["נ — ן", "פ — ף", "כ — ך"] },
  { id: 12, question: "במילה \"גָּן\" — איזו אות בסוף?",   answer: "נ — ן",  emoji: "🌳", wrongOptions: ["מ — ם", "כ — ך", "צ — ץ"] },
  { id: 13, question: "במילה \"אַף\" — איזו אות בסוף?",    answer: "פ — ף",  emoji: "👃", wrongOptions: ["כ — ך", "נ — ן", "מ — ם"] },
  { id: 14, question: "כמה אותיות סופיות יש בעברית?", answer: "5", emoji: "🔢", wrongOptions: ["3", "4", "6"] },
  { id: 15, question: "מה הצורה הסופית של האות כ?",  answer: "ך", emoji: "כ", wrongOptions: ["ם", "ן", "ף"] },
  { id: 16, question: "איזו מהאותיות הבאות היא אות סופית?", answer: "ם", emoji: "🔤", wrongOptions: ["מ", "נ", "פ"] },
  { id: 17, question: "איזו מהאותיות הבאות היא אות סופית?", answer: "ץ", emoji: "🔤", wrongOptions: ["צ", "כ", "מ"] },
  { id: 18, question: "איזו מהאותיות הבאות היא אות סופית?", answer: "ך", emoji: "🔤", wrongOptions: ["כ", "נ", "פ"] },
  { id: 19, question: "במילה \"חוֹף\" — איזו אות בסוף?",   answer: "פ — ף",  emoji: "🏖️", wrongOptions: ["כ — ך", "מ — ם", "נ — ן"] },
  { id: 20, question: "במילה \"קַיִץ\" — איזו אות בסוף?",  answer: "צ — ץ",  emoji: "☀️", wrongOptions: ["נ — ן", "פ — ף", "מ — ם"] },
];
