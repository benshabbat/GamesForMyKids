export type DivisionQuestion = {
  id: number;
  dividend: number;
  divisor: number;
  quotient: number;
  emoji: string;
  wrongOptions: [string, string, string];
};

export const DIVISION_QUESTIONS: DivisionQuestion[] = [
  // ÷2 — easy
  { id: 1,  dividend: 4,  divisor: 2, quotient: 2, emoji: '🍎', wrongOptions: ['1', '3', '4'] },
  { id: 2,  dividend: 6,  divisor: 2, quotient: 3, emoji: '⭐', wrongOptions: ['2', '4', '5'] },
  { id: 3,  dividend: 8,  divisor: 2, quotient: 4, emoji: '🌸', wrongOptions: ['3', '5', '6'] },
  { id: 4,  dividend: 10, divisor: 2, quotient: 5, emoji: '🐠', wrongOptions: ['4', '6', '7'] },
  { id: 5,  dividend: 12, divisor: 2, quotient: 6, emoji: '🍬', wrongOptions: ['5', '7', '8'] },

  // ÷3 — easy
  { id: 6,  dividend: 6,  divisor: 3, quotient: 2, emoji: '🌈', wrongOptions: ['1', '3', '4'] },
  { id: 7,  dividend: 9,  divisor: 3, quotient: 3, emoji: '🎈', wrongOptions: ['2', '4', '5'] },
  { id: 8,  dividend: 12, divisor: 3, quotient: 4, emoji: '🦋', wrongOptions: ['3', '5', '6'] },
  { id: 9,  dividend: 15, divisor: 3, quotient: 5, emoji: '🍕', wrongOptions: ['4', '6', '7'] },
  { id: 10, dividend: 18, divisor: 3, quotient: 6, emoji: '🐸', wrongOptions: ['5', '7', '8'] },

  // ÷4 — medium
  { id: 11, dividend: 8,  divisor: 4, quotient: 2, emoji: '🌟', wrongOptions: ['1', '3', '4'] },
  { id: 12, dividend: 12, divisor: 4, quotient: 3, emoji: '🍦', wrongOptions: ['2', '4', '5'] },
  { id: 13, dividend: 16, divisor: 4, quotient: 4, emoji: '🐶', wrongOptions: ['3', '5', '6'] },
  { id: 14, dividend: 20, divisor: 4, quotient: 5, emoji: '🍓', wrongOptions: ['4', '6', '7'] },
  { id: 15, dividend: 24, divisor: 4, quotient: 6, emoji: '🎭', wrongOptions: ['5', '7', '8'] },

  // ÷5 — medium
  { id: 16, dividend: 10, divisor: 5, quotient: 2, emoji: '🚀', wrongOptions: ['1', '3', '4'] },
  { id: 17, dividend: 15, divisor: 5, quotient: 3, emoji: '🌺', wrongOptions: ['2', '4', '5'] },
  { id: 18, dividend: 20, divisor: 5, quotient: 4, emoji: '🦊', wrongOptions: ['3', '5', '6'] },
  { id: 19, dividend: 25, divisor: 5, quotient: 5, emoji: '🎵', wrongOptions: ['4', '6', '7'] },
  { id: 20, dividend: 30, divisor: 5, quotient: 6, emoji: '🍄', wrongOptions: ['5', '7', '8'] },

  // ÷6 — hard
  { id: 21, dividend: 12, divisor: 6, quotient: 2, emoji: '🏆', wrongOptions: ['1', '3', '4'] },
  { id: 22, dividend: 18, divisor: 6, quotient: 3, emoji: '🎯', wrongOptions: ['2', '4', '5'] },
  { id: 23, dividend: 24, divisor: 6, quotient: 4, emoji: '🌙', wrongOptions: ['3', '5', '6'] },

  // ÷7 — hard
  { id: 24, dividend: 14, divisor: 7, quotient: 2, emoji: '🐙', wrongOptions: ['1', '3', '4'] },
  { id: 25, dividend: 21, divisor: 7, quotient: 3, emoji: '🎪', wrongOptions: ['2', '4', '5'] },

  // ÷8 — hard
  { id: 26, dividend: 16, divisor: 8, quotient: 2, emoji: '🦄', wrongOptions: ['1', '3', '4'] },
  { id: 27, dividend: 24, divisor: 8, quotient: 3, emoji: '🍩', wrongOptions: ['2', '4', '5'] },

  // ÷9 — hard
  { id: 28, dividend: 18, divisor: 9, quotient: 2, emoji: '🎨', wrongOptions: ['1', '3', '4'] },
  { id: 29, dividend: 27, divisor: 9, quotient: 3, emoji: '🌊', wrongOptions: ['2', '4', '5'] },

  // ÷10 — hard
  { id: 30, dividend: 20, divisor: 10, quotient: 2, emoji: '🎠', wrongOptions: ['1', '3', '4'] },
  { id: 31, dividend: 30, divisor: 10, quotient: 3, emoji: '🏖️', wrongOptions: ['2', '4', '5'] },
  { id: 32, dividend: 40, divisor: 10, quotient: 4, emoji: '🌴', wrongOptions: ['3', '5', '6'] },
  { id: 33, dividend: 50, divisor: 10, quotient: 5, emoji: '🎁', wrongOptions: ['4', '6', '7'] },
];
