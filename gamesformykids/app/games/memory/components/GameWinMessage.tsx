import { useMemoryStore } from "../stores/useMemoryStore";
import WinStatsGrid from "./WinStatsGrid";
import WinAchievements from "./WinAchievements";

export default function GameWinMessage() {
  const { gameStats, getDifficultyConfig, getPerformanceLevel } = useMemoryStore();
  const difficultyConfig = getDifficultyConfig();
  const performance = getPerformanceLevel();

  return (
    <div className="text-center mb-8 p-8 bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 rounded-3xl shadow-xl animate-bounce-gentle">
      <div className="mb-6">
        <h2 className="text-5xl font-bold text-orange-800 mb-2">🎉 {performance.level} 🎉</h2>
        <p className="text-2xl text-orange-700 mb-2">
          סיימת ברמת <span className="font-bold">{difficultyConfig.name}</span>!
        </p>
        <p className="text-lg text-orange-600 mb-2">{performance.timeComment}</p>
        <div className={`text-4xl ${performance.color} font-bold`}>
          {performance.emoji} {gameStats.score} נקודות
        </div>
      </div>

      <WinStatsGrid />
      <WinAchievements />

      <div className="bg-white/80 rounded-xl p-6 shadow-lg">
        <div className="text-3xl mb-2">🌟</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">כל הכבוד!</h3>
        <p className="text-gray-600">זיכרון מעולה! אתה מוכן לאתגר הבא?</p>
      </div>
    </div>
  );
}
