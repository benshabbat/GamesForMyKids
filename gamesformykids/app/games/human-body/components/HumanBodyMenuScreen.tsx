'use client';

type BodyCategory = string;

const CATEGORY_COLORS: Record<string, string> = {
  'ראש':             'from-blue-400 to-blue-600',
  'גוף':             'from-green-400 to-green-600',
  'גפיים':           'from-orange-400 to-orange-600',
  'איברים פנימיים':  'from-red-400 to-red-600',
};

interface Props {
  onStart: (category: BodyCategory) => void;
}

const CATEGORIES: BodyCategory[] = ['הכל', 'ראש', 'גוף', 'גפיים', 'איברים פנימיים'];
const CAT_LABELS: Record<string, string> = {
  'ראש': '🧠 ראש', 'גוף': '💪 גוף', 'גפיים': '🙌 גפיים', 'איברים פנימיים': '❤️ איברים פנימיים', 'הכל': '🦴 הכל',
};

export default function HumanBodyMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="text-8xl mb-4">🦴</div>
      <h1 className="text-4xl font-bold text-red-700 mb-2">גוף האדם</h1>
      <p className="text-gray-600 mb-8 text-center">גלה את הפלאות של גוף האדם!</p>
      <div className="grid grid-cols-2 gap-3 mb-8 w-full max-w-sm">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => onStart(cat)}
            className={`py-3 px-4 rounded-xl font-bold text-white shadow-md active:scale-95 transition-all bg-gradient-to-r ${CATEGORY_COLORS[cat] ?? 'from-gray-400 to-gray-600'} ${cat === 'הכל' ? 'col-span-2' : ''}`}>
            {CAT_LABELS[cat]}
          </button>
        ))}
      </div>
    </div>
  );
}
