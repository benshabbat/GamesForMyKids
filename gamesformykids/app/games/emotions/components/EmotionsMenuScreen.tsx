'use client';

interface Props {
  onStart: () => void;
}

export default function EmotionsMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-6">😊</div>
        <h1 className="text-3xl font-bold text-orange-700 mb-2">עולם הרגשות</h1>
        <p className="text-gray-500 mb-5">זהה את הרגש לפי הסיפור!</p>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {(['😊 שמח', '😢 עצוב', '😡 כועס', '😨 מפוחד', '😲 מופתע', '🥰 אוהב', '😌 רגוע', '🤩 נלהב'] as const).map(e => (
            <div key={e} className="bg-yellow-50 rounded-xl p-2 text-xs font-medium text-orange-700 text-center">{e}</div>
          ))}
        </div>
        <button onClick={onStart} className="w-full py-4 rounded-2xl bg-orange-500 text-white text-xl font-bold hover:bg-orange-600 transition-all shadow-lg">
          התחל לשחק! 😊
        </button>
      </div>
    </div>
  );
}
