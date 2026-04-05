'use client';

import { useJumperGame, W, H } from './useJumperGame';

export default function JumperGame() {
  const { canvasRef, ui, startGame, handleTouchMove, handleTouchEnd, handleCanvasClick, pressLeft, releaseLeft, pressRight, releaseRight } = useJumperGame();



  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <div className="flex gap-6 mb-2 text-center">
          <div><p className="text-2xl font-black text-green-300">{ui.score}m</p><p className="text-xs text-green-600">גובה</p></div>
          <div><p className="text-2xl font-black text-gray-400">{ui.best}m</p><p className="text-xs text-gray-600">שיא</p></div>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleCanvasClick}
          className="rounded-3xl shadow-2xl border-2 border-indigo-800"
          style={{ touchAction: 'none', maxHeight: '78vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-64">
              <div className="text-5xl mb-2">🦘</div>
              <h1 className="text-2xl font-black text-gray-700 mb-1">קפצן</h1>
              <p className="text-gray-500 text-sm mb-5">קפץ על הפלטפורמות וטפס גבוה!<br/>הזז שמאלה/ימינה· אל תיפול</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}m</p>}
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-xl hover:bg-indigo-500 active:scale-95 transition-all">
                🦘 קפץ!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'dead' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-64">
              <div className="text-5xl mb-2">😵</div>
              <h2 className="text-2xl font-black text-gray-700 mb-3">נפלת!</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-indigo-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-indigo-600">{ui.score}m</p>
                  <p className="text-xs text-indigo-400">גובה</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}m</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-xl hover:bg-indigo-500 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <div className="mt-3 flex gap-4">
          <button
            onPointerDown={pressLeft}
            onPointerUp={releaseLeft}
            onPointerLeave={releaseLeft}
            className="bg-indigo-700/80 text-white rounded-xl px-10 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
          >◄</button>
          <button
            onPointerDown={pressRight}
            onPointerUp={releaseRight}
            onPointerLeave={releaseRight}
            className="bg-indigo-700/80 text-white rounded-xl px-10 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
          >▶</button>
        </div>
      )}
    </div>
  );
}
