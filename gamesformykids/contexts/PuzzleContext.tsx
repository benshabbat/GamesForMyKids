'use client';

import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  createPuzzlePieces, 
  isPieceInCorrectPosition, 
  calculateFinalScore,
  type PuzzlePiece 
} from '@/lib/utils/puzzleUtils';
import { usePuzzleFeedback } from '@/hooks/games/usePuzzleFeedback';
import { type SimplePuzzle } from '@/lib/constants/simplePuzzlesData';
import { 
  TouchState, 
  PuzzleState, 
  PuzzleAction, 
  PuzzleContextValue, 
  PuzzleProviderProps 
} from '@/lib/types/contexts/puzzle';


// Initial state for the puzzle

const initialState: PuzzleState = {
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

function puzzleReducer(state: PuzzleState, action: PuzzleAction): PuzzleState {
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
        draggedPiece: null,
        touchState: initialState.touchState
      };
    
    case 'RESET_TO_MENU':
      return {
        ...initialState,
        difficulty: state.difficulty // Keep difficulty setting
      };
    
    default:
      return state;
  }
}

// Context
interface PuzzleContextType {
  state: PuzzleState;
  dispatch: React.Dispatch<PuzzleAction>;
  
  // Actions
  initializeGame: (img: HTMLImageElement, difficulty?: number) => void;
  initializeSimpleGame: (puzzle: SimplePuzzle) => void;
  handleDropLogic: (piece: PuzzlePiece, gridIndex: number) => boolean;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePreMadeImageSelect: (imageSrc: string) => void;
  shufflePieces: () => void;
  resetGame: () => void;
  goHome: () => void;
  goToMenu: () => void;
  
  // UI Toggles
  toggleHints: () => void;
  toggleDebug: () => void;
  toggleHelp: () => void;
  
  // Difficulty Management
  changeDifficulty: (newDifficulty: number) => void;
  
  // Puzzle Selection
  handlePuzzleSelect: (puzzle: SimplePuzzle) => void;
  
  // Drag & Drop
  handleDragStart: (e: React.DragEvent, piece: PuzzlePiece) => void;
  handleTouchStart: (e: React.TouchEvent, piece: PuzzlePiece) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, gridIndex: number) => void;
  
  // Feedback
  showFeedback: (message: string, type: 'success' | 'error') => void;
  speak: (text: string) => void;
}

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

// Provider Component
export function PuzzleProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(puzzleReducer, initialState);
  const router = useRouter();
  const { showFeedback, speak } = usePuzzleFeedback();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.gameStarted && !state.isCompleted) {
      interval = setInterval(() => {
        dispatch({ type: 'INCREMENT_TIMER' });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.gameStarted, state.isCompleted]);

  // Initialize game with custom image
  const initializeGame = useCallback((img: HTMLImageElement, difficulty?: number) => {
    const targetDifficulty = difficulty || state.difficulty;
    
    const newPieces = createPuzzlePieces(img, targetDifficulty, 'custom');
    
    dispatch({ type: 'SET_IMAGE', payload: img });
    dispatch({ type: 'SET_PIECES', payload: newPieces });
    dispatch({ type: 'SET_PLACED_PIECES', payload: new Array(targetDifficulty).fill(null) });
    dispatch({ type: 'SET_GAME_STARTED', payload: true });
    dispatch({ type: 'SET_COMPLETED', payload: false });
    dispatch({ type: 'SET_TIMER', payload: 0 });
    dispatch({ type: 'SET_SCORE', payload: 0 });
    dispatch({ type: 'SET_IMAGE_LOADED', payload: true });
    
    if (difficulty) {
      dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
    }
  }, [state.difficulty]);

  // Initialize simple puzzle game
  const initializeSimpleGame = useCallback((puzzle: SimplePuzzle) => {
    const img = document.createElement('img') as HTMLImageElement;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const newPieces = createPuzzlePieces(img, puzzle.gridSize, 'simple');
      
      dispatch({ type: 'SET_SELECTED_PUZZLE', payload: puzzle });
      dispatch({ type: 'SET_PIECES', payload: newPieces });
      dispatch({ type: 'SET_PLACED_PIECES', payload: new Array(puzzle.gridSize).fill(null) });
      dispatch({ type: 'SET_GAME_STARTED', payload: true });
      dispatch({ type: 'SET_COMPLETED', payload: false });
      dispatch({ type: 'SET_TIMER', payload: 0 });
      dispatch({ type: 'SET_SCORE', payload: 0 });
      dispatch({ type: 'SET_IMAGE_LOADED', payload: true });
      dispatch({ type: 'SET_DIFFICULTY', payload: puzzle.gridSize });
      
      speak(`התחיל משחק ${puzzle.name}! בואו נתחיל לשחק`);
    };
    
    img.onerror = () => {
      showFeedback('שגיאה בטעינת התמונה', 'error');
    };
    
    img.src = puzzle.imageUrl;
  }, [showFeedback, speak]);

  // Handle drop logic
  const handleDropLogic = useCallback((piece: PuzzlePiece, gridIndex: number): boolean => {
    const gridSide = Math.sqrt(state.difficulty);
    const row = Math.floor(gridIndex / gridSide);
    const col = gridIndex % gridSide;
    
    // Create new array for placed pieces
    const newPlacedPieces = [...state.placedPieces];
    
    // Remove piece from its current position if it's already placed
    const currentIndex = newPlacedPieces.findIndex(p => p?.id === piece.id);
    if (currentIndex !== -1) {
      newPlacedPieces[currentIndex] = null;
    }

    // Check if there's already a piece at the target position
    const existingPiece = newPlacedPieces[gridIndex];
    if (existingPiece) {
      // Return existing piece to pool by updating pieces array
      const updatedPieces = state.pieces.map(p => 
        p.id === existingPiece.id ? { 
          ...p, 
          isPlaced: false, 
          isCorrect: false, 
          currentPosition: undefined 
        } : p
      );
      dispatch({ type: 'SET_PIECES', payload: updatedPieces });
    }

    // Clear target position first
    newPlacedPieces[gridIndex] = null;

    // Check if placement is correct
    const isCorrect = isPieceInCorrectPosition(piece, row, col);
    
    if (isCorrect) {
      const updatedPiece: PuzzlePiece = {
        ...piece,
        currentPosition: { row, col },
        isPlaced: true,
        isCorrect: true
      };

      newPlacedPieces[gridIndex] = updatedPiece;
      dispatch({ type: 'SET_PLACED_PIECES', payload: newPlacedPieces });

      const updatedPieces = state.pieces.map(p => 
        p.id === piece.id ? updatedPiece : p
      );
      dispatch({ type: 'SET_PIECES', payload: updatedPieces });

      showFeedback('כל הכבוד! החלק במקום הנכון! 🎉', 'success');
      speak('כל הכבוד! החלק במקום הנכון!');
      
      // Add haptic feedback for mobile
      if (navigator.vibrate) {
        navigator.vibrate(100); // Short vibration for success
      }
    } else {
      const updatedPiece: PuzzlePiece = {
        ...piece,
        currentPosition: { row, col },
        isPlaced: true,
        isCorrect: false
      };

      newPlacedPieces[gridIndex] = updatedPiece;
      dispatch({ type: 'SET_PLACED_PIECES', payload: newPlacedPieces });
      
      const updatedPieces = state.pieces.map(p => 
        p.id === piece.id ? updatedPiece : p
      );
      dispatch({ type: 'SET_PIECES', payload: updatedPieces });

      showFeedback('לא במקום הנכון, אבל אפשר לנסות שוב 🔄', 'error');
      speak('לא במקום הנכון, נסה למקום אחר');
      
      // Add haptic feedback for mobile (shorter for error)
      if (navigator.vibrate) {
        navigator.vibrate([50, 50, 50]); // Three short vibrations for error
      }
    }

    // Check for completion
    const correctPieces = newPlacedPieces.filter(p => p?.isCorrect).length;
    const newScore = calculateFinalScore(correctPieces, state.difficulty, state.timer);
    dispatch({ type: 'SET_SCORE', payload: newScore });

    if (correctPieces === state.difficulty) {
      dispatch({ type: 'SET_COMPLETED', payload: true });
      showFeedback('מדהים! השלמת את הפאזל! 🎊', 'success');
      speak('מדהים! השלמת את הפאזל בהצלחה!');
    }

    return isCorrect;
  }, [state.difficulty, state.pieces, state.placedPieces, state.timer, showFeedback, speak]);

  // Image upload handler
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        initializeGame(img);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, [initializeGame]);

  // Pre-made image selector
  const handlePreMadeImageSelect = useCallback((imageSrc: string) => {
    const img = new Image();
    img.onload = () => {
      initializeGame(img);
    };
    img.src = imageSrc;
  }, [initializeGame]);

  // Shuffle pieces
  const shufflePieces = useCallback(() => {
    const shuffledPieces = [...state.pieces].sort(() => Math.random() - 0.5);
    dispatch({ type: 'SET_PIECES', payload: shuffledPieces });
    speak('החלקים עורבבו');
  }, [state.pieces, speak]);

  // Reset game
  const resetGame = useCallback(() => {
    if (state.selectedPuzzle) {
      initializeSimpleGame(state.selectedPuzzle);
    } else if (state.image) {
      initializeGame(state.image);
    }
    speak('המשחק אופס');
  }, [state.selectedPuzzle, state.image, initializeSimpleGame, initializeGame, speak]);

  // Navigation
  const goHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const goToMenu = useCallback(() => {
    dispatch({ type: 'RESET_TO_MENU' });
  }, []);

  // Drag & Drop handlers
  const handleDragStart = useCallback((e: React.DragEvent, piece: PuzzlePiece) => {
    dispatch({ type: 'SET_DRAGGED_PIECE', payload: piece });
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent, piece: PuzzlePiece) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    dispatch({ type: 'SET_TOUCH_STATE', payload: {
      draggedPiece: piece,
      offset: {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      },
      isDragging: true,
      dragPosition: { x: touch.clientX, y: touch.clientY }
    }});
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!state.touchState.isDragging) return;
    
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    
    // Update drag position
    dispatch({ type: 'SET_TOUCH_STATE', payload: {
      ...state.touchState,
      dragPosition: { x: touch.clientX, y: touch.clientY }
    }});
    
    // Add visual feedback for valid drop zones
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const gridCell = elementBelow?.closest('.puzzle-grid-cell');
    
    // Remove previous highlights
    document.querySelectorAll('.puzzle-grid-cell').forEach(cell => {
      cell.classList.remove('drop-zone-highlight');
    });
    
    // Highlight current valid drop zone
    if (gridCell && gridCell.getAttribute('data-grid-index')) {
      gridCell.classList.add('drop-zone-highlight');
    }
  }, [state.touchState]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!state.touchState.isDragging || !state.touchState.draggedPiece) return;
    
    e.preventDefault();
    e.stopPropagation();
    const touch = e.changedTouches[0];
    
    // Get element at touch position - try multiple points around the touch
    let gridCell = null;
    const searchRadius = 10; // pixels
    
    // First try the exact position
    let elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    if (elementBelow) {
      gridCell = elementBelow.closest('.puzzle-grid-cell');
    }
    
    // If not found, try around the touch point
    if (!gridCell) {
      const positions = [
        [touch.clientX - searchRadius, touch.clientY],
        [touch.clientX + searchRadius, touch.clientY],
        [touch.clientX, touch.clientY - searchRadius],
        [touch.clientX, touch.clientY + searchRadius],
        [touch.clientX - searchRadius, touch.clientY - searchRadius],
        [touch.clientX + searchRadius, touch.clientY + searchRadius],
      ];
      
      for (const [x, y] of positions) {
        elementBelow = document.elementFromPoint(x, y);
        if (elementBelow) {
          gridCell = elementBelow.closest('.puzzle-grid-cell');
          if (gridCell) break;
        }
      }
    }
    
    if (gridCell) {
      const gridIndex = parseInt(gridCell.getAttribute('data-grid-index') || '-1');
      if (gridIndex >= 0) {
        // Debug feedback
        if (state.showDebug) {
          showFeedback(`מנסה לשים חלק ${state.touchState.draggedPiece.id} במקום ${gridIndex}`, 'success');
        }
        
        const success = handleDropLogic(state.touchState.draggedPiece, gridIndex);
        
        if (state.showDebug) {
          showFeedback(success ? '✅ החלק נשם בהצלחה!' : '❌ החלק לא במקום הנכון', success ? 'success' : 'error');
        }
      } else {
        if (state.showDebug) {
          showFeedback('לא נמצא אינדקס grid תקין', 'error');
        }
      }
    } else {
      if (state.showDebug) {
        showFeedback(`לא נמצא grid cell תחת הנקודה ${touch.clientX},${touch.clientY}`, 'error');
      }
    }
    
    // Clean up visual feedback
    document.querySelectorAll('.puzzle-grid-cell').forEach(cell => {
      cell.classList.remove('drop-zone-highlight');
    });
    
    // Reset touch state
    dispatch({ type: 'SET_TOUCH_STATE', payload: initialState.touchState });
  }, [state.touchState, state.showDebug, handleDropLogic, showFeedback]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, gridIndex: number) => {
    e.preventDefault();
    
    if (!state.draggedPiece) return;
    
    handleDropLogic(state.draggedPiece, gridIndex);
    dispatch({ type: 'SET_DRAGGED_PIECE', payload: null });
  }, [state.draggedPiece, handleDropLogic]);

  // UI Toggle functions
  const toggleHints = useCallback(() => {
    dispatch({ type: 'TOGGLE_HINTS' });
    speak(state.showHints ? 'רמזים הוסתרו' : 'רמזים מוצגים');
  }, [dispatch, state.showHints, speak]);

  const toggleDebug = useCallback(() => {
    dispatch({ type: 'TOGGLE_DEBUG' });
    speak(state.showDebug ? 'מצב דיבוג כבוי' : 'מצב דיבוג פועל');
  }, [dispatch, state.showDebug, speak]);

  const toggleHelp = useCallback(() => {
    dispatch({ type: 'TOGGLE_HELP' });
  }, [dispatch]);

  // Difficulty change with restart
  const changeDifficulty = useCallback((newDifficulty: number) => {
    const difficultyName = 
      newDifficulty === 4 ? 'קל' : 
      newDifficulty === 9 ? 'בינוני' : 
      newDifficulty === 16 ? 'קשה' : 'מומחה';
    
    speak(`רמה חדשה נבחרה: ${difficultyName} עם ${newDifficulty} חלקים`);
    
    dispatch({ type: 'SET_DIFFICULTY', payload: newDifficulty });
    
    if (state.image) {
      initializeGame(state.image, newDifficulty);
      speak(`המשחק התחיל מחדש ברמת ${difficultyName}`);
    }
  }, [speak, dispatch, state.image, initializeGame]);

  // Handle puzzle selection for simple puzzles
  const handlePuzzleSelect = useCallback((puzzle: SimplePuzzle) => {
    initializeSimpleGame(puzzle);
  }, [initializeSimpleGame]);

  // Keyboard shortcuts effect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'r':
          if (state.gameStarted) resetGame();
          break;
        case 'h':
          if (event.shiftKey) {
            toggleHints();
          } else {
            toggleHelp();
          }
          break;
        case 'd':
          toggleDebug();
          break;
        case 's':
          if (state.gameStarted) shufflePieces();
          break;
        case 'escape':
          if (state.showHelp) dispatch({ type: 'TOGGLE_HELP' });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.gameStarted, state.showHelp, toggleHints, toggleDebug, toggleHelp, shufflePieces, resetGame, dispatch]);

  const contextValue: PuzzleContextType = {
    state,
    dispatch,
    initializeGame,
    initializeSimpleGame,
    handleDropLogic,
    handleImageUpload,
    handlePreMadeImageSelect,
    shufflePieces,
    resetGame,
    goHome,
    goToMenu,
    toggleHints,
    toggleDebug,
    toggleHelp,
    changeDifficulty,
    handlePuzzleSelect,
    handleDragStart,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDragOver,
    handleDrop,
    showFeedback,
    speak
  };

  return (
    <PuzzleContext.Provider value={contextValue}>
      {children}
    </PuzzleContext.Provider>
  );
}

// Hook to use the puzzle context
export function usePuzzleContext() {
  const context = useContext(PuzzleContext);
  if (context === undefined) {
    throw new Error('usePuzzleContext must be used within a PuzzleProvider');
  }
  return context;
}
