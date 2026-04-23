'use client';

import { Play, Pause, RotateCcw } from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';
import GameProgressBar from './GameProgressBar';

export default function GameControls() {
  const { isGamePaused, pauseGame, resumeGame, resetGame } = useMemoryStore();

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex justify-center gap-3">
        <button
          onClick={isGamePaused ? resumeGame : pauseGame}
          className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
        >
          {isGamePaused
            ? <Play className="inline w-5 h-5 ml-2" />
            : <Pause className="inline w-5 h-5 ml-2" />}
          {isGamePaused ? 'המשך' : 'השהה'}
        </button>

        <button
          onClick={resetGame}
          className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
        >
          <RotateCcw className="inline w-5 h-5 ml-2" /> מחדש
        </button>
      </div>

      <GameProgressBar />
    </div>
  );
}
