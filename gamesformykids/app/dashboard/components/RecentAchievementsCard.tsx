'use client';

import type { Achievement } from '@/hooks/shared/progress/useAchievements';

export function RecentAchievementsCard({ achievements }: { achievements: Achievement[] }) {
  const recent = [...achievements]
    .sort((a, b) => new Date(b.earned_at).getTime() - new Date(a.earned_at).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">🥇 הישגים אחרונים</h2>
      {recent.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">עדיין אין הישגים</p>
      ) : (
        <ul className="space-y-3">
          {recent.map((a) => (
            <li key={a.id} className="flex items-center gap-3">
              <span className="text-2xl">{a.icon ?? '🏅'}</span>
              <div>
                <p className="text-sm font-medium text-gray-800">{a.achievement_name}</p>
                {a.description && (
                  <p className="text-xs text-gray-400">{a.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
