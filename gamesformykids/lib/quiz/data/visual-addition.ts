export type VisualAdditionQuestion = {
  id: number;
  question: string;
  answer: string;
  emoji: string;
  wrongOptions: [string, string, string];
};

export const VISUAL_ADDITION_QUESTIONS: VisualAdditionQuestion[] = [
  { id: 1,  question: "🐸 + 🐸 = ?",                        answer: "2",  emoji: "🐸", wrongOptions: ["1",  "3",  "4"]  },
  { id: 2,  question: "🍎🍎 + 🍎 = ?",                      answer: "3",  emoji: "🍎", wrongOptions: ["2",  "4",  "5"]  },
  { id: 3,  question: "⭐⭐ + ⭐⭐ = ?",                     answer: "4",  emoji: "⭐", wrongOptions: ["3",  "5",  "6"]  },
  { id: 4,  question: "🐶🐶🐶 + 🐶🐶 = ?",                  answer: "5",  emoji: "🐶", wrongOptions: ["4",  "6",  "7"]  },
  { id: 5,  question: "🎈🎈🎈 + 🎈🎈🎈 = ?",               answer: "6",  emoji: "🎈", wrongOptions: ["5",  "7",  "8"]  },
  { id: 6,  question: "🌟🌟🌟🌟 + 🌟🌟🌟 = ?",             answer: "7",  emoji: "🌟", wrongOptions: ["6",  "8",  "9"]  },
  { id: 7,  question: "🐱🐱🐱🐱 + 🐱🐱🐱🐱 = ?",          answer: "8",  emoji: "🐱", wrongOptions: ["7",  "9",  "6"]  },
  { id: 8,  question: "🍌🍌🍌🍌🍌 + 🍌🍌🍌🍌 = ?",         answer: "9",  emoji: "🍌", wrongOptions: ["8",  "10", "7"]  },
  { id: 9,  question: "🦋🦋🦋🦋🦋 + 🦋🦋🦋🦋🦋 = ?",      answer: "10", emoji: "🦋", wrongOptions: ["9",  "8",  "11"] },
  { id: 10, question: "🌸 + 🌸🌸 = ?",                      answer: "3",  emoji: "🌸", wrongOptions: ["2",  "4",  "5"]  },
  { id: 11, question: "🏀🏀 + 🏀🏀🏀 = ?",                 answer: "5",  emoji: "🏀", wrongOptions: ["4",  "6",  "7"]  },
  { id: 12, question: "🦊🦊🦊 + 🦊 = ?",                   answer: "4",  emoji: "🦊", wrongOptions: ["3",  "5",  "6"]  },
  { id: 13, question: "🍕 + 🍕🍕🍕 = ?",                   answer: "4",  emoji: "🍕", wrongOptions: ["3",  "5",  "2"]  },
  { id: 14, question: "🌈🌈 + 🌈🌈🌈🌈 = ?",               answer: "6",  emoji: "🌈", wrongOptions: ["5",  "7",  "8"]  },
  { id: 15, question: "🐘🐘🐘🐘 + 🐘🐘 = ?",               answer: "6",  emoji: "🐘", wrongOptions: ["5",  "7",  "8"]  },
  { id: 16, question: "🎵🎵 + 🎵🎵🎵🎵🎵 = ?",             answer: "7",  emoji: "🎵", wrongOptions: ["6",  "8",  "5"]  },
  { id: 17, question: "🍦🍦🍦🍦🍦 + 🍦🍦🍦 = ?",           answer: "8",  emoji: "🍦", wrongOptions: ["7",  "9",  "6"]  },
  { id: 18, question: "🐟🐟🐟🐟 + 🐟🐟🐟🐟🐟 = ?",         answer: "9",  emoji: "🐟", wrongOptions: ["8",  "10", "7"]  },
  { id: 19, question: "🌻🌻🌻🌻🌻🌻 + 🌻🌻🌻🌻 = ?",        answer: "10", emoji: "🌻", wrongOptions: ["9",  "8",  "11"] },
  { id: 20, question: "🍇🍇🍇 + 🍇🍇🍇🍇 = ?",             answer: "7",  emoji: "🍇", wrongOptions: ["6",  "8",  "5"]  },
  { id: 21, question: "🎯 + 🎯🎯🎯🎯 = ?",                 answer: "5",  emoji: "🎯", wrongOptions: ["4",  "6",  "3"]  },
  { id: 22, question: "🐢🐢 + 🐢🐢🐢🐢🐢🐢 = ?",           answer: "8",  emoji: "🐢", wrongOptions: ["7",  "9",  "10"] },
  { id: 23, question: "🦁🦁🦁🦁🦁🦁🦁 + 🦁🦁🦁 = ?",      answer: "10", emoji: "🦁", wrongOptions: ["9",  "8",  "11"] },
  { id: 24, question: "🍩🍩 + 🍩 = ?",                     answer: "3",  emoji: "🍩", wrongOptions: ["2",  "4",  "5"]  },
];
