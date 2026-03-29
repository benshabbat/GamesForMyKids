"use client";

import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { useFeaturedGameContent } from './useFeaturedGameContent';

const FeaturedGameContent = () => {
  const { featuredGame } = useFeaturedGameContent();

  // If no game yet, show loading
  if (!featuredGame) {
    return (
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">⭐ משחק היום ⭐</h2>
          <p className="text-lg text-gray-600">המשחק המומלץ שלנו עבורכם היום!</p>
        </div>
        
        <div className="relative max-w-2xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-300 via-gray-300 to-gray-300 rounded-3xl p-8 shadow-2xl animate-pulse">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gray-400 rounded-lg animate-pulse"></div>
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
    <div className="max-w-6xl mx-auto px-4 mb-12">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">⭐ משחק היום ⭐</h2>
        <p className="text-lg text-gray-600">המשחק המומלץ שלנו עבורכם היום!</p>
      </div>
      
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
        
        <div className="relative bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
              <Link href={featuredGame.href} className="block">
                <div className="bg-white bg-opacity-80 rounded-xl p-4 hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105">
                  <featuredGame.icon className="w-16 h-16 text-gray-700 mx-auto" />
                </div>
              </Link>
            </div>
            
            <div className="flex-1 text-center md:text-right">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {featuredGame.title}
              </h3>
              <p className="text-lg text-white opacity-90 mb-6">
                {featuredGame.description}
              </p>
              
              <Link href={featuredGame.href}>
                <button className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  <Star className="w-5 h-5 fill-current" />
                  בואו נשחק!
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGameContent;