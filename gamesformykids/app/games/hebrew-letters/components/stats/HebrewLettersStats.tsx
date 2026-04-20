'use client';

import { motion } from 'framer-motion';
import { useHebrewLettersStore } from '../../store/hebrewLettersStore';
import { FADE_UP_ANIMATION } from '../../constants/hebrewLettersConstants';
import StatsGrid from './StatsGrid';
import StatsProgressBar from './StatsProgressBar';
import StatsAchievement from './StatsAchievement';

export default function HebrewLettersStats() {
  const completedCount = useHebrewLettersStore((s) => s.completedLetters.size);

  return (
    <motion.div
      {...FADE_UP_ANIMATION}
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

        <StatsGrid />

        <StatsProgressBar />

        <StatsAchievement />
      </div>
    </motion.div>
  );
}
