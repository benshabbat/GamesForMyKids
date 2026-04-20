'use client';

import { motion } from 'framer-motion';
import { HebrewLetter } from '@/app/games/hebrew-letters/constants/hebrewLetters';

interface Props {
  letterData: HebrewLetter;
}

export default function LetterFunFacts({ letterData }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400 rounded-2xl p-6 mb-8"
    >
      <h3 className="text-2xl font-bold text-purple-700 mb-4">🌟 עובדות מעניינות על האות {letterData.letter}:</h3>
      <div className="text-purple-800 text-lg space-y-2">
        <p><strong>{letterData.letter}</strong> {letterData.description}</p>
        <p>האות {letterData.letter} נקראת &quot;{letterData.pronunciation}&quot;</p>
        <p>דוגמאות למילים: {letterData.examples.join(', ')}</p>
        <p>זהו תרגול נהדר ללמידת הכתיבה העברית! 🎉</p>
      </div>
    </motion.div>
  );
}
