import { describe, expect, it } from 'vitest';
import { TRANSPORT_QUESTIONS } from '@/app/games/transport/data/transport';

describe('transport quiz data', () => {
  it('offers four distinct answers and a valid correctIndex for every question', () => {
    for (const q of TRANSPORT_QUESTIONS) {
      expect(new Set(q.answers).size, `question ${q.id}`).toBe(q.answers.length);
      expect(q.correctIndex, `question ${q.id}`).toBeLessThan(q.answers.length);
    }
  });

  it('names the vehicle exactly as the correct answer', () => {
    for (const q of TRANSPORT_QUESTIONS) {
      expect(q.answers[q.correctIndex], `question ${q.id}`).toBe(q.vehicle);
    }
  });

  it('does not offer a synonym of "ship" as a wrong answer, and "שייט" (sailing) is not a vessel', () => {
    const ship = TRANSPORT_QUESTIONS.find((q) => q.vehicle === 'ספינה')!;
    expect(ship.answers).not.toContain('אוניה');
    for (const q of TRANSPORT_QUESTIONS) expect(q.answers).not.toContain('שייט');
  });

  it('does not list a drone as a wrong answer for the hovering question (drones hover too)', () => {
    const hover = TRANSPORT_QUESTIONS.find((q) => q.question.includes('לרחף'))!;
    expect(hover.answers).not.toContain('רחפן');
  });
});
