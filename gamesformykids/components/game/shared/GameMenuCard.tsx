'use client';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useKeyboardControls } from '@/hooks/shared/game-controls/useKeyboardControls';

interface Props {
  emoji: string;
  title: string;
  description: string;
  /** Full Tailwind gradient classes, e.g. "from-green-50 to-teal-100" */
  gradientClass: string;
  /** Full Tailwind gradient classes for the start button, e.g. "from-blue-500 to-indigo-600" */
  buttonClass?: string;
  onStart?: () => void;
  startLabel?: string;
  animateEmoji?: boolean | undefined;
  /** Optional extra info line below description (e.g. rules, time per question) */
  hint?: string | undefined;
  /** Optional best score to display */
  best?: number;
  /** Optional secondary action button rendered below the start button */
  secondaryAction?: { label: string; onClick: () => void };
  /** Optional extra content rendered below the description (e.g. level/category grid) */
  children?: ReactNode;
}

/**
 * Shared shell for game menu/lobby screens.
 * Provides the full-screen gradient background, white card, emoji, title,
 * description, optional best score, and start button.
 * Pass a level/category grid as `children` when needed.
 */
export default function GameMenuCard({
  emoji,
  title,
  description,
  gradientClass,
  buttonClass,
  onStart,
  startLabel,
  animateEmoji = false,
  hint,
  best,
  secondaryAction,
  children,
}: Props) {
  const router = useRouter();
  useKeyboardControls({ Escape: () => router.back() });

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradientClass} flex items-center justify-center p-4`}
      dir="rtl"
    >
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className={`text-6xl mb-4 ${animateEmoji ? 'motion-safe:animate-bounce' : ''}`}>{emoji}</div>
        <h1 className="text-3xl font-black text-gray-700 dark:text-gray-100 mb-2">{title}</h1>
        <p className="text-gray-500 dark:text-gray-300 text-base mb-2">{description}</p>
        {hint && <p className="text-gray-400 dark:text-gray-400 text-sm mb-4">{hint}</p>}
        {best !== undefined && best > 0 && (
          <p className="text-yellow-600 font-bold mb-4">🏆 שיא: {best}</p>
        )}
        {children && <div className="mb-6">{children}</div>}
        {!children && onStart && <div className="mb-2" />}
        {onStart && (
          <button
            onClick={onStart}
            className={`w-full py-4 rounded-2xl bg-gradient-to-r ${buttonClass ?? ''} text-white font-black text-xl hover:opacity-90 active:scale-95 transition-[transform,opacity]`}
          >
            {startLabel ?? `${emoji} התחל!`}
          </button>
        )}
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="w-full mt-3 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold text-base hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-[transform,colors]"
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
}
