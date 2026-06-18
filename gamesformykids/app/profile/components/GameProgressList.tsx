import Link from 'next/link';
import { useGameProgress } from '@/hooks';
import { GAMES_REGISTRY } from '@/lib/registry/gamesRegistryData';

const GAME_INFO = Object.fromEntries(
  GAMES_REGISTRY.map((g) => [g.id, { title: g.title, emoji: g.emoji }])
);

function formatLastPlayed(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return 'היום';
  if (days === 1) return 'אתמול';
  if (days < 7) return `לפני ${days} ימים`;
  if (days < 30) return `לפני ${Math.floor(days / 7)} שבועות`;
  return `לפני ${Math.floor(days / 30)} חודשים`;
}

export function GameProgressList() {
  const { progress } = useGameProgress();

  const sorted = [...progress].sort(
    (a, b) => new Date(b.last_played_at).getTime() - new Date(a.last_played_at).getTime()
  );

  const maxScore = sorted.reduce((m, p) => Math.max(m, p.best_score), 1);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">התקדמות במשחקים</h3>
      {sorted.length > 0 ? (
        <div className="space-y-3">
          {sorted.map((gp) => {
            const info = GAME_INFO[gp.game_type];
            const title = info?.title ?? gp.game_type;
            const emoji = info?.emoji ?? '🎮';
            const pct = Math.round((gp.best_score / maxScore) * 100);

            return (
              <Link
                key={gp.id}
                href={`/games/${gp.game_type}`}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors group"
              >
                <span className="text-3xl shrink-0">{emoji}</span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-800 truncate group-hover:text-purple-700">
                      {title}
                    </h4>
                    <span className="text-xs text-gray-400 shrink-0 me-2">
                      {formatLastPlayed(gp.last_played_at)}
                    </span>
                  </div>

                  {/* progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-linear-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-[width]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex gap-4 text-sm">
                    <span className="font-bold text-purple-600">שיא: {gp.best_score}</span>
                    {gp.last_score > 0 && (
                      <span className="text-blue-500">אחרון: {gp.last_score}</span>
                    )}
                    <span className="text-gray-500">רמה {gp.level}</span>
                    <span className="text-gray-400">
                      {Math.floor(gp.total_play_time / 60)} דק׳
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🎮</div>
          <p className="text-gray-500">עדיין לא שיחקת במשחקים! בוא נתחיל!</p>
          <Link
            href="/"
            className="inline-block mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            לדף המשחקים
          </Link>
        </div>
      )}
    </div>
  );
}
