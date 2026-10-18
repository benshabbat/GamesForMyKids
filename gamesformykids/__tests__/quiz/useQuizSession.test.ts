// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { useQuizSession } from '@/lib/quiz/useQuizSession';

// Spy on persistence: a bogus save corrupts best_score / total_play_time.
const save = vi.fn();
vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResultRef: { current: save } }),
}));

function playToResult(result: { current: ReturnType<typeof useQuizSession<string>> }, questions: string[]) {
  act(() => result.current.begin(questions));
  for (let i = 0; i < questions.length; i++) {
    act(() => result.current.answer('x', true));
    act(() => useQuizGameStore.getState().nextQuestion());
  }
}

describe('useQuizSession — shared store across quiz games', () => {
  beforeEach(() => {
    save.mockClear();
    useQuizGameStore.getState().goToMenu();
  });

  it('saves the finished game once with its own score and a sane duration', () => {
    const { result } = renderHook(() => useQuizSession<string>('game-a'));
    playToResult(result, ['q1', 'q2']);
    expect(useQuizGameStore.getState().phase).toBe('result');
    expect(save).toHaveBeenCalledTimes(1);
    const payload = save.mock.calls[0]![0] as { score: number; durationSeconds: number };
    expect(payload.score).toBe(2);
    expect(payload.durationSeconds).toBeLessThan(60);
  });

  it('leaving a quiz mid-play clears the store so the next quiz opens on its menu', () => {
    const first = renderHook(() => useQuizSession<string>('game-a'));
    act(() => first.result.current.begin(['q1', 'q2', 'q3']));
    expect(useQuizGameStore.getState().phase).toBe('playing');
    first.unmount();
    expect(useQuizGameStore.getState().phase).toBe('menu');

    const second = renderHook(() => useQuizSession<string>('game-b'));
    expect(second.result.current.phase).toBe('menu');
    expect(second.result.current.current).toBeNull();
  });

  it('a new quiz mounted over a stale finished game neither shows nor saves its result', () => {
    // Simulate leftovers of another game that was never cleaned up.
    useQuizGameStore.setState({ phase: 'result', gameType: 'game-a', score: 7, total: 10, index: 9 });

    const { result } = renderHook(() => useQuizSession<string>('game-b'));

    expect(save).not.toHaveBeenCalled();
    expect(result.current.phase).toBe('menu');
    expect(useQuizGameStore.getState().score).toBe(0);
  });

  it('switching gameType on a mounted session resets the store', () => {
    const { result, rerender } = renderHook(({ gt }) => useQuizSession<string>(gt), {
      initialProps: { gt: 'game-a' },
    });
    act(() => result.current.begin(['q1', 'q2']));
    rerender({ gt: 'game-b' });
    expect(useQuizGameStore.getState().phase).toBe('menu');
    expect(save).not.toHaveBeenCalled();
  });

  it('reset() uses the new question count and gameType', () => {
    const { result } = renderHook(() => useQuizSession<string>('game-a'));
    playToResult(result, ['q1', 'q2', 'q3']);
    act(() => result.current.reset(['a', 'b']));
    const s = useQuizGameStore.getState();
    expect(s.phase).toBe('playing');
    expect(s.total).toBe(2);
    expect(s.gameType).toBe('game-a');
    expect(result.current.current).toBe('a');
  });
});
