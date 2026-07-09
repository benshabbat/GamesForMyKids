import { beforeEach, describe, expect, it } from 'vitest';
import { useFroggerStore } from '@/app/games/frogger/froggerStore';

const store = useFroggerStore;

beforeEach(() => {
  store.setState({
    phase: 'menu', score: 0, best: 0, lives: 3,
  } as unknown as Parameters<typeof store.setState>[0]);
});

describe('froggerStore', () => {
  describe('initial state', () => {
    it('starts at menu phase with no score', () => {
      expect(store.getState().phase).toBe('menu');
      expect(store.getState().score).toBe(0);
    });
  });

  describe('startPlaying', () => {
    it('transitions to playing phase', () => {
      store.getState().startPlaying();
      expect(store.getState().phase).toBe('playing');
    });

    it('resets score and lives', () => {
      store.setState({ score: 50, lives: 0 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().startPlaying();
      expect(store.getState().score).toBe(0);
      expect(store.getState().lives).toBe(3);
    });
  });

  describe('setScore', () => {
    it('updates the current score', () => {
      store.getState().setScore(42);
      expect(store.getState().score).toBe(42);
    });
  });

  describe('endGame', () => {
    it('sets phase to dead and lives to 0', () => {
      store.getState().startPlaying();
      store.getState().endGame(10);
      expect(store.getState().phase).toBe('dead');
      expect(store.getState().lives).toBe(0);
    });

    it('records a new best score', () => {
      store.getState().endGame(30);
      expect(store.getState().best).toBe(30);
    });

    it('keeps the previous best when the new score is lower', () => {
      store.setState({ best: 100 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().endGame(20);
      expect(store.getState().best).toBe(100);
    });

    it('updates the best when the new score is higher', () => {
      store.setState({ best: 15 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().endGame(40);
      expect(store.getState().best).toBe(40);
    });
  });
});
