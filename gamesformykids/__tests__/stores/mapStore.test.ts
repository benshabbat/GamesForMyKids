import { describe, it, expect, beforeEach } from 'vitest';
import { useMapStore } from '@/app/games/israel-map/mapStore';

const get = () => useMapStore.getState();

function findCurrent(firstTry = true) {
  if (!firstTry) get().markMissed();
  get().markFound();
  get().nextLocation();
}

describe('israel-map mapStore', () => {
  beforeEach(() => {
    get().resetGame();
    get().startGame(1);
  });

  it('starts a game with 10 locations queued', () => {
    expect(get().phase).toBe('playing');
    expect(get().current).not.toBeNull();
    expect(get().queue).toHaveLength(9);
    expect(get().total).toBe(0);
  });

  it('wrong taps retry the same location and do not use up the game', () => {
    const first = get().current;
    for (let i = 0; i < 5; i++) get().markMissed();
    expect(get().total).toBe(0);
    expect(get().current).toBe(first);
    expect(get().lastResult).toBe('wrong');
    expect(get().phase).toBe('playing');
  });

  it('shows all 10 locations even when the child taps wrong many times', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 10; i++) {
      expect(get().phase).toBe('playing');
      seen.add(get().current!.id);
      get().markMissed();
      get().markMissed();
      get().markMissed();
      findCurrent(false);
    }
    expect(seen.size).toBe(10);
    expect(get().phase).toBe('result');
    expect(get().total).toBe(10);
    expect(get().foundIds).toHaveLength(10);
  });

  it('scores only the locations found on the first try', () => {
    findCurrent(true);   // first try
    findCurrent(false);  // needed a retry
    findCurrent(true);   // first try
    expect(get().total).toBe(3);
    expect(get().score).toBe(2);
  });

  it('a miss on one location does not carry over to the next', () => {
    findCurrent(false);
    expect(get().missedCurrent).toBe(false);
    get().markFound();
    expect(get().score).toBe(1);
  });

  it('a perfect game scores 10 of 10', () => {
    for (let i = 0; i < 10; i++) findCurrent(true);
    expect(get().phase).toBe('result');
    expect(get().score).toBe(10);
    expect(get().total).toBe(10);
  });

  it('records the found location id', () => {
    const id = get().current!.id;
    get().markFound();
    expect(get().foundIds).toEqual([id]);
    expect(get().lastResult).toBe('correct');
  });

  it('resetGame returns to a clean menu', () => {
    findCurrent(false);
    get().resetGame();
    expect(get()).toMatchObject({ phase: 'menu', score: 0, total: 0, missedCurrent: false, current: null, queue: [] });
  });
});
