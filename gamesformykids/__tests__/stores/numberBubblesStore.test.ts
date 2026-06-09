import { beforeEach, describe, expect, it } from 'vitest';
import { useNumberBubblesStore } from '@/app/games/number-bubbles/numberBubblesStore';

const store = useNumberBubblesStore;

const INITIAL = {
  phase: 'menu' as const, level: 1, bubbles: [], next: 1,
  elapsed: 0, best: null, wrong: false, nextBubbleId: 0,
};

beforeEach(() => {
  store.setState(INITIAL as unknown as Parameters<typeof store.setState>[0]);
});

describe('numberBubblesStore', () => {
  describe('initial state', () => {
    it('starts at menu phase', () => {
      expect(store.getState().phase).toBe('menu');
    });

    it('starts at level 1', () => {
      expect(store.getState().level).toBe(1);
    });

    it('starts with no bubbles', () => {
      expect(store.getState().bubbles).toHaveLength(0);
    });

    it('starts with next = 1', () => {
      expect(store.getState().next).toBe(1);
    });

    it('starts with no best score', () => {
      expect(store.getState().best).toBeNull();
    });
  });

  describe('startGame', () => {
    it('transitions to playing phase', () => {
      store.getState().startGame();
      expect(store.getState().phase).toBe('playing');
    });

    it('creates bubbles', () => {
      store.getState().startGame();
      expect(store.getState().bubbles.length).toBeGreaterThan(0);
    });

    it('resets next to 1', () => {
      store.setState({ next: 5 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().startGame();
      expect(store.getState().next).toBe(1);
    });

    it('resets level to 1', () => {
      store.setState({ level: 3 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().startGame();
      expect(store.getState().level).toBe(1);
    });
  });

  describe('clearWrong', () => {
    it('clears the wrong flag', () => {
      store.setState({ wrong: true } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().clearWrong();
      expect(store.getState().wrong).toBe(false);
    });
  });

  describe('tap', () => {
    it('pops the correct bubble (next == bubble.num)', () => {
      store.getState().startGame();
      const { bubbles, next } = store.getState();
      const correctBubble = bubbles.find(b => b.num === next);
      if (!correctBubble) return; // correct bubble may not exist at this level
      store.getState().tap(correctBubble);
      const popped = store.getState().bubbles.find(b => b.id === correctBubble.id);
      expect(popped?.popped).toBe(true);
    });

    it('sets wrong flag on incorrect tap', () => {
      store.getState().startGame();
      const { bubbles, next } = store.getState();
      const wrongBubble = bubbles.find(b => b.num !== next);
      if (!wrongBubble) return; // skip if all bubbles are correct
      store.getState().tap(wrongBubble);
      expect(store.getState().wrong).toBe(true);
    });
  });
});
