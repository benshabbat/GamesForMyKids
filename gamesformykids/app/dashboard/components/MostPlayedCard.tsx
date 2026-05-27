'use client';

import { useGameProgress } from '@/hooks/shared/progress/useGameProgress';
import { getGameLabel } from './gameLabels';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function formatMinutes(seconds: number) {
  const m = Math.floor(seconds / 60);
  if (m < 1) return 'פחות מדקה';
  return `${m} דק׳`;
}

export function MostPlayedCard() {
  const { progress, loading } = useGameProgress();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="h-8 bg-gray-100 rounded" />)}
        </div>
      </div>
    );
  }
  const now = Date.now();
  const recent = progress
    .filter((p) => now - new Date(p.last_played_at).getTime() < SEVEN_DAYS_MS)
    .sort((a, b) => b.total_play_time - a.total_play_time)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">🕹️ הכי משחקים (7 ימים אחרונים)</h2>
      {recent.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">אין נתונים לשבוע האחרון</p>
      ) : (
        <ul className="space-y-3">
          {recent.map((p) => {
            const { name, emoji } = getGameLabel(p.game_type);
            const maxTime = recent[0]!.total_play_time || 1;
            const pct = Math.round((p.total_play_time / maxTime) * 100);
            return (
              <li key={p.game_type}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {emoji} {name}
                  </span>
                  <span className="text-xs text-gray-400">{formatMinutes(p.total_play_time)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-purple-400 h-2 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
