"use client";

import React, { useState, useCallback, useEffect } from 'react';
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
    name: "פאזל פרפר צבעוני",
    emoji: "🦋",
    color: "#FF4500",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 4,
    name: "פאזל פרח יפה",
    emoji: "🌺",
    color: "#9932CC",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 5,
    name: "פאזל דג צבעוני",
    emoji: "🐠",
    color: "#00CED1",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop",
    gridSize: 4, // 2x2
    difficulty: "easy"
  },
  {
    id: 6,
    name: "פאזל בית צבעוני",
    emoji: "🏠",
    color: "#8B4513",
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=400&fit=crop",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 7,
    name: "פאזל רכב מרוצים",
    emoji: "🏎️",
    color: "#FF0000",
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=400&fit=crop",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 8,
    name: "פאזל עוגה יומולדת",
    emoji: "🎂",
    color: "#FFB6C1",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
    gridSize: 4, // 2x2
    difficulty: "easy"
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

  // Initialize Audio and Speech using project's function
  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

  // פונקציה ליצירת חלקי פאזל מתמונה
  const createPuzzlePieces = useCallback((img: HTMLImageElement, puzzle: SimplePuzzle): PuzzlePiece[] => {
    console.log('=== CREATE PUZZLE PIECES ===');
    console.log('Image:', img.width, 'x', img.height);
    console.log('Puzzle:', puzzle.name, 'GridSize:', puzzle.gridSize);
    
    // Create a temporary canvas instead of using canvasRef
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.error('Canvas context not found');
      return [];
    }

    const size = 400;
    canvas.width = size;
    canvas.height = size;

    const gridSide = Math.sqrt(puzzle.gridSize);
    const pieceSize = size / gridSide;
    const pieces: PuzzlePiece[] = [];

    console.log('Grid side:', gridSide, 'Piece size:', pieceSize);

    try {
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Draw background
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, size, size);

      // Draw the image on canvas first
      const imgAspectRatio = img.width / img.height;
      let drawWidth = size;
      let drawHeight = size;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspectRatio > 1) {
        drawHeight = size / imgAspectRatio;
        offsetY = (size - drawHeight) / 2;
      } else if (imgAspectRatio < 1) {
        drawWidth = size * imgAspectRatio;
        offsetX = (size - drawWidth) / 2;
      }

      console.log('Drawing image:', drawWidth, 'x', drawHeight, 'at offset:', offsetX, offsetY);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      console.log('Creating pieces for grid:', gridSide, 'x', gridSide);
      for (let row = 0; row < gridSide; row++) {
        for (let col = 0; col < gridSide; col++) {
          console.log('Creating piece for row:', row, 'col:', col);
          
          const pieceCanvas = document.createElement('canvas');
          const finalPieceSize = Math.floor(pieceSize) + 4;
          pieceCanvas.width = finalPieceSize;
          pieceCanvas.height = finalPieceSize;
          const pieceCtx = pieceCanvas.getContext('2d');
          
          if (!pieceCtx) {
            console.error('Piece context not found for row:', row, 'col:', col);
            continue;
          }

          pieceCtx.imageSmoothingEnabled = true;
          pieceCtx.imageSmoothingQuality = 'high';

          // Background
          pieceCtx.fillStyle = '#ffffff';
          pieceCtx.fillRect(0, 0, finalPieceSize, finalPieceSize);

          // Draw piece from main canvas
          const srcX = col * pieceSize;
          const srcY = row * pieceSize;
          const srcWidth = pieceSize;
          const srcHeight = pieceSize;

          console.log('Drawing piece from:', srcX, srcY, srcWidth, srcHeight, 'to:', 2, 2, finalPieceSize - 4, finalPieceSize - 4);

          pieceCtx.drawImage(
            canvas,
            srcX, srcY, srcWidth, srcHeight,
            2, 2, finalPieceSize - 4, finalPieceSize - 4
          );

          // Add nice border with shadow effect
          pieceCtx.strokeStyle = '#ddd';
          pieceCtx.lineWidth = 2;
          pieceCtx.strokeRect(1, 1, finalPieceSize - 2, finalPieceSize - 2);
          
          // Add inner highlight
          pieceCtx.strokeStyle = '#fff';
          pieceCtx.lineWidth = 1;
          pieceCtx.strokeRect(2, 2, finalPieceSize - 4, finalPieceSize - 4);

          const position = row * gridSide + col;
          const piece: PuzzlePiece = {
            id: position,
            canvas: pieceCanvas,
            position: position,
            row,
            col,
            correctPosition: position
          };
          
          pieces.push(piece);
          console.log('Created piece:', position, 'for position:', row, col);
        }
      }

      console.log('=== FINAL RESULT ===');
      console.log(`Successfully created ${pieces.length} puzzle pieces for ${puzzle.name}`);
      console.log('Expected pieces:', puzzle.gridSize);
      console.log('Pieces created:', pieces.length > 0 ? 'SUCCESS' : 'FAILED');
      
      if (pieces.length > 0) {
        console.log('First piece canvas dimensions:', pieces[0]?.canvas?.width, 'x', pieces[0]?.canvas?.height);
        console.log('Sample piece data URL length:', pieces[0]?.canvas?.toDataURL()?.length || 0);
        console.log('All pieces:', pieces.map(p => `Piece ${p.id}: (${p.row},${p.col})`));
      } else {
        console.error('NO PIECES CREATED! Debug info:');
        console.error('Grid side:', gridSide);
        console.error('Expected iterations:', gridSide * gridSide);
        console.error('Canvas available:', !!canvas);
        console.error('Context available:', !!ctx);
      }
      
      const shuffledPieces = pieces.sort(() => Math.random() - 0.5);
      console.log('Returning shuffled pieces:', shuffledPieces.length);
      return shuffledPieces;
    } catch (error) {
      console.error('Error in createPuzzlePieces:', error);
      console.error('Error details:', error);
      return [];
    }
  }, []);

  // Success and error feedback functions
  const showSuccessFeedback = useCallback(async (message: string) => {
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
  }, [audioContext, speechEnabled]);

  const showErrorFeedback = useCallback(async (message: string) => {
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
  }, [speechEnabled]);

  // התחלת פאזל חדש
  const startPuzzle = useCallback(async (puzzle: SimplePuzzle) => {
    console.log('=== STARTING PUZZLE ===');
    console.log('Selected puzzle:', puzzle.name, 'GridSize:', puzzle.gridSize);
    setIsLoading(true);
    setSelectedPuzzle(puzzle);
    
    // Announce puzzle selection
    if (speechEnabled) {
      await speakHebrew(`בחרת את ${puzzle.name}! טוען את הפאזל...`);
    }
    
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = async () => {
      console.log('Image loaded successfully, dimensions:', img.width, 'x', img.height);
      try {
        const puzzlePieces = createPuzzlePieces(img, puzzle);
        console.log('=== PUZZLE PIECES RESULT ===');
        console.log('Created puzzle pieces:', puzzlePieces.length);
        console.log('Expected pieces:', puzzle.gridSize);
        console.log('Pieces match expected?', puzzlePieces.length === puzzle.gridSize);
        
        if (puzzlePieces.length > 0) {
          console.log('Sample piece info:', {
            id: puzzlePieces[0].id,
            position: puzzlePieces[0].position,
            hasCanvas: !!puzzlePieces[0].canvas,
            canvasSize: puzzlePieces[0].canvas ? `${puzzlePieces[0].canvas.width}x${puzzlePieces[0].canvas.height}` : 'none'
          });
        }
        
        setPieces(puzzlePieces);
        setSolution(new Array(puzzle.gridSize).fill(null));
        setScore(0);
        setIsComplete(false);
        setIsLoading(false);
        
        console.log('State updated, pieces in state:', puzzlePieces.length);
        
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
  }, [createPuzzlePieces, speechEnabled, showErrorFeedback]);

  // טיפול בגרירת חלקים
  const handleDragStart = useCallback((e: React.DragEvent, piece: PuzzlePiece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', piece.id.toString());
    
    // Add visual feedback
    const dragImage = piece.canvas;
    e.dataTransfer.setDragImage(dragImage, dragImage.width / 2, dragImage.height / 2);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedPiece || !selectedPuzzle) return;

    console.log(`Attempting to drop piece ${draggedPiece.id} at position ${targetIndex}, correct position is ${draggedPiece.correctPosition}`);

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
      
      const newScore = score + 10;
      setScore(newScore);
      await showSuccessFeedback(`כל הכבוד! החלק במקום הנכון! 🎉`);
      
      // בדיקה אם הפאזל הושלם
      const completedPieces = newSolution.filter(Boolean).length;
      if (completedPieces === selectedPuzzle.gridSize) {
        setIsComplete(true);
        const finalScore = newScore + 50; // בונוס השלמה
        setScore(finalScore);
        
        // Completion celebration
        playSuccessSound(audioContext);
        if (speechEnabled) {
          await speakHebrew(`מזל טוב! השלמת את ${selectedPuzzle.name}! הניקוד הסופי שלך הוא ${finalScore} נקודות!`);
        }
        await showSuccessFeedback(`🎊 הפאזל הושלם! מדהים! 🎊`);
      }
    } else {
      // מיקום שגוי
      await showErrorFeedback(`נסה שוב! זה לא המקום הנכון לחלק הזה 🤔`);
    }
    
    setDraggedPiece(null);
  }, [draggedPiece, selectedPuzzle, solution, score, showErrorFeedback, showSuccessFeedback, audioContext, speechEnabled]);

  // איפוס משחק
  const resetGame = useCallback(async () => {
    if (selectedPuzzle) {
      if (speechEnabled) {
        await speakHebrew('מערבב את החלקים מחדש!');
      }
      await startPuzzle(selectedPuzzle);
    }
  }, [selectedPuzzle, speechEnabled, startPuzzle]);

  const goHome = useCallback(() => {
    setSelectedPuzzle(null);
    setPieces([]);
    setSolution([]);
    setScore(0);
    setIsComplete(false);
  }, []);

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
              className="grid gap-2 mx-auto bg-gray-200 p-4 rounded-lg shadow-inner"
              style={{ 
                gridTemplateColumns: `repeat(${gridSide}, 1fr)`,
                maxWidth: '400px',
                direction: 'ltr' // Force left-to-right layout for proper grid positioning
              }}
            >
              {solution.map((piece, index) => (
                <div
                  key={index}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`aspect-square border-2 rounded-lg transition-all duration-300 flex items-center justify-center overflow-hidden relative ${
                    piece 
                      ? 'border-green-400 bg-green-50 shadow-md' 
                      : 'border-dashed border-gray-400 bg-gray-50 hover:bg-blue-50 hover:border-blue-400'
                  }`}
                  title={piece ? `מקום ${index + 1} - תפוס` : `מקום ${index + 1} - ריק`}
                >
                  {piece && (
                    <>
                      <Image
                        src={piece.canvas.toDataURL()}
                        alt={`פאזל ${piece.id}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-lg"
                        unoptimized
                      />
                      <div className="absolute top-1 right-1 bg-green-500 rounded-full p-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </>
                  )}
                  {!piece && (
                    <div className="text-gray-400 text-2xl font-bold">
                      {index + 1}
                    </div>
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
            
            {/* טיפים */}
            {pieces.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-3 mb-4 text-center">
                <p className="text-sm text-blue-800 font-medium">
                  💡 טיפ: גררו כל חלק למקום הנכון שלו בלוח הפאזל
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-4 min-h-[300px]">
              {pieces.map((piece) => (
                <div
                  key={piece.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, piece)}
                  className="aspect-square cursor-move hover:scale-110 transition-transform border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 flex items-center justify-center bg-white shadow-sm hover:shadow-md overflow-hidden group"
                  title={`חלק ${piece.id + 1} - גררו אותי למקום הנכון!`}
                >
                  <Image
                    src={piece.canvas.toDataURL()}
                    alt={`חלק פאזל ${piece.id}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-lg group-hover:brightness-110"
                    unoptimized
                  />
                </div>
              ))}
            </div>
            {pieces.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Trophy className="w-12 h-12 mx-auto mb-2 text-yellow-500 animate-bounce" />
                <p className="text-lg font-bold text-green-600">כל החתיכות במקום! 🎉</p>
              </div>
            )}
          </div>
        </div>

        {/* מסך ניצחון */}
        {isComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl animate-pulse">
              <div className="text-8xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                כל הכבוד!
              </h2>
              <p className="text-xl text-white mb-2 drop-shadow">
                השלמת את {selectedPuzzle.name}!
              </p>
              <div className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
                ניקוד סופי: {score} 🏆
              </div>
              <div className="bg-white/20 rounded-2xl p-4 mb-6">
                <div className="text-white text-lg">
                  רמת קושי: <span className="font-bold">
                    {selectedPuzzle.difficulty === 'easy' ? 'קל 😊' : 
                     selectedPuzzle.difficulty === 'medium' ? 'בינוני 🤔' : 'קשה 😤'}
                  </span>
                </div>
                <div className="text-white text-lg">
                  חלקים: <span className="font-bold">{selectedPuzzle.gridSize}</span>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-white text-orange-600 rounded-full hover:bg-gray-100 font-bold transition-all transform hover:scale-105 shadow-lg"
                >
                  🔄 שוב
                </button>
                <button
                  onClick={goHome}
                  className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 font-bold transition-all transform hover:scale-105 shadow-lg"
                >
                  🧩 פאזל אחר
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No need for hidden canvas anymore - we create canvases dynamically */}
      </div>
    </div>
  );
}