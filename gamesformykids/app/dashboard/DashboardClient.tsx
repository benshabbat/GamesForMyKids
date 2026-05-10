'use client';

import { useAuth } from '@/hooks/shared/auth/useAuth';
import { useGameProgress } from '@/hooks/shared/progress/useGameProgress';
import { useAchievements } from '@/hooks/shared/progress/useAchievements';
import Link from 'next/link';
import { DashboardHeader } from './components/DashboardHeader';
import { ActivitySummaryCard } from './components/ActivitySummaryCard';
import { MostPlayedCard } from './components/MostPlayedCard';
import { ScoreSummaryCard } from './components/ScoreSummaryCard';
import { RecentAchievementsCard } from './components/RecentAchievementsCard';
import { RecommendedGameCard } from './components/RecommendedGameCard';

export default function DashboardClient() {
  const { user, loading: authLoading } = useAuth();
  const { progress, loading: progressLoading } = useGameProgress();
  const { achievements, loading: achievementsLoading } = useAchievements();

  const loading = authLoading || progressLoading || achievementsLoading;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center">
        <div className="animate-pulse text-purple-600 text-xl">טוען...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">נדרשת התחברות</h2>
          <p className="text-gray-500 text-sm mb-6">התחבר כדי לצפות בלוח ההורים</p>
          <Link
            href="/auth"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-xl transition-colors"
          >
            התחברות
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <DashboardHeader />

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-100 rounded" />
                  <div className="h-3 bg-gray-100 rounded w-4/5" />
                  <div className="h-3 bg-gray-100 rounded w-3/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <ActivitySummaryCard progress={progress} />
            <div className="grid md:grid-cols-2 gap-6">
              <MostPlayedCard progress={progress} />
              <ScoreSummaryCard progress={progress} />
              <RecentAchievementsCard achievements={achievements} />
              <RecommendedGameCard progress={progress} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
