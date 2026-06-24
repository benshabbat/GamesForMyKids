'use client';

import { Search, X } from 'lucide-react';
import { GAME_CATEGORIES } from '@/lib/constants/gameCategories';
import { useAgeFilterStore, type AgeRange } from '@/lib/stores/ageFilterStore';

const AGE_LABELS: Record<AgeRange, string> = {
  all: 'כל הגילאים',
  '3-4': 'גיל 3-4',
  '5-7': 'גיל 5-7',
  '8-10': 'גיל 8-10',
};

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  activeCat: string | null;
  onCatChange: (cat: string | null) => void;
  hasFilter: boolean;
  onClear: () => void;
}

export function GameSearchBar({
  query,
  onQueryChange,
  activeCat,
  onCatChange,
  hasFilter,
  onClear,
}: Props) {
  const ageRange = useAgeFilterStore((s) => s.ageRange);
  const setAgeRange = useAgeFilterStore((s) => s.setAgeRange);

  return (
    <div dir="rtl" className="mb-4 md:mb-6 space-y-3">
      <div className="relative max-w-md mx-auto">
        <span className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="חפש משחק..."
          aria-label="חיפוש משחקים"
          className="w-full pe-10 ps-10 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        />
        {hasFilter && (
          <button
            onClick={onClear}
            aria-label="נקה חיפוש"
            className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Age filter active badge */}
      {ageRange !== 'all' && (
        <div className="flex justify-center">
          <button
            onClick={() => setAgeRange('all')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold hover:bg-purple-200 transition-colors"
            aria-label="הסר סינון גיל"
          >
            <span>🔧</span>
            <span>מסנן: {AGE_LABELS[ageRange]}</span>
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <div
        className="flex gap-2 overflow-x-auto pb-1 px-1"
        style={{ scrollbarWidth: 'none' }}
        role="group"
        aria-label="סינון לפי קטגוריה"
      >
        {Object.entries(GAME_CATEGORIES).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => onCatChange(activeCat === key ? null : key)}
            aria-pressed={activeCat === key}
            className={`flex-shrink-0 px-3 py-2.5 min-h-11 rounded-full text-sm font-semibold transition-colors duration-200 ${
              activeCat === key
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-600 shadow-sm border border-gray-200 dark:border-gray-600'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}
