import { Clock, Trophy, Star, CheckCircle, Target } from 'lucide-react';
import { usePuzzleContext } from '@/contexts';
import ProgressBar from './ProgressBar';
import StatCard from './StatCard';
import CompletionBanner from './CompletionBanner';

interface PuzzleStatsProps {
  className?: string;
}

export const PuzzleStats: React.FC<PuzzleStatsProps> = ({ className = '' }) => {
  const { state } = usePuzzleContext();

  const correctPieces = state.placedPieces.filter(p => p?.isCorrect).length;
  const totalPieces = state.selectedPuzzle?.gridSize || state.difficulty;
  const completionPercentage = Math.round((correctPieces / totalPieces) * 100);
  const minutes = Math.floor(state.timer / 60);
  const seconds = state.timer % 60;

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800 flex items-center justify-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        סטטיסטיקות
      </h3>

      <div className="space-y-4">
        <ProgressBar percentage={completionPercentage} />

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={<CheckCircle className="w-4 h-4" />}
            label="נכונים"
            value={`${correctPieces}/${totalPieces}`}
            color="blue"
          />
          <StatCard
            icon={<Clock className="w-4 h-4" />}
            label="זמן"
            value={`${minutes}:${seconds.toString().padStart(2, '0')}`}
            color="purple"
          />
          <StatCard
            icon={<Star className="w-4 h-4" />}
            label="ניקוד"
            value={String(state.score)}
            color="green"
          />
          <StatCard
            icon={<Target className="w-4 h-4" />}
            label="יעד"
            value="100%"
            color="orange"
          />
        </div>

        {state.isCompleted && <CompletionBanner />}
      </div>
    </div>
  );
};
