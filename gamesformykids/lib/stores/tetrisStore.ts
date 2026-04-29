/**
 * ===============================================
 * Tetris Store — Zustand
 * ===============================================
 * מצב המשחק המרכזי לטטריס — singleton שנגיש לכל
 * קומפוננט ללא props drilling.
 *
 * לוגיקת המשחק (movePiece, handleRotate וכו') מוגדרת
 * כאן עם get() כדי להמנע מ-stale closures.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Board, Piece, Position, TetrisGameState } from '@/app/games/tetris/types';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  EMPTY_BOARD,
  EMPTY_ROW,
  getRandomPiece,
  rotatePiece,
} from '@/app/games/tetris/constants';

// ── Pure game logic helpers (no React state closures) ─────────────────────────

function checkValidPosition(piece: Piece | null, pos: Position, board: Board): boolean {
  if (!piece) return false;
  for (let y = 0; y < piece.blocks.length; y++) {
    for (let x = 0; x < piece.blocks[y].length; x++) {
      if (piece.blocks[y][x]) {
        const newX = pos.x + x;
        const newY = pos.y + y;
        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX])
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
    for (let x = 0; x < piece.blocks[y].length; x++) {
      if (piece.blocks[y][x] && pos.y + y >= 0) {
        newBoard[pos.y + y][pos.x + x] = piece.color;
      }
    }
  }
  return newBoard;
}

function clearFullLines(board: Board): { board: Board; linesCleared: number } {
  const newBoard: Board = [];
  let linesCleared = 0;
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (board[y].every(cell => cell !== 0)) {
      linesCleared++;
    } else {
      newBoard.unshift(board[y]);
    }
  }
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift([...EMPTY_ROW]);
  }
  return { board: newBoard, linesCleared };
}

// ── State & Actions types ──────────────────────────────────────────────────────

interface TetrisActions {
  /** סמן כסיום טעינה (נקרא אחרי 500ms ב-useEffect) */
  setLoaded: () => void;
  startNewGame: () => void;
  movePiece: (dx: number, dy: number) => void;
  handleRotate: () => void;
  goToStartScreen: () => void;
  /** מחזיר את הלוח עם החלק הנוכחי מוצג */
  getBoardWithCurrentPiece: () => Board;
}

const INITIAL_STATE: TetrisGameState = {
  board: EMPTY_BOARD,
  currentPiece: null,
  position: { x: 4, y: 0 },
  score: 0,
  level: 1,
  isGameRunning: false,
  gameOver: false,
  nextPiece: null,
  linesCleared: 0,
  showStartScreen: true,
  isLoading: true,
};

// ── Store ──────────────────────────────────────────────────────────────────────

export const useTetrisStore = create<TetrisGameState & TetrisActions>()(
  devtools(
    (set, get) => ({
      ...INITIAL_STATE,

      setLoaded: () => set({ isLoading: false }),

      startNewGame: () => {
        set({
          board: EMPTY_BOARD,
          currentPiece: getRandomPiece(),
          position: { x: 4, y: 0 },
          score: 0,
          level: 1,
          isGameRunning: true,
          gameOver: false,
          nextPiece: getRandomPiece(),
          linesCleared: 0,
          showStartScreen: false,
          isLoading: false,
        });
      },

      movePiece: (dx, dy) => {
        const { currentPiece, gameOver, position, board, score, level, nextPiece, linesCleared } =
          get();
        if (!currentPiece || gameOver) return;

        const newPos = { x: position.x + dx, y: position.y + dy };

        if (checkValidPosition(currentPiece, newPos, board)) {
          set({ position: newPos });
          return;
        }

        if (dy > 0) {
          // החלק נחת — מזג אותו ללוח
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
            // Game over
            set({
              board: clearedBoard,
              gameOver: true,
              isGameRunning: false,
              score: newScore,
              level: newLevel,
              linesCleared: linesCleared + newLines,
            });
          }
        }
      },

      handleRotate: () => {
        const { currentPiece, gameOver, position, board } = get();
        if (!currentPiece || gameOver) return;
        const rotated = rotatePiece(currentPiece);
        if (checkValidPosition(rotated, position, board)) {
          set({ currentPiece: rotated });
        }
      },

      goToStartScreen: () => set({ showStartScreen: true, isGameRunning: false }),

      getBoardWithCurrentPiece: () => {
        const { board, currentPiece, position } = get();
        let displayBoard = board.map(row => [...row]);
        if (currentPiece && checkValidPosition(currentPiece, position, board)) {
          displayBoard = mergePiece(currentPiece, position, displayBoard);
        }
        return displayBoard;
      },
    }),
    { name: 'TetrisStore' }
  )
);
