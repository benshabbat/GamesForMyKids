import { Home, RotateCcw, Play, Pause, Clock, Target, Zap } from "lucide-react";
import { useMemoryContext } from "@/contexts";
import { MEMORY_GAME_CONSTANTS } from "@/lib/constants";

export default function GameHeader() {
  const {
    state: {
      matchedPairs,
      gameStats,
      timeLeft,
      isGamePaused,
      animals,
    },
    resetGame,
    pauseGame,
    resumeGame,
    setDifficulty,
    difficultyConfig,
  } = useMemoryContext();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 10) return 'text-red-500';
    if (timeLeft <= 30) return 'text-orange-500';
    return 'text-green-600';
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-2xl p-6 shadow-2xl mb-6">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4">
        {/* בחירת רמת קושי */}
        <div className="flex justify-center gap-3 mb-6">
          {Object.entries(MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setDifficulty(key as 'EASY' | 'MEDIUM' | 'HARD')}
              className={`px-4 py-2 rounded-full font-bold transition-all duration-300 ${
                difficultyConfig.name === config.name
                  ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-purple-600 hover:bg-purple-50'
              }`}
            >
              {config.emoji} {config.name} ({config.pairs} זוגות)
            </button>
          ))}
        </div>

        {/* סטטיסטיקות עליון */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-3 shadow-md">
            <Clock className={`w-6 h-6 mx-auto mb-1 ${getTimeColor()}`} />
            <div className={`text-xl font-bold ${getTimeColor()}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-600">זמן נותר</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-md">
            <Target className="w-6 h-6 mx-auto mb-1 text-blue-600" />
            <div className="text-xl font-bold text-blue-600">
              {gameStats.score}
            </div>
            <div className="text-sm text-gray-600">ניקוד</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-md">
            <Zap className="w-6 h-6 mx-auto mb-1 text-orange-600" />
            <div className="text-xl font-bold text-orange-600">
              {gameStats.streak}
            </div>
            <div className="text-sm text-gray-600">רצף</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-md">
            <div className="text-2xl mb-1">👆</div>
            <div className="text-xl font-bold text-gray-800">
              {gameStats.moves}
            </div>
            <div className="text-sm text-gray-600">מהלכים</div>
          </div>
        </div>

        {/* פקדים */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => (window.location.href = "/")} 
            className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
          >
            <Home className="inline w-5 h-5 ml-2" /> חזרה
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={isGamePaused ? resumeGame : pauseGame} 
              className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
            >
              {isGamePaused ? <Play className="inline w-5 h-5 ml-2" /> : <Pause className="inline w-5 h-5 ml-2" />}
              {isGamePaused ? 'המשך' : 'השהה'}
            </button>
            
            <button 
              onClick={resetGame} 
              className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
            >
              <RotateCcw className="inline w-5 h-5 ml-2" /> מחדש
            </button>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-800">
              זוגות: {matchedPairs.length} / {animals.length}
            </div>
            <div className="w-full bg-purple-200 rounded-full h-3 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(matchedPairs.length / animals.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
