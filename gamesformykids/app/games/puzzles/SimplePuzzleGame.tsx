'use client';

import { useState, useEffect, useCallback } from 'react';
import { Home, HelpCircle, RotateCcw, Eye, Settings } from 'lucide-react';
import Image from 'next/image';
import { usePuzzleGame } from '@/hooks/games/usePuzzleGame';
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
    name: "פאזל חתול חמוד",
    emoji: "🐱",
    color: "#FF69B4",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&crop=face",
    gridSize: 4, // 2x2
    difficulty: "easy"
  },
  {
    id: 2,
    name: "פאזל כלב יפה",
    emoji: "🐶",
    color: "#4169E1",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face",
    gridSize: 4, // 2x2
    difficulty: "easy"
  },
  {
    id: 3,
    name: "פאזל ברווז צהוב",
    emoji: "🦆",
    color: "#FFD700",
    imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 4,
    name: "פאזל כבשה רכה",
    emoji: "🐑",
    color: "#F0F8FF",
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 5,
    name: "פאזל חזיר ורוד",
    emoji: "🐷",
    color: "#FFC0CB",
    imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=400&fit=crop",
    gridSize: 16, // 4x4
    difficulty: "hard"
  },
  {
    id: 6,
    name: "פאזל שור חזק",
    emoji: "🐄",
    color: "#8B4513",
    imageUrl: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=400&fit=crop",
    gridSize: 16, // 4x4
    difficulty: "hard"
  }
];

export default function SimplePuzzleGame() {
  const [selectedPuzzle, setSelectedPuzzle] = useState<SimplePuzzle | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  // Use the shared puzzle game logic
  const puzzleGame = usePuzzleGame({
    gridSize: selectedPuzzle?.gridSize || 4,
    gameType: 'simple'
  });

  // Initialize game with selected puzzle
  const initializeGame = useCallback((puzzle: SimplePuzzle) => {
    console.log('🎮 SimplePuzzle - Initializing game with:', puzzle.name);
    
    const img = document.createElement('img') as HTMLImageElement;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      console.log('🖼️ SimplePuzzle - Image loaded, creating pieces...');
      puzzleGame.initializeGame(img);
      puzzleGame.speak(`התחיל משחק ${puzzle.name}! בואו נתחיל לשחק`);
    };
    
    img.onerror = () => {
      console.error('🚨 SimplePuzzle - Failed to load image:', puzzle.imageUrl);
      puzzleGame.showFeedback('שגיאה בטעינת התמונה', 'error');
    };
    
    img.src = puzzle.imageUrl;
  }, [puzzleGame]);

  // Handle puzzle selection
  const handlePuzzleSelect = (puzzle: SimplePuzzle) => {
    setSelectedPuzzle(puzzle);
    puzzleGame.setImageLoaded(false);
    initializeGame(puzzle);
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
    // Reset all game state through the hook
    // The hook will handle this internally
  };

  // Toggle help
  const toggleHelp = useCallback(() => {
    setShowHelp(prev => !prev);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'r':
          if (selectedPuzzle) resetGame();
          break;
        case 'h':
          if (event.shiftKey) {
            puzzleGame.toggleHints();
          } else {
            toggleHelp();
          }
          break;
        case 'd':
          puzzleGame.toggleDebug();
          break;
        case 'escape':
          if (showHelp) setShowHelp(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPuzzle, showHelp, resetGame, toggleHelp, puzzleGame]);

  // If no puzzle selected, show puzzle selection screen
  if (!selectedPuzzle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-200 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-purple-800 mb-4">
              🧩 פאזלים פשוטים 🎨
            </h1>
            <p className="text-xl text-purple-600">
              בחר פאזל כדי להתחיל לשחק!
            </p>
            <p className="text-sm text-purple-500 mt-2">
              💡 על מכשירים ניידים: געו וגררו את החלקים למקומם
            </p>
          </div>

          {/* Puzzle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {SIMPLE_PUZZLES.map((puzzle) => (
              <div
                key={puzzle.id}
                onClick={() => handlePuzzleSelect(puzzle)}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: puzzle.color + '20' }}
                  >
                    <span className="text-3xl">{puzzle.emoji}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {puzzle.name}
                  </h3>
                  <div 
                    className="px-3 py-1 rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: puzzle.color }}
                  >
                    {puzzle.difficulty === 'easy' && 'קל'}
                    {puzzle.difficulty === 'medium' && 'בינוני'}
                    {puzzle.difficulty === 'hard' && 'קשה'}
                    {' - '}
                    {Math.sqrt(puzzle.gridSize)}x{Math.sqrt(puzzle.gridSize)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => window.location.href = '/games/puzzles'}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-purple-700 mx-auto"
            >
              <Home className="w-5 h-5" />
              חזרה לתפריט הפאזלים
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If puzzle selected, show game interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goHome}
              className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              בחר פאזל אחר
            </button>
            
            <h1 className="text-3xl font-bold text-gray-800">
              {selectedPuzzle.emoji} {selectedPuzzle.name}
            </h1>
            
            <button
              onClick={toggleHelp}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              עזרה
            </button>
          </div>
        </div>

        {/* Game Controls */}
        {puzzleGame.gameStarted && (
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              disabled={!puzzleGame.gameStarted}
            >
              <RotateCcw className="w-4 h-4" />
              התחל מחדש
            </button>
            
            <button
              onClick={puzzleGame.toggleHints}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                puzzleGame.hintsEnabled 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
              }`}
            >
              <Eye className="w-4 h-4" />
              רמזים {puzzleGame.hintsEnabled ? 'פעיל' : 'כבוי'}
            </button>
            
            <button
              onClick={puzzleGame.toggleDebug}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                puzzleGame.debugMode 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
              }`}
            >
              <Settings className="w-4 h-4" />
              ניפוי באגים {puzzleGame.debugMode ? 'פעיל' : 'כבוי'}
            </button>
          </div>
        )}

        {/* Feedback Message */}
        <FeedbackMessage message={puzzleGame.feedbackMessage} type={puzzleGame.feedbackType} />

        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">🧩 איך לשחק?</h2>
                <button 
                  onClick={toggleHelp}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4 text-right">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">🎯 המטרה:</h3>
                  <p className="text-blue-700">
                    סדר את החלקים במקום הנכון כדי להשלים את התמונה!
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">🎮 איך לשחק:</h3>
                  <ul className="list-disc list-inside space-y-2 text-green-700">
                    <li>גרור חלקים מהצד השמאלי ללוח הפאזל</li>
                    <li>חלקים נכונים יופיעו עם מסגרת ירוקה וכוכב</li>
                    <li>חלקים שגויים יופיעו עם מסגרת אדומה</li>
                    <li>ניתן לגרור חלקים גם מהלוח אם הם לא במקום הנכון</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-purple-800 mb-2">⌨️ קיצורי מקלדת:</h3>
                  <ul className="list-disc list-inside space-y-2 text-purple-700">
                    <li><strong>R:</strong> התחל מחדש</li>
                    <li><strong>H:</strong> הצג/הסתר עזרה</li>
                    <li><strong>Shift+H:</strong> הפעל/כבה רמזים</li>
                    <li><strong>D:</strong> מצב ניפוי באגים</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button 
                  onClick={toggleHelp}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  סגירה
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Area */}
        {puzzleGame.gameStarted && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats and Pieces Panel */}
            <div className="lg:col-span-1">
              <PuzzleStats
                correctPieces={puzzleGame.correctPieces}
                totalPieces={selectedPuzzle.gridSize}
                timeElapsed={puzzleGame.timer}
                score={puzzleGame.score}
                isComplete={puzzleGame.isCompleted}
                className="mb-6"
              />
              
              {/* Pieces Pool */}
              <PiecesPool
                pieces={puzzleGame.pieces}
                onDragStart={puzzleGame.handleDragStart}
                onTouchStart={puzzleGame.handleTouchStart}
                onTouchMove={puzzleGame.handleTouchMove}
                onTouchEnd={puzzleGame.handleTouchEnd}
                title="🧩 חלקי הפאזל"
              />
            </div>

            {/* Game Grid */}
            <div className="lg:col-span-2">
              <PuzzleGrid
                gridSize={selectedPuzzle.gridSize}
                pieces={puzzleGame.placedPieces}
                onDragOver={puzzleGame.handleDragOver}
                onDrop={puzzleGame.handleDrop}
                onDragStart={puzzleGame.handleDragStart}
                title={`🎯 ${selectedPuzzle.name}`}
                showPositionNumbers={puzzleGame.hintsEnabled}
                showDebugInfo={puzzleGame.debugMode}
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {selectedPuzzle && !puzzleGame.imageLoaded && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">טוען את הפאזל...</p>
          </div>
        )}

        {/* Floating Dragged Piece */}
        {puzzleGame.touchState.isDragging && puzzleGame.touchState.draggedPiece && (
          <div
            className="fixed pointer-events-none z-50 opacity-80 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: puzzleGame.touchState.dragPosition.x,
              top: puzzleGame.touchState.dragPosition.y,
            }}
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden shadow-2xl border-4 border-blue-400 animate-pulse">
              <Image
                src={puzzleGame.touchState.draggedPiece.canvas.toDataURL()}
                alt={`Dragging piece ${puzzleGame.touchState.draggedPiece.id}`}
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
