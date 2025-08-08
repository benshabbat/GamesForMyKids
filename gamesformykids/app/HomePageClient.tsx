"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedGame from "@/components/FeaturedGame";
import GameRecommendations from "@/components/GameRecommendations";
import CategorizedGamesGrid from "@/components/CategorizedGamesGrid";
import LoadingScreen from "@/components/LoadingScreen";

export default function HomePageClient() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Skip loading screen in development or if user has visited before
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited || process.env.NODE_ENV === 'development') {
      setIsLoading(false);
    } else {
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  if (isLoading) {
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
