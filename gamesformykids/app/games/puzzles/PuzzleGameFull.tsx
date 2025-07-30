"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Home, RotateCcw, Lightbulb, Trophy, Clock, Star } from 'lucide-react';
import GameHeader from '@/components/shared/GameHeader';
import { PuzzleImage, PuzzlePiece, CompletedPuzzlePiece } from '@/lib/types/puzzles';

// תמונות פאזל מותאמות לילדים
const PUZZLE_IMAGES: PuzzleImage[] = [
  {
    id: 1,
    name: "גור כלבים חמוד",
    url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    difficulty: "easy",
    pieces: 4,
    category: "חיות"
  },
  {
    id: 2, 
    name: "פרפר צבעוני",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    difficulty: "easy",
    pieces: 4,
    category: "טבע"
  },
  {
    id: 3,
    name: "פרחים יפים",
    url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
    difficulty: "medium", 
    pieces: 9,
    category: "צמחים"
  },
  {
    id: 4,
    name: "רכבת צבעונית",
    url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
    difficulty: "medium",
    pieces: 9,
    category: "תחבורה"
  },
  {
    id: 5,
    name: "יער קסום",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    difficulty: "hard",
    pieces: 16,
    category: "נוף"
  },
  {
    id: 6,
    name: "בלונים צבעוניים",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
    difficulty: "hard",
    pieces: 16,
    category: "כיף"
  }
];

export default function PuzzleGameFull() {
  const [selectedImage, setSelectedImage] = useState<PuzzleImage | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [completedPieces, setCompletedPieces] = useState<CompletedPuzzlePiece[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<PuzzlePiece | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<number | false>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // טיימר
  useEffect(() => {
    if (gameStarted && !isComplete) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameStarted, isComplete]);

  // יצירת חלקי הפאזל
  const createPuzzlePieces = useCallback((imageData: PuzzleImage) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    
    if (!img || !canvas) return;
    
    const gridSize = Math.sqrt(imageData.pieces);
    const pieceWidth = 400 / gridSize;
    const pieceHeight = 300 / gridSize;
    
    const newPieces: PuzzlePiece[] = [];
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pieceCanvas = document.createElement('canvas');
        pieceCanvas.width = pieceWidth;
        pieceCanvas.height = pieceHeight;
        const pieceCtx = pieceCanvas.getContext('2d');
        
        if (!pieceCtx) continue;
        
        // חיתוך החלק מהתמונה המקורית
        pieceCtx.drawImage(
          img,
          col * pieceWidth, row * pieceHeight,
          pieceWidth, pieceHeight,
          0, 0,
          pieceWidth, pieceHeight
        );
        
        newPieces.push({
          id: row * gridSize + col,
          canvas: pieceCanvas,
          correctRow: row,
          correctCol: col,
          currentRow: null,
          currentCol: null,
          isPlaced: false,
        });
      }
    }
    
    // ערבוב החלקים
    setPieces(newPieces.sort(() => Math.random() - 0.5));
  }, []);

  // טעינת תמונה והתחלת משחק
  const startPuzzle = (imageData: PuzzleImage) => {
    setSelectedImage(imageData);
    setGameStarted(true);
    setIsComplete(false);
    setCompletedPieces([]);
    setScore(0);
    setTimeElapsed(0);
    setShowCelebration(false);
    
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageRef.current = img;
      createPuzzlePieces(imageData);
    };
    img.onerror = () => {
      // במקרה של שגיאה, נשתמש בתמונה גיבוי
      img.crossOrigin = null;
      img.src = `data:image/svg+xml;base64,${btoa(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#e0e7ff"/>
          <text x="200" y="150" text-anchor="middle" fill="#4f46e5" font-size="24" font-family="Arial">
            ${imageData.name}
          </text>
        </svg>
      `)}`;
    };
    img.src = imageData.url;
  };

  // טיפול בגרירה
  const handleDragStart = (e: React.DragEvent, piece: PuzzlePiece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetRow: number, targetCol: number) => {
    e.preventDefault();
    
    if (!draggedPiece || !selectedImage) return;
    
    // בדיקה אם זה המקום הנכון
    if (draggedPiece.correctRow === targetRow && draggedPiece.correctCol === targetCol) {
      // מיקום נכון!
      setPieces(prev => prev.filter(p => p.id !== draggedPiece.id));
      setCompletedPieces(prev => [...prev, {
        ...draggedPiece,
        currentRow: targetRow,
        currentCol: targetCol,
        isPlaced: true
      } as CompletedPuzzlePiece]);
      
      setScore(prev => prev + 10);
      
      // בדיקה אם הפאזל הושלם
      if (completedPieces.length + 1 === selectedImage.pieces) {
        setIsComplete(true);
        setShowCelebration(true);
        setScore(prev => prev + 50 + Math.max(0, 300 - timeElapsed)); // בונוס זמן
        
        // הסתרת החגיגה אחרי 3 שניות
        setTimeout(() => {
          setShowCelebration(false);
        }, 3000);
      }
    }
    
    setDraggedPiece(null);
  };

  // רמז - הדגשת המיקום הנכון של חלק אקראי
  const showHintForPiece = () => {
    if (pieces.length === 0) return;
    
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    setShowHint(randomPiece.id);
    
    setTimeout(() => {
      setShowHint(false);
    }, 2000);
  };

  // איפוס משחק
  const resetGame = () => {
    setSelectedImage(null);
    setPieces([]);
    setCompletedPieces([]);
    setScore(0);
    setTimeElapsed(0);
    setIsComplete(false);
    setGameStarted(false);
    setShowHint(false);
    setShowCelebration(false);
  };

  // עיצוב זמן
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!selectedImage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-200 p-4">
        <div className="max-w-4xl mx-auto">
          {/* כותרת */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-purple-800 mb-4">
              🧩 משחק פאזלים אמיתי 🖼️
            </h1>
            <p className="text-xl text-purple-600">
              בחר תמונה ותרכיב אותה חזרה!
            </p>
          </div>

          {/* בחירת תמונות */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PUZZLE_IMAGES.map((image) => (
              <div
                key={image.id}
                onClick={() => startPuzzle(image)}
                className="relative cursor-pointer transform hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{image.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      image.difficulty === 'easy' ? 'bg-green-500' :
                      image.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                    } text-white`}>
                      {image.difficulty === 'easy' ? 'קל' : 
                       image.difficulty === 'medium' ? 'בינוני' : 'קשה'}
                    </span>
                    <span className="text-white text-xs">
                      {image.pieces} חלקים
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* כפתור חזרה */}
          <div className="text-center mt-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-purple-700 mx-auto"
            >
              <Home className="w-5 h-5" />
              חזרה לתפריט פאזלים
            </button>
          </div>
        </div>
      </div>
    );
  }

  const gridSize = Math.sqrt(selectedImage.pieces);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <GameHeader
          score={score}
          level={Math.floor(score / 50) + 1}
          onHome={() => window.history.back()}
          onReset={resetGame}
          scoreColor="text-purple-800"
          levelColor="text-purple-600"
        />

        {/* כותרת המשחק ונתונים */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-800 mb-2">{selectedImage.name}</h2>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-800">{formatTime(timeElapsed)}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-green-800">
                {completedPieces.length}/{selectedImage.pieces}
              </span>
            </div>
          </div>
        </div>

        {/* כפתורי פעולות */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={showHintForPiece}
            disabled={pieces.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Lightbulb className="w-4 h-4" />
            רמז
          </button>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            איפוס
          </button>
        </div>

        {/* אזור המשחק */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* לוח הפאזל */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
              🎯 לוח הפאזל
            </h3>
            <div 
              className="grid border-2 border-gray-300 rounded-lg overflow-hidden mx-auto"
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                width: '400px',
                height: '300px'
              }}
            >
              {Array.from({ length: selectedImage.pieces }, (_, index) => {
                const row = Math.floor(index / gridSize);
                const col = index % gridSize;
                const placedPiece = completedPieces.find(p => p.currentRow === row && p.currentCol === col);
                const isHintTarget = pieces.find(p => p.id === showHint && p.correctRow === row && p.correctCol === col);
                
                return (
                  <div
                    key={index}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, row, col)}
                    className={`border border-gray-200 flex items-center justify-center ${
                      isHintTarget ? 'bg-yellow-300 animate-pulse' : 'bg-gray-50'
                    }`}
                  >
                    {placedPiece && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={placedPiece.canvas.toDataURL()}
                          alt={`חלק ${placedPiece.id}`}
                          className="w-full h-full object-cover"
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* חלקי הפאזל הנותרים */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
              🧩 חלקי הפאזל ({pieces.length} נותרו)
            </h3>
            <div className="grid grid-cols-3 gap-4 min-h-[300px] max-h-96 overflow-y-auto">
              {pieces.map((piece) => (
                <div
                  key={piece.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, piece)}
                  className="cursor-move hover:scale-105 transition-transform border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-purple-400"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={piece.canvas.toDataURL()}
                    alt={`חלק ${piece.id}`}
                    className="w-full h-auto rounded"
                  />
                </div>
              ))}
            </div>
            {pieces.length === 0 && !isComplete && (
              <div className="text-center text-gray-500 py-8">
                <Trophy className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
                <p>כל החתיכות במקום!</p>
              </div>
            )}
          </div>
        </div>

        {/* מסך חגיגה */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                כל הכבוד!
              </h2>
              <p className="text-lg text-white mb-4">
                השלמת את הפאזל בזמן {formatTime(timeElapsed)}
              </p>
              <div className="text-2xl font-bold text-white mb-6">
                ניקוד סופי: {score}
              </div>
              <Trophy className="w-16 h-16 text-yellow-200 mx-auto" />
            </div>
          </div>
        )}

        {/* מסך ניצחון קבוע */}
        {isComplete && !showCelebration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-purple-800 mb-4">
                משחק הושלם!
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                זמן: {formatTime(timeElapsed)} | ניקוד: {score}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 font-bold transition-all"
                >
                  משחק חדש
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 font-bold transition-all"
                >
                  חזרה לתפריט
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Canvas נסתר לעיבוד התמונות */}
        <canvas ref={canvasRef} style={{ display: 'none' }} width="400" height="300" />
      </div>
    </div>
  );
}
