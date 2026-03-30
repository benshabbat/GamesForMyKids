'use client';

import { useRiddlesGame } from './useRiddlesGame';

export default function RiddlesGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useRiddlesGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-6">🧩</div>
          <h1 className="text-3xl font-bold text-purple-700 mb-2">חידות לילדים</h1>
          <p className="text-gray-500 mb-4">פתור 10 חידות מסקרנות!</p>
          <div className="bg-purple-50 rounded-2xl p-4 mb-6 text-right">
            <p className="text-purple-800 font-semibold text-sm mb-2">דוגמה לחידה:</p>
            <p className="text-gray-700 text-sm italic">&quot;יש לי ידיים אבל לא יכול לאחוז, יש לי פנים אבל אין לי עיניים — מי אני?&quot;</p>
            <p className="text-purple-600 font-bold text-sm mt-1">התשובה: שעון ⏰</p>
          </div>
          <button onClick={startGame} className="w-full py-4 rounded-2xl bg-purple-600 text-white text-xl font-bold hover:bg-purple-700 transition-all shadow-lg">
            התחל לשחק! 🧩
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '👍' : '💪';
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-4">{emoji}</div>
          <h2 className="text-2xl font-bold text-purple-700 mb-2">כל הכבוד!</h2>
          <p className="text-gray-600 mb-4">פתרת {correctCount} מתוך {total} חידות</p>
          <div className="text-5xl font-bold text-purple-600 mb-6">{score} נקודות</div>
          <div className="flex gap-3">
            <button onClick={restart} className="flex-1 py-3 rounded-2xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all">שחק שוב</button>
            <button onClick={goMenu} className="flex-1 py-3 rounded-2xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-all">תפריט</button>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">שאלה {index + 1} / {total}</span>
          <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full">{score} נקודות</span>
        </div>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
          <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>

        {/* Riddle */}
        <div className="bg-purple-50 rounded-2xl p-5 mb-5 text-center">
          <div className="text-5xl mb-3">{current.emoji}</div>
          <p className="text-gray-700 text-lg font-medium leading-relaxed">{current.riddle}</p>
        </div>

        {/* Answers */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {choices.map(choice => {
            let cls = 'p-4 rounded-2xl border-2 font-bold text-lg transition-all text-center ';
            if (selected === null) cls += 'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 cursor-pointer';
            else if (choice === current.answer) cls += 'border-green-500 bg-green-100 text-green-800';
            else if (choice === selected) cls += 'border-red-400 bg-red-100 text-red-700';
            else cls += 'border-gray-200 bg-gray-50 text-gray-400';
            return (
              <button key={choice} onClick={() => selectAnswer(choice)} className={cls} disabled={selected !== null}>
                {choice}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className={`rounded-2xl p-4 mb-4 text-center ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <p className="font-bold text-xl">{isCorrect ? '🎉 נכון מאוד!' : `❌ לא נכון — התשובה: ${current.answer}`}</p>
          </div>
        )}

        {selected !== null && (
          <button onClick={next} className="w-full py-3 rounded-2xl bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition-all">
            {index + 1 < total ? 'חידה הבאה ←' : 'סיום'}
          </button>
        )}
      </div>
    </div>
  );
}
