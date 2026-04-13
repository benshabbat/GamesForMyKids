'use client';

import { usePuzzleContext } from '@/contexts';
import { usePuzzleSetup } from './usePuzzleSetup';
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
} from './components';

export default function SimplePuzzleGame() {
  usePuzzleSetup();
  const { selectedPuzzle, gameStarted, imageLoaded } = usePuzzleContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <UnifiedHeader
          type="simple"
        />

        {/* Puzzle Selection */}
        {!selectedPuzzle && (
          <PuzzleSelector />
        )}

        {/* Help Modal */}
        <UnifiedHelpModal type="simple" />

        {/* Game Controls */}
        {selectedPuzzle && (
          <UnifiedControls
            type="simple"
          />
        )}

        {/* Feedback Message */}
        <FeedbackMessage />

        {/* Game Area */}
        {gameStarted && selectedPuzzle && imageLoaded && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Panel */}
            <div className="lg:col-span-1">
              <PuzzleStats className="mb-6" />
              
              {/* Pieces Pool */}
              <PiecesPool />
            </div>

            {/* Game Grid */}
            <div className="lg:col-span-2">
              <PuzzleGrid />
            </div>
          </div>
        )}

        {/* Loading State */}
        {selectedPuzzle && !imageLoaded && (
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
