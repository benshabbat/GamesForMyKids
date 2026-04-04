'use client';
import { useSimonGame, BUTTONS } from './useSimonGame';

export default function SimonGame() {
  const { phase, activeColor, playerIdx, best, roundScore, sequenceRef, startGame, handleTap } = useSimonGame();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {phase === 'menu' && (
        <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-xs w-full">
          <div className="text-6xl mb-4">🔴</div>
          <h1 className="text-3xl font-black text-gray-700 mb-2">שיימון אומר</h1>
          <p className="text-gray-500 text-sm mb-2">צפה בסדר הצבעים וחזור עליהם בדיוק!</p>
          <p className="text-gray-400 text-xs mb-5">כל סיבוב — עוד צבע אחד</p>
          {best > 0 && <p className="text-yellow-600 font-bold mb-4">🏆 שיא: {best} צבעים</p>}
          <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gray-800 text-white font-black text-xl hover:bg-gray-700 active:scale-95 transition-all">
            🔴 התחל!
          </button>
        </div>
      )}

      {(phase === 'showing' || phase === 'input') && (
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <p className={`text-2xl font-black mb-1 ${phase === 'showing' ? 'text-yellow-300' : 'text-green-400'}`}>
              {phase === 'showing' ? '👀 זכור את הסדר...' : '👆 חזור על הסדר!'}
            </p>
            <p className="text-gray-400 text-sm">שלב {sequenceRef.current.length} · שיא: {best}</p>
            {phase === 'input' && (
              <p className="text-gray-500 text-xs mt-1">{playerIdx}/{sequenceRef.current.length}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-5">
            {BUTTONS.map(btn => (
              <button
                key={btn.id}
                onClick={() => handleTap(btn.id)}
                disabled={phase === 'showing'}
                className={`w-32 h-32 rounded-3xl shadow-2xl transition-all duration-100 ${
                  activeColor === btn.id ? btn.active + ' scale-90' : btn.bg
                } ${phase === 'input' ? 'hover:brightness-110 active:scale-90 cursor-pointer' : 'cursor-default opacity-60'}`}
              />
            ))}
          </div>
        </div>
      )}

      {phase === 'dead' && (
        <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-xs w-full">
          <div className="text-6xl mb-3">😵</div>
          <h2 className="text-2xl font-black text-gray-700 mb-2">טעית!</h2>
          <p className="text-gray-500 text-sm mb-4">הגעת לרצף של {roundScore} צבעים</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-2xl p-3">
              <p className="text-3xl font-black text-gray-700">{roundScore}</p>
              <p className="text-xs text-gray-400">סיבובים</p>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-3">
              <p className="text-3xl font-black text-yellow-500">{best}</p>
              <p className="text-xs text-yellow-400">שיא</p>
            </div>
          </div>
          <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gray-800 text-white font-black text-xl hover:bg-gray-700 active:scale-95 transition-all">
            🔄 שוב!
          </button>
        </div>
      )}
    </div>
  );
}
