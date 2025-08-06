'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import { usePuzzleContext } from '@/contexts';
import { 
  FeedbackMessage,
  PuzzleGrid,
  PiecesPool,
  PuzzleStats,
  UnifiedHeader,
  ImageUploadSection,
  UnifiedControls,
  ReferenceImage,
  UnifiedHelpModal,
  FloatingDragPiece
} from '@/components/shared/puzzle';

export default function CustomPuzzleGame() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { 
    state, 
    dispatch, 
    resetGame,
    handleImageUpload,
    handlePreMadeImageSelect,
    shufflePieces,
    toggleHints,
    toggleDebug,
    toggleHelp,
    changeDifficulty
  } = usePuzzleContext();  // Handle image upload with initialization
  const handleImageUploadWithInit = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event);
  }, [handleImageUpload]);

  const handlePreMadeImageSelectWithInit = useCallback((imageSrc: string) => {
    handlePreMadeImageSelect(imageSrc);
  }, [handlePreMadeImageSelect]);

  // Set up keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'r':
          if (state.gameStarted) resetGame();
          break;
        case 'h':
          if (event.shiftKey) {
            toggleHints();
          } else {
            toggleHelp();
          }
          break;
        case 'd':
          toggleDebug();
          break;
        case 's':
          if (state.gameStarted) shufflePieces();
          break;
        case 'escape':
          if (state.showHelp) dispatch({ type: 'TOGGLE_HELP' });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.gameStarted, state.showHelp, toggleHints, toggleDebug, toggleHelp, shufflePieces, resetGame, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <UnifiedHeader type="custom" />
        </div>

        {/* Upload Section */}
        {!state.image && (
          <div className="mb-6 sm:mb-8">
            <ImageUploadSection 
              fileInputRef={fileInputRef}
              onImageUpload={handleImageUploadWithInit}
              onPreMadeImageSelect={handlePreMadeImageSelectWithInit}
              onDifficultyChange={changeDifficulty}
            />
          </div>
        )}

        {/* Game Controls */}
        {state.image && (
          <div className="mb-4 sm:mb-6">
            <UnifiedControls 
              type="custom"
              fileInputRef={fileInputRef}
              onDifficultyChange={changeDifficulty}
            />
          </div>
        )}

        {/* Feedback Message */}
        <div className="mb-4">
          <FeedbackMessage />
        </div>

        {/* Help Modal */}
        <UnifiedHelpModal type="custom" />

        {/* Game Area */}
        {state.gameStarted && (
          <>
            {/* Mobile Layout */}
            <div className="xl:hidden space-y-4 sm:space-y-6">
              {/* Stats Panel for Mobile */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/50">
                <PuzzleStats />
              </div>

              {/* Main Game Grid for Mobile */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-3 sm:p-4 border border-white/50">
                <PuzzleGrid />
              </div>

              {/* Pieces Pool for Mobile */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/50">
                <PiecesPool />
              </div>

              {/* Reference Image for Mobile */}
              {state.image && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/50">
                  <ReferenceImage />
                </div>
              )}
            </div>

            {/* Desktop Layout */}
            <div className="hidden xl:grid xl:grid-cols-4 gap-6 lg:gap-8">
              
              {/* Left Sidebar - Pieces Pool and Reference Image */}
              <div className="xl:col-span-1 space-y-6">
                {/* Pieces Pool */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50">
                  <PiecesPool />
                </div>
                
                {/* Reference Image */}
                {state.image && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50">
                    <ReferenceImage />
                  </div>
                )}
              </div>

              {/* Main Game Grid */}
              <div className="xl:col-span-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-white/50 min-h-[600px]">
                  <PuzzleGrid />
                </div>
              </div>

              {/* Right Sidebar - Stats */}
              <div className="xl:col-span-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50 sticky top-4">
                  <PuzzleStats />
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
        <FloatingDragPiece />
      </div>
    </div>
  );
}
