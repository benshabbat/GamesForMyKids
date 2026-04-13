'use client';

import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import { usePuzzleSetup } from '../usePuzzleSetup';
import PuzzleHeader from '../shared/PuzzleHeader';
import FeedbackMessage from '../shared/FeedbackMessage';
import FloatingDragPiece from '../shared/FloatingDragPiece';
import PuzzleSelector from './PuzzleSelector';
import SimpleControls from './SimpleControls';
import SimpleHelpModal from './SimpleHelpModal';
import SimpleGameArea from './SimpleGameArea';

export default function SimplePuzzleGame() {
  usePuzzleSetup();
  const selectedPuzzle = usePuzzleStore(s => s.selectedPuzzle);
  const gameStarted = usePuzzleStore(s => s.gameStarted);
  const imageLoaded = usePuzzleStore(s => s.imageLoaded);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-4">
      <div className="max-w-7xl mx-auto">
        <PuzzleHeader title="🧩 פאזלים פשוטים" subtitle="בחר פאזל ותתחיל לשחק!" />

        {!selectedPuzzle && <PuzzleSelector />}
        {selectedPuzzle && <SimpleControls />}

        <FeedbackMessage />
        <SimpleHelpModal />

        {gameStarted && selectedPuzzle && imageLoaded && <SimpleGameArea />}
        {selectedPuzzle && !imageLoaded && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
            <p className="text-lg text-gray-600">טוען את הפאזל...</p>
          </div>
        )}

        <FloatingDragPiece />
      </div>
    </div>
  );
}
