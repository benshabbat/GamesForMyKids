'use client';
import { useSpellingGame } from '../useSpellingGame';

export default function SpellingQuestion() {
  const { index, total, score, current, choices, selected, isCorrect, selectAnswer, next, goMenu } = useSpellingGame();

  if (!current) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-4" dir="rtl">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={goMenu} className="text-rose-500 text-sm bg-rose-100 rounded-full px-3 py-1">← חזור</button>
          <span className="font-bold text-rose-700">{index + 1} / {total}</span>
          <span className="font-bold text-rose-700">⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div
            className="h-full bg-rose-400 rounded-full transition-all"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-5 text-center">
          <div className="text-7xl mb-3">{current.emoji}</div>
          <p className="text-xl font-bold text-gray-700">{current.hint}</p>
          <p className="text-gray-400 text-sm mt-1">מה האיית הנכון?</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {choices.map((word, i) => {
            const isRight = word === current.word;
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-rose-400 hover:bg-rose-50';
            if (selected !== null) {
              if (isRight) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (word === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button
                key={i}
                onClick={() => selectAnswer(word)}
                disabled={selected !== null}
                className={`py-5 rounded-2xl font-black text-2xl transition-all active:scale-95 ${style}`}
                style={{ direction: 'rtl' }}
              >
                {word}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold text-xl ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? `✅ נכון! הכתיב הנכון: "${current.word}"` : `💙 הנכון: "${current.word}"`}
            </div>
            <button
              onClick={next}
              className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-rose-500 to-pink-500 shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

