'use client';
import { useMemoryStore } from '../stores/useMemoryStore';
import GameMenuCard from '@/components/game/shared/GameMenuCard';

export default function MemoryStartScreen() {
  const { initializeGame } = useMemoryStore();

  return (
    <GameMenuCard
      emoji="🧠"
      title="משחק הזיכרון"
      description="מצאו את הזוגות הזהים על הלוח!"
      gradientClass="from-pink-100 via-purple-100 to-indigo-200"
    >
      <div className="flex flex-col gap-3">
        <button
          onClick={() => initializeGame('EASY')}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🎮 התחל משחק קל
        </button>
        <button
          onClick={() => initializeGame('MEDIUM')}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🌟 התחל משחק בינוני
        </button>
        <button
          onClick={() => initializeGame('HARD')}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🔥 התחל משחק קשה
        </button>
      </div>
    </GameMenuCard>
  );
}
