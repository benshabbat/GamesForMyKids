'use client';

import { useEffect, useRef } from 'react';
import { DifficultyPicker } from '@/components/game/shared/DifficultyPicker';
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';
import { useMemoryStore } from '../stores/useMemoryStore';
import GameStatsBar from './GameStatsBar';
import GameControls from './GameControls';

export default function MemoryGameHeader() {
  const { difficulty } = useGameDifficulty();
  const { setDifficulty } = useMemoryStore();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    setDifficulty(difficulty);
  }, [difficulty, setDifficulty]);

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
