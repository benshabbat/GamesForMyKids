// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsraelMap } from '@/app/games/israel-map/useIsraelMap';
import { useMapStore } from '@/app/games/israel-map/mapStore';

vi.mock('@/lib/utils/speech/enhancedSpeechUtils', () => ({ speakHebrew: vi.fn(async () => {}) }));

describe('useIsraelMap tapping', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useMapStore.getState().resetGame();
  });
  afterEach(() => vi.useRealTimers());

  it('wrong taps do not advance the game; the same location is asked again', () => {
    const { result } = renderHook(() => useIsraelMap());
    act(() => result.current.startGame(1));
    const target = result.current.current!;

    for (let i = 0; i < 3; i++) {
      act(() => result.current.handleTap(-100, -100)); // far away from every location
      expect(result.current.lastResult).toBe('wrong');
      act(() => { vi.advanceTimersByTime(1300); });
      expect(result.current.lastResult).toBeNull();
    }

    expect(result.current.total).toBe(0);
    expect(result.current.current).toBe(target);
  });

  it('a correct tap after misses completes the location without scoring, then moves on', () => {
    const { result } = renderHook(() => useIsraelMap());
    act(() => result.current.startGame(1));
    const target = result.current.current!;

    act(() => result.current.handleTap(-100, -100));
    act(() => { vi.advanceTimersByTime(1300); });
    act(() => result.current.handleTap(target.x, target.y));
    expect(result.current.total).toBe(1);
    expect(result.current.score).toBe(0);

    act(() => { vi.advanceTimersByTime(2600); });
    expect(result.current.current).not.toBe(target);
    expect(result.current.phase).toBe('playing');
  });

  it('leaving to the menu during the success pause does not jump to the result screen', () => {
    const { result } = renderHook(() => useIsraelMap());
    act(() => result.current.startGame(1));
    const target = result.current.current!;

    act(() => result.current.handleTap(target.x, target.y));
    act(() => result.current.resetGame());
    act(() => { vi.advanceTimersByTime(3000); });

    expect(result.current.phase).toBe('menu');
  });
});
