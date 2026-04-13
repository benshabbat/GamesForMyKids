'use client';

import { useChessStore } from '../store/useChessStore';
import ChessMenu from './ChessMenu';
import ChessGameOver from './ChessGameOver';
import ChessBoard from './ChessBoard';
import ChessStatusBar from './ChessStatusBar';
import ChessCaptured from './ChessCaptured';
import ChessMoveHistory from './ChessMoveHistory';

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
        <div className="flex flex-col items-center gap-3 w-full max-w-md">
          <ChessStatusBar />

          <ChessCaptured />

          <ChessBoard />

          <div className={`text-sm font-semibold rounded-2xl py-2 px-5 text-center transition-all duration-300 ${
            phase === 'check'
              ? 'bg-red-500/80 text-white animate-pulse shadow-lg shadow-red-900/40'
              : 'bg-white/10 text-slate-300 border border-white/10'
          }`}>
            {message}
          </div>

          <ChessMoveHistory />
        </div>
      )}
    </div>
  );
}
