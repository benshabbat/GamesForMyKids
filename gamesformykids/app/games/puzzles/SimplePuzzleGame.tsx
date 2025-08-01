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
    imageUrl: "data:image/svg+xml," + encodeURIComponent(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="catGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFB6C1;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FF69B4;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#catGrad)"/>
        <circle cx="200" cy="200" r="150" fill="#FF1493" stroke="#000" stroke-width="3"/>
        <circle cx="160" cy="170" r="25" fill="black"/>
        <circle cx="240" cy="170" r="25" fill="black"/>
        <ellipse cx="200" cy="220" rx="30" ry="20" fill="black"/>
        <path d="M 200 240 Q 180 260 160 250 M 200 240 Q 220 260 240 250" stroke="black" stroke-width="4" fill="none"/>
        <text x="200" y="340" text-anchor="middle" font-size="40" font-weight="bold" fill="white" stroke="black" stroke-width="1">חתול</text>
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
    imageUrl: "data:image/svg+xml," + encodeURIComponent(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ADD8E6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#4169E1;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#dogGrad)"/>
        <ellipse cx="200" cy="220" rx="130" ry="110" fill="#1E90FF" stroke="#000" stroke-width="3"/>
        <circle cx="170" cy="190" r="20" fill="black"/>
        <circle cx="230" cy="190" r="20" fill="black"/>
        <ellipse cx="200" cy="230" rx="35" ry="25" fill="black"/>
        <ellipse cx="200" cy="270" rx="20" ry="15" fill="#FF69B4"/>
        <text x="200" y="350" text-anchor="middle" font-size="40" font-weight="bold" fill="white" stroke="black" stroke-width="1">כלב</text>
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
    imageUrl: "data:image/svg+xml," + encodeURIComponent(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="butterflyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#FFE4B5;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FF4500;stop-opacity:1" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#butterflyGrad)"/>
        <ellipse cx="150" cy="150" rx="60" ry="90" fill="#FF6347" stroke="#000" stroke-width="2"/>
        <ellipse cx="250" cy="150" rx="60" ry="90" fill="#FF4500" stroke="#000" stroke-width="2"/>
        <ellipse cx="150" cy="250" rx="50" ry="70" fill="#FF6347" stroke="#000" stroke-width="2"/>
        <ellipse cx="250" cy="250" rx="50" ry="70" fill="#FF4500" stroke="#000" stroke-width="2"/>
        <line x1="200" y1="80" x2="200" y2="320" stroke="black" stroke-width="8"/>
        <circle cx="200" cy="100" r="12" fill="black"/>
        <circle cx="200" cy="130" r="10" fill="black"/>
        <text x="200" y="370" text-anchor="middle" font-size="30" font-weight="bold" fill="darkorange" stroke="black" stroke-width="1">פרפר</text>
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
    imageUrl: "data:image/svg+xml," + encodeURIComponent(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="flowerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#E6E6FA;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#9932CC;stop-opacity:1" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#flowerGrad)"/>
        <circle cx="200" cy="200" r="40" fill="#FFD700" stroke="#000" stroke-width="3"/>
        <ellipse cx="200" cy="130" rx="35" ry="60" fill="#9932CC" stroke="#000" stroke-width="2"/>
        <ellipse cx="270" cy="200" rx="60" ry="35" fill="#DA70D6" stroke="#000" stroke-width="2"/>
        <ellipse cx="200" cy="270" rx="35" ry="60" fill="#9932CC" stroke="#000" stroke-width="2"/>
        <ellipse cx="130" cy="200" rx="60" ry="35" fill="#DA70D6" stroke="#000" stroke-width="2"/>
        <ellipse cx="245" cy="155" rx="40" ry="40" fill="#BA55D3" stroke="#000" stroke-width="2" transform="rotate(45 245 155)"/>
        <ellipse cx="155" cy="155" rx="40" ry="40" fill="#BA55D3" stroke="#000" stroke-width="2" transform="rotate(-45 155 155)"/>
        <ellipse cx="245" cy="245" rx="40" ry="40" fill="#BA55D3" stroke="#000" stroke-width="2" transform="rotate(-45 245 245)"/>
        <ellipse cx="155" cy="245" rx="40" ry="40" fill="#BA55D3" stroke="#000" stroke-width="2" transform="rotate(45 155 245)"/>
        <text x="200" y="370" text-anchor="middle" font-size="30" font-weight="bold" fill="purple" stroke="white" stroke-width="1">פרח</text>
      </svg>
    `),
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 5,
    name: "פאזל דג צבעוני",
    emoji: "🐠",
    color: "#00CED1",
    imageUrl: "data:image/svg+xml," + encodeURIComponent(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="fishGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#E0FFFF;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#00CED1;stop-opacity:1" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#fishGrad)"/>
        <ellipse cx="200" cy="200" rx="120" ry="80" fill="#20B2AA" stroke="#000" stroke-width="3"/>
        <path d="M 80 200 L 140 150 L 140 250 Z" fill="#FF6347" stroke="#000" stroke-width="2"/>
        <circle cx="240" cy="180" r="15" fill="black"/>
        <path d="M 280 170 Q 350 150 380 180 Q 350 210 320 190 Q 300 200 280 190 Z" fill="#FF4500" stroke="#000" stroke-width="2"/>
        <text x="200" y="350" text-anchor="middle" font-size="30" font-weight="bold" fill="darkblue" stroke="white" stroke-width="1">דג</text>
      </svg>
    `),
    gridSize: 4, // 2x2
    difficulty: "easy"
  },
  {
    id: 6,
    name: "פאזל בית צבעוני",
    emoji: "🏠",
    color: "#8B4513",
    imageUrl: "data:image/svg+xml," + encodeURIComponent(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="houseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#98FB98;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#houseGrad)"/>
        <path d="M 100 200 L 200 100 L 300 200 L 300 350 L 100 350 Z" fill="#8B4513" stroke="#000" stroke-width="3"/>
        <path d="M 80 200 L 200 80 L 320 200 L 300 200 L 200 100 L 100 200 Z" fill="#DC143C" stroke="#000" stroke-width="3"/>
        <rect x="140" y="250" width="50" height="100" fill="#8B4513" stroke="#000" stroke-width="2"/>
        <circle cx="165" cy="290" r="5" fill="#FFD700"/>
        <rect x="220" y="180" width="60" height="60" fill="#87CEEB" stroke="#000" stroke-width="2"/>
        <line x1="220" y1="210" x2="280" y2="210" stroke="#000" stroke-width="2"/>
        <line x1="250" y1="180" x2="250" y2="240" stroke="#000" stroke-width="2"/>
        <text x="200" y="380" text-anchor="middle" font-size="30" font-weight="bold" fill="darkred" stroke="white" stroke-width="1">בית</text>
      </svg>
    `),
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 7,
    name: "פאזל רכב מרוצים",
    emoji: "🏎️",
    color: "#FF0000",
    imageUrl: "data:image/svg+xml," + encodeURIComponent(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="carGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#F0F8FF;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#87CEEB;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#carGrad)"/>
        <rect x="100" y="180" width="200" height="80" fill="#FF0000" stroke="#000" stroke-width="3" rx="10"/>
        <rect x="120" y="150" width="160" height="30" fill="#87CEEB" stroke="#000" stroke-width="2" rx="15"/>
        <circle cx="140" cy="280" r="25" fill="#333" stroke="#000" stroke-width="3"/>
        <circle cx="260" cy="280" r="25" fill="#333" stroke="#000" stroke-width="3"/>
        <circle cx="140" cy="280" r="15" fill="#666"/>
        <circle cx="260" cy="280" r="15" fill="#666"/>
        <rect x="320" y="200" width="60" height="40" fill="#FFD700" stroke="#000" stroke-width="2"/>
        <text x="200" y="350" text-anchor="middle" font-size="30" font-weight="bold" fill="darkred" stroke="white" stroke-width="1">מכונית</text>
      </svg>
    `),
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 8,
    name: "פאזל עוגה יומולדת",
    emoji: "🎂",
    color: "#FFB6C1",
    imageUrl: "data:image/svg+xml," + encodeURIComponent(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFF8DC;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFB6C1;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#cakeGrad)"/>
        <ellipse cx="200" cy="320" rx="120" ry="20" fill="#8B4513"/>
        <rect x="80" y="220" width="240" height="100" fill="#FFB6C1" stroke="#000" stroke-width="2"/>
        <rect x="100" y="180" width="200" height="40" fill="#FF69B4" stroke="#000" stroke-width="2"/>
        <rect x="120" y="140" width="160" height="40" fill="#FFB6C1" stroke="#000" stroke-width="2"/>
        <line x1="160" y1="80" x2="160" y2="140" stroke="#FFD700" stroke-width="3"/>
        <line x1="200" y1="70" x2="200" y2="140" stroke="#FFD700" stroke-width="3"/>
        <line x1="240" y1="80" x2="240" y2="140" stroke="#FFD700" stroke-width="3"/>
        <ellipse cx="160" cy="80" rx="8" ry="15" fill="#FF4500"/>
        <ellipse cx="200" cy="70" rx="8" ry="15" fill="#FF4500"/>
        <ellipse cx="240" cy="80" rx="8" ry="15" fill="#FF4500"/>
        <text x="200" y="380" text-anchor="middle" font-size="30" font-weight="bold" fill="purple" stroke="white" stroke-width="1">עוגה</text>
      </svg>
    `),
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

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      for (let row = 0; row < gridSide; row++) {
        for (let col = 0; col < gridSide; col++) {
          const pieceCanvas = document.createElement('canvas');
          const finalPieceSize = Math.floor(pieceSize) + 4;
          pieceCanvas.width = finalPieceSize;
          pieceCanvas.height = finalPieceSize;
          const pieceCtx = pieceCanvas.getContext('2d');
          
          if (!pieceCtx) continue;

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

      console.log(`Successfully created ${pieces.length} puzzle pieces for ${puzzle.name}`);
      return pieces.sort(() => Math.random() - 0.5);
    } catch (error) {
      console.error('Error in createPuzzlePieces:', error);
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
                maxWidth: '400px'
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

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}