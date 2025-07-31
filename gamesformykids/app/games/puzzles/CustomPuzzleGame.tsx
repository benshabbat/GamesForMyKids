"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Trophy, Timer, Star, Upload, Home, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { speakHebrew, initSpeechAndAudio } from '@/lib/utils/enhancedSpeechUtils';
import { playSuccessSound } from '@/lib/utils/gameUtils';

interface PuzzlePiece {
  id: number;
  canvas: HTMLCanvasElement;
  correctRow: number;
  correctCol: number;
  currentRow: number | null;
  currentCol: number | null;
  isPlaced: boolean;
  isCorrect: boolean;
}

export default function CustomPuzzleGame() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<PuzzlePiece | null>(null);
  const [completedPieces, setCompletedPieces] = useState(new Set<number>());
  const [gameStarted, setGameStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [difficulty, setDifficulty] = useState(9);
  const [score, setScore] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Debug effect to track pieces state changes
  useEffect(() => {
    console.log('🔍 Pieces state changed:', pieces.map(p => ({
      id: p.id,
      currentPos: p.currentRow !== null ? `(${p.currentRow}, ${p.currentCol})` : 'none',
      correctPos: `(${p.correctRow}, ${p.correctCol})`,
      isCorrect: p.isCorrect,
      isPlaced: p.isPlaced
    })));
  }, [pieces]);

  // Initialize Audio and Speech
  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

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

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const createPuzzlePieces = useCallback((img: HTMLImageElement, gridSize: number): PuzzlePiece[] => {
    const canvas = canvasRef.current;
    if (!canvas) return [];
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];
    
    const canvasSize = 600;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    // Calculate image dimensions
    const imgAspectRatio = img.width / img.height;
    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;
    
    if (imgAspectRatio > 1) {
      drawWidth = canvasSize;
      drawHeight = canvasSize / imgAspectRatio;
      offsetX = 0;
      offsetY = (canvasSize - drawHeight) / 2;
    } else {
      drawHeight = canvasSize;
      drawWidth = canvasSize * imgAspectRatio;
      offsetX = (canvasSize - drawWidth) / 2;
      offsetY = 0;
    }
    
    // Draw the full image
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    const cols = Math.sqrt(gridSize);
    const rows = Math.sqrt(gridSize);
    const newPieces: PuzzlePiece[] = [];
    
    console.log(`=== CREATING PUZZLE ===`);
    console.log(`Grid size: ${gridSize} pieces (${rows}x${cols})`);
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const pieceCanvas = document.createElement('canvas');
        const finalPieceSize = 120;
        pieceCanvas.width = finalPieceSize;
        pieceCanvas.height = finalPieceSize;
        const pieceCtx = pieceCanvas.getContext('2d');
        
        if (!pieceCtx) continue;
        
        pieceCtx.imageSmoothingEnabled = true;
        pieceCtx.imageSmoothingQuality = 'high';
        
        // Background
        pieceCtx.fillStyle = '#ffffff';
        pieceCtx.fillRect(0, 0, finalPieceSize, finalPieceSize);
        
        // Calculate source rectangle
        const srcX = offsetX + (col * drawWidth) / cols;
        const srcY = offsetY + (row * drawHeight) / rows;
        const srcWidth = drawWidth / cols;
        const srcHeight = drawHeight / rows;
        
        // Draw the piece
        pieceCtx.drawImage(
          canvas,
          srcX, srcY, srcWidth, srcHeight,
          5, 5, finalPieceSize - 10, finalPieceSize - 10
        );
        
        // Add border
        pieceCtx.strokeStyle = '#cccccc';
        pieceCtx.lineWidth = 3;
        pieceCtx.strokeRect(2, 2, finalPieceSize - 4, finalPieceSize - 4);
        
        const pieceId = row * cols + col;
        
        console.log(`Creating piece ${pieceId} at position (${row}, ${col})`);
        
        newPieces.push({
          id: pieceId,
          canvas: pieceCanvas,
          correctRow: row,
          correctCol: col,
          currentRow: null,
          currentCol: null,
          isPlaced: false,
          isCorrect: false
        });
      }
    }
    
    console.log(`Created ${newPieces.length} pieces:`);
    newPieces.forEach(piece => {
      console.log(`Piece ${piece.id}: correct position (${piece.correctRow}, ${piece.correctCol})`);
    });
    
    // Shuffle pieces
    const shuffled = [...newPieces].sort(() => Math.random() - 0.5);
    console.log(`Shuffled pieces order:`, shuffled.map(p => p.id));
    return shuffled;
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = async () => {
          setImage(img);
          const newPieces = createPuzzlePieces(img, difficulty);
          setPieces(newPieces);
          setCompletedPieces(new Set());
          setIsCompleted(false);
          setGameStarted(false);
          setTimer(0);
          setScore(0);
          
          if (speechEnabled) {
            await speakHebrew('תמונה נטענה בהצלחה! כעת תוכלו להתחיל לשחק');
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const startGame = async () => {
    setGameStarted(true);
    setTimer(0);
    setScore(0);
    
    if (speechEnabled) {
      await speakHebrew('בואו נתחיל לבנות את הפאזל! מצאו את החלקים הנכונים');
    }
  };

  const resetGame = async () => {
    if (image) {
      const newPieces = createPuzzlePieces(image, difficulty);
      setPieces(newPieces);
      setCompletedPieces(new Set());
      setIsCompleted(false);
      setGameStarted(false);
      setTimer(0);
      setScore(0);
      
      if (speechEnabled) {
        await speakHebrew('המשחק אופס! בואו ננסה שוב');
      }
    }
  };

  const goHome = () => {
    window.location.href = '/';
  };

  const handleDragStart = (e: React.DragEvent, piece: PuzzlePiece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = useCallback(async (e: React.DragEvent, targetRow: number, targetCol: number) => {
    e.preventDefault();
    
    if (!draggedPiece) return;
    
    console.log(`=== DROP DEBUG ===`);
    console.log(`Piece ID: ${draggedPiece.id}`);
    console.log(`Piece correct position: (${draggedPiece.correctRow}, ${draggedPiece.correctCol})`);
    console.log(`Target position: (${targetRow}, ${targetCol})`);
    console.log(`Grid size: ${Math.sqrt(difficulty)} x ${Math.sqrt(difficulty)}`);
    
    // Check if piece is in correct position
    const isCorrectPosition = draggedPiece.correctRow === targetRow && draggedPiece.correctCol === targetCol;
    console.log(`Is correct position: ${isCorrectPosition}`);
    
    // Find if there's already a piece in this position
    const existingPiece = pieces.find(p => p.currentRow === targetRow && p.currentCol === targetCol);
    console.log(`Existing piece at target: ${existingPiece?.id || 'none'}`);
    
    // If there's a correct piece already there, don't allow placement
    if (existingPiece && existingPiece.isCorrect && existingPiece.id !== draggedPiece.id) {
      await showErrorFeedback('המקום תפוס! נסו מקום אחר');
      setDraggedPiece(null);
      return;
    }
    
    // Update pieces state
    setPieces(prevPieces => {
      const newPieces = prevPieces.map(piece => {
        // Clear the target position from any incorrect piece
        if (piece.currentRow === targetRow && piece.currentCol === targetCol && piece.id !== draggedPiece.id) {
          console.log(`Clearing piece ${piece.id} from position (${targetRow}, ${targetCol})`);
          return {
            ...piece,
            currentRow: null,
            currentCol: null,
            isPlaced: false,
            isCorrect: false
          };
        }
        
        // Update the dragged piece
        if (piece.id === draggedPiece.id) {
          console.log(`Placing piece ${piece.id} at position (${targetRow}, ${targetCol}), correct: ${isCorrectPosition}`);
          return {
            ...piece,
            currentRow: targetRow,
            currentCol: targetCol,
            isPlaced: true,
            isCorrect: isCorrectPosition
          };
        }
        
        return piece;
      });
      
      // Log final state for debugging
      console.log(`Final pieces state after update:`, newPieces.map(p => ({
        id: p.id,
        currentPos: p.currentRow !== null ? `(${p.currentRow}, ${p.currentCol})` : 'none',
        correctPos: `(${p.correctRow}, ${p.correctCol})`,
        isCorrect: p.isCorrect,
        isPlaced: p.isPlaced
      })));
      
      return newPieces;
    });
    
    if (isCorrectPosition) {
      // Add to completed pieces
      setCompletedPieces(prev => {
        const newSet = new Set(prev);
        newSet.add(draggedPiece.id);
        console.log(`Completed pieces: ${Array.from(newSet)} (${newSet.size}/${difficulty})`);
        
        // Check if puzzle is complete
        if (newSet.size === difficulty) {
          setIsCompleted(true);
          setGameStarted(false);
          const bonusScore = Math.max(0, 300 - timer);
          const finalScore = score + 10 + 50 + bonusScore;
          setScore(finalScore);
          
          setTimeout(async () => {
            playSuccessSound(audioContext);
            await showSuccessFeedback(`פאזל הושלם! מדהים!`);
            if (speechEnabled) {
              await speakHebrew(`מזל טוב! השלמתם את הפאזל בזמן ${formatTime(timer)}! הניקוד שלכם הוא ${finalScore} נקודות!`);
            }
          }, 100);
        }
        
        return newSet;
      });
      
      setScore(prev => prev + 10);
      playSuccessSound(audioContext);
      await showSuccessFeedback(`כל הכבוד! החלק במקום הנכון!`);
    } else {
      await showErrorFeedback(`נסו שוב! החלק לא במקום הנכון`);
    }
    
    setDraggedPiece(null);
  }, [draggedPiece, pieces, difficulty, timer, score, speechEnabled, audioContext, completedPieces]);

  const showSuccessFeedback = async (message: string) => {
    setFeedbackMessage(message);
    setFeedbackType('success');
    
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
    
    if (speechEnabled) {
      await speakHebrew(message);
    }
    
    setTimeout(() => {
      setFeedbackMessage('');
      setFeedbackType('');
    }, 1500);
  };

  const cols = Math.sqrt(difficulty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goHome}
            className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            חזרה
          </button>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white">ניקוד: {score}</div>
            <div className="text-lg text-purple-100">רמה: {Math.floor(score / 50) + 1}</div>
          </div>
          
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            מחדש
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            🧩 משחק הפאזל הקסום! 🧩
          </h1>
          <p className="text-white text-lg">הביאו תמונה ותבנו פאזל מדהים!</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <Upload className="w-5 h-5" />
              בחרו תמונה
            </button>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="px-4 py-3 rounded-xl border-2 border-gray-300 text-lg font-semibold"
              disabled={gameStarted}
            >
              <option value={4}>קל (2x2)</option>
              <option value={9}>בינוני (3x3)</option>
              <option value={16}>קשה (4x4)</option>
            </select>

            {image && !gameStarted && (
              <button
                onClick={startGame}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                🚀 התחילו לשחק!
              </button>
            )}
          </div>

          {/* Game Stats */}
          {gameStarted && (
            <div className="flex justify-center items-center gap-8 mt-4">
              <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
                <Timer className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-800">{formatTime(timer)}</span>
              </div>
              <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-green-800">
                  {completedPieces.size}/{difficulty}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Feedback Message */}
        {feedbackMessage && (
          <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg animate-bounce ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-orange-500'
          }`}>
            {feedbackMessage}
          </div>
        )}

        {/* Success Message */}
        {isCompleted && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-6 mb-6 text-center shadow-lg animate-bounce">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">כל הכבוד! סיימתם את הפאזל!</h2>
            <p className="text-white text-lg">זמן: {formatTime(timer)} ⏱️</p>
            <p className="text-white text-lg">ניקוד: {score} 🏆</p>
            <Trophy className="w-12 h-12 text-yellow-200 mx-auto mt-2" />
          </div>
        )}

        {image && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Puzzle Grid */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
                🎯 מקום הפאזל
              </h3>
              <div 
                className="grid gap-1 mx-auto bg-gray-200 p-2 rounded-lg"
                style={{ 
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  maxWidth: '400px'
                }}
              >
                {Array.from({ length: difficulty }, (_, index) => {
                  const row = Math.floor(index / cols);
                  const col = index % cols;
                  const placedPiece = pieces.find(p => p.currentRow === row && p.currentCol === col);
                  
                  if (placedPiece) {
                    console.log(`📍 Grid ${index} (${row},${col}) has piece ${placedPiece.id} - isCorrect: ${placedPiece.isCorrect}`);
                  }
                  
                  return (
                    <div
                      key={`grid-${index}-${placedPiece?.id || 'empty'}`}
                      className="aspect-square border-2 border-gray-300 rounded-lg relative overflow-hidden bg-gray-100 hover:bg-gray-50 transition-colors"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, row, col)}
                      title={`Position: ${row},${col} - Piece: ${placedPiece?.id || 'empty'}`}
                    >
                      {placedPiece && (
                        <>
                          <Image
                            src={placedPiece.canvas.toDataURL()}
                            alt={`Piece ${placedPiece.id} at ${row},${col}`}
                            width={100}
                            height={100}
                            className={`w-full h-full object-cover ${
                              placedPiece.isCorrect ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400'
                            }`}
                            unoptimized
                          />
                        </>
                      )}
                      {placedPiece && placedPiece.isCorrect && (
                        <div className="absolute top-1 right-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        </div>
                      )}
                      {/* Debug info - removable for production */}
                      <div className="absolute bottom-0 left-0 text-xs bg-black bg-opacity-50 text-white px-1">
                        {row},{col}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Piece Bank */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
                🧩 חתיכות הפאזל
              </h3>
              <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {pieces
                  .filter(piece => !piece.isPlaced)
                  .map((piece) => {
                    console.log(`🧩 Rendering piece ${piece.id} in bank - isCorrect: ${piece.isCorrect}, isPlaced: ${piece.isPlaced}`);
                    return (
                      <div
                        key={`bank-piece-${piece.id}`}
                        className="aspect-square cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
                        draggable
                        onDragStart={(e) => handleDragStart(e, piece)}
                      >
                        <Image
                          src={piece.canvas.toDataURL()}
                          alt={`Puzzle piece ${piece.id}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover rounded-lg border-2 border-gray-300 hover:border-blue-400 shadow-md"
                          unoptimized
                        />
                      </div>
                    );
                  })}
              </div>
              {pieces.filter(piece => !piece.isPlaced).length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Trophy className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
                  <p>כל החתיכות במקום!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hidden canvas */}
        <canvas ref={canvasRef} className="hidden" />
        
        {!image && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-white text-xl font-semibold">
              העלו תמונה כדי להתחיל לשחק!
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 mx-auto font-bold text-lg"
            >
              <Upload className="w-6 h-6" />
              בחרו תמונה מהמחשב שלכם
            </button>
          </div>
        )}
      </div>
    </div>
  );
}