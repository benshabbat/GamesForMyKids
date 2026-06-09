'use client';

import { DifficultyPicker } from '@/components/game/shared/DifficultyPicker';
import { useMemorySyncDifficulty } from '../useMemorySyncDifficulty';
import GameStatsBar from './GameStatsBar';
import GameControls from './GameControls';

export default function MemoryGameHeader() {
  useMemorySyncDifficulty();

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-2xl p-6 shadow-2xl mb-6">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4">
        <DifficultyPicker />
        <GameStatsBar />
        <GameControls />
      </div>
    </div>
  );
}
