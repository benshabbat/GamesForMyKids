// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';

const { saveSpy } = vi.hoisted(() => ({ saveSpy: vi.fn() }));
vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResult: saveSpy, saveGameResultRef: { current: saveSpy } }),
}));

vi.mock('next/navigation', () => ({ useRouter: () => ({ back: vi.fn(), push: vi.fn() }) }));
// The celebration inside the real result screen needs browser APIs jsdom lacks; it is irrelevant here.
vi.mock('@/app/games/number-bubbles/components/NumberBubblesResultScreen', () => ({ default: () => null }));

import NumberBubblesGame from '@/app/games/number-bubbles/NumberBubblesGame';
import { useNumberBubblesStore } from '@/app/games/number-bubbles/numberBubblesStore';

const store = useNumberBubblesStore;
const INITIAL = store.getState();

beforeEach(() => {
  vi.useFakeTimers();
  saveSpy.mockClear();
  store.setState(INITIAL, true);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('NumberBubblesGame timers', () => {
  it('runs a single tick interval while playing, however many components show game state', () => {
    render(<NumberBubblesGame />);
    act(() => { store.getState().startGame(); });

    // Game + HUD + grid are mounted; only one 100 ms tick interval may be running.
    expect(vi.getTimerCount()).toBe(1);
  });

  it('keeps the clock running at real time', () => {
    render(<NumberBubblesGame />);
    act(() => { store.getState().startGame(); });

    act(() => { vi.advanceTimersByTime(1000); });

    expect(store.getState().elapsed).toBe(1);
  });

  it('saves a finished level once', () => {
    render(<NumberBubblesGame />);
    act(() => { store.getState().startGame(); });
    act(() => { vi.advanceTimersByTime(2000); });

    // Pop every bubble in order.
    for (let n = 1; n <= store.getState().bubbles.length; n++) {
      const bubble = store.getState().bubbles.find((b) => b.num === n)!;
      act(() => { store.getState().tap(bubble); });
    }

    expect(store.getState().phase).toBe('results');
    expect(saveSpy).toHaveBeenCalledTimes(1);
  });
});
