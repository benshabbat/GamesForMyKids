import { useMemoryStore } from "../stores/useMemoryStore";
import WinStatsGrid from "./WinStatsGrid";
import WinAchievements from "./WinAchievements";

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function GameWinMessage() {
  const { gameStats, timeLeft, getDifficultyConfig } = useMemoryStore();
  const difficultyConfig = getDifficultyConfig();

  const getPerformanceLevel = () => {
    const efficiency = gameStats.score / Math.max(gameStats.moves, 1);
    const timeBonus = timeLeft > 60 ? 'מהיר כברק!' : timeLeft > 30 ? 'בזמן טוב!' : 'ממש בזמן!';
    if (efficiency > 50) return { level: 'מושלם!', emoji: '🏆', color: 'text-yellow-600', timeComment: timeBonus };
    if (efficiency > 30) return { level: 'מעולה!', emoji: '🥇', color: 'text-green-600', timeComment: timeBonus };
    if (efficiency > 20) return { level: 'טוב מאוד!', emoji: '🥈', color: 'text-blue-600', timeComment: timeBonus };
    return { level: 'יפה!', emoji: '🥉', color: 'text-purple-600', timeComment: timeBonus };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="text-center mb-8 p-8 bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 rounded-3xl shadow-xl animate-bounce-gentle">
      {/* כותרת ניצחון */}
      <div className="mb-6">
        <h2 className="text-5xl font-bold text-orange-800 mb-2">🎉 {performance.level} 🎉</h2>
        <p className="text-2xl text-orange-700 mb-2">
          סיימת ברמת <span className="font-bold">{difficultyConfig.name}</span>!
        </p>
        <p className="text-lg text-orange-600 mb-2">
          {performance.timeComment} נשאר לך {formatTime(timeLeft)}
        </p>
        <div className={`text-4xl ${performance.color} font-bold`}>
          {performance.emoji} {gameStats.score} נקודות
        </div>
      </div>

      <WinStatsGrid />
      <WinAchievements />

      {/* הודעת עידוד */}
      <div className="bg-white/80 rounded-xl p-6 shadow-lg">
        <div className="text-3xl mb-2">🌟</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">כל הכבוד!</h3>
        <p className="text-gray-600">זיכרון מעולה! אתה מוכן לאתגר הבא?</p>
      </div>
    </div>
  );
}
