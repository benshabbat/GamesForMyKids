'use client';

import { usePuzzleStore } from './store/puzzleStore';
import { usePuzzleSetup } from './usePuzzleSetup';
import {
  FeedbackMessage,
  PuzzleSelector,
  ImageUploadSection,
  GameControls,
  PuzzleHeader,
  GameHelpModal,
  FloatingDragPiece,
  GameArea,
} from './components';

interface PuzzleGameProps {
  variant: 'simple' | 'custom';
}

export default function PuzzleGame({ variant }: PuzzleGameProps) {
  usePuzzleSetup();
  const selectedPuzzle = usePuzzleStore(s => s.selectedPuzzle);
  const gameStarted = usePuzzleStore(s => s.gameStarted);
  const imageLoaded = usePuzzleStore(s => s.imageLoaded);
  const image = usePuzzleStore(s => s.image);

  const isSimple = variant === 'simple';

  return (
    <div className={isSimple
      ? 'min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-4'
      : 'min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50'
    }>
      <div className={isSimple ? 'max-w-7xl mx-auto' : 'container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6'}>

        <div className={isSimple ? undefined : 'mb-4 sm:mb-6'}>
          <PuzzleHeader
            title={isSimple ? '🧩 פאזלים פשוטים' : '🧩 פאזל מותאם אישית'}
            subtitle={isSimple ? 'בחר פאזל ותתחיל לשחק!' : 'העלה תמונה וצור פאזל משלך!'}
          />
        </div>

        {/* Simple: puzzle selector; Custom: image upload */}
        {isSimple && !selectedPuzzle && <PuzzleSelector />}
        {!isSimple && !image && (
          <div className="mb-6 sm:mb-8">
            <ImageUploadSection />
          </div>
        )}

        {/* Controls */}
        {isSimple
          ? selectedPuzzle && <GameControls variant="simple" />
          : image && (
            <div className="mb-4 sm:mb-6">
              <GameControls variant="custom" />
            </div>
          )
        }

        {/* Feedback + Help */}
        <div className={isSimple ? undefined : 'mb-4'}>
          <FeedbackMessage />
        </div>
        <GameHelpModal variant={variant} />

        {/* Game area */}
        {isSimple
          ? gameStarted && selectedPuzzle && imageLoaded && <GameArea variant="simple" />
          : gameStarted && <GameArea variant="custom" />
        }

        {/* Simple loading state */}
        {isSimple && selectedPuzzle && !imageLoaded && (
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
