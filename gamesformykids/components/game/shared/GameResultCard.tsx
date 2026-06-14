'use client';
import { ReactNode } from 'react';
import { GameCompletionCelebration } from './GameCompletionCelebration';
import { useShareScore } from '@/hooks/shared/social/useShareScore';
import { useGameRating } from '@/hooks/shared/social/useGameRating';
import { printCertificate } from '@/lib/utils/game/printCertificate';

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
  /** Pass score + best to surface a "🏆 שיא חדש!" banner when score equals best. */
  score?: number;
  best?: number;
  /** Enables 👍/👎 rating buttons (persisted per game per day in localStorage). */
  gameType?: string;
  /** 0-100; when >= 80 shows a print-certificate button. */
  scorePercent?: number;
  children: ReactNode;
}

/**
 * Shared shell for game result screens.
 * Provides the outer gradient background, white card, emoji, title, and restart button.
 * Pass game-specific metrics as `children`.
 * When both `score` and `best` are provided, shows a "🏆 שיא חדש!" banner on new records.
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
  score,
  best,
  gameType,
  scorePercent,
  children,
}: Props) {
  const { share, copied } = useShareScore();
  const { rating, rate } = useGameRating(gameType);
  const isNewRecord = score !== undefined && best !== undefined && score > 0 && score === best;
  const showCertificate = scorePercent !== undefined && scorePercent >= 80;

  return (
    <div
      className={`min-h-screen bg-linear-to-br ${gradientClass} flex items-center justify-center p-4`}
      dir="rtl"
    >
      {(score === undefined || score > 0) && <GameCompletionCelebration />}
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full">
        <div className={`text-6xl mb-3 ${animateEmoji ? 'motion-safe:animate-bounce' : ''}`}>{emoji}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        {isNewRecord && (
          <div className="mb-4 px-4 py-2 rounded-2xl bg-linear-to-l from-yellow-400 to-amber-500 text-white font-black text-lg motion-safe:animate-bounce shadow-md">
            🏆 שיא חדש!
          </div>
        )}
        <div className="mb-6">{children}</div>
        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className={`flex-1 py-4 rounded-2xl bg-linear-to-l ${buttonClass} text-white font-bold hover:opacity-90 active:scale-95 transition-[transform,opacity]`}
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
        {showCertificate && (
          <button
            onClick={() => printCertificate({ emoji, title, scorePercent: scorePercent! })}
            className="mt-3 w-full py-2.5 rounded-2xl border-2 border-amber-200 text-amber-600 font-semibold text-sm hover:bg-amber-50 active:scale-95 transition-[transform,background-color]"
          >
            🖨️ הדפס תעודה
          </button>
        )}
        {gameType && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            {rating ? (
              <p className="text-sm text-gray-400">
                {rating === 'up' ? '😊 תודה על המשוב!' : '🙏 תודה! נמשיך להשתפר'}
              </p>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <span className="text-sm text-gray-400">איך היה המשחק?</span>
                <button
                  onClick={() => rate('up')}
                  className="text-2xl hover:scale-125 transition-transform"
                  aria-label="אהבתי"
                >
                  👍
                </button>
                <button
                  onClick={() => rate('down')}
                  className="text-2xl hover:scale-125 transition-transform"
                  aria-label="לא אהבתי"
                >
                  👎
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
