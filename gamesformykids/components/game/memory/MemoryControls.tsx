import { useMemoryContext } from '@/contexts';
import { DifficultyLevel } from '@/contexts/MemoryContext';

interface MemoryControlsProps {
  className?: string;
}

export default function MemoryControls({ className = "" }: MemoryControlsProps) {
  const {
    state: { gameStarted, isGamePaused, isCompleted },
    initializeGame,
    pauseGame,
    resumeGame,
    resetGame,
    resetToMenu,
    setDifficulty,
    difficultyConfig
  } = useMemoryContext();

  const difficultyOptions: { key: DifficultyLevel; label: string; emoji: string }[] = [
    { key: 'EASY', label: 'קל', emoji: '😊' },
    { key: 'MEDIUM', label: 'בינוני', emoji: '🤔' },
    { key: 'HARD', label: 'קשה', emoji: '🧐' }
  ];

  const handleDifficultyChange = (difficulty: DifficultyLevel) => {
    setDifficulty(difficulty);
    if (gameStarted) {
      initializeGame(difficulty);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* כפתורי בקרה עיקריים */}
        <div className="flex gap-2">
          {!gameStarted ? (
            <button
              onClick={() => initializeGame()}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              ▶️ התחל משחק
            </button>
          ) : (
            <>
              <button
                onClick={isGamePaused ? resumeGame : pauseGame}
                disabled={isCompleted}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-semibold ${
                  isGamePaused 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                } disabled:bg-gray-300 disabled:cursor-not-allowed`}
              >
                {isGamePaused ? '▶️ המשך' : '⏸️ השהה'}
              </button>
              
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                🔄 משחק חדש
              </button>
            </>
          )}
          
          <button
            onClick={resetToMenu}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
          >
            🏠 חזור למשחקים
          </button>
        </div>

        {/* בחירת רמת קושי */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">רמת קושי:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {difficultyOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleDifficultyChange(option.key)}
                disabled={gameStarted && !isCompleted}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  difficultyConfig.name === option.label
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {option.emoji} {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* מידע על רמת הקושי הנוכחית */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">רמת קושי נוכחית:</span>
            <span className="font-semibold text-blue-600">
              {difficultyConfig.emoji} {difficultyConfig.name}
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <span>🎯 {difficultyConfig.pairs} זוגות</span>
            <span>⏰ {Math.floor(difficultyConfig.timeLimit / 60)} דקות</span>
          </div>
        </div>
      </div>

      {/* הודעות מצב */}
      {isGamePaused && gameStarted && (
        <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded-lg text-center">
          <span className="text-yellow-800 font-medium">
            ⏸️ המשחק מושהה - לחץ &quot;המשך&quot; כדי להמשיך
          </span>
        </div>
      )}

      {isCompleted && !gameStarted && (
        <div className="mt-3 p-2 bg-green-100 border border-green-300 rounded-lg text-center">
          <span className="text-green-800 font-medium">
            🎉 משחק הסתיים! לחץ &quot;התחל משחק&quot; למשחק חדש
          </span>
        </div>
      )}
    </div>
  );
}
