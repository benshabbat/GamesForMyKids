'use client';
import { useTriviaGame } from './useTriviaGame';
import { CATEGORIES, CATEGORY_EMOJIS, TriviaCategory } from './data/questions';

export default function TriviaGame() {
  const { phase, index, score, selected, isCorrect, current, category, total, startGame, selectAnswer, next, goMenu, restart } = useTriviaGame();

  // ── MENU ──
  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🎯</div>
          <h1 className="text-3xl font-bold text-amber-800 mb-2">ידע כללי</h1>
          <p className="text-amber-600">בחר נושא או שחק הכל!</p>
        </div>
        <div className="flex flex-col gap-3 mb-4">
          <button onClick={() => startGame('all')}
            className="w-full py-5 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-amber-500 to-yellow-500 shadow-lg hover:opacity-90 active:scale-95 transition-all">
            🎯 שאלות מכל הנושאים!
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => startGame(cat)}
              className="p-4 rounded-2xl font-bold text-gray-700 shadow bg-white border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 active:scale-95 transition-all text-right">
              <div className="text-3xl mb-1">{CATEGORY_EMOJIS[cat]}</div>
              <div>{cat}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── PLAYING ──
  if (phase === 'playing' && current) return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={goMenu} className="text-amber-500 text-sm bg-amber-100 rounded-full px-3 py-1">← חזור</button>
          <span className="font-bold text-amber-700">{CATEGORY_EMOJIS[current.category]} {current.category} | {index + 1} / {total}</span>
          <span className="font-bold text-amber-700">⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-5 text-center">
          <p className="text-xl font-bold text-gray-800">{current.question}</p>
        </div>
        <div className="space-y-3">
          {current.answers.map((ans, i) => {
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-400';
            if (selected !== null) {
              if (i === current.correctIndex) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (i === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button key={i} onClick={() => selectAnswer(i)} disabled={selected !== null}
                className={`w-full text-right py-4 px-5 rounded-2xl font-semibold text-lg transition-all active:scale-95 ${style}`}>
                {ans}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? '🌟 מעולה!' : `💙 ${current.answers[current.correctIndex]}`}
              <p className="text-sm font-normal mt-1">{current.funFact}</p>
            </div>
            <button onClick={next} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-amber-500 to-yellow-500 hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'שאלה הבאה ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ── RESULT ──
  const pct = Math.round((score / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">{pct >= 80 ? '🏆' : pct >= 50 ? '😊' : '💪'}</div>
        <h1 className="text-2xl font-bold mb-4">
          {category === 'all' ? 'ידע כללי' : `${CATEGORY_EMOJIS[category as TriviaCategory]} ${category}`} — סיום!
        </h1>
        <div className="bg-amber-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-amber-700">{score} / {total}</p>
          <div className="mt-2 h-3 bg-amber-100 rounded-full"><div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} /></div>
          <p className="text-amber-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={restart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-amber-500 to-yellow-500 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={goMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">📋 נושאים</button>
        </div>
      </div>
    </div>
  );
}
