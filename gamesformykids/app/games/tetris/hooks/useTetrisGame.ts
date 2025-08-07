'use client';

import { useState, useEffect, useCallback } from 'react';
import { Board, Piece, Position, TetrisGameState } from '../types';
import { BOARD_WIDTH, BOARD_HEIGHT, EMPTY_BOARD, EMPTY_ROW, getRandomPiece, rotatePiece } from '../constants';

export const useTetrisGame = () => {
  // State
  const [gameState, setGameState] = useState<TetrisGameState>({
    board: EMPTY_BOARD,
    currentPiece: null,
    position: { x: 4, y: 0 },
    score: 0,
    level: 1,
    isGameRunning: false,
    gameOver: false,
    nextPiece: null,
    linesCleared: 0,
    showStartScreen: true,
    isLoading: true
  });

  // אופטימיזציה למובייל - התחלה לאחר טעינה מלאה
  useEffect(() => {
    const timer = setTimeout(() => {
      setGameState(prev => ({ ...prev, isLoading: false }));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Game Logic Functions
  const isValidPosition = useCallback((piece: Piece | null, pos: Position, gameBoard: Board = gameState.board): boolean => {
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
  }, [gameState.board]);

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
    const piece = getRandomPiece();
    setGameState({
      board: EMPTY_BOARD,
      currentPiece: piece,
      position: { x: 4, y: 0 },
      score: 0,
      level: 1,
      isGameRunning: true,
      gameOver: false,
      nextPiece: getRandomPiece(),
      linesCleared: 0,
      showStartScreen: false,
      isLoading: false
    });
  };

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!gameState.currentPiece || gameState.gameOver) return;
    
    const newPos = { x: gameState.position.x + dx, y: gameState.position.y + dy };
    
    if (isValidPosition(gameState.currentPiece, newPos)) {
      setGameState(prev => ({ ...prev, position: newPos }));
    } else if (dy > 0) {
      // Piece can't fall further - place it
      const newBoard = mergePieceToBoard(gameState.currentPiece, gameState.position, gameState.board);
      const { board: clearedBoard, linesCleared: newLinesCleared } = clearLines(newBoard);
      
      const newScore = gameState.score + newLinesCleared * 100 * gameState.level;
      const newLevel = newLinesCleared > 0 
        ? Math.floor(newScore / 1000) + 1 
        : gameState.level;
      
      // Spawn new piece
      const newPiece = gameState.nextPiece;
      const startPos = { x: 4, y: 0 };
      
      if (newPiece && isValidPosition(newPiece, startPos, clearedBoard)) {
        setGameState(prev => ({
          ...prev,
          board: clearedBoard,
          currentPiece: newPiece,
          nextPiece: getRandomPiece(),
          position: startPos,
          score: newScore,
          level: newLevel,
          linesCleared: prev.linesCleared + newLinesCleared
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          board: clearedBoard,
          gameOver: true,
          isGameRunning: false,
          score: newScore,
          level: newLevel,
          linesCleared: prev.linesCleared + newLinesCleared
        }));
      }
    }
  }, [gameState, isValidPosition]);

  const handleRotate = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver) return;
    
    const rotated = rotatePiece(gameState.currentPiece);
    if (isValidPosition(rotated, gameState.position)) {
      setGameState(prev => ({ ...prev, currentPiece: rotated }));
    }
  }, [gameState.currentPiece, gameState.position, gameState.gameOver, isValidPosition]);

  // Keyboard Controls
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameState.isGameRunning) return;
    
    // מנע גלילת מסך במהלך המשחק
    if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' '].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    switch (e.key) {
      case 'ArrowLeft':
        movePiece(-1, 0);
        break;
      case 'ArrowRight':
        movePiece(1, 0);
        break;
      case 'ArrowDown':
        movePiece(0, 1);
        break;
      case 'ArrowUp':
      case ' ':
        handleRotate();
        break;
    }
  }, [gameState.isGameRunning, movePiece, handleRotate]);

  // Effects - מטובח לביצועים
  useEffect(() => {
    if (!gameState.isGameRunning) return;
    
    const dropSpeed = Math.max(200, 1000 - (gameState.level - 1) * 100);
    const gameLoop = setInterval(() => {
      movePiece(0, 1);
    }, dropSpeed);
    
    return () => clearInterval(gameLoop);
  }, [gameState.isGameRunning, gameState.level, movePiece]);

  useEffect(() => {
    // טיפול ישיר בחצי מקלדת - בלי דיבאונס כדי לא להפריע להפעלה
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Display board with current piece
  const getBoardWithCurrentPiece = (): Board => {
    let displayBoard = gameState.board.map(row => [...row]);
    
    if (gameState.currentPiece && isValidPosition(gameState.currentPiece, gameState.position)) {
      displayBoard = mergePieceToBoard(gameState.currentPiece, gameState.position, displayBoard);
    }
    
    return displayBoard;
  };

  const goToStartScreen = () => {
    setGameState(prev => ({ 
      ...prev, 
      showStartScreen: true,
      isGameRunning: false 
    }));
  };

  return {
    gameState,
    actions: {
      startNewGame,
      movePiece,
      handleRotate,
      goToStartScreen
    },
    getBoardWithCurrentPiece
  };
};
