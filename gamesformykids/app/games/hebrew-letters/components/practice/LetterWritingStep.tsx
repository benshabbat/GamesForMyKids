'use client';

import { motion } from 'framer-motion';
import { HebrewLetter } from '@/app/games/hebrew-letters/constants/hebrewLetters';
import WritingCanvas from '../canvas/WritingCanvas';

interface Props {
  letterData: HebrewLetter;
}

export default function LetterWritingStep({ letterData }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-8"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-700 bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-500 rounded-xl p-4">
          ✏️ כתיבה חופשית ויצירתית
        </h2>
        <p className="text-gray-600 mt-2">
          השתמש בעכבר או במגע כדי לכתוב את האות {letterData.letter} על המסך בחופשיות
        </p>
      </div>

      {/* הסבר על כתיבה חופשית */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-orange-400 rounded-xl p-4 mb-6">
        <h3 className="text-lg font-semibold text-orange-700 mb-2">
          🎨 כתיבה יצירתית - בלי מגבלות!
        </h3>
        <p className="text-orange-700 text-sm">
          עכשיו אתם יכולים לכתוב בחופשיות ללא מדריך. נסו גדלים שונים, צבעים שונים, וכתבו כמה שיותר פעמים!
        </p>
      </div>

      <WritingCanvas
        width={800}
        height={300}
        guideLetter={undefined}
      />
    </motion.div>
  );
}
