'use client';

import { useChessStore } from '../store/useChessStore';

export default function ChessGameOver() {
  const { message, playerScore, computerScore, startGame } = useChessStore();
  const playerWon = message.includes('ניצחת');

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="text-8xl">{playerWon ? '🏆' : '😢'}</div>
      <h2 className="text-4xl font-extrabold text-white">{message}</h2>
      <div className="flex gap-6 text-white text-xl font-semibold">
        <span>♙ אתה: {playerScore}</span>
        <span>♟ מחשב: {computerScore}</span>
      </div>
      <button
        onClick={startGame}
        className="bg-slate-200 hover:bg-white text-slate-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95"
      >
        🔄 שחק שוב
      </button>
    </div>
  );
}
