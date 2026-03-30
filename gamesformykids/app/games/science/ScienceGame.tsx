'use client';
import { useScienceGame } from './useScienceGame';
import { TOPICS, TOPIC_EMOJIS } from './data/questions';

export default function ScienceGame() {
  const {
    phase, index, score, selected, isCorrect, current, total,
    startGame, selectAnswer, next, goMenu, restart,
  } = useScienceGame();

  // ── MENU ──
  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🔬</div>
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">מדע לילדים</h1>
          <p className="text-indigo-600">גלה סודות המדע!</p>
        </div>
        <button onClick={() => startGame('all')}
          className="w-full mb-5 p-5 rounded-2xl text-white font-bold text-xl shadow-lg hover:scale-105 active:scale-95 transition-all bg-gradient-to-l from-cyan-500 to-indigo-600">
          🌟 כל הנושאים
        </button>
        <div className="grid grid-cols-2 gap-3">
          {TOPICS.map(t => (
            <button key={t} onClick={() => startGame(t)}
              className="p-4 rounded-2xl font-bold text-right shadow-md hover:scale-105 active:scale-95 transition-all bg-white border-2 border-indigo-200 hover:border-indigo-400 text-indigo-800">
              <div className="text-3xl mb-1">{TOPIC_EMOJIS[t]}</div>
              <div>{t}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── PLAYING ──
  if (phase === 'playing' && current) return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={goMenu} className="text-indigo-500 text-sm bg-indigo-100 rounded-full px-3 py-1">← חזור</button>
          <span className="font-bold text-indigo-700">{index + 1} / {total}</span>
          <span className="font-bold text-indigo-700">⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-indigo-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">{current.emoji}</span>
            <span className="text-sm text-indigo-500 font-semibold bg-indigo-100 px-2 py-0.5 rounded-full">{current.topic}</span>
          </div>
          <p className="text-xl font-bold text-gray-800">{current.question}</p>
        </div>
        <div className="space-y-3 mb-4">
          {current.answers.map((ans, i) => {
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50';
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
          <div className="mt-2">
            <div className={`rounded-2xl p-3 mb-3 text-sm font-medium ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-sky-100 text-sky-700'}`}>
              {isCorrect ? '✅ ' : '💡 '}{current.explanation}
            </div>
            <button onClick={next} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-cyan-500 to-indigo-600 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ── RESULT ──
  const pct = Math.round((score / total) * 100);
  const medal = pct >= 90 ? '🥇' : pct >= 70 ? '🥈' : pct >= 50 ? '🥉' : '🔬';
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-7xl mb-3 animate-bounce">{medal}</div>
        <h1 className="text-2xl font-bold mb-4">מדען צעיר!</h1>
        <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-indigo-700">{score} / {total}</p>
          <div className="mt-2 h-3 bg-indigo-100 rounded-full"><div className="h-full bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} /></div>
          <p className="text-indigo-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={restart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-cyan-500 to-indigo-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={goMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">📋 נושאים</button>
        </div>
      </div>
    </div>
  );
}
