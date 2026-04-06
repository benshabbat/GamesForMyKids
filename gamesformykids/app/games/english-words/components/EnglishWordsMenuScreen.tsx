'use client';

import type { EnglishCategory } from '../data/words';

const CAT_COLORS: Record<string, string> = {
  'הכל':      'bg-indigo-600 text-white',
  'חיות':     'bg-green-500 text-white',
  'אוכל':     'bg-orange-500 text-white',
  'גוף':      'bg-pink-500 text-white',
  'בית':      'bg-teal-500 text-white',
  'צבעים':    'bg-purple-500 text-white',
  'מספרים':   'bg-blue-500 text-white',
};

interface Props {
  categories: readonly EnglishCategory[];
  onStart: (cat: EnglishCategory) => void;
}

export default function EnglishWordsMenuScreen({ categories, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-6">🔤</div>
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">אנגלית לילדים</h1>
        <p className="text-gray-500 mb-4">בחר קטגוריה ולמד מילים באנגלית!</p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => onStart(cat)}
              className={`py-3 px-2 rounded-xl font-bold text-sm transition-all shadow hover:opacity-90 ${CAT_COLORS[cat] ?? 'bg-gray-400 text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="bg-indigo-50 rounded-2xl p-3 text-sm text-indigo-700">
          <span className="font-semibold">דוגמה: </span>כלב = <span className="font-bold text-indigo-900 text-base">dog</span>
        </div>
      </div>
    </div>
  );
}
