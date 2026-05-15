import { Clock, Target, Zap } from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';
import { StatBox } from '@/components/game/shared/StatBox';

export default function GameStatsBar() {
  const { gameStats, getFormattedTimeLeft, getTimeColor } = useMemoryStore();
  const timeColor = getTimeColor();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatBox
        icon={<Clock className={`w-6 h-6 mx-auto mb-1 ${timeColor}`} />}
        value={getFormattedTimeLeft()}
        label="זמן נותר"
        textClass={`text-xl font-bold ${timeColor}`}
      />
      <StatBox
        icon={<Target className="w-6 h-6 mx-auto mb-1 text-blue-600" />}
        value={gameStats.score}
        label="ניקוד"
        textClass="text-xl font-bold text-blue-600"
      />
      <StatBox
        icon={<Zap className="w-6 h-6 mx-auto mb-1 text-orange-600" />}
        value={gameStats.streak}
        label="רצף"
        textClass="text-xl font-bold text-orange-600"
      />
      <StatBox
        icon={<div className="text-2xl mb-1">👆</div>}
        value={gameStats.moves}
        label="מהלכים"
      />
    </div>
  );
}
