'use client';

import type { GameProgress } from '@/hooks/shared/progress/useGameProgress';
import { getGameLabel } from './gameLabels';

export function ScoreSummaryCard({ progress }: { progress: GameProgress[] }) {
  const played = progress
    .filter((p) => p.best_score > 0)
    .sort((a, b) => b.best_score - a.best_score)
    .slice(0, 6);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">🏆 שיא ניקוד</h2>
      {played.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">עדיין אין משחקים עם ניקוד</p>
      ) : (
        <ul className="space-y-3">
          {played.map((p) => {
            const { name, emoji } = getGameLabel(p.game_type);
            return (
              <li key={p.game_type} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  {emoji} {name}
                </span>
                <span className="text-sm font-bold text-purple-700">{p.best_score}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
