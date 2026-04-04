'use client';

import { useBalloonPopGame } from './useBalloonPopGame';

export default function BalloonPopGame() {
  const { phase, score, best, lives, timeLeft, balloons, pct, containerRef, startGame, pop } = useBalloonPopGame();

  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 flex items-center justify-center p-4" dir="rtl">
      <div className="text-center">
        <div className="text-7xl mb-4 flex justify-center gap-1">🎈🎈🎈</div>
        <h1 className="text-4xl font-black text-white drop-shadow-lg mb-2">פוצץ בלונים!</h1>
        <p className="text-white/80 mb-6">הקש על בלונים לפני שהם עפים<br />הימנע מפצצות 💣</p>
        {best > 0 && <p className="text-yellow-200 font-bold mb-4">🏆 שיא: {best}</p>}
        <button onClick={startGame} className="px-12 py-5 rounded-2xl bg-gradient-to-l from-pink-500 to-rose-500 text-white font-black text-2xl shadow-xl hover:opacity-90 active:scale-95 transition-all">
          🎈 התחל!
        </button>
      </div>
    </div>
  );

  if (phase === 'result') return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-3">{lives <= 0 ? '💔' : '🎉'}</div>
        <h2 className="text-3xl font-black text-gray-800 mb-5">{lives <= 0 ? 'נגמרו החיים!' : 'הזמן נגמר!'}</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-pink-50 rounded-2xl p-4">
            <p className="text-4xl font-black text-pink-500">{score}</p>
            <p className="text-xs text-pink-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-4">
            <p className="text-4xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-pink-500 to-rose-500 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
          🔄 שוב!
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 flex flex-col items-center select-none" dir="rtl">
      {/* HUD */}
      <div className="flex items-center gap-4 p-4 w-full max-w-sm">
        <div className="text-center">
          <p className="text-2xl font-black text-white">{score}</p>
          <p className="text-xs text-white/70">ניקוד</p>
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-3 bg-white/30 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-1000 ${pct > 50 ? 'bg-green-400' : pct > 25 ? 'bg-yellow-300' : 'bg-red-400'}`} style={{ width: `${pct}%` }} />
          </div>
          <p className="text-center text-xs text-white/80">{timeLeft}s</p>
        </div>
        <div className="text-center">
          <p className="text-lg">{Array(Math.max(0, lives)).fill('❤️').join('')}</p>
          <p className="text-xs text-white/70">חיים</p>
        </div>
      </div>

      {/* Game area */}
      <div ref={containerRef} className="flex-1 w-full max-w-sm relative overflow-hidden" style={{ minHeight: 480 }}>
        {balloons.map(b => {
          if (b.popped) {
            return (
              <div key={b.id} className="absolute pointer-events-none flex items-center justify-center text-2xl"
                style={{ left: b.x - b.r, top: b.y - b.r, width: b.r * 2, height: b.r * 2, opacity: 1 - b.popAnim, transform: `scale(${1 + b.popAnim})` }}>
                {b.isBomb ? '💥' : '✨'}
              </div>
            );
          }
          return (
            <button key={b.id}
              onClick={() => pop(b.id)}
              className="absolute rounded-full flex items-center justify-center font-black text-white cursor-pointer active:scale-90 transition-transform shadow-lg"
              style={{
                left: b.x - b.r, top: b.y - b.r,
                width: b.r * 2, height: b.r * 2,
                background: b.isBomb ? '#1f2937' : `radial-gradient(circle at 35% 35%, ${b.color[0]}, ${b.color[1]})`,
                fontSize: b.r * 0.8,
              }}>
              {b.isBomb ? '💣' : ''}
              {/* String */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gray-600/50" style={{ height: b.r * 0.7, top: '100%' }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
