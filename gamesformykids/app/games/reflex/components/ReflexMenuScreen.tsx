'use client';

interface Props {
  gameDuration: number;
  onStart: () => void;
}

export default function ReflexMenuScreen({ gameDuration, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full text-center">
        <div className="text-7xl mb-4">⚡</div>
        <h1 className="text-3xl font-bold text-red-800 mb-3">מהירות תגובה</h1>
        <p className="text-red-600 mb-3">לחץ על הסמלים לפני שהם נעלמים!</p>
        <div className="bg-red-100 rounded-2xl p-4 mb-8 text-sm text-red-700 space-y-1 text-right">
          <p>⏱️ {gameDuration} שניות משחק</p>
          <p>⚡ ככל שאוספים יותר — הסמלים מהירים יותר</p>
          <p>❌ סמל שנעלם = פספוס</p>
        </div>
        <button
          onClick={onStart}
          className="w-full py-5 rounded-2xl text-white font-bold text-2xl bg-gradient-to-l from-rose-500 to-red-600 shadow-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🚀 התחל!
        </button>
      </div>
    </div>
  );
}
