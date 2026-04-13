'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { Clock, Trophy, Star as StarIcon, CheckCircle, Target } from 'lucide-react';
import type { ReactNode } from 'react';
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';

// ── PuzzleGrid ────────────────────────────────────────────────────────────────
function PuzzleGrid() {
  const {
    selectedPuzzle, difficulty, placedPieces,
    showHints, showDebug,
    handleDragOver, handleDrop, handleDragStart,
    handleTouchStart, handleTouchMove, handleTouchEnd,
  } = usePuzzleStore();

  const gridSize = selectedPuzzle?.gridSize || difficulty;
  const gridSide = Math.sqrt(gridSize);
  const puzzleTitle = selectedPuzzle ? `🎯 ${selectedPuzzle.name}` : '🎯 לוח הפאזל';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">{puzzleTitle}</h3>
      <div
        className="grid gap-2 mx-auto bg-gray-200 p-4 rounded-lg shadow-inner"
        style={{
          gridTemplateColumns: `repeat(${gridSide}, 1fr)`,
          maxWidth: 'min(400px, 90vw)',
          width: '100%',
          direction: 'ltr',
        }}
      >
        {Array.from({ length: gridSize }, (_, index) => {
          const row = Math.floor(index / gridSide);
          const col = index % gridSide;
          const piece = placedPieces[index];
          return (
            <div
              key={`grid-${index}-${piece?.id || 'empty'}`}
              className={`puzzle-grid-cell aspect-square border-2 rounded-lg relative overflow-hidden transition-all duration-200 min-h-[60px] min-w-[60px] ${
                piece
                  ? 'border-gray-300 bg-gray-100'
                  : 'border-dashed border-gray-400 bg-gray-50 hover:bg-blue-50 hover:border-blue-300'
              }`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              data-grid-index={index}
              title={piece ? `מקום ${index + 1} - תפוס` : `מקום ${index + 1} - ריק`}
              style={{
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {piece && (
                <>
                  <Image
                    src={piece.canvas.toDataURL()}
                    alt={`Piece ${piece.id} at ${row},${col}`}
                    width={100}
                    height={100}
                    className={`w-full h-full object-cover cursor-grab active:cursor-grabbing transition-all duration-300 ${
                      piece.isCorrect
                        ? 'ring-4 ring-green-400 shadow-lg transform scale-105'
                        : 'ring-2 ring-red-400 opacity-80'
                    }`}
                    draggable={!piece.isCorrect}
                    onDragStart={(e) => handleDragStart(e, piece)}
                    onTouchStart={(e) => { e.stopPropagation(); handleTouchStart(e, piece); }}
                    onTouchMove={(e) => { e.stopPropagation(); handleTouchMove(e); }}
                    onTouchEnd={(e) => { e.stopPropagation(); handleTouchEnd(e); }}
                    style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
                    unoptimized
                  />
                  {piece.isCorrect && (
                    <div className="absolute top-1 right-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </div>
                  )}
                  {!piece.isCorrect && piece.isPlaced && (
                    <div className="absolute top-1 right-1 bg-red-500 rounded-full p-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </>
              )}
              {!piece && showHints && (
                <div className="text-gray-400 text-2xl font-bold">{index + 1}</div>
              )}
              {showDebug && (
                <div className="absolute bottom-0 left-0 bg-gray-600 text-white text-xs px-2 py-1 rounded-tr-lg font-mono">
                  {row},{col}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── PiecesPool ────────────────────────────────────────────────────────────────
function PiecesPool() {
  const { pieces, handleDragStart, handleTouchStart, handleTouchMove, handleTouchEnd } = usePuzzleStore();
  const availablePieces = pieces.filter(p => !p.isPlaced);
  const totalPieces = pieces.length;
  const placedOnGrid = pieces.filter(p => p.isPlaced).length;
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">🧩 חלקי הפאזל</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {availablePieces.map((piece) => (
          <div
            key={piece.id}
            className="cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg touch-none min-w-[80px] min-h-[80px]"
            draggable
            onDragStart={(e) => handleDragStart(e, piece)}
            onTouchStart={(e) => handleTouchStart(e, piece)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            title={`חלק ${piece.id} - מיועד לעמדה: ${piece.expectedPosition.row},${piece.expectedPosition.col}`}
            style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', WebkitTapHighlightColor: 'transparent' }}
          >
            <Image
              src={piece.canvas.toDataURL()}
              alt={`Puzzle piece ${piece.id}`}
              width={80}
              height={80}
              className="w-20 h-20 object-cover border-2 border-gray-300 hover:border-blue-400 transition-all duration-200 hover:shadow-lg hover:scale-110"
              unoptimized
            />
          </div>
        ))}
        {availablePieces.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg font-semibold">כל הכבוד! 🎉</p>
            <p>כל החלקים במקומם הנכון!</p>
          </div>
        )}
      </div>
      {availablePieces.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>נותרו {availablePieces.length} חלקים להנחה</p>
          <p className="text-xs text-gray-400 mt-1">
            ({placedOnGrid} על הלוח, {availablePieces.length} כאן, מתוך {totalPieces} סה&quot;כ)
          </p>
          <p className="text-xs text-gray-500 mt-1">💡 חלקים שלא במקום הנכון נשארים על הלוח וניתנים לגרירה</p>
          <p className="text-xs text-blue-500 mt-1">📱 על מכשירים ניידים: לחץ והחזק לגרירה</p>
        </div>
      )}
    </div>
  );
}

// ── PuzzleStats ───────────────────────────────────────────────────────────────
type StatColor = 'blue' | 'purple' | 'green' | 'orange';
const colorMap: Record<StatColor, { bg: string; icon: string; label: string; value: string }> = {
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   label: 'text-blue-600',   value: 'text-blue-800' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', label: 'text-purple-600', value: 'text-purple-800' },
  green:  { bg: 'bg-green-50',  icon: 'text-green-600',  label: 'text-green-600',  value: 'text-green-800' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', label: 'text-orange-600', value: 'text-orange-800' },
};
function StatCard({ icon, label, value, color }: { icon: ReactNode; label: string; value: string; color: StatColor }) {
  const c = colorMap[color];
  return (
    <div className={`${c.bg} p-3 rounded-lg text-center`}>
      <div className="flex items-center justify-center mb-1">
        <span className={`${c.icon} mr-1`}>{icon}</span>
        <span className={`text-xs font-medium ${c.label}`}>{label}</span>
      </div>
      <div className={`text-lg font-bold ${c.value}`}>{value}</div>
    </div>
  );
}
function PuzzleStats({ className = '' }: { className?: string }) {
  const { placedPieces, selectedPuzzle, difficulty, timer, score, isCompleted } = usePuzzleStore();
  const correctPieces = placedPieces.filter(p => p?.isCorrect).length;
  const totalPieces = selectedPuzzle?.gridSize || difficulty;
  const completionPercentage = Math.round((correctPieces / totalPieces) * 100);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const barColor = completionPercentage >= 80 ? 'bg-green-500' : completionPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500';
  const barBg = completionPercentage >= 80 ? 'bg-green-100' : completionPercentage >= 50 ? 'bg-yellow-100' : 'bg-red-100';
  const barText = completionPercentage >= 80 ? 'text-green-600' : completionPercentage >= 50 ? 'text-yellow-600' : 'text-red-600';
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800 flex items-center justify-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        סטטיסטיקות
      </h3>
      <div className="space-y-4">
        <div className={`p-4 rounded-lg ${barBg}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">התקדמות</span>
            <span className={`text-sm font-bold ${barText}`}>{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className={`h-3 rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${completionPercentage}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={<CheckCircle className="w-4 h-4" />} label="חלקים נכונים" value={`${correctPieces}/${totalPieces}`} color="blue" />
          <StatCard icon={<Clock className="w-4 h-4" />} label="זמן" value={`${minutes}:${seconds.toString().padStart(2, '0')}`} color="purple" />
          <StatCard icon={<StarIcon className="w-4 h-4" />} label="ניקוד" value={String(score)} color="green" />
          <StatCard icon={<Target className="w-4 h-4" />} label="יעד" value="100%" color="orange" />
        </div>
        {isCompleted && (
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg border-2 border-green-300">
            <div className="text-center">
              <div className="text-2xl mb-2">🎉</div>
              <div className="text-lg font-bold text-green-800">הפאזל הושלם!</div>
              <div className="text-sm text-green-600">כל הכבוד על העבודה המעולה!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
