'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  createPuzzlePieces, 
  isPieceInCorrectPosition, 
  calculateFinalScore,
  type PuzzlePiece 
} from '@/lib/utils/puzzleUtils';
import { usePuzzleFeedback } from '@/hooks/games/usePuzzleFeedback';
import { 
  FeedbackMessage,
  PuzzleGrid,
  PiecesPool,
  PuzzleStats,
  PuzzleSelector,
  SimplePuzzleControls,
  SimplePuzzleHeader,
  SimplePuzzleHelpModal,
  FloatingDragPiece,
  useTouchHandlers
} from '@/components/shared/puzzle';
import { SIMPLE_PUZZLES, type SimplePuzzle } from '@/lib/constants/simplePuzzlesData';

export default function SimplePuzzleGame() {
  const [selectedPuzzle, setSelectedPuzzle] = useState<SimplePuzzle | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [placedPieces, setPlacedPieces] = useState<(PuzzlePiece | null)[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<PuzzlePiece | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [hintsEnabled, setHintsEnabled] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  // Touch handlers
  const { touchState, handleTouchStart, handleTouchMove, createTouchEndHandler } = useTouchHandlers(setDraggedPiece);

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

  // Initialize game with selected puzzle
  const initializeGame = useCallback((puzzle: SimplePuzzle) => {
    console.log('🎮 SimplePuzzle - Initializing game with:', puzzle.name);
    
    const img = document.createElement('img') as HTMLImageElement;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      console.log('🖼️ SimplePuzzle - Image loaded, creating pieces...');
      
      const newPieces = createPuzzlePieces(img, puzzle.gridSize, 'simple');
      
      console.log('🎮 SimplePuzzle - Created pieces:', newPieces.map(p => ({
        id: p.id,
        expectedPos: `(${p.expectedPosition.row}, ${p.expectedPosition.col})`,
        isPlaced: p.isPlaced,
        isCorrect: p.isCorrect
      })));
      
      setPieces(newPieces);
      setPlacedPieces(new Array(puzzle.gridSize).fill(null));
      setGameStarted(true);
      setIsCompleted(false);
      setTimer(0);
      setScore(0);
      setImageLoaded(true);
      
      speak(`התחיל משחק ${puzzle.name}! בואו נתחיל לשחק`);
    };
    
    img.onerror = () => {
      console.error('🚨 SimplePuzzle - Failed to load image:', puzzle.imageUrl);
      showFeedback('שגיאה בטעינת התמונה', 'error');
    };
    
    img.src = puzzle.imageUrl;
  }, [showFeedback, speak]);

  // Handle puzzle selection
  const handlePuzzleSelect = (puzzle: SimplePuzzle) => {
    setSelectedPuzzle(puzzle);
    setImageLoaded(false);
    initializeGame(puzzle);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, piece: PuzzlePiece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
    console.log('🎯 SimplePuzzle - Dragging piece:', piece.id, 'expected at:', piece.expectedPosition);
  };

  // Drop logic function to be used by both drag/drop and touch handlers
  const handleDropLogic = useCallback((piece: PuzzlePiece, gridIndex: number) => {
    if (!selectedPuzzle) return;
    
    const gridSide = Math.sqrt(selectedPuzzle.gridSize);
    const row = Math.floor(gridIndex / gridSide);
    const col = gridIndex % gridSide;
    
    console.log('🎯 SimplePuzzle - Drop attempt:', {
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

    // Check if there's already a piece at the target position
    const existingPiece = newPlacedPieces[gridIndex];
    if (existingPiece) {
      // If there's a piece there, return it to the pool by marking it as not placed
      setPieces(prevPieces => 
        prevPieces.map(p => 
          p.id === existingPiece.id ? { ...p, isPlaced: false, isCorrect: false, currentPosition: undefined } : p
        )
      );
    }

    // Remove any piece that might be at the target position
    newPlacedPieces[gridIndex] = null;

    // Check if placement is correct
    const isCorrect = isPieceInCorrectPosition(piece, row, col);
    
    if (isCorrect) {
      // Only place on grid if correct
      const updatedPiece: PuzzlePiece = {
        ...piece,
        currentPosition: { row, col },
        isPlaced: true,
        isCorrect: true
      };

      // Place the updated piece on the grid
      newPlacedPieces[gridIndex] = updatedPiece;
      setPlacedPieces(newPlacedPieces);

      // Update pieces array - mark as correctly placed
      setPieces(prevPieces => 
        prevPieces.map(p => 
          p.id === piece.id ? updatedPiece : p
        )
      );

      showFeedback('כל הכבוד! החלק במקום הנכון! 🎉', 'success');
      speak('כל הכבוד! החלק במקום הנכון!');
    } else {
      // Place piece on grid even if incorrect, but mark as incorrect and draggable
      const updatedPiece: PuzzlePiece = {
        ...piece,
        currentPosition: { row, col },
        isPlaced: true,
        isCorrect: false
      };

      // Place the piece on the grid
      newPlacedPieces[gridIndex] = updatedPiece;
      setPlacedPieces(newPlacedPieces);
      
      // Update pieces array - mark as incorrectly placed (still draggable)
      setPieces(prevPieces => 
        prevPieces.map(p => 
          p.id === piece.id ? updatedPiece : p
        )
      );

      showFeedback('לא במקום הנכון, אבל אפשר לנסות שוב 🔄', 'error');
      speak('לא במקום הנכון, נסה למקום אחר');
    }

    // Check for completion
    const correctPieces = newPlacedPieces.filter(p => p?.isCorrect).length;
    const newScore = calculateFinalScore(correctPieces, selectedPuzzle.gridSize, timer);
    setScore(newScore);

    if (correctPieces === selectedPuzzle.gridSize) {
      setIsCompleted(true);
      showFeedback('מדהים! השלמת את הפאזל! 🎊', 'success');
      speak('מדהים! השלמת את הפאזל בהצלחה!');
    }
  }, [selectedPuzzle, placedPieces, setPieces, setPlacedPieces, setScore, setIsCompleted, showFeedback, speak, timer]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, gridIndex: number) => {
    e.preventDefault();
    
    if (!draggedPiece || !selectedPuzzle) return;
    
    handleDropLogic(draggedPiece, gridIndex);
    setDraggedPiece(null);
  };

  // Wrapping touch end to use our drop logic
  const handleTouchEndWithDrop = createTouchEndHandler(handleDropLogic);

  // Reset current game
  const resetGame = useCallback(() => {
    if (selectedPuzzle) {
      initializeGame(selectedPuzzle);
    }
  }, [selectedPuzzle, initializeGame]);

  // Go back to puzzle selection
  const goHome = () => {
    setSelectedPuzzle(null);
    setGameStarted(false);
    setImageLoaded(false);
    setPieces([]);
    setPlacedPieces([]);
    setTimer(0);
    setScore(0);
    setIsCompleted(false);
  };

  // Toggle help and UI functions
  const toggleHelp = useCallback(() => {
    setShowHelp(prev => !prev);
  }, []);
  
  const toggleHints = useCallback(() => {
    setHintsEnabled(prev => !prev);
  }, []);
  
  const toggleDebug = useCallback(() => {
    setDebugMode(prev => !prev);
  }, []);

  // Calculate current stats

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'r':
          if (selectedPuzzle) resetGame();
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
        case 'escape':
          if (showHelp) setShowHelp(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPuzzle, showHelp, toggleHelp, toggleHints, toggleDebug, resetGame]);

  const correctPieces = placedPieces.filter(piece => piece?.isCorrect).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SimplePuzzleHeader
          onGoHome={() => window.history.back()}
          onToggleHelp={toggleHelp}
        />

        {/* Puzzle Selection */}
        {!selectedPuzzle && (
          <PuzzleSelector
            puzzles={SIMPLE_PUZZLES}
            onPuzzleSelect={handlePuzzleSelect}
          />
        )}

        {/* Help Modal */}
        <SimplePuzzleHelpModal
          showHelp={showHelp}
          onToggleHelp={toggleHelp}
        />

        {/* Game Controls */}
        {selectedPuzzle && (
          <SimplePuzzleControls
            gameStarted={gameStarted}
            hintsEnabled={hintsEnabled}
            debugMode={debugMode}
            onGoHome={goHome}
            onResetGame={resetGame}
            onToggleHints={toggleHints}
            onToggleDebug={toggleDebug}
          />
        )}

        {/* Feedback Message */}
        <FeedbackMessage message={feedbackMessage} type={feedbackType} />

        {/* Game Area */}
        {gameStarted && selectedPuzzle && imageLoaded && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Panel */}
            <div className="lg:col-span-1">
              <PuzzleStats
                correctPieces={correctPieces}
                totalPieces={selectedPuzzle.gridSize}
                timeElapsed={timer}
                score={score}
                isComplete={isCompleted}
                className="mb-6"
              />
              
              {/* Pieces Pool */}
              <PiecesPool
                pieces={pieces}
                onDragStart={handleDragStart}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEndWithDrop}
                title="🧩 חלקי הפאזל"
              />
            </div>

            {/* Game Grid */}
            <div className="lg:col-span-2">
              <PuzzleGrid
                gridSize={selectedPuzzle.gridSize}
                pieces={placedPieces}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEndWithDrop}
                title={`🎯 ${selectedPuzzle.name}`}
                showPositionNumbers={hintsEnabled}
                showDebugInfo={debugMode}
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {selectedPuzzle && !imageLoaded && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">טוען את הפאזל...</p>
          </div>
        )}

        {/* Floating Dragged Piece */}
        <FloatingDragPiece
          isDragging={touchState.isDragging}
          draggedPiece={touchState.draggedPiece}
          dragPosition={touchState.dragPosition}
        />
      </div>
    </div>
  );
}
