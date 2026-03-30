export interface MultiplicationQuestion {
  a: number;
  b: number;
  answer: number;
  choices: number[];
}

export function generateQuestion(level: number): MultiplicationQuestion {
  const a = level;
  const b = Math.floor(Math.random() * 10) + 1;
  const answer = a * b;

  // Generate 3 wrong answers near the correct one
  const wrongs = new Set<number>();
  while (wrongs.size < 3) {
    const delta = Math.floor(Math.random() * 10) - 5;
    const wrong = answer + (delta === 0 ? 6 : delta);
    if (wrong > 0 && wrong !== answer) wrongs.add(wrong);
  }

  const choices = [answer, ...Array.from(wrongs)].sort(() => Math.random() - 0.5);
  return { a, b, answer, choices };
}

export const LEVELS = Array.from({ length: 10 }, (_, i) => i + 1);
export const TIME_PER_QUESTION = 10; // seconds
export const QUESTIONS_PER_LEVEL = 8;
