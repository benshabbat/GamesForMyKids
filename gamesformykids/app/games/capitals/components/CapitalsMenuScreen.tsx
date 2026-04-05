'use client';

interface Props {
  onStart: () => void;
}

export default function CapitalsMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-6">🌍</div>
        <h1 className="text-3xl font-bold text-red-700 mb-2">בירות העולם</h1>
        <p className="text-gray-500 mb-5">מה הבירה של כל מדינה?</p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {(['🇫🇷 פריז', '🇩🇪 ברלין', '🇯🇵 טוקיו', '🇺🇸 וושינגטון'] as const).map(s => (
            <div key={s} className="bg-red-50 rounded-xl px-3 py-2 text-sm font-semibold text-red-700 text-center">{s}</div>
          ))}
        </div>
        <button onClick={onStart} className="w-full py-4 rounded-2xl bg-red-600 text-white text-xl font-bold hover:bg-red-700 transition-all shadow-lg">
          התחל לשחק! 🌍
        </button>
      </div>
    </div>
  );
}
