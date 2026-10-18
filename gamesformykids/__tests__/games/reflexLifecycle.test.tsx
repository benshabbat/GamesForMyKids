// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';

vi.mock('next/navigation', () => ({ useRouter: () => ({ back: vi.fn(), push: vi.fn() }) }));
vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResult: vi.fn(), saveGameResultRef: { current: vi.fn() } }),
}));

// The celebration inside the real result screen needs browser APIs jsdom lacks; it is irrelevant here.
vi.mock('@/app/games/reflex/components/ReflexResultScreen', () => ({ default: () => null }));

import ReflexGame from '@/app/games/reflex/ReflexGame';
import { useReflexStore } from '@/app/games/reflex/reflexStore';
import { GAME_DURATION } from '@/app/games/reflex/data/targets';

const store = useReflexStore;
const INITIAL = store.getState();

// The first target spawns after 600 ms and lives 2500 ms at score 0.
const FIRST_SPAWN_MS = 600;
const FIRST_LIFETIME_MS = 2500;

beforeEach(() => {
  vi.useFakeTimers();
  store.setState(INITIAL, true);
});

afterEach(() => {
  cleanup();
  store.getState().abandonGame();
  vi.useRealTimers();
});

describe('reflex store: abandonGame', () => {
  it('stops the countdown and returns to a fresh menu state', () => {
    store.getState().startGame();
    vi.advanceTimersByTime(5000);
    expect(store.getState().timeLeft).toBe(GAME_DURATION - 5);

    store.getState().abandonGame();
    vi.advanceTimersByTime(GAME_DURATION * 2 * 1000);

    expect(store.getState().phase).toBe('menu');
    expect(store.getState().timeLeft).toBe(GAME_DURATION);
  });
});

describe('ReflexGame', () => {
  it('does not finish silently in the background after the player leaves', () => {
    const { unmount } = render(<ReflexGame />);
    act(() => { store.getState().startGame(); });

    unmount();
    vi.advanceTimersByTime(GAME_DURATION * 2 * 1000);

    expect(store.getState().phase).toBe('menu');
  });

  it('opens on the menu, not a stale result, when the player comes back', () => {
    const first = render(<ReflexGame />);
    act(() => { store.getState().startGame(); });
    act(() => { vi.advanceTimersByTime(GAME_DURATION * 1000); });
    expect(store.getState().phase).toBe('result');
    first.unmount();

    render(<ReflexGame />);

    expect(store.getState().phase).toBe('menu');
  });

  it('stops counting misses once the round is over', () => {
    render(<ReflexGame />);
    act(() => { store.getState().startGame(); });

    // A target is on screen when the round ends...
    act(() => { vi.advanceTimersByTime(FIRST_SPAWN_MS + 100); });
    expect(store.getState().targets).toHaveLength(1);
    act(() => { store.setState({ phase: 'result' }); });

    // ...its expiry timer must not fire afterwards and bump "missed" on the result screen.
    act(() => { vi.advanceTimersByTime(FIRST_LIFETIME_MS * 2); });

    expect(store.getState().missed).toBe(0);
  });

  it('does not let last round\'s expiry timers hit the next round', () => {
    render(<ReflexGame />);
    act(() => { store.getState().startGame(); });
    // Round 1: target 0 spawns at 600 ms and would expire at 3100 ms.
    act(() => { vi.advanceTimersByTime(FIRST_SPAWN_MS + 100); });
    act(() => { store.setState({ phase: 'result' }); });

    // Round 2 starts at 700 ms: ids restart at 0, so its target 0 spawns at 1300 ms, lives until 3800 ms.
    act(() => { store.getState().startGame(); });
    act(() => { vi.advanceTimersByTime(FIRST_SPAWN_MS + 100); });
    expect(store.getState().targets.map((t) => t.id)).toEqual([0]);

    // At 3200 ms the old round's timer (3100 ms) would have expired the new target 0.
    act(() => { vi.advanceTimersByTime(3200 - 1400); });

    expect(store.getState().targets.some((t) => t.id === 0)).toBe(true);
    expect(store.getState().missed).toBe(0);
  });
});
