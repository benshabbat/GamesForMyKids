'use client';

interface Props {
  onStart: () => void;
}

export default function SpellingMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-6 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full text-center">
        <div className="text-7xl mb-4">📝</div>
        <h1 className="text-3xl font-bold text-rose-800 mb-3">כתיב עברי</h1>
        <p className="text-rose-600 mb-8">בחר את האיות הנכון לכל מילה!</p>
        <button
          onClick={onStart}
          className="w-full py-5 rounded-2xl text-white font-bold text-2xl bg-gradient-to-l from-rose-500 to-pink-500 shadow-xl hover:opacity-90 active:scale-95 transition-all"
        >
          ✏️ בואו נכתוב!
        </button>
      </div>
    </div>
  );
}
