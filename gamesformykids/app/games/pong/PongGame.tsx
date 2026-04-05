'use client';

import { usePongGame } from './usePongGame';

export default function PongGame() {
  const { canvasRef, ui, startGame, handleMouseMove, handleTouchMove, handleTouchStart, handleCanvasClick, playerWon, nudgeLeft, nudgeRight } = usePongGame();


  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <div className="flex gap-8 mb-2 text-center">
          <div><p className="text-3xl font-black text-red-400">{ui.aiScore}</p><p className="text-xs text-red-600">מחשב 🤖</p></div>
          <div className="text-white/30 text-2xl font-bold self-center">:</div>
          <div><p className="text-3xl font-black text-green-400">{ui.playerScore}</p><p className="text-xs text-green-600">אתה 🎮</p></div>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={handleCanvasClick}
          onTouchStart={handleTouchStart}
          className="rounded-3xl shadow-2xl border-4 border-slate-700 cursor-none"
          style={{ touchAction: 'none', maxHeight: '85vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">🏓</div>
              <h1 className="text-3xl font-black text-slate-700 mb-1">פונג</h1>
              <p className="text-gray-500 text-sm mb-5">הזז את המחבט הירוק<br />הגע ל-{WIN_SCORE} נקודות לפני המחשב!</p>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-slate-600 to-slate-800 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'result' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">{playerWon ? '🏆' : '😢'}</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">{playerWon ? 'ניצחת!' : 'המחשב ניצח!'}</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-green-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-green-500">{ui.playerScore}</p>
                  <p className="text-xs text-green-400">אתה</p>
                </div>
                <div className="bg-red-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-red-400">{ui.aiScore}</p>
                  <p className="text-xs text-red-400">מחשב</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-slate-600 to-slate-800 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <div className="mt-3 flex gap-4">
          <button onPointerDown={nudgeLeft} className="bg-slate-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-slate-500 touch-none">◄</button>
          <button onPointerDown={nudgeRight} className="bg-slate-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-slate-500 touch-none">►</button>
        </div>
      )}
    </div>
  );
}
