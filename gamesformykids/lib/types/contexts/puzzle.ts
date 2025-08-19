/**
 * ===============================================
 * טיפוסים לContext של פאזל
 * ===============================================
 */

export interface PuzzlePiece {
  id: string;
  x: number;
  y: number;
  correctX: number;
  correctY: number;
  isPlaced: boolean;
  rotation: number;
  image?: string;
  shape?: 'square' | 'triangle' | 'circle' | 'rectangle';
}

export interface PuzzleState {
  pieces: PuzzlePiece[];
  completedPieces: number;
  totalPieces: number;
  difficulty: 'easy' | 'medium' | 'hard';
  gameStatus: 'idle' | 'playing' | 'completed';
  startTime?: Date;
  endTime?: Date;
  moves: number;
  hints: number;
}

export interface PuzzleContextType {
  puzzleState: PuzzleState;
  
  // Game actions
  startPuzzle: (difficulty?: 'easy' | 'medium' | 'hard') => void;
  resetPuzzle: () => void;
  
  // Piece actions
  movePiece: (pieceId: string, x: number, y: number) => void;
  rotatePiece: (pieceId: string) => void;
  placePiece: (pieceId: string) => boolean;
  
  // Helpers
  getHint: () => void;
  isComplete: boolean;
  canMovePiece: (pieceId: string) => boolean;
}

export interface PuzzleProviderProps {
  children: React.ReactNode;
  puzzleType?: string;
}
