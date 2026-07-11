'use client';

import Link from 'next/link';
import { useWeeklyInsight } from '@/hooks/shared/progress/useWeeklyInsight';
import { getGameLabel } from './gameLabels';

export function WeeklyInsightCard() {
  const insight = useWeeklyInsight();

  if (!insight) {
    return (
      <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl shadow-md p-6 col-span-2">
        <h2 className="text-lg font-bold text-gray-800 mb-2">🗓️ השבוע שהיה</h2>
        <p className="text-gray-500 text-sm">שחקו השבוע כדי לראות תובנות לפי נושא!</p>
      </div>
    );
  }

  const { strongest, weakest, recommendedGameId, gamesPlayedThisWeek } = insight;
  const sameCategory = strongest.categoryKey === weakest.categoryKey;
  const { name: recommendedName, emoji: recommendedEmoji } = getGameLabel(recommendedGameId);

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl shadow-md p-6 col-span-2">
      <h2 className="text-lg font-bold text-gray-800 mb-1">🗓️ השבוע שהיה</h2>
      <p className="text-xs text-gray-500 mb-4">{gamesPlayedThisWeek} משחקים השבוע</p>

      {sameCategory ? (
        <div className="bg-white/70 rounded-xl p-4">
          <p className="font-semibold text-gray-800">🎯 {strongest.title}</p>
          <p className="text-sm text-gray-600 mt-1">דיוק ממוצע: {strongest.accuracy}%</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-white/70 rounded-xl p-4">
            <p className="font-semibold text-gray-800">🏆 החזקה השבוע</p>
            <p className="text-sm text-gray-600 mt-1">{strongest.title} — {strongest.accuracy}% דיוק</p>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <p className="font-semibold text-gray-800">💪 כדאי לתרגל</p>
            <p className="text-sm text-gray-600 mt-1">{weakest.title} — {weakest.accuracy}% דיוק</p>
          </div>
        </div>
      )}

      <Link
        href={`/games/${recommendedGameId}`}
        className="mt-4 flex items-center justify-between bg-white hover:bg-indigo-50 transition-colors rounded-xl p-3"
      >
        <span className="text-sm font-medium text-gray-700">{recommendedEmoji} תרגלו: {recommendedName}</span>
        <span className="text-indigo-600 font-bold">←</span>
      </Link>
    </div>
  );
}
