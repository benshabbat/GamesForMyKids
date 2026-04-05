'use client';

import { useFroggerGame, W, H } from './useFroggerGame';

export default function FroggerGame() {
  const { canvasRef, ui, startGame, moveFrog, handleTouchStart, handleTouchEnd } = useFroggerGame();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {/* Score bar */}
      {ui.phase === 'playing' && (
        <div className="flex gap-6 mb-2 text-center">
          <div><p className="text-xl font-black text-green-300">{ui.score}</p><p className="text-xs text-green-600">ניקוד</p></div>
          <div className="flex gap-1 items-center">
            {[0,1,2].map(i=><span key={i} className={`text-xl ${i<ui.lives?'':'opacity-20'}`}>❤️</span>)}
          </div>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="rounded-2xl shadow-2xl border-2 border-gray-700"
          style={{ touchAction: 'none', maxHeight: '70vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/75">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">🐸</div>
              <h1 className="text-2xl font-black text-gray-700 mb-1">צפרדע חוצה</h1>
              <p className="text-gray-500 text-sm mb-5">עזור לצפרדע לחצות את הכביש!<br/>הימנע מהרכבים — הגע לדגלים 🏁</p>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-green-500 text-white font-black text-xl hover:bg-green-600 active:scale-95 transition-all">
                🐸 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'dead' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/75">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">💀</div>
              <h2 className="text-2xl font-black text-gray-700 mb-3">נגמרו החיים!</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-green-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-green-600">{ui.score}</p>
                  <p className="text-xs text-green-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-green-500 text-white font-black text-xl hover:bg-green-600 active:scale-95 transition-all">
                🔄 נסה שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <div className="mt-3 grid grid-cols-3 gap-2" style={{ width: 164 }}>
          <div />
          <button onPointerDown={() => moveFrog(0,-1)} className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none">▲</button>
          <div />
          <button onPointerDown={() => moveFrog(-1,0)} className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none">◀</button>
          <button onPointerDown={() => moveFrog(0, 1)} className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none">▼</button>
          <button onPointerDown={() => moveFrog( 1,0)} className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none">▶</button>
        </div>
      )}
    </div>
  );
}
