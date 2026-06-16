export type SNLQuestion = {
  id: number;
  question: string;
  answer: string;
  wrongOptions: [string, string, string];
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export const SNL_QUESTIONS: SNLQuestion[] = [
  // EASY (squares 1–33)
  { id: 1,  emoji: '➕', difficulty: 'easy',   question: 'כמה זה 3 + 4?',          answer: '7',  wrongOptions: ['5', '8', '6'] },
  { id: 2,  emoji: '➖', difficulty: 'easy',   question: 'כמה זה 9 - 3?',          answer: '6',  wrongOptions: ['5', '7', '4'] },
  { id: 3,  emoji: '➕', difficulty: 'easy',   question: 'כמה זה 5 + 6?',          answer: '11', wrongOptions: ['9', '12', '10'] },
  { id: 4,  emoji: '➖', difficulty: 'easy',   question: 'כמה זה 10 - 4?',         answer: '6',  wrongOptions: ['5', '7', '8'] },
  { id: 5,  emoji: '➕', difficulty: 'easy',   question: 'כמה זה 4 + 8?',          answer: '12', wrongOptions: ['11', '13', '10'] },
  { id: 6,  emoji: '➖', difficulty: 'easy',   question: 'כמה זה 15 - 7?',         answer: '8',  wrongOptions: ['7', '9', '6'] },
  { id: 7,  emoji: '➕', difficulty: 'easy',   question: 'כמה זה 7 + 6?',          answer: '13', wrongOptions: ['12', '14', '11'] },
  { id: 8,  emoji: '➖', difficulty: 'easy',   question: 'כמה זה 20 - 8?',         answer: '12', wrongOptions: ['10', '11', '13'] },
  { id: 9,  emoji: '📅', difficulty: 'easy',   question: 'כמה ימים יש בשבוע?',     answer: '7',  wrongOptions: ['5', '6', '8'] },
  { id: 10, emoji: '🗓️', difficulty: 'easy',   question: 'כמה חודשים יש בשנה?',   answer: '12', wrongOptions: ['10', '11', '13'] },
  { id: 11, emoji: '➕', difficulty: 'easy',   question: 'כמה זה 6 + 9?',          answer: '15', wrongOptions: ['13', '14', '16'] },
  // MEDIUM (squares 34–66)
  { id: 12, emoji: '✖️', difficulty: 'medium', question: 'כמה זה 3 × 6?',          answer: '18', wrongOptions: ['15', '21', '9'] },
  { id: 13, emoji: '✖️', difficulty: 'medium', question: 'כמה זה 4 × 7?',          answer: '28', wrongOptions: ['24', '32', '21'] },
  { id: 14, emoji: '✖️', difficulty: 'medium', question: 'כמה זה 5 × 8?',          answer: '40', wrongOptions: ['35', '45', '30'] },
  { id: 15, emoji: '✖️', difficulty: 'medium', question: 'כמה זה 7 × 7?',          answer: '49', wrongOptions: ['42', '56', '36'] },
  { id: 16, emoji: '✖️', difficulty: 'medium', question: 'כמה זה 6 × 9?',          answer: '54', wrongOptions: ['48', '63', '45'] },
  { id: 17, emoji: '➗', difficulty: 'medium', question: 'כמה זה 24 ÷ 4?',         answer: '6',  wrongOptions: ['5', '7', '8'] },
  { id: 18, emoji: '➗', difficulty: 'medium', question: 'כמה זה 35 ÷ 5?',         answer: '7',  wrongOptions: ['6', '8', '5'] },
  { id: 19, emoji: '➗', difficulty: 'medium', question: 'כמה זה 42 ÷ 6?',         answer: '7',  wrongOptions: ['6', '8', '9'] },
  { id: 20, emoji: '➕', difficulty: 'medium', question: 'כמה זה 18 + 27?',        answer: '45', wrongOptions: ['43', '47', '35'] },
  { id: 21, emoji: '➖', difficulty: 'medium', question: 'כמה זה 50 - 17?',        answer: '33', wrongOptions: ['31', '35', '37'] },
  { id: 22, emoji: '✖️', difficulty: 'medium', question: 'כמה זה 8 × 4?',          answer: '32', wrongOptions: ['28', '36', '24'] },
  // HARD (squares 67–100)
  { id: 23, emoji: '✖️', difficulty: 'hard',   question: 'כמה זה 8 × 9?',          answer: '72', wrongOptions: ['63', '81', '64'] },
  { id: 24, emoji: '✖️', difficulty: 'hard',   question: 'כמה זה 7 × 12?',         answer: '84', wrongOptions: ['77', '91', '72'] },
  { id: 25, emoji: '➗', difficulty: 'hard',   question: 'כמה זה 81 ÷ 9?',         answer: '9',  wrongOptions: ['7', '8', '11'] },
  { id: 26, emoji: '➗', difficulty: 'hard',   question: 'כמה זה 56 ÷ 7?',         answer: '8',  wrongOptions: ['7', '6', '9'] },
  { id: 27, emoji: '➗', difficulty: 'hard',   question: 'כמה זה 72 ÷ 8?',         answer: '9',  wrongOptions: ['8', '7', '12'] },
  { id: 28, emoji: '✖️', difficulty: 'hard',   question: 'כמה זה 9 × 11?',         answer: '99', wrongOptions: ['88', '108', '90'] },
  { id: 29, emoji: '⏰', difficulty: 'hard',   question: 'כמה שניות יש בדקה?',    answer: '60', wrongOptions: ['30', '100', '45'] },
  { id: 30, emoji: '🕐', difficulty: 'hard',   question: 'כמה דקות יש בשעה?',     answer: '60', wrongOptions: ['30', '100', '24'] },
  { id: 31, emoji: '☀️', difficulty: 'hard',   question: 'כמה שעות יש ביממה?',   answer: '24', wrongOptions: ['12', '30', '48'] },
  { id: 32, emoji: '➕', difficulty: 'hard',   question: 'כמה זה 67 + 35?',        answer: '102',wrongOptions: ['98', '95', '107'] },
];

export function getQuestionForSquare(square: number): SNLQuestion {
  const difficulty = square <= 33 ? 'easy' : square <= 66 ? 'medium' : 'hard';
  const pool = SNL_QUESTIONS.filter(q => q.difficulty === difficulty);
  return pool[Math.floor(Math.random() * pool.length)] ?? SNL_QUESTIONS[0]!;
}
