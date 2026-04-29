// Tetris Types
import type { Point } from '@/lib/types';
export type Position = Point;

export interface Piece {
  type: string;
  blocks: number[][];
  color: string;
}

export type Board = (string | number)[][];

export interface TetrisGameState {
  board: Board;
  currentPiece: Piece | null;
  position: Position;
  score: number;
  level: number;
  isGameRunning: boolean;
  gameOver: boolean;
  nextPiece: Piece | null;
  linesCleared: number;
  showStartScreen: boolean;
  isLoading: boolean;
}

export interface GameBoardProps {
  displayBoard: Board;
}

export interface NextPieceDisplayProps {
  nextPiece: Piece | null;
  isMobile?: boolean;
}
