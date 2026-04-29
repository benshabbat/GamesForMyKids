'use client';

import { motion } from 'framer-motion';
import { useHebrewLettersStats } from '@/app/games/hebrew-letters/hooks/useHebrewLettersStats';
import { FADE_UP_ANIMATION } from '@/app/games/hebrew-letters/constants/hebrewLettersConstants';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw, BarChart3, Timer, Trophy } from 'lucide-react';
import { StatPanelCard } from './StatPanelCard';
import { LetterSpecificStats } from './LetterSpecificStats';
import { PracticeHistoryList } from './PracticeHistoryList';

interface HebrewLettersStatsProps {
  letterName?: string;
}

export default function HebrewLettersStatsPanel({ letterName }: HebrewLettersStatsProps) {
  const {
    learningStats,
    completedLetters,
    getTotalPracticeTime,
    getLetterStats,
    downloadDetailedReport,
    resetAllStats,
    formatTime
  } = useHebrewLettersStats();

  const totalTime = getTotalPracticeTime();
  const letterStats = letterName ? getLetterStats(letterName) : null;

  return (
    <motion.div
      {...FADE_UP_ANIMATION}
      className="bg-white rounded-xl border-2 border-blue-300 p-6 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-bold text-blue-800">
          {letterName ? `סטטיסטיקות עבור האות ${letterName}` : 'סטטיסטיקות כלליות'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatPanelCard
          icon={Timer}
          label="זמן תרגול"
          value={formatTime(totalTime)}
          gradientClass="bg-gradient-to-r from-blue-50 to-blue-100"
          iconClass="text-blue-600"
          labelClass="text-blue-700"
          valueClass="text-blue-900"
        />
        <StatPanelCard
          icon={Trophy}
          label="אותיות הושלמו"
          value={completedLetters.size}
          gradientClass="bg-gradient-to-r from-green-50 to-green-100"
          iconClass="text-green-600"
          labelClass="text-green-700"
          valueClass="text-green-900"
        />
        <StatPanelCard
          icon={BarChart3}
          label="אותיות התחלתי"
          value={learningStats.lettersStarted.size}
          gradientClass="bg-gradient-to-r from-yellow-50 to-yellow-100"
          iconClass="text-yellow-600"
          labelClass="text-yellow-700"
          valueClass="text-yellow-900"
        />
      </div>

      {/* סטטיסטיקות ספציפיות לאות */}
      {letterStats && letterName && (
        <LetterSpecificStats
          letterName={letterName}
          letterStats={letterStats}
          formatTime={formatTime}
        />
      )}

      {/* כפתורי פעולה */}
      <div className="flex gap-2 justify-center">
        <Button
          onClick={downloadDetailedReport}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-blue-50"
        >
          <Download className="w-4 h-4" />
          ייצא נתונים
        </Button>

        <Button
          onClick={resetAllStats}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-red-50 text-red-600 border-red-300"
        >
          <RotateCcw className="w-4 h-4" />
          איפוס סטטיסטיקות
        </Button>
      </div>

      {/* היסטוריית תרגולים אחרונה */}
      <PracticeHistoryList
        practiceHistory={learningStats.practiceHistory}
        formatTime={formatTime}
      />
    </motion.div>
  );
}
