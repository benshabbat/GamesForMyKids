import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTetrisStore } from '@/app/games/tetris/store/tetrisStore';
import { BOARD_HEIGHT, BOARD_WIDTH, EMPTY_BOARD, TETROMINOES } from '@/app/games/tetris/constants';

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

  describe('togglePause', () => {
    it('pauses a playing game', () => {
      store.getState().startNewGame();
      store.getState().togglePause();
      expect(store.getState().phase).toBe('paused');
    });

    it('resumes a paused game', () => {
      store.getState().startNewGame();
      store.getState().togglePause();
      store.getState().togglePause();
      expect(store.getState().phase).toBe('playing');
    });

    it('does nothing from menu or gameover', () => {
      store.setState({ phase: 'gameover' } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().togglePause();
      expect(store.getState().phase).toBe('gameover');
    });
  });

  describe('handleRotate wall-kick', () => {
    it('shifts the piece away from the wall when a plain rotation would go out of bounds', () => {
      // T-piece already rotated once (3 rows x 2 cols), sitting flush against the right wall.
      store.setState({
        board: EMPTY_BOARD,
        currentPiece: { type: 'T', blocks: [[1, 0], [1, 1], [1, 0]], color: TETROMINOES.T!.color },
        position: { x: 8, y: 5 },
        phase: 'playing',
      } as unknown as Parameters<typeof store.setState>[0]);

      store.getState().handleRotate();

      const { currentPiece, position } = store.getState();
      // Next rotation is 2 rows x 3 cols — doesn't fit at x=8, needs to kick left to x=7.
      expect(currentPiece?.blocks).toEqual([[1, 1, 1], [0, 1, 0]]);
      expect(position).toEqual({ x: 7, y: 5 });
    });
  });

  describe('line clear animation', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('flashes the completed row before removing it and advancing', () => {
      const filledRow = new Array(BOARD_WIDTH).fill('gray').map((cell, x) => (x === 4 || x === 5 ? 0 : cell));
      const board = EMPTY_BOARD.map((row, y) => (y === BOARD_HEIGHT - 1 ? filledRow : [...row]));
      const nextPiece = { type: 'O', blocks: TETROMINOES.O!.blocks, color: 'yellow' };

      store.setState({
        board,
        currentPiece: { type: 'O', blocks: TETROMINOES.O!.blocks, color: 'cyan' },
        position: { x: 4, y: BOARD_HEIGHT - 2 },
        score: 0,
        level: 1,
        phase: 'playing',
        nextPiece,
        linesCleared: 0,
        clearingRows: [],
      } as unknown as Parameters<typeof store.setState>[0]);

      // The O-piece is already resting on the floor — one more down-move locks it in place.
      store.getState().movePiece(0, 1);

      let state = store.getState();
      expect(state.clearingRows).toEqual([BOARD_HEIGHT - 1]);
      expect(state.currentPiece).toBeNull();
      expect(state.board[BOARD_HEIGHT - 1]!.every(cell => cell !== 0)).toBe(true);

      vi.advanceTimersByTime(500);

      state = store.getState();
      expect(state.clearingRows).toEqual([]);
      expect(state.linesCleared).toBe(1);
      expect(state.score).toBe(100);
      expect(state.currentPiece).toEqual(nextPiece);
      expect(state.position).toEqual({ x: 4, y: 0 });
      // Row above (only the piece's top half) shifts down into the cleared row's place.
      expect(state.board[BOARD_HEIGHT - 1]).toEqual([0, 0, 0, 0, 'cyan', 'cyan', 0, 0, 0, 0]);
    });
  });
});
