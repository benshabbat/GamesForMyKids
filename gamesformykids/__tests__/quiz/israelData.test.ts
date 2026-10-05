import { describe, expect, it } from 'vitest';
import { ISRAEL_QUESTIONS } from '@/lib/quiz/data/israel';

describe('Israel quiz data', () => {
  it('offers four distinct answers and a valid correctIndex for every question', () => {
    for (const q of ISRAEL_QUESTIONS) {
      expect(new Set(q.answers).size, `question ${q.id}`).toBe(q.answers.length);
      expect(q.correctIndex, `question ${q.id}`).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex, `question ${q.id}`).toBeLessThan(q.answers.length);
    }
  });

  it('says there is one Star of David on the flag, built from two triangles', () => {
    const q = ISRAEL_QUESTIONS.find((x) => x.question.includes('דגל ישראל'))!;
    expect(q.answers[q.correctIndex]).toBe('1');
    expect(q.funFact).toContain('משולשים');
    expect(q.funFact).not.toContain('מרובעים');
  });
});
