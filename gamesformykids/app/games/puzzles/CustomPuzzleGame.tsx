'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Shuffle, RotateCcw, Upload, Home, Lightbulb, Eye, EyeOff, HelpCircle } from 'lucide-react';
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, gridIndex: number) => {
    e.preventDefault();
    
    if (!draggedPiece) return;
    
    const gridSide = Math.sqrt(difficulty);
    const row = Math.floor(gridIndex / gridSide);
    const col = gridIndex % gridSide;
    
    console.log('🎯 CustomPuzzle - Drop attempt:', {
      pieceId: draggedPiece.id,
      droppedAt: `(${row}, ${col})`,
      expectedAt: `(${draggedPiece.expectedPosition.row}, ${draggedPiece.expectedPosition.col})`,
      gridIndex
    });

    // Remove piece from current position if it's already placed
    const newPlacedPieces = [...placedPieces];
    const currentIndex = newPlacedPieces.findIndex(p => p?.id === draggedPiece.id);
    if (currentIndex !== -1) {
      newPlacedPieces[currentIndex] = null;
    }

    // Remove any piece that might be at the target position
    newPlacedPieces[gridIndex] = null;

    // Check if placement is correct
    const isCorrect = isPieceInCorrectPosition(draggedPiece, row, col);
    
    // Update piece properties
    const updatedPiece: PuzzlePiece = {
      ...draggedPiece,
      currentPosition: { row, col },
      isPlaced: true,
      isCorrect
    };

    console.log('🔍 CustomPuzzle - Updated piece:', {
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
      prevPieces.map(piece => 
        piece.id === draggedPiece.id ? { ...updatedPiece, isPlaced: isCorrect } : piece
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

    setDraggedPiece(null);

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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goHome}
              className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              חזרה לבית
            </button>
            
            <h1 className="text-4xl font-bold text-gray-800">🧩 פאזל מותאם אישית</h1>
            
            <button
              onClick={toggleHelp}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              עזרה
            </button>
          </div>
          <p className="text-lg text-gray-600">העלה תמונה וצור פאזל משלך!</p>
        </div>

        {/* Upload Section */}
        {!image && (
          <div className="text-center mb-8">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 max-w-md mx-auto">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg"
              >
                <Upload className="w-6 h-6 mr-2" />
                העלה תמונה
              </button>
              <p className="text-sm text-gray-500 mt-4">
                בחר תמונה מהמחשב שלך כדי ליצור פאזל
              </p>
            </div>
          </div>
        )}

        {/* Game Controls */}
        {image && (
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              תמונה חדשה
            </button>
            <button
              onClick={shufflePieces}
              className="inline-flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors"
              disabled={!gameStarted}
            >
              <Shuffle className="w-4 h-4" />
              ערבב חלקים
            </button>
            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors"
              disabled={!gameStarted}
            >
              <RotateCcw className="w-4 h-4" />
              התחל מחדש
            </button>
            <button
              onClick={toggleHints}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 transition-colors ${
                showHints 
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
              disabled={!gameStarted}
            >
              <Lightbulb className="w-4 h-4" />
              רמזים
            </button>
            <button
              onClick={toggleDebug}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 transition-colors ${
                showDebug 
                  ? 'bg-purple-500 text-white hover:bg-purple-600' 
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {showDebug ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              דיבוג
            </button>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="px-4 py-2 border rounded-lg"
              disabled={gameStarted}
            >
              <option value={4}>קל (2x2)</option>
              <option value={9}>בינוני (3x3)</option>
              <option value={16}>קשה (4x4)</option>
              <option value={25}>מומחה (5x5)</option>
            </select>
          </div>
        )}

        {/* Feedback Message */}
        <FeedbackMessage message={feedbackMessage} type={feedbackType} />

        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={toggleHelp}>
            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
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
                  <h3 className="font-bold text-blue-800 mb-2">📋 שלבי המשחק:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-blue-700">
                    <li>העלה תמונה מהמחשב שלך</li>
                    <li>בחר רמת קושי (2x2 עד 5x5)</li>
                    <li>גרור את החלקים למקום הנכון בלוח</li>
                    <li>השלם את הפאזל במהירות הגבוהה ביותר!</li>
                  </ol>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">💡 טיפים:</h3>
                  <ul className="list-disc list-inside space-y-2 text-green-700">
                    <li>חלקים נכונים יוצגו עם מסגרת ירוקה וכוכב</li>
                    <li>חלקים שגויים יוצגו עם מסגרת אדומה וX</li>
                    <li>ניתן לגרור חלקים מהלוח אם הם לא במקום הנכון</li>
                    <li>השתמש בכפתור &ldquo;רמזים&rdquo; לעזרה נוספת</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-purple-800 mb-2">🎮 פקדים:</h3>
                  <ul className="list-disc list-inside space-y-2 text-purple-700">
                    <li><strong>ערבב חלקים:</strong> מערבב את סדר החלקים</li>
                    <li><strong>התחל מחדש:</strong> מאפס את המשחק</li>
                    <li><strong>רמזים:</strong> מציג עזרות ויזואליות</li>
                    <li><strong>דיבוג:</strong> מציג מידע טכני למפתחים</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-bold text-orange-800 mb-2">⌨️ קיצורי מקלדת:</h3>
                  <ul className="list-disc list-inside space-y-2 text-orange-700">
                    <li><strong>H:</strong> הפעל/כבה רמזים</li>
                    <li><strong>D:</strong> הפעל/כבה מצב דיבוג</li>
                    <li><strong>S:</strong> ערבב חלקים</li>
                    <li><strong>R:</strong> התחל מחדש</li>
                    <li><strong>?:</strong> פתח/סגור עזרה</li>
                    <li><strong>Escape:</strong> סגור עזרה</li>
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
        {gameStarted && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Panel */}
            <div className="lg:col-span-1">
              <PuzzleStats
                correctPieces={correctPieces}
                totalPieces={difficulty}
                timeElapsed={timer}
                score={score}
                isComplete={isCompleted}
                className="mb-6"
              />
              
              {/* Pieces Pool */}
              <PiecesPool
                pieces={pieces}
                onDragStart={handleDragStart}
                title="🧩 חלקי הפאזל"
              />
            </div>

            {/* Game Grid */}
            <div className="lg:col-span-2">
              <PuzzleGrid
                gridSize={difficulty}
                pieces={placedPieces}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
                title="🎯 לוח הפאזל"
                showPositionNumbers={showHints}
                showDebugInfo={showDebug}
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
      </div>
    </div>
  );
}
