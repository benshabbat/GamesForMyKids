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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <PuzzleHeader onGoHome={gameState.goHome} onToggleHelp={gameState.toggleHelp} />
        </div>

        {/* Upload Section */}
        {!imageManagement.image && (
          <div className="mb-6 sm:mb-8">
            <ImageUploadSection 
              difficulty={gameState.difficulty}
              fileInputRef={fileInputRef}
              onImageUpload={handleImageUploadWithInit}
              onPreMadeImageSelect={handlePreMadeImageSelectWithInit}
              onDifficultyChange={handleDifficultyChangeWithRestart}
            />
          </div>
        )}

        {/* Game Controls */}
        {imageManagement.image && (
          <div className="mb-4 sm:mb-6">
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
          </div>
        )}

        {/* Feedback Message */}
        <div className="mb-4">
          <FeedbackMessage message={feedbackMessage} type={feedbackType} />
        </div>

        {/* Help Modal */}
        <HelpModal showHelp={gameState.showHelp} onToggleHelp={gameState.toggleHelp} />

        {/* Game Area */}
        {gameState.gameStarted && (
          <>
            {/* Mobile Layout */}
            <div className="xl:hidden space-y-4 sm:space-y-6">
              {/* Stats Panel for Mobile */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/50">
                <PuzzleStats
                  correctPieces={correctPieces}
                  totalPieces={gameState.difficulty}
                  timeElapsed={gameState.timer}
                  score={puzzleLogic.score}
                  isComplete={gameState.isCompleted}
                />
              </div>

              {/* Main Game Grid for Mobile */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-3 sm:p-4 border border-white/50">
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

              {/* Pieces Pool for Mobile */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/50">
                <PiecesPool
                  pieces={puzzleLogic.pieces}
                  onDragStart={dragAndDrop.handleDragStart}
                  onTouchStart={dragAndDrop.handleTouchStart}
                  onTouchMove={dragAndDrop.handleTouchMove}
                  onTouchEnd={(e) => dragAndDrop.handleTouchEnd(e, handleDropWithCompletion)}
                  title="🧩 חלקי הפאזל"
                />
              </div>

              {/* Reference Image for Mobile */}
              {imageManagement.image && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/50">
                  <ReferenceImage image={imageManagement.image} />
                </div>
              )}
            </div>

            {/* Desktop Layout */}
            <div className="hidden xl:grid xl:grid-cols-4 gap-6 lg:gap-8">
              
              {/* Left Sidebar - Pieces Pool and Reference Image */}
              <div className="xl:col-span-1 space-y-6">
                {/* Pieces Pool */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50">
                  <PiecesPool
                    pieces={puzzleLogic.pieces}
                    onDragStart={dragAndDrop.handleDragStart}
                    onTouchStart={dragAndDrop.handleTouchStart}
                    onTouchMove={dragAndDrop.handleTouchMove}
                    onTouchEnd={(e) => dragAndDrop.handleTouchEnd(e, handleDropWithCompletion)}
                    title="🧩 חלקי הפאזל"
                  />
                </div>
                
                {/* Reference Image */}
                {imageManagement.image && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50">
                    <ReferenceImage image={imageManagement.image} />
                  </div>
                )}
              </div>

              {/* Main Game Grid */}
              <div className="xl:col-span-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-white/50 min-h-[600px]">
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
              </div>

              {/* Right Sidebar - Stats */}
              <div className="xl:col-span-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50 sticky top-4">
                  <PuzzleStats
                    correctPieces={correctPieces}
                    totalPieces={gameState.difficulty}
                    timeElapsed={gameState.timer}
                    score={puzzleLogic.score}
                    isComplete={gameState.isCompleted}
                  />
                </div>
              </div>
            </div>
          </>
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
