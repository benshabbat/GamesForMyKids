'use client';

interface Props {
  onStart: () => void;
}

export default function OppositesMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-6 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full text-center">
        <div className="text-7xl mb-4">🙃</div>
        <h1 className="text-3xl font-bold text-red-800 mb-3">ניגודים</h1>
        <p className="text-red-600 mb-8">מצא את ההפך של כל מילה!</p>
        <div className="flex justify-center gap-4 mb-8 text-xl font-bold text-gray-600">
          <div className="bg-white rounded-2xl px-5 py-3 shadow">גדול ↔ קטן</div>
          <div className="bg-white rounded-2xl px-5 py-3 shadow">חם ↔ קר</div>
        </div>
        <button
          onClick={onStart}
          className="w-full py-5 rounded-2xl text-white font-bold text-2xl bg-gradient-to-l from-orange-500 to-red-500 shadow-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🙃 משחק ניגודים!
        </button>
      </div>
    </div>
  );
}
