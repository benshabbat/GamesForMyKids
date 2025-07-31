"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Trophy, Home } from 'lucide-react';
import Image from 'next/image';
import GameHeader from '@/components/shared/GameHeader';
import { speakHebrew, initSpeechAndAudio } from '@/lib/utils/enhancedSpeechUtils';
import { playSuccessSound } from '@/lib/utils/gameUtils';

interface PuzzlePiece {
  id: number;
  canvas: HTMLCanvasElement;
  position: number;
  row: number;
  col: number;
  correctPosition: number;
}

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
    imageUrl: "data:image/svg+xml;base64," + btoa(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="#FFB6C1"/>
        <circle cx="200" cy="200" r="150" fill="#FF69B4"/>
        <circle cx="160" cy="150" r="20" fill="black"/>
        <circle cx="240" cy="150" r="20" fill="black"/>
        <path d="M 200 180 Q 200 220 180 200 Q 200 220 220 200" fill="black"/>
        <text x="200" y="320" text-anchor="middle" font-size="40">🐱</text>
      </svg>
    `),
    gridSize: 4, // 2x2
    difficulty: "easy"
  },
  {
    id: 2,
    name: "פאזל כלב יפה",
    emoji: "🐶",
    color: "#4169E1",
    imageUrl: "data:image/svg+xml;base64," + btoa(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="#ADD8E6"/>
        <ellipse cx="200" cy="220" rx="120" ry="100" fill="#4169E1"/>
        <circle cx="170" cy="180" r="15" fill="black"/>
        <circle cx="230" cy="180" r="15" fill="black"/>
        <ellipse cx="200" cy="220" rx="25" ry="15" fill="black"/>
        <text x="200" y="340" text-anchor="middle" font-size="40">🐶</text>
      </svg>
    `),
    gridSize: 4, // 2x2
    difficulty: "easy"
  },
  {
    id: 3,
    name: "פאזל פרפר צבעוני",
    emoji: "🦋",
    color: "#FF4500",
    imageUrl: "data:image/svg+xml;base64," + btoa(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="#FFE4B5"/>
        <ellipse cx="150" cy="150" rx="50" ry="80" fill="#FF4500"/>
        <ellipse cx="250" cy="150" rx="50" ry="80" fill="#FF6347"/>
        <ellipse cx="150" cy="250" rx="40" ry="60" fill="#FF4500"/>
        <ellipse cx="250" cy="250" rx="40" ry="60" fill="#FF6347"/>
        <line x1="200" y1="100" x2="200" y2="300" stroke="black" stroke-width="4"/>
        <text x="200" y="350" text-anchor="middle" font-size="40">🦋</text>
      </svg>
    `),
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 4,
    name: "פאזל פרח יפה",
    emoji: "🌺",
    color: "#9932CC",
    imageUrl: "data:image/svg+xml;base64," + btoa(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="#E6E6FA"/>
        <circle cx="200" cy="200" r="30" fill="#FFD700"/>
        <ellipse cx="200" cy="140" rx="25" ry="50" fill="#9932CC"/>
        <ellipse cx="260" cy="200" rx="50" ry="25" fill="#DA70D6"/>
        <ellipse cx="200" cy="260" rx="25" ry="50" fill="#9932CC"/>
        <ellipse cx="140" cy="200" rx="50" ry="25" fill="#DA70D6"/>
        <ellipse cx="235" cy="165" rx="35" ry="35" fill="#BA55D3" transform="rotate(45 235 165)"/>
        <ellipse cx="165" cy="165" rx="35" ry="35" fill="#BA55D3" transform="rotate(-45 165 165)"/>
        <ellipse cx="235" cy="235" rx="35" ry="35" fill="#BA55D3" transform="rotate(-45 235 235)"/>
        <ellipse cx="165" cy="235" rx="35" ry="35" fill="#BA55D3" transform="rotate(45 165 235)"/>
        <text x="200" y="350" text-anchor="middle" font-size="40">🌺</text>
      </svg>
    `),
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
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize Audio and Speech using project's function
  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

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

    // Draw the image on canvas first
    const imgAspectRatio = img.width / img.height;
    let drawWidth = size;
    let drawHeight = size;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspectRatio > 1) {
      drawHeight = size / imgAspectRatio;
      offsetY = (size - drawHeight) / 2;
    } else {
      drawWidth = size * imgAspectRatio;
      offsetX = (size - drawWidth) / 2;
    }

    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    for (let row = 0; row < gridSide; row++) {
      for (let col = 0; col < gridSide; col++) {
        const pieceCanvas = document.createElement('canvas');
        pieceCanvas.width = pieceSize + 4;
        pieceCanvas.height = pieceSize + 4;
        const pieceCtx = pieceCanvas.getContext('2d');
        
        if (!pieceCtx) continue;

        pieceCtx.imageSmoothingEnabled = true;
        pieceCtx.imageSmoothingQuality = 'high';

        // Background
        pieceCtx.fillStyle = '#f8f8f8';
        pieceCtx.fillRect(0, 0, pieceCanvas.width, pieceCanvas.height);

        // Draw piece from main canvas
        const srcX = (col * size) / gridSide;
        const srcY = (row * size) / gridSide;
        const srcWidth = size / gridSide;
        const srcHeight = size / gridSide;

        pieceCtx.drawImage(
          canvas,
          srcX, srcY, srcWidth, srcHeight,
          2, 2, pieceSize, pieceSize
        );

        // Border
        pieceCtx.strokeStyle = '#ddd';
        pieceCtx.lineWidth = 2;
        pieceCtx.strokeRect(1, 1, pieceSize + 2, pieceSize + 2);

        const position = row * gridSide + col;
        pieces.push({
          id: position,
          canvas: pieceCanvas,
          position: position,
          row,
          col,
          correctPosition: position
        });
      }
    }

    return pieces.sort(() => Math.random() - 0.5);
  }, []);

  // Success and error feedback functions
  const showSuccessFeedback = async (message: string) => {
    setFeedbackMessage(message);
    setFeedbackType('success');
    
    // Use project's success sound function
    playSuccessSound(audioContext);
    
    // Use project's speech function
    if (speechEnabled) {
      await speakHebrew(message);
    }
    
    setTimeout(() => {
      setFeedbackMessage('');
      setFeedbackType('');
    }, 2000);
  };

  const showErrorFeedback = async (message: string) => {
    setFeedbackMessage(message);
    setFeedbackType('error');
    
    // Use project's speech function for errors too
    if (speechEnabled) {
      await speakHebrew(message);
    }
    
    setTimeout(() => {
      setFeedbackMessage('');
      setFeedbackType('');
    }, 1500);
  };

  // התחלת פאזל חדש
  const startPuzzle = useCallback(async (puzzle: SimplePuzzle) => {
    console.log('Starting puzzle:', puzzle.name);
    setIsLoading(true);
    setSelectedPuzzle(puzzle);
    
    // Announce puzzle selection
    if (speechEnabled) {
      await speakHebrew(`בחרת את ${puzzle.name}! טוען את הפאזל...`);
    }
    
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = async () => {
      console.log('Image loaded successfully');
      try {
        const puzzlePieces = createPuzzlePieces(img, puzzle);
        console.log('Created puzzle pieces:', puzzlePieces.length);
        setPieces(puzzlePieces);
        setSolution(new Array(puzzle.gridSize).fill(null));
        setScore(0);
        setIsComplete(false);
        setIsLoading(false);
        
        // Announce puzzle ready
        if (speechEnabled) {
          await speakHebrew(`הפאזל מוכן! זה פאזל ${puzzle.difficulty === 'easy' ? 'קל' : puzzle.difficulty === 'medium' ? 'בינוני' : 'קשה'} עם ${puzzle.gridSize} חלקים. בואו נתחיל!`);
        }
      } catch (error) {
        console.error('Error creating puzzle pieces:', error);
        setIsLoading(false);
        await showErrorFeedback('שגיאה ביצירת הפאזל');
      }
    };
    
    img.onerror = async (error) => {
      console.error('Failed to load image:', error);
      console.log('Trying fallback URL...');
      
      // נסה עם URL חלופי
      const fallbackUrls = [
        `https://picsum.photos/400/400?random=${puzzle.id}`,
        `https://via.placeholder.com/400x400/FF69B4/FFFFFF?text=${puzzle.emoji}`,
        // אם יש לך תמונות מקומיות, תוכל להוסיף אותן כאן
      ];
      
      const tryFallback = async (index: number) => {
        if (index >= fallbackUrls.length) {
          setIsLoading(false);
          await showErrorFeedback('שגיאה בטעינת התמונה');
          return;
        }
        
        const fallbackImg = new window.Image();
        fallbackImg.crossOrigin = 'anonymous';
        
        fallbackImg.onload = async () => {
          console.log('Fallback image loaded');
          try {
            const puzzlePieces = createPuzzlePieces(fallbackImg, puzzle);
            setPieces(puzzlePieces);
            setSolution(new Array(puzzle.gridSize).fill(null));
            setScore(0);
            setIsComplete(false);
            setIsLoading(false);
            
            if (speechEnabled) {
              await speakHebrew(`הפאזל מוכן! בואו נתחיל!`);
            }
          } catch (error) {
            console.error('Error with fallback:', error);
            setIsLoading(false);
            await showErrorFeedback('שגיאה ביצירת הפאזל');
          }
        };
        
        fallbackImg.onerror = () => {
          console.log(`Fallback ${index + 1} failed, trying next...`);
          tryFallback(index + 1);
        };
        
        fallbackImg.src = fallbackUrls[index];
      };
      
      tryFallback(0);
    };
    
    console.log('Loading image from:', puzzle.imageUrl);
    img.src = puzzle.imageUrl;
  }, [createPuzzlePieces, speechEnabled, audioContext]);

  // טיפול בגרירת חלקים
  const handleDragStart = (e: React.DragEvent, piece: PuzzlePiece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedPiece || !selectedPuzzle) return;

    // בדיקה אם המקום כבר תפוס
    if (solution[targetIndex] !== null) {
      await showErrorFeedback('המקום תפוס! נסה מקום אחר');
      setDraggedPiece(null);
      return;
    }

    // בדיקה אם זה המקום הנכון
    if (draggedPiece.correctPosition === targetIndex) {
      // מיקום נכון!
      const newSolution = [...solution];
      newSolution[targetIndex] = draggedPiece;
      setSolution(newSolution);
      
      // הסרת החלק מהרשימה
      setPieces(prev => prev.filter(p => p.id !== draggedPiece.id));
      
      setScore(prev => prev + 10);
      await showSuccessFeedback(`כל הכבוד! החלק במקום הנכון!`);
      
      // בדיקה אם הפאזל הושלם
      if (newSolution.filter(Boolean).length === selectedPuzzle.gridSize) {
        setIsComplete(true);
        const finalScore = score + 60; // +10 for this piece + 50 bonus
        setScore(finalScore);
        
        // Completion celebration
        playSuccessSound(audioContext);
        if (speechEnabled) {
          await speakHebrew(`מזל טוב! השלמת את ${selectedPuzzle.name}! הניקוד הסופי שלך הוא ${finalScore} נקודות!`);
        }
        await showSuccessFeedback(`הפאזל הושלם! מדהים!`);
      }
    } else {
      // מיקום שגוי
      await showErrorFeedback(`נסה שוב! החלק לא במקום הנכון`);
    }
    
    setDraggedPiece(null);
  };

  // איפוס משחק
  const resetGame = async () => {
    if (selectedPuzzle) {
      if (speechEnabled) {
        await speakHebrew('מערבב את החלקים מחדש!');
      }
      await startPuzzle(selectedPuzzle);
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
            {speechEnabled && (
              <p className="text-sm text-green-600 mt-2">
                🔊 מצב שמע פעיל - תשמע הודעות קוליות במהלך המשחק
              </p>
            )}
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
          <p className="text-purple-600 mt-2">מכין את {selectedPuzzle.name}</p>
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

        {/* Use project's GameHeader component */}
        <GameHeader
          score={score}
          level={Math.floor(score / 30) + 1}
          onHome={goHome}
          onReset={resetGame}
          scoreColor="text-purple-800"
          levelColor="text-purple-600"
        />

        {/* מידע על הפאזל הנוכחי */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-800 mb-2">{selectedPuzzle.name}</h2>
          <div className="flex items-center justify-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              selectedPuzzle.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              selectedPuzzle.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {selectedPuzzle.difficulty === 'easy' ? 'קל' : 
               selectedPuzzle.difficulty === 'medium' ? 'בינוני' : 'קשה'}
            </span>
            <span className="text-purple-600">
              {selectedPuzzle.gridSize} חלקים
            </span>
          </div>
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
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                כל הכבוד!
              </h2>
              <p className="text-lg text-white mb-2">
                השלמת את {selectedPuzzle.name}!
              </p>
              <div className="text-2xl font-bold text-white mb-6">
                ניקוד סופי: {score} 🏆
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