'use client';

import { ENCYCLOPEDIA_ENTRIES, ENCYCLOPEDIA_CATEGORIES } from '@/lib/constants/encyclopediaData';
import { useEncyclopediaStore } from '../encyclopediaStore';

export default function EncyclopediaEntryGrid() {
  const selectedCategory = useEncyclopediaStore((s) => s.selectedCategory);
  const openCard = useEncyclopediaStore((s) => s.openCard);
  const backToCategories = useEncyclopediaStore((s) => s.backToCategories);
  const collection = useEncyclopediaStore((s) => s.collection);

  const entries = selectedCategory ? (ENCYCLOPEDIA_ENTRIES[selectedCategory] ?? []) : [];
  const cat = ENCYCLOPEDIA_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50 to-blue-100 p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={backToCategories}
            className="bg-white rounded-xl px-3 py-2 shadow text-blue-700 font-bold"
          >
            ← חזרה
          </button>
          <h2 className="text-2xl font-bold text-blue-800">
            {cat?.emoji} {cat?.name}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {entries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => openCard(entry.id)}
              className="bg-white rounded-2xl p-3 shadow-md flex flex-col items-center gap-1 active:scale-95 transition-transform relative"
            >
              {collection.has(entry.id) && (
                <span className="absolute top-1 left-1 text-yellow-400 text-lg">⭐</span>
              )}
              <span className="text-4xl">{entry.emoji}</span>
              <span className="text-sm font-semibold text-gray-700 text-center">{entry.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
