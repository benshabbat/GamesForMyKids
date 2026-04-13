'use client';

import { usePuzzleContext } from '@/contexts';
import { usePuzzleSetup } from './usePuzzleSetup';
import {
  FeedbackMessage,
  PuzzleSelector,
  GameControls,
  PuzzleHeader,
  GameHelpModal,
  FloatingDragPiece,
  GameArea,
} from './components';

export default function SimplePuzzleGame() {
  usePuzzleSetup();
  const { selectedPuzzle, gameStarted, imageLoaded } = usePuzzleContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <PuzzleHeader title="🧩 פאזלים פשוטים" subtitle="בחר פאזל ותתחיל לשחק!" />

        {/* Puzzle Selection */}
        {!selectedPuzzle && (
          <PuzzleSelector />
        )}

        {/* Help Modal */}
        <GameHelpModal variant="simple" />

        {/* Game Controls */}
        {selectedPuzzle && <GameControls variant="simple" />}

        {/* Feedback Message */}
        <FeedbackMessage />

        {/* Game Area */}
        {gameStarted && selectedPuzzle && imageLoaded && <GameArea variant="simple" />}

        {/* Loading State */}
        {selectedPuzzle && !imageLoaded && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
            <p className="text-lg text-gray-600">טוען את הפאזל...</p>
          </div>
        )}

        {/* Floating Dragged Piece */}
        <FloatingDragPiece />
      </div>
    </div>
  );
}
