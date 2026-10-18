import { describe, it, expect } from 'vitest';
import { shuffleOptions } from '@/lib/quiz/shuffleOptions';

describe('shuffleOptions', () => {
  const options = ['נכון', 'לא', 'אולי', 'אף פעם'] as const;

  it('keeps pointing at the correct option after shuffling', () => {
    for (let run = 0; run < 200; run++) {
      const r = shuffleOptions(options, 0);
      expect(r.options[r.correctIndex]).toBe('נכון');
    }
  });

  it('works for any original correctIndex', () => {
    for (let correct = 0; correct < options.length; correct++) {
      for (let run = 0; run < 50; run++) {
        const r = shuffleOptions(options, correct);
        expect(r.options[r.correctIndex]).toBe(options[correct]);
      }
    }
  });

  it('order maps each displayed position back to its original index', () => {
    for (let run = 0; run < 100; run++) {
      const r = shuffleOptions(options, 2);
      expect([...r.order].sort()).toEqual([0, 1, 2, 3]);
      r.options.forEach((opt, pos) => expect(opt).toBe(options[r.order[pos]!]));
      expect(r.order[r.correctIndex]).toBe(2);
    }
  });

  it('tracks the correct option by position when option texts are duplicated', () => {
    const dup = ['כן', 'כן', 'לא', 'לא'];
    for (let run = 0; run < 100; run++) {
      const r = shuffleOptions(dup, 1);
      expect(r.order[r.correctIndex]).toBe(1);
    }
  });

  it('actually moves the correct answer around (not always the first button)', () => {
    const positions = new Set<number>();
    for (let run = 0; run < 300; run++) positions.add(shuffleOptions(options, 0).correctIndex);
    expect(positions.size).toBeGreaterThan(1);
  });

  it('does not mutate the input', () => {
    const input = ['a', 'b', 'c', 'd'];
    shuffleOptions(input, 0);
    expect(input).toEqual(['a', 'b', 'c', 'd']);
  });
});
