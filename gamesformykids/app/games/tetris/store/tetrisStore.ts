import { makeStore } from '@/lib/stores/createStore';
import { Board, Piece, Position, TetrisGameState } from '../types';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  EMPTY_BOARD,
  EMPTY_ROW,
  getRandomPiece,
  rotatePiece,
} from '../constants';

// Rows finish their clear-flash animation before the board actually shifts down.
const LINE_CLEAR_ANIMATION_MS = 350;
// Simple wall-kick offsets tried in order when a rotation is blocked near an edge.
const WALL_KICK_OFFSETS = [0, 1, -1, 2, -2];

// ── Pure game logic helpers (no React state closures) ─────────────────────────

function checkValidPosition(piece: Piece | null, pos: Position, board: Board): boolean {
  if (!piece) return false;
  for (let y = 0; y < piece.blocks.length; y++) {
    for (let x = 0; x < piece.blocks[y]!.length; x++) {
      if (piece.blocks[y]![x]) {
        const newX = pos.x + x;
        const newY = pos.y + y;
        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY]![newX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

function mergePiece(piece: Piece, pos: Position, board: Board): Board {
  const newBoard = board.map(row => [...row]);
  for (let y = 0; y < piece.blocks.length; y++) {
    for (let x = 0; x < piece.blocks[y]!.length; x++) {
      if (piece.blocks[y]![x] && pos.y + y >= 0) {
        newBoard[pos.y + y]![pos.x + x] = piece.color;
      }
    }
  }
  return newBoard;
}

function findFullLines(board: Board): number[] {
  const lines: number[] = [];
  for (let y = 0; y < board.length; y++) {
    if (board[y]!.every(cell => cell !== 0)) lines.push(y);
  }
  return lines;
}

function removeLines(board: Board, lines: number[]): Board {
  const lineSet = new Set(lines);
  const remaining = board.filter((_, y) => !lineSet.has(y)).map(row => [...row]);
  while (remaining.length < BOARD_HEIGHT) {
    remaining.unshift([...EMPTY_ROW]);
  }
  return remaining;
}

function dropDistance(piece: Piece, pos: Position, board: Board): number {
  let dy = 0;
  while (checkValidPosition(piece, { x: pos.x, y: pos.y + dy + 1 }, board)) {
    dy++;
  }
  return dy;
}

// ── State & Actions types ──────────────────────────────────────────────────────

interface TetrisActions {
  setLoaded: () => void;
  startNewGame: () => void;
  movePiece: (dx: number, dy: number) => void;
  hardDrop: () => void;
  handleRotate: () => void;
  togglePause: () => void;
  goToStartScreen: () => void;
  getBoardWithCurrentPiece: () => Board;
}

const INITIAL_STATE: TetrisGameState = {
  board: EMPTY_BOARD,
  currentPiece: null,
  position: { x: 4, y: 0 },
  score: 0,
  level: 1,
  phase: 'loading',
  nextPiece: null,
  linesCleared: 0,
  clearingRows: [],
};

// ── Store ──────────────────────────────────────────────────────────────────────

export const useTetrisStore = makeStore<TetrisGameState & TetrisActions>('TetrisStore', (set, get) => {
  // Locks `piece` at `pos` into the board, then either advances immediately
  // (no lines cleared) or plays a brief flash on the full rows before
  // actually removing them and advancing.
  function lockPiece(piece: Piece, pos: Position, bonusScore: number) {
    const { board, score, level, linesCleared } = get();
    const merged = mergePiece(piece, pos, board);
    const linesToClear = findFullLines(merged);

    if (linesToClear.length === 0) {
      advanceToNextPiece(merged, score + bonusScore, level, linesCleared);
      return;
    }

    set({ board: merged, clearingRows: linesToClear, currentPiece: null });

    setTimeout(() => {
      // Bail out if the game was reset/left mid-animation.
      if (get().phase !== 'playing' || get().clearingRows.length === 0) return;

      const clearedBoard = removeLines(merged, linesToClear);
      const newScore = score + bonusScore + linesToClear.length * 100 * level;
      const newLevel = Math.floor(newScore / 1000) + 1;
      advanceToNextPiece(clearedBoard, newScore, newLevel, linesCleared + linesToClear.length);
    }, LINE_CLEAR_ANIMATION_MS);
  }

  function advanceToNextPiece(board: Board, score: number, level: number, linesCleared: number) {
    const { nextPiece } = get();
    const startPos = { x: 4, y: 0 };

    if (nextPiece && checkValidPosition(nextPiece, startPos, board)) {
      set({
        board,
        currentPiece: nextPiece,
        nextPiece: getRandomPiece(),
        position: startPos,
        score,
        level,
        linesCleared,
        clearingRows: [],
      });
    } else {
      set({
        board,
        phase: 'gameover',
        score,
        level,
        linesCleared,
        clearingRows: [],
      });
    }
  }

  return {
    ...INITIAL_STATE,

    setLoaded: () => set({ phase: 'menu' }),

    startNewGame: () => {
      set({
        board: EMPTY_BOARD,
        currentPiece: getRandomPiece(),
        position: { x: 4, y: 0 },
        score: 0,
        level: 1,
        phase: 'playing',
        nextPiece: getRandomPiece(),
        linesCleared: 0,
        clearingRows: [],
      });
    },

    movePiece: (dx, dy) => {
      const { currentPiece, phase, position, board, clearingRows } = get();
      if (!currentPiece || phase !== 'playing' || clearingRows.length > 0) return;

      const newPos = { x: position.x + dx, y: position.y + dy };

      if (checkValidPosition(currentPiece, newPos, board)) {
        set({ position: newPos });
        return;
      }

      if (dy > 0) {
        lockPiece(currentPiece, position, 0);
      }
    },

    hardDrop: () => {
      const { currentPiece, phase, position, board, clearingRows } = get();
      if (!currentPiece || phase !== 'playing' || clearingRows.length > 0) return;

      const dy = dropDistance(currentPiece, position, board);
      // Small score bonus per row skipped, rewarding decisive drops.
      lockPiece(currentPiece, { x: position.x, y: position.y + dy }, dy * 2);
    },

    handleRotate: () => {
      const { currentPiece, phase, position, board, clearingRows } = get();
      if (!currentPiece || phase !== 'playing' || clearingRows.length > 0) return;

      const rotated = rotatePiece(currentPiece);
      for (const dx of WALL_KICK_OFFSETS) {
        const kicked = { x: position.x + dx, y: position.y };
        if (checkValidPosition(rotated, kicked, board)) {
          set({ currentPiece: rotated, position: kicked });
          return;
        }
      }
    },

    togglePause: () => {
      const { phase } = get();
      if (phase === 'playing') set({ phase: 'paused' });
      else if (phase === 'paused') set({ phase: 'playing' });
    },

    goToStartScreen: () => set({ phase: 'menu' }),

    getBoardWithCurrentPiece: () => {
      const { board, currentPiece, position } = get();
      let displayBoard = board.map(row => [...row]);
      if (currentPiece && checkValidPosition(currentPiece, position, board)) {
        displayBoard = mergePiece(currentPiece, position, displayBoard);
      }
      return displayBoard;
    },
  };
});
