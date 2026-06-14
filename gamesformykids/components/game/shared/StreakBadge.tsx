'use client';

import { useGameProgressStore } from '@/lib/stores/gameProgressStore';

export function StreakBadge() {
  const streak = useGameProgressStore((s) => s.streakCount);

  if (streak < 3) return null;

  const fire = streak >= 20 ? '⚡' : streak >= 10 ? '🔥🔥🔥' : streak >= 5 ? '🔥🔥' : '🔥';
  const bonus = streak >= 20 ? '+20 נקודות בונוס!' : streak >= 10 ? '+10 נקודות בונוס!' : streak >= 5 ? '+5 נקודות בונוס!' : null;

  return (
    <div
      dir="rtl"
      className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 text-sm font-bold text-orange-700 motion-safe:animate-pulse"
      aria-live="polite"
    >
      <span>{fire}</span>
      <span>{streak} ברצף!</span>
      {bonus && <span className="text-xs font-semibold text-orange-500">({bonus})</span>}
    </div>
  );
}
