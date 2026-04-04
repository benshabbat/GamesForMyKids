'use client';
import { useWordScrambleGame } from './useWordScrambleGame';

export default function WordScrambleGame() {
  const { phase, words, wIdx, letters, picked, score, lives, shake, correct, startGame, pickLetter, unpick } = useWordScrambleGame();

  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-4">🔡</div>
        <h1 className="text-3xl font-black text-gray-700 mb-2">מילים מבולבלות</h1>
        <p className="text-gray-500 text-sm mb-6">לחצו על האותיות בסדר הנכון כדי לכתוב את המילה!</p>
        <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all">
          🔡 התחל!
        </button>
      </div>
    </div>
  );

  if (phase === 'results') return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-3">{score >= 100 ? '🏆' : score >= 60 ? '🎉' : '😊'}</div>
        <h2 className="text-2xl font-black text-gray-700 mb-4">
          {score >= 100 ? 'מדהים!' : score >= 60 ? 'כל הכבוד!' : 'ניסיון טוב!'}
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-green-600">{score}</p>
            <p className="text-xs text-green-400">ניקוד</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-red-500">{3 - lives}</p>
            <p className="text-xs text-red-400">טעויות</p>
          </div>
        </div>
        <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all">
          🔄 שחק שוב
        </button>
      </div>
    </div>
  );

  const entry = words[wIdx];
  const target = entry.word;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 flex flex-col items-center justify-center p-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-6 mb-4 text-center">
        <div><p className="text-2xl font-black text-green-600">{score}</p><p className="text-xs text-green-400">ניקוד</p></div>
        <div><p className="text-lg font-bold text-gray-500">{wIdx + 1}/{words.length}</p></div>
        <div className="flex gap-1">{Array.from({ length: 3 }).map((_, i) => <span key={i}>{i < lives ? '❤️' : '🖤'}</span>)}</div>
      </div>

      {/* Card */}
      <div className={`bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full text-center transition-all duration-200 ${shake ? 'animate-bounce' : ''}`}>
        <div className="text-7xl mb-2">{entry.emoji}</div>
        <p className="text-gray-400 text-sm mb-4">{entry.hint}</p>

        {/* Answer slots */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {Array.from({ length: target.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => picked[i] && unpick(i)}
              className={`w-12 h-12 rounded-xl border-2 text-xl font-black transition-all
                ${picked[i]
                  ? correct
                    ? 'border-green-400 bg-green-100 text-green-700'
                    : 'border-blue-400 bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200'
                  : 'border-gray-200 bg-gray-50 text-transparent'}`}
            >
              {picked[i]?.ch || '_'}
            </button>
          ))}
        </div>

        {correct && <p className="text-green-600 font-black text-lg mb-2 animate-bounce">✅ יפה מאוד! +20</p>}

        {/* Scrambled letters */}
        <div className="flex justify-center gap-2 flex-wrap">
          {letters.map(l => (
            <button
              key={l.idx}
              onClick={() => pickLetter(l.idx)}
              disabled={l.picked}
              className={`w-12 h-12 rounded-xl text-xl font-black transition-all
                ${l.picked
                  ? 'bg-gray-100 text-gray-300 border-2 border-gray-200 cursor-default'
                  : 'bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-md active:scale-90 hover:scale-110 border-2 border-green-600'}`}
            >
              {l.picked ? '' : l.ch}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
