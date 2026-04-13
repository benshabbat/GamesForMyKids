'use client';

import { useChessStore } from '../store/useChessStore';

export default function ChessGameOver() {
  const { message, playerScore, computerScore, startGame } = useChessStore();
  const playerWon = message.includes('ניצחת');

  return (
    <div className="flex flex-col items-center gap-6 text-center w-full max-w-sm">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl px-8 py-8 w-full shadow-2xl">
        <div className="text-8xl mb-4" style={{ display: 'inline-block', animation: playerWon ? 'bounce 1s infinite' : 'none' }}>
          {playerWon ? '🏆' : '😢'}
        </div>
        <h2 className={`text-3xl font-extrabold mb-1 ${playerWon ? 'text-amber-300' : 'text-slate-300'}`}>
          {message}
        </h2>
        <p className="text-slate-500 text-sm">{playerWon ? 'כל הכבוד!' : 'נסה שוב...'}</p>
      </div>

      <div className="flex gap-3 w-full">
        <div className="flex-1 bg-white/10 border border-white/10 rounded-2xl py-3 text-center">
          <div className="text-3xl leading-none mb-1">♙</div>
          <div className="text-amber-300 font-extrabold text-xl">{playerScore}</div>
          <div className="text-slate-400 text-xs">ניצחונות</div>
        </div>
        <div className="flex-1 bg-white/10 border border-white/10 rounded-2xl py-3 text-center">
          <div className="text-3xl leading-none mb-1">♟</div>
          <div className="text-amber-300 font-extrabold text-xl">{computerScore}</div>
          <div className="text-slate-400 text-xs">ניצחונות</div>
        </div>
      </div>

      <button
        onClick={startGame}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl shadow-amber-900/40 transition-all hover:scale-105 active:scale-95"
      >
        🔄 שחק שוב
      </button>
    </div>
  );
}
