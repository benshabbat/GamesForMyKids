'use client';

import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useMultiplicationGameStore } from '../multiplicationGameStore';
import { LEVELS, QUESTIONS_PER_LEVEL, TIME_PER_QUESTION } from '../data/tables';

export default function MultiplicationMenuScreen() {
  const startGame = useMultiplicationGameStore((s) => s.startGame);

  return (
    <GameMenuCard
      emoji="✖️"
      title="לוח הכפל"
      description="בחר לוח כפל ותתחיל!"
      gradientClass="from-violet-50 to-purple-100"
    >
      <div className="grid grid-cols-5 gap-3">
        {LEVELS.map(lv => (
          <button key={lv} onClick={() => startGame(lv)}
            className="aspect-square rounded-2xl text-2xl font-black text-white shadow-lg hover:scale-105 active:scale-95 transition-all bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500">
            {lv}
          </button>
        ))}
      </div>
      <p className="text-center text-purple-500 text-sm mt-4">
        {QUESTIONS_PER_LEVEL} שאלות ל-{TIME_PER_QUESTION} שניות כל אחת
      </p>
    </GameMenuCard>
  );
}
