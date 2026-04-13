'use client';

import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import { usePuzzleSetup } from '../usePuzzleSetup';
import CustomHeader from './CustomHeader';
import FeedbackMessage from '../shared/FeedbackMessage';
import FloatingDragPiece from '../shared/FloatingDragPiece';
import ImageUploadSection from './ImageUploadSection';
import CustomControls from './CustomControls';
import CustomHelpModal from './CustomHelpModal';
import CustomGameArea from './CustomGameArea';

export default function CustomPuzzleGame() {
  usePuzzleSetup();
  const image = usePuzzleStore(s => s.image);
  const gameStarted = usePuzzleStore(s => s.gameStarted);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <CustomHeader />
        </div>

        {!image && <ImageUploadSection />}

        {image && (
          <div className="mb-4 sm:mb-6">
            <CustomControls />
          </div>
        )}

        <div className="mb-4">
          <FeedbackMessage />
        </div>
        <CustomHelpModal />

        {gameStarted && <CustomGameArea />}

        <FloatingDragPiece />
      </div>
    </div>
  );
}
