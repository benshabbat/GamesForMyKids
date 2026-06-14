'use client';

import { useCallback } from 'react';
import { GAME_CATEGORIES } from '@/lib/constants/gameCategories';
import { useHomePageStore } from '@/lib/stores';

export default function CategoryJumpBar() {
  const showCategoriesView = useHomePageStore((s) => s.showCategoriesView);

  const handleClick = useCallback((key: string) => {
    showCategoriesView();
    // Let the view render before scrolling
    setTimeout(() => {
      const el = document.getElementById(`category-${key}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }, [showCategoriesView]);

  return (
    <div
      dir="rtl"
      className="sticky top-16 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 px-3 py-2 min-w-max">
          {Object.entries(GAME_CATEGORIES).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                aria-label={category.title}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors group shrink-0"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-tight max-w-[60px] text-center line-clamp-1">
                  {category.title.replace('📚 ', '').replace('🕹️ ', '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
