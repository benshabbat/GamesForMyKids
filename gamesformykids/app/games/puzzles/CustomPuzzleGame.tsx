'use client';

import React, { useRef, useCallback } from 'react';
import { 
  FeedbackMessage,
  PuzzleGrid,
  PiecesPool,
  PuzzleStats,
  PuzzleHeader,
  ImageUploadSection,
  GameControls,
  ReferenceImage,
  HelpModal,
  FloatingDragPiece
} from '@/components/shared/puzzle';
import {
  useImageManagement,
  usePuzzleGameLogic,
  useDragAndDrop,
  useGameState,
  useKeyboardShortcuts,
  usePuzzleFeedback
} from '@/hooks';
import { type PuzzlePiece } from '@/lib/utils/puzzleUtils';

export default function CustomPuzzleGame() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Custom hooks for separated logic
  const gameState = useGameState();
  const imageManagement = useImageManagement();
  const puzzleLogic = usePuzzleGameLogic({
    difficulty: gameState.difficulty,
    timer: gameState.timer
  });
  const dragAndDrop = useDragAndDrop();
  const { feedbackMessage, feedbackType, showFeedback, speak } = usePuzzleFeedback();

  // Handle game initialization
  const initializeNewGame = useCallback((img: HTMLImageElement) => {
    const newPieces = imageManagement.initializeGame(img, gameState.difficulty);
    puzzleLogic.resetPuzzle(newPieces);
    gameState.setGameStarted(true);
    gameState.setIsCompleted(false);
    gameState.setTimer(0);
  }, [imageManagement, puzzleLogic, gameState]);

  // Handle difficulty change with proper game restart
  const handleDifficultyChangeWithRestart = useCallback((newDifficulty: number) => {
    const difficultyName = 
      newDifficulty === 4 ? 'קל' : 
      newDifficulty === 9 ? 'בינוני' : 
      newDifficulty === 16 ? 'קשה' : 'מומחה';
    
    speak(`רמה חדשה נבחרה: ${difficultyName} עם ${newDifficulty} חלקים`);
    
    gameState.setDifficulty(newDifficulty);
    
    if (imageManagement.image) {
      const newPieces = imageManagement.initializeGame(imageManagement.image, newDifficulty);
      puzzleLogic.resetPuzzle(newPieces);
      gameState.setGameStarted(true);
      gameState.setIsCompleted(false);
      gameState.setTimer(0);
      speak(`המשחק התחיל מחדש ברמת ${difficultyName}`);
    } else {
      showFeedback(`רמת קושי שונתה ל${difficultyName} - ${newDifficulty} חלקים`, 'success');
    }
  }, [speak, gameState, imageManagement, puzzleLogic, showFeedback]);

  // Reset game function
  const resetGame = useCallback(() => {
    if (imageManagement.image) {
      initializeNewGame(imageManagement.image);
      speak('המשחק אופס');
    }
  }, [imageManagement.image, initializeNewGame, speak]);

  // Enhanced toggle functions with speech
  const toggleHintsWithSpeech = useCallback(() => {
    gameState.toggleHints();
    speak(gameState.showHints ? 'רמזים הוסתרו' : 'רמזים מוצגים');
  }, [gameState, speak]);

  const toggleDebugWithSpeech = useCallback(() => {
    gameState.toggleDebug();
    speak(gameState.showDebug ? 'מצב דיבוג כבוי' : 'מצב דיבוג פועל');
  }, [gameState, speak]);

  // Handle drop with completion check
  const handleDropWithCompletion = useCallback((piece: PuzzlePiece, gridIndex: number) => {
    const isCorrect = puzzleLogic.handleDropLogic(piece, gridIndex);
    
    // Check for completion
    const correctPieces = puzzleLogic.placedPieces.filter(p => p?.isCorrect).length;
    if (correctPieces === gameState.difficulty) {
      gameState.setIsCompleted(true);
    }
    
    return isCorrect;
  }, [puzzleLogic, gameState]);

  // Initialize game when image changes
  const handleImageUploadWithInit = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    imageManagement.handleImageUpload(event);
    // Image initialization will be handled in imageManagement hook
  }, [imageManagement]);

  const handlePreMadeImageSelectWithInit = useCallback((imageSrc: string) => {
    imageManagement.handlePreMadeImageSelect(imageSrc);
    // Image initialization will be handled in imageManagement hook
  }, [imageManagement]);

  // Set up keyboard shortcuts
  useKeyboardShortcuts({
    gameStarted: gameState.gameStarted,
    showHelp: gameState.showHelp,
    toggleHints: toggleHintsWithSpeech,
    toggleDebug: toggleDebugWithSpeech,
    toggleHelp: gameState.toggleHelp,
    shufflePieces: puzzleLogic.shufflePieces,
    resetGame
  });

  // Auto-initialize game when image is loaded
  React.useEffect(() => {
    if (imageManagement.image && !gameState.gameStarted) {
      initializeNewGame(imageManagement.image);
    }
  }, [imageManagement.image, gameState.gameStarted, initializeNewGame]);

  // Calculate current stats
  const correctPieces = puzzleLogic.placedPieces.filter(p => p?.isCorrect).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <PuzzleHeader onGoHome={gameState.goHome} onToggleHelp={gameState.toggleHelp} />

        {/* Upload Section */}
        {!imageManagement.image && (
          <ImageUploadSection 
            difficulty={gameState.difficulty}
            fileInputRef={fileInputRef}
            onImageUpload={handleImageUploadWithInit}
            onPreMadeImageSelect={handlePreMadeImageSelectWithInit}
            onDifficultyChange={handleDifficultyChangeWithRestart}
          />
        )}

        {/* Game Controls */}
        {imageManagement.image && (
          <GameControls 
            gameStarted={gameState.gameStarted}
            showHints={gameState.showHints}
            showDebug={gameState.showDebug}
            difficulty={gameState.difficulty}
            fileInputRef={fileInputRef}
            onShufflePieces={puzzleLogic.shufflePieces}
            onResetGame={resetGame}
            onToggleHints={toggleHintsWithSpeech}
            onToggleDebug={toggleDebugWithSpeech}
            onDifficultyChange={handleDifficultyChangeWithRestart}
          />
        )}

        {/* Feedback Message */}
        <FeedbackMessage message={feedbackMessage} type={feedbackType} />

        {/* Help Modal */}
        <HelpModal showHelp={gameState.showHelp} onToggleHelp={gameState.toggleHelp} />

        {/* Game Area */}
        {gameState.gameStarted && (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Game Grid - On mobile, this comes first */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <PuzzleGrid
                gridSize={gameState.difficulty}
                pieces={puzzleLogic.placedPieces}
                onDragOver={dragAndDrop.handleDragOver}
                onDrop={(e, gridIndex) => dragAndDrop.handleDrop(e, gridIndex, handleDropWithCompletion)}
                onDragStart={dragAndDrop.handleDragStart}
                onTouchStart={dragAndDrop.handleTouchStart}
                onTouchMove={dragAndDrop.handleTouchMove}
                onTouchEnd={(e) => dragAndDrop.handleTouchEnd(e, handleDropWithCompletion)}
                title="🎯 לוח הפאזל"
                showPositionNumbers={gameState.showHints}
                showDebugInfo={gameState.showDebug}
              />
            </div>

            {/* Stats Panel and Pieces Pool - Combined on mobile */}
            <div className="lg:col-span-1 order-2 lg:order-1 space-y-4 lg:space-y-6">
              {/* Reference Image - Responsive design */}
              {imageManagement.image && <ReferenceImage image={imageManagement.image} />}
              
              <PuzzleStats
                correctPieces={correctPieces}
                totalPieces={gameState.difficulty}
                timeElapsed={gameState.timer}
                score={puzzleLogic.score}
                isComplete={gameState.isCompleted}
              />
              
              {/* Pieces Pool */}
              <PiecesPool
                pieces={puzzleLogic.pieces}
                onDragStart={dragAndDrop.handleDragStart}
                onTouchStart={dragAndDrop.handleTouchStart}
                onTouchMove={dragAndDrop.handleTouchMove}
                onTouchEnd={(e) => dragAndDrop.handleTouchEnd(e, handleDropWithCompletion)}
                title="🧩 חלקי הפאזל"
              />
            </div>
          </div>
        )}

        {/* Hidden elements */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUploadWithInit}
          ref={fileInputRef}
          className="hidden"
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Floating Dragged Piece */}
        <FloatingDragPiece 
          isDragging={dragAndDrop.touchState.isDragging}
          draggedPiece={dragAndDrop.touchState.draggedPiece}
          dragPosition={dragAndDrop.touchState.dragPosition}
        />
      </div>
    </div>
  );
}
