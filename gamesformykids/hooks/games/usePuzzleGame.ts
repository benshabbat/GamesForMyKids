import { useState, useEffect, useCallback } from 'react';
import { 
  createPuzzlePieces, 
  isPieceInCorrectPosition, 
  calculateFinalScore,
  type PuzzlePiece 
} from '@/lib/utils/puzzleUtils';
import { usePuzzleFeedback } from './usePuzzleFeedback';

export interface UsePuzzleGameOptions {
  gridSize: number;
  gameType?: 'simple' | 'custom';
}

export function usePuzzleGame({ gridSize, gameType = 'simple' }: UsePuzzleGameOptions) {
  // State
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [placedPieces, setPlacedPieces] = useState<(PuzzlePiece | null)[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<PuzzlePiece | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hintsEnabled, setHintsEnabled] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  
  // Touch state for mobile support
  const [touchState, setTouchState] = useState<{
    draggedPiece: PuzzlePiece | null;
    offset: { x: number; y: number };
    isDragging: boolean;
    dragPosition: { x: number; y: number };
  }>({
    draggedPiece: null,
    offset: { x: 0, y: 0 },
    isDragging: false,
    dragPosition: { x: 0, y: 0 }
  });

  // Use the shared feedback hook
  const { feedbackMessage, feedbackType, showFeedback, speak } = usePuzzleFeedback();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !isCompleted) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, isCompleted]);

  // Initialize game with image
  const initializeGame = useCallback((img: HTMLImageElement) => {
    console.log(`🎮 ${gameType}Puzzle - Initializing game with gridSize:`, gridSize);
    
    const newPieces = createPuzzlePieces(img, gridSize, gameType);
    
    console.log(`🎮 ${gameType}Puzzle - Created pieces:`, newPieces.map(p => ({
      id: p.id,
      expectedPos: `(${p.expectedPosition.row}, ${p.expectedPosition.col})`,
      isPlaced: p.isPlaced,
      isCorrect: p.isCorrect
    })));
    
    setPieces(newPieces);
    setPlacedPieces(new Array(gridSize).fill(null));
    setGameStarted(true);
    setIsCompleted(false);
    setTimer(0);
    setScore(0);
    setImageLoaded(true);
    
    speak(`התחיל משחק פאזל חדש! בואו נתחיל לשחק`);
  }, [gridSize, gameType, speak]);

  // Drop logic (shared between drag and touch)
  const handleDropLogic = useCallback((piece: PuzzlePiece, gridIndex: number) => {
    const gridSide = Math.sqrt(gridSize);
    const row = Math.floor(gridIndex / gridSide);
    const col = gridIndex % gridSide;
    
    console.log(`🎯 ${gameType}Puzzle - Drop attempt:`, {
      pieceId: piece.id,
      droppedAt: `(${row}, ${col})`,
      expectedAt: `(${piece.expectedPosition.row}, ${piece.expectedPosition.col})`,
      gridIndex
    });

    // Remove piece from current position if it's already placed
    const newPlacedPieces = [...placedPieces];
    const currentIndex = newPlacedPieces.findIndex(p => p?.id === piece.id);
    if (currentIndex !== -1) {
      newPlacedPieces[currentIndex] = null;
    }

    // Remove any piece that might be at the target position
    newPlacedPieces[gridIndex] = null;

    // Check if placement is correct
    const isCorrect = isPieceInCorrectPosition(piece, row, col);
    
    // Update piece properties
    const updatedPiece: PuzzlePiece = {
      ...piece,
      currentPosition: { row, col },
      isPlaced: true,
      isCorrect
    };

    console.log(`🔍 ${gameType}Puzzle - Updated piece:`, {
      id: updatedPiece.id,
      currentPos: `(${row}, ${col})`,
      expectedPos: `(${updatedPiece.expectedPosition.row}, ${updatedPiece.expectedPosition.col})`,
      isCorrect,
      isPlaced: true
    });

    // Place the updated piece
    newPlacedPieces[gridIndex] = updatedPiece;
    setPlacedPieces(newPlacedPieces);

    // Update pieces array - mark as placed/not placed correctly
    setPieces(prevPieces => 
      prevPieces.map(p => 
        p.id === piece.id ? { ...updatedPiece, isPlaced: isCorrect } : p
      )
    );

    // Provide feedback
    if (isCorrect) {
      showFeedback('כל הכבוד! החלק במקום הנכון! 🎉', 'success');
      speak('כל הכבוד! החלק במקום הנכון!');
    } else {
      showFeedback('לא במקום הנכון, נסה שוב 🤔', 'error');
      speak('לא במקום הנכון, נסה שוב');
    }

    // Check for completion
    const correctPieces = newPlacedPieces.filter(p => p?.isCorrect).length;
    const newScore = calculateFinalScore(correctPieces, gridSize, timer);
    setScore(newScore);

    if (correctPieces === gridSize) {
      setIsCompleted(true);
      showFeedback('מדהים! השלמת את הפאזל! 🎊', 'success');
      speak('מדהים! השלמת את הפאזל בהצלחה!');
    }
  }, [gridSize, gameType, placedPieces, timer, showFeedback, speak]);

  // Drag and drop handlers
  const handleDragStart = useCallback((e: React.DragEvent, piece: PuzzlePiece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
    console.log(`🎯 ${gameType}Puzzle - Dragging piece:`, piece.id, 'expected at:', piece.expectedPosition);
  }, [gameType]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, gridIndex: number) => {
    e.preventDefault();
    
    if (!draggedPiece) return;
    
    handleDropLogic(draggedPiece, gridIndex);
    setDraggedPiece(null);
  }, [draggedPiece, handleDropLogic]);

  // Touch handlers for mobile support
  const handleTouchStart = useCallback((e: React.TouchEvent, piece: PuzzlePiece) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    setTouchState({
      draggedPiece: piece,
      offset: {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      },
      isDragging: true,
      dragPosition: { x: touch.clientX, y: touch.clientY }
    });
    
    setDraggedPiece(piece);
    console.log(`🎯 ${gameType}Puzzle - Touch dragging piece:`, piece.id);
  }, [gameType]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchState.isDragging || !touchState.draggedPiece) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    setTouchState(prev => ({
      ...prev,
      dragPosition: { x: touch.clientX, y: touch.clientY }
    }));
  }, [touchState.isDragging, touchState.draggedPiece]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchState.isDragging || !touchState.draggedPiece) {
      setTouchState({ draggedPiece: null, offset: { x: 0, y: 0 }, isDragging: false, dragPosition: { x: 0, y: 0 } });
      return;
    }
    
    e.preventDefault();
    const touch = e.changedTouches[0];
    
    // Find the drop target
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropTarget = elementBelow?.closest('[data-grid-index]');
    
    if (dropTarget) {
      const gridIndex = parseInt(dropTarget.getAttribute('data-grid-index') || '0');
      handleDropLogic(touchState.draggedPiece, gridIndex);
    }
    
    setTouchState({ draggedPiece: null, offset: { x: 0, y: 0 }, isDragging: false, dragPosition: { x: 0, y: 0 } });
    setDraggedPiece(null);
  }, [touchState.isDragging, touchState.draggedPiece, handleDropLogic]);

  // Reset current game
  const resetGame = useCallback((img?: HTMLImageElement) => {
    if (img) {
      initializeGame(img);
    }
  }, [initializeGame]);

  // Toggle functions
  const toggleHints = useCallback(() => {
    setHintsEnabled(prev => !prev);
  }, []);
  
  const toggleDebug = useCallback(() => {
    setDebugMode(prev => !prev);
  }, []);

  // Calculate current stats
  const correctPieces = placedPieces.filter(p => p?.isCorrect).length;

  return {
    // State
    pieces,
    placedPieces,
    draggedPiece,
    gameStarted,
    isCompleted,
    timer,
    score,
    imageLoaded,
    hintsEnabled,
    debugMode,
    touchState,
    correctPieces,
    
    // Feedback
    feedbackMessage,
    feedbackType,
    showFeedback,
    speak,
    
    // Actions
    initializeGame,
    resetGame,
    toggleHints,
    toggleDebug,
    setImageLoaded,
    
    // Drag & Drop handlers
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDropLogic
  };
}
