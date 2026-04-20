'use client';

import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { useHebrewLettersStore } from '@/app/games/hebrew-letters/store/hebrewLettersStore';

export default function LetterIntroStep() {
  const letterData = useHebrewLettersStore((s) => s.currentLetter);
  const playLetterSound = useHebrewLettersStore((s) => s.playLetterSound);
  if (!letterData) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-center mb-8"
    >
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border-4 border-green-500 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        {/* רקע דקורטיבי */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-blue-100/20 rounded-2xl"></div>

        {/* האות הראשית */}
        <motion.div
          className="text-8xl md:text-9xl font-bold text-green-700 mb-4 drop-shadow-lg relative z-10 cursor-pointer"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => playLetterSound(letterData.letter)}
          title="לחץ לשמיעת ההגייה"
        >
          {letterData.letter}

          {/* אייקון קול */}
          <motion.div
            className="absolute -top-4 -right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Volume2 className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* הגייה */}
        <motion.div
          className="text-2xl text-blue-600 font-semibold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          📢 &quot;{letterData.pronunciation}&quot;
        </motion.div>

        {/* צורה סופית */}
        {letterData.finalForm && (
          <motion.div
            className="text-4xl text-purple-600 mb-2 font-bold"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            צורה סופית: <span className="text-purple-700">{letterData.finalForm}</span>
          </motion.div>
        )}

        {/* דוגמאות למילים */}
        <motion.div
          className="mt-4 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {letterData.examples.slice(0, 3).map((example, index) => (
            <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border border-yellow-300">
              {example}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
