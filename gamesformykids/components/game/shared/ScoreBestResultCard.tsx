'use client';
import { useState, useEffect } from 'react';
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
  shareText?: string;
}

/**
 * Shared result screen for games that display only score + best.
 * Renders the standard 2-column grid inside GameResultCard.
 * Shows a "🏆 שיא חדש!" banner when score equals best (new or tied record).
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
  const [displayed, setDisplayed] = useState(0);
  const [showBanner, setShowBanner] = useState(false);

  const isNewRecord = score > 0 && score === best;

  useEffect(() => {
    if (score === 0) return;
    const steps = 20;
    const increment = score / steps;
    let current = 0;
    const id = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayed(score);
        clearInterval(id);
        if (isNewRecord) setShowBanner(true);
      } else {
        setDisplayed(Math.round(current));
      }
    }, 600 / steps);
    return () => clearInterval(id);
  }, [score, isNewRecord]);

  return (
    <GameResultCard {...cardProps}>
      {showBanner && (
        <div className="mb-4 px-4 py-2 rounded-2xl bg-linear-to-l from-yellow-400 to-amber-500 text-white font-black text-lg motion-safe:animate-bounce shadow-md">
          🏆 שיא חדש!
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className={`${scoreBgClass} rounded-2xl p-3`}>
          <p className={`text-3xl font-black ${scoreTextClass} tabular-nums`}>{displayed}</p>
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
