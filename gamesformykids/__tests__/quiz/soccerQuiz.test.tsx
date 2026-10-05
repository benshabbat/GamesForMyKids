// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { CUSTOM_QUIZ_GAMES } from '@/lib/quiz/registry/customQuizGames';
import { SOCCER_QUESTIONS } from '@/lib/quiz/data/soccer';

vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResultRef: { current: vi.fn() } }),
}));

describe('soccer quiz (registry wiring)', () => {
  beforeEach(() => {
    cleanup();
    useQuizGameStore.getState().goToMenu();
  });

  it('picking a category shows a question with its answers instead of a blank screen', async () => {
    const Soccer = CUSTOM_QUIZ_GAMES['soccer']!;
    render(<Soccer />);

    fireEvent.click(await screen.findByRole('button', { name: /הכל/ }));

    const answers = SOCCER_QUESTIONS.flatMap((q) => q.answers);
    const questionText = await screen.findByText((text) => SOCCER_QUESTIONS.some((q) => q.question === text));
    expect(questionText).toBeTruthy();
    const q = SOCCER_QUESTIONS.find((x) => x.question === questionText.textContent)!;
    for (const a of q.answers) {
      expect(answers).toContain(a);
      expect(screen.getAllByText(a).length).toBeGreaterThan(0);
    }
  });

  it('answering correctly scores, and the last answer leads to the result screen with a working replay', async () => {
    const Soccer = CUSTOM_QUIZ_GAMES['soccer']!;
    render(<Soccer />);
    fireEvent.click(await screen.findByRole('button', { name: /הכל/ }));

    const total = useQuizGameStore.getState().total;
    expect(total).toBeGreaterThan(0);

    for (let i = 0; i < total; i++) {
      const text = await screen.findByText((t) => SOCCER_QUESTIONS.some((q) => q.question === t));
      const q = SOCCER_QUESTIONS.find((x) => x.question === text.textContent)!;
      fireEvent.click(screen.getByRole('button', { name: q.answers[q.correctIndex]! }));
      expect(useQuizGameStore.getState().score).toBe(i + 1);
      fireEvent.click(await screen.findByRole('button', { name: /הבא|סיום/ }));
    }

    expect(useQuizGameStore.getState().phase).toBe('result');
    fireEvent.click(await screen.findByRole('button', { name: /שחק שוב/ }));
    expect(useQuizGameStore.getState().phase).toBe('playing');
    expect(useQuizGameStore.getState().score).toBe(0);
    await screen.findByText((t) => SOCCER_QUESTIONS.some((q) => q.question === t));
  });
});
