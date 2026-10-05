// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import { useNumericQuizRuntime } from '@/hooks/games/useNumericQuizRuntime';

const { saveRef } = vi.hoisted(() => ({ saveRef: { current: vi.fn() } }));

vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResultRef: saveRef }),
}));
vi.mock('@/hooks/shared/audio/useGameAudio', () => ({
  useGameAudio: () => ({ audioContext: null, speechEnabled: false }),
}));
vi.mock('@/lib/utils/speech/enhancedSpeechUtils', () => ({ speakHebrew: vi.fn(async () => {}) }));
// Skip real delays and speech, but keep the real contract of handleCorrectGameAnswer:
// it bumps the progress store level and then calls onLevelComplete.
vi.mock('@/lib/utils/game/gameUtils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/utils/game/gameUtils')>();
  return {
    ...actual,
    delay: async () => {},
    playSuccessSound: () => {},
    speakStartMessage: async () => {},
    handleWrongGameAnswer: async () => {},
    handleCorrectGameAnswer: async (_setCelebration: (v: boolean) => void, onLevelComplete: () => Promise<void>) => {
      useGameProgressStore.getState().incrementScore(10);
      useGameProgressStore.getState().incrementLevel(Infinity);
      await onLevelComplete();
    },
  };
});

function setup() {
  const levels: number[] = [];
  const callbacks = {
    gameType: 'math' as const,
    generateChallenge: (level: number) => {
      levels.push(level);
      return { answer: 1 };
    },
    generateOptions: () => [1, 2, 3, 4],
    speakQuestion: async () => {},
    toChallengeItem: () => ({ name: '1', hebrew: '1', english: '1', emoji: '1', color: '#000' }),
    toOptionItem: (n: number) => ({ name: String(n), hebrew: String(n), english: String(n), emoji: '', color: '#000' }),
  };
  const hook = renderHook(() => useNumericQuizRuntime(callbacks));
  return { levels, ...hook };
}

describe('useNumericQuizRuntime', () => {
  beforeEach(() => {
    saveRef.current = vi.fn();
    useGameProgressStore.getState().resetProgress();
  });

  it('raises the difficulty level of generated challenges as answers are answered correctly', async () => {
    const { levels, result } = setup();
    await act(async () => { await result.current.startGame(); });
    for (let i = 0; i < 4; i++) {
      await act(async () => { await result.current.handleNumberClick(1); });
    }
    expect(levels).toEqual([1, 2, 3, 4, 5]);
    expect(result.current.gameState.level).toBe(5);
  });

  it('a wrong answer does not change the level', async () => {
    const { levels, result } = setup();
    await act(async () => { await result.current.startGame(); });
    await act(async () => { await result.current.handleNumberClick(3); });
    expect(levels).toEqual([1]);
  });

  it('saves on unmount through the latest saveGameResult (auth may load after mount)', async () => {
    const { result, unmount } = setup();
    const staleSave = saveRef.current; // what a user-less first render would have exposed
    await act(async () => { await result.current.startGame(); });
    await act(async () => { await result.current.handleNumberClick(1); });

    const latestSave = vi.fn();
    saveRef.current = latestSave; // auth finished: useGameCompletion swaps in the user-aware save
    unmount();

    expect(staleSave).not.toHaveBeenCalled();
    expect(latestSave).toHaveBeenCalledTimes(1);
    const payload = latestSave.mock.calls[0]![0] as { score: number; level: number; durationSeconds: number };
    expect(payload.score).toBe(10);
    expect(payload.level).toBe(2);
    expect(payload.durationSeconds).toBeLessThan(60);
  });

  it('does not save a score that never came from this game (startGame not called)', () => {
    const { unmount } = setup();
    useGameProgressStore.getState().incrementScore(50); // leftover from another game
    unmount();
    expect(saveRef.current).not.toHaveBeenCalled();
  });
});
