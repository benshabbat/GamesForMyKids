/**
 * ===============================================
 * קומפוננט פאזל פשוט - בסגנון הפרויקט
 * ===============================================
 * 
 * גרסה פשוטה יותר של משחק הפאזל שמשתמשת
 * בקומפוננטים הקיימים של הפרויקט
 */

"use client";

import React, { useState, useCallback } from 'react';
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

// פאזל פשוט עם תמונות מובנות
const SIMPLE_PUZZLES: SimplePuzzle[] = [
  {
    id: 1,
    name: "פאזל בעלי חיים",
    emoji: "🐱",
    color: "#FF69B4",
    pieces: [
      { id: 0, content: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop&crop=face", position: 0 },
      { id: 1, content: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&crop=face", position: 1 },
      { id: 2, content: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop&crop=face", position: 2 },
      { id: 3, content: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=200&h=200&fit=crop&crop=face", position: 3 }
    ],
    difficulty: "easy"
  },
  {
    id: 2,
    name: "פאזל רכבים",
    emoji: "�",
    color: "#4169E1",
    pieces: [
      { id: 0, content: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&h=200&fit=crop", position: 0 },
      { id: 1, content: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=200&fit=crop", position: 1 },
      { id: 2, content: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop", position: 2 },
      { id: 3, content: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", position: 3 }
    ],
    difficulty: "easy"
  },
  {
    id: 3,
    name: "פאזל פירות טריים",
    emoji: "🍎",
    color: "#FF4500",
    pieces: [
      { id: 0, content: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150&h=150&fit=crop", position: 0 },
      { id: 1, content: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&fit=crop", position: 1 },
      { id: 2, content: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=150&h=150&fit=crop", position: 2 },
      { id: 3, content: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=150&h=150&fit=crop", position: 3 },
      { id: 4, content: "https://images.unsplash.com/photo-1601004890684-d8cbf643339a?w=150&h=150&fit=crop", position: 4 },
      { id: 5, content: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150&h=150&fit=crop", position: 5 },
      { id: 6, content: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=150&h=150&fit=crop", position: 6 },
      { id: 7, content: "https://images.unsplash.com/photo-1536511132770-e5058c4ed7dc?w=150&h=150&fit=crop", position: 7 },
      { id: 8, content: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=150&h=150&fit=crop", position: 8 }
    ],
    difficulty: "medium"
  },
  {
    id: 4,
    name: "פאזל צבעים וצורות",
    emoji: "�",
    color: "#9932CC",
    pieces: [
      { id: 0, content: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=150&h=150&fit=crop", position: 0 },
      { id: 1, content: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop", position: 1 },
      { id: 2, content: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=150&fit=crop", position: 2 },
      { id: 3, content: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop", position: 3 },
      { id: 4, content: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=150&h=150&fit=crop", position: 4 },
      { id: 5, content: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=150&fit=crop", position: 5 }
    ],
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
    setSelectedPuzzle(puzzle);
    const shuffledPieces = [...puzzle.pieces].sort(() => Math.random() - 0.5);
    setPieces(shuffledPieces);
    setSolution(new Array(puzzle.pieces.length).fill(null));
    setScore(0);
    setIsComplete(false);
  }, []);

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

    // בדיקה אם זה המקום הנכון
    if (draggedPiece.position === targetIndex) {
      // מיקום נכון!
      const newSolution = [...solution];
      newSolution[targetIndex] = draggedPiece;
      setSolution(newSolution);
      
      // הסרת החלק מהרשימה
      setPieces(prev => prev.filter(p => p.id !== draggedPiece.id));
      
      setScore(prev => prev + 10);
      showSuccessFeedback(`כל הכבוד! החלק במקום הנכון! 🎉`);
      
      // בדיקה אם הפאזל הושלם
      if (newSolution.filter(Boolean).length === selectedPuzzle.pieces.length) {
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
                  <div className="text-gray-600">
                    {puzzle.pieces.length} חלקים
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

  const gridSize = Math.sqrt(selectedPuzzle.pieces.length);
  
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
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
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
                    piece.content.startsWith('http') ? (
                      <Image 
                        src={piece.content} 
                        alt={`פאזל ${piece.id}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover rounded-lg"
                        unoptimized
                      />
                    ) : (
                      <span className="text-4xl">{piece.content}</span>
                    )
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
                  {piece.content.startsWith('http') ? (
                    <Image 
                      src={piece.content} 
                      alt={`חלק פאזל ${piece.id}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover rounded-lg"
                      unoptimized
                    />
                  ) : (
                    <span className="text-4xl">{piece.content}</span>
                  )}
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
      </div>
    </div>
  );
}
