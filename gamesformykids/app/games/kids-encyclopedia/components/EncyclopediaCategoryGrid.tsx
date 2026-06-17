'use client';

import { ENCYCLOPEDIA_CATEGORIES } from '@/lib/constants/encyclopediaData';
import { useEncyclopediaStore } from '../encyclopediaStore';

export default function EncyclopediaCategoryGrid() {
  const selectCategory = useEncyclopediaStore((s) => s.selectCategory);
  const showCollection = useEncyclopediaStore((s) => s.showCollection);
  const collection = useEncyclopediaStore((s) => s.collection);

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50 to-blue-100 p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">📚 אנציקלופדיה לילדים</h1>
        <p className="text-center text-blue-600 mb-6 text-lg">בחר נושא ולמד עובדות מדהימות!</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {ENCYCLOPEDIA_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat.id)}
              className={`bg-linear-to-br ${cat.bgGradient} text-white rounded-2xl p-5 flex flex-col items-center gap-2 shadow-lg active:scale-95 transition-transform`}
            >
              <span className="text-5xl">{cat.emoji}</span>
              <span className="text-xl font-bold">{cat.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={showCollection}
          className="w-full bg-linear-to-r from-yellow-400 to-amber-500 text-white rounded-2xl p-4 flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform"
        >
          <span className="text-3xl">⭐</span>
          <span className="text-xl font-bold">המאסף שלי</span>
          {collection.size > 0 && (
            <span className="bg-white text-amber-600 rounded-full px-3 py-0.5 font-bold text-sm">
              {collection.size}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
