import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { useSimonStore, BUTTONS } from '@/app/games/simon/simonStore';

const store = useSimonStore;

beforeEach(() => {
  vi.useFakeTimers();
  store.setState({
    phase: 'menu', activeColor: null, playerIdx: 0,
    best: 0, roundScore: 0, sequence: [],
  } as unknown as Parameters<typeof store.setState>[0]);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('simonStore', () => {
  describe('initial state', () => {
    it('starts at menu phase', () => {
      expect(store.getState().phase).toBe('menu');
    });

    it('has no active color', () => {
      expect(store.getState().activeColor).toBeNull();
    });

    it('has empty sequence', () => {
      expect(store.getState().sequence).toHaveLength(0);
    });
  });

  describe('setPhase', () => {
    it('updates phase', () => {
      store.getState().setPhase('showing');
      expect(store.getState().phase).toBe('showing');
    });
  });

  describe('setActiveColor', () => {
    it('sets active color', () => {
      store.getState().setActiveColor('red');
      expect(store.getState().activeColor).toBe('red');
    });

    it('clears active color', () => {
      store.getState().setActiveColor('red');
      store.getState().setActiveColor(null);
      expect(store.getState().activeColor).toBeNull();
    });
  });

  describe('setSequence', () => {
    it('stores the sequence', () => {
      store.getState().setSequence(['red', 'blue', 'green']);
      expect(store.getState().sequence).toEqual(['red', 'blue', 'green']);
    });
  });

  describe('setRoundScore', () => {
    it('updates roundScore', () => {
      store.getState().setRoundScore(5);
      expect(store.getState().roundScore).toBe(5);
    });
  });

  describe('updateBest', () => {
    it('updates best when new score is higher', () => {
      store.getState().updateBest(10);
      expect(store.getState().best).toBe(10);
    });

    it('does not decrease best', () => {
      store.setState({ best: 15 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().updateBest(5);
      expect(store.getState().best).toBe(15);
    });
  });

  describe('setPlayerIdx', () => {
    it('updates player index', () => {
      store.getState().setPlayerIdx(2);
      expect(store.getState().playerIdx).toBe(2);
    });
  });

  describe('initGame', () => {
    it('creates a sequence with one button', () => {
      store.getState().initGame();
      expect(store.getState().sequence).toHaveLength(1);
    });

    it('sequence contains a valid button id', () => {
      store.getState().initGame();
      const validIds = BUTTONS.map(b => b.id);
      expect(validIds).toContain(store.getState().sequence[0]);
    });

    it('resets round score to 0', () => {
      store.setState({ roundScore: 5 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().initGame();
      expect(store.getState().roundScore).toBe(0);
    });
  });
});
