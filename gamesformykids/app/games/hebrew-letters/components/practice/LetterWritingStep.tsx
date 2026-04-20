'use client';

import { motion } from 'framer-motion';
import { useHebrewLettersStore } from '@/app/games/hebrew-letters/store/hebrewLettersStore';
import { FADE_UP_ANIMATION, STEP_HEADING_CLASS } from '@/app/games/hebrew-letters/constants/hebrewLettersConstants';
import WritingCanvas from '../canvas/WritingCanvas';

export default function LetterWritingStep() {
  const letterData = useHebrewLettersStore((s) => s.currentLetter);
  if (!letterData) return null;
  return (
    <motion.div
      {...FADE_UP_ANIMATION}
      transition={{ delay: 0.4 }}
      className="mb-8"
    >
      <div className="text-center mb-6">
        <h2 className={STEP_HEADING_CLASS}>
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
        height={300}
        guideLetter={undefined}
      />
    </motion.div>
  );
}
