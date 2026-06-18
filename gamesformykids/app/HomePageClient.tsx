"use client";

import { useState, useEffect } from "react";
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
import JokeOfTheDay from "@/components/marketing/JokeOfTheDay";
import CategoryJumpBar from "@/components/marketing/CategoryJumpBar";
import ContentTypeTabBar, { type ContentType } from "@/components/marketing/ContentTypeTabBar";
import ContentTypeGrid from "@/components/marketing/ContentTypeGrid";
import HolidayLane from "@/components/marketing/HolidayLane";
import { useHomePage } from "./useHomePage";

const SESSION_KEY = 'home-content-tab';

export default function HomePageClient() {
  const { isLoading, shouldShowLoader, handleLoadingComplete } = useHomePage();
  const [activeTab, setActiveTab] = useState<ContentType>('games');

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved === 'creative' || saved === 'riddles' || saved === 'tools') {
      setActiveTab(saved);
    }
  }, []);

  function handleTabChange(tab: ContentType) {
    setActiveTab(tab);
    sessionStorage.setItem(SESSION_KEY, tab);
  }

  if (isLoading && shouldShowLoader) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <VocabularyOfTheDay />
      <Header />
      <CategoryJumpBar />
      <ContentTypeTabBar active={activeTab} onChange={handleTabChange} />
      <main>
        {activeTab === 'games' && (
          <>
            <HolidayLane />
            <DailyStreakBadge />
            <FeaturedGame />
            <ContinueBanner />
            <DailyChallenge />
            <JokeOfTheDay />
            <RecentlyPlayedRow />
            <GamesTodayBadge />
            <GameRecommendations />
            <SurpriseMeButton />
            <CategorizedGamesGrid />
          </>
        )}
        {activeTab !== 'games' && (
          <ContentTypeGrid contentType={activeTab} />
        )}
      </main>
      <Footer />
      <OnboardingModal />
      <PWAInstallBanner />
    </div>
  );
}
