'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HebrewLetter } from '@/lib/constants/gameData/hebrewLetters';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Home } from 'lucide-react';
import WritingCanvas from './WritingCanvas';

interface Props {
  letterData: HebrewLetter;
}

export default function HebrewLetterPractice({ letterData }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    'הכרות עם האות',
    'תרגול עקיבה',
    'כתיבה חופשית'
  ];

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
              <ArrowRight className="w-4 h-4" />
              חזרה לאותיות
            </Button>
          </Link>
          
          <div className="flex gap-2">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`px-3 py-1 rounded-full text-sm ${
                  index === currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          
          <Link href="/games">
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              🎨 דף תרגול קווקוו 🎨
            </h1>
            <p className="text-xl opacity-90">
              האות {letterData.letter} - {letterData.pronunciation}
            </p>
          </div>
        </motion.div>

        {/* Letter Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-4 border-green-500 rounded-2xl p-8 shadow-lg">
            <div className="text-8xl md:text-9xl font-bold text-green-700 mb-4 drop-shadow-lg">
              {letterData.letter}
            </div>
            {letterData.finalForm && (
              <div className="text-4xl text-gray-600 mb-2">
                צורה סופית: {letterData.finalForm}
              </div>
            )}
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
            <li>• התבונני באות {letterData.letter} הגדולה למעלה</li>
            <li>• עקבי באצבע על האותיות המנוקדות</li>
            <li>• תרגלי לכתוב על הקווים הריקים</li>
            <li>• זכרי לכתוב מימין לשמאל</li>
            <li>• קחי את הזמן שלך ותתרגלי</li>
          </ul>
        </motion.div>

        {/* Tracing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-700 bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-500 rounded-xl p-4">
              🖍️ תרגול עקיבה
            </h2>
          </div>
          
          {/* Tracing Lines */}
          <div className="space-y-6">
            {[1, 2].map((lineNum) => (
              <div
                key={lineNum}
                className="flex items-center justify-around bg-gray-50 border-2 border-dashed border-green-500 rounded-xl p-6"
              >
                <div className="text-6xl font-bold text-green-400 opacity-70">
                  {letterData.letter}
                </div>
                {[1, 2, 3, 4].map((pos) => (
                  <div
                    key={pos}
                    className="text-6xl font-bold text-green-100 hover:text-green-300 cursor-pointer transition-all duration-300 hover:scale-110"
                    style={{
                      WebkitTextStroke: '3px #4CAF50'
                    }}
                  >
                    {letterData.letter}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Writing Canvas - Interactive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-700 bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-500 rounded-xl p-4">
              ✏️ תרגול כתיבה חופשית
            </h2>
            <p className="text-gray-600 mt-2">
              השתמש בעכבר או במגע כדי לכתוב את האות {letterData.letter} על המסך
            </p>
          </div>
          
          <WritingCanvas 
            width={800} 
            height={300} 
            strokeWidth={12}
            strokeColor="#2E7D32"
            guideLetter={letterData.letter}
            showGuide={true}
          />
        </motion.div>

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

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 mb-8"
        >
          <Button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            שלב קודם
          </Button>
          
          <Button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2"
          >
            שלב הבא
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
