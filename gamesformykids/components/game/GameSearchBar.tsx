'use client';

import { Search, X } from 'lucide-react';
import { GAME_CATEGORIES } from '@/lib/constants/gameCategories';

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
          className="w-full pe-10 ps-10 py-2.5 rounded-full border border-gray-200 bg-white shadow-sm text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
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
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              activeCat === key
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-purple-50 shadow-sm border border-gray-200'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}
