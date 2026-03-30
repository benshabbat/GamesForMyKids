'use client';
import { useWorldLanguagesGame } from './useWorldLanguagesGame';

export default function WorldLanguagesGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, startGame, selectAnswer, next, goMenu, restart } = useWorldLanguagesGame();

  // ── MENU ──
  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-6 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full text-center">
        <div className="text-7xl mb-4">🌐</div>
        <h1 className="text-3xl font-bold text-emerald-800 mb-3">שפות העולם</h1>
        <p className="text-emerald-600 mb-6">באיזו שפה מדברים בכל מדינה?</p>
        <div className="grid grid-cols-2 gap-3 mb-8 text-lg">
          {['🇮🇱 עברית', '🇫🇷 צרפתית', '🇯🇵 יפנית', '🇧🇷 פורטוגזית'].map(s => (
            <div key={s} className="bg-white rounded-2xl py-3 px-4 shadow font-bold text-gray-700">{s}</div>
          ))}
        </div>
        <button onClick={startGame}
          className="w-full py-5 rounded-2xl text-white font-bold text-2xl bg-gradient-to-l from-emerald-500 to-green-600 shadow-xl hover:opacity-90 active:scale-95 transition-all">
          🌍 בואו נלמד!
        </button>
      </div>
    </div>
  );

  // ── PLAYING ──
  if (phase === 'playing' && current) return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4" dir="rtl">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={goMenu} className="text-emerald-500 text-sm bg-emerald-100 rounded-full px-3 py-1">← חזור</button>
          <span className="font-bold text-emerald-700">{index + 1} / {total}</span>
          <span className="font-bold text-emerald-700">⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-5 text-center">
          <p className="text-sm font-semibold text-gray-400 mb-2">באיזו שפה מדברים ב...</p>
          <div className="text-7xl mb-2">{current.flag}</div>
          <p className="text-3xl font-black text-gray-800">{current.country}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(choices as string[]).map((lang, i) => {
            const isRight = lang === current.language;
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-400 hover:bg-emerald-50';
            if (selected !== null) {
              if (isRight) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (lang === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button key={i} onClick={() => selectAnswer(lang)} disabled={selected !== null}
                className={`py-5 rounded-2xl font-bold text-xl transition-all active:scale-95 ${style}`}>
                {lang}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold text-xl ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? `✅ נכון! ב-${current.country} מדברים ${current.language}` : `💙 ב-${current.country} מדברים ${current.language}`}
            </div>
            <button onClick={next} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-emerald-500 to-green-600 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ── RESULT ──
  const correct = Math.round(score / 10);
  const pct = Math.round((correct / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">{pct >= 80 ? '🏆' : pct >= 50 ? '🌐' : '💪'}</div>
        <h1 className="text-2xl font-bold mb-4">שפות העולם — סיום!</h1>
        <div className="bg-emerald-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-emerald-700">{correct} / {total}</p>
          <div className="mt-2 h-3 bg-emerald-100 rounded-full"><div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} /></div>
          <p className="text-emerald-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={restart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-emerald-500 to-green-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={goMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">🌍 תפריט</button>
        </div>
      </div>
    </div>
  );
}
