'use client';

import { usePuzzleContext } from '@/contexts';
import { 
  FeedbackMessage,
  PuzzleGrid,
  PiecesPool,
  PuzzleStats,
  PuzzleSelector,
  UnifiedControls,
  UnifiedHeader,
  UnifiedHelpModal,
  FloatingDragPiece
} from '@/components/shared/puzzle';
import { SIMPLE_PUZZLES } from '@/lib/constants/simplePuzzlesData';

export default function SimplePuzzleGame() {
  const { 
    state, 
    goToMenu,
    handlePuzzleSelect,
    goHome
  } = usePuzzleContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <UnifiedHeader
          onGoHome={goHome}
          type="simple"
        />

        {/* Puzzle Selection */}
        {!state.selectedPuzzle && (
          <PuzzleSelector
            puzzles={SIMPLE_PUZZLES}
            onPuzzleSelect={handlePuzzleSelect}
          />
        )}

        {/* Help Modal */}
        <UnifiedHelpModal type="simple" />

        {/* Game Controls */}
        {state.selectedPuzzle && (
          <UnifiedControls
            type="simple"
            onGoHome={goToMenu}
          />
        )}

        {/* Feedback Message */}
        <FeedbackMessage />

        {/* Game Area */}
        {state.gameStarted && state.selectedPuzzle && state.imageLoaded && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Panel */}
            <div className="lg:col-span-1">
              <PuzzleStats className="mb-6" />
              
              {/* Pieces Pool */}
              <PiecesPool />
            </div>

            {/* Game Grid */}
            <div className="lg:col-span-2">
              <PuzzleGrid
                title={`🎯 ${state.selectedPuzzle.name}`}
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {state.selectedPuzzle && !state.imageLoaded && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">טוען את הפאזל...</p>
          </div>
        )}

        {/* Floating Dragged Piece */}
        <FloatingDragPiece />
      </div>
    </div>
  );
}
