'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';
import { getActiveHoliday, daysUntilHoliday } from '@/lib/constants/holidayLanes';

export default function HolidayLane() {
  const holiday = useMemo(() => getActiveHoliday(), []);

  const games = useMemo(() => {
    if (!holiday) return [];
    return holiday.gameIds.flatMap((id) => {
      const g = GamesRegistry.getGameById(id);
      return g ? [g] : [];
    });
  }, [holiday]);

  if (!holiday || games.length === 0) return null;

  const daysLeft = daysUntilHoliday(holiday);
  const countdown = daysLeft > 0 ? `${daysLeft} ימים` : 'היום!';

  return (
    <div className="max-w-6xl mx-auto px-4 py-4" dir="rtl">
      <div className={`rounded-2xl bg-gradient-to-l ${holiday.color} p-4 shadow-lg`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{holiday.emoji}</span>
            <div>
              <h3 className="text-white font-extrabold text-lg leading-tight">
                {holiday.name} מתקרב!
              </h3>
              <p className="text-white/80 text-xs">{countdown}</p>
            </div>
          </div>
          <span className="text-white/60 text-xs bg-black/10 rounded-full px-3 py-1">
            {games.length} משחקים
          </span>
        </div>

        {/* Horizontal scroll lane */}
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {games.map((game) => (
            <Link
              key={game.id}
              href={game.href}
              className="flex-shrink-0 flex flex-col items-center bg-white/90 hover:bg-white rounded-xl p-3 gap-1 shadow-sm hover:shadow-md transition-[background-color,box-shadow,transform] duration-150 active:scale-95"
              style={{ minWidth: '88px', maxWidth: '96px' }}
            >
              <span className="text-2xl">{game.emoji}</span>
              <span className="text-xs font-bold text-gray-700 text-center leading-tight line-clamp-2">
                {game.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
