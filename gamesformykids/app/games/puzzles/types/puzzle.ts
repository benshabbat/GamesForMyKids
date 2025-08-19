/**
 * ===============================================
 * טיפוסים ל-PuzzleContext
 * ===============================================
 */

// Import types from utils
import { PuzzlePiece } from '../utils/puzzleUtils';
import { SimplePuzzle } from '../constants/simplePuzzlesData';

export interface TouchState {
  draggedPiece: PuzzlePiece | null;
  offset: { x: number; y: number };
  isDragging: boolean;
  dragPosition: { x: number; y: number };
}

export interface PuzzleState {
  // Game State
  gameStarted: boolean;
  isCompleted: boolean;
  timer: number;
  difficulty: number;
  score: number;
  
  // UI State
  showHints: boolean;
  showDebug: boolean;
  showHelp: boolean;
  
  // Puzzle Data
  pieces: PuzzlePiece[];
  placedPieces: (PuzzlePiece | null)[];
  
  // Image Management
  image: HTMLImageElement | null;
  imageLoaded: boolean;
  
  // Drag & Drop
  draggedPiece: PuzzlePiece | null;
  touchState: TouchState;
  
  // Simple Puzzle Mode
  selectedPuzzle: SimplePuzzle | null;
}

export type PuzzleAction =
  | { type: 'SET_GAME_STARTED'; payload: boolean }
  | { type: 'SET_COMPLETED'; payload: boolean }
  | { type: 'SET_TIMER'; payload: number }
  | { type: 'INCREMENT_TIMER' }
  | { type: 'SET_DIFFICULTY'; payload: number }
  | { type: 'SET_SCORE'; payload: number }
  | { type: 'TOGGLE_HINTS' }
  | { type: 'TOGGLE_DEBUG' }
  | { type: 'TOGGLE_HELP' }
  | { type: 'SET_PIECES'; payload: PuzzlePiece[] }
  | { type: 'SET_PLACED_PIECES'; payload: (PuzzlePiece | null)[] }
  | { type: 'SET_IMAGE'; payload: HTMLImageElement | null }
  | { type: 'SET_IMAGE_LOADED'; payload: boolean }
  | { type: 'SET_DRAGGED_PIECE'; payload: PuzzlePiece | null }
  | { type: 'SET_TOUCH_STATE'; payload: TouchState }
  | { type: 'SET_SELECTED_PUZZLE'; payload: SimplePuzzle | null }
  | { type: 'RESET_GAME' }
  | { type: 'RESET_TO_MENU' };

export interface PuzzleContextValue extends PuzzleState {
  // Actions
  startGame: (difficulty: number, puzzle?: SimplePuzzle) => void;
  resetGame: () => void;
  toggleHints: () => void;
  toggleDebug: () => void;
  toggleHelp: () => void;
  
  // Piece Management
  handleDragStart: (piece: PuzzlePiece, event: React.MouseEvent | React.TouchEvent) => void;
  handleDragMove: (event: React.MouseEvent | React.TouchEvent) => void;
  handleDragEnd: (event: React.MouseEvent | React.TouchEvent) => void;
  placePiece: (piece: PuzzlePiece, position: number) => void;
  
  // Utils
  isPieceInCorrectPosition: (piece: PuzzlePiece) => boolean;
  getCompletedPercentage: () => number;
  canShowHint: () => boolean;
}

export interface PuzzleProviderProps {
  children: React.ReactNode;
}
