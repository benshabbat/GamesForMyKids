'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHebrewLettersStore } from '../../store/hebrewLettersStore';
import { FADE_UP_ANIMATION } from '../../constants/hebrewLettersConstants';
import { useLetterEncouragement } from './useLetterEncouragement';

const FIREWORK_COUNT = 6;

interface Fireworks {
  origin: { x: number; y: number };
  targets: { x: number; y: number }[];
}

export default function LetterEncouragement() {
  const currentLetter = useHebrewLettersStore((s) => s.currentLetter);
  const practiceState = useHebrewLettersStore((s) => s.practiceState);
  const stepIndex = practiceState.currentStep;
  const isCompleted = practiceState.completedSteps.has(stepIndex);
  const letterName = currentLetter?.name ?? '';

  const { showCompletion, encouragementState, getStepMessage } = useLetterEncouragement({ isCompleted });

  // Scattered in an effect rather than a useMemo: Math.random() and
  // window.innerWidth are both impure reads, and a useMemo is not a guarantee
  // that they run once — React may drop and recompute a memo at will, which
  // would make the fireworks jump mid-animation. The effect re-rolls the
  // positions exactly when a celebration starts, which is the intent the old
  // "deps aren't really deps" comment was reaching for.
  const [fireworks, setFireworks] = useState<Fireworks | null>(null);

  useEffect(() => {
    setFireworks({
      origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      targets: Array.from({ length: FIREWORK_COUNT }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      })),
    });
  }, [encouragementState.showEncouragement, showCompletion]);

  return (
    <>
      {/* הודעת עידוד לשלב */}
      <motion.div
        {...FADE_UP_ANIMATION}
        className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-4 rounded-lg mb-6 text-center"
      >
        <p className="text-yellow-800 font-medium text-lg">
          {getStepMessage(stepIndex)}
        </p>
      </motion.div>

      {/* הודעת עידוד בסיום */}
      {(encouragementState.showEncouragement || showCompletion) && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: -50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 50 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-6 rounded-2xl shadow-2xl border-4 border-white">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.6, repeat: 2 }}
              className="text-3xl font-bold text-center"
            >
              {encouragementState.currentMessage}
            </motion.div>
            <p className="text-center text-lg mt-2">
              סיימת את השלב של האות {letterName}!
            </p>
          </div>
        </motion.div>
      )}

      {/* אפקט זיקוקים */}
      {/* Driven off `fireworks` rather than the flag alone: the positions are
          only known after the effect runs, so there is one paint with nothing
          to show — which is invisible at this scale and beats rendering
          particles at coordinates that don't exist yet. */}
      {(encouragementState.showEncouragement || showCompletion) && fireworks && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {fireworks.targets.map((target, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{ x: fireworks.origin.x, y: fireworks.origin.y, scale: 0 }}
              animate={{
                x: target.x,
                y: target.y,
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
