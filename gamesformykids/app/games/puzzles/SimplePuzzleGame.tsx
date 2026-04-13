'use client';

import { usePuzzleContext } from '@/contexts';
import { usePuzzleSetup } from './usePuzzleSetup';
import { 
  FeedbackMessage,
  PuzzleSelector,
  UnifiedControls,
  UnifiedHeader,
  UnifiedHelpModal,
  FloatingDragPiece,
  SimpleGameArea,
  PuzzleLoadingSpinner,
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
        {gameStarted && selectedPuzzle && imageLoaded && <SimpleGameArea />}

        {/* Loading State */}
        {selectedPuzzle && !imageLoaded && <PuzzleLoadingSpinner />}

        {/* Floating Dragged Piece */}
        <FloatingDragPiece />
      </div>
    </div>
  );
}
