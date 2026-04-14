"use client";

import { useMemoryContext } from "../contexts/MemoryContext";

export default function MemoryStartScreen() {
  const { initializeGame } = useMemoryContext();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200">
      <div className="text-center p-8 bg-white/80 rounded-3xl shadow-xl max-w-md mx-4">
        <div className="text-6xl mb-4">🧠</div>
        <h1 className="text-3xl font-bold text-purple-800 mb-4">משחק הזיכרון</h1>
        <p className="text-lg text-purple-600 mb-6">
          מצאו את הזוגות הזהים על הלוח!
        </p>
        <button
          onClick={() => initializeGame('EASY')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg mb-4 block w-full"
        >
          🎮 התחל משחק קל
        </button>
        <button
          onClick={() => initializeGame('MEDIUM')}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg mb-4 block w-full"
        >
          🌟 התחל משחק בינוני
        </button>
        <button
          onClick={() => initializeGame('HARD')}
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg block w-full"
        >
          🔥 התחל משחק קשה
        </button>
      </div>
    </div>
  );
}
