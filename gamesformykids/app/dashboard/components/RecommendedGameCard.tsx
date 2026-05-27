'use client';

import Link from 'next/link';
import { useGameProgress } from '@/hooks/shared/progress/useGameProgress';
import type { GameProgress } from '@/hooks/shared/progress/useGameProgress';
import { getGameLabel } from './gameLabels';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function getRecommended(progress: GameProgress[]): GameProgress | null {
  if (progress.length === 0) return null;
  const now = Date.now();

  // Prefer games played recently but with room to improve (lowest best_score among recent)
  const recent = progress.filter(
    (p) => now - new Date(p.last_played_at).getTime() < SEVEN_DAYS_MS,
  );
  const pool = recent.length > 0 ? recent : progress;
  return pool.reduce((worst, p) => (p.best_score < worst.best_score ? p : worst), pool[0]!);
}

export function RecommendedGameCard() {
  const { progress, loading } = useGameProgress();

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="h-16 bg-white/50 rounded" />
      </div>
    );
  }

  const rec = getRecommended(progress);

  if (!rec) {
    return (
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">💡 המשחק הבא</h2>
        <p className="text-gray-500 text-sm">שחקו כדי לקבל המלצה!</p>
      </div>
    );
  }

  const { name, emoji } = getGameLabel(rec.game_type);

  return (
    <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-3">💡 מומלץ לאימון</h2>
      <div className="flex items-center gap-4">
        <span className="text-5xl">{emoji}</span>
        <div>
          <p className="font-bold text-purple-800 text-lg">{name}</p>
          <p className="text-sm text-gray-500">שיא: {rec.best_score} נקודות</p>
        </div>
      </div>
      <Link
        href={`/games/${rec.game_type}`}
        className="mt-4 inline-block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl transition-colors"
      >
        בואו נשחק!
      </Link>
    </div>
  );
}
