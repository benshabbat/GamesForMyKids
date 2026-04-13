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
      className="min-h-screen flex flex-col items-center justify-center p-4 select-none"
      dir="rtl"
      style={{
        background: 'radial-gradient(ellipse 120% 80% at 50% 10%, #1e1208 0%, #0d0d12 55%, #060608 100%)',
      }}
    >
      {/* Subtle noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px',
        }}
      />

      {phase === 'menu' && <ChessMenu />}

      {phase === 'checkmate' && <ChessGameOver />}

      {isPlaying && (
        <div className="relative z-10 flex flex-col items-center gap-2.5 w-full max-w-sm">
          <ChessStatusBar />

          <ChessCaptured />

          <ChessBoard />

          {/* Message pill */}
          <div
            className={`text-sm font-semibold rounded-2xl py-2 px-5 text-center transition-all duration-300 w-full ${
              phase === 'check'
                ? 'animate-pulse'
                : ''
            }`}
            style={
              phase === 'check'
                ? {
                    background: 'rgba(239,68,68,0.2)',
                    border: '1px solid rgba(239,68,68,0.4)',
                    color: '#fca5a5',
                    boxShadow: '0 0 16px rgba(239,68,68,0.2)',
                  }
                : {
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.4)',
                  }
            }
          >
            {message}
          </div>

          <ChessMoveHistory />
        </div>
      )}
    </div>
  );
}
