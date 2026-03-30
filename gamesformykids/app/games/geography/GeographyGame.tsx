'use client';
import { useGeographyGame } from './useGeographyGame';
import { QuestionMode } from './data/countries';

const MODES: { mode: QuestionMode; label: string; desc: string; emoji: string }[] = [
  { mode: 'capital', label: 'בירות',   desc: 'מה הבירה של...?',           emoji: '🏛️' },
  { mode: 'flag',    label: 'דגלים',   desc: 'לאיזו מדינה שייך הדגל?',   emoji: '🚩' },
  { mode: 'continent', label: 'יבשות', desc: 'באיזו יבשה נמצאת המדינה?', emoji: '🌍' },
];

export default function GeographyGame() {
  const { phase, index, score, selected, isCorrect, current, total, startGame, selectAnswer, next, goMenu, restart } = useGeographyGame();

  // ── MENU ──
  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🌍</div>
          <h1 className="text-3xl font-bold text-teal-800 mb-2">גאוגרפיה</h1>
          <p className="text-teal-600">בחר סוג שאלות</p>
        </div>
        <div className="flex flex-col gap-4">
          {MODES.map(m => (
            <button key={m.mode} onClick={() => startGame(m.mode)}
              className="p-5 rounded-2xl text-white shadow-lg hover:scale-105 active:scale-95 transition-all bg-gradient-to-l from-teal-500 to-cyan-600 text-right flex items-center gap-4">
              <span className="text-4xl">{m.emoji}</span>
              <div>
                <div className="text-xl font-bold">{m.label}</div>
                <div className="text-sm opacity-80">{m.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── PLAYING ──
  if (phase === 'playing' && current) {
    const { country, mode, choices } = current;
    const prompt = mode === 'capital'
      ? `🏛️ מה הבירה של ${country.name} ${country.flag}?`
      : mode === 'flag'
      ? `🚩 לאיזו מדינה שייך הדגל ${country.flag}?`
      : `🌍 באיזו יבשה נמצאת ${country.name} ${country.flag}?`;

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4" dir="rtl">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <button onClick={goMenu} className="text-teal-500 text-sm bg-teal-100 rounded-full px-3 py-1">← חזור</button>
            <span className="font-bold text-teal-700">שאלה {index + 1} / {total}</span>
            <span className="font-bold text-teal-700">⭐ {score}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full mb-5">
            <div className="h-full bg-teal-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-5 text-center">
            <p className="text-xl font-bold text-gray-800">{prompt}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {choices.map(c => {
              const val = mode === 'capital' ? c.capital : mode === 'flag' ? c.name : c.continent;
              const isRight = c.id === country.id;
              let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-400';
              if (selected) {
                if (isRight) style = 'bg-green-500 border-2 border-green-600 text-white';
                else if (c.id === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
                else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
              }
              return (
                <button key={c.id} onClick={() => selectAnswer(c.id)} disabled={!!selected}
                  className={`py-4 px-3 rounded-2xl font-semibold text-lg transition-all active:scale-95 ${style}`}>
                  {mode === 'flag' ? `${c.flag} ${c.name}` : val}
                </button>
              );
            })}
          </div>
          {selected && (
            <div className="mt-4">
              <div className={`rounded-2xl p-3 mb-3 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {isCorrect ? `✅ נכון! ${country.flag} ${country.name} — ${country.capital}` : `💙 ${country.flag} ${country.name} — ${country.capital}, ${country.continent}`}
              </div>
              <button onClick={next} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-teal-500 to-cyan-600 hover:opacity-90 active:scale-95 transition-all">
                {index < total - 1 ? 'שאלה הבאה ←' : 'תוצאות! 🎉'}
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">🌍</div>
        <h1 className="text-2xl font-bold mb-4">כל הכבוד!</h1>
        <div className="bg-teal-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-teal-700">{score} / {total}</p>
          <div className="mt-2 h-3 bg-teal-100 rounded-full"><div className="h-full bg-teal-400 rounded-full" style={{ width: `${pct}%` }} /></div>
          <p className="text-teal-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={restart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-teal-500 to-cyan-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={goMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">🌍 קטגוריות</button>
        </div>
      </div>
    </div>
  );
}
