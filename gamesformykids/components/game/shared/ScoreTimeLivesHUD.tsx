'use client';
import LivesDisplay from './LivesDisplay';
import { useTimerVisibility } from '@/hooks/shared/useTimerVisibility';

interface Props {
  score: number;
  lives: number;
  timeLeft: number;
  mb?: string;
}

export default function ScoreTimeLivesHUD({ score, lives, timeLeft, mb = 'mb-3' }: Props) {
  const { timerHidden, toggleTimer } = useTimerVisibility();
  return (
    <div className={`flex gap-5 ${mb} text-white text-center`}>
      <div>
        <p className="text-2xl font-black text-yellow-300" role="status" aria-live="polite" aria-label={`ניקוד: ${score}`}>{score}</p>
        <p className="text-sm text-yellow-500">ניקוד</p>
      </div>
      <div>
        <LivesDisplay lives={lives} />
        <p className="text-sm text-red-400">חיים</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1">
          {timerHidden
            ? <p className="text-2xl font-black text-blue-200">⏱️</p>
            : <p className="text-2xl font-black text-blue-200">{timeLeft} שנ׳</p>
          }
          <button
            onClick={toggleTimer}
            title={timerHidden ? 'הצג שעון' : 'הסתר שעון'}
            aria-label={timerHidden ? 'הצג שעון ספירה לאחור' : 'הסתר שעון ספירה לאחור'}
            className="text-blue-300 hover:text-blue-100 transition-colors text-base leading-none opacity-70 hover:opacity-100"
          >
            {timerHidden ? '👁️' : '🙈'}
          </button>
        </div>
        <p className="text-sm text-blue-400">זמן</p>
      </div>
    </div>
  );
}
