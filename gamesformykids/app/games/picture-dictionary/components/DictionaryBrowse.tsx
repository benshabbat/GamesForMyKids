'use client';
import { useMemo } from 'react';
import {
  usePictureDictionaryStore,
  buildDictionary,
  getFirstHebrewLetter,
  HEBREW_ALPHABET,
  CATEGORY_LABELS,
} from '../pictureDictionaryStore';
import type { DictionaryItem } from '../pictureDictionaryStore';

function ItemTile({ item }: { item: DictionaryItem }) {
  const { expandItem } = usePictureDictionaryStore();
  return (
    <button
      onClick={() => expandItem(item)}
      className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl shadow hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95 cursor-pointer"
    >
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center text-4xl ${item.color ?? 'bg-gradient-to-br from-blue-400 to-purple-500'}`}
      >
        {item.emoji}
      </div>
      <span className="text-sm font-semibold text-gray-700 text-center leading-tight" dir="rtl">
        {item.hebrew}
      </span>
    </button>
  );
}

export default function DictionaryBrowse() {
  const {
    browseMode, selectedLetter, selectedCategory,
    searchQuery, selectLetter, selectCategory,
  } = usePictureDictionaryStore();

  const allItems = useMemo(() => buildDictionary(), []);

  const displayedItems = useMemo((): DictionaryItem[] => {
    if (browseMode === 'letter' && selectedLetter) {
      return allItems.filter((item) => getFirstHebrewLetter(item.hebrew) === selectedLetter);
    }
    if (browseMode === 'category' && selectedCategory) {
      return allItems.filter((item) => item.category === selectedCategory);
    }
    if (browseMode === 'search' && searchQuery.trim().length > 0) {
      const q = searchQuery.trim();
      return allItems.filter(
        (item) => item.hebrew.includes(q) || item.english.toLowerCase().includes(q.toLowerCase())
      );
    }
    return [];
  }, [browseMode, selectedLetter, selectedCategory, searchQuery, allItems]);

  const categoryKeys = useMemo(
    () => Object.keys(CATEGORY_LABELS).filter((k) => allItems.some((i) => i.category === k)),
    [allItems]
  );

  return (
    <div className="flex flex-col gap-4" dir="rtl">
      {/* Letter bar */}
      {browseMode === 'letter' && (
        <div className="flex flex-wrap gap-1.5 justify-start">
          {HEBREW_ALPHABET.map((letter) => (
            <button
              key={letter}
              onClick={() => selectLetter(letter)}
              className={`w-10 h-10 rounded-xl font-bold text-lg transition-colors ${
                selectedLetter === letter
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-purple-100 shadow'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {/* Category grid */}
      {browseMode === 'category' && !selectedCategory && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => selectCategory(key)}
              className="bg-white rounded-2xl shadow p-4 flex flex-col items-center gap-1 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span className="text-3xl">
                {allItems.find((i) => i.category === key)?.emoji ?? '📦'}
              </span>
              <span className="text-sm font-semibold text-gray-700 text-center">
                {CATEGORY_LABELS[key]}
              </span>
              <span className="text-xs text-gray-400">
                {allItems.filter((i) => i.category === key).length} פריטים
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Back button when category selected */}
      {browseMode === 'category' && selectedCategory && (
        <button
          onClick={() => selectCategory(null)}
          className="self-start flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold"
        >
          ← חזרה לקטגוריות
        </button>
      )}

      {/* Item grid */}
      {displayedItems.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {displayedItems.map((item, i) => (
            <ItemTile key={`${item.hebrew}-${i}`} item={item} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {displayedItems.length === 0 && (browseMode !== 'category' || selectedCategory) && (
        <div className="text-center text-gray-400 py-12 text-lg">
          {browseMode === 'search' && searchQuery.length === 0
            ? 'הקלד אותיות לחיפוש...'
            : 'לא נמצאו פריטים'}
        </div>
      )}
    </div>
  );
}
