'use client';
import GameResultCard from './GameResultCard';

interface Props {
  emoji: string;
  title: string;
  gradientClass: string;
  buttonClass: string;
  score: number;
  best: number;
  /** Tailwind bg class for the score card, e.g. "bg-teal-50" */
  scoreBgClass?: string;
  /** Tailwind text class for the score value, e.g. "text-teal-600" */
  scoreTextClass?: string;
  /** Tailwind text class for the score label, e.g. "text-teal-400" */
  scoreLabelClass?: string;
  scoreLabel?: string;
  onRestart: () => void;
  restartLabel?: string;
  animateEmoji?: boolean;
}

/**
 * Shared result screen for games that display only score + best.
 * Renders the standard 2-column grid inside GameResultCard.
 * Use GameResultCard directly when you need a custom children layout.
 */
export default function ScoreBestResultCard({
  score,
  best,
  scoreBgClass = 'bg-gray-50',
  scoreTextClass = 'text-gray-700',
  scoreLabelClass = 'text-gray-400',
  scoreLabel = 'ניקוד',
  ...cardProps
}: Props) {
  return (
    <GameResultCard {...cardProps}>
      <div className="grid grid-cols-2 gap-4">
        <div className={`${scoreBgClass} rounded-2xl p-3`}>
          <p className={`text-3xl font-black ${scoreTextClass}`}>{score}</p>
          <p className={`text-xs ${scoreLabelClass}`}>{scoreLabel}</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-yellow-500">{best}</p>
          <p className="text-xs text-yellow-400">שיא</p>
        </div>
      </div>
    </GameResultCard>
  );
}
