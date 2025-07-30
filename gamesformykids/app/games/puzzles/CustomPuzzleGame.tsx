"use client";

import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Trophy, Timer, Star, Upload } from 'lucide-react';
import GameHeader from '@/components/shared/GameHeader';
import Image from 'next/image';

interface PuzzlePiece {
  id: number;
  canvas: HTMLCanvasElement;
  correctRow: number;
  correctCol: number;
  currentRow: number | null;
  currentCol: number | null;
  isPlaced: boolean;
}

export default function CustomPuzzleGame() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<PuzzlePiece | null>(null);
  const [completedPieces, setCompletedPieces] = useState(new Set<number>());
  const [gameStarted, setGameStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [difficulty, setDifficulty] = useState(9); // 3x3 by default
  const [score, setScore] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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

  const createPuzzlePieces = (img: HTMLImageElement, gridSize: number): PuzzlePiece[] => {
    const canvas = canvasRef.current;
    if (!canvas) return [];
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];
    
    // Set canvas size to be square for consistent puzzle pieces
    const canvasSize = 600;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    // Calculate image dimensions to fit in square canvas while maintaining aspect ratio
    const imgAspectRatio = img.width / img.height;
    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;
    
    if (imgAspectRatio > 1) {
      // Image is wider than tall
      drawWidth = canvasSize;
      drawHeight = canvasSize / imgAspectRatio;
      offsetX = 0;
      offsetY = (canvasSize - drawHeight) / 2;
    } else {
      // Image is taller than wide or square
      drawHeight = canvasSize;
      drawWidth = canvasSize * imgAspectRatio;
      offsetX = (canvasSize - drawWidth) / 2;
      offsetY = 0;
    }
    
    // Draw the full image on canvas first for reference
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    const cols = Math.sqrt(gridSize);
    const rows = Math.sqrt(gridSize);
    
    const newPieces: PuzzlePiece[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Create a canvas for each piece
        const pieceCanvas = document.createElement('canvas');
        const finalPieceSize = 120; // Fixed size for all pieces
        pieceCanvas.width = finalPieceSize;
        pieceCanvas.height = finalPieceSize;
        const pieceCtx = pieceCanvas.getContext('2d');
        
        if (!pieceCtx) continue;
        
        // Enable high quality rendering
        pieceCtx.imageSmoothingEnabled = true;
        pieceCtx.imageSmoothingQuality = 'high';
        
        // Add background
        pieceCtx.fillStyle = '#ffffff';
        pieceCtx.fillRect(0, 0, finalPieceSize, finalPieceSize);
        
        // Calculate source rectangle from the original image
        const srcX = (col * img.width) / cols;
        const srcY = (row * img.height) / rows;
        const srcWidth = img.width / cols;
        const srcHeight = img.height / rows;
        
        // Draw the piece, scaling it to fit the fixed piece size
        pieceCtx.drawImage(
          img,
          srcX, srcY, srcWidth, srcHeight,
          5, 5, finalPieceSize - 10, finalPieceSize - 10
        );
        
        // Add border
        pieceCtx.strokeStyle = '#cccccc';
        pieceCtx.lineWidth = 3;
        pieceCtx.strokeRect(2, 2, finalPieceSize - 4, finalPieceSize - 4);
        
        newPieces.push({
          id: row * cols + col,
          canvas: pieceCanvas,
          correctRow: row,
          correctCol: col,
          currentRow: null,
          currentCol: null,
          isPlaced: false
        });
      }
    }
    
    // Shuffle pieces
    return [...newPieces].sort(() => Math.random() - 0.5);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          setImage(img);
          const newPieces = createPuzzlePieces(img, difficulty);
          setPieces(newPieces);
          setCompletedPieces(new Set());
          setIsCompleted(false);
          setGameStarted(false);
          setTimer(0);
          setScore(0);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setTimer(0);
    setScore(0);
  };

  const resetGame = () => {
    if (image) {
      const newPieces = createPuzzlePieces(image, difficulty);
      setPieces(newPieces);
      setCompletedPieces(new Set());
      setIsCompleted(false);
      setGameStarted(false);
      setTimer(0);
      setScore(0);
    }
  };

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
    
    if (!draggedPiece) return;
    
    const updatedPieces = pieces.map(piece => {
      if (piece.id === draggedPiece.id) {
        return {
          ...piece,
          currentRow: targetRow,
          currentCol: targetCol,
          isPlaced: true,
        };
      }
      return piece;
    });
    
    setPieces(updatedPieces);
    
    // Check if piece is in correct position
    if (draggedPiece.correctRow === targetRow && draggedPiece.correctCol === targetCol) {
      const newCompleted = new Set(completedPieces);
      newCompleted.add(draggedPiece.id);
      setCompletedPieces(newCompleted);
      setScore(prev => prev + 10);
      
      // Success feedback - play success sound and show celebration
      playSuccessSound();
      showSuccessFeedback(`כל הכבוד! החלק במקום הנכון! 🎉`);
      
      // Check if puzzle is complete
      if (newCompleted.size === difficulty) {
        setIsCompleted(true);
        setGameStarted(false);
        setScore(prev => prev + 50 + Math.max(0, 300 - timer)); // Time bonus
        playCompletionSound();
        showSuccessFeedback(`פאזל הושלם! מדהים! 🏆`);
      }
    } else {
      // Wrong position feedback
      showErrorFeedback(`נסה שוב! החלק לא במקום הנכון 🤔`);
    }
    
    setDraggedPiece(null);
  };

  // Add feedback state and functions
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');

  const playSuccessSound = () => {
    try {
      // Create success sound effect
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch {
      console.log('Audio not supported');
    }
  };

  const playCompletionSound = () => {
    try {
      // Create completion fanfare
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + index * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.2);
        
        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + index * 0.1 + 0.2);
      });
    } catch {
      console.log('Audio not supported');  
    }
  };

  const showSuccessFeedback = (message: string) => {
    setFeedbackMessage(message);
    setFeedbackType('success');
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

  const cols = Math.sqrt(difficulty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <GameHeader
          score={score}
          level={Math.floor(score / 50) + 1}
          onHome={() => window.location.href = '/'}
          onReset={resetGame}
          scoreColor="text-white"
          levelColor="text-purple-100"
        />

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            🧩 משחק הפאזל הקסום! 🧩
          </h1>
          <p className="text-white text-lg">הבא תמונה ותבנה פאזל מדהים!</p>
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
              בחר תמונה
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
                🚀 התחל לשחק!
              </button>
            )}

            {image && (
              <button
                onClick={resetGame}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                <RotateCcw className="w-5 h-5" />
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
            <h2 className="text-2xl font-bold text-white mb-2">כל הכבוד! סיימת את הפאזל!</h2>
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
                  
                  return (
                    <div
                      key={index}
                      className="aspect-square border-2 border-gray-300 rounded-lg relative overflow-hidden bg-gray-100 hover:bg-gray-50 transition-colors"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, row, col)}
                    >
                      {placedPiece && (
                        <>
                          <Image
                            src={placedPiece.canvas.toDataURL()}
                            alt={`Piece ${placedPiece.id}`}
                            width={100}
                            height={100}
                            className={`w-full h-full object-cover ${
                              completedPieces.has(placedPiece.id) ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400'
                            }`}
                            unoptimized
                          />
                        </>
                      )}
                      {placedPiece && completedPieces.has(placedPiece.id) && (
                        <div className="absolute top-1 right-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        </div>
                      )}
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
                  .filter(piece => !piece.isPlaced || !completedPieces.has(piece.id))
                  .map((piece) => (
                    <div
                      key={piece.id}
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
                  ))}
              </div>
              {pieces.filter(piece => !piece.isPlaced || !completedPieces.has(piece.id)).length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Trophy className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
                  <p>כל החתיכות במקום!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
        
        {!image && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-white text-xl font-semibold">
              העלה תמונה כדי להתחיל לשחק!
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 mx-auto font-bold text-lg"
            >
              <Upload className="w-6 h-6" />
              בחר תמונה מהמחשב שלך
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
