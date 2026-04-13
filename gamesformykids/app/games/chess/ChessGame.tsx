'use client';

import { useChessGame, PIECE_SYMBOLS } from './useChessGame';

const FILES = ['א','ב','ג','ד','ה','ו','ז','ח'];
const RANKS = ['8','7','6','5','4','3','2','1'];

export default function ChessGame() {
  const { state, startGame, selectSquare } = useChessGame();
  const { phase, board, selected, validMoves, turn, lastMove, playerScore, computerScore, message } = state;

  const validDests = new Set(validMoves.map(m => `${m.to.row},${m.to.col}`));
  const lastMoveSquares = lastMove
    ? new Set([`${lastMove.from.row},${lastMove.from.col}`, `${lastMove.to.row},${lastMove.to.col}`])
    : new Set<string>();

  const isPlaying = phase === 'playing' || phase === 'check';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center p-4 select-none" dir="rtl">

      {/* ── MENU ─────────────────────────────────────────────── */}
      {phase === 'menu' && (
        <div className="flex flex-col items-center gap-8 text-center max-w-sm">
          <div className="text-8xl">♟</div>
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">שחמט</h1>
          <p className="text-slate-300 text-lg">
            משחק השחמט הקלאסי נגד המחשב!<br />
            אתה משחק לבן (♙) מהצד התחתון.
          </p>
          {(playerScore > 0 || computerScore > 0) && (
            <div className="flex gap-6 text-white text-lg font-semibold">
              <span>♙ אתה: {playerScore}</span>
              <span>♟ מחשב: {computerScore}</span>
            </div>
          )}
          <button onClick={startGame} className="bg-slate-200 hover:bg-white text-slate-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95">
            🎮 התחל משחק
          </button>
          <div className="bg-black/30 rounded-xl p-4 text-slate-300 text-sm text-right space-y-1">
            <p className="font-bold text-white mb-1">טיפים:</p>
            <p>♙ רגלי: מתקדם קדימה, תוקף באלכסון</p>
            <p>♞ פרש: קפיצת L - עובר מעל כלים אחרים</p>
            <p>♝ רץ: אלכסונים בלבד (כמה שרוצה)</p>
            <p>♜ צריח: קוים ישרים (כמה שרוצה)</p>
            <p>♛ מלכה: כל כיוון!</p>
            <p>♚ מלך: כיוון אחד בכל פנייה</p>
            <p>🏰 רוקד: מלך זז 2 שלבים כשניתן</p>
          </div>
        </div>
      )}

      {/* ── CHECKMATE / STALEMATE ────────────────────────────── */}
      {phase === 'checkmate' && (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="text-8xl">{message.includes('ניצחת') ? '🏆' : '😢'}</div>
          <h2 className="text-4xl font-extrabold text-white">{message}</h2>
          <div className="flex gap-6 text-white text-xl font-semibold">
            <span>♙ אתה: {playerScore}</span>
            <span>♟ מחשב: {computerScore}</span>
          </div>
          <button onClick={startGame} className="bg-slate-200 hover:bg-white text-slate-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95">
            🔄 שחק שוב
          </button>
        </div>
      )}

      {/* ── PLAYING ──────────────────────────────────────────── */}
      {isPlaying && (
        <div className="flex flex-col items-center gap-3 w-full max-w-sm">
          {/* Turn + score */}
          <div className="flex justify-between w-full text-white text-sm font-semibold px-1">
            <span>♙ אתה: {playerScore}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${turn === 'w' ? 'bg-slate-200 text-slate-900' : 'bg-slate-700 text-slate-300'}`}>
              {turn === 'w' ? '← תורך (לבן)' : 'תור המחשב (שחור)...'}
            </span>
            <span>♟ מחשב: {computerScore}</span>
          </div>

          {/* Board */}
          <div className="relative border-2 border-slate-600 rounded-xl overflow-hidden shadow-2xl">
            {/* Rank labels (right side since RTL) */}
            <div className="absolute right-0 top-0 h-full flex flex-col pointer-events-none z-10">
              {RANKS.map(rank => (
                <div key={rank} className="flex-1 flex items-center justify-end pr-0.5">
                  <span className="text-slate-400 text-[9px] leading-none">{rank}</span>
                </div>
              ))}
            </div>
            {board.map((row, r) => (
              <div key={r} className="flex">
                {row.map((piece, c) => {
                  const key = `${r},${c}`;
                  const isLight = (r + c) % 2 === 0;
                  const isSel = selected?.row === r && selected?.col === c;
                  const isValidDest = validDests.has(key);
                  const isLastMove = lastMoveSquares.has(key);
                  const isKingInCheck = phase === 'check' && piece === 'wK' && turn === 'w';

                  let bg = isLight ? 'bg-amber-100' : 'bg-amber-700';
                  if (isKingInCheck) bg = 'bg-red-400';
                  else if (isSel) bg = 'bg-yellow-300';
                  else if (isLastMove) bg = isLight ? 'bg-yellow-200' : 'bg-yellow-600';

                  const isWhite = piece ? piece[0] === 'w' : false;

                  return (
                    <div
                      key={c}
                      onClick={() => selectSquare({ row: r, col: c })}
                      className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer relative ${bg} transition-colors`}
                    >
                      {piece && (
                        <span className={[
                          'text-2xl sm:text-3xl leading-none',
                          isWhite ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]' : 'text-gray-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]',
                          isSel ? 'scale-110 inline-block' : '',
                        ].join(' ')}>
                          {PIECE_SYMBOLS[piece]}
                        </span>
                      )}
                      {isValidDest && (
                        <div className={[
                          'absolute inset-0 flex items-center justify-center pointer-events-none',
                        ].join('')}>
                          {piece
                            ? <div className="absolute inset-0 border-4 border-green-500 rounded-sm opacity-80" />
                            : <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
                          }
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
            {/* File labels */}
            <div className="flex bg-slate-800">
              {FILES.map(f => (
                <div key={f} className="w-9 sm:w-10 flex items-center justify-center">
                  <span className="text-slate-400 text-[9px]">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <p className={`text-sm font-medium rounded-xl py-2 px-4 text-center max-w-xs ${phase === 'check' ? 'bg-red-500/70 text-white animate-pulse' : 'bg-black/30 text-slate-200'}`}>
            {message}
          </p>

          {/* Scores */}
          <div className="flex gap-4 text-white text-sm">
            <span>♙ ניצחונות: {playerScore}</span>
            <span>♟ ניצחונות: {computerScore}</span>
          </div>
        </div>
      )}
    </div>
  );
}
