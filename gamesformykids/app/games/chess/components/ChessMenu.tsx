'use client';

import { useChessStore } from '../store/useChessStore';
import ChessTitleCard from './ChessTitleCard';
import ChessScoreCards from './ChessScoreCards';
import ChessPieceLegend from './ChessPieceLegend';

export default function ChessMenu() {
  const { playerScore, computerScore, startGame } = useChessStore();
  const hasHistory = playerScore > 0 || computerScore > 0;

  return (
    <div className="flex flex-col items-center gap-5 text-center w-full max-w-sm">
      <ChessTitleCard />

      {hasHistory && <ChessScoreCards />}

      <button
        onClick={startGame}
        className="relative w-full overflow-hidden rounded-2xl text-white font-extrabold text-xl py-4 px-10 transition-all hover:scale-[1.03] active:scale-[0.97] shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #92400e 100%)',
          boxShadow: '0 8px 32px rgba(180,83,9,0.5), inset 0 1px 0 rgba(255,220,100,0.25)',
        }}
      >
        <span className="relative z-10">🎮 {hasHistory ? 'משחק חדש' : 'התחל משחק'}</span>
        {/* Shimmer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
          }}
        />
      </button>

      <ChessPieceLegend />
    </div>
  );
}
