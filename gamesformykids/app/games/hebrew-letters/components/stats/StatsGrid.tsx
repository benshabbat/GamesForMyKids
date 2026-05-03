'use client';

import { motion } from 'framer-motion';
import { useHebrewLettersStore, getLetterProgress, selectLettersCompletionPercent } from '../../store/hebrewLettersStore';
import { hebrewLetters } from '@/app/games/hebrew-letters/constants/hebrewLetters';

const STAT_CARDS = [
  { label: 'אותיות הושלמו ✅', borderClass: 'border-green-200', textClass: 'text-green-600', delay: 0.1 },
  { label: 'בתהליך תרגול 🎯',  borderClass: 'border-yellow-200', textClass: 'text-yellow-600', delay: 0.2 },
  { label: 'טרם התחלתם 📝',    borderClass: 'border-blue-200',   textClass: 'text-blue-600',   delay: 0.3 },
  { label: 'התקדמות כללית 🚀', borderClass: 'border-purple-200', textClass: 'text-purple-600', delay: 0.4 },
] as const;

interface StatCardProps {
  value: string | number;
  label: string;
  borderClass: string;
  textClass: string;
  delay: number;
}

function StatCard({ value, label, borderClass, textClass, delay }: StatCardProps) {
  return (
    <motion.div
      className={`text-center bg-white/50 rounded-xl p-4 border ${borderClass} hover:shadow-lg transition-all`}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className={`text-3xl font-bold ${textClass}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-gray-600">{label}</div>
    </motion.div>
  );
}

export default function StatsGrid() {
  const completedLetters = useHebrewLettersStore((s) => s.completedLetters);
  const overallProgress = useHebrewLettersStore(selectLettersCompletionPercent);

  const completedCount = completedLetters.size;
  const inProgressCount = hebrewLetters.filter((letter) => {
    const progress = getLetterProgress(letter.name);
    return progress > 0 && progress < 100;
  }).length;
  const remaining = hebrewLetters.length - completedCount - inProgressCount;

  const values = [completedCount, inProgressCount, remaining, `${overallProgress}%`];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {STAT_CARDS.map((card, i) => (
        <StatCard key={card.label} value={values[i] ?? 0} {...card} />
      ))}
    </div>
  );
}
