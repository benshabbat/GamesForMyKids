// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';

const { saveSpy } = vi.hoisted(() => ({ saveSpy: vi.fn() }));
vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResult: saveSpy, saveGameResultRef: { current: saveSpy } }),
}));
vi.mock('next/navigation', () => ({ useRouter: () => ({ back: vi.fn(), push: vi.fn() }) }));
// The celebration inside the real result screen needs browser APIs jsdom lacks; it is irrelevant here.
vi.mock('@/app/games/taki/components/TakiResultScreen', () => ({ default: () => null }));

import TakiGame from '@/app/games/taki/TakiGame';
import { useTakiStore } from '@/app/games/taki/takiGameStore';
import { INITIAL_STATE } from '@/app/games/taki/takiTypes';
import type { TakiCard } from '@/app/games/taki/takiTypes';

const store = useTakiStore;
const AI_DELAY_MS = 1100;

const card = (id: string, color: TakiCard['color'], value: TakiCard['value']): TakiCard => ({ id, color, value });

const startComputerTurn = (computerHand: TakiCard[]) => {
  act(() => {
    store.setState({
      ...INITIAL_STATE,
      phase: 'playing',
      currentTurn: 'computer',
      topCard: card('top', 'red', 1),
      deck: [card('d1', 'blue', 2), card('d2', 'green', 2)],
      playerHand: [card('p1', 'yellow', 7), card('p2', 'yellow', 8), card('p3', 'green', 9)],
      computerHand,
    });
  });
};

beforeEach(() => {
  vi.useFakeTimers();
  saveSpy.mockClear();
  store.setState(INITIAL_STATE);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('Taki computer turn', () => {
  it('schedules a single AI timer, however many components show game state', () => {
    render(<TakiGame />);
    startComputerTurn([card('c1', 'red', 5), card('c2', 'blue', 6), card('c3', 'green', 3)]);

    expect(vi.getTimerCount()).toBe(1);
  });

  it('plays exactly one card for a king that keeps the computer on turn', () => {
    render(<TakiGame />);
    startComputerTurn([
      card('k', 'wild', 'king'),
      card('c1', 'red', 5),
      card('c2', 'red', 6),
      card('c3', 'blue', 3),
    ]);

    // Synchronous advance fires every timer due in this window back to back, so a second AI
    // timer would play a second card even though the king left the turn with the computer.
    act(() => { vi.advanceTimersByTime(AI_DELAY_MS); });

    const state = store.getState();
    expect(state.computerHand).toHaveLength(3);
    expect(state.currentTurn).toBe('computer');
    expect(state.turnId).toBe(1);
  });

  it('saves a finished game once', () => {
    render(<TakiGame />);
    startComputerTurn([card('c1', 'red', 5)]);

    act(() => { vi.advanceTimersByTime(AI_DELAY_MS); });

    expect(store.getState().phase).toBe('lost');
    expect(saveSpy).toHaveBeenCalledTimes(1);
  });
});
