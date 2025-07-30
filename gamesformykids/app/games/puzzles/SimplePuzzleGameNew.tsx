/**
 * ===============================================
 * קומפוננט פאזל פשוט - עם חיתוך תמונות אמיתי
 * ===============================================
 * 
 * גרסה שמחלקת תמונה אחת לחלקים אמיתיים
 */

"use client";

import React, { useState, useCallback, useRef } from 'react';
import { RotateCcw, Trophy, Home } from 'lucide-react';
import Image from 'next/image';

// טיפוסים
interface PuzzlePiece {
  id: number;
  canvas: HTMLCanvasElement;
  position: number;
  row: number;
  col: number;
}

interface SimplePuzzle {
  id: number;
  name: string;
  emoji: string;
  color: string;
  imageUrl: string;
  gridSize: number; // 2x2 = 4, 3x3 = 9
  difficulty: 'easy' | 'medium' | 'hard';
}

// פאזלים פשוטים עם תמונות שמחולקות לחלקים
const SIMPLE_PUZZLES: SimplePuzzle[] = [
  {
    id: 1,
    name: "פאזל חתול חמוד",
    emoji: "🐱",
    color: "#FF69B4",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=500&fit=crop",
    gridSize: 4, // 2x2
    difficulty: "easy"
  },
  {
    id: 2,
    name: "פאזל כלב יפה",
    emoji: "🐶",
    color: "#4169E1",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=500&fit=crop",
    gridSize: 4, // 2x2
    difficulty: "easy"
  },
  {
    id: 3,
    name: "פאזל פרפר צבעוני",
    emoji: "🦋",
    color: "#FF4500",
    imageUrl: "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=600&h=600&fit=crop",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 4,
    name: "פאזל פרח יפה",
    emoji: "🌺",
    color: "#9932CC",
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=600&fit=crop",
    gridSize: 9, // 3x3
    difficulty: "medium"
  }
];

export default function SimplePuzzleGame() {
  const [selectedPuzzle, setSelectedPuzzle] = useState<SimplePuzzle | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [solution, setSolution] = useState<(PuzzlePiece | null)[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [draggedPiece, setDraggedPiece] = useState<PuzzlePiece | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // פונקציה ליצירת חלקי פאזל מתמונה
  const createPuzzlePieces = useCallback((img: HTMLImageElement, puzzle: SimplePuzzle): PuzzlePiece[] => {
    const canvas = canvasRef.current;
    if (!canvas) return [];
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];

    const size = 400;
    canvas.width = size;
    canvas.height = size;

    const gridSide = Math.sqrt(puzzle.gridSize);
    const pieceSize = size / gridSide;
    const pieces: PuzzlePiece[] = [];

    for (let row = 0; row < gridSide; row++) {
      for (let col = 0; col < gridSide; col++) {
        const pieceCanvas = document.createElement('canvas');
        pieceCanvas.width = pieceSize + 4;
        pieceCanvas.height = pieceSize + 4;
        const pieceCtx = pieceCanvas.getContext('2d');
        
        if (!pieceCtx) continue;

        // Enable high quality rendering
        pieceCtx.imageSmoothingEnabled = true;
        pieceCtx.imageSmoothingQuality = 'high';

        // Add background
        pieceCtx.fillStyle = '#f8f8f8';
        pieceCtx.fillRect(0, 0, pieceCanvas.width, pieceCanvas.height);

        // Draw piece from original image
        pieceCtx.drawImage(
          img,
          (col * img.width) / gridSide, (row * img.height) / gridSide,
          img.width / gridSide, img.height / gridSide,
          2, 2,
          pieceSize, pieceSize
        );

        // Add border
        pieceCtx.strokeStyle = '#ddd';
        pieceCtx.lineWidth = 2;
        pieceCtx.strokeRect(1, 1, pieceSize + 2, pieceSize + 2);

        const position = row * gridSide + col;
        pieces.push({
          id: position,
          canvas: pieceCanvas,
          position: position,
          row,
          col
        });
      }
    }

    return pieces.sort(() => Math.random() - 0.5);
  }, []);

  // Success and error feedback functions
  const showSuccessFeedback = (message: string) => {
    setFeedbackMessage(message);
    setFeedbackType('success');
    playSuccessSound();
    setTimeout(() => {
      setFeedbackMessage('');
      setFeedbackType('');
    }, 2000);
  };

  const showErrorFeedback = (message: string) => {
    setFeedbackMessage(message);
    setFeedbackType('error');
    setTimeout(() => {
      setFeedbackMessage('');
      setFeedbackType('');
    }, 1500);
  };

  const playSuccessSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch {
      console.log('Audio not supported');
    }
  };

  // התחלת פאזל חדש
  const startPuzzle = useCallback((puzzle: SimplePuzzle) => {
    setIsLoading(true);
    setSelectedPuzzle(puzzle);
    
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const puzzlePieces = createPuzzlePieces(img, puzzle);
      setPieces(puzzlePieces);
      setSolution(new Array(puzzle.gridSize).fill(null));
      setScore(0);
      setIsComplete(false);
      setIsLoading(false);
    };
    img.onerror = () => {
      console.error('Failed to load image');
      setIsLoading(false);
    };
    img.src = puzzle.imageUrl;
  }, [createPuzzlePieces]);

  // טיפול בגרירת חלקים
  const handleDragStart = (e: React.DragEvent, piece: PuzzlePiece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedPiece || !selectedPuzzle) return;

    // בדיקה אם זה המקום הנכון - החלק צריך להיות במקום שתואם לID שלו
    if (draggedPiece.id === targetIndex) {
      // מיקום נכון!
      const newSolution = [...solution];
      newSolution[targetIndex] = draggedPiece;
      setSolution(newSolution);
      
      // הסרת החלק מהרשימה
      setPieces(prev => prev.filter(p => p.id !== draggedPiece.id));
      
      setScore(prev => prev + 10);
      showSuccessFeedback(`כל הכבוד! החלק במקום הנכון! 🎉`);
      
      // בדיקה אם הפאזל הושלם
      if (newSolution.filter(Boolean).length === selectedPuzzle.gridSize) {
        setIsComplete(true);
        setScore(prev => prev + 50);
        showSuccessFeedback(`הפאזל הושלם! מדהים! 🏆`);
      }
    } else {
      // מיקום שגוי
      showErrorFeedback(`נסה שוב! החלק לא במקום הנכון 🤔`);
    }
    
    setDraggedPiece(null);
  };

  // איפוס משחק
  const resetGame = () => {
    if (selectedPuzzle) {
      startPuzzle(selectedPuzzle);
    }
  };

  const goHome = () => {
    setSelectedPuzzle(null);
    setPieces([]);
    setSolution([]);
    setScore(0);
    setIsComplete(false);
  };

  if (!selectedPuzzle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-200 p-4">
        <div className="max-w-4xl mx-auto">
          {/* כותרת */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-purple-800 mb-4">
              🧩 פאזלים פשוטים 🎨
            </h1>
            <p className="text-xl text-purple-600">
              בחר פאזל והתחל לשחק!
            </p>
          </div>

          {/* בחירת פאזלים */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SIMPLE_PUZZLES.map((puzzle) => (
              <div
                key={puzzle.id}
                onClick={() => startPuzzle(puzzle)}
                className="relative cursor-pointer transform hover:scale-105 transition-all duration-300 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl p-6"
              >
                <div 
                  className="text-6xl text-center mb-4"
                  style={{ color: puzzle.color }}
                >
                  {puzzle.emoji}
                </div>
                <h3 className="text-center font-bold text-lg text-gray-800 mb-2">
                  {puzzle.name}
                </h3>
                <div className="text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    puzzle.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    puzzle.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {puzzle.difficulty === 'easy' ? 'קל' : 
                     puzzle.difficulty === 'medium' ? 'בינוני' : 'קשה'}
                  </span>
                  <div className="text-gray-600 mt-1">
                    {puzzle.gridSize} חלקים ({Math.sqrt(puzzle.gridSize)}x{Math.sqrt(puzzle.gridSize)})
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* כפתור חזרה */}
          <div className="text-center mt-8">
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-purple-700 mx-auto"
            >
              <Home className="w-5 h-5" />
              חזרה לתפריט הראשי
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🧩</div>
          <h2 className="text-2xl font-bold text-purple-800">טוען פאזל...</h2>
        </div>
      </div>
    );
  }

  const gridSide = Math.sqrt(selectedPuzzle.gridSize);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Feedback Message */}
        {feedbackMessage && (
          <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg animate-bounce ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-orange-500'
          }`}>
            {feedbackMessage}
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goHome}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Home className="w-5 h-5" />
            בחירת פאזל
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-800">{selectedPuzzle.name}</h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-purple-600">
                <Trophy className="w-4 h-4" />
                <span>{score}</span>
              </div>
            </div>
          </div>

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
              className="grid gap-2 mx-auto bg-gray-200 p-4 rounded-lg"
              style={{ 
                gridTemplateColumns: `repeat(${gridSide}, 1fr)`,
                maxWidth: '400px'
              }}
            >
              {solution.map((piece, index) => (
                <div
                  key={index}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="aspect-square border-2 border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center overflow-hidden"
                >
                  {piece && (
                    <Image
                      src={piece.canvas.toDataURL()}
                      alt={`פאזל ${piece.id}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover rounded-lg"
                      unoptimized
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* חלקי הפאזל הנותרים */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
              🧩 חלקי הפאזל ({pieces.length} נותרו)
            </h3>
            <div className="grid grid-cols-3 gap-4 min-h-[300px]">
              {pieces.map((piece) => (
                <div
                  key={piece.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, piece)}
                  className="aspect-square cursor-move hover:scale-110 transition-transform border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 flex items-center justify-center bg-white shadow-sm hover:shadow-md overflow-hidden"
                >
                  <Image
                    src={piece.canvas.toDataURL()}
                    alt={`חלק פאזל ${piece.id}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-lg"
                    unoptimized
                  />
                </div>
              ))}
            </div>
            {pieces.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Trophy className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
                <p>כל החתיכות במקום!</p>
              </div>
            )}
          </div>
        </div>

        {/* מסך ניצחון */}
        {isComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                כל הכבוד!
              </h2>
              <p className="text-lg text-white mb-4">
                השלמת את הפאזל!
              </p>
              <div className="text-2xl font-bold text-white mb-6">
                ניקוד: {score}
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-white text-orange-600 rounded-full hover:bg-gray-100 font-bold transition-all"
                >
                  שוב
                </button>
                <button
                  onClick={goHome}
                  className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 font-bold transition-all"
                >
                  פאזל אחר
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
