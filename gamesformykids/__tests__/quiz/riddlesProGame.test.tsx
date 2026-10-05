// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react';

const { speakMock, saveSpy } = vi.hoisted(() => ({ speakMock: vi.fn(), saveSpy: vi.fn() }));
vi.mock('@/lib/utils/speech/enhancedSpeechUtils', () => ({ speakHebrew: speakMock }));
vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResult: saveSpy, saveGameResultRef: { current: saveSpy } }),
}));

import { QuizGameShell } from '@/components/game/quiz/QuizGameShell';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import { useGameStore } from '@/lib/stores/gameStore';
import { useRiddlesProGame } from '@/lib/quiz/useRiddlesProGame';

const ADVANCE_MS = 1800;
const SESSION_SIZE = 10;

const QUIZ_INITIAL = {
  phase: 'menu' as const, gameType: null, index: 0, total: 0, score: 0, streak: 0,
  bestStreak: 0, selected: null, isCorrect: null,
};

beforeEach(() => {
  vi.useFakeTimers();
  speakMock.mockClear();
  saveSpy.mockClear();
  useQuizGameStore.setState(QUIZ_INITIAL as Parameters<typeof useQuizGameStore.setState>[0]);
  useGameProgressStore.getState().resetProgress();
  useGameProgressStore.getState().setGameActive(false);
  useGameStore.getState().endGame();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('useRiddlesProGame', () => {
  it('moves the shared quiz store to playing when the game starts', () => {
    const { result } = renderHook(() => useRiddlesProGame());
    expect(result.current.phase).toBe('menu');

    act(() => result.current.startGame());

    expect(useQuizGameStore.getState().phase).toBe('playing');
    expect(useQuizGameStore.getState().total).toBe(SESSION_SIZE);
    expect(result.current.phase).toBe('playing');
    expect(result.current.current).not.toBeNull();
    expect(result.current.questionNumber).toBe(1);
  });

  it('reads the first riddle aloud', () => {
    const { result } = renderHook(() => useRiddlesProGame());
    act(() => result.current.startGame());

    expect(speakMock).toHaveBeenCalledWith(result.current.current!.riddle);
  });

  it('gives 3, 2 or 1 points depending on how many clues were used, and records the answer', () => {
    const { result } = renderHook(() => useRiddlesProGame());
    act(() => result.current.startGame());

    act(() => result.current.revealClue());
    act(() => result.current.selectAnswer(result.current.current!.answer));

    expect(result.current.lastCorrect).toBe(true);
    expect(result.current.lastPoints).toBe(2);
    expect(result.current.score).toBe(2);
    expect(useQuizGameStore.getState().score).toBe(1);
  });

  it('shows the next riddle after the feedback delay and clears the clues', () => {
    const { result } = renderHook(() => useRiddlesProGame());
    act(() => result.current.startGame());
    const first = result.current.current!;
    act(() => result.current.revealClue());
    act(() => result.current.selectAnswer('wrong'));
    expect(result.current.lastCorrect).toBe(false);

    act(() => { vi.advanceTimersByTime(ADVANCE_MS); });

    expect(result.current.current).not.toBe(first);
    expect(result.current.questionNumber).toBe(2);
    expect(result.current.cluesRevealed).toBe(0);
    expect(result.current.lastCorrect).toBeNull();
  });

  it('ignores a second tap on an answer while the feedback is showing', () => {
    const { result } = renderHook(() => useRiddlesProGame());
    act(() => result.current.startGame());
    const answer = result.current.current!.answer;

    act(() => { result.current.selectAnswer(answer); result.current.selectAnswer(answer); });
    act(() => { vi.advanceTimersByTime(ADVANCE_MS * 3); });

    // One tap = one riddle consumed; the second tap must not skip a riddle.
    expect(result.current.questionNumber).toBe(2);
  });

  it('reaches the result phase after the last riddle and saves the result once', () => {
    const { result } = renderHook(() => useRiddlesProGame());
    act(() => result.current.startGame());

    for (let i = 0; i < SESSION_SIZE; i++) {
      act(() => result.current.selectAnswer(result.current.current!.answer));
      act(() => { vi.advanceTimersByTime(ADVANCE_MS); });
    }

    expect(useQuizGameStore.getState().phase).toBe('result');
    expect(useQuizGameStore.getState().score).toBe(SESSION_SIZE);
    expect(useQuizGameStore.getState().total).toBe(SESSION_SIZE);
    expect(result.current.phase).toBe('result');
    expect(saveSpy).toHaveBeenCalledTimes(1);
  });

  it('returns to the menu on restart', () => {
    const { result } = renderHook(() => useRiddlesProGame());
    act(() => result.current.startGame());

    act(() => result.current.restart());

    expect(useQuizGameStore.getState().phase).toBe('menu');
    expect(result.current.phase).toBe('menu');
  });

  it('does not move on or speak after the player leaves', () => {
    const { result, unmount } = renderHook(() => useRiddlesProGame());
    act(() => result.current.startGame());
    act(() => result.current.selectAnswer(result.current.current!.answer));
    const index = useQuizGameStore.getState().index;
    speakMock.mockClear();

    unmount();
    vi.advanceTimersByTime(ADVANCE_MS * 2);

    expect(useQuizGameStore.getState().index).toBe(index);
    expect(speakMock).not.toHaveBeenCalled();
  });
});

describe('riddles-pro in the quiz shell', () => {
  function Harness() {
    const game = useRiddlesProGame();
    return (
      <QuizGameShell
        menu={<button onClick={game.startGame}>start</button>}
        question={game.current ? (
          <div>
            riddle {game.questionNumber}
            <button onClick={() => game.selectAnswer(game.current!.answer)}>answer</button>
          </div>
        ) : null}
        result={<div>finished</div>}
      />
    );
  }

  it('shows the first riddle when the start button is pressed', () => {
    render(<Harness />);

    fireEvent.click(screen.getByText('start'));

    expect(screen.getByText('riddle 1')).toBeTruthy();
  });

  it('shows the result screen after the last riddle', () => {
    render(<Harness />);
    fireEvent.click(screen.getByText('start'));

    for (let i = 0; i < SESSION_SIZE; i++) {
      fireEvent.click(screen.getByText('answer'));
      act(() => { vi.advanceTimersByTime(ADVANCE_MS); });
    }

    expect(screen.getByText('finished')).toBeTruthy();
  });
});
