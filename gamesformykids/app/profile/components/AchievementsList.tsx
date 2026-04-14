import type { Achievement } from '@/hooks/shared/progress/useAchievements';

interface AchievementsListProps {
  achievements: Achievement[];
}

export function AchievementsList({ achievements }: AchievementsListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">הישגים אחרונים</h3>
      {achievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.slice(0, 6).map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center space-x-3 space-x-reverse p-3 bg-yellow-50 rounded-lg border border-yellow-200"
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-800">{achievement.achievement_name}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">עדיין אין הישגים. שחק כדי לזכות בהישגים!</p>
      )}
    </div>
  );
}
