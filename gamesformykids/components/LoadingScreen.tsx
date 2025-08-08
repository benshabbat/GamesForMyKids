"use client";

import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  
  const emojis = ['🎮', '🌟', '🎨', '📚', '🎯', '🧸'];
  const loadingTexts = [
    'טוען משחקים מהנים...',
    'מכין הפתעות...',
    'מארגן צבעים...',
    'בודק שהכל מושלם...',
    'כמעט מוכן!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
      
      // Change emoji every 500ms
      setCurrentEmoji(prev => (prev + 1) % emojis.length);
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete, emojis.length]);

  const currentTextIndex = Math.floor(progress / 20);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center z-50">
      <div className="text-center text-white">
        {/* Animated emoji */}
        <div className="text-8xl mb-8 animate-bounce">
          {emojis[currentEmoji]}
        </div>
        
        {/* Loading text */}
        <h2 className="text-3xl font-bold mb-8 drop-shadow-lg">
          {loadingTexts[Math.min(currentTextIndex, loadingTexts.length - 1)]}
        </h2>
        
        {/* Progress bar */}
        <div className="w-80 h-4 bg-white bg-opacity-30 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-200 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Progress percentage */}
        <div className="text-xl font-semibold">
          {progress}%
        </div>
        
        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
