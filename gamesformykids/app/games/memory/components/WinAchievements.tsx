import { useMemoryStore } from "../stores/useMemoryStore";

export default function WinAchievements() {
  const { gameStats, getGameProgress, timeLeft } = useMemoryStore();
  const { totalPairs } = getGameProgress();

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {gameStats.perfectMatches === totalPairs && (
        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
          🏆 מושלם בכל הזוגות!
        </div>
      )}
      {gameStats.streak >= 5 && (
        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold">
          🔥 רצף אש של {gameStats.streak}!
        </div>
      )}
      {gameStats.moves <= totalPairs * 1.5 && (
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
          ⚡ יעילות מקסימלית!
        </div>
      )}
      {timeLeft > 120 && (
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
          ⏰ מהיר כאלף!
        </div>
      )}
    </div>
  );
}
