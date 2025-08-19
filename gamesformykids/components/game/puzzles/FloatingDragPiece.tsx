'use client';

import Image from 'next/image';
import { PuzzlePiece } from '@/app/games/puzzles/utils/puzzleUtils';
import { usePuzzleContext } from '@/contexts';

interface FloatingDragPieceProps {
  isDragging?: boolean; // Optional - defaults to context
  draggedPiece?: PuzzlePiece | null; // Optional - defaults to context
  dragPosition?: { x: number; y: number }; // Optional - defaults to context
}

export default function FloatingDragPiece({ 
  isDragging: propIsDragging,
  draggedPiece: propDraggedPiece,
  dragPosition: propDragPosition
}: FloatingDragPieceProps = {}) {
  const { state } = usePuzzleContext();
  
  // Use props if provided, otherwise use context
  const isDragging = propIsDragging ?? state.touchState.isDragging;
  const draggedPiece = propDraggedPiece ?? state.touchState.draggedPiece;
  const dragPosition = propDragPosition ?? state.touchState.dragPosition;

  if (!isDragging || !draggedPiece) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: dragPosition.x,
        top: dragPosition.y,
      }}
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
