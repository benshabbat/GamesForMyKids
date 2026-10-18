// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';

vi.mock('next/navigation', () => ({ useRouter: () => ({ back: vi.fn(), push: vi.fn() }) }));
vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResult: vi.fn(), saveGameResultRef: { current: vi.fn() } }),
}));

// The celebration inside the real result screen needs browser APIs jsdom lacks; it is irrelevant here.
vi.mock('@/app/games/whack-a-mole/components/WhackAMoleResultScreen', () => ({ default: () => null }));

import WhackAMoleGame from '@/app/games/whack-a-mole/WhackAMoleGame';
import { useWhackAMoleStore, GAME_DURATION } from '@/app/games/whack-a-mole/whackAMoleStore';

const store = useWhackAMoleStore;
const INITIAL = store.getState();

beforeEach(() => {
  vi.useFakeTimers();
  store.setState(INITIAL, true);
});

afterEach(() => {
  cleanup();
  store.getState().abandonGame();
  vi.useRealTimers();
});

describe('whack-a-mole store: abandonGame', () => {
  it('stops the countdown and returns to a fresh menu state', () => {
    store.getState().startGame();
    vi.advanceTimersByTime(5000);
    expect(store.getState().timeLeft).toBe(GAME_DURATION - 5);

    store.getState().abandonGame();
    vi.advanceTimersByTime(GAME_DURATION * 2 * 1000);

    expect(store.getState().phase).toBe('menu');
    expect(store.getState().timeLeft).toBe(GAME_DURATION);
    expect(store.getState().score).toBe(0);
  });

  it('keeps the best score', () => {
    store.setState({ best: 120 });
    store.getState().startGame();

    store.getState().abandonGame();

    expect(store.getState().best).toBe(120);
  });
});

describe('WhackAMoleGame', () => {
  it('does not finish silently in the background after the player leaves', () => {
    const { unmount } = render(<WhackAMoleGame />);
    act(() => { store.getState().startGame(); });

    unmount();
    vi.advanceTimersByTime(GAME_DURATION * 2 * 1000);

    // Without the cleanup the module-level countdown would have run out and left 'result' behind.
    expect(store.getState().phase).toBe('menu');
  });

  it('opens on the menu, not a stale result, when the player comes back', () => {
    const first = render(<WhackAMoleGame />);
    act(() => { store.getState().startGame(); });
    act(() => { vi.advanceTimersByTime(GAME_DURATION * 1000); });
    expect(store.getState().phase).toBe('result');
    first.unmount();

    render(<WhackAMoleGame />);

    expect(store.getState().phase).toBe('menu');
  });
});
