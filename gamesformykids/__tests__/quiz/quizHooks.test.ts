// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import { useGameStore } from '@/lib/stores/gameStore';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { useGeographyGame } from '@/lib/quiz/useGeographyGame';
import { useSequencesGame } from '@/lib/quiz/useSequencesGame';
import { useGenericQuizGame } from '@/lib/quiz/useGenericQuizGame';
import type { QuizGameConfig } from '@/lib/quiz/quizGameConfigs';

// ── helpers ───────────────────────────────────────────────────────────────────
const QUIZ_INITIAL = {
  phase: 'menu' as const,
  gameType: null,
  index: 0,
  total: 0,
  score: 0,
  selected: null,
  isCorrect: null,
};

function resetStores() {
  useQuizGameStore.setState(QUIZ_INITIAL as Parameters<typeof useQuizGameStore.setState>[0]);
  useGameProgressStore.getState().resetProgress();
  useGameProgressStore.getState().setGameActive(false);
  useGameStore.getState().endGame();
}

// ── useQuizSession ────────────────────────────────────────────────────────────
describe('useQuizSession', () => {
  beforeEach(resetStores);

  it('starts with phase=menu and no current question', () => {
    const { result } = renderHook(() => useQuizSession<string>('test'));
    expect(result.current.phase).toBe('menu');
    expect(result.current.current).toBeNull();
  });

  it('begin() sets phase=playing and provides questions', () => {
    const { result } = renderHook(() => useQuizSession<string>('test'));
    act(() => result.current.begin(['q1', 'q2', 'q3']));
    expect(result.current.phase).toBe('playing');
    expect(result.current.current).toBe('q1');
    expect(useQuizGameStore.getState().total).toBe(3);
  });

  it('begin() records gameType in store', () => {
    const { result } = renderHook(() => useQuizSession<string>('geography'));
    act(() => result.current.begin(['q1']));
    expect(useQuizGameStore.getState().gameType).toBe('geography');
  });

  it('answer() with correct=true increments score', () => {
    const { result } = renderHook(() => useQuizSession<string>('test'));
    act(() => result.current.begin(['q1', 'q2']));
    act(() => result.current.answer('right', true));
    expect(useQuizGameStore.getState().score).toBe(1);
    expect(useQuizGameStore.getState().isCorrect).toBe(true);
  });

  it('answer() with correct=false does not increment score', () => {
    const { result } = renderHook(() => useQuizSession<string>('test'));
    act(() => result.current.begin(['q1', 'q2']));
    act(() => result.current.answer('wrong', false));
    expect(useQuizGameStore.getState().score).toBe(0);
    expect(useQuizGameStore.getState().isCorrect).toBe(false);
  });

  it('answer() is ignored when already answered', () => {
    const { result } = renderHook(() => useQuizSession<string>('test'));
    act(() => result.current.begin(['q1', 'q2']));
    act(() => result.current.answer('first', true));
    act(() => result.current.answer('second', true));
    // score should still be 1 (second call ignored)
    expect(useQuizGameStore.getState().score).toBe(1);
  });

  it('reset() restarts quiz with new questions', () => {
    const { result } = renderHook(() => useQuizSession<string>('test'));
    act(() => result.current.begin(['q1', 'q2']));
    act(() => result.current.answer('x', true));
    act(() => result.current.reset(['a', 'b', 'c']));
    expect(result.current.current).toBe('a');
    expect(useQuizGameStore.getState().score).toBe(0);
    expect(useQuizGameStore.getState().index).toBe(0);
  });
});

// ── useGenericQuizGame ────────────────────────────────────────────────────────
describe('useGenericQuizGame', () => {
  beforeEach(resetStores);

  const questions = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
  const config: QuizGameConfig<string> = {
    gameType: 'test-generic',
    questions,
    questionsPerGame: 3,
    getChoices: (q) => [q, 'wrong1', 'wrong2'],
    isCorrect: (choice, q) => choice === q,
    getCorrectLabel: (q) => q,
  };

  it('starts with phase=menu', () => {
    const { result } = renderHook(() => useGenericQuizGame(config));
    expect(result.current.phase).toBe('menu');
  });

  it('startGame() sets phase=playing and provides questionsPerGame questions', () => {
    const { result } = renderHook(() => useGenericQuizGame(config));
    act(() => result.current.startGame());
    expect(result.current.phase).toBe('playing');
    expect(useQuizGameStore.getState().total).toBe(config.questionsPerGame);
  });

  it('selectAnswer() with correct choice increments score', () => {
    const { result } = renderHook(() => useGenericQuizGame(config));
    act(() => result.current.startGame());
    const correct = result.current.current!;
    act(() => result.current.selectAnswer(correct));
    expect(useQuizGameStore.getState().isCorrect).toBe(true);
    expect(useQuizGameStore.getState().score).toBe(1);
  });

  it('selectAnswer() with wrong choice does not increment score', () => {
    const { result } = renderHook(() => useGenericQuizGame(config));
    act(() => result.current.startGame());
    act(() => result.current.selectAnswer('wrong1'));
    expect(useQuizGameStore.getState().isCorrect).toBe(false);
    expect(useQuizGameStore.getState().score).toBe(0);
  });

  it('provides correct choices from config', () => {
    const { result } = renderHook(() => useGenericQuizGame(config));
    act(() => result.current.startGame());
    const current = result.current.current!;
    expect(result.current.choices).toContain(current);
    expect(result.current.choices).toHaveLength(3);
  });

  it('restart() resets score and provides fresh questions', () => {
    const { result } = renderHook(() => useGenericQuizGame(config));
    act(() => result.current.startGame());
    act(() => result.current.selectAnswer(result.current.current!));
    act(() => result.current.restart());
    expect(useQuizGameStore.getState().score).toBe(0);
    expect(useQuizGameStore.getState().index).toBe(0);
  });
});

// ── useGeographyGame ──────────────────────────────────────────────────────────
describe('useGeographyGame', () => {
  beforeEach(resetStores);

  it('starts with phase=menu', () => {
    const { result } = renderHook(() => useGeographyGame());
    expect(result.current.phase).toBe('menu');
  });

  it('startGame() sets phase=playing', () => {
    const { result } = renderHook(() => useGeographyGame());
    act(() => result.current.startGame());
    expect(result.current.phase).toBe('playing');
  });

  it('provides a current question with country, mode, and 4 choices', () => {
    const { result } = renderHook(() => useGeographyGame());
    act(() => result.current.startGame());
    const q = result.current.current!;
    expect(q).not.toBeNull();
    expect(q.country).toBeDefined();
    expect(q.choices).toHaveLength(4);
    expect(q.choices.map(c => c.id)).toContain(q.country.id);
  });

  it('selectAnswer() with correct country id registers correct=true', () => {
    const { result } = renderHook(() => useGeographyGame());
    act(() => result.current.startGame());
    const correctId = result.current.current!.country.id;
    act(() => result.current.selectAnswer(correctId));
    expect(useQuizGameStore.getState().isCorrect).toBe(true);
  });

  it('selectAnswer() with wrong id registers correct=false', () => {
    const { result } = renderHook(() => useGeographyGame());
    act(() => result.current.startGame());
    const q = result.current.current!;
    const wrongId = q.choices.find(c => c.id !== q.country.id)!.id;
    act(() => result.current.selectAnswer(wrongId));
    expect(useQuizGameStore.getState().isCorrect).toBe(false);
  });

  it('startGame("name") sets mode to name', () => {
    const { result } = renderHook(() => useGeographyGame());
    act(() => result.current.startGame('name'));
    expect(result.current.current!.mode).toBe('name');
  });

  it('startGame("flag") sets mode to flag', () => {
    const { result } = renderHook(() => useGeographyGame());
    act(() => result.current.startGame('flag'));
    expect(result.current.current!.mode).toBe('flag');
  });
});

// ── useSequencesGame ──────────────────────────────────────────────────────────
describe('useSequencesGame', () => {
  beforeEach(resetStores);

  it('starts with phase=menu', () => {
    const { result } = renderHook(() => useSequencesGame());
    expect(result.current.phase).toBe('menu');
  });

  it('provides LEVELS list', () => {
    const { result } = renderHook(() => useSequencesGame());
    expect(result.current.levels.length).toBeGreaterThan(0);
  });

  it('startGame(level) sets phase=playing', () => {
    const { result } = renderHook(() => useSequencesGame());
    act(() => result.current.startGame(result.current.levels[0]));
    expect(result.current.phase).toBe('playing');
  });

  it('provides choices that include the correct next number', () => {
    const { result } = renderHook(() => useSequencesGame());
    act(() => result.current.startGame(result.current.levels[0]));
    const { current, choices } = result.current;
    expect(choices).toContain(current!.next);
  });

  it('choices contain wrong options as well', () => {
    const { result } = renderHook(() => useSequencesGame());
    act(() => result.current.startGame(result.current.levels[0]));
    expect(result.current.choices.length).toBeGreaterThan(1);
  });

  it('selectAnswer() with correct next number sets isCorrect=true', () => {
    const { result } = renderHook(() => useSequencesGame());
    act(() => result.current.startGame(result.current.levels[0]));
    const correct = result.current.current!.next;
    act(() => result.current.selectAnswer(correct));
    expect(useQuizGameStore.getState().isCorrect).toBe(true);
  });

  it('selectAnswer() with wrong number sets isCorrect=false', () => {
    const { result } = renderHook(() => useSequencesGame());
    act(() => result.current.startGame(result.current.levels[0]));
    const { current, choices } = result.current;
    const wrong = choices.find(c => c !== current!.next)!;
    act(() => result.current.selectAnswer(wrong));
    expect(useQuizGameStore.getState().isCorrect).toBe(false);
  });

  it('restart() resets score to 0', () => {
    const { result } = renderHook(() => useSequencesGame());
    act(() => result.current.startGame(result.current.levels[0]));
    act(() => result.current.selectAnswer(result.current.current!.next));
    act(() => result.current.restart());
    expect(useQuizGameStore.getState().score).toBe(0);
  });
});
