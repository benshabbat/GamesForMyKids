'use client';

import { motion } from 'framer-motion';
import { useHebrewLetters } from '@/contexts';
import { hebrewLetters } from '@/lib/constants/gameData/hebrewLetters';

export default function HebrewLettersStats() {
  const { completedLetters, getLetterProgress } = useHebrewLetters();
  
  const totalLetters = hebrewLetters.length;
  const completedCount = completedLetters.size;
  const inProgressCount = hebrewLetters.filter(letter => {
    const progress = getLetterProgress(letter.name);
    return progress > 0 && progress < 100;
  }).length;
  
  const overallProgress = Math.round((completedCount / totalLetters) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 border-2 border-purple-300 mb-8"
    >
      <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">
        📊 הסטטיסטיקות שלך
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{completedCount}</div>
          <div className="text-sm text-gray-600">אותיות הושלמו</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-600">{inProgressCount}</div>
          <div className="text-sm text-gray-600">בתהליך תרגול</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{totalLetters - completedCount - inProgressCount}</div>
          <div className="text-sm text-gray-600">טרם התחלתם</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">{overallProgress}%</div>
          <div className="text-sm text-gray-600">התקדמות כללית</div>
        </div>
      </div>
      
      {/* Overall Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <motion.div 
          className="h-4 bg-gradient-to-r from-green-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${overallProgress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      
      {/* Achievement Messages */}
      <div className="text-center text-purple-800">
        {completedCount === 0 && (
          <p>🚀 התחילו את המסע שלכם ללמידת האותיות העבריות!</p>
        )}
        {completedCount > 0 && completedCount < 5 && (
          <p>🌟 כל הכבוד! התחלתם מצוין!</p>
        )}
        {completedCount >= 5 && completedCount < 15 && (
          <p>🎯 אתם בדרך הנכונה! המשיכו כך!</p>
        )}
        {completedCount >= 15 && completedCount < 22 && (
          <p>🏆 מדהים! אתם כמעט שם!</p>
        )}
        {completedCount === 22 && (
          <p>🎉 מזל טוב! השלמתם את כל האותיות!</p>
        )}
      </div>
    </motion.div>
  );
}
