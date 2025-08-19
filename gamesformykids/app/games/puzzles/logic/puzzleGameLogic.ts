/**
 * ===============================================
 * Puzzle Game Logic - לוגיקת משחק הפאזל
 * ===============================================
 * 
 * פונקציות עזר לניהול משחק הפאזל
 */

import { 
  createPuzzlePieces, 
  isPieceInCorrectPosition, 
  calculateFinalScore,
  type PuzzlePiece 
} from '../utils/puzzleUtils';
import { type SimplePuzzle } from '../constants/simplePuzzlesData';
import { PuzzleState } from '../types/puzzle';

/**
 * מאתחל משחק פאזל רגיל
 */
export const initializePuzzleGame = (
  img: HTMLImageElement, 
  difficulty: number = 9
) => {
  const newPieces = createPuzzlePieces(img, difficulty, 'custom');
  
  return {
    pieces: newPieces,
    placedPieces: new Array(difficulty).fill(null),
    image: img,
    imageLoaded: true,
    difficulty,
    gameStarted: true,
    isCompleted: false,
    timer: 0,
    score: 0,
    draggedPiece: null,
    touchState: {
      draggedPiece: null,
      offset: { x: 0, y: 0 },
      isDragging: false,
      dragPosition: { x: 0, y: 0 }
    }
  };
};

/**
 * מאתחל משחק פאזל פשוט
 */
export const initializeSimplePuzzleGame = (puzzle: SimplePuzzle): Promise<Partial<PuzzleState>> => {
  return new Promise((resolve) => {
    const img = document.createElement('img') as HTMLImageElement;
    img.onload = () => {
      const newPieces = createPuzzlePieces(img, puzzle.gridSize, 'simple');
      resolve({
        pieces: newPieces,
        placedPieces: new Array(puzzle.gridSize).fill(null),
        image: img,
        imageLoaded: true,
        difficulty: puzzle.gridSize,
        gameStarted: true,
        isCompleted: false,
        timer: 0,
        score: 0,
        selectedPuzzle: puzzle,
        draggedPiece: null,
        touchState: {
          draggedPiece: null,
          offset: { x: 0, y: 0 },
          isDragging: false,
          dragPosition: { x: 0, y: 0 }
        }
      });
    };
    img.src = puzzle.imageUrl;
  });
};

/**
 * מטפל בלוגיקת הנחת חלק פאזל
 */
export const handlePieceDropLogic = (
  piece: PuzzlePiece, 
  gridIndex: number, 
  state: PuzzleState
): {
  success: boolean;
  newPlacedPieces: (PuzzlePiece | null)[];
  updatedPieces: PuzzlePiece[];
  isCorrect: boolean;
} => {
  const gridSide = Math.sqrt(state.difficulty);
  const row = Math.floor(gridIndex / gridSide);
  const col = gridIndex % gridSide;

  const newPlacedPieces = [...state.placedPieces];
  
  // מוצא את המיקום הנוכחי של החלק
  const currentIndex = newPlacedPieces.findIndex(p => p?.id === piece.id);
  if (currentIndex !== -1) {
    newPlacedPieces[currentIndex] = null;
  }

  // בודק אם יש כבר חלק במיקום היעד
  const existingPiece = newPlacedPieces[gridIndex];
  let updatedPieces = [...state.pieces];
  
  if (existingPiece) {
    // מחזיר את החלק הקיים לרשימת החלקים הזמינים
    updatedPieces = state.pieces.map(p => 
      p.id === existingPiece.id 
        ? { ...p, isPlaced: false, isCorrect: false }
        : p
    );
  }

  // בודק אם החלק במיקום הנכון
  const isCorrect = isPieceInCorrectPosition(piece, row, col);
  
  // מעדכן את החלק
  updatedPieces = updatedPieces.map(p => 
    p.id === piece.id 
      ? { 
          ...p, 
          isPlaced: true, 
          isCorrect,
          currentRow: row,
          currentCol: col,
          currentPosition: { row, col }
        }
      : p
  );

  // מציב את החלק במיקום החדש
  newPlacedPieces[gridIndex] = {
    ...piece,
    isPlaced: true,
    isCorrect,
    currentRow: row,
    currentCol: col,
    currentPosition: { row, col }
  };

  return {
    success: true,
    newPlacedPieces,
    updatedPieces,
    isCorrect
  };
};

/**
 * בודק אם הפאזל הושלם
 */
export const checkPuzzleCompletion = (placedPieces: (PuzzlePiece | null)[]): boolean => {
  return placedPieces.every(piece => piece && piece.isCorrect);
};

/**
 * מחשב ציון סופי
 */
export const calculatePuzzleScore = (timer: number, difficulty: number): number => {
  return calculateFinalScore(timer, difficulty);
};
