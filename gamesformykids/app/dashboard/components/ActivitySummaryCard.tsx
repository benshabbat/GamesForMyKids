'use client';

import { useGameProgress } from '@/hooks/shared/progress/useGameProgress';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function ActivitySummaryCard() {
  const { progress, loading } = useGameProgress();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded" />)}
        </div>
      </div>
    );
  }
  const now = Date.now();
  const gamesThisWeek = progress.filter(
    (p) => now - new Date(p.last_played_at).getTime() < SEVEN_DAYS_MS,
  ).length;

  const totalMinutes = Math.floor(
    progress.reduce((sum, p) => sum + p.total_play_time, 0) / 60,
  );

  const totalGames = progress.filter((p) => p.total_play_time > 0).length;

  const stats = [
    { label: 'משחקים פעילים השבוע', value: gamesThisWeek, icon: '📅' },
    { label: 'סה"כ זמן משחק', value: `${totalMinutes} דק׳`, icon: '⏱️' },
    { label: 'סה"כ משחקים ניסה', value: totalGames, icon: '🎯' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">📈 סיכום פעילות</h2>
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon }) => (
          <div key={label} className="text-center">
            <div className="text-3xl mb-1">{icon}</div>
            <div className="text-2xl font-bold text-purple-700">{value}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
