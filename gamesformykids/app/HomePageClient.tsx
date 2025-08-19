"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturedGame from "@/components/marketing/FeaturedGame";
import GameRecommendations from "@/components/marketing/GameRecommendations";
import CategorizedGamesGrid from "@/components/marketing/CategorizedGamesGrid";
import LoadingScreen from "@/components/layout/LoadingScreen";

export default function HomePageClient() {
  const [isLoading, setIsLoading] = useState(false); // Start with false for better LCP
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Optimize loading screen logic to reduce initial render delay
  useEffect(() => {
    // Only show loading screen for new users and not in development
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited && process.env.NODE_ENV !== 'development') {
      setShouldShowLoader(true);
      setIsLoading(true);
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  // Show content immediately if no loading screen is needed
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
