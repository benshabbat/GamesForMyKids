'use client';

type IsraelCategory = string;

const CAT_COLORS: Record<string, string> = {
  'הכל':      'bg-blue-600 text-white',
  'גאוגרפיה': 'bg-teal-500 text-white',
  'היסטוריה': 'bg-amber-500 text-white',
  'תרבות':    'bg-purple-500 text-white',
  'טבע':      'bg-green-500 text-white',
  'ערים':     'bg-rose-500 text-white',
};

interface Props {
  categories: readonly IsraelCategory[];
  onStart: (cat: IsraelCategory) => void;
}

export default function IsraelMenuScreen({ categories, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-6">🇮🇱</div>
        <h1 className="text-3xl font-bold text-blue-700 mb-2">ישראל שלי</h1>
        <p className="text-gray-500 mb-4">בחר קטגוריה ובחן את הידע שלך!</p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => onStart(cat)}
              className={`py-3 px-2 rounded-xl font-bold text-sm transition-all shadow hover:opacity-90 ${CAT_COLORS[cat] ?? 'bg-gray-400 text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
