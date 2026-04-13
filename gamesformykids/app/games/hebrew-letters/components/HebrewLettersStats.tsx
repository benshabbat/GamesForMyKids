'use client';

import { motion } from 'framer-motion';
import { useHebrewLetters } from '@/contexts';
import { hebrewLetters } from '@/app/games/hebrew-letters/constants/hebrewLetters';
import StatsGrid from './StatsGrid';
import StatsProgressBar from './StatsProgressBar';
import StatsAchievement from './StatsAchievement';

export default function HebrewLettersStats() {
  const { completedLetters, getLetterProgress } = useHebrewLetters();

  const totalLetters = hebrewLetters.length;
  const completedCount = completedLetters.size;
  const inProgressCount = hebrewLetters.filter(letter => {
    const progress = getLetterProgress(letter.name);
    return progress > 0 && progress < 100;
  }).length;

  const overallProgress = Math.round((completedCount / totalLetters) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-300 mb-8 relative overflow-hidden"
    >
      {/* רקע דקורטיבי */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20"></div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center flex items-center justify-center gap-2">
          📊 הסטטיסטיקות שלך
          {completedCount > 0 && (
            <motion.span
              className="text-yellow-500"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌟
            </motion.span>
          )}
        </h3>

        <StatsGrid
          completedCount={completedCount}
          inProgressCount={inProgressCount}
          totalLetters={totalLetters}
          overallProgress={overallProgress}
        />

        <StatsProgressBar overallProgress={overallProgress} />

        <StatsAchievement completedCount={completedCount} />
      </div>
    </motion.div>
  );
}
