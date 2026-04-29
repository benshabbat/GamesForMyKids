'use client';

interface LetterStats {
  timesStarted: number;
  timesCompleted: number;
  totalTimeSpent: number;
  averageTimePerStep: number;
}

interface LetterSpecificStatsProps {
  letterName: string;
  letterStats: LetterStats;
  formatTime: (ms: number) => string;
}

export function LetterSpecificStats({ letterName, letterStats, formatTime }: LetterSpecificStatsProps) {
  return (
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
  );
}
