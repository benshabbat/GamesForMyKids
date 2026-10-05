// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';

const { saveSpy } = vi.hoisted(() => ({ saveSpy: vi.fn() }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ back: vi.fn(), push: vi.fn() }), useParams: () => ({}) }));
vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResult: saveSpy, saveGameResultRef: { current: saveSpy } }),
}));

import { CUSTOM_QUIZ_GAMES } from '@/lib/quiz/registry/customQuizGames';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import { useGameStore } from '@/lib/stores/gameStore';
import { useSoccerGameStore } from '@/app/games/soccer/soccerGameStore';
import { SOCCER_QUESTIONS } from '@/lib/quiz/data/soccer';

const GOAL_MS = 1500;
const QUESTIONS_PER_GAME = 10;
const SoccerGame = CUSTOM_QUIZ_GAMES['soccer']!;

const QUIZ_INITIAL = {
  phase: 'menu' as const, gameType: null, index: 0, total: 0, score: 0, streak: 0,
  bestStreak: 0, selected: null, isCorrect: null,
};

beforeEach(() => {
  saveSpy.mockClear();
  useQuizGameStore.setState(QUIZ_INITIAL as Parameters<typeof useQuizGameStore.setState>[0]);
  useSoccerGameStore.setState({ showGoal: false });
  useGameProgressStore.getState().resetProgress();
  useGameProgressStore.getState().setGameActive(false);
  useGameStore.getState().endGame();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const shownQuestion = () => {
  const text = document.body.textContent ?? '';
  return SOCCER_QUESTIONS.find((q) => text.includes(q.question));
};

/** The screens are lazy-loaded, so wait until a question is actually on screen. */
const waitForQuestion = () => waitFor(() => expect(shownQuestion()).toBeDefined());

async function startGame() {
  render(<SoccerGame />);
  fireEvent.click(await screen.findByText(/הכל/));
  await waitForQuestion();
}

/** Answers the question on screen with its correct answer (or a wrong one). */
function answerCurrent(correct: boolean) {
  const question = shownQuestion()!;
  const idx = correct ? question.correctIndex : (question.correctIndex + 1) % question.answers.length;
  fireEvent.click(screen.getByRole('button', { name: question.answers[idx] as string }));
}

describe('soccer game', () => {
  it('shows a question after a category is chosen in the menu', async () => {
    await startGame();

    expect(useQuizGameStore.getState().phase).toBe('playing');
    expect(shownQuestion()).toBeDefined();
  });

  it('shows the goal animation for a correct answer and hides it after 1.5 s', async () => {
    await startGame();
    vi.useFakeTimers();

    answerCurrent(true);
    expect(screen.queryByText('GOOOAL!')).not.toBeNull();

    act(() => { vi.advanceTimersByTime(GOAL_MS); });
    expect(screen.queryByText('GOOOAL!')).toBeNull();
  });

  it('does not touch the goal flag after the player leaves, and leaves it hidden', async () => {
    const { unmount } = render(<SoccerGame />);
    fireEvent.click(await screen.findByText(/הכל/));
    await waitForQuestion();
    vi.useFakeTimers();
    answerCurrent(true);
    expect(useSoccerGameStore.getState().showGoal).toBe(true);

    unmount();

    expect(useSoccerGameStore.getState().showGoal).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('restarts the goal timer when two goals follow each other quickly', async () => {
    await startGame();
    vi.useFakeTimers();
    answerCurrent(true);
    act(() => { vi.advanceTimersByTime(1000); });
    fireEvent.click(screen.getByText(/הבא ⚽|סיום/));
    answerCurrent(true);

    // 1.6 s after the first goal: the first timer must not hide the second goal's animation.
    act(() => { vi.advanceTimersByTime(600); });

    expect(useSoccerGameStore.getState().showGoal).toBe(true);
  });

  it('plays through to the result screen and saves the result once', async () => {
    await startGame();
    for (let i = 0; i < QUESTIONS_PER_GAME; i++) {
      answerCurrent(true);
      fireEvent.click(screen.getByText(/הבא ⚽|סיום/));
    }

    expect(useQuizGameStore.getState().phase).toBe('result');
    expect(useQuizGameStore.getState().score).toBe(QUESTIONS_PER_GAME);
    expect(await screen.findByText('שחק שוב ⚽')).toBeTruthy();
    expect(saveSpy).toHaveBeenCalledTimes(1);
  });
});
