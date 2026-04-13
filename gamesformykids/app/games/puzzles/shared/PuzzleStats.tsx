'use client';

import { Clock, Trophy, Star, CheckCircle, Target } from 'lucide-react';
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import StatCard from './StatCard';
import CompletionBanner from './CompletionBanner';

export default function PuzzleStats({ className = '' }: { className?: string }) {
  const { placedPieces, selectedPuzzle, difficulty, timer, score, isCompleted } = usePuzzleStore();
  const correctPieces = placedPieces.filter(p => p?.isCorrect).length;
  const totalPieces = selectedPuzzle?.gridSize || difficulty;
  const completionPercentage = Math.round((correctPieces / totalPieces) * 100);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const barColor = completionPercentage >= 80 ? 'bg-green-500' : completionPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500';
  const barBg = completionPercentage >= 80 ? 'bg-green-100' : completionPercentage >= 50 ? 'bg-yellow-100' : 'bg-red-100';
  const barText = completionPercentage >= 80 ? 'text-green-600' : completionPercentage >= 50 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800 flex items-center justify-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        סטטיסטיקות
      </h3>
      <div className="space-y-4">
        <div className={`p-4 rounded-lg ${barBg}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">התקדמות</span>
            <span className={`text-sm font-bold ${barText}`}>{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className={`h-3 rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${completionPercentage}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={<CheckCircle className="w-4 h-4" />} label="חלקים נכונים" value={`${correctPieces}/${totalPieces}`} color="blue" />
          <StatCard icon={<Clock className="w-4 h-4" />} label="זמן" value={`${minutes}:${seconds.toString().padStart(2, '0')}`} color="purple" />
          <StatCard icon={<Star className="w-4 h-4" />} label="ניקוד" value={String(score)} color="green" />
          <StatCard icon={<Target className="w-4 h-4" />} label="יעד" value="100%" color="orange" />
        </div>
        {isCompleted && <CompletionBanner />}
      </div>
    </div>
  );
}
