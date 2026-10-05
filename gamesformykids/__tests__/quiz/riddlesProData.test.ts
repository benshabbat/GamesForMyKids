import { describe, expect, it } from 'vitest';
import { RIDDLES_PRO } from '@/lib/quiz/data/riddles-pro';

describe('riddles-pro data', () => {
  it('has no Latin letters in any answer option', () => {
    for (const r of RIDDLES_PRO) {
      for (const option of [r.answer, ...r.wrongOptions]) {
        expect(option, `riddle ${r.id}`).not.toMatch(/[A-Za-z]/);
      }
    }
  });

  it('never repeats the correct answer among the wrong options', () => {
    for (const r of RIDDLES_PRO) {
      expect(r.wrongOptions, `riddle ${r.id}`).not.toContain(r.answer);
    }
  });

  it('has at least one full session of riddles', () => {
    expect(RIDDLES_PRO.length).toBeGreaterThanOrEqual(10);
  });
});
