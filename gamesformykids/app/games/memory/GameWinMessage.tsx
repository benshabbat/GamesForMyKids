import { AnimalData } from "@/lib/types/games";
import { Clock, Target, Zap, Star } from "lucide-react";

interface GameStats {
  moves: number;
  matches: number;
  score: number;
  timeElapsed: number;
  perfectMatches: number;
  streak: number;
}

interface GameWinMessageProps {
  animals: AnimalData[];
  gameStats: GameStats;
  difficultyName: string;
  timeLeft: number;
}

export default function GameWinMessage({ animals, gameStats, difficultyName, timeLeft }: GameWinMessageProps) {
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
          סיימת ברמת <span className="font-bold">{difficultyName}</span>!
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
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-800 mb-3">🏅 הישגים:</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {gameStats.perfectMatches >= animals.length / 2 && (
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              🎯 זיכרון חד
            </span>
          )}
          {gameStats.moves <= animals.length * 2 && (
            <span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              ⚡ יעילות מקסימלית
            </span>
          )}
          {timeLeft > 90 && (
            <span className="bg-blue-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              ⏰ מהיר כברק
            </span>
          )}
          {timeLeft > 60 && timeLeft <= 90 && (
            <span className="bg-cyan-400 text-cyan-900 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              🏃‍♂️ מהירות טובה
            </span>
          )}
          {gameStats.score > 500 && (
            <span className="bg-purple-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              💎 ניקוד גבוה
            </span>
          )}
          {gameStats.score > 800 && (
            <span className="bg-pink-400 text-pink-900 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              👑 ניקוד מושלם
            </span>
          )}
        </div>
      </div>
      
      {/* הצגת כל החיות בחגיגה */}
      <div className="mt-4 flex flex-wrap justify-center gap-2 mb-4">
        {animals.map((animal) => (
          <span 
            key={`${animal.emoji}-${animal.name}-${Date.now()}`} 
            className="text-3xl animate-bounce"
            style={{ 
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: '1s'
            }}
          >
            {animal.emoji}
          </span>
        ))}
      </div>
      
      <div className="text-3xl mt-4 text-orange-600">
        ⭐ מעולה! בואו נשחק שוב! ⭐
      </div>
    </div>
  );
}
