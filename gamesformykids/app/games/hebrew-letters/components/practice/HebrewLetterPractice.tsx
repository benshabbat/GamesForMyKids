'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HebrewLetter } from '@/app/games/hebrew-letters/constants/hebrewLetters';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Volume2, VolumeX } from 'lucide-react';
import { useHebrewLetterPractice } from '@/app/games/hebrew-letters/hooks/useHebrewLetterPractice';
import LetterEncouragement from './LetterEncouragement';
import LetterIntroStep from './LetterIntroStep';
import LetterTracingStep from './LetterTracingStep';
import LetterWritingStep from './LetterWritingStep';
import LetterFunFacts from './LetterFunFacts';

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
          <LetterIntroStep letterData={letterData} onPlaySound={playLetterSound} />
        )}

        {/* Step 1: תרגול עקיבה וכתיבה מודרכת */}
        {currentStepInfo.stepIndex === 1 && (
          <LetterTracingStep letterData={letterData} />
        )}

        {/* Step 2: כתיבה חופשית ויצירתית */}
        {currentStepInfo.stepIndex === 2 && (
          <LetterWritingStep letterData={letterData} />
        )}

        {/* רכיב עידוד */}
        <LetterEncouragement />

        {/* Fun Facts */}
        <LetterFunFacts letterData={letterData} />
      </div>
    </div>
  );
}
