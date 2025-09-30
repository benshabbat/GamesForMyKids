"use client";

import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { GamesRegistry, GameRegistration } from "@/lib/registry/gamesRegistry";

// Function to get consistent daily featured game
function getDailyFeaturedGame(): GameRegistration {
  const availableGames = GamesRegistry.getAllGameRegistrations().filter(game => game.available);
  
  if (availableGames.length === 0) {
    // Fallback game
    return {
      id: "colors",
      title: "🎨 משחק צבעים 🎨",
      description: "למד צבעים דרך משחק מהנה ואינטראקטיבי!",
      icon: () => null,
      color: "bg-blue-400",
      href: "/games/colors",
      available: true,
      order: 1
    };
  }
  
  // Use current date to select consistent game across server and client
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return availableGames[dayOfYear % availableGames.length];
}

const FeaturedGame = () => {
  // Use the same daily featured game for both SSR and client-side
  const featuredGame = getDailyFeaturedGame();

  return (
    <div className="max-w-6xl mx-auto px-4 mb-12">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">⭐ משחק היום ⭐</h2>
        <p className="text-lg text-gray-600">המשחק המומלץ שלנו עבורכם היום!</p>
      </div>
      
      <div className="relative max-w-2xl mx-auto">
        <Link href={featuredGame.href}>
          <div className="relative bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4">
              <div className="flex space-x-1">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-200 fill-current animate-pulse" style={{animationDelay: `${i * 0.2}s`}} />
                ))}
              </div>
            </div>
            
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white bg-opacity-10 rounded-full"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center text-white">
              <div className="mb-6 flex justify-center">
                <div className="bg-white bg-opacity-20 p-4 rounded-full">
                  <featuredGame.icon className="w-16 h-16" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-4 drop-shadow-lg">
                {featuredGame.title}
              </h3>
              
              <p className="text-xl opacity-95 mb-6 leading-relaxed">
                {featuredGame.description}
              </p>
                <div className="inline-flex items-center bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-lg hover:from-white/40 hover:to-white/30 transition-all duration-300 border border-white/30 shadow-lg">
                  <span className="ml-2 drop-shadow-sm">שחקו עכשיו</span>
                  <ArrowRight className="w-5 h-5 drop-shadow-sm" />
                </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedGame;
