"use client";

import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { GamesRegistry } from "@/lib/registry/gamesRegistry";

const FeaturedGame = () => {
  // קבלת משחק אקראי זמין (או יומי על בסיס התאריך)
  const availableGames = GamesRegistry.getAllGameRegistrations().filter(game => game.available);
  
  if (availableGames.length === 0) return null;
  
  // יצירת "משחק היום" על בסיס התאריך
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const featuredGame = availableGames[dayOfYear % availableGames.length];

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
              <Link href={featuredGame.href} className="cursor-pointer">
                <div className="inline-flex items-center bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-lg hover:from-white/40 hover:to-white/30 transition-all duration-300 border border-white/30 shadow-lg">
                  <span className="ml-2 drop-shadow-sm">שחקו עכשיו</span>
                  <ArrowRight className="w-5 h-5 drop-shadow-sm" />
                </div>
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedGame;
