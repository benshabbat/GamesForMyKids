import { useGameProgress } from '@/hooks';

export function GameProgressList() {
  const { progress } = useGameProgress();
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">התקדמות במשחקים</h3>
      {progress.length > 0 ? (
        <div className="space-y-4">
          {progress.map((gameProgress) => (
            <div key={gameProgress.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold capitalize">{gameProgress.game_type}</h4>
                <p className="text-sm text-gray-600">רמה {gameProgress.level}</p>
              </div>
              <div className="text-left">
                <p className="font-bold text-purple-600">{gameProgress.best_score} נקודות</p>
                <p className="text-sm text-gray-600">{Math.floor(gameProgress.total_play_time / 60)} דקות</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">עדיין לא שיחקת במשחקים! בוא נתחיל!</p>
      )}
    </div>
  );
}
