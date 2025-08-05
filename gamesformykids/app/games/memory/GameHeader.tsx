import { Home, RotateCcw, Play, Pause, Clock, Target, Zap } from "lucide-react";

interface GameStats {
  moves: number;
  matches: number;
  score: number;
  timeElapsed: number;
  perfectMatches: number;
  streak: number;
}

interface DifficultyConfig {
  pairs: number;
  name: string;
  emoji: string;
  timeLimit: number;
}

interface GameHeaderProps {
  isGameStarted: boolean;
  matchedPairs: number;
  totalPairs: number;
  onStart: () => void;
  gameStats: GameStats;
  timeLeft: number;
  isGamePaused: boolean;
  onPause: () => void;
  difficultyConfig: DifficultyConfig;
  onDifficultyChange: (difficulty: 'EASY' | 'MEDIUM' | 'HARD') => void;
}

export default function GameHeader({
  matchedPairs,
  totalPairs,
  onStart,
  gameStats,
  timeLeft,
  isGamePaused,
  onPause,
  difficultyConfig,
  onDifficultyChange,
}: GameHeaderProps) {
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
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md rounded-xl border border-white/40 shadow-lg mx-auto max-w-6xl mb-6">
      <div className="p-4">
        {/* כותרת המשחק */}
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2 text-center">
          🧠 משחק זיכרון 🧠
        </h1>
        <p className="text-lg text-purple-600 mb-4 text-center">מצא את הזוגות הזהים!</p>

      {/* בחירת רמת קושי */}
      <div className="flex justify-center gap-2 mb-6">
        {Object.entries({
          EASY: { pairs: 6, name: 'קל', emoji: '😊' },
          MEDIUM: { pairs: 9, name: 'בינוני', emoji: '🤔' },
          HARD: { pairs: 12, name: 'קשה', emoji: '🧐' }
        }).map(([key, config]) => (
          <button
            key={key}
            onClick={() => onDifficultyChange(key as 'EASY' | 'MEDIUM' | 'HARD')}
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
            onClick={onPause} 
            className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
          >
            {isGamePaused ? <Play className="inline w-5 h-5 ml-2" /> : <Pause className="inline w-5 h-5 ml-2" />}
            {isGamePaused ? 'המשך' : 'השהה'}
          </button>
          
          <button 
            onClick={onStart} 
            className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
          >
            <RotateCcw className="inline w-5 h-5 ml-2" /> מחדש
          </button>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-800">
            זוגות: {matchedPairs} / {totalPairs}
          </div>
          <div className="w-full bg-purple-200 rounded-full h-3 mt-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(matchedPairs / totalPairs) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
