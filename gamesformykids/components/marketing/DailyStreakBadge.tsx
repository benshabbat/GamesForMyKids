'use client';
import { useState, useEffect } from 'react';
import { getDailyLoginStreak } from '@/lib/utils/engagement/trackDailyLogin';
import { useChildProfileStore } from '@/lib/stores/childProfileStore';

export default function DailyStreakBadge() {
  const activeProfileId = useChildProfileStore((s) => s.activeProfileId);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const { count } = getDailyLoginStreak(activeProfileId);
    setStreak(count);
  }, [activeProfileId]);

  if (streak < 2) return null;

  const fire = streak >= 30 ? '⚡🔥⚡' : streak >= 14 ? '🔥🔥🔥' : streak >= 7 ? '🔥🔥' : '🔥';
  const label =
    streak >= 30
      ? `${streak} ימים ברצף! מדהים!`
      : streak >= 7
        ? `${streak} ימים ברצף! מהמם!`
        : `${streak} ימים ברצף!`;

  return (
    <div className="flex justify-center my-3" dir="rtl">
      <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 text-sm font-bold text-orange-700 shadow-sm">
        <span>{fire}</span>
        <span>{label}</span>
      </div>
    </div>
  );
}
