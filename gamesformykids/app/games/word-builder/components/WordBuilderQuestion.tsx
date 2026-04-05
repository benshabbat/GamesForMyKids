'use client';

interface AvailableLetter {
  letter: string;
  used: boolean;
}

interface WordBuilderItem {
  emoji: string;
  hint: string;
  category: string;
  word: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: WordBuilderItem;
  typed: string[];
  available: AvailableLetter[];
  status: 'idle' | 'correct' | 'wrong';
  onPressLetter: (i: number) => void;
  onClear: () => void;
  onNext: () => void;
  onMenu: () => void;
}

export default function WordBuilderQuestion({
  index, total, score, current, typed, available, status, onPressLetter, onClear, onNext, onMenu,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onMenu} className="text-orange-500 text-sm bg-orange-100 rounded-full px-3 py-1">← חזור</button>
          <span className="text-orange-700 font-bold">מילה {index + 1} / {total}</span>
          <span className="text-orange-700 font-bold">⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-orange-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-5 text-center">
          <div className="text-7xl mb-2">{current.emoji}</div>
          <p className="text-gray-600 text-lg">{current.hint}</p>
          <p className="text-gray-400 text-sm mt-1">קטגוריה: {current.category} | {current.word.length} אותיות</p>
        </div>
        <div className="flex gap-2 justify-center mb-5 flex-wrap">
          {Array.from({ length: current.word.length }).map((_, i) => (
            <div key={i} className={`
              w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl font-black
              ${status === 'correct' ? 'bg-green-500 border-green-600 text-white' :
                status === 'wrong' ? 'bg-red-400 border-red-500 text-white' :
                typed[i] ? 'bg-amber-100 border-amber-400 text-amber-800' :
                'bg-gray-100 border-dashed border-gray-300 text-transparent'}
            `}>
              {typed[i] || '_'}
            </div>
          ))}
        </div>
        {status === 'correct' && (
          <div className="bg-green-100 text-green-700 rounded-2xl p-3 mb-4 text-center font-bold">
            ✅ מצוין! המילה היא: {current.word}
          </div>
        )}
        {status === 'wrong' && (
          <div className="bg-red-100 text-red-700 rounded-2xl p-3 mb-4 text-center font-bold">
            ❌ לא נכון! נסה שוב — המילה: {current.word}
          </div>
        )}
        {status === 'idle' && (
          <div className="flex gap-2 justify-center flex-wrap mb-4">
            {available.map((item, i) => (
              <button
                key={i}
                onClick={() => onPressLetter(i)}
                disabled={item.used}
                className={`w-12 h-12 rounded-xl text-2xl font-black transition-all active:scale-90
                  ${item.used ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
                    'bg-amber-500 text-white shadow-md hover:bg-amber-400 hover:scale-110'}`}
              >
                {item.letter}
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-3">
          {status === 'idle' && typed.length > 0 && (
            <button onClick={onClear} className="flex-1 py-3 rounded-2xl border-2 border-orange-300 text-orange-600 font-semibold hover:bg-orange-50 transition-all">
              🔄 נקה
            </button>
          )}
          {(status === 'correct' || status === 'wrong') && (
            <button onClick={onNext} className="flex-1 py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-orange-500 to-amber-500 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'מילה הבאה ←' : 'תוצאות! 🎉'}
            </button>
          )}
          {status === 'wrong' && (
            <button onClick={onClear} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">
              🔄 נסה שוב
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
