// Tetris Types
import type { Point } from '@/lib/types';
export type Position = Point;

export interface Piece {
  type: string;
  blocks: number[][];
  color: string;
}

export type Board = (string | number)[][];

export type TetrisPhase = 'loading' | 'menu' | 'playing' | 'gameover';

export interface TetrisGameState {
  board: Board;
  currentPiece: Piece | null;
  position: Position;
  score: number;
  level: number;
  phase: TetrisPhase;
  nextPiece: Piece | null;
  linesCleared: number;
}

export interface GameBoardProps {
  displayBoard: Board;
}

export interface NextPieceDisplayProps {
  nextPiece: Piece | null;
  isMobile?: boolean;
}
