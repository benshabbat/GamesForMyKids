'use client';
import { useEffect } from 'react';
import { usePictureDictionaryStore } from './pictureDictionaryStore';
import type { BrowseMode } from './pictureDictionaryStore';
import DictionaryBrowse from './components/DictionaryBrowse';
import DictionaryCard from './components/DictionaryCard';

const TABS: { mode: BrowseMode; label: string; icon: string }[] = [
  { mode: 'letter', label: 'לפי אות', icon: '🔤' },
  { mode: 'category', label: 'לפי נושא', icon: '📂' },
  { mode: 'search', label: 'חיפוש', icon: '🔍' },
  { mode: 'collection', label: 'האוסף שלי', icon: '⭐' },
];

function CollectionTab() {
  const { collection, expandItem } = usePictureDictionaryStore();

  if (collection.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center" dir="rtl">
        <span className="text-6xl">⭐</span>
        <p className="text-xl font-semibold text-gray-600">האוסף שלך ריק</p>
        <p className="text-gray-400">לחץ על 💾 שמור בכרטיס מילה כדי להוסיף לאוסף</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3" dir="rtl">
      {collection.map((item, i) => (
        <button
          key={`${item.hebrew}-${i}`}
          onClick={() => expandItem(item)}
          className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl shadow hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95"
        >
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center text-4xl ${item.color ?? 'bg-gradient-to-br from-yellow-400 to-orange-500'}`}
          >
            {item.emoji}
          </div>
          <span className="text-sm font-semibold text-gray-700 text-center leading-tight">
            {item.hebrew}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function PictureDictionaryClient() {
  const { browseMode, setBrowseMode, expandedItem, searchQuery, setSearchQuery, initCollection } =
    usePictureDictionaryStore();

  useEffect(() => {
    initCollection();
  }, [initCollection]);

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #fdf4ff 100%)' }}
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-5 text-center shadow-lg">
        <h1 className="text-3xl font-bold">📖 מילון בתמונות</h1>
        <p className="text-purple-200 mt-1 text-sm">גלה מילים עבריות עם תמונות וקול</p>
      </header>

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="flex" dir="rtl">
          {TABS.map(({ mode, label, icon }) => (
            <button
              key={mode}
              onClick={() => setBrowseMode(mode)}
              className={`flex-1 py-3 text-sm font-semibold flex flex-col items-center gap-0.5 transition-colors border-b-2 ${
                browseMode === mode
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="text-xl">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search input */}
      {browseMode === 'search' && (
        <div className="px-4 pt-4" dir="rtl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="חפש מילה בעברית או אנגלית..."
            className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-400 outline-none text-lg font-semibold text-gray-700 bg-white shadow-sm"
            autoFocus
          />
        </div>
      )}

      {/* Main content */}
      <main className="px-4 py-5 max-w-2xl mx-auto">
        {browseMode === 'collection' ? <CollectionTab /> : <DictionaryBrowse />}
      </main>

      {/* Expanded card overlay */}
      {expandedItem && <DictionaryCard item={expandedItem} />}
    </div>
  );
}
