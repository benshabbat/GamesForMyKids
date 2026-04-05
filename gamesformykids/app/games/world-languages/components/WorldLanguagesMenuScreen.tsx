'use client';

const PREVIEW = ['🇮🇱 עברית', '🇫🇷 צרפתית', '🇯🇵 יפנית', '🇧🇷 פורטוגזית'];

interface Props {
  onStart: () => void;
}

export default function WorldLanguagesMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-6 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full text-center">
        <div className="text-7xl mb-4">🌐</div>
        <h1 className="text-3xl font-bold text-emerald-800 mb-3">שפות העולם</h1>
        <p className="text-emerald-600 mb-6">באיזו שפה מדברים בכל מדינה?</p>
        <div className="grid grid-cols-2 gap-3 mb-8 text-lg">
          {PREVIEW.map(s => (
            <div key={s} className="bg-white rounded-2xl py-3 px-4 shadow font-bold text-gray-700">{s}</div>
          ))}
        </div>
        <button
          onClick={onStart}
          className="w-full py-5 rounded-2xl text-white font-bold text-2xl bg-gradient-to-l from-emerald-500 to-green-600 shadow-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🌍 בואו נלמד!
        </button>
      </div>
    </div>
  );
}
