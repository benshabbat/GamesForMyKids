"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategorizedGamesGrid from "@/components/CategorizedGamesGrid";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Header />
      <CategorizedGamesGrid />
      <Footer />
    </div>
  );
}
