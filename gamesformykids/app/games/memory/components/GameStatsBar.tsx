import { Clock, Target, Zap } from "lucide-react";
import { useMemoryStore } from "../stores/useMemoryStore";

export default function GameStatsBar() {
  const { gameStats, getFormattedTimeLeft, getTimeColor } = useMemoryStore();
  const timeColor = getTimeColor();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg p-3 shadow-md">
        <Clock className={`w-6 h-6 mx-auto mb-1 ${timeColor}`} />
        <div className={`text-xl font-bold ${timeColor}`}>{getFormattedTimeLeft()}</div>
        <div className="text-sm text-gray-600">זמן נותר</div>
      </div>

      <div className="bg-white rounded-lg p-3 shadow-md">
        <Target className="w-6 h-6 mx-auto mb-1 text-blue-600" />
        <div className="text-xl font-bold text-blue-600">{gameStats.score}</div>
        <div className="text-sm text-gray-600">ניקוד</div>
      </div>

      <div className="bg-white rounded-lg p-3 shadow-md">
        <Zap className="w-6 h-6 mx-auto mb-1 text-orange-600" />
        <div className="text-xl font-bold text-orange-600">{gameStats.streak}</div>
        <div className="text-sm text-gray-600">רצף</div>
      </div>

      <div className="bg-white rounded-lg p-3 shadow-md">
        <div className="text-2xl mb-1">👆</div>
        <div className="text-xl font-bold text-gray-800">{gameStats.moves}</div>
        <div className="text-sm text-gray-600">מהלכים</div>
      </div>
    </div>
  );
}
