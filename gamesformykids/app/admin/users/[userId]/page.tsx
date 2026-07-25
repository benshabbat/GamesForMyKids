import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/supabase/requireAdmin';
import { createAdminClient } from '@/lib/supabase/adminClient';
import { UserActions } from './UserActions';

export const metadata: Metadata = {
  title: 'פרטי משתמש | GamesForMyKids',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ userId: string }>;
}

export default async function AdminUserDetailPage({ params }: PageProps) {
  const { userId } = await params;
  const { supabase, user: currentUser } = await requireAdmin();

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, gender, role, created_at')
    .eq('id', userId)
    .single();

  if (!profile) notFound();

  const [{ data: progress }, { data: achievements }] = await Promise.all([
    supabase
      .from('game_progress')
      .select('game_type, level, best_score, completed_levels, total_play_time, last_played_at')
      .eq('user_id', userId)
      .order('last_played_at', { ascending: false }),
    supabase
      .from('achievements')
      .select('achievement_name, description, earned_at')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false }),
  ]);

  let banned = false;
  try {
    const { data } = await createAdminClient().auth.admin.getUserById(userId);
    banned = !!data.user?.banned_until && new Date(data.user.banned_until) > new Date();
  } catch {
    // service role not configured — banned state just won't show
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {profile.full_name ?? '(ללא שם)'}
        </h2>
        <p className="text-sm text-gray-500">מזהה: {profile.id}</p>
        <p className="text-sm text-gray-500">
          נרשם: {new Date(profile.created_at).toLocaleDateString('he-IL')}
        </p>
        <p className="text-sm text-gray-500">
          תפקיד: <span className="font-semibold">{profile.role === 'admin' ? 'אדמין' : 'משתמש'}</span>
        </p>
      </div>

      <UserActions
        userId={profile.id}
        role={profile.role}
        banned={banned}
        isSelf={profile.id === currentUser.id}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🎮 התקדמות במשחקים</h3>
          {progress && progress.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {progress.map((p) => (
                <li key={p.game_type} className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-700">{p.game_type}</span>
                  <span className="text-gray-500">
                    שיא: {p.best_score} · רמות: {p.completed_levels}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">אין נתוני התקדמות</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 הישגים</h3>
          {achievements && achievements.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {achievements.map((a, i) => (
                <li key={i} className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-700">{a.achievement_name}</span>
                  <span className="text-gray-400 text-xs">
                    {new Date(a.earned_at).toLocaleDateString('he-IL')}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">אין הישגים עדיין</p>
          )}
        </div>
      </div>
    </div>
  );
}
