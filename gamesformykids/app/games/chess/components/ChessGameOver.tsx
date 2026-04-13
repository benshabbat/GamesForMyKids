'use client';

import { useChessStore } from '../store/useChessStore';
import ChessScoreCards from './ChessScoreCards';

export default function ChessGameOver() {
  const { message, startGame } = useChessStore();
  const playerWon = message.includes('ניצחת');
  const isDraw = message.includes('תיקו') || message.includes('פאט');

  return (
    <div className="flex flex-col items-center gap-5 text-center w-full max-w-sm">
      {/* Result card */}
      <div
        className="w-full rounded-3xl px-8 py-8 relative overflow-hidden shadow-2xl"
        style={{
          background: playerWon
            ? 'linear-gradient(160deg, #2d1a02 0%, #1c1000 50%, #2a1800 100%)'
            : isDraw
              ? 'linear-gradient(160deg, #0f1820 0%, #080d12 50%, #0d1520 100%)'
              : 'linear-gradient(160deg, #1a0808 0%, #100303 50%, #180606 100%)',
          border: playerWon
            ? '1px solid rgba(215,170,50,0.3)'
            : isDraw
              ? '1px solid rgba(100,130,180,0.25)'
              : '1px solid rgba(180,50,50,0.25)',
          boxShadow: playerWon
            ? '0 0 0 1px rgba(255,200,60,0.08), 0 24px 64px rgba(0,0,0,0.7)'
            : isDraw
              ? '0 24px 64px rgba(0,0,0,0.7)'
              : '0 0 0 1px rgba(255,60,60,0.06), 0 24px 64px rgba(0,0,0,0.7)',
        }}
      >
        {/* Gold rim for win */}
        {playerWon && (
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,195,80,0.5), transparent)' }} />
        )}

        {/* Trophy / emoji */}
        <div
          className="text-8xl mb-4 inline-block"
          style={{ animation: playerWon ? 'bounce 0.8s infinite alternate' : 'none' }}
        >
          {playerWon ? '🏆' : isDraw ? '🤝' : '😢'}
        </div>

        {/* Stars for win */}
        {playerWon && (
          <div className="flex justify-center gap-1 mb-3">
            {['⭐', '⭐', '⭐'].map((s, i) => (
              <span
                key={i}
                className="text-2xl"
                style={{ animation: `starPop 0.4s ease ${i * 0.15}s both` }}
              >
                {s}
              </span>
            ))}
          </div>
        )}

        <h2
          className="text-3xl font-extrabold mb-1"
          style={{
            color: playerWon ? '#fde68a' : isDraw ? '#94a3b8' : '#fca5a5',
            filter: playerWon ? 'drop-shadow(0 0 12px rgba(251,191,36,0.4))' : 'none',
          }}
        >
          {message}
        </h2>
        <p
          className="text-sm mt-1"
          style={{ color: playerWon ? 'rgba(251,191,36,0.5)' : 'rgba(148,163,184,0.5)' }}
        >
          {playerWon ? 'כל הכבוד! ביצועים מצוינים!' : isDraw ? 'משחק מאוזן!' : 'נסה שוב, אתה יכול!'}
        </p>
      </div>

      <ChessScoreCards />

      <button
        onClick={startGame}
        className="relative w-full overflow-hidden rounded-2xl text-white font-extrabold text-xl py-4 px-10 transition-all hover:scale-[1.03] active:scale-[0.97] shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #92400e 100%)',
          boxShadow: '0 8px 32px rgba(180,83,9,0.5), inset 0 1px 0 rgba(255,220,100,0.25)',
        }}
      >
        🔄 שחק שוב
      </button>

      <style>{`
        @keyframes bounce {
          from { transform: translateY(0) scale(1); }
          to { transform: translateY(-12px) scale(1.1); }
        }
        @keyframes starPop {
          from { transform: scale(0) rotate(-20deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
