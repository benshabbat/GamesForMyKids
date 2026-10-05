import { beforeEach, describe, expect, it } from 'vitest';
import { useBalloonPopStore, GAME_DURATION } from '@/app/games/balloon-pop/balloonPopStore';

const store = useBalloonPopStore;

beforeEach(() => {
  store.setState({
    phase: 'menu', score: 0, best: 0, lives: 5, timeLeft: GAME_DURATION, balloons: [],
  } as unknown as Parameters<typeof store.setState>[0]);
});

describe('balloonPopStore', () => {
  describe('resetToMenu', () => {
    it('returns an in-progress game to the menu and clears the balloons', () => {
      store.getState().startGame();
      store.setState({
        balloons: [{ id: 1, x: 10, y: 10, r: 20, vy: -1, color: ['#fff', '#000'], isBomb: false, popped: false, popAnim: 0 }],
      } as unknown as Parameters<typeof store.setState>[0]);

      store.getState().resetToMenu();

      expect(store.getState().phase).toBe('menu');
      expect(store.getState().balloons).toEqual([]);
    });

    it('keeps the best score', () => {
      store.setState({ best: 120 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().startGame();
      store.getState().resetToMenu();
      expect(store.getState().best).toBe(120);
    });

    it('lets startGame begin a fresh run afterwards', () => {
      store.getState().startGame();
      store.getState().resetToMenu();
      store.getState().startGame();
      expect(store.getState().phase).toBe('playing');
      expect(store.getState().lives).toBe(5);
      expect(store.getState().timeLeft).toBe(GAME_DURATION);
    });
  });
});
