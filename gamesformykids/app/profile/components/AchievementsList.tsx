import { useAchievements } from '@/hooks';

function formatEarnedAt(iso: string): string {
  return new Date(iso).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function AchievementsList() {
  const { achievements } = useAchievements();
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">הישגים</h3>
      {achievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.slice(0, 6).map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start gap-3 p-4 bg-linear-to-br from-yellow-50 to-amber-50 rounded-xl border border-amber-200 hover:border-amber-300 transition-colors"
            >
              <div className="text-3xl shrink-0">{achievement.icon ?? '🏅'}</div>
              <div className="min-w-0">
                <h4 className="font-semibold text-gray-800">{achievement.achievement_name}</h4>
                {achievement.description && (
                  <p className="text-sm text-gray-600 mt-0.5">{achievement.description}</p>
                )}
                <p className="text-xs text-amber-500 mt-1">{formatEarnedAt(achievement.earned_at)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🏅</div>
          <p className="text-gray-500">עדיין אין הישגים. שחק כדי לזכות בהישגים!</p>
        </div>
      )}
    </div>
  );
}
