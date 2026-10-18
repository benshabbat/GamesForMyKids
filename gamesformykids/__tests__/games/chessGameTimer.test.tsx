// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, renderHook } from '@testing-library/react';
import { INIT } from '@/app/games/chess/logic/chessBoardUtils';
import type { GamePhase } from '@/app/games/chess/logic/chessTypes';

const { saveSpy } = vi.hoisted(() => ({ saveSpy: vi.fn() }));

vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResult: saveSpy, saveGameResultRef: { current: saveSpy } }),
}));

import { useChessStore } from '@/app/games/chess/store/useChessStore';
import { useChessGame } from '@/app/games/chess/useChessGame';

beforeEach(() => {
  saveSpy.mockClear();
  useChessStore.setState({ ...INIT });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('useChessGame timer', () => {
  it('measures the whole game, not just the time since the last check was escaped', () => {
    vi.useFakeTimers();
    renderHook(() => useChessGame());

    const setPhase = (phase: GamePhase) => act(() => { useChessStore.setState({ phase }); });

    setPhase('playing');
    act(() => { vi.advanceTimersByTime(10_000); });
    setPhase('check');
    act(() => { vi.advanceTimersByTime(10_000); });
    setPhase('playing'); // escaped the check — must not restart the timer
    act(() => { vi.advanceTimersByTime(10_000); });
    setPhase('checkmate');

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith(expect.objectContaining({ durationSeconds: 30, level: 1 }));
  });

  it('restarts the timer for a new game after the previous one ended', () => {
    vi.useFakeTimers();
    renderHook(() => useChessGame());
    const setPhase = (phase: GamePhase) => act(() => { useChessStore.setState({ phase }); });

    setPhase('playing');
    act(() => { vi.advanceTimersByTime(20_000); });
    setPhase('stalemate');
    act(() => { vi.advanceTimersByTime(60_000); }); // sitting on the game-over screen
    setPhase('playing');
    act(() => { vi.advanceTimersByTime(5_000); });
    setPhase('checkmate');

    expect(saveSpy).toHaveBeenCalledTimes(2);
    expect(saveSpy).toHaveBeenLastCalledWith(expect.objectContaining({ durationSeconds: 5 }));
  });
});
