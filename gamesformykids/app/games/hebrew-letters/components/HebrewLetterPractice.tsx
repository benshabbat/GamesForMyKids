'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HebrewLetter } from '@/app/games/hebrew-letters/constants/hebrewLetters';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Volume2, VolumeX } from 'lucide-react';
import { useHebrewLetterPractice } from '@/app/games/hebrew-letters/hooks/useHebrewLetterPractice';
import WritingCanvas from './WritingCanvas';
import LetterEncouragement from './LetterEncouragement';

interface Props {
  letterData: HebrewLetter;
}

export default function HebrewLetterPractice({ letterData }: Props) {
  const {
    currentStepInfo,
    goToStep,
    getCurrentInstructions,
    getStepTabStyle,
    getStepTabIcon,
    practiceSteps,
    playLetterSound,
    toggleAudio,
    isAudioEnabled,
  } = useHebrewLetterPractice(letterData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <Link href="/games/hebrew-letters">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              חזרה לאותיות
            </Button>
          </Link>
          
          {/* Step Navigation Tabs */}
          <div className="flex gap-2">
            {practiceSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${getStepTabStyle(index)}`}
              >
                <span className="ml-1">{index + 1}</span>
                {step}
                {getStepTabIcon(index) && (
                  <span className="mr-1">{getStepTabIcon(index)}</span>
                )}
              </button>
            ))}
          </div>
          
          <Link href="/games">
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
          
          <Button
            onClick={toggleAudio}
            variant="outline"
            size="sm"
            className={`ml-2 ${isAudioEnabled ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </motion.div>

        {/* Header - תמיד מוצג */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              🎨 דף תרגול האות {letterData.letter} 🎨
            </h1>
            <p className="text-xl opacity-90">
              {letterData.pronunciation}
            </p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-orange-400 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-2xl font-bold text-orange-700 mb-4">📝 הוראות לתרגול:</h3>
          <ul className="text-orange-800 text-lg space-y-2">
            {getCurrentInstructions().map((instruction, index) => (
              <li key={index}>• {instruction}</li>
            ))}
          </ul>
        </motion.div>

        {/* Step 0: הכרות עם האות */}
        {currentStepInfo.stepIndex === 0 && (
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
        )}

        {/* Step 1: תרגול עקיבה וכתיבה מודרכת */}
        {currentStepInfo.stepIndex === 1 && (
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
                      style={{
                        WebkitTextStroke: '3px #4CAF50'
                      }}
                      whileHover={{ 
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                      onHoverStart={() => {
                        // אפקט קול כשעוברים על האות
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
        )}

        {/* Step 2: כתיבה חופשית ויצירתית */}
        {currentStepInfo.stepIndex === 2 && (
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
        )}

        {/* רכיב עידוד */}
        <LetterEncouragement 
          letterName={letterData.name}
          stepIndex={currentStepInfo.stepIndex}
          isCompleted={currentStepInfo.isCompleted}
        />

        {/* Fun Facts */}
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
      </div>
    </div>
  );
}
