'use client';

import { DifficultyPicker } from '@/components/game/shared/DifficultyPicker';
import { useMemorySyncDifficulty } from '../useMemorySyncDifficulty';
import { useMemoryStore } from '../stores/useMemoryStore';
import GameStatsBar from './GameStatsBar';
import GameControls from './GameControls';

function DuoPlayerIndicator() {
  const { mode, players, currentPlayer } = useMemoryStore();
  if (mode !== 'duo') return null;

  return (
    <div className="flex gap-2 justify-center mb-3" dir="rtl">
      {players.map((p, i) => (
        <div
          key={i}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold transition duration-300 ${
            currentPlayer === i
              ? 'bg-white text-purple-700 shadow-lg scale-105'
              : 'bg-white/20 text-white/70'
          }`}
        >
          {currentPlayer === i && <span>🎮</span>}
          <span>{p.name}</span>
          <span className="text-xs opacity-80">{p.score} זוגות</span>
        </div>
      ))}
    </div>
  );
}

export default function MemoryGameHeader() {
  useMemorySyncDifficulty();

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-2xl p-6 shadow-2xl mb-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
        <DuoPlayerIndicator />
        <DifficultyPicker />
        <GameStatsBar />
        <GameControls />
      </div>
    </div>
  );
}
