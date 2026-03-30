'use client';

import { useSportsQuizGame } from './useSportsQuizGame';

export default function SportsQuizGame() {
  const { phase, index, score, selected, isCorrect, current, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useSportsQuizGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-6">🏆</div>
          <h1 className="text-3xl font-bold text-green-700 mb-2">חידון ספורט</h1>
          <p className="text-gray-500 mb-6">ענה על 10 שאלות על עולם הספורט!</p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {(['⚽ כדורגל', '🏀 כדורסל', '🏊 שחייה', '🎾 טניס', '🏅 אולימפיאדה', '🤸 גימנסטיקה'] as const).map(s => (
              <div key={s} className="bg-green-50 rounded-xl px-2 py-2 text-xs font-semibold text-green-700 text-center">{s}</div>
            ))}
          </div>
          <button onClick={startGame} className="w-full py-4 rounded-2xl bg-green-600 text-white text-xl font-bold hover:bg-green-700 transition-all shadow-lg">
            התחל לשחק! 🏆
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const medal = pct >= 90 ? '🥇' : pct >= 70 ? '🥈' : pct >= 50 ? '🥉' : '💪';
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-4">{medal}</div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">מצוין!</h2>
          <p className="text-gray-600 mb-4">ענית נכון על {correctCount} מתוך {total} שאלות</p>
          <div className="text-5xl font-bold text-green-600 mb-6">{score} נקודות</div>
          <div className="flex gap-3">
            <button onClick={restart} className="flex-1 py-3 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all">שחק שוב</button>
            <button onClick={goMenu} className="flex-1 py-3 rounded-2xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-all">תפריט</button>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">שאלה {index + 1} / {total}</span>
          <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full">{score} נקודות</span>
        </div>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
          <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>

        {/* Sport badge + Question */}
        <div className="bg-green-50 rounded-2xl p-5 mb-5 text-center">
          <div className="text-5xl mb-2">{current.emoji}</div>
          <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">{current.sport}</span>
          <p className="text-gray-800 text-lg font-bold mt-3 leading-relaxed">{current.question}</p>
        </div>

        {/* Answers */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {current.answers.map((ans, i) => {
            let cls = 'p-4 rounded-2xl border-2 font-bold text-lg transition-all text-center ';
            if (selected === null) cls += 'border-green-200 bg-green-50 hover:bg-green-100 text-green-800 cursor-pointer';
            else if (i === current.correctIndex) cls += 'border-green-500 bg-green-100 text-green-800';
            else if (i === selected) cls += 'border-red-400 bg-red-100 text-red-700';
            else cls += 'border-gray-200 bg-gray-50 text-gray-400';
            return (
              <button key={i} onClick={() => selectAnswer(i)} className={cls} disabled={selected !== null}>
                {ans}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className={`rounded-2xl p-3 mb-4 text-center ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <p className="font-bold text-lg">{isCorrect ? '🎉 כל הכבוד!' : `❌ לא נכון — התשובה: ${current.answers[current.correctIndex]}`}</p>
          </div>
        )}

        {selected !== null && (
          <button onClick={next} className="w-full py-3 rounded-2xl bg-green-600 text-white font-bold text-lg hover:bg-green-700 transition-all">
            {index + 1 < total ? 'שאלה הבאה ←' : 'סיום'}
          </button>
        )}
      </div>
    </div>
  );
}
