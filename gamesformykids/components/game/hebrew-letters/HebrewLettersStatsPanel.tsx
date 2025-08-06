'use client';

import { motion } from 'framer-motion';
import { useHebrewLettersStats } from '@/hooks/games/useHebrewLettersStats';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw, BarChart3, Timer, Trophy } from 'lucide-react';

interface HebrewLettersStatsProps {
  letterName?: string;
}

export default function HebrewLettersStatsPanel({ letterName }: HebrewLettersStatsProps) {
  const {
    learningStats,
    completedLetters,
    getTotalPracticeTime,
    getLetterStats,
    exportDetailedReport,
    resetAllStats,
    formatTime
  } = useHebrewLettersStats();

  const totalTime = getTotalPracticeTime();
  const letterStats = letterName ? getLetterStats(letterName) : null;

  const handleExport = () => {
    const data = exportDetailedReport();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hebrew-letters-detailed-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border-2 border-blue-300 p-6 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-bold text-blue-800">
          {letterName ? `סטטיסטיקות עבור האות ${letterName}` : 'סטטיסטיקות כלליות'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* זמן תרגול כולל */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">זמן תרגול</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{formatTime(totalTime)}</p>
        </div>

        {/* אותיות שהושלמו */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">אותיות הושלמו</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{completedLetters.size}</p>
        </div>

        {/* אותיות שהתחילו */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-700">אותיות התחלתי</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900">{learningStats.lettersStarted.size}</p>
        </div>
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
          onClick={handleExport}
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
