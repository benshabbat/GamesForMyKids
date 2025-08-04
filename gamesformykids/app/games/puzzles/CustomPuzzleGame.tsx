'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Shuffle, RotateCcw, Upload, Home, Lightbulb, Eye, EyeOff, HelpCircle } from 'lucide-react';
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
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-6">
            <button
              onClick={goHome}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base font-medium"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">חזרה לבית</span>
              <span className="sm:hidden">בית</span>
            </button>
            
            <div className="order-first sm:order-none">
              <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">🧩 פאזל מותאם אישית</h1>
              <p className="text-lg sm:text-xl text-gray-600 font-medium">העלה תמונה וצור פאזל משלך!</p>
            </div>
            
            <button
              onClick={toggleHelp}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base font-medium"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="hidden sm:inline">עזרה</span>
              <span className="sm:hidden">?</span>
            </button>
          </div>
        </div>

        {/* Upload Section */}
        {!image && (
          <div className="text-center mb-8">
            <div className="rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8 max-w-5xl mx-auto backdrop-blur-sm bg-white/95">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">🎨 בחר תמונה לפאזל</h3>
              
              {/* Pre-made images section */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-700 mb-6">✨ תמונות מוכנות</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">{[
                    { src: '/images/Fox with Yo-Yo.png', name: 'שועל עם יו-יו' },
                    { src: '/images/Cool Fox Character.png', name: 'שועל מגניב' },
                    { src: '/images/Cute Animals with Rainbow.png', name: 'חיות עם קשת' },
                    { src: '/images/Happy Forest Friends.png', name: 'חברי היער' },
                    { src: '/images/Playing Outdoors.png', name: 'משחק בחוץ' },
                    { src: '/images/Princess with Deer.png', name: 'נסיכה וצבי' },
                    { src: '/images/Forest Party.png', name: 'מסיבת יער' },
                    { src: '/images/Magical Mushroom Land.png', name: 'ארץ הפטריות' },
                    { src: '/images/Princess in Magical Forest.png', name: 'נסיכה ביער קסום' }
                  ].map((img, index) => (
                    <div 
                      key={index}
                      onClick={() => handlePreMadeImageSelect(img.src)}
                      className="group cursor-pointer border-3 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white"
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={img.src}
                          alt={img.name}
                          fill
                          className="object-cover group-hover:brightness-110 transition-all duration-300"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        {/* Difficulty indicator */}
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs sm:text-sm px-3 py-2 rounded-full font-bold shadow-lg">
                          {difficulty} חלקים
                        </div>
                      </div>
                      <div className="p-3 sm:p-4 text-center bg-gradient-to-b from-white to-gray-50">
                        <p className="text-sm sm:text-base text-gray-700 font-semibold mb-1">{img.name}</p>
                        <p className="text-xs sm:text-sm text-blue-600 font-medium">
                          פאזל {Math.sqrt(difficulty)}×{Math.sqrt(difficulty)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current difficulty display */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 shadow-inner">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <span className="text-blue-800 font-bold text-lg">🎯 רמת קושי נוכחית:</span>
                  <select
                    value={difficulty}
                    onChange={(e) => {
                      const newDifficulty = Number(e.target.value);
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
                    }}
                    className="px-4 py-3 border-2 border-blue-300 rounded-xl bg-white text-blue-800 font-semibold text-lg shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-400"
                  >
                    <option value={4}>🟢 קל (2x2) - 4 חלקים</option>
                    <option value={9}>🟡 בינוני (3x3) - 9 חלקים</option>
                    <option value={16}>🟠 קשה (4x4) - 16 חלקים</option>
                    <option value={25}>🔴 מומחה (5x5) - 25 חלקים</option>
                  </select>
                </div>
                <p className="text-center text-sm sm:text-base text-blue-600 mt-3 font-medium">
                  🧩 הפאזל ייווצר עם {difficulty} חלקים ({Math.sqrt(difficulty)}×{Math.sqrt(difficulty)})
                </p>
              </div>

              {/* Upload custom image section */}
              <div className="border-t border-gray-200 pt-8">
                <h4 className="text-xl font-semibold text-gray-700 mb-6">📁 או העלה תמונה משלך</h4>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Upload className="w-6 h-6 mr-3" />
                  העלה תמונה מהמחשב
                </button>
                <p className="text-sm sm:text-base text-gray-600 mt-4 font-medium">
                  📸 בחר תמונה מהמחשב שלך כדי ליצור פאזל מותאם אישית
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Game Controls */}
        {image && (
          <div className="mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🎮 פקדי משחק</h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium"
                >
                  <Upload className="w-5 h-5" />
                  <span className="hidden sm:inline">תמונה חדשה</span>
                  <span className="sm:hidden">חדש</span>
                </button>
                <button
                  onClick={shufflePieces}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!gameStarted}
                >
                  <Shuffle className="w-5 h-5" />
                  <span className="hidden sm:inline">ערבב חלקים</span>
                  <span className="sm:hidden">ערבב</span>
                </button>
                <button
                  onClick={resetGame}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!gameStarted}
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="hidden sm:inline">התחל מחדש</span>
                  <span className="sm:hidden">איפוס</span>
                </button>
                <button
                  onClick={toggleHints}
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                    showHints 
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 hover:from-yellow-500 hover:to-yellow-600' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600'
                  }`}
                  disabled={!gameStarted}
                >
                  <Lightbulb className="w-5 h-5" />
                  <span className="hidden sm:inline">רמזים</span>
                  <span className="sm:hidden">💡</span>
                </button>
                <button
                  onClick={toggleDebug}
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium ${
                    showDebug 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600'
                  }`}
                >
                  {showDebug ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  <span className="hidden sm:inline">דיבוג</span>
                  <span className="sm:hidden">🔧</span>
                </button>
              </div>
              
              {/* Difficulty selector */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <label className="text-lg font-bold text-gray-700">🎯 רמת קושי:</label>
                  <select
                    value={difficulty}
                    onChange={(e) => {
                      const newDifficulty = Number(e.target.value);
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
                    }}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl bg-white text-gray-800 font-semibold text-base shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  >
                    <option value={4}>🟢 קל (2x2) - 4 חלקים</option>
                    <option value={9}>🟡 בינוני (3x3) - 9 חלקים</option>
                    <option value={16}>🟠 קשה (4x4) - 16 חלקים</option>
                    <option value={25}>🔴 מומחה (5x5) - 25 חלקים</option>
                  </select>
                </div>
              </div>
            </div>
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
              {image && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-4 lg:p-6">
                  <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 lg:mb-4 text-center">🖼️ תמונת עזר</h3>
                  <div className="aspect-square relative rounded-xl overflow-hidden border-4 border-gradient-to-r from-purple-400 to-blue-400 max-w-48 mx-auto lg:max-w-none shadow-lg">
                    <Image
                      src={image.src}
                      alt="תמונת עזר לפאזל"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 1024px) 192px, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 text-center mt-2 lg:mt-3 font-medium">
                    💡 התמונה המלאה לעזרה בבניית הפאזל
                  </p>
                </div>
              )}
              

            {/* Stats Panel and Pieces Pool - Combined on mobile */}
            <div className="lg:col-span-1 order-2 lg:order-1 space-y-4 lg:space-y-6">
              {/* Reference Image - Responsive design */}
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
        {touchState.isDragging && touchState.draggedPiece && (
          <div
            className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: touchState.dragPosition.x,
              top: touchState.dragPosition.y,
            }}
          >
            <div className="w-24 h-24 rounded-xl overflow-hidden shadow-2xl border-4 border-blue-400 animate-pulse bg-white/90 backdrop-blur-sm">
              <Image
                src={touchState.draggedPiece.canvas.toDataURL()}
                alt={`גרירת חלק ${touchState.draggedPiece.id}`}
                width={96}
                height={96}
                className="w-full h-full object-cover brightness-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
