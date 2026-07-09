import { useAuth } from '@/hooks/shared/auth/useAuth';
import { useAchievements } from '@/hooks';
import { ACHIEVEMENT_DEFS, getLocalAchievementTypes } from '@/lib/utils/engagement/checkAchievements';

function formatEarnedAt(iso: string): string {
  return new Date(iso).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function AchievementsList() {
  const { user } = useAuth();
  const { achievements } = useAchievements();

  const earnedAt = new Map(achievements.map((a) => [a.achievement_type, a.earned_at]));
  const earnedTypes = user
    ? new Set(achievements.map((a) => a.achievement_type))
    : getLocalAchievementTypes();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        הישגים ({earnedTypes.size}/{ACHIEVEMENT_DEFS.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ACHIEVEMENT_DEFS.map((def) => {
          const unlocked = earnedTypes.has(def.type);
          const date = earnedAt.get(def.type);
          return (
            <div
              key={def.type}
              className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${
                unlocked
                  ? 'bg-linear-to-br from-yellow-50 to-amber-50 border-amber-200 hover:border-amber-300'
                  : 'bg-gray-50 border-gray-200 grayscale opacity-70'
              }`}
            >
              <div className="text-3xl shrink-0">{unlocked ? def.icon : '🔒'}</div>
              <div className="min-w-0">
                <h4 className="font-semibold text-gray-800">{def.name}</h4>
                <p className="text-sm text-gray-600 mt-0.5">
                  {unlocked ? def.description : def.hint}
                </p>
                {unlocked && date && (
                  <p className="text-xs text-amber-500 mt-1">{formatEarnedAt(date)}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
