/**
 * ===============================================
 * Puzzle State Management - מנהל מצב הפאזל
 * ===============================================
 * 
 * פיצול מהקובץ הגדול PuzzleContext.tsx לניהול טוב יותר
 */

import { 
  PuzzleState, 
  PuzzleAction 
} from '../types/puzzle';

// Initial state for the puzzle
export const initialPuzzleState: PuzzleState = {
  gameStarted: false,
  isCompleted: false,
  timer: 0,
  difficulty: 9,
  score: 0,
  showHints: false,
  showDebug: false,
  showHelp: false,
  pieces: [],
  placedPieces: [],
  image: null,
  imageLoaded: false,
  draggedPiece: null,
  touchState: {
    draggedPiece: null,
    offset: { x: 0, y: 0 },
    isDragging: false,
    dragPosition: { x: 0, y: 0 }
  },
  selectedPuzzle: null
};

/**
 * Puzzle reducer - מנהל את כל שינויי המצב של הפאזל
 */
export function puzzleReducer(state: PuzzleState, action: PuzzleAction): PuzzleState {
  switch (action.type) {
    case 'SET_GAME_STARTED':
      return { ...state, gameStarted: action.payload };
    
    case 'SET_COMPLETED':
      return { ...state, isCompleted: action.payload };
    
    case 'SET_TIMER':
      return { ...state, timer: action.payload };
    
    case 'INCREMENT_TIMER':
      return { ...state, timer: state.timer + 1 };
    
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };
    
    case 'SET_SCORE':
      return { ...state, score: action.payload };
    
    case 'TOGGLE_HINTS':
      return { ...state, showHints: !state.showHints };
    
    case 'TOGGLE_DEBUG':
      return { ...state, showDebug: !state.showDebug };
    
    case 'TOGGLE_HELP':
      return { ...state, showHelp: !state.showHelp };
    
    case 'SET_PIECES':
      return { ...state, pieces: action.payload };
    
    case 'SET_PLACED_PIECES':
      return { ...state, placedPieces: action.payload };
    
    case 'SET_IMAGE':
      return { ...state, image: action.payload };
    
    case 'SET_IMAGE_LOADED':
      return { ...state, imageLoaded: action.payload };
    
    case 'SET_DRAGGED_PIECE':
      return { ...state, draggedPiece: action.payload };
    
    case 'SET_TOUCH_STATE':
      return { ...state, touchState: action.payload };
    
    case 'SET_SELECTED_PUZZLE':
      return { ...state, selectedPuzzle: action.payload };
    
    case 'RESET_GAME':
      return {
        ...state,
        gameStarted: false,
        isCompleted: false,
        timer: 0,
        score: 0,
        pieces: [],
        placedPieces: [],
        image: null,
        imageLoaded: false,
        draggedPiece: null,
        touchState: {
          draggedPiece: null,
          offset: { x: 0, y: 0 },
          isDragging: false,
          dragPosition: { x: 0, y: 0 }
        },
        selectedPuzzle: null
      };
    
    default:
      return state;
  }
}
