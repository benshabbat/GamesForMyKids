"use client";

import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { useFeaturedGame } from './useFeaturedGame';

const FeaturedGame = () => {
  const { featuredGame, isClient } = useFeaturedGame();

  // Show loading skeleton while client is initializing
  if (!isClient || !featuredGame) {
    return (
      <div className="max-w-6xl mx-auto px-4 mb-8 md:mb-12">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">⭐ משחק היום ⭐</h2>
          <p className="text-base md:text-lg text-gray-600">המשחק המומלץ שלנו עבורכם היום!</p>
        </div>
        
        <div className="relative max-w-2xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-300 via-gray-300 to-gray-300 rounded-3xl p-4 md:p-8 shadow-2xl animate-pulse">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="relative bg-white bg-opacity-20 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-400 rounded-lg animate-pulse"></div>
              </div>
              
              <div className="flex-1 text-center md:text-right">
                <div className="h-8 bg-gray-400 rounded mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-400 rounded mb-6 animate-pulse"></div>
                
                <div className="h-12 bg-gray-400 rounded-full w-48 mx-auto md:mx-0 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mb-8 md:mb-12">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">⭐ משחק היום ⭐</h2>
        <p className="text-sm md:text-lg text-gray-600">המשחק המומלץ שלנו עבורכם היום!</p>
      </div>
      
      <div className="relative max-w-2xl mx-auto">
        <Link href={featuredGame.href}>
          <div className="relative bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-3xl p-4 md:p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
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
              <div className="mb-3 md:mb-6 flex justify-center">
                <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-full">
                  <featuredGame.icon className="w-10 h-10 md:w-16 md:h-16" />
                </div>
              </div>
              
              <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 drop-shadow-lg">
                {featuredGame.title}
              </h3>
              
              <p className="text-sm md:text-xl opacity-95 mb-4 md:mb-6 leading-relaxed hidden sm:block">
                {featuredGame.description}
              </p>
                <div className="inline-flex items-center bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-base md:text-lg hover:from-white/40 hover:to-white/30 transition-all duration-300 border border-white/30 shadow-lg">
                  <span className="ml-2 drop-shadow-sm">שחקו עכשיו</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 drop-shadow-sm" />
                </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedGame;
