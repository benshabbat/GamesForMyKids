import { useMemoryContext } from '@/contexts';

interface MemoryStatsProps {
  className?: string;
}

export default function MemoryStats({ className = "" }: MemoryStatsProps) {
  const {
    state: { gameStats, timeLeft, matchedPairs },
    difficultyConfig
  } = useMemoryContext();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft < 30) return 'text-red-600';
    if (timeLeft < 60) return 'text-orange-600';
    return 'text-green-600';
  };

  const getProgressPercentage = () => {
    return (matchedPairs.length / difficultyConfig.pairs) * 100;
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* ניקוד */}
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {gameStats.score.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">ניקוד</div>
        </div>

        {/* מהלכים */}
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {gameStats.moves}
          </div>
          <div className="text-sm text-gray-600">מהלכים</div>
        </div>

        {/* התקדמות */}
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {matchedPairs.length}/{difficultyConfig.pairs}
          </div>
          <div className="text-sm text-gray-600">זוגות</div>
          {/* פס התקדמות */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* זמן */}
        <div className="text-center">
          <div className={`text-2xl font-bold ${getTimeColor()}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-600">זמן נותר</div>
        </div>
      </div>

      {/* סטטיסטיקות נוספות */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-yellow-600">
              {gameStats.streak}
            </div>
            <div className="text-xs text-gray-600">רצף נוכחי</div>
          </div>
          
          <div>
            <div className="text-lg font-semibold text-orange-600">
              {gameStats.perfectMatches}
            </div>
            <div className="text-xs text-gray-600">התאמות מושלמות</div>
          </div>
          
          <div>
            <div className="text-lg font-semibold text-indigo-600">
              {difficultyConfig.emoji} {difficultyConfig.name}
            </div>
            <div className="text-xs text-gray-600">רמת קושי</div>
          </div>
        </div>
      </div>

      {/* אינדיקטור הישגים */}
      {gameStats.streak >= 3 && (
        <div className="mt-3 p-2 bg-yellow-100 rounded-lg text-center">
          <span className="text-yellow-800 font-semibold">
            🔥 רצף מעולה! {gameStats.streak} זוגות ברצף
          </span>
        </div>
      )}

      {gameStats.perfectMatches >= 5 && (
        <div className="mt-2 p-2 bg-green-100 rounded-lg text-center">
          <span className="text-green-800 font-semibold">
            ⚡ מתח גבוה! {gameStats.perfectMatches} התאמות מושלמות
          </span>
        </div>
      )}
    </div>
  );
}
