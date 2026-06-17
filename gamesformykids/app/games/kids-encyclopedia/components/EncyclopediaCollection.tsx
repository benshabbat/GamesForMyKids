'use client';

import { ENCYCLOPEDIA_ENTRIES, ENCYCLOPEDIA_CATEGORIES } from '@/lib/constants/encyclopediaData';
import { useEncyclopediaStore } from '../encyclopediaStore';

export default function EncyclopediaCollection() {
  const backToCategories = useEncyclopediaStore((s) => s.backToCategories);
  const collection = useEncyclopediaStore((s) => s.collection);
  const openCard = useEncyclopediaStore((s) => s.openCard);
  const selectCategory = useEncyclopediaStore((s) => s.selectCategory);

  const collectedEntries = ENCYCLOPEDIA_CATEGORIES.flatMap((cat) =>
    (ENCYCLOPEDIA_ENTRIES[cat.id] ?? [])
      .filter((e) => collection.has(e.id))
      .map((e) => ({ ...e, catId: cat.id, catEmoji: cat.emoji, catName: cat.name, catGradient: cat.bgGradient }))
  );

  const handleOpen = (catId: string, entryId: string) => {
    selectCategory(catId);
    openCard(entryId);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 to-amber-100 p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={backToCategories}
            className="bg-white rounded-xl px-3 py-2 shadow text-amber-700 font-bold"
          >
            ← חזרה
          </button>
          <h2 className="text-2xl font-bold text-amber-800">⭐ המאסף שלי</h2>
          <span className="bg-amber-400 text-white rounded-full px-3 py-0.5 font-bold">
            {collectedEntries.length}
          </span>
        </div>

        {collectedEntries.length === 0 ? (
          <div className="text-center py-16 text-amber-600">
            <p className="text-6xl mb-4">📭</p>
            <p className="text-xl font-bold">האוסף ריק עדיין</p>
            <p className="text-gray-500 mt-2">לחץ ⭐ שמור בכרטיס כדי להוסיף!</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {collectedEntries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => handleOpen(entry.catId, entry.id)}
                className="bg-white rounded-2xl p-3 shadow-md flex flex-col items-center gap-1 active:scale-95 transition-transform"
              >
                <span className="text-4xl">{entry.emoji}</span>
                <span className="text-xs font-semibold text-gray-700 text-center">{entry.name}</span>
                <span className="text-xs text-gray-400">{entry.catEmoji}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
