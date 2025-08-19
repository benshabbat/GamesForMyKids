'use client';

import { motion } from 'framer-motion';
import { useHebrewLetters } from '@/contexts';
import { HebrewLetter } from '@/app/games/hebrew-letters/constants/hebrewLetters';

interface HebrewLetterProgressProps {
  letter: HebrewLetter;
  showName?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function HebrewLetterProgress({ 
  letter, 
  showName = false, 
  size = 'md' 
}: HebrewLetterProgressProps) {
  const { getLetterProgress, completedLetters } = useHebrewLetters();
  
  const progress = getLetterProgress(letter.name);
  const isCompleted = completedLetters.has(letter.name);

  const sizeClasses = {
    sm: {
      container: 'w-12 h-12 text-lg',
      text: 'text-lg',
      progress: 'h-1',
      indicator: 'w-4 h-4 text-xs'
    },
    md: {
      container: 'w-16 h-16 text-2xl',
      text: 'text-2xl',
      progress: 'h-2',
      indicator: 'w-5 h-5 text-xs'
    },
    lg: {
      container: 'w-20 h-20 text-3xl',
      text: 'text-3xl',
      progress: 'h-3',
      indicator: 'w-6 h-6 text-sm'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative text-center"
    >
      {/* Letter Display */}
      <div className={`
        ${currentSize.container} 
        mx-auto flex items-center justify-center rounded-full
        ${isCompleted 
          ? 'bg-green-100 border-2 border-green-500' 
          : progress > 0 
            ? 'bg-yellow-100 border-2 border-yellow-400' 
            : 'bg-gray-100 border-2 border-gray-300'
        }
        transition-all duration-300 hover:scale-105
      `}>
        <span className={`
          ${currentSize.text} font-bold
          ${isCompleted 
            ? 'text-green-700' 
            : progress > 0 
              ? 'text-yellow-700' 
              : 'text-gray-600'
          }
        `}>
          {letter.letter}
        </span>

        {/* Progress Indicator */}
        {progress > 0 && (
          <div className="absolute -top-1 -right-1">
            {isCompleted ? (
              <div className={`
                ${currentSize.indicator} 
                bg-green-500 rounded-full flex items-center justify-center
              `}>
                <span className="text-white text-xs">✓</span>
              </div>
            ) : (
              <div className={`
                ${currentSize.indicator} 
                bg-yellow-400 rounded-full flex items-center justify-center
              `}>
                <span className="text-white text-xs">
                  {Math.round(progress / 33.33)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Letter Name */}
      {showName && (
        <div className="mt-2">
          <div className="text-sm text-gray-600 font-medium">
            {letter.pronunciation}
          </div>
          {letter.finalForm && (
            <div className="text-xs text-gray-400">
              סופית: {letter.finalForm}
            </div>
          )}
        </div>
      )}

      {/* Progress Bar */}
      {progress > 0 && (
        <div className={`mt-2 w-full bg-gray-200 rounded-full ${currentSize.progress}`}>
          <motion.div 
            className={`
              ${currentSize.progress} rounded-full transition-all duration-500
              ${isCompleted ? 'bg-green-500' : 'bg-yellow-400'}
            `}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}
    </motion.div>
  );
}
