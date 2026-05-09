import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { setupGameTimer } from '@/lib/stores/gameTimerHelpers';

function makeTestStore(initialTime = 10) {
  let state = { timeLeft: initialTime };
  const set = (partial: Record<string, unknown>) => { state = { ...state, ...partial }; };
  const get = () => state;
  return { set, get, getState: get };
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('setupGameTimer', () => {
  describe('start', () => {
    it('decrements timeLeft each second', () => {
      const { set, get, getState } = makeTestStore(10);
      const onEnd = vi.fn();
      const { start } = setupGameTimer({ name: 'test', set, get, onEnd });

      start();
      vi.advanceTimersByTime(1000);
      expect(getState().timeLeft).toBe(9);

      vi.advanceTimersByTime(1000);
      expect(getState().timeLeft).toBe(8);
    });

    it('calls onEnd when timeLeft reaches 1', () => {
      const { set, get } = makeTestStore(2);
      const onEnd = vi.fn();
      const { start } = setupGameTimer({ name: 'test', set, get, onEnd });

      start();
      // first tick: timeLeft 2→1 (set); second tick: t=1 <=1, fires onEnd
      vi.advanceTimersByTime(2000);
      expect(onEnd).toHaveBeenCalledTimes(1);
    });

    it('does not call onEnd before time is up', () => {
      const { set, get } = makeTestStore(5);
      const onEnd = vi.fn();
      const { start } = setupGameTimer({ name: 'test', set, get, onEnd });

      start();
      vi.advanceTimersByTime(3000);
      expect(onEnd).not.toHaveBeenCalled();
    });

    it('stops the interval after onEnd fires', () => {
      const { set, get, getState } = makeTestStore(2);
      const onEnd = vi.fn();
      const { start } = setupGameTimer({ name: 'test', set, get, onEnd });

      start();
      vi.advanceTimersByTime(2000);
      const timeAfterEnd = getState().timeLeft;
      vi.advanceTimersByTime(5000);
      expect(getState().timeLeft).toBe(timeAfterEnd);
    });
  });

  describe('stop', () => {
    it('stops the countdown', () => {
      const { set, get, getState } = makeTestStore(10);
      const onEnd = vi.fn();
      const { start, stop } = setupGameTimer({ name: 'test', set, get, onEnd });

      start();
      vi.advanceTimersByTime(2000);
      stop();
      const timeAtStop = getState().timeLeft;
      vi.advanceTimersByTime(3000);
      expect(getState().timeLeft).toBe(timeAtStop);
    });

    it('calling stop before start does not throw', () => {
      const { set, get } = makeTestStore(10);
      const { stop } = setupGameTimer({ name: 'test', set, get, onEnd: vi.fn() });
      expect(() => stop()).not.toThrow();
    });
  });

  describe('restart', () => {
    it('restarting clears the previous interval', () => {
      const { set, get, getState } = makeTestStore(10);
      const onEnd = vi.fn();
      const { start } = setupGameTimer({ name: 'test', set, get, onEnd });

      start();
      vi.advanceTimersByTime(2000);
      (get() as { timeLeft: number }).timeLeft = 10;
      start();
      vi.advanceTimersByTime(1000);
      expect(getState().timeLeft).toBe(9);
    });
  });
});
