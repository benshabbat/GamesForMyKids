'use client';

import { useState } from 'react';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { DifficultyPicker } from '@/components/game/shared/DifficultyPicker';
import { useMemoryStore } from '../stores/useMemoryStore';
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';
import { MEMORY_GAME_CONSTANTS } from '@/lib/constants/gameData/special';
import type { MemoryMode } from '../stores/memoryStoreTypes';

export default function MemoryStartScreen() {
  const { initializeGame, setMode, setPlayerNames, mode, players } = useMemoryStore();
  const { difficulty } = useGameDifficulty();

  const [p1, setP1] = useState(players[0].name);
  const [p2, setP2] = useState(players[1].name);

  const handleStart = () => {
    if (mode === 'duo') {
      setPlayerNames(p1, p2);
    }
    initializeGame(difficulty);
  };

  const handleModeChange = (m: MemoryMode) => setMode(m);

  const hint = `${MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[difficulty].pairs} זוגות`;

  return (
    <GameMenuCard
      emoji="🧠"
      title="משחק הזיכרון"
      description="מצאו את הזוגות הזהים על הלוח!"
      gradientClass="from-pink-100 via-purple-100 to-indigo-200"
      hint={hint}
      onStart={handleStart}
      startLabel="🧠 התחל!"
    >
      <DifficultyPicker />

      {/* Mode toggle */}
      <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-4" dir="rtl">
        <button
          onClick={() => handleModeChange('solo')}
          className={`flex-1 py-2 text-sm font-bold transition-colors ${
            mode === 'solo'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-500 hover:bg-purple-50'
          }`}
        >
          👤 יחיד
        </button>
        <button
          onClick={() => handleModeChange('duo')}
          className={`flex-1 py-2 text-sm font-bold transition-colors ${
            mode === 'duo'
              ? 'bg-pink-500 text-white'
              : 'bg-white text-gray-500 hover:bg-pink-50'
          }`}
        >
          👥 שני שחקנים
        </button>
      </div>

      {/* Player name inputs (duo mode only) */}
      {mode === 'duo' && (
        <div className="space-y-2 mb-2" dir="rtl">
          <input
            type="text"
            value={p1}
            onChange={(e) => setP1(e.target.value)}
            placeholder="שם שחקן 1"
            maxLength={20}
            className="w-full border border-purple-200 rounded-xl px-3 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            value={p2}
            onChange={(e) => setP2(e.target.value)}
            placeholder="שם שחקן 2"
            maxLength={20}
            className="w-full border border-pink-200 rounded-xl px-3 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
      )}
    </GameMenuCard>
  );
}
