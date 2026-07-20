'use client';

import type { HebrewLetterPath } from '@/lib/constants/gameData/hebrewLetterPaths';
import { useLetterCanvas, CANVAS_SIZE, SUCCESS_THRESHOLD } from './useLetterCanvas';

interface Props {
  letter: HebrewLetterPath;
  difficulty: 'guided' | 'free';
  onComplete: (accuracy: number) => void;
}

export default function LetterCanvas({ letter, difficulty, onComplete }: Props) {
  const { canvasRef, done, accuracy, handlePointerDown, handlePointerMove, handlePointerUp } =
    useLetterCanvas({ letter, difficulty, onComplete });

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="touch-none rounded-2xl shadow-lg border-2 border-gray-200 bg-white cursor-crosshair"
        style={{ maxWidth: '100%', width: CANVAS_SIZE, height: CANVAS_SIZE }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      {done && (
        <div className={`text-lg font-bold px-5 py-2 rounded-full ${
          accuracy >= SUCCESS_THRESHOLD
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-orange-100 text-orange-700 border border-orange-300'
        }`}>
          {accuracy >= SUCCESS_THRESHOLD ? '✅ יפה מאוד!' : '💪 נסה שוב!'}
          {' '}{Math.round(accuracy * 100)}%
        </div>
      )}
    </div>
  );
}
