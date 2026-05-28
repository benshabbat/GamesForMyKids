'use client';

import { useEffect } from 'react';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
import { usePuzzleStore } from '../store/puzzleStore';

export default function CompletionBanner() {
  const { saveGameResultRef } = useGameCompletion('puzzles');

  useEffect(() => {
    // This component only mounts when isCompleted becomes true.
    // Read final score and elapsed time directly from the store to avoid stale closures.
    const { score, timer } = usePuzzleStore.getState();
    saveGameResultRef.current({ score, level: 1, durationSeconds: timer });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // fires once on mount — component only renders when puzzle is solved

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg border-2 border-green-300">
      <div className="text-center">
        <div className="text-2xl mb-2">🎉</div>
        <div className="text-lg font-bold text-green-800">הפאזל הושלם!</div>
        <div className="text-sm text-green-600">כל הכבוד על העבודה המעולה!</div>
      </div>
    </div>
  );
}
