'use client';

import { useEffect, useRef, useState } from 'react';
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
  resultsCount: number;
}

export function GameSearchBar({
  query,
  onQueryChange,
  activeCat,
  onCatChange,
  hasFilter,
  onClear,
  resultsCount,
}: Props) {
  const ageRange = useAgeFilterStore((s) => s.ageRange);
  const setAgeRange = useAgeFilterStore((s) => s.setAgeRange);
  const inputRef = useRef<HTMLInputElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  // "/" focuses the search input from anywhere on the page, unless the user
  // is already typing in a text field (input/textarea/contenteditable).
  // Listens on keyup (not keydown): moving focus while the key's own
  // keydown->text-insertion is still pending can leak the "/" character
  // into the newly-focused input in some browsers. By keyup that
  // insertion (or its prevention) against the original target is already
  // fully resolved, so it's safe to move focus.
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key !== '/') return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const isEditable =
        tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable;
      if (isEditable) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  // Track whether the category chip row overflows so the edge fade only
  // shows up when there's actually more content off-screen.
  useEffect(() => {
    const el = chipsRef.current;
    if (!el) return;
    const checkOverflow = () => setHasOverflow(el.scrollWidth > el.clientWidth + 1);
    checkOverflow();
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);
    window.addEventListener('resize', checkOverflow);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  // Let vertical mouse-wheel scroll the chip row horizontally, since most
  // desktop users won't think to drag it.
  useEffect(() => {
    const el = chipsRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      // In RTL, modern browsers use negative scrollLeft values going
      // "forward" (toward later items), so the delta must be inverted.
      const isRtl = getComputedStyle(el).direction === 'rtl';
      el.scrollLeft += isRtl ? -e.deltaY : e.deltaY;
      e.preventDefault();
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClear();
      inputRef.current?.blur();
    }
  };

  return (
    <div dir="rtl" className="mb-4 md:mb-6 space-y-3">
      <div className="relative max-w-md mx-auto">
        <span className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="חפש משחק..."
          aria-label="חיפוש משחקים"
          aria-keyshortcuts="/"
          className="peer w-full pe-10 ps-10 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 transition-shadow focus:outline-none focus:ring-4 focus:ring-purple-400/40 dark:focus:ring-purple-300/30 focus:border-purple-400 dark:focus:border-purple-300 focus:shadow-md"
        />
        {hasFilter ? (
          <button
            onClick={onClear}
            aria-label="נקה חיפוש"
            className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 dark:focus-visible:ring-purple-300"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <kbd
            aria-hidden="true"
            className="hidden sm:flex absolute end-3 top-1/2 -translate-y-1/2 items-center justify-center min-w-[1.25rem] px-1 py-0.5 text-[10px] font-mono text-gray-400 dark:text-gray-500 border border-gray-300 dark:border-gray-600 rounded pointer-events-none peer-focus:hidden"
          >
            /
          </kbd>
        )}
      </div>

      {/* Live result count: visible while typing, announced to screen readers */}
      <p
        aria-live="polite"
        className={`text-center text-xs font-medium text-gray-500 dark:text-gray-400 ${
          hasFilter ? '' : 'sr-only'
        }`}
      >
        {hasFilter ? `${resultsCount} משחקים נמצאו` : ''}
      </p>

      {/* Age filter active badge */}
      {ageRange !== 'all' && (
        <div className="flex justify-center">
          <button
            onClick={() => setAgeRange('all')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/60 transition-colors"
            aria-label="הסר סינון גיל"
          >
            <span>🔧</span>
            <span>מסנן: {AGE_LABELS[ageRange]}</span>
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="relative">
        <div
          ref={chipsRef}
          className="flex gap-2 overflow-x-auto pb-1 px-1"
          style={
            hasOverflow
              ? {
                  scrollbarWidth: 'none',
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)',
                  maskImage:
                    'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)',
                }
              : { scrollbarWidth: 'none' }
          }
          role="group"
          aria-label="סינון לפי קטגוריה"
        >
          {Object.entries(GAME_CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => onCatChange(activeCat === key ? null : key)}
              aria-pressed={activeCat === key}
              className={`flex-shrink-0 px-3 py-2.5 min-h-11 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-300 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 ${
                activeCat === key
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-600 hover:shadow-md shadow-sm border border-gray-200 dark:border-gray-600'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
