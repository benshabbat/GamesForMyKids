"use client";

import dynamic from 'next/dynamic';

// Dynamic import without SSR for the problematic component
const FeaturedGameContent = dynamic(() => import('./FeaturedGameContent'), {
  ssr: false,
  loading: () => (
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
  )
});

export default function ClientOnlyFeaturedGame() {
  return <FeaturedGameContent />;
}