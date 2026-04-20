'use client';

import { motion } from 'framer-motion';
import { HebrewLetter } from '@/app/games/hebrew-letters/constants/hebrewLetters';
import WritingCanvas from '../canvas/WritingCanvas';

const TRACING_LETTER_STYLE = { WebkitTextStroke: '3px #4CAF50' } as const;

interface Props {
  letterData: HebrewLetter;
}

export default function LetterTracingStep({ letterData }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-700 bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-500 rounded-xl p-4">
          🖍️ תרגול עקיבה וכתיבה מודרכת
        </h2>
        <p className="text-gray-600 mt-2">עקבו באצבע על האותיות המנוקדות או כתבו עם מדריך</p>
      </div>

      {/* Tracing Lines */}
      <div className="space-y-6 mb-8">
        {[1, 2].map((lineNum) => (
          <motion.div
            key={lineNum}
            className="flex items-center justify-around bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-green-500 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: lineNum % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + lineNum * 0.1 }}
          >
            <motion.div
              className="text-6xl font-bold text-green-400 opacity-70"
              whileHover={{ scale: 1.1, color: "#22c55e" }}
            >
              {letterData.letter}
            </motion.div>
            {[1, 2, 3, 4].map((pos) => (
              <motion.div
                key={pos}
                className="text-6xl font-bold text-green-100 hover:text-green-300 cursor-pointer transition-all duration-300 hover:scale-110 relative group"
                style={TRACING_LETTER_STYLE}
                whileHover={{
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => {
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(letterData.pronunciation);
                    utterance.lang = 'he-IL';
                    utterance.rate = 0.8;
                    speechSynthesis.speak(utterance);
                  }
                }}
              >
                {letterData.letter}

                {/* טיפ הוראה */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  עקוב עליי!
                </div>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Writing Canvas with Guide for Tracing */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          ✍️ תרגלו כתיבה עם מדריך
        </h3>
        <p className="text-gray-600 text-sm">
          כתבו את האות {letterData.letter} על הקנבס - המדריך יעזור לכם!
        </p>
      </div>

      <WritingCanvas
        width={800}
        height={250}
        guideLetter={letterData.letter}
      />
    </motion.div>
  );
}
