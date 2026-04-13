'use client';

export default function CompletionBanner() {
  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg border-2 border-green-300">
      <div className="text-center">
        <div className="text-2xl mb-2">🎉</div>
        <div className="text-lg font-bold text-green-800">הפאזל הושלם!</div>
        <div className="text-sm text-green-600">כל הכבוד על העבודה המעולה!</div>
      </div>
    </div>
  );
}
