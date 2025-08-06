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
      className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-300 mb-8 relative overflow-hidden"
    >
      {/* רקע דקורטיבי */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20"></div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center flex items-center justify-center gap-2">
          📊 הסטטיסטיקות שלך
          {completedCount > 0 && (
            <motion.span 
              className="text-yellow-500"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌟
            </motion.span>
          )}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <motion.div 
            className="text-center bg-white/50 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="text-3xl font-bold text-green-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
            >
              {completedCount}
            </motion.div>
            <div className="text-sm text-gray-600">אותיות הושלמו ✅</div>
          </motion.div>
          
          <motion.div 
            className="text-center bg-white/50 rounded-xl p-4 border border-yellow-200 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="text-3xl font-bold text-yellow-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              {inProgressCount}
            </motion.div>
            <div className="text-sm text-gray-600">בתהליך תרגול 🎯</div>
          </motion.div>
          
          <motion.div 
            className="text-center bg-white/50 rounded-xl p-4 border border-blue-200 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="text-3xl font-bold text-blue-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              {totalLetters - completedCount - inProgressCount}
            </motion.div>
            <div className="text-sm text-gray-600">טרם התחלתם 📝</div>
          </motion.div>
          
          <motion.div 
            className="text-center bg-white/50 rounded-xl p-4 border border-purple-200 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="text-3xl font-bold text-purple-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
            >
              {overallProgress}%
            </motion.div>
            <div className="text-sm text-gray-600">התקדמות כללית 🚀</div>
          </motion.div>
        </div>
        
        {/* Overall Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
          <motion.div 
            className="h-6 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-inner"
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
          >
            {overallProgress > 15 && `${overallProgress}%`}
          </motion.div>
        </div>
        
        {/* Achievement Messages */}
        <motion.div 
          className="text-center text-purple-800 bg-white/30 rounded-xl p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {completedCount === 0 && (
            <motion.p 
              className="flex items-center justify-center gap-2"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              🚀 התחילו את המסע שלכם ללמידת האותיות העבריות!
            </motion.p>
          )}
          {completedCount > 0 && completedCount < 5 && (
            <motion.p 
              className="flex items-center justify-center gap-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌟 כל הכבוד! התחלתם מצוין!
            </motion.p>
          )}
          {completedCount >= 5 && completedCount < 15 && (
            <motion.p 
              className="flex items-center justify-center gap-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎯 אתם בדרך הנכונה! המשיכו כך!
            </motion.p>
          )}
          {completedCount >= 15 && completedCount < 22 && (
            <motion.p 
              className="flex items-center justify-center gap-2"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🏆 מדהים! אתם כמעט שם!
            </motion.p>
          )}
          {completedCount === 22 && (
            <motion.div
              className="text-center"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-2xl">🎉 מזל טוב! סיימתם את כל האותיות! 🎉</p>
              <p className="text-lg mt-2">אתם אמנים של הכתיבה העברית!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
