'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from '@/hooks/shared/useSpeechSynthesis';

interface LetterEncouragementProps {
  letterName: string;
  stepIndex: number;
  isCompleted: boolean;
}

const encouragementMessages = [
  "כל הכבוד! 🌟",
  "מעולה! 👏", 
  "איזה יופי! 🎉",
  "פנטסטי! ✨",
  "מדהים! 🚀",
  "יש לך זה! 💪",
  "מושלם! 🎯",
  "ברבו! 👑"
];

const stepMessages = {
  0: "התבוננו באות יפה! 👀",
  1: "עכשיו בואו נעקוב עליה! ✏️", 
  2: "זמן לכתוב בעצמנו! 🎨"
};

export default function LetterEncouragement({ 
  letterName, 
  stepIndex, 
  isCompleted 
}: LetterEncouragementProps) {
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const { speakEncouragement } = useSpeechSynthesis();

  useEffect(() => {
    if (isCompleted) {
      const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
      setCurrentMessage(randomMessage);
      setShowEncouragement(true);
      
      // השמע הודעת עידוד
      speakEncouragement(`${randomMessage} סיימת את השלב של האות ${letterName}!`);
      
      const timer = setTimeout(() => {
        setShowEncouragement(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isCompleted, letterName, speakEncouragement]);

  const stepMessage = stepMessages[stepIndex as keyof typeof stepMessages] || "כל הכבוד!";

  return (
    <>
      {/* הודעת עידוד לשלב */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-4 rounded-lg mb-6 text-center"
      >
        <p className="text-yellow-800 font-medium text-lg">
          {stepMessage}
        </p>
      </motion.div>

      {/* הודעת עידוד בסיום */}
      {showEncouragement && (
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
              {currentMessage}
            </motion.div>
            <p className="text-center text-lg mt-2">
              סיימת את השלב של האות {letterName}!
            </p>
          </div>
        </motion.div>
      )}

      {/* אפקט זיקוקים */}
      {showEncouragement && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{ 
                x: window.innerWidth / 2, 
                y: window.innerHeight / 2,
                scale: 0
              }}
              animate={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
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
