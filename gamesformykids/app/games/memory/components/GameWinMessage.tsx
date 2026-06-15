'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useMemoryStore } from "../stores/useMemoryStore";
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
import { useUniversalGameNavigation } from '@/components/game/universal/navigation/useUniversalGameNavigation';
import WinStatsGrid from "./WinStatsGrid";
import WinAchievements from "./WinAchievements";
import type { DuoPlayer } from '../stores/memoryStoreTypes';

const DIFFICULTY_LEVEL = { easy: 1, medium: 2, hard: 3 } as const;

function DuoResult({ players, onRestart, onMenu }: {
  players: [DuoPlayer, DuoPlayer];
  onRestart: () => void;
  onMenu: () => void;
}) {
  const [p0, p1] = players;
  const isTie = p0.score === p1.score;
  const winnerName = p0.score > p1.score ? p0.name : p1.name;
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-indigo-200 p-4 flex items-center justify-center">
      <div className="max-w-sm w-full mx-auto">
        <div className="text-center p-8 bg-linear-to-r from-yellow-200 via-orange-200 to-pink-200 rounded-3xl shadow-xl" dir="rtl">
          <div className="text-5xl mb-2">{isTie ? '🤝' : '🏆'}</div>
          <h2 className="text-3xl font-black text-orange-800 mb-1">
            {isTie ? 'תיקו!' : `${winnerName} ניצח/ה!`}
          </h2>
          <div className="flex gap-3 justify-center my-5">
            {players.map((p, i) => (
              <div key={i} className={`flex-1 rounded-2xl p-4 shadow-md ${i === 0 ? 'bg-purple-100' : 'bg-pink-100'}`}>
                <div className="text-2xl font-black text-gray-800">{p.score}</div>
                <div className="text-xs text-gray-500">זוגות</div>
                <div className="text-sm font-bold text-gray-700 mt-1">{p.name}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={onRestart}
              className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              🎮 שחק שוב
            </button>
            <button
              onClick={onMenu}
              className="bg-white/80 hover:bg-white text-gray-700 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              🏠 תפריט
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GameWinMessage() {
  const { gameStats, timer, difficulty, getDifficultyConfig, getPerformanceLevel, initializeGame, resetToMenu, mode, players } = useMemoryStore();
  const difficultyConfig = getDifficultyConfig();
  const performance = getPerformanceLevel();

  const { saveGameResultRef } = useGameCompletion('memory');
  const { navigation } = useUniversalGameNavigation({ showHomeButton: false });

  // Fires once on mount — this component only renders when the game is won.
  useEffect(() => {
    saveGameResultRef.current({
      score: gameStats.score,
      level: DIFFICULTY_LEVEL[difficulty],
      durationSeconds: timer,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (mode === 'duo') {
    return (
      <DuoResult
        players={players}
        onRestart={() => initializeGame(difficulty)}
        onMenu={resetToMenu}
      />
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-indigo-200 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center p-8 bg-linear-to-r from-yellow-200 via-orange-200 to-pink-200 rounded-3xl shadow-xl animate-bounce-gentle">
          <div className="mb-6">
            <h2 className="text-5xl font-bold text-orange-800 mb-2">🎉 {performance.level} 🎉</h2>
            <p className="text-2xl text-orange-700 mb-2">
              סיימת ברמת <span className="font-bold">{difficultyConfig.name}</span>!
            </p>
            <p className="text-lg text-orange-600 mb-2">{performance.timeComment}</p>
            <div className={`text-4xl ${performance.color} font-bold`}>
              {performance.emoji} {gameStats.score} נקודות
            </div>
          </div>

          <WinStatsGrid />
          <WinAchievements />

          <div className="bg-white/80 rounded-xl p-6 shadow-lg mb-6">
            <div className="text-3xl mb-2">🌟</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">כל הכבוד!</h3>
            <p className="text-gray-600">זיכרון מעולה! אתה מוכן לאתגר הבא?</p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => initializeGame(difficulty)}
              className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🎮 שחק שוב
            </button>
            {navigation.next && (
              <Link
                href={navigation.next.href}
                className="bg-linear-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <span>משחק הבא</span>
                <span>{navigation.next.title}</span>
                <span>←</span>
              </Link>
            )}
            <button
              onClick={resetToMenu}
              className="bg-white/80 hover:bg-white text-gray-700 font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🏠 תפריט
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
