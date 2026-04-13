'use client';

import { useChessStore } from '../store/useChessStore';
import ChessPlayerPanel from './ChessPlayerPanel';

export default function ChessStatusBar() {
  const { turn, startGame } = useChessStore();
  const playerScore = useChessStore(s => s.playerScore);
  const computerScore = useChessStore(s => s.computerScore);

  return (
    <div className="flex items-stretch gap-2 w-full">
      <ChessPlayerPanel symbol="♙" label="אתה" score={playerScore} isActive={turn === 'w'} />

      <div className="flex flex-col items-center justify-between gap-1 py-0.5">
        <div className={[
          'text-[11px] font-extrabold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all duration-300 leading-none',
          turn === 'w'
            ? 'bg-[#f0d9b5] text-[#3d1f0a] shadow-md shadow-amber-900/40'
            : 'bg-slate-700/80 text-slate-400',
        ].join(' ')}>
          {turn === 'w' ? '← תורך' : 'מחשב...'}
        </div>
        <button
          onClick={startGame}
          className="text-[9px] font-semibold text-slate-600 hover:text-slate-300 transition-colors leading-none"
        >
          🔄 חדש
        </button>
      </div>

      <ChessPlayerPanel symbol="♟" label="מחשב" score={computerScore} isActive={turn === 'b'} reversed />
    </div>
  );
}
