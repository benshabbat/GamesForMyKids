'use client';

import { useEffect } from 'react';
import { useUserProfile, useGameProgress, useAchievements } from '@/hooks';
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

  // Always re-fetch progress from Supabase when the profile page mounts,
  // so any progress saved during the last game session is reflected.
  useEffect(() => {
    if (user) refreshProgress();
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
