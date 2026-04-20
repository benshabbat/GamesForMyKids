"use client";

import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';

/**
 * MinimalGamePage - גרסה מינימלית לטסטים
 */
export function MinimalGamePage() {
  const game = useUniversalGame();

  if (!game.isReady) {
    return <div className="p-8 text-center">טוען...</div>;
  }

  if (game.error) {
    return <div className="p-8 text-center text-red-500">שגיאה: {game.error}</div>;
  }

  if (!game.isPlaying) {
    return (
      <div className="p-8 text-center">
        <button
          onClick={game.startGame}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          התחל משחק
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{game.config.title}</h1>
      <p className="mb-4">ניקוד: {game.score} | רמה: {game.level}</p>
      {game.currentChallenge && (
        <div className="mb-4 p-4 bg-blue-100 rounded">
          <p>מה זה: {game.currentChallenge.hebrew}</p>
          <button
            onClick={() => game.speakItemName(game.currentChallenge!.name)}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
          >
            🔊
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {game.options.map((item, index) => (
          <button
            key={index}
            onClick={() => game.handleItemClick(item)}
            className="p-4 border rounded hover:bg-gray-100"
          >
            {item.hebrew}
          </button>
        ))}
      </div>
    </div>
  );
}
