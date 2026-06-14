'use client';

import { useEffect } from 'react';
import { useUserProfile } from '@/hooks/shared/user/useUserProfile';
import { useGameProgress } from '@/hooks/shared/progress/useGameProgress';
import { useAchievements } from '@/hooks/shared/progress/useAchievements';
import { useAuth } from '@/hooks/shared/auth/useAuth';
import { ProfileLoadingScreen } from './components/ProfileLoadingScreen';
import { ProfileUnauthenticated } from './components/ProfileUnauthenticated';
import { ProfilePageHeader } from './components/ProfilePageHeader';
import { ProfileCard } from './components/ProfileCard';
import { ProfileStatCards } from './components/ProfileStatCards';
import { GameProgressList } from './components/GameProgressList';
import { AchievementsList } from './components/AchievementsList';

export default function ProfileClient() {
  const { user, loading: authLoading } = useAuth();
  const { loading: profileLoading } = useUserProfile();

  // Trigger data fetches so child components find data in the stores
  const { refreshProgress } = useGameProgress();
  useAchievements();

  // Fetch on mount and on tab re-focus.
  // A delayed second fetch catches saves that were still in-flight when the
  // user navigated here (game unmount fires an async Supabase write that may
  // not have committed before the immediate fetch runs).
  useEffect(() => {
    if (!user) return;
    refreshProgress();
    const delayed = setTimeout(refreshProgress, 1500);

    const onVisible = () => {
      if (document.visibilityState === 'visible') refreshProgress();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearTimeout(delayed);
      document.removeEventListener('visibilitychange', onVisible);
    };
  // refreshProgress is stable (useCallback), user drives re-runs
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (authLoading || profileLoading) return <ProfileLoadingScreen />;
  if (!user) return <ProfileUnauthenticated />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <ProfilePageHeader />
        <ProfileCard />
        <ProfileStatCards />
        <GameProgressList />
        <AchievementsList />
      </div>
    </div>
  );
}
