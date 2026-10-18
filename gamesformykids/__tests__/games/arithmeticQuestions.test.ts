import { describe, it, expect, afterEach, vi } from 'vitest';
import { LEVELS, generateQuestion, type ArithmeticLevel } from '@/app/games/arithmetic/data/questions';

/** Seeded PRNG (mulberry32) that throws once a single question draws too many numbers. */
function seededRandom(seed: number, budgetPerQuestion: number): () => number {
  let a = seed >>> 0;
  let calls = 0;
  return () => {
    if (++calls > budgetPerQuestion) {
      throw new Error('generateQuestion is not terminating (Math.random budget exceeded)');
    }
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function expectedAnswer(a: number, b: number, op: string): number {
  return op === '+' ? a + b : op === '-' ? a - b : a * b;
}

describe('arithmetic generateQuestion', () => {
  afterEach(() => vi.restoreAllMocks());

  it.each(LEVELS.map((lv) => [lv.id, lv] as const))(
    'level %i always terminates with 4 distinct non-negative choices that include the answer',
    (_id, level) => {
      const random = vi.spyOn(Math, 'random');
      for (let seed = 0; seed < 3000; seed++) {
        random.mockImplementation(seededRandom(seed, 500));
        const q = generateQuestion(level);

        expect(q.answer).toBe(expectedAnswer(q.a, q.b, q.op));
        expect(q.choices).toHaveLength(4);
        expect(new Set(q.choices).size).toBe(4);
        expect(q.choices).toContain(q.answer);
        expect(q.choices.every((c) => Number.isInteger(c) && c >= 0)).toBe(true);
      }
    },
  );

  it('handles n - n (answer 0), which only has distractors above it', () => {
    // a = b = 1 on every draw, so the answer is always 0
    const zeroLevel: ArithmeticLevel = { id: 99, label: 'test', operations: ['-'], maxNum: 1 };
    const random = vi.spyOn(Math, 'random');
    for (let seed = 0; seed < 500; seed++) {
      random.mockImplementation(seededRandom(seed, 500));
      const q = generateQuestion(zeroLevel);

      expect(q.answer).toBe(0);
      expect(new Set(q.choices).size).toBe(4);
      expect(q.choices).toContain(0);
      expect(q.choices.every((c) => c >= 0)).toBe(true);
    }
  });
});
