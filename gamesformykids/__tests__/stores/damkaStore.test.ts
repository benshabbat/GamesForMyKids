import { beforeEach, describe, expect, it } from 'vitest';
import { useDamkaStore } from '@/app/games/checkers/damkaStore';
import { makeInitialBoard } from '@/app/games/checkers/damkaLogic';

const store = useDamkaStore;

beforeEach(() => {
  store.setState({
    phase: 'menu',
    board: makeInitialBoard(),
    selected: null,
    validMoves: [],
    currentTurn: 'player',
    playerScore: 0,
    computerScore: 0,
    message: '',
  } as unknown as Parameters<typeof store.setState>[0]);
});

describe('damkaStore', () => {
  describe('initial state', () => {
    it('starts at menu phase', () => {
      expect(store.getState().phase).toBe('menu');
    });

    it('starts with the player to move', () => {
      expect(store.getState().currentTurn).toBe('player');
    });
  });

  describe('startGame', () => {
    it('transitions to playing phase', () => {
      store.getState().startGame();
      expect(store.getState().phase).toBe('playing');
    });

    it('resets the board to the starting position', () => {
      store.getState().startGame();
      const pieces = store.getState().board.flat().filter((c) => c.color !== null);
      expect(pieces).toHaveLength(24);
    });

    it('preserves scores across restarts', () => {
      store.setState({ playerScore: 3, computerScore: 1 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().startGame();
      expect(store.getState().playerScore).toBe(3);
      expect(store.getState().computerScore).toBe(1);
    });
  });

  describe('selectCell', () => {
    it('does nothing before the game has started (menu phase)', () => {
      store.getState().selectCell({ row: 5, col: 0 });
      expect(store.getState().selected).toBeNull();
    });

    it('ignores clicks when it is not the player\'s turn', () => {
      store.getState().startGame();
      store.setState({ currentTurn: 'computer' } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().selectCell({ row: 5, col: 0 });
      expect(store.getState().selected).toBeNull();
    });

    it('selects a movable player piece and lists its valid moves', () => {
      store.getState().startGame();
      store.getState().selectCell({ row: 5, col: 0 });
      expect(store.getState().selected).toEqual({ row: 5, col: 0 });
      expect(store.getState().validMoves.length).toBeGreaterThan(0);
    });

    it('rejects selecting an opponent piece', () => {
      store.getState().startGame();
      store.getState().selectCell({ row: 2, col: 1 });
      expect(store.getState().selected).toBeNull();
    });

    it('deselects when clicking the already-selected piece again', () => {
      store.getState().startGame();
      store.getState().selectCell({ row: 5, col: 0 });
      store.getState().selectCell({ row: 5, col: 0 });
      expect(store.getState().selected).toBeNull();
      expect(store.getState().validMoves).toHaveLength(0);
    });

    it('moves the piece and passes the turn to the computer', () => {
      store.getState().startGame();
      store.getState().selectCell({ row: 5, col: 0 });
      const move = store.getState().validMoves[0]!;
      store.getState().selectCell(move.to);
      expect(store.getState().currentTurn).toBe('computer');
      expect(store.getState().board[5]![0]!.color).toBeNull();
    });
  });

  describe('doComputerMove', () => {
    it('does nothing when it is the player\'s turn', () => {
      store.getState().startGame();
      const before = store.getState().board;
      store.getState().doComputerMove();
      expect(store.getState().board).toBe(before);
    });

    it('makes a move and passes the turn back to the player', () => {
      store.getState().startGame();
      store.setState({ currentTurn: 'computer' } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().doComputerMove();
      expect(store.getState().currentTurn).toBe('player');
    });
  });
});
