'use client';

import { useChessStore } from '../store/useChessStore';

export default function ChessStatusBar() {
  const { turn, playerScore, computerScore, startGame } = useChessStore();

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Player panel */}
      <div className={`flex items-center gap-2 flex-1 rounded-2xl px-3 py-2 transition-all duration-300 ${
        turn === 'w' ? 'bg-white/20 ring-1 ring-white/30 shadow-md' : 'bg-white/5'
      }`}>
        <span className="text-2xl leading-none">♙</span>
        <div>
          <div className="text-slate-300 text-[10px] leading-none">אתה</div>
          <div className="text-amber-300 text-sm font-extrabold leading-tight">{playerScore}</div>
        </div>
        {turn === 'w' && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{marginRight: 'auto'}} />}
      </div>

      {/* New game button */}
      <button
        onClick={startGame}
        className="text-[10px] font-bold text-slate-400 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl px-2.5 py-1.5 transition-all whitespace-nowrap"
        title="משחק חדש"
      >
        🔄 חדש
      </button>

      {/* Turn indicator */}
      <div className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all duration-300 ${
        turn === 'w' ? 'bg-white text-slate-900 shadow-md' : 'bg-slate-700 text-slate-300'
      }`}>
        {turn === 'w' ? '← תורך' : 'מחשב...'}
      </div>

      {/* Computer panel */}
      <div className={`flex items-center gap-2 flex-1 flex-row-reverse rounded-2xl px-3 py-2 transition-all duration-300 ${
        turn === 'b' ? 'bg-white/20 ring-1 ring-white/30 shadow-md' : 'bg-white/5'
      }`}>
        <span className="text-2xl leading-none">♟</span>
        <div className="text-right" style={{marginRight: 'auto'}}>
          <div className="text-slate-300 text-[10px] leading-none">מחשב</div>
          <div className="text-amber-300 text-sm font-extrabold leading-tight">{computerScore}</div>
        </div>
        {turn === 'b' && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
      </div>
    </div>
  );
}
