/**
 * Game Win Message Component
 * 
 * Displays celebration message and game statistics when player wins
 */

import { Clock, Target, Zap, Star } from "lucide-react";
import { useMemoryContext } from "@/contexts";

export default function GameWinMessage() {
  const {
    state: { gameStats, timeLeft },
    difficultyConfig,
    getGameProgress
  } = useMemoryContext();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
        <h2 className="text-5xl font-bold text-orange-800 mb-2">
          🎉 {performance.level} 🎉
        </h2>
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

      {/* סטטיסטיקות מפורטות */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white/80 rounded-lg p-3 shadow-md">
          <Clock className="w-6 h-6 mx-auto mb-1 text-green-600" />
          <div className="text-lg font-bold text-green-600">
            {formatTime(gameStats.timeElapsed)}
          </div>
          <div className="text-sm text-gray-600">זמן שהושקע</div>
        </div>
        
        <div className="bg-white/80 rounded-lg p-3 shadow-md">
          <Clock className="w-6 h-6 mx-auto mb-1 text-blue-600" />
          <div className="text-lg font-bold text-blue-600">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-600">זמן שנותר</div>
        </div>
        
        <div className="bg-white/80 rounded-lg p-3 shadow-md">
          <Target className="w-6 h-6 mx-auto mb-1 text-orange-600" />
          <div className="text-lg font-bold text-orange-600">
            {gameStats.moves}
          </div>
          <div className="text-sm text-gray-600">מהלכים</div>
        </div>
        
        <div className="bg-white/80 rounded-lg p-3 shadow-md">
          <Zap className="w-6 h-6 mx-auto mb-1 text-purple-600" />
          <div className="text-lg font-bold text-purple-600">
            {gameStats.perfectMatches}
          </div>
          <div className="text-sm text-gray-600">זוגות מושלמים</div>
        </div>
        
        <div className="bg-white/80 rounded-lg p-3 shadow-md">
          <Star className="w-6 h-6 mx-auto mb-1 text-yellow-600" />
          <div className="text-lg font-bold text-yellow-600">
            {Math.max(...[gameStats.streak, 0])}
          </div>
          <div className="text-sm text-gray-600">רצף הכי טוב</div>
        </div>
      </div>

      {/* הישגים מיוחדים */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {gameStats.perfectMatches === getGameProgress().totalPairs && (
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
            🏆 מושלם בכל הזוגות!
          </div>
        )}
        {gameStats.streak >= 5 && (
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold">
            🔥 רצף אש של {gameStats.streak}!
          </div>
        )}
        {gameStats.moves <= getGameProgress().totalPairs * 1.5 && (
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

      {/* הודעת עידוד */}
      <div className="bg-white/80 rounded-xl p-6 shadow-lg">
        <div className="text-3xl mb-2">🌟</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">כל הכבוד!</h3>
        <p className="text-gray-600">
          זיכרון מעולה! אתה מוכן לאתגר הבא?
        </p>
      </div>
    </div>
  );
}
