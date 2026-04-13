'use client';

import Image from 'next/image';
import { Home, HelpCircle } from 'lucide-react';
import { usePuzzleStore } from './store/puzzleStore';
import { usePuzzleSetup } from './usePuzzleSetup';
import { SIMPLE_PUZZLES, type SimplePuzzle } from './constants/simplePuzzlesData';
import {
  ImageUploadSection,
  GameControls,
  GameHelpModal,
  GameArea,
} from './components';

const DIFFICULTY_TEXT: Record<string, string> = { easy: 'קל', medium: 'בינוני', hard: 'קשה' };
const DIFFICULTY_COLOR: Record<string, string> = { easy: 'bg-green-500', medium: 'bg-yellow-500', hard: 'bg-red-500' };

function PuzzleHeader({ title, subtitle }: { title: string; subtitle: string }) {
  const { toggleHelp, goHome } = usePuzzleStore();
  return (
    <div className="text-center mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-6">
        <button
          onClick={goHome}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base font-medium"
        >
          <Home className="w-5 h-5" />
          <span className="hidden sm:inline">חזרה לבית</span>
          <span className="sm:hidden">בית</span>
        </button>
        <div className="order-first sm:order-none">
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">{title}</h1>
          <p className="text-lg sm:text-xl text-gray-600 font-medium">{subtitle}</p>
        </div>
        <button
          onClick={toggleHelp}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base font-medium"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="hidden sm:inline">עזרה</span>
          <span className="sm:hidden">?</span>
        </button>
      </div>
    </div>
  );
}

function FeedbackMessage() {
  const message = usePuzzleStore(s => s.feedbackMessage);
  const type = usePuzzleStore(s => s.feedbackType);
  if (!message) return null;
  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg animate-bounce ${
      type === 'success' ? 'bg-green-500' : 'bg-orange-500'
    }`}>
      {message}
    </div>
  );
}

function FloatingDragPiece() {
  const { touchState } = usePuzzleStore();
  const { isDragging, draggedPiece, dragPosition } = touchState;
  if (!isDragging || !draggedPiece) return null;
  return (
    <div
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: dragPosition.x, top: dragPosition.y }}
    >
      <div className="w-24 h-24 rounded-xl overflow-hidden shadow-2xl border-4 border-blue-400 animate-pulse bg-white/90 backdrop-blur-sm">
        <Image
          src={draggedPiece.canvas.toDataURL()}
          alt={`גרירת חלק ${draggedPiece.id}`}
          width={96}
          height={96}
          className="w-full h-full object-cover brightness-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl" />
      </div>
    </div>
  );
}

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
