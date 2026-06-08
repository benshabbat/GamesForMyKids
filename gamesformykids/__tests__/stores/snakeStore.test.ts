import { beforeEach, describe, expect, it } from 'vitest';
import { useSnakeStore } from '@/app/games/snake/stores/useSnakeStore';

const store = useSnakeStore;

beforeEach(() => {
  store.setState({ phase: 'menu' } as unknown as Parameters<typeof store.setState>[0]);
});

describe('snakeStore', () => {
  describe('initial state', () => {
    it('starts at menu phase', () => {
      expect(store.getState().phase).toBe('menu');
    });
  });

  describe('setPhase', () => {
    it('transitions to playing', () => {
      store.getState().setPhase('playing');
      expect(store.getState().phase).toBe('playing');
    });

    it('transitions to dead', () => {
      store.getState().setPhase('dead');
      expect(store.getState().phase).toBe('dead');
    });

    it('returns to menu from any phase', () => {
      store.getState().setPhase('playing');
      store.getState().setPhase('menu');
      expect(store.getState().phase).toBe('menu');
    });
  });
});
