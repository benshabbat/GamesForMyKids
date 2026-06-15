"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturedGame from "@/components/marketing/ClientOnlyFeaturedGame";
import GameRecommendations from "@/components/marketing/GameRecommendations";
import SurpriseMeButton from "@/components/marketing/SurpriseMeButton";
import CategorizedGamesGrid from "@/components/marketing/CategorizedGamesGrid";
import LoadingScreen from "@/components/layout/LoadingScreen";
import VocabularyOfTheDay from "@/components/marketing/VocabularyOfTheDay";
import ContinueBanner from "@/components/marketing/ContinueBanner";
import DailyChallenge from "@/components/marketing/DailyChallenge";
import RecentlyPlayedRow from "@/components/marketing/RecentlyPlayedRow";
import GamesTodayBadge from "@/components/marketing/GamesTodayBadge";
import OnboardingModal from "@/components/marketing/OnboardingModal";
import PWAInstallBanner from "@/components/marketing/PWAInstallBanner";
import DailyStreakBadge from "@/components/marketing/DailyStreakBadge";
import CategoryJumpBar from "@/components/marketing/CategoryJumpBar";
import { useHomePage } from "./useHomePage";

export default function HomePageClient() {
  const { isLoading, shouldShowLoader, handleLoadingComplete } = useHomePage();

  if (isLoading && shouldShowLoader) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <VocabularyOfTheDay />
      <Header />
      <CategoryJumpBar />
      <main>
        <DailyStreakBadge />
        <FeaturedGame />
        <ContinueBanner />
        <DailyChallenge />
        <RecentlyPlayedRow />
        <GamesTodayBadge />
        <GameRecommendations />
        <SurpriseMeButton />
        <CategorizedGamesGrid />
      </main>
      <Footer />
      <OnboardingModal />
      <PWAInstallBanner />
    </div>
  );
}
