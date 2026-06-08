'use client';
import { ReactNode } from 'react';
import { GameCompletionCelebration } from './GameCompletionCelebration';
import { useShareScore } from '@/hooks/shared/social/useShareScore';

interface SecondaryAction {
  label: string;
  onClick: () => void;
}

interface Props {
  emoji: string;
  title: string;
  /** Full Tailwind gradient classes, e.g. "from-green-50 to-teal-100" */
  gradientClass: string;
  /** Full Tailwind gradient classes for the restart button, e.g. "from-blue-500 to-indigo-600" */
  buttonClass: string;
  onRestart: () => void;
  restartLabel?: string;
  secondaryAction?: SecondaryAction;
  animateEmoji?: boolean;
  /** Share text passed to Web Share API / clipboard. Omit to hide share button. */
  shareText?: string;
  children: ReactNode;
}

/**
 * Shared shell for game result screens.
 * Provides the outer gradient background, white card, emoji, title, and restart button.
 * Pass game-specific metrics as `children`.
 */
export default function GameResultCard({
  emoji,
  title,
  gradientClass,
  buttonClass,
  onRestart,
  restartLabel = '🔄 שוב',
  secondaryAction,
  animateEmoji = false,
  shareText,
  children,
}: Props) {
  const { share, copied } = useShareScore();
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradientClass} flex items-center justify-center p-4`}
      dir="rtl"
    >
      <GameCompletionCelebration />
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full">
        <div className={`text-6xl mb-3 ${animateEmoji ? 'animate-bounce' : ''}`}>{emoji}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className={`flex-1 py-4 rounded-2xl bg-gradient-to-l ${buttonClass} text-white font-bold hover:opacity-90 active:scale-95 transition-[transform,opacity]`}
          >
            {restartLabel}
          </button>
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
        {shareText && (
          <button
            onClick={() => share(shareText)}
            className="mt-3 w-full py-2.5 rounded-2xl border-2 border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 active:scale-95 transition-[transform,colors]"
          >
            {copied ? '✅ הועתק!' : '📤 שתף את הניקוד'}
          </button>
        )}
      </div>
    </div>
  );
}
