import { Clock, Trophy, Target, Star, CheckCircle } from 'lucide-react';
import { usePuzzleContext } from '@/contexts';

interface PuzzleStatsProps {
  className?: string;
  // Allow optional override props for special cases
  correctPieces?: number;
  totalPieces?: number;
  timeElapsed?: number;
  score?: number;
  isComplete?: boolean;
}

/**
 * Shared puzzle statistics component - now uses Context for data
 */
export const PuzzleStats: React.FC<PuzzleStatsProps> = ({
  className = "",
  correctPieces: overrideCorrectPieces,
  totalPieces: overrideTotalPieces,
  timeElapsed: overrideTimeElapsed,
  score: overrideScore,
  isComplete: overrideIsComplete
}) => {
  const { state } = usePuzzleContext();
  
  // Use context values unless overridden
  const correctPieces = overrideCorrectPieces ?? state.placedPieces.filter(p => p?.isCorrect).length;
  const totalPieces = overrideTotalPieces ?? (state.selectedPuzzle?.gridSize || state.difficulty);
  const timeElapsed = overrideTimeElapsed ?? state.timer;
  const score = overrideScore ?? state.score;
  const isComplete = overrideIsComplete ?? state.isCompleted;
  const completionPercentage = Math.round((correctPieces / totalPieces) * 100);
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBg = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800 flex items-center justify-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        סטטיסטיקות
      </h3>
      
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className={`p-4 rounded-lg ${getProgressBg(completionPercentage)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">התקדמות</span>
            <span className={`text-sm font-bold ${getProgressColor(completionPercentage)}`}>
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                completionPercentage >= 80 ? 'bg-green-500' :
                completionPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Correct Pieces */}
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-xs text-blue-600 font-medium">נכונים</span>
            </div>
            <div className="text-lg font-bold text-blue-800">
              {correctPieces}/{totalPieces}
            </div>
          </div>

          {/* Time */}
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-purple-600 mr-1" />
              <span className="text-xs text-purple-600 font-medium">זמן</span>
            </div>
            <div className="text-lg font-bold text-purple-800">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
          </div>

          {/* Score */}
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-xs text-green-600 font-medium">ניקוד</span>
            </div>
            <div className="text-lg font-bold text-green-800">
              {score}
            </div>
          </div>

          {/* Target */}
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center mb-1">
              <Target className="w-4 h-4 text-orange-600 mr-1" />
              <span className="text-xs text-orange-600 font-medium">יעד</span>
            </div>
            <div className="text-lg font-bold text-orange-800">
              100%
            </div>
          </div>
        </div>

        {/* Completion Status */}
        {isComplete && (
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg border-2 border-green-300">
            <div className="text-center">
              <div className="text-2xl mb-2">🎉</div>
              <div className="text-lg font-bold text-green-800">הפאזל הושלם!</div>
              <div className="text-sm text-green-600">כל הכבוד על העבודה המעולה!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
