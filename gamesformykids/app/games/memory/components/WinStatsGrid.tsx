import { Clock, Target, Zap, Star } from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';
import { StatBox } from '@/components/game/shared/StatBox';

export default function WinStatsGrid() {
  const { gameStats, formatTime, getFormattedTimeLeft } = useMemoryStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <StatBox
        bgClass="bg-white/80"
        icon={<Clock className="w-6 h-6 mx-auto mb-1 text-green-600" />}
        value={formatTime(gameStats.timeElapsed)}
        label="זמן שהושקע"
        textClass="text-lg font-bold text-green-600"
      />
      <StatBox
        bgClass="bg-white/80"
        icon={<Clock className="w-6 h-6 mx-auto mb-1 text-blue-600" />}
        value={getFormattedTimeLeft()}
        label="זמן שנותר"
        textClass="text-lg font-bold text-blue-600"
      />
      <StatBox
        bgClass="bg-white/80"
        icon={<Target className="w-6 h-6 mx-auto mb-1 text-orange-600" />}
        value={gameStats.moves}
        label="מהלכים"
        textClass="text-lg font-bold text-orange-600"
      />
      <StatBox
        bgClass="bg-white/80"
        icon={<Zap className="w-6 h-6 mx-auto mb-1 text-purple-600" />}
        value={gameStats.perfectMatches}
        label="זוגות מושלמים"
        textClass="text-lg font-bold text-purple-600"
      />
      <StatBox
        bgClass="bg-white/80"
        icon={<Star className="w-6 h-6 mx-auto mb-1 text-yellow-600" />}
        value={Math.max(gameStats.streak, 0)}
        label="רצף הכי טוב"
        textClass="text-lg font-bold text-yellow-600"
      />
    </div>
  );
}
