"use client";

import { ComponentTypes } from "@/lib/types";

export default function CategoryCard({
  category,
  gamesCount,
  playedCount = 0,
  onClick
}: ComponentTypes.CategoryCardProps) {
  const Icon = category.icon;
  const progressPct = gamesCount > 0 ? Math.round((playedCount / gamesCount) * 100) : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${category.title} — ${gamesCount} משחקים${playedCount > 0 ? `, שיחקת ${playedCount}` : ''}`}
      className={`w-full relative p-3 md:p-4 lg:p-6 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl transition-[transform,box-shadow] duration-300 hover:scale-105 cursor-pointer hover:shadow-2xl bg-gradient-to-br ${category.gradient}`}
    >
      <div className="text-center text-white">
        <div className="mb-2 md:mb-4 flex justify-center">
          <Icon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
        </div>
        <h3 className="text-base md:text-lg lg:text-2xl font-bold mb-1 md:mb-2 leading-tight">
          {category.title}
        </h3>
        <p className="text-xs md:text-sm lg:text-base opacity-90 mb-2 md:mb-3 hidden sm:block">
          {category.description}
        </p>
        <div className="bg-black/25 rounded-full py-1 px-2 md:py-2 md:px-4 inline-block border border-white/30 shadow-md">
          <span className="font-bold text-white text-xs md:text-sm drop-shadow">
            {gamesCount} משחקים
          </span>
        </div>
        {playedCount > 0 && (
          <div className="mt-2 md:mt-3">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-white/80 text-xs">{playedCount}/{gamesCount}</span>
              <span className="text-white/80 text-xs">{progressPct}%</span>
            </div>
            <div className="h-1.5 bg-black/25 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/70 rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
                aria-hidden
              />
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
