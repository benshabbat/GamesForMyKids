'use client';

import { useNatureGame } from './useNatureGame';
import type { NatureCategory } from './data/questions';

const CAT_COLORS: Record<string, string> = {
  'הכל':        'bg-green-600 text-white',
  'בעלי חיים':  'bg-amber-500 text-white',
  'צמחים':      'bg-emerald-500 text-white',
  'מזג אוויר':  'bg-blue-500 text-white',
  'חלל':        'bg-indigo-600 text-white',
  'מים':        'bg-cyan-500 text-white',
};

export default function NatureGame() {
  const { phase, categories, index, score, selected, isCorrect, current, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useNatureGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-6">🌱</div>
          <h1 className="text-3xl font-bold text-green-700 mb-2">עולם הטבע</h1>
          <p className="text-gray-500 mb-4">בחר קטגוריה ולמד על הטבע!</p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {(categories as readonly NatureCategory[]).map(cat => (
              <button key={cat} onClick={() => startGame(cat)}
                className={`py-3 rounded-xl font-bold text-sm transition-all shadow hover:opacity-90 ${CAT_COLORS[cat] ?? 'bg-gray-400 text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🌿' : pct >= 50 ? '🌱' : '💪';
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-4">{emoji}</div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">חוקר טבע מצוין!</h2>
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">שאלה {index + 1} / {total}</span>
          <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full">{score} נקודות</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
          <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>

        {/* Question */}
        <div className="bg-green-50 rounded-2xl p-5 mb-5 text-center">
          <div className="text-5xl mb-2">{current.emoji}</div>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${CAT_COLORS[current.category] ?? 'bg-gray-400 text-white'}`}>
            {current.category}
          </span>
          <p className="text-gray-800 text-lg font-bold leading-relaxed">{current.question}</p>
        </div>

        {/* Answers */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {current.answers.map((ans, i) => {
            let cls = 'p-3 rounded-2xl border-2 font-semibold text-sm transition-all text-center ';
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
          <div className={`rounded-2xl p-3 mb-3 text-center ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <p className="font-bold">{isCorrect ? '🎉 נכון!' : `❌ הנכון: ${current.answers[current.correctIndex]}`}</p>
            <p className="text-xs mt-1 opacity-80">🌿 {current.funFact}</p>
          </div>
        )}

        {selected !== null && (
          <button onClick={next} className="w-full py-3 rounded-2xl bg-green-600 text-white font-bold text-lg hover:bg-green-700 transition-all">
            {index + 1 < total ? 'הבא ←' : 'סיום'}
          </button>
        )}
      </div>
    </div>
  );
}
