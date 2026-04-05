'use client';

interface Props {
  onStart: () => void;
}

export default function WordBuilderMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full text-center">
        <div className="text-7xl mb-4">🔤</div>
        <h1 className="text-3xl font-bold text-orange-800 mb-3">בניית מילים</h1>
        <p className="text-orange-600 mb-8">סדר את האותיות ובנה את המילה הנכונה!</p>
        <button
          onClick={onStart}
          className="w-full py-5 rounded-2xl text-white font-bold text-2xl bg-gradient-to-l from-orange-500 to-amber-500 shadow-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🚀 התחל!
        </button>
      </div>
    </div>
  );
}
