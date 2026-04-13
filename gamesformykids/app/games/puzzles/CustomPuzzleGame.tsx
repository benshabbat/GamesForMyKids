'use client';

import { usePuzzleContext } from '@/contexts';
import { usePuzzleSetup } from './usePuzzleSetup';
import {
  FeedbackMessage,
  PuzzleHeader,
  ImageUploadSection,
  GameControls,
  GameHelpModal,
  FloatingDragPiece,
  GameArea,
} from './components';

export default function CustomPuzzleGame() {
  usePuzzleSetup();
  const { image, gameStarted } = usePuzzleContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <PuzzleHeader title="🧩 פאזל מותאם אישית" subtitle="העלה תמונה וצור פאזל משלך!" />
        </div>

        {!image && (
          <div className="mb-6 sm:mb-8">
            <ImageUploadSection />
          </div>
        )}

        {image && (
          <div className="mb-4 sm:mb-6">
            <GameControls variant="custom" />
          </div>
        )}

        <div className="mb-4">
          <FeedbackMessage />
        </div>

        <GameHelpModal variant="custom" />

        {gameStarted && <GameArea variant="custom" />}

        <FloatingDragPiece />
      </div>
    </div>
  );
}
