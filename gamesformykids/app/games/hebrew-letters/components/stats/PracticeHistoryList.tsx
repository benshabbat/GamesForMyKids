'use client';

interface PracticeActivity {
  letter: string;
  stepCompleted: number;
  timeSpent: number;
  timestamp: number;
}

interface PracticeHistoryListProps {
  practiceHistory: PracticeActivity[];
  formatTime: (ms: number) => string;
}

export function PracticeHistoryList({ practiceHistory, formatTime }: PracticeHistoryListProps) {
  if (practiceHistory.length === 0) return null;

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <h4 className="font-bold text-gray-800 mb-3">תרגולים אחרונים:</h4>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {practiceHistory.slice(-5).reverse().map((activity, index) => (
          <div key={index} className="text-sm bg-gray-50 p-2 rounded flex justify-between">
            <span>האות {activity.letter} - שלב {activity.stepCompleted + 1}</span>
            <span className="text-gray-600">
              {formatTime(activity.timeSpent)} | {new Date(activity.timestamp).toLocaleTimeString('he-IL')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
