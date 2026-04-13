'use client';

import Image from 'next/image';
import { usePuzzleStore } from './store/puzzleStore';
import { usePuzzleSetup } from './usePuzzleSetup';
import { SIMPLE_PUZZLES, type SimplePuzzle } from './constants/simplePuzzlesData';
import {
  ImageUploadSection,
  GameControls,
  PuzzleHeader,
  GameHelpModal,
  FloatingDragPiece,
  GameArea,
  FeedbackMessage,
} from './components';

const DIFFICULTY_TEXT: Record<string, string> = { easy: 'קל', medium: 'בינוני', hard: 'קשה' };
const DIFFICULTY_COLOR: Record<string, string> = { easy: 'bg-green-500', medium: 'bg-yellow-500', hard: 'bg-red-500' };

function PuzzleSelector() {
  const { handlePuzzleSelect } = usePuzzleStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SIMPLE_PUZZLES.map((puzzle: SimplePuzzle) => (
        <div
          key={puzzle.id}
          className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform"
          style={{ borderTop: `6px solid ${puzzle.color}` }}
          onClick={() => handlePuzzleSelect(puzzle)}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">{puzzle.emoji}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{puzzle.name}</h3>
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                {Math.sqrt(puzzle.gridSize)}x{Math.sqrt(puzzle.gridSize)}
              </span>
              <span className={`text-sm px-3 py-1 rounded-full text-white ${DIFFICULTY_COLOR[puzzle.difficulty] ?? 'bg-gray-500'}`}>
                {DIFFICULTY_TEXT[puzzle.difficulty] ?? puzzle.difficulty}
              </span>
            </div>
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <Image
                src={puzzle.imageUrl}
                alt={puzzle.name}
                width={200}
                height={200}
                className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              התחל לשחק
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

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
