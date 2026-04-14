import { Clock, Target, Zap, Star } from "lucide-react";
import { useMemoryStore } from "../stores/useMemoryStore";

export default function WinStatsGrid() {
  const { gameStats, formatTime, getFormattedTimeLeft } = useMemoryStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-white/80 rounded-lg p-3 shadow-md">
        <Clock className="w-6 h-6 mx-auto mb-1 text-green-600" />
        <div className="text-lg font-bold text-green-600">{formatTime(gameStats.timeElapsed)}</div>
        <div className="text-sm text-gray-600">זמן שהושקע</div>
      </div>

      <div className="bg-white/80 rounded-lg p-3 shadow-md">
        <Clock className="w-6 h-6 mx-auto mb-1 text-blue-600" />
        <div className="text-lg font-bold text-blue-600">{getFormattedTimeLeft()}</div>
        <div className="text-sm text-gray-600">זמן שנותר</div>
      </div>

      <div className="bg-white/80 rounded-lg p-3 shadow-md">
        <Target className="w-6 h-6 mx-auto mb-1 text-orange-600" />
        <div className="text-lg font-bold text-orange-600">{gameStats.moves}</div>
        <div className="text-sm text-gray-600">מהלכים</div>
      </div>

      <div className="bg-white/80 rounded-lg p-3 shadow-md">
        <Zap className="w-6 h-6 mx-auto mb-1 text-purple-600" />
        <div className="text-lg font-bold text-purple-600">{gameStats.perfectMatches}</div>
        <div className="text-sm text-gray-600">זוגות מושלמים</div>
      </div>

      <div className="bg-white/80 rounded-lg p-3 shadow-md">
        <Star className="w-6 h-6 mx-auto mb-1 text-yellow-600" />
        <div className="text-lg font-bold text-yellow-600">{Math.max(gameStats.streak, 0)}</div>
        <div className="text-sm text-gray-600">רצף הכי טוב</div>
      </div>
    </div>
  );
}
