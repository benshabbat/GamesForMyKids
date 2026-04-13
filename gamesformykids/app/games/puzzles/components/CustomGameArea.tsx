'use client';

import { usePuzzleContext } from '@/contexts';
import {
  PuzzleGrid,
  PiecesPool,
  PuzzleStats,
  ReferenceImage,
} from './index';

export default function CustomGameArea() {
  const { image } = usePuzzleContext();

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
