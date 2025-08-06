import { Suspense } from "react";
import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategorizedGamesGrid from "@/components/CategorizedGamesGrid";
import GameLayout from "@/components/shared/GameLayout";

export const metadata: Metadata = {
  title: "דף הבית",
  description: "גלה משחקים חינוכיים ומהנים לילדים בגיל 2-5. כל המשחקים נבנו במיוחד להתפתחות הקוגניטיבית והמוטורית של הילדים.",
};

// Loading component for Suspense
function GamesGridSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8" role="status" aria-live="polite">
      <span className="sr-only">טוען משחקים...</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => `skeleton-${Date.now()}-${i}`).map((id) => (
          <div
            key={id}
            className="h-48 bg-gray-200 rounded-lg animate-pulse"
            aria-label={`טוען משחק...`}
            role="img"
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <GameLayout 
      backgroundStyle="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
      maxWidth="6xl"
      className="flex flex-col"
    >
      <Header />
      <main className="flex-1" role="main" aria-label="תוכן ראשי - רשימת משחקים לילדים">
        <Suspense fallback={<GamesGridSkeleton />}>
          <CategorizedGamesGrid />
        </Suspense>
      </main>
      <Footer />
    </GameLayout>
  );
}
