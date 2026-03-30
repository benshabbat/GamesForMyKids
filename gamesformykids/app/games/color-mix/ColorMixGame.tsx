'use client';
import { useColorMixGame } from './useColorMixGame';

export default function ColorMixGame() {
  const {
    phase, index, score, selected, isCorrect, current, total,
    startGame, selectAnswer, next, goMenu, restart,
  } = useColorMixGame();

  // ── MENU ──
  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full text-center">
        <div className="text-7xl mb-4">🎨</div>
        <h1 className="text-3xl font-bold text-purple-800 mb-3">ערבוב צבעים</h1>
        <p className="text-purple-600 mb-8">מה מקבלים כשמערבבים שני צבעים?</p>
        <button onClick={startGame}
          className="w-full py-5 rounded-2xl text-white font-bold text-2xl bg-gradient-to-l from-pink-500 via-purple-500 to-indigo-500 shadow-xl hover:opacity-90 active:scale-95 transition-all">
          🖌️ בואו נערבב!
        </button>
      </div>
    </div>
  );

  // ── PLAYING ──
  if (phase === 'playing' && current) {
    const { mix, choices } = current;
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4" dir="rtl">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-4">
            <button onClick={goMenu} className="text-purple-500 text-sm bg-purple-100 rounded-full px-3 py-1">← חזור</button>
            <span className="font-bold text-purple-700">{index + 1} / {total}</span>
            <span className="font-bold text-purple-700">⭐ {score}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full mb-5">
            <div className="h-full bg-purple-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
          </div>

          {/* Color mixing display */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-5">
            <p className="text-xl font-bold text-gray-700 text-center mb-5">מה מקבלים?</p>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full shadow-lg mx-auto mb-2 border-4 border-white ring-2 ring-gray-200"
                  style={{ backgroundColor: mix.color1 }} />
                <span className="text-sm font-bold text-gray-600">{mix.label1}</span>
              </div>
              <div className="text-4xl font-black text-gray-400">+</div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full shadow-lg mx-auto mb-2 border-4 border-white ring-2 ring-gray-200"
                  style={{ backgroundColor: mix.color2 }} />
                <span className="text-sm font-bold text-gray-600">{mix.label2}</span>
              </div>
              <div className="text-4xl font-black text-gray-400">=</div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full shadow-lg mx-auto mb-2 border-4 border-white ring-2 ring-gray-200 flex items-center justify-center"
                  style={{ backgroundColor: selected ? mix.result : '#f3f4f6' }}>
                  {!selected && <span className="text-3xl">❓</span>}
                </div>
                <span className="text-sm font-bold text-gray-600">{selected ? mix.resultLabel : '?'}</span>
              </div>
            </div>
          </div>

          {/* Answer choices */}
          <div className="grid grid-cols-2 gap-3">
            {choices.map((label, i) => {
              const isRight = label === mix.resultLabel;
              let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-400 hover:bg-purple-50';
              if (selected) {
                if (isRight) style = 'bg-green-500 border-2 border-green-600 text-white';
                else if (label === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
                else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
              }
              return (
                <button key={i} onClick={() => selectAnswer(label)} disabled={!!selected}
                  className={`py-4 px-3 rounded-2xl font-bold text-lg transition-all active:scale-95 ${style}`}>
                  {label}
                </button>
              );
            })}
          </div>

          {selected && (
            <div className="mt-4">
              <div className={`rounded-2xl p-3 mb-3 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {isCorrect ? `✅ נכון! ${mix.label1} + ${mix.label2} = ${mix.resultLabel}` : `💙 ${mix.label1} + ${mix.label2} = ${mix.resultLabel}`}
              </div>
              <button onClick={next} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-pink-500 via-purple-500 to-indigo-500 shadow-lg hover:opacity-90 active:scale-95 transition-all">
                {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── RESULT ──
  const pct = Math.round((score / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">🎨</div>
        <h1 className="text-2xl font-bold mb-4">אמן הצבעים!</h1>
        <div className="bg-purple-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-purple-700">{score} / {total}</p>
          <div className="mt-2 h-3 bg-purple-100 rounded-full"><div className="h-full bg-purple-400 rounded-full" style={{ width: `${pct}%` }} /></div>
          <p className="text-purple-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={restart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-pink-500 to-purple-500 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={goMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">🏠 תפריט</button>
        </div>
      </div>
    </div>
  );
}
