'use client';

type NatureCategory = string;

const CAT_COLORS: Record<string, string> = {
  'הכל':       'bg-green-600 text-white',
  'בעלי חיים': 'bg-amber-500 text-white',
  'צמחים':     'bg-emerald-500 text-white',
  'מזג אוויר': 'bg-blue-500 text-white',
  'חלל':       'bg-indigo-600 text-white',
  'מים':       'bg-cyan-500 text-white',
};

interface Props {
  categories: readonly NatureCategory[];
  onStart: (cat: NatureCategory) => void;
}

export default function NatureMenuScreen({ categories, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-6">🌱</div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">עולם הטבע</h1>
        <p className="text-gray-500 mb-4">בחר קטגוריה ולמד על הטבע!</p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => onStart(cat)}
              className={`py-3 rounded-xl font-bold text-sm transition-all shadow hover:opacity-90 ${CAT_COLORS[cat] ?? 'bg-gray-400 text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
