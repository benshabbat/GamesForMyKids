'use client';

import { useEffect, useState } from 'react';
import { getGamesTodayCount } from '@/lib/utils/engagement/trackGameVisit';

export default function GamesTodayBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getGamesTodayCount());
  }, []);

  if (count === 0) return null;

  const milestoneText = count === 5 ? '🎉 עשרת!'
    : count === 10 ? '🏆 נדיר!'
    : null;

  return (
    <div dir="rtl" className="max-w-6xl mx-auto px-4 mt-2 flex items-center gap-2">
      <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
        🔥 היום שיחקת {count} משחקים
      </span>
      {milestoneText && (
        <span className="text-xs bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 font-bold px-2 py-0.5 rounded-full">
          {milestoneText}
        </span>
      )}
    </div>
  );
}
