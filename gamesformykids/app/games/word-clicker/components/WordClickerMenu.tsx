'use client';
interface Props { onStart: () => void; }

export default function WordClickerMenu({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100 p-6" dir="rtl">
      <div className="text-8xl mb-6">👆</div>
      <h1 className="text-4xl font-black text-pink-800 mb-3 text-center">מילה בלחיצה</h1>
      <p className="text-lg text-pink-600 mb-2 text-center">לחץ על האותיות בסדר הנכון ובנה מילים בעברית!</p>
      <div className="bg-white rounded-2xl p-5 shadow-md mb-8 max-w-xs w-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👀</span>
            <span className="text-gray-700 font-medium">ראה את המילה</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">👆</span>
            <span className="text-gray-700 font-medium">לחץ אותיות לפי הסדר</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <span className="text-gray-700 font-medium">השלם מילים וצבור נקודות!</span>
          </div>
        </div>
      </div>
      <button
        onClick={onStart}
        className="bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black text-xl px-10 py-4 rounded-2xl shadow-lg transition-all"
      >
        בואו נתחיל! 👆
      </button>
    </div>
  );
}
