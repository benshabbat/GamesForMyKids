import { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, Upload, Home, Lightbulb, Eye, EyeOff, HelpCircle } from 'lucide-react';
import { usePuzzleGame } from '@/hooks/games/usePuzzleGame';
import { 
  FeedbackMessage,
  PuzzleGrid,
  PiecesPool,
  PuzzleStats
} from '@/components/shared/puzzle';

export default function CustomPuzzleGame() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<number>(9);
  const [showInstructions, setShowInstructions] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // השתמש ב-hook החדש
  const puzzleGame = usePuzzleGame({ gridSize: difficulty });

  // Initialize game when image changes
  const initializeWithImage = useCallback((url: string) => {
    const img = new Image();
    img.onload = () => {
      puzzleGame.initializeGame(img);
    };
    img.src = url;
  }, [puzzleGame]);

  // Initialize game when image is loaded
  useEffect(() => {
    if (imageUrl) {
      initializeWithImage(imageUrl);
    }
  }, [imageUrl, initializeWithImage]);

  // Handle file input for custom image
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  // Reset game with new difficulty
  const handleDifficultyChange = (newDifficulty: number) => {
    setDifficulty(newDifficulty);
    if (imageUrl) {
      const img = new Image();
      img.onload = () => puzzleGame.resetGame(img);
      img.src = imageUrl;
    }
  };

  // Reset entire game
  const resetGame = () => {
    setImageUrl(null);
    puzzleGame.resetGame();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // למענה על המצב הזה שבו אין תמונה עדיין
  if (!imageUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                🧩 פאזל מותאם
              </h1>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                חזרה
              </button>
            </div>
            
            {/* Instructions Toggle */}
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                {showInstructions ? 'הסתר הוראות' : 'הצג הוראות'}
              </button>
            </div>

            {/* Instructions */}
            {showInstructions && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-900 mb-2">איך לשחק:</h3>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• העלה תמונה שלך מהמכשיר</li>
                  <li>• בחר רמת קושי (מספר חלקים)</li>
                  <li>• גרור חלקים מהמאגר לרשת</li>
                  <li>• הרכב את התמונה השלמה</li>
                  <li>• השתמש ברמזים אם אתה נתקע</li>
                </ul>
              </div>
            )}
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="mb-6">
                <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  העלה תמונה לפאזל
                </h2>
                <p className="text-gray-600 mb-6">
                  בחר תמונה מהמכשיר שלך כדי ליצור פאזל מותאם
                </p>
              </div>

              {/* Difficulty Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  רמת קושי:
                </label>
                <div className="flex justify-center gap-2">
                  {[4, 6, 9, 12, 16].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        difficulty === level
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {level} חלקים
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5" />
                בחר תמונה
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              🧩 פאזל מותאם
            </h1>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-2">
              
              <button
                onClick={puzzleGame.toggleHints}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  puzzleGame.hintsEnabled
                    ? 'bg-yellow-200 text-yellow-800' 
                    : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                <span className="hidden sm:inline">רמזים</span>
              </button>
              
              <button
                onClick={puzzleGame.toggleDebug}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  puzzleGame.debugMode
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-green-100 hover:bg-green-200 text-green-800'
                }`}
              >
                {puzzleGame.debugMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="hidden sm:inline">מספרים</span>
              </button>
              
              <button
                onClick={handleDifficultyChange.bind(null, difficulty)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">התחל מחדש</span>
              </button>
              
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">תמונה חדשה</span>
              </button>
              
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">חזרה</span>
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <PuzzleStats
            correctPieces={puzzleGame.correctPieces}
            totalPieces={difficulty}
            timeElapsed={puzzleGame.timer}
            score={puzzleGame.score}
            isComplete={puzzleGame.isCompleted}
          />
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Puzzle Grid */}
          <div className="lg:col-span-2">
            <PuzzleGrid
              gridSize={difficulty}
              pieces={puzzleGame.placedPieces}
              onDrop={puzzleGame.handleDrop}
              onDragOver={puzzleGame.handleDragOver}
              onDragStart={puzzleGame.handleDragStart}
              showPositionNumbers={puzzleGame.hintsEnabled}
              showDebugInfo={puzzleGame.debugMode}
            />
          </div>
          
          {/* Pieces Pool */}
          <div className="lg:col-span-1">
            <PiecesPool
              pieces={puzzleGame.pieces}
              onDragStart={puzzleGame.handleDragStart}
              onTouchStart={puzzleGame.handleTouchStart}
              onTouchMove={puzzleGame.handleTouchMove}
              onTouchEnd={puzzleGame.handleTouchEnd}
            />
          </div>
        </div>

        {/* Feedback Message */}
        <FeedbackMessage 
          message={puzzleGame.feedbackMessage}
          type={puzzleGame.feedbackType}
        />

        {/* Game Complete Modal */}
        {puzzleGame.isCompleted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                כל הכבוד!
              </h2>
              <p className="text-gray-600 mb-4">
                השלמת את הפאזל בהצלחה!
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-800">זמן:</div>
                    <div className="text-gray-600">
                      {Math.floor(puzzleGame.timer / 60)}:{String(puzzleGame.timer % 60).padStart(2, '0')}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">ניסיונות:</div>
                    <div className="text-gray-600">-</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleDifficultyChange.bind(null, difficulty)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  שחק שוב
                </button>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  תמונה חדשה
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  חזרה
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Touch overlay for mobile drag */}
        {puzzleGame.touchState.isDragging && puzzleGame.touchState.draggedPiece && (
          <div 
            className="fixed pointer-events-none z-50"
            style={{
              left: puzzleGame.touchState.dragPosition.x - 25,
              top: puzzleGame.touchState.dragPosition.y - 25,
              width: 50,
              height: 50
            }}
          >
            <div className="w-full h-full bg-blue-200 border-2 border-blue-400 rounded opacity-80 flex items-center justify-center">
              {puzzleGame.debugMode && (
                <span className="text-xs font-bold text-blue-800">
                  {puzzleGame.touchState.draggedPiece.id + 1}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
