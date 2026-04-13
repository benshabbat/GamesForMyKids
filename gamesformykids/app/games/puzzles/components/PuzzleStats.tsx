import { Clock, Trophy, Star, CheckCircle, Target } from 'lucide-react';
import { usePuzzleContext } from '@/contexts';
import ProgressBar from './ProgressBar';
import StatCard from './StatCard';
import CompletionBanner from './CompletionBanner';

interface PuzzleStatsProps {
  className?: string;
}

export const PuzzleStats: React.FC<PuzzleStatsProps> = ({ className = '' }) => {
  const { placedPieces, selectedPuzzle, difficulty, timer, score, isCompleted } = usePuzzleContext();

  const correctPieces = placedPieces.filter(p => p?.isCorrect).length;
  const totalPieces = selectedPuzzle?.gridSize || difficulty;
  const completionPercentage = Math.round((correctPieces / totalPieces) * 100);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800 flex items-center justify-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        ����������
      </h3>

      <div className="space-y-4">
        <ProgressBar percentage={completionPercentage} />

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={<CheckCircle className="w-4 h-4" />}
            label="������"
            value={`${correctPieces}/${totalPieces}`}
            color="blue"
          />
          <StatCard
            icon={<Clock className="w-4 h-4" />}
            label="���"
            value={`${minutes}:${seconds.toString().padStart(2, '0')}`}
            color="purple"
          />
          <StatCard
            icon={<Star className="w-4 h-4" />}
            label="�����"
            value={String(score)}
            color="green"
          />
          <StatCard
            icon={<Target className="w-4 h-4" />}
            label="���"
            value="100%"
            color="orange"
          />
        </div>

        {isCompleted && <CompletionBanner />}
      </div>
    </div>
  );
};
