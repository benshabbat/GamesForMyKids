'use client';

import { useDamkaGame, type Pos } from './useDamkaGame';

// helper re-export so we can call it here
const isDark = (r: number, c: number) => (r + c) % 2 === 1;

export default function DamkaGame() {
  const { state, startGame, selectCell } = useDamkaGame();
  const { phase, board, selected, validMoves, currentTurn, playerScore, computerScore, message } = state;

  const validDests = new Set(validMoves.map(m => `${m.to.row},${m.to.col}`));
  const captureDests = new Set(validMoves.filter(m => m.captures.length > 0).map(m => `${m.to.row},${m.to.col}`));

  const playerPieces = board.flat().filter(c => c.color === 'player').length;
  const compPieces   = board.flat().filter(c => c.color === 'computer').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-950 to-stone-950 flex flex-col items-center justify-center p-4 select-none" dir="rtl">

      {/* ── MENU ─────────────────────────────────────────────── */}
      {phase === 'menu' && (
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="text-8xl">♟️</div>
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">דמקה</h1>
          <p className="text-amber-200 text-lg max-w-sm">
            משחק הדמקה הקלאסי נגד המחשב!<br />
            בחר האסימון האדום שלך וקפוץ מעל האסימונים הלבנים.<br />
            מי שיישאר עם קלפים ינצח! 👑
          </p>
          {(playerScore > 0 || computerScore > 0) && (
            <div className="flex gap-6 text-white text-lg font-semibold">
              <span>🔴 אתה: {playerScore}</span>
              <span>⚪ מחשב: {computerScore}</span>
            </div>
          )}
          <button onClick={startGame} className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95">
            🎮 התחל משחק
          </button>
          <div className="bg-black/30 rounded-xl p-4 text-amber-200 text-sm max-w-sm text-right space-y-1">
            <p className="font-bold text-white mb-2">כללים:</p>
            <p>🔴 האסימונים שלך = אדום (מלמטה↑)</p>
            <p>⚪ המחשב = לבן (מלמעלה↓)</p>
            <p>👑 הגע לצד השני להפוך למלך (זז בכל כיוון)</p>
            <p>⚡ חובה לקפוץ כשיש הזדמנות!</p>
            <p>🏆 נצח כשלמחשב אין אסימונים או מהלכים</p>
          </div>
        </div>
      )}

      {/* ── WIN / LOSE ────────────────────────────────────────── */}
      {(phase === 'won' || phase === 'lost') && (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="text-8xl">{phase === 'won' ? '🎉' : '😢'}</div>
          <h2 className="text-4xl font-extrabold text-white">{phase === 'won' ? 'ניצחת!' : 'המחשב ניצח!'}</h2>
          <div className="flex gap-6 text-white text-xl font-semibold">
            <span>🔴 אתה: {playerScore}</span>
            <span>⚪ מחשב: {computerScore}</span>
          </div>
          <button onClick={startGame} className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95">
            🔄 שחק שוב
          </button>
        </div>
      )}

      {/* ── PLAYING ──────────────────────────────────────────── */}
      {phase === 'playing' && (
        <div className="flex flex-col items-center gap-3 w-full max-w-sm">

          {/* Score + turn */}
          <div className="flex justify-between w-full text-white text-sm font-semibold px-1">
            <span>🔴 {playerPieces} אסימונים</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentTurn === 'player' ? 'bg-amber-400 text-gray-900' : 'bg-gray-700 text-gray-300'}`}>
              {currentTurn === 'player' ? '← תורך' : 'תור המחשב...'}
            </span>
            <span>⚪ {compPieces} אסימונים</span>
          </div>

          {/* Board */}
          <div className="border-4 border-amber-700 rounded-xl overflow-hidden shadow-2xl">
            {board.map((row, r) => (
              <div key={r} className="flex">
                {row.map((cell, c) => {
                  const key = `${r},${c}`;
                  const isLight = !isDark(r, c);
                  const isSel = selected?.row === r && selected?.col === c;
                  const isValid = validDests.has(key);
                  const isCapture = captureDests.has(key);

                  let bg = isLight ? 'bg-amber-100' : 'bg-amber-800';
                  if (isSel) bg = 'bg-yellow-400';
                  else if (isCapture) bg = 'bg-red-500/70';
                  else if (isValid) bg = 'bg-green-500/70';

                  return (
                    <div
                      key={c}
                      onClick={() => selectCell({ row: r, col: c })}
                      className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center cursor-pointer ${bg} transition-colors`}
                    >
                      {cell.color && (
                        <div className={[
                          'w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-lg font-bold shadow-md border-2',
                          cell.color === 'player'
                            ? 'bg-red-500 border-red-300 text-white'
                            : 'bg-gray-100 border-gray-400 text-gray-800',
                          isSel ? 'ring-4 ring-yellow-300 scale-110' : '',
                        ].join(' ')}>
                          {cell.isKing ? '♔' : ''}
                        </div>
                      )}
                      {isValid && !cell.color && (
                        <div className={`w-3 h-3 rounded-full ${isCapture ? 'bg-red-400' : 'bg-green-400'} opacity-80`} />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Message */}
          <p className="text-amber-200 text-sm font-medium bg-black/30 rounded-xl py-2 px-4 text-center max-w-xs">
            {message}
          </p>

          {/* Score */}
          <div className="flex gap-4 text-white text-sm">
            <span>🔴 ניצחונות: {playerScore}</span>
            <span>⚪ ניצחונות: {computerScore}</span>
          </div>
        </div>
      )}
    </div>
  );
}
