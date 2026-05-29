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

function clearFullLines(board: Board): { board: Board; linesCleared: number } {
  const newBoard: Board = [];
  let linesCleared = 0;
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (board[y]!.every(cell => cell !== 0)) {
      linesCleared++;
    } else {
      newBoard.unshift(board[y]!);
    }
  }
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift([...EMPTY_ROW]);
  }
  return { board: newBoard, linesCleared };
}

// ── State & Actions types ──────────────────────────────────────────────────────

interface TetrisActions {
  setLoaded: () => void;
  startNewGame: () => void;
  movePiece: (dx: number, dy: number) => void;
  handleRotate: () => void;
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
};

// ── Store ──────────────────────────────────────────────────────────────────────

export const useTetrisStore = makeStore<TetrisGameState & TetrisActions>('TetrisStore', (set, get) => ({
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
    });
  },

  movePiece: (dx, dy) => {
    const { currentPiece, phase, position, board, score, level, nextPiece, linesCleared } = get();
    if (!currentPiece || phase !== 'playing') return;

    const newPos = { x: position.x + dx, y: position.y + dy };

    if (checkValidPosition(currentPiece, newPos, board)) {
      set({ position: newPos });
      return;
    }

    if (dy > 0) {
      const merged = mergePiece(currentPiece, position, board);
      const { board: clearedBoard, linesCleared: newLines } = clearFullLines(merged);
      const newScore = score + newLines * 100 * level;
      const newLevel = newLines > 0 ? Math.floor(newScore / 1000) + 1 : level;
      const startPos = { x: 4, y: 0 };

      if (nextPiece && checkValidPosition(nextPiece, startPos, clearedBoard)) {
        set({
          board: clearedBoard,
          currentPiece: nextPiece,
          nextPiece: getRandomPiece(),
          position: startPos,
          score: newScore,
          level: newLevel,
          linesCleared: linesCleared + newLines,
        });
      } else {
        set({
          board: clearedBoard,
          phase: 'gameover',
          score: newScore,
          level: newLevel,
          linesCleared: linesCleared + newLines,
        });
      }
    }
  },

  handleRotate: () => {
    const { currentPiece, phase, position, board } = get();
    if (!currentPiece || phase !== 'playing') return;
    const rotated = rotatePiece(currentPiece);
    if (checkValidPosition(rotated, position, board)) {
      set({ currentPiece: rotated });
    }
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
}));
