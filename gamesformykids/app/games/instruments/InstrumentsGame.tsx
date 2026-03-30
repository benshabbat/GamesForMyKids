'use client';

import { useInstrumentsGame } from './useInstrumentsGame';

const FAMILY_COLORS: Record<string, string> = {
  'מיתרים': 'bg-amber-100 text-amber-800 border-amber-300',
  'נשיפה':  'bg-blue-100 text-blue-800 border-blue-300',
  'הקשה':   'bg-red-100 text-red-800 border-red-300',
  'מקלדת':  'bg-purple-100 text-purple-800 border-purple-300',
};

export default function InstrumentsGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useInstrumentsGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-6">🎵</div>
          <h1 className="text-3xl font-bold text-amber-700 mb-2">כלי נגינה</h1>
          <p className="text-gray-500 mb-6">זהה את כלי הנגינה לפי התיאור שלו!</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[['🎸 מיתרים', 'bg-amber-50'], ['🎺 נשיפה', 'bg-blue-50'], ['🥁 הקשה', 'bg-red-50'], ['🎹 מקלדת', 'bg-purple-50']].map(([label, bg]) => (
              <div key={label} className={`${bg} rounded-xl p-3 text-center font-semibold text-sm`}>{label}</div>
            ))}
          </div>
          <button onClick={startGame} className="w-full py-4 rounded-2xl bg-amber-500 text-white text-xl font-bold hover:bg-amber-600 transition-all shadow-lg">
            התחל לשחק! 🎵
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const emoji = pct >= 90 ? '🎼' : pct >= 70 ? '🎵' : pct >= 50 ? '🎶' : '💪';
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-4">{emoji}</div>
          <h2 className="text-2xl font-bold text-amber-700 mb-2">מלחין מוכשר!</h2>
          <p className="text-gray-600 mb-4">זיהית {correctCount} מתוך {total} כלים</p>
          <div className="text-5xl font-bold text-amber-600 mb-6">{score} נקודות</div>
          <div className="flex gap-3">
            <button onClick={restart} className="flex-1 py-3 rounded-2xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all">שחק שוב</button>
            <button onClick={goMenu} className="flex-1 py-3 rounded-2xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-all">תפריט</button>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">שאלה {index + 1} / {total}</span>
          <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-full">{score} נקודות</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
          <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>

        {/* Instrument display */}
        <div className="bg-amber-50 rounded-2xl p-5 mb-5 text-center">
          <div className="text-6xl mb-3">{current.emoji}</div>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${FAMILY_COLORS[current.family] ?? 'bg-gray-100 text-gray-700'}`}>
            משפחה: {current.family}
          </span>
          <p className="text-gray-700 text-base mt-3 leading-relaxed">{current.description}</p>
          <p className="text-amber-700 font-bold mt-2">שם כלי הנגינה הוא?</p>
        </div>

        {/* Answer buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {choices.map(choice => {
            let cls = 'p-4 rounded-2xl border-2 font-bold text-lg transition-all text-center ';
            if (selected === null) cls += 'border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 cursor-pointer';
            else if (choice === current.instrument) cls += 'border-green-500 bg-green-100 text-green-800';
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
          <div className={`rounded-2xl p-3 mb-4 text-center ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <p className="font-bold text-lg">{isCorrect ? '🎵 נכון מאוד!' : `❌ התשובה הנכונה: ${current.instrument}`}</p>
          </div>
        )}

        {selected !== null && (
          <button onClick={next} className="w-full py-3 rounded-2xl bg-amber-500 text-white font-bold text-lg hover:bg-amber-600 transition-all">
            {index + 1 < total ? 'הבא ←' : 'סיום'}
          </button>
        )}
      </div>
    </div>
  );
}
