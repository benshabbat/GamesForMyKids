"use client";

import { useBubbleGame } from './useBubbleGame';

export default function BubbleStartScreen() {
  const { startGame } = useBubbleGame();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 via-blue-200 to-cyan-200">
      <div className="text-center p-8 bg-white/80 rounded-3xl shadow-xl max-w-md mx-4">
        <div className="text-6xl mb-4">🫧</div>
        <h1 className="text-3xl font-bold text-purple-800 mb-4">משחק הבועות</h1>
        <p className="text-lg text-purple-600 mb-6">
          לחצו על הבועות כשהן מופיעות על המסך!
        </p>
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🚀 התחל משחק
        </button>
      </div>
    </div>
  );
}
