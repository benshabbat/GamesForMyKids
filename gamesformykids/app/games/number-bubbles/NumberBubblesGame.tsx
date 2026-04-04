'use client';
import { useEffect } from 'react';
import { useNumberBubblesGame } from './useNumberBubblesGame';

export default function NumberBubblesGame() {
  const { phase, level, bubbles, next, elapsed, best, wrong, startGame, nextLevel, tap, stopTimer } = useNumberBubblesGame();

  useEffect(() => () => stopTimer(), [stopTimer]);

  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-4">🔢</div>
        <h1 className="text-3xl font-black text-gray-700 mb-2">בועות מספרים</h1>
        <p className="text-gray-500 text-sm mb-2">פוצץ את הבועות לפי הסדר: 1, 2, 3...</p>
        <p className="text-gray-400 text-xs mb-6">כל רמה יש יותר מספרים!</p>
        {best && <p className="text-yellow-600 font-bold mb-4">🏆 שיא: רמה {best.level} ב-{best.time}s</p>}
        <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all">
          🔢 התחל!
        </button>
      </div>
    </div>
  );

  if (phase === 'results') return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-3">🎉</div>
        <h2 className="text-2xl font-black text-gray-700 mb-1">כל הכבוד!</h2>
        <p className="text-gray-500 mb-4">סיימת רמה {level} ב-{elapsed} שניות</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-sky-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-sky-600">{level}</p>
            <p className="text-xs text-sky-400">רמה</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-green-600">{elapsed}s</p>
            <p className="text-xs text-green-400">זמן</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => nextLevel(level)} className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-lg hover:opacity-90 active:scale-95 transition-all">
            ➡️ רמה {level + 1}
          </button>
          <button onClick={startGame} className="flex-1 py-4 rounded-2xl bg-gray-200 text-gray-700 font-black text-lg hover:bg-gray-300 active:scale-95 transition-all">
            🔄 מחדש
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col items-center p-3 select-none transition-all ${wrong ? 'bg-red-100' : 'bg-gradient-to-br from-sky-100 to-blue-200'}`} dir="rtl">
      <div className="flex gap-5 mb-2 text-center">
        <div><p className="text-2xl font-black text-blue-600">{next - 1}/{bubbles.length}</p><p className="text-xs text-blue-400">פוצצו</p></div>
        <div><p className="text-2xl font-black text-sky-600">רמה {level}</p></div>
        <div><p className="text-2xl font-black text-teal-600">{elapsed}s</p><p className="text-xs text-teal-400">זמן</p></div>
      </div>
      <p className="font-bold text-indigo-600 mb-2 text-lg">הבא: <span className="text-3xl">{next}</span></p>

      <div className="relative w-full" style={{ height: '70vh', maxWidth: 400 }}>
        {bubbles.map(b => (
          <button
            key={b.id}
            onClick={() => tap(b, next, level)}
            style={{ position: 'absolute', left: `${b.x}%`, top: `${b.y}%`, transform: 'translate(-50%,-50%)' }}
            className={`w-14 h-14 rounded-full font-black text-xl text-white shadow-lg flex items-center justify-center transition-all duration-200 ${
              b.popped
                ? 'opacity-0 scale-150 pointer-events-none'
                : `${b.color} active:scale-90 hover:scale-110 ${b.num === next ? 'ring-4 ring-white ring-offset-2 ring-offset-transparent scale-110 animate-pulse' : ''}`
            }`}
          >{b.num}</button>
        ))}
      </div>
    </div>
  );
}
