'use client';

import Image from 'next/image';
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import { PuzzleGrid } from './PuzzleGrid';
import { PiecesPool } from './PiecesPool';
import { PuzzleStats } from './PuzzleStats';

function ReferenceImage() {
  const displayImage = usePuzzleStore(s => s.image);
  if (!displayImage) return null;
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-4 lg:p-6">
      <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 lg:mb-4 text-center">🖼️ תמונת עזר</h3>
      <div className="aspect-square relative rounded-xl overflow-hidden border-4 border-gradient-to-r from-purple-400 to-blue-400 max-w-48 mx-auto lg:max-w-none shadow-lg">
        <Image
          src={displayImage.src}
          alt="תמונת עזר לפאזל"
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 1024px) 192px, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      <p className="text-xs lg:text-sm text-gray-600 text-center mt-2 lg:mt-3 font-medium">
        💡 התמונה המלאה לעזרה בבניית הפאזל
      </p>
    </div>
  );
}

interface GameAreaProps {
  variant: 'simple' | 'custom';
}

export default function GameArea({ variant }: GameAreaProps) {
  const { image } = usePuzzleStore();

  if (variant === 'simple') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PuzzleStats className="mb-6" />
          <PiecesPool />
        </div>
        <div className="lg:col-span-2">
          <PuzzleGrid />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="xl:hidden space-y-4 sm:space-y-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/50">
          <PuzzleStats />
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-3 sm:p-4 border border-white/50">
          <PuzzleGrid />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/50">
          <PiecesPool />
        </div>
        {image && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/50">
            <ReferenceImage />
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden xl:grid xl:grid-cols-4 gap-6 lg:gap-8">
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50">
            <PiecesPool />
          </div>
          {image && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50">
              <ReferenceImage />
            </div>
          )}
        </div>
        <div className="xl:col-span-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-white/50 min-h-[600px]">
            <PuzzleGrid />
          </div>
        </div>
        <div className="xl:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50 sticky top-4">
            <PuzzleStats />
          </div>
        </div>
      </div>
    </>
  );
}
