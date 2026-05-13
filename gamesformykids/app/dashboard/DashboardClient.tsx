'use client';

import { useAuth } from '@/hooks/shared/auth/useAuth';
import Link from 'next/link';
import { DashboardHeader } from './components/DashboardHeader';
import { ActivitySummaryCard } from './components/ActivitySummaryCard';
import { MostPlayedCard } from './components/MostPlayedCard';
import { ScoreSummaryCard } from './components/ScoreSummaryCard';
import { RecentAchievementsCard } from './components/RecentAchievementsCard';
import { RecommendedGameCard } from './components/RecommendedGameCard';

export default function DashboardClient() {
  const { user, loading: authLoading } = useAuth();

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

        <div className="space-y-6">
          <ActivitySummaryCard />
          <div className="grid md:grid-cols-2 gap-6">
            <MostPlayedCard />
            <ScoreSummaryCard />
            <RecentAchievementsCard />
            <RecommendedGameCard />
          </div>
        </div>
      </div>
    </div>
  );
}
