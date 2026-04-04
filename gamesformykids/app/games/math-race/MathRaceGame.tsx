'use client';
import { useMathRaceGame, GAME_TIME } from './useMathRaceGame';

export default function MathRaceGame() {
  const { phase, q, score, best, timeLeft, feedback, streak, total, correct, accuracy, startGame, tap } = useMathRaceGame();

  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-4">🏎️</div>
        <h1 className="text-3xl font-black text-gray-700 mb-2">מרוץ מתמטיקה</h1>
        <p className="text-gray-500 text-sm mb-2">פתור כמה שיותר תרגילים ב-{GAME_TIME} שניות!</p>
        <p className="text-gray-400 text-xs mb-6">רצף 3+ = 20 נקודות · הקושי עולה עם הניקוד</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-4">🏆 שיא: {best}</p>}
        <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all">
          🏎️ התחל!
        </button>
      </div>
    </div>
  );

  if (phase === 'dead') return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-3">🏁</div>
        <h2 className="text-2xl font-black text-gray-700 mb-4">הסיום!</h2>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div className="bg-blue-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-blue-600">{score}</p>
            <p className="text-xs text-blue-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-green-600">{correct}/{total}</p>
            <p className="text-xs text-green-400">נכון/סה"כ</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-purple-600">{accuracy}%</p>
            <p className="text-xs text-purple-400">דיוק</p>
          </div>
        </div>
        <button onClick={startGame} className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all">
          🔄 שוב!
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {/* Progress bar */}
      <div className="w-full max-w-sm mb-4">
        <div className="flex justify-between text-sm text-indigo-600 font-bold mb-1">
          <span>⏱️ {timeLeft}s</span>
          <span>🏆 {score}</span>
          {streak >= 2 && <span className="text-yellow-500">🔥×{streak}</span>}
        </div>
        <div className="bg-white rounded-full h-3 shadow-inner">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${timeLeft > 10 ? 'bg-blue-500' : timeLeft > 5 ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'}`}
            style={{ width: `${(timeLeft/GAME_TIME)*100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className={`w-full max-w-sm bg-white rounded-3xl p-8 text-center shadow-2xl mb-5 transition-all duration-150 ${
        feedback==='correct'?'bg-green-50 ring-4 ring-green-400 scale-105':
        feedback==='wrong'?'bg-red-50 ring-4 ring-red-400 shake':''
      }`}>
        <p className="text-4xl font-black text-gray-700 tracking-wide">{q.text}</p>
        {feedback && (
          <p className={`text-2xl mt-3 font-bold ${feedback==='correct'?'text-green-500':'text-red-500'}`}>
            {feedback==='correct'?`✅ ${streak>=3?'בום! +20':'נכון! +10'}` : `❌ התשובה: ${q.answer}`}
          </p>
        )}
      </div>

      {/* Choices */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {q.choices.map(c => (
          <button
            key={c}
            onClick={() => tap(c)}
            disabled={!!feedback}
            className="py-5 rounded-3xl bg-white font-black text-3xl text-indigo-700 shadow-xl border-2 border-blue-200 active:scale-90 hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-50"
          >{c}</button>
        ))}
      </div>

      <p className="mt-4 text-xs text-indigo-400">{correct}/{total} נכון · {accuracy}% דיוק</p>
    </div>
  );
}
