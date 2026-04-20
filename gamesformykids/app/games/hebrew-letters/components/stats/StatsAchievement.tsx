'use client';

import { motion } from 'framer-motion';
import { hebrewLetters } from '@/app/games/hebrew-letters/constants/hebrewLetters';

interface StatsAchievementProps {
  completedCount: number;
}

export default function StatsAchievement({ completedCount }: StatsAchievementProps) {
  const totalLetters = hebrewLetters.length;
  return (
    <motion.div
      className="text-center text-purple-800 bg-white/30 rounded-xl p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      {completedCount === 0 && (
        <motion.p
          className="flex items-center justify-center gap-2"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          🚀 התחילו את המסע שלכם ללמידת האותיות העבריות!
        </motion.p>
      )}
      {completedCount > 0 && completedCount < 5 && (
        <motion.p
          className="flex items-center justify-center gap-2"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌟 כל הכבוד! התחלתם מצוין!
        </motion.p>
      )}
      {completedCount >= 5 && completedCount < 15 && (
        <motion.p
          className="flex items-center justify-center gap-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎯 אתם בדרך הנכונה! המשיכו כך!
        </motion.p>
      )}
      {completedCount >= 15 && completedCount < 22 && (
        <motion.p
          className="flex items-center justify-center gap-2"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🏆 מדהים! אתם כמעט שם!
        </motion.p>
      )}
      {completedCount === totalLetters && (
        <motion.div
          className="text-center"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-2xl">🎉 מזל טוב! סיימתם את כל האותיות! 🎉</p>
          <p className="text-lg mt-2">אתם אמנים של הכתיבה העברית!</p>
        </motion.div>
      )}
    </motion.div>
  );
}
