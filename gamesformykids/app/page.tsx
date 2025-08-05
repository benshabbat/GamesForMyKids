import { Suspense, lazy } from "react";
import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Lazy load heavy components
const CategorizedGamesGrid = lazy(() => import("@/components/CategorizedGamesGrid"));

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
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 bg-gray-200 rounded-lg animate-pulse"
            aria-label={`טוען משחק ${i + 1} מתוך 6`}
            role="img"
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Header />
      <main className="flex-1" role="main" aria-label="תוכן ראשי - רשימת משחקים לילדים">
        <Suspense fallback={<GamesGridSkeleton />}>
          <CategorizedGamesGrid />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
