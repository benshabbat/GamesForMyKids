'use client';

import { motion } from 'framer-motion';

interface StatsGridProps {
  completedCount: number;
  inProgressCount: number;
  totalLetters: number;
  overallProgress: number;
}

export default function StatsGrid({ completedCount, inProgressCount, totalLetters, overallProgress }: StatsGridProps) {
  const remaining = totalLetters - completedCount - inProgressCount;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <motion.div
        className="text-center bg-white/50 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="text-3xl font-bold text-green-600"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
        >
          {completedCount}
        </motion.div>
        <div className="text-sm text-gray-600">אותיות הושלמו ✅</div>
      </motion.div>

      <motion.div
        className="text-center bg-white/50 rounded-xl p-4 border border-yellow-200 hover:shadow-lg transition-all"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="text-3xl font-bold text-yellow-600"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          {inProgressCount}
        </motion.div>
        <div className="text-sm text-gray-600">בתהליך תרגול 🎯</div>
      </motion.div>

      <motion.div
        className="text-center bg-white/50 rounded-xl p-4 border border-blue-200 hover:shadow-lg transition-all"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="text-3xl font-bold text-blue-600"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.3 }}
        >
          {remaining}
        </motion.div>
        <div className="text-sm text-gray-600">טרם התחלתם 📝</div>
      </motion.div>

      <motion.div
        className="text-center bg-white/50 rounded-xl p-4 border border-purple-200 hover:shadow-lg transition-all"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="text-3xl font-bold text-purple-600"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.4 }}
        >
          {overallProgress}%
        </motion.div>
        <div className="text-sm text-gray-600">התקדמות כללית 🚀</div>
      </motion.div>
    </div>
  );
}
