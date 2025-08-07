'use client';

import React, { useState, useEffect, useCallback } from 'react';
import UnifiedHeader from '@/components/shared/UnifiedHeader';
import GenericStartScreen from '@/components/shared/GenericStartScreen';

// Constants
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_ROW = new Array(BOARD_WIDTH).fill(0);
const EMPTY_BOARD = new Array(BOARD_HEIGHT).fill(null).map(() => [...EMPTY_ROW]);

const TETROMINOES = {
  I: { blocks: [[1, 1, 1, 1]], color: 'linear-gradient(135deg, #00f5ff 0%, #0088cc 100%)' },
  O: { blocks: [[1, 1], [1, 1]], color: 'linear-gradient(135deg, #ffff00 0%, #ffcc00 100%)' },
  T: { blocks: [[0, 1, 0], [1, 1, 1]], color: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)' },
  S: { blocks: [[0, 1, 1], [1, 1, 0]], color: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)' },
  Z: { blocks: [[1, 1, 0], [0, 1, 1]], color: 'linear-gradient(135deg, #ff4757 0%, #ff3838 100%)' },
  J: { blocks: [[1, 0, 0], [1, 1, 1]], color: 'linear-gradient(135deg, #5352ed 0%, #3742fa 100%)' },
  L: { blocks: [[0, 0, 1], [1, 1, 1]], color: 'linear-gradient(135deg, #ffa502 0%, #ff6348 100%)' }
};

// Types
interface Position {
  x: number;
  y: number;
}

interface Piece {
  type: string;
  blocks: number[][];
  color: string;
}

type Board = (string | number)[][];

interface TetrisGameProps {
  onBack?: () => void;
}

const TetrisGame: React.FC<TetrisGameProps> = ({ onBack }) => {
  // State
  const [board, setBoard] = useState<Board>(EMPTY_BOARD);
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [position, setPosition] = useState<Position>({ x: 4, y: 0 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [linesCleared, setLinesCleared] = useState(0);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // אופטימיזציה למובייל - התחלה לאחר טעינה מלאה
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Game Logic Functions
  const getRandomPiece = (): Piece => {
    const pieces = Object.keys(TETROMINOES);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      type: randomPiece,
      blocks: TETROMINOES[randomPiece as keyof typeof TETROMINOES].blocks,
      color: TETROMINOES[randomPiece as keyof typeof TETROMINOES].color
    };
  };

  const isValidPosition = useCallback((piece: Piece | null, pos: Position, gameBoard: Board = board): boolean => {
    if (!piece) return false;
    
    for (let y = 0; y < piece.blocks.length; y++) {
      for (let x = 0; x < piece.blocks[y].length; x++) {
        if (piece.blocks[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          
          if (
            newX < 0 || 
            newX >= BOARD_WIDTH || 
            newY >= BOARD_HEIGHT || 
            (newY >= 0 && gameBoard[newY][newX])
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  const rotatePiece = (piece: Piece): Piece => {
    const rotated = [];
    for (let x = 0; x < piece.blocks[0].length; x++) {
      const row = [];
      for (let y = piece.blocks.length - 1; y >= 0; y--) {
        row.push(piece.blocks[y][x]);
      }
      rotated.push(row);
    }
    return { ...piece, blocks: rotated };
  };

  const mergePieceToBoard = (piece: Piece | null, pos: Position, gameBoard: Board): Board => {
    if (!piece) return gameBoard;
    
    const newBoard = gameBoard.map(row => [...row]);
    
    for (let y = 0; y < piece.blocks.length; y++) {
      for (let x = 0; x < piece.blocks[y].length; x++) {
        if (piece.blocks[y][x] && pos.y + y >= 0) {
          newBoard[pos.y + y][pos.x + x] = piece.color;
        }
      }
    }
    return newBoard;
  };

  const clearLines = (gameBoard: Board) => {
    const newBoard: Board = [];
    let linesCleared = 0;
    
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (gameBoard[y].every(cell => cell !== 0)) {
        linesCleared++;
      } else {
        newBoard.unshift(gameBoard[y]);
      }
    }
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift([...EMPTY_ROW]);
    }
    
    return { board: newBoard, linesCleared };
  };

  // Game Actions
  const startNewGame = () => {
    setBoard(EMPTY_BOARD);
    setScore(0);
    setLevel(1);
    setLinesCleared(0);
    setPosition({ x: 4, y: 0 });
    setGameOver(false);
    setIsGameRunning(true);
    setShowStartScreen(false);
    
    const piece = getRandomPiece();
    setCurrentPiece(piece);
    setNextPiece(getRandomPiece());
  };

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!currentPiece || gameOver) return;
    
    const newPos = { x: position.x + dx, y: position.y + dy };
    
    if (isValidPosition(currentPiece, newPos)) {
      setPosition(newPos);
    } else if (dy > 0) {
      // Piece can't fall further - place it
      const newBoard = mergePieceToBoard(currentPiece, position, board);
      const { board: clearedBoard, linesCleared: newLinesCleared } = clearLines(newBoard);
      
      setBoard(clearedBoard);
      setLinesCleared(prev => prev + newLinesCleared);
      setScore(prev => prev + newLinesCleared * 100 * level);
      
      if (newLinesCleared > 0) {
        setLevel(Math.floor((score + newLinesCleared * 100 * level) / 1000) + 1);
      }
      
      // Spawn new piece
      const newPiece = nextPiece;
      const startPos = { x: 4, y: 0 };
      
      if (newPiece && isValidPosition(newPiece, startPos, clearedBoard)) {
        setCurrentPiece(newPiece);
        setNextPiece(getRandomPiece());
        setPosition(startPos);
      } else {
        setGameOver(true);
        setIsGameRunning(false);
      }
    }
  }, [currentPiece, position, board, gameOver, level, score, nextPiece, isValidPosition]);

  const handleRotate = useCallback(() => {
    if (!currentPiece || gameOver) return;
    
    const rotated = rotatePiece(currentPiece);
    if (isValidPosition(rotated, position)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, position, gameOver, isValidPosition]);

  // Keyboard Controls
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isGameRunning) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        movePiece(-1, 0);
        break;
      case 'ArrowRight':
        e.preventDefault();
        movePiece(1, 0);
        break;
      case 'ArrowDown':
        e.preventDefault();
        movePiece(0, 1);
        break;
      case 'ArrowUp':
      case ' ':
        e.preventDefault();
        handleRotate();
        break;
    }
  }, [isGameRunning, movePiece, handleRotate]);

  // Effects - מטובח לביצועים
  useEffect(() => {
    if (!isGameRunning) return;
    
    const dropSpeed = Math.max(200, 1000 - (level - 1) * 100); // מוגבר מ-100 ל-200 לביצועים טובים יותר
    const gameLoop = setInterval(() => {
      movePiece(0, 1);
    }, dropSpeed);
    
    return () => clearInterval(gameLoop);
  }, [isGameRunning, level, movePiece]);

  useEffect(() => {
    // אופטימיזציה למובייל - הוספת דיבאונס
    let timeoutId: NodeJS.Timeout;
    
    const debouncedKeyHandler = (e: KeyboardEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => handleKeyPress(e), 50); // דיבאונס של 50ms
    };

    window.addEventListener('keydown', debouncedKeyHandler);
    return () => {
      window.removeEventListener('keydown', debouncedKeyHandler);
      clearTimeout(timeoutId);
    };
  }, [handleKeyPress]);

  // Display board with current piece
  const getBoardWithCurrentPiece = (): Board => {
    let displayBoard = board.map(row => [...row]);
    
    if (currentPiece && isValidPosition(currentPiece, position)) {
      displayBoard = mergePieceToBoard(currentPiece, position, displayBoard);
    }
    
    return displayBoard;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🧩</div>
          <div className="text-white text-2xl font-bold">טוען טטריס...</div>
        </div>
      </div>
    );
  }

  if (showStartScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
        <UnifiedHeader 
          title="🧩 טטריס לילדים"
          onHome={onBack}
          variant="start-screen"
          className="bg-gradient-to-r from-purple-600 to-indigo-600"
        />
        <GenericStartScreen
          title="🧩 טטריס לילדים 🧩"
          subTitle="המשחק הכי כיפי בעולם!"
          gameSteps={[
            { icon: "⬇️", title: "חלקים נופלים", description: "חלקים נופלים מלמעלה" },
            { icon: "🔄", title: "סיבוב חלקים", description: "סובב חלקים בחץ למעלה או רווח" },
            { icon: "➡️", title: "הזזה", description: "הזז ימינה ושמאלה בחיצים" },
            { icon: "⚡", title: "ניקוי שורות", description: "מלא שורות כדי לנקות אותן" },
            { icon: "🏆", title: "ניקוד גבוה", description: "השג ניקוד גבוה!" }
          ]}
          gameStepsBgClass="bg-white/20"
          items={[]}
          onStart={startNewGame}
          buttonFromColor="from-yellow-400"
          buttonToColor="to-orange-500"
          backgroundStyle="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700"
          itemsTitle="איך משחקים:"
          itemsDescription="למד את החוקים והתחל לשחק!"
          itemsDescriptionColor="text-blue-100"
          itemsGridClass="grid-cols-1"
          textColorHeader="text-yellow-300"
          textColorSubHeader="text-white/90"
          customItemsRenderer={() => <div></div>}
        />
      </div>
    );
  }

  const displayBoard = getBoardWithCurrentPiece();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800 relative overflow-hidden">
      <UnifiedHeader 
        title="🧩 טטריס לילדים"
        onHome={() => setShowStartScreen(true)}
        variant="game-header"
        className="bg-gradient-to-r from-purple-600 to-indigo-600"
      />
      
      {/* Animated Background - אופטימיזציה למובייל */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-yellow-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 sm:w-24 sm:h-24 bg-pink-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 sm:w-40 sm:h-40 bg-green-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 sm:w-28 sm:h-28 bg-blue-400 rounded-full blur-xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center p-2 sm:p-4 pt-20">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-10 items-center xl:items-start w-full max-w-7xl">
          
          {/* Mobile Info Panel */}
          <MobileInfoPanel score={score} level={level} linesCleared={linesCleared} nextPiece={nextPiece} />

          {/* Game Board */}
          <GameBoard displayBoard={displayBoard} />
          
          {/* Desktop Info Panel */}
          <DesktopInfoPanel score={score} level={level} linesCleared={linesCleared} nextPiece={nextPiece} />
        </div>

        {/* Touch Controls */}
        <TouchControls
          isGameRunning={isGameRunning}
          gameOver={gameOver}
          score={score}
          onMove={movePiece}
          onRotate={handleRotate}
          onStartGame={startNewGame}
        />
      </div>
    </div>
  );
};

// Components
const MobileInfoPanel = ({ score, level, linesCleared, nextPiece }: { score: number; level: number; linesCleared: number; nextPiece: Piece | null }) => (
  <div className="xl:hidden flex flex-row gap-4 w-full justify-center">
    <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/20 flex-1 max-w-[180px]">
      <h2 className="text-xl font-black mb-2 text-center text-white drop-shadow-lg">📊 מידע</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-white/90">ניקוד:</span>
          <span className="font-black text-yellow-300 text-lg drop-shadow-lg">{score.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/90">רמה:</span>
          <span className="font-black text-cyan-300 text-lg drop-shadow-lg">{level}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/90">שורות:</span>
          <span className="font-black text-green-300 text-lg drop-shadow-lg">{linesCleared}</span>
        </div>
      </div>
    </div>
    
    {nextPiece && <NextPieceDisplay nextPiece={nextPiece} isMobile />}
  </div>
);

const DesktopInfoPanel = ({ score, level, linesCleared, nextPiece }: { score: number; level: number; linesCleared: number; nextPiece: Piece | null }) => (
  <div className="hidden xl:flex flex-col gap-6">
    <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 min-w-[250px]">
      <h2 className="text-2xl font-black mb-4 text-center text-white drop-shadow-lg">📊 מידע</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white/90 text-lg">ניקוד:</span>
          <span className="font-black text-yellow-300 text-2xl drop-shadow-lg">{score.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/90 text-lg">רמה:</span>
          <span className="font-black text-cyan-300 text-2xl drop-shadow-lg">{level}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/90 text-lg">שורות:</span>
          <span className="font-black text-green-300 text-2xl drop-shadow-lg">{linesCleared}</span>
        </div>
      </div>
    </div>
    
    {nextPiece && <NextPieceDisplay nextPiece={nextPiece} />}
  </div>
);

const NextPieceDisplay = ({ nextPiece, isMobile = false }: { nextPiece: Piece; isMobile?: boolean }) => (
  <div className={`bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 ${isMobile ? 'p-4 flex-1 max-w-[180px]' : 'p-6'}`}>
    <h3 className={`font-black text-center text-white drop-shadow-lg ${isMobile ? 'text-xl mb-2' : 'text-2xl mb-4'}`}>⏭️ הבא</h3>
    <div className={`grid grid-cols-4 justify-center mx-auto ${isMobile ? 'gap-1' : 'gap-2'}`} style={{width: 'fit-content'}}>
      {[0, 1, 2, 3].map(y => 
        [0, 1, 2, 3].map(x => (
          <div
            key={`${y}-${x}`}
            className={`border-2 border-white/30 rounded-lg shadow-lg ${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`}
            style={{
              background: 
                nextPiece.blocks[y] && nextPiece.blocks[y][x] 
                  ? nextPiece.color 
                  : 'rgba(255,255,255,0.1)',
              boxShadow: nextPiece.blocks[y] && nextPiece.blocks[y][x] 
                ? '0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)' 
                : 'inset 0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
        ))
      )}
    </div>
  </div>
);

const GameBoard = ({ displayBoard }: { displayBoard: Board }) => (
  <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20">
    <div className="grid grid-cols-10 gap-1 sm:gap-2 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-3 sm:p-4 rounded-2xl border border-gray-600/50">
      {displayBoard.map((row, y) =>
        row.map((cell, x) => {
          const isEmpty = !cell || cell === 0;
          return (
            <div
              key={`${y}-${x}`}
              className={`w-5 h-5 sm:w-7 sm:h-7 rounded-lg border-2 border-gray-600/50 ${isEmpty ? '' : 'transform transition-all duration-150'}`}
              style={{
                background: isEmpty 
                  ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' 
                  : cell,
                boxShadow: isEmpty
                  ? 'inset 0 2px 4px rgba(0,0,0,0.3)'
                  : '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                willChange: isEmpty ? 'auto' : 'transform' // אופטימיזציה למובייל
              }}
            />
          );
        })
      )}
    </div>
  </div>
);

const TouchControls = ({ 
  isGameRunning, 
  gameOver, 
  score, 
  onMove, 
  onRotate, 
  onStartGame 
}: {
  isGameRunning: boolean;
  gameOver: boolean;
  score: number;
  onMove: (dx: number, dy: number) => void;
  onRotate: () => void;
  onStartGame: () => void;
}) => {
  // אופטימיזציה למובייל - דיבאונס לכפתורים
  const handleMove = useCallback((dx: number, dy: number) => {
    if (!isGameRunning) return;
    onMove(dx, dy);
  }, [isGameRunning, onMove]);

  const handleRotate = useCallback(() => {
    if (!isGameRunning) return;
    onRotate();
  }, [isGameRunning, onRotate]);

  return (
    <div className="mt-8 w-full max-w-lg">
      {/* Rotate Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleRotate}
          className="bg-gradient-to-br from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-green-300/30 touch-manipulation"
          disabled={!isGameRunning}
        >
          🔄 סיבוב
        </button>
      </div>
      
      {/* Movement Controls */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => handleMove(-1, 0)}
          className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-blue-300/30 touch-manipulation"
          disabled={!isGameRunning}
        >
          ⬅️
        </button>
        <button
          onClick={() => handleMove(0, 1)}
          className="bg-gradient-to-br from-red-400 to-red-600 text-white p-4 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-red-300/30 touch-manipulation"
          disabled={!isGameRunning}
        >
          ⬇️ מהר
        </button>
        <button
          onClick={() => handleMove(1, 0)}
          className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-blue-300/30 touch-manipulation"
          disabled={!isGameRunning}
        >
          ➡️
        </button>
      </div>
      
      {/* Start Button */}
      <button
        onClick={onStartGame}
        className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white px-8 py-5 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-white/30 touch-manipulation"
      >
        {gameOver ? '🔄 משחק חדש' : isGameRunning ? '🔄 התחל מחדש' : '▶️ התחל לשחק'}
      </button>
      
      {/* Game Over Message */}
      {gameOver && (
        <div className="bg-gradient-to-br from-red-400/20 to-pink-500/20 backdrop-blur-lg border-2 border-red-400/50 rounded-2xl p-6 text-center mt-6 shadow-2xl">
          <h3 className="text-2xl font-black text-white mb-2 drop-shadow-lg">🎯 המשחק הסתיים!</h3>
          <p className="text-yellow-300 text-xl font-bold drop-shadow-lg">הניקוד שלך: {score.toLocaleString()}</p>
        </div>
      )}
      
      {/* Control Instructions */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-4 mt-6 text-center border border-white/20">
        <p className="text-white/80 font-medium">
          השתמש בכפתורים למעלה או בחיצי המקלדת 📱⌨️
        </p>
      </div>
    </div>
  );
};

export default TetrisGame;
