import { Metadata } from 'next';
import { requireAdmin } from '@/lib/supabase/requireAdmin';

export const metadata: Metadata = {
  title: 'אנליטיקס | GamesForMyKids',
  robots: { index: false, follow: false },
};

function StatCard({ title, value, emoji }: { title: string; value: string | number; emoji: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center">
      <div className="text-3xl mb-2">{emoji}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );
}

export default async function AdminAnalyticsPage() {
  const { supabase } = await requireAdmin();

  const [{ count: userCount }, { data: progress }, { data: achievements }] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('game_progress').select('game_type, completed_levels, last_played_at, user_id'),
    supabase.from('achievements').select('achievement_type, earned_at'),
  ]);

  const totalGamesPlayed = (progress ?? []).reduce((sum, p) => sum + (p.completed_levels ?? 0), 0);

  const playsByGame = new Map<string, number>();
  for (const p of progress ?? []) {
    playsByGame.set(p.game_type, (playsByGame.get(p.game_type) ?? 0) + 1);
  }
  const mostPlayed = [...playsByGame.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

  const recentActivity = [...(progress ?? [])]
    .filter((p) => p.last_played_at)
    .sort((a, b) => new Date(b.last_played_at).getTime() - new Date(a.last_played_at).getTime())
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="משתמשים רשומים" value={userCount ?? 0} emoji="👤" />
        <StatCard title="רמות שהושלמו" value={totalGamesPlayed} emoji="🎮" />
        <StatCard title="סוגי משחקים ששוחקו" value={playsByGame.size} emoji="🕹️" />
        <StatCard title="הישגים שהוענקו" value={(achievements ?? []).length} emoji="🏆" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🔥 המשחקים הפופולריים ביותר</h3>
          {mostPlayed.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {mostPlayed.map(([gameType, count]) => (
                <li key={gameType} className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-700">{gameType}</span>
                  <span className="text-gray-500">{count} שחקנים</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">אין עדיין נתונים</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🕓 פעילות אחרונה</h3>
          {recentActivity.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {recentActivity.map((p, i) => (
                <li key={i} className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-700">{p.game_type}</span>
                  <span className="text-gray-400 text-xs">
                    {new Date(p.last_played_at).toLocaleString('he-IL')}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">אין עדיין פעילות</p>
          )}
        </div>
      </div>
    </div>
  );
}
