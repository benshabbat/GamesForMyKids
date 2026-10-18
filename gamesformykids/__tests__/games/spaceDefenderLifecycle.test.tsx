// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({ useRouter: () => ({ back: vi.fn(), push: vi.fn() }) }));
vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResult: vi.fn(), saveGameResultRef: { current: vi.fn() } }),
}));

import SpaceDefenderGame from '@/app/games/space-defender/SpaceDefenderGame';
import { useSpaceDefenderStore } from '@/app/games/space-defender/spaceDefenderStore';

const store = useSpaceDefenderStore;
const INITIAL = store.getState();

beforeEach(() => {
  vi.useFakeTimers();
  // jsdom has no canvas implementation; the loop only needs getContext to return nothing.
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
  store.setState(INITIAL, true);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('SpaceDefenderGame', () => {
  it('runs one game instance while playing, however many overlays are on screen', () => {
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');
    render(<SpaceDefenderGame />);
    act(() => { store.getState().startGame(); });

    // The HUD is visible; only the game's own 16 ms ship-movement interval may be running.
    const shipMoveIntervals = setIntervalSpy.mock.calls.filter(([, ms]) => ms === 16);
    expect(shipMoveIntervals).toHaveLength(1);
  });

  it('returns the store to the menu when the player leaves mid-game', () => {
    const { unmount } = render(<SpaceDefenderGame />);
    act(() => { store.getState().startGame(); });
    expect(store.getState().phase).toBe('playing');

    unmount();

    expect(store.getState().phase).toBe('menu');
  });

  it('shows the menu again after leaving mid-game and coming back', () => {
    const first = render(<SpaceDefenderGame />);
    act(() => { store.getState().startGame(); });
    first.unmount();

    render(<SpaceDefenderGame />);

    expect(store.getState().phase).toBe('menu');
    expect(screen.getByText('מגן החלל')).toBeTruthy();
  });

  it('keeps playing after restarting from the result overlay', () => {
    render(<SpaceDefenderGame />);
    act(() => { store.getState().startGame(); });
    act(() => { store.getState().setGameResult(30, 0, 12); });
    expect(screen.getByText('נגמרו החיים!')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /שוב|שחק/ }));

    expect(store.getState().phase).toBe('playing');
  });
});
