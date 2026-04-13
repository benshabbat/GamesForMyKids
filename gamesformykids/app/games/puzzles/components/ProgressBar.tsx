'use client';

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  const colorText =
    percentage >= 80 ? 'text-green-600' :
    percentage >= 50 ? 'text-yellow-600' :
    'text-red-600';

  const colorBg =
    percentage >= 80 ? 'bg-green-100' :
    percentage >= 50 ? 'bg-yellow-100' :
    'bg-red-100';

  const colorBar =
    percentage >= 80 ? 'bg-green-500' :
    percentage >= 50 ? 'bg-yellow-500' :
    'bg-red-500';

  return (
    <div className={`p-4 rounded-lg ${colorBg}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">התקדמות</span>
        <span className={`text-sm font-bold ${colorText}`}>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${colorBar}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
