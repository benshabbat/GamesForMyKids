'use client';

import { motion } from 'framer-motion';
import { useHebrewLettersStore, selectLettersCompletionPercent } from '../../store/hebrewLettersStore';

export default function StatsProgressBar() {
  const overallProgress = useHebrewLettersStore(selectLettersCompletionPercent);
  return (
    <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
      <motion.div
        className="h-6 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-inner"
        initial={{ width: 0 }}
        animate={{ width: `${overallProgress}%` }}
        transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
      >
        {overallProgress > 15 && `${overallProgress}%`}
      </motion.div>
    </div>
  );
}
