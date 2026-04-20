'use client';

import { motion } from 'framer-motion';
import { useHebrewLettersStats } from '@/app/games/hebrew-letters/hooks/useHebrewLettersStats';
import { FADE_UP_ANIMATION } from '@/app/games/hebrew-letters/constants/hebrewLettersConstants';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw, BarChart3, Timer, Trophy, type LucideIcon } from 'lucide-react';

interface HebrewLettersStatsProps {
  letterName?: string;
}

interface StatPanelCardProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  gradientClass: string;
  iconClass: string;
  labelClass: string;
  valueClass: string;
}

function StatPanelCard({ icon: Icon, label, value, gradientClass, iconClass, labelClass, valueClass }: StatPanelCardProps) {
  return (
    <div className={`${gradientClass} p-4 rounded-lg`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${iconClass}`} />
        <span className={`text-sm font-medium ${labelClass}`}>{label}</span>
      </div>
      <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
    </div>
  );
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
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-bold text-gray-800 mb-3">פרטים עבור האות {letterName}:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">פעמים שהתחלתי:</span>
              <span className="font-bold mr-2">{letterStats.timesStarted}</span>
            </div>
            <div>
              <span className="text-gray-600">פעמים שהשלמתי:</span>
              <span className="font-bold mr-2">{letterStats.timesCompleted}</span>
            </div>
            <div>
              <span className="text-gray-600">זמן כולל:</span>
              <span className="font-bold mr-2">{formatTime(letterStats.totalTimeSpent)}</span>
            </div>
            <div>
              <span className="text-gray-600">ממוצע לשלב:</span>
              <span className="font-bold mr-2">{formatTime(letterStats.averageTimePerStep)}</span>
            </div>
          </div>
        </div>
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
      {learningStats.practiceHistory.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-bold text-gray-800 mb-3">תרגולים אחרונים:</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {learningStats.practiceHistory.slice(-5).reverse().map((activity, index) => (
              <div key={index} className="text-sm bg-gray-50 p-2 rounded flex justify-between">
                <span>האות {activity.letter} - שלב {activity.stepCompleted + 1}</span>
                <span className="text-gray-600">
                  {formatTime(activity.timeSpent)} | {new Date(activity.timestamp).toLocaleTimeString('he-IL')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
