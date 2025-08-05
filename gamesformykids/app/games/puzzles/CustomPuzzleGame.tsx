'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  PuzzleHeader,
  ImageUploadSection,
  GameControls,
  ReferenceImage,
  HelpModal,
  FloatingDragPiece
} from '@/components/shared/puzzle';

export default function CustomPuzzleGame() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [placedPieces, setPlacedPieces] = useState<(PuzzlePiece | null)[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<PuzzlePiece | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [difficulty, setDifficulty] = useState(9);
  const [score, setScore] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
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
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = document.createElement('img') as HTMLImageElement;
      img.onload = () => {
        setImage(img);
        initializeGame(img);
      };
      img.src = URL.createObjectURL(file);
    }
  };

  // Handle pre-made image selection
  const handlePreMadeImageSelect = (imageSrc: string) => {
    const img = document.createElement('img') as HTMLImageElement;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImage(img);
      initializeGame(img);
      speak('תמונה נבחרה! הפאזל מוכן');
    };
    img.onerror = () => {
      console.error('Failed to load pre-made image:', imageSrc);
      showFeedback('שגיאה בטעינת התמונה', 'error');
    };
    img.src = imageSrc;
  };

  // Initialize game with image
  const initializeGame = useCallback((img: HTMLImageElement) => {
    const newPieces = createPuzzlePieces(img, difficulty);
    
    // Debug: Log created pieces
    console.log('🎮 CustomPuzzle - Created pieces:', newPieces.map(p => ({
      id: p.id,
      expectedPos: `(${p.expectedPosition.row}, ${p.expectedPosition.col})`,
      isPlaced: p.isPlaced,
      isCorrect: p.isCorrect
    })));
    
    setPieces(newPieces);
    setPlacedPieces(new Array(difficulty).fill(null));
    setGameStarted(true);
    setIsCompleted(false);
    setTimer(0);
    setScore(0);
    speak('הפאזל החדש מוכן! בואו נתחיל לשחק');
  }, [difficulty, speak]);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, piece: PuzzlePiece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
    console.log('🎯 CustomPuzzle - Dragging piece:', piece.id, 'expected at:', piece.expectedPosition);
  };

  // Touch handlers for mobile support
  const handleTouchStart = (e: React.TouchEvent, piece: PuzzlePiece) => {
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
    console.log('🎯 CustomPuzzle - Touch dragging piece:', piece.id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchState.isDragging || !touchState.draggedPiece) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    setTouchState(prev => ({
      ...prev,
      dragPosition: { x: touch.clientX, y: touch.clientY }
    }));
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
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
  };

  const handleDropLogic = (piece: PuzzlePiece, gridIndex: number) => {
    const gridSide = Math.sqrt(difficulty);
    const row = Math.floor(gridIndex / gridSide);
    const col = gridIndex % gridSide;
    
    console.log('🎯 CustomPuzzle - Drop attempt:', {
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
    const newScore = calculateFinalScore(correctPieces, difficulty, timer);
    setScore(newScore);

    if (correctPieces === difficulty) {
      setIsCompleted(true);
      showFeedback('מדהים! השלמת את הפאזל! 🎊', 'success');
      speak('מדהים! השלמת את הפאזל בהצלחה!');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, gridIndex: number) => {
    e.preventDefault();
    
    if (!draggedPiece) return;
    
    handleDropLogic(draggedPiece, gridIndex);
    setDraggedPiece(null);
  };

  // Shuffle pieces
  const shufflePieces = useCallback(() => {
    setPieces(prevPieces => [...prevPieces].sort(() => Math.random() - 0.5));
    speak('החלקים עורבבו');
  }, [speak]);

  // Reset game
  const resetGame = useCallback(() => {
    if (image) {
      initializeGame(image);
      speak('המשחק אופס');
    }
  }, [image, initializeGame, speak]);

  // Go back to home/games selection
  const goHome = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }, []);

  // Handle difficulty change
  const handleDifficultyChange = useCallback((newDifficulty: number) => {
    setDifficulty(newDifficulty);
    const difficultyName = 
      newDifficulty === 4 ? 'קל' : 
      newDifficulty === 9 ? 'בינוני' : 
      newDifficulty === 16 ? 'קשה' : 'מומחה';
    
    speak(`רמה חדשה נבחרה: ${difficultyName} עם ${newDifficulty} חלקים`);
    
    // If we have an image, restart/start game with new difficulty
    if (image) {
      // Call initializeGame directly with the new difficulty
      const newPieces = createPuzzlePieces(image, newDifficulty);
      setPieces(newPieces);
      setPlacedPieces(new Array(newDifficulty).fill(null));
      setGameStarted(true);
      setIsCompleted(false);
      setTimer(0);
      setScore(0);
      speak(`המשחק התחיל מחדש ברמת ${difficultyName}`);
    } else {
      // Visual feedback when no image is loaded
      showFeedback(`רמת קושי שונתה ל${difficultyName} - ${newDifficulty} חלקים`, 'success');
    }
  }, [image, speak, showFeedback]);

  // Toggle functions
  const toggleHints = useCallback(() => {
    setShowHints(prev => {
      const newValue = !prev;
      speak(newValue ? 'רמזים מוצגים' : 'רמזים הוסתרו');
      return newValue;
    });
  }, [speak]);

  const toggleDebug = useCallback(() => {
    setShowDebug(prev => {
      const newValue = !prev;
      speak(newValue ? 'מצב דיבוג פועל' : 'מצב דיבוג כבוי');
      return newValue;
    });
  }, [speak]);

  const toggleHelp = useCallback(() => {
    setShowHelp(prev => !prev);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) return; // Skip if Ctrl/Cmd is pressed
      
      switch (e.key.toLowerCase()) {
        case 'h':
          if (gameStarted) toggleHints();
          break;
        case 'd':
          toggleDebug();
          break;
        case 's':
          if (gameStarted) shufflePieces();
          break;
        case 'r':
          if (gameStarted) resetGame();
          break;
        case 'escape':
          if (showHelp) toggleHelp();
          break;
        case '?':
          toggleHelp();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, showHelp, toggleDebug, toggleHelp, toggleHints, shufflePieces, resetGame]);

  // Calculate current stats
  const correctPieces = placedPieces.filter(p => p?.isCorrect).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <PuzzleHeader onGoHome={goHome} onToggleHelp={toggleHelp} />

        {/* Upload Section */}
        {!image && (
          <ImageUploadSection 
            difficulty={difficulty}
            fileInputRef={fileInputRef}
            onImageUpload={handleImageUpload}
            onPreMadeImageSelect={handlePreMadeImageSelect}
            onDifficultyChange={handleDifficultyChange}
          />
        )}

        {/* Game Controls */}
        {image && (
          <GameControls 
            gameStarted={gameStarted}
            showHints={showHints}
            showDebug={showDebug}
            difficulty={difficulty}
            fileInputRef={fileInputRef}
            onShufflePieces={shufflePieces}
            onResetGame={resetGame}
            onToggleHints={toggleHints}
            onToggleDebug={toggleDebug}
            onDifficultyChange={handleDifficultyChange}
          />
        )}

        {/* Feedback Message */}
        <FeedbackMessage message={feedbackMessage} type={feedbackType} />

        {/* Help Modal */}
        <HelpModal showHelp={showHelp} onToggleHelp={toggleHelp} />

        {/* Game Area */}
        {gameStarted && (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Game Grid - On mobile, this comes first */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <PuzzleGrid
                gridSize={difficulty}
                pieces={placedPieces}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                title="🎯 לוח הפאזל"
                showPositionNumbers={showHints}
                showDebugInfo={showDebug}
              />
            </div>

            {/* Stats Panel and Pieces Pool - Combined on mobile */}
            <div className="lg:col-span-1 order-2 lg:order-1 space-y-4 lg:space-y-6">
              {/* Reference Image - Responsive design */}
              {image && <ReferenceImage image={image} />}
              
              <PuzzleStats
                correctPieces={correctPieces}
                totalPieces={difficulty}
                timeElapsed={timer}
                score={score}
                isComplete={isCompleted}
              />
              
              {/* Pieces Pool */}
              <PiecesPool
                pieces={pieces}
                onDragStart={handleDragStart}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                title="🧩 חלקי הפאזל"
              />
            </div>
          </div>
        )}

        {/* Hidden elements */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="hidden"
        />
        <canvas ref={canvasRef} className="hidden" />

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
