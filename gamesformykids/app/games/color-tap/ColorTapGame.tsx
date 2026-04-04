'use client';
import { useColorTapGame, TIME_PER_Q } from './useColorTapGame';

export default function ColorTapGame() {
  const { phase, score, best, lives, question, timeLeft, feedback, startGame, handleTap } = useColorTapGame();

  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-4">🎨</div>
        <h1 className="text-3xl font-black text-gray-700 mb-2">צבע נכון</h1>
        <p className="text-gray-500 mb-2 text-sm">בחר את הצבע הנכון לפני שהזמן נגמר!</p>
        <p className="text-gray-400 mb-6 text-xs">3 חיים · 5 שניות לכל שאלה</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-4">🏆 שיא: {best}</p>}
        <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
          🎨 התחל!
        </button>
      </div>
    </div>
  );

  if (phase === 'dead') return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-3">😢</div>
        <h2 className="text-2xl font-black text-gray-700 mb-4">נגמרו החיים!</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-pink-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-pink-600">{score}</p>
            <p className="text-xs text-pink-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all">
          🔄 שוב!
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {/* Header */}
      <div className="flex gap-8 mb-5 text-center">
        <div><p className="text-2xl font-black text-pink-600">{score}</p><p className="text-xs text-pink-400">ניקוד</p></div>
        <div className="flex gap-1 items-center">
          {[0,1,2].map(i => <span key={i} className={`text-2xl transition-all ${i < lives ? '' : 'opacity-20 grayscale'}`}>❤️</span>)}
        </div>
        <div><p className={`text-2xl font-black ${timeLeft <= 2 ? 'text-red-500 animate-pulse' : 'text-purple-600'}`}>{timeLeft}</p><p className="text-xs text-purple-400">שניות</p></div>
      </div>

      {/* Target color card */}
      <div className={`mb-6 rounded-3xl p-6 text-center shadow-xl w-full max-w-xs transition-all duration-200 ${
        feedback === 'correct' ? 'bg-green-100 ring-4 ring-green-400' :
        feedback === 'wrong'   ? 'bg-red-100 ring-4 ring-red-400' : 'bg-white'
      }`}>
        <p className="text-gray-400 text-sm mb-3">בחר את הצבע:</p>
        <div className="flex items-center gap-4 justify-center mb-3">
          <div className={`w-16 h-16 rounded-full ${question.target.bg} shadow-lg`} />
          <p className="text-4xl font-black text-gray-700">{question.target.name}</p>
        </div>
        <div className="bg-gray-100 rounded-full h-2 w-full mx-auto">
          <div
            className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(timeLeft / TIME_PER_Q) * 100}%` }}
          />
        </div>
      </div>

      {/* Color buttons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {question.options.map(color => (
          <button
            key={color.name}
            onClick={() => handleTap(color)}
            disabled={!!feedback}
            className={`${color.bg} h-24 rounded-3xl shadow-xl font-black text-white text-lg flex items-center justify-center gap-2 active:scale-90 transition-all hover:brightness-110 disabled:opacity-80`}
          >
            <span className="text-3xl">{color.emoji}</span>
            <span>{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
