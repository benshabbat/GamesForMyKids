"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturedGame from "@/components/marketing/ClientOnlyFeaturedGame";
import GameRecommendations from "@/components/marketing/GameRecommendations";
import CategorizedGamesGrid from "@/components/marketing/CategorizedGamesGrid";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { useHomePage } from "./useHomePage";

export default function HomePageClient() {
  const { isLoading, shouldShowLoader, handleLoadingComplete } = useHomePage();

  if (isLoading && shouldShowLoader) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Header />
      <main>
        <FeaturedGame />
        <GameRecommendations />
        <CategorizedGamesGrid />
      </main>
      <Footer />
    </div>
  );
}
