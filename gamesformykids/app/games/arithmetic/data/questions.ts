import type { ArithOp as Operation } from '@/lib/types';
import { randInt as rand } from '@/lib/utils';
export type { Operation };

export interface ArithmeticLevel {
  id: number;
  label: string;
  operations: Operation[];
  maxNum: number;
}

export const LEVELS: ArithmeticLevel[] = [
  { id: 1, label: 'חיבור קל',     operations: ['+'],          maxNum: 10  },
  { id: 2, label: 'חיבור וחיסור', operations: ['+', '-'],     maxNum: 20  },
  { id: 3, label: 'חיבור מתקדם',  operations: ['+'],          maxNum: 50  },
  { id: 4, label: 'חיסור מתקדם',  operations: ['+', '-'],     maxNum: 50  },
  { id: 5, label: 'כפל קל',       operations: ['×'],          maxNum: 10  },
  { id: 6, label: 'הכל ביחד',     operations: ['+', '-', '×'], maxNum: 12 },
];

export const LEVEL_EMOJIS: Record<number, string> = {
  1: '➕',
  2: '➕➖',
  3: '➕',
  4: '➖',
  5: '✖️',
  6: '🔣',
};

export interface ArithmeticQuestion {
  a: number;
  b: number;
  op: Operation;
  answer: number;
  choices: number[];
}


function unique(correct: number, count: number, near: number): number[] {
  const set = new Set<number>([correct]);
  while (set.size < count) {
    const delta = rand(-Math.max(2, Math.floor(near * 0.3)), Math.max(2, Math.floor(near * 0.3)));
    const candidate = correct + delta;
    if (candidate !== correct && candidate >= 0) set.add(candidate);
  }
  return Array.from(set).sort(() => Math.random() - 0.5);
}

export function generateQuestion(level: ArithmeticLevel): ArithmeticQuestion {
  const op = level.operations[Math.floor(Math.random() * level.operations.length)]!;
  let a: number, b: number, answer: number;
  if (op === '×') {
    a = rand(1, level.maxNum); b = rand(1, level.maxNum); answer = a * b;
  } else if (op === '-') {
    a = rand(1, level.maxNum); b = rand(1, a); answer = a - b;
  } else {
    a = rand(1, level.maxNum); b = rand(1, level.maxNum); answer = a + b;
  }
  return { a, b, op, answer, choices: unique(answer, 4, answer) };
}


export const TIME_PER_QUESTION = 12;
