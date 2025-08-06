'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from '@/hooks/shared/useSpeechSynthesis';
import { useHebrewLetters } from '@/contexts';

interface LetterEncouragementProps {
  letterName: string;
  stepIndex: number;
  isCompleted: boolean;
}

export default function LetterEncouragement({ 
  letterName, 
  stepIndex, 
  isCompleted 
}: LetterEncouragementProps) {
  const [showCompletion, setShowCompletion] = useState(false);
  const { speakEncouragement } = useSpeechSynthesis();
  const { 
    encouragementState, 
    getStepMessage, 
    getCompletionMessage,
    showStepEncouragement 
  } = useHebrewLetters();

  useEffect(() => {
    if (isCompleted) {
      setShowCompletion(true);
      showStepEncouragement();
      
      // השמע הודעת עידוד
      const completionMessage = getCompletionMessage(letterName);
      speakEncouragement(completionMessage);
      
      const timer = setTimeout(() => {
        setShowCompletion(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isCompleted, letterName, speakEncouragement, getCompletionMessage, showStepEncouragement]);

  return (
    <>
      {/* הודעת עידוד לשלב */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
      {(encouragementState.showEncouragement || showCompletion) && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{ 
                x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
                y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
                scale: 0
              }}
              animate={{ 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
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
