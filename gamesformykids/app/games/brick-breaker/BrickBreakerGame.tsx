'use client';

import { useBrickBreakerGame, W, H } from './useBrickBreakerGame';

export default function BrickBreakerGame() {
  const { canvasRef, ui, startGame, handleMouseMove, handleTouchMove, handleTouchStart, handleClick, nudgeLeft, nudgeRight } = useBrickBreakerGame();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-slate-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <div className="flex gap-5 mb-2 text-white text-center">
          <div><p className="text-2xl font-black text-yellow-300">{ui.score}</p><p className="text-xs text-yellow-500">ניקוד</p></div>
          <div><p className="text-lg">{Array(ui.lives).fill('❤️').join('')}</p><p className="text-xs text-red-400">חיים</p></div>
          <div><p className="text-2xl font-black text-blue-300">Lv.{ui.level}</p><p className="text-xs text-blue-500">רמה</p></div>
        </div>
      )}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          className="rounded-3xl shadow-2xl border-4 border-purple-700 cursor-none"
          style={{ touchAction: 'none', maxHeight: '85vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/60">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">🧱</div>
              <h1 className="text-2xl font-black text-purple-700 mb-1">שובר לבנים</h1>
              <p className="text-gray-500 text-sm mb-5">הזז את המחבט ושבור את כל הלבנים!<br />5 רמות של כיף</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>}
              <button onClick={() => startGame(1)} className="w-full py-4 rounded-2xl bg-gradient-to-l from-purple-500 to-indigo-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {(ui.phase === 'dead' || ui.phase === 'won') && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/60">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">{ui.phase === 'won' ? '🏆' : '💔'}</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">{ui.phase === 'won' ? 'ניצחת! מדהים!' : 'נגמרו החיים!'}</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-purple-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-purple-600">{ui.score}</p>
                  <p className="text-xs text-purple-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={() => startGame(1)} className="w-full py-4 rounded-2xl bg-gradient-to-l from-purple-500 to-indigo-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <div className="mt-3 flex gap-4">
          <button onPointerDown={nudgeLeft} className="bg-purple-700/80 text-white rounded-xl px-7 py-3 text-xl font-bold active:bg-purple-500 touch-none">◄</button>
          <button onPointerDown={handleClick} className="bg-white/20 text-white rounded-xl px-6 py-3 text-sm font-bold active:bg-white/40 touch-none">🏸 השק</button>
          <button onPointerDown={nudgeRight} className="bg-purple-700/80 text-white rounded-xl px-7 py-3 text-xl font-bold active:bg-purple-500 touch-none">►</button>
        </div>
      )}
    </div>
  );
}
