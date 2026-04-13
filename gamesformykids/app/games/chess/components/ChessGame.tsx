'use client';

import { useChessStore } from '../store/useChessStore';
import ChessMenu from './ChessMenu';
import ChessGameOver from './ChessGameOver';
import ChessBoard from './ChessBoard';
import ChessStatusBar from './ChessStatusBar';

export default function ChessGame() {
  const { phase, message } = useChessStore();
  const isPlaying = phase === 'playing' || phase === 'check';

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center p-4 select-none"
      dir="rtl"
    >
      {phase === 'menu' && <ChessMenu />}

      {phase === 'checkmate' && <ChessGameOver />}

      {isPlaying && (
        <div className="flex flex-col items-center gap-3 w-full max-w-sm">
          <ChessStatusBar />

          <ChessBoard />

          <p className={`text-sm font-medium rounded-xl py-2 px-4 text-center max-w-xs ${phase === 'check' ? 'bg-red-500/70 text-white animate-pulse' : 'bg-black/30 text-slate-200'}`}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
}
