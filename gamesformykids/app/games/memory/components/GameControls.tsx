'use client';

import { useRouter } from 'next/navigation';
import { Home, Play, Pause, RotateCcw } from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';
import GameProgressBar from './GameProgressBar';
import { ROUTES } from '@/lib/constants/routes';

export default function GameControls() {
  const router = useRouter();
  const { isGamePaused, pauseGame, resumeGame, resetGame } = useMemoryStore();

  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={() => router.push(ROUTES.HOME)}
        className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
      >
        <Home className="inline w-5 h-5 ml-2" /> חזרה
      </button>

      <div className="flex gap-3">
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
