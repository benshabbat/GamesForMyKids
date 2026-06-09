import { beforeEach, describe, expect, it } from 'vitest';
import { useTetrisStore } from '@/app/games/tetris/store/tetrisStore';
import { BOARD_HEIGHT, BOARD_WIDTH, EMPTY_BOARD } from '@/app/games/tetris/constants';

const store = useTetrisStore;

beforeEach(() => {
  store.setState({
    board: EMPTY_BOARD,
    currentPiece: null,
    position: { x: 4, y: 0 },
    score: 0,
    level: 1,
    phase: 'loading',
    nextPiece: null,
    linesCleared: 0,
  } as unknown as Parameters<typeof store.setState>[0]);
});

describe('tetrisStore', () => {
  describe('initial state', () => {
    it('starts at loading phase', () => {
      expect(store.getState().phase).toBe('loading');
    });

    it('starts with score 0', () => {
      expect(store.getState().score).toBe(0);
    });

    it('starts at level 1', () => {
      expect(store.getState().level).toBe(1);
    });

    it('has no current piece initially', () => {
      expect(store.getState().currentPiece).toBeNull();
    });

    it('has an empty board', () => {
      expect(store.getState().board).toHaveLength(BOARD_HEIGHT);
      expect(store.getState().board[0]).toHaveLength(BOARD_WIDTH);
    });
  });

  describe('setLoaded', () => {
    it('transitions to menu phase', () => {
      store.getState().setLoaded();
      expect(store.getState().phase).toBe('menu');
    });
  });

  describe('startNewGame', () => {
    it('transitions to playing phase', () => {
      store.getState().startNewGame();
      expect(store.getState().phase).toBe('playing');
    });

    it('creates a current piece', () => {
      store.getState().startNewGame();
      expect(store.getState().currentPiece).not.toBeNull();
    });

    it('creates a next piece', () => {
      store.getState().startNewGame();
      expect(store.getState().nextPiece).not.toBeNull();
    });

    it('resets score to 0', () => {
      store.setState({ score: 500 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().startNewGame();
      expect(store.getState().score).toBe(0);
    });

    it('resets to level 1', () => {
      store.setState({ level: 5 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().startNewGame();
      expect(store.getState().level).toBe(1);
    });

    it('resets board to empty', () => {
      store.getState().startNewGame();
      const { board } = store.getState();
      const allEmpty = board.every(row => row.every(cell => cell === 0));
      expect(allEmpty).toBe(true);
    });
  });

  describe('goToStartScreen', () => {
    it('returns to menu from playing', () => {
      store.getState().startNewGame();
      store.getState().goToStartScreen();
      expect(store.getState().phase).toBe('menu');
    });
  });
});
