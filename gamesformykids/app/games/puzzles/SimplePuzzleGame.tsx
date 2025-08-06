'use client';

import { useState, useEffect, useCallback } from 'react';
import { Home, Trophy, HelpCircle, X, Mouse, RotateCcw, Eye, Settings } from 'lucide-react';
import Image from 'next/image';
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
  PuzzleStats
} from '@/components/shared/puzzle';

interface SimplePuzzle {
  id: number;
  name: string;
  emoji: string;
  color: string;
  imageUrl: string;
  gridSize: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

// פאזלים פשוטים עם תמונות שמחולקות לחלקים
const SIMPLE_PUZZLES: SimplePuzzle[] = [
  {
    id: 1,
    name: "שועל חמוד עם יו-יו",
    emoji: "🦊",
    color: "#FF8C00",
    imageUrl: "/images/Fox with Yo-Yo.png",
    gridSize: 4, // 2x2
    difficulty: "easy"
  },
  {
    id: 2,
    name: "שועל מגניב",
    emoji: "🦊",
    color: "#FF6347",
    imageUrl: "/images/Cool Fox Character.png",
    gridSize: 4, // 2x2
    difficulty: "easy"
  },
  {
    id: 3,
    name: "חיות חמודות עם קשת בענן",
    emoji: "🌈",
    color: "#FF69B4",
    imageUrl: "/images/Cute Animals with Rainbow.png",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 4,
    name: "חברים יפים ביער",
    emoji: "🌲",
    color: "#32CD32",
    imageUrl: "/images/Happy Forest Friends.png",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 5,
    name: "משחקים בחוץ",
    emoji: "🎈",
    color: "#87CEEB",
    imageUrl: "/images/Playing Outdoors.png",
    gridSize: 16, // 4x4
    difficulty: "hard"
  },
  {
    id: 6,
    name: "נסיכה עם צבי ביער",
    emoji: "👸",
    color: "#DDA0DD",
    imageUrl: "/images/Princess with Deer.png",
    gridSize: 16, // 4x4
    difficulty: "hard"
  },
  {
    id: 7,
    name: "מסיבה ביער",
    emoji: "🎉",
    color: "#FFD700",
    imageUrl: "/images/Forest Party.png",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 8,
    name: "ארץ הפטריות הקסומה",
    emoji: "🍄",
    color: "#FF1493",
    imageUrl: "/images/Magical Mushroom Land.png",
    gridSize: 16, // 4x4
    difficulty: "hard"
  },
  {
    id: 9,
    name: "נסיכה ביער הקסום",
    emoji: "🏰",
    color: "#9370DB",
    imageUrl: "/images/Princess in Magical Forest.png",
    gridSize: 9, // 3x3
    difficulty: "medium"
  }
];

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

  // Initialize game with selected puzzle
  const initializeGame = useCallback((puzzle: SimplePuzzle) => {
    // Initializing game
    
    const img = document.createElement('img') as HTMLImageElement;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Image loaded, creating pieces...
      
      const newPieces = createPuzzlePieces(img, puzzle.gridSize, 'simple');
      
      // Created pieces successfully
      
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
    // Dragging piece
  };

  // Touch handlers for mobile support
  const handleTouchStart = (e: React.TouchEvent, piece: PuzzlePiece) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch) return;
    
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
    // Touch dragging piece
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchState.isDragging || !touchState.draggedPiece) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    if (!touch) return;
    
    setTouchState(prev => ({
      ...prev,
      dragPosition: { x: touch.clientX, y: touch.clientY }
    }));
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchState.isDragging || !touchState.draggedPiece || !selectedPuzzle) {
      setTouchState({ draggedPiece: null, offset: { x: 0, y: 0 }, isDragging: false, dragPosition: { x: 0, y: 0 } });
      return;
    }
    
    e.preventDefault();
    const touch = e.changedTouches[0];
    if (!touch) return;
    
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
    if (!selectedPuzzle) return;
    
    const gridSide = Math.sqrt(selectedPuzzle.gridSize);
    const row = Math.floor(gridIndex / gridSide);
    const col = gridIndex % gridSide;
    
    // Drop attempt processing
    
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
        prevPieces.map(p => {
          if (p.id === existingPiece.id) {
            const updated = { ...p, isPlaced: false, isCorrect: false };
            delete updated.currentPosition;
            return updated;
          }
          return p;
        })
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
  };

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
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              חזרה לבית
            </button>
            
            <h1 className="text-4xl font-bold text-gray-800">🧩 פאזלים פשוטים</h1>
            
            <button
              onClick={toggleHelp}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              עזרה
            </button>
          </div>
          <p className="text-lg text-gray-600">בחר פאזל ותתחיל לשחק!</p>
        </div>

        {/* Puzzle Selection */}
        {!selectedPuzzle && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {SIMPLE_PUZZLES.map((puzzle) => (
              <div
                key={puzzle.id}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
                style={{ borderTop: `6px solid ${puzzle.color}` }}
                onClick={() => handlePuzzleSelect(puzzle)}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{puzzle.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {puzzle.name}
                  </h3>
                  <div className="flex justify-center items-center gap-2 mb-4">
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {Math.sqrt(puzzle.gridSize)}x{Math.sqrt(puzzle.gridSize)}
                    </span>
                    <span className={`text-sm px-3 py-1 rounded-full text-white ${
                      puzzle.difficulty === 'easy' ? 'bg-green-500' :
                      puzzle.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {puzzle.difficulty === 'easy' ? 'קל' :
                       puzzle.difficulty === 'medium' ? 'בינוני' : 'קשה'}
                    </span>
                  </div>
                  <Image
                    src={puzzle.imageUrl}
                    alt={puzzle.name}
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                    unoptimized
                  />
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors">
                    התחל לשחק
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={toggleHelp}>
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">איך לשחק?</h3>
                <button
                  onClick={toggleHelp}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-3 text-right">
                <div className="flex items-center gap-2">
                  <Mouse className="w-5 h-5 text-blue-500" />
                  <span>גרור חלקים לכיוונים הנכונים</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-green-500" />
                  <span>לחץ על R להתחלה מחדש</span>
                </div>
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-500" />
                  <span>לחץ על H לעזרה</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-orange-500" />
                  <span>לחץ על Shift+H לרמזים</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span>לחץ על D למצב ניפוי באגים</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Controls */}
        {selectedPuzzle && (
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={goHome}
              className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              בחר פאזל אחר
            </button>
            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              disabled={!gameStarted}
            >
              <RotateCcw className="w-4 h-4" />
              התחל מחדש
            </button>
            
            <button
              onClick={toggleHints}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                hintsEnabled 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
              }`}
            >
              <Eye className="w-4 h-4" />
              רמזים {hintsEnabled ? 'פעיל' : 'כבוי'}
            </button>
            
            <button
              onClick={toggleDebug}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                debugMode 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
              }`}
            >
              <Settings className="w-4 h-4" />
              ניפוי באגים {debugMode ? 'פעיל' : 'כבוי'}
            </button>
          </div>
        )}

        {/* Game Controls */}
        {selectedPuzzle && (
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={goHome}
              className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              בחר פאזל אחר
            </button>
            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              disabled={!gameStarted}
            >
              <Trophy className="w-4 h-4" />
              התחל מחדש
            </button>
          </div>
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
                onTouchEnd={handleTouchEnd}
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
                onTouchEnd={handleTouchEnd}
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
        {touchState.isDragging && touchState.draggedPiece && (
          <div
            className="fixed pointer-events-none z-50 opacity-80 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: touchState.dragPosition.x,
              top: touchState.dragPosition.y,
            }}
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden shadow-2xl border-4 border-blue-400 animate-pulse">
              <Image
                src={touchState.draggedPiece.canvas.toDataURL()}
                alt={`Dragging piece ${touchState.draggedPiece.id}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
