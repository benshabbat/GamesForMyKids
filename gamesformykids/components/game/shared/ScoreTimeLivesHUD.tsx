'use client';
import LivesDisplay from './LivesDisplay';

interface Props {
  score: number;
  lives: number;
  timeLeft: number;
  mb?: string;
}

export default function ScoreTimeLivesHUD({ score, lives, timeLeft, mb = 'mb-3' }: Props) {
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
      <div>
        <p className="text-2xl font-black text-blue-200">{timeLeft} שנ׳</p>
        <p className="text-sm text-blue-400">זמן</p>
      </div>
    </div>
  );
}
