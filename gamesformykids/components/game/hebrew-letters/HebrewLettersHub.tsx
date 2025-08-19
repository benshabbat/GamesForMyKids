'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { hebrewLetters } from '@/app/games/hebrew-letters/constants/hebrewLetters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import HebrewLetterProgress from './HebrewLetterProgress';
import HebrewLettersStats from './HebrewLettersStats';

export default function HebrewLettersHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
              🎨 תרגול כתיבה בעברית 🎨
            </h1>
            <p className="text-xl text-gray-600">
              לחצו על כל אות כדי להתחיל לתרגל את הכתיבה
            </p>
          </div>
        </motion.div>

        {/* Statistics */}
        <HebrewLettersStats />

        {/* Letters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {hebrewLetters.map((letter, index) => (
            <motion.div
              key={letter.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/games/hebrew-letters/${letter.name}`}>
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-green-400">
                  <CardContent className="p-6">
                    <HebrewLetterProgress 
                      letter={letter} 
                      showName={true} 
                      size="lg" 
                    />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Instructions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-6 border-2 border-orange-300"
        >
          <h3 className="text-2xl font-bold text-orange-600 mb-4 text-center">
            📝 איך להשתמש?
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-orange-800">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-lg">🔍</span>
                <span>לחצו על האות שאתם רוצים לתרגל</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">✍️</span>
                <span>עקבו עם האצבע על האותיות המנוקדות</span>
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-lg">📝</span>
                <span>תרגלו כתיבה על הקווים הריקים</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">🎯</span>
                <span>כתבו מימין לשמאל</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-300"
        >
          <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">
            🌟 עובדות מעניינות על האלפבית העברי
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-purple-800">
            <div className="space-y-2">
              <p><strong>22 אותיות</strong> יש באלפבית העברי</p>
              <p><strong>5 אותיות</strong> יש להן צורה סופית</p>
            </div>
            <div className="space-y-2">
              <p><strong>מימין לשמאל</strong> כותבים בעברית</p>
              <p><strong>3000 שנה</strong> גיל האלפבית העברי</p>
            </div>
          </div>
        </motion.div>

        {/* Back to Games Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link href="/games">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              🎮 חזרה למשחקים
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
