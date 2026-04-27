'use client';
import { ReactNode } from 'react';

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
  children,
}: Props) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradientClass} flex items-center justify-center p-4`}
      dir="rtl"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full">
        <div className={`text-6xl mb-3 ${animateEmoji ? 'animate-bounce' : ''}`}>{emoji}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className={`flex-1 py-4 rounded-2xl bg-gradient-to-l ${buttonClass} text-white font-bold hover:opacity-90 active:scale-95 transition-all`}
          >
            {restartLabel}
          </button>
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
