'use client';
import { ReactNode, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { GameCompletionCelebration } from './GameCompletionCelebration';
import { useShareScore } from '@/hooks/shared/social/useShareScore';
import { useGameRating } from '@/hooks/shared/social/useGameRating';
import { printCertificate } from '@/lib/utils/game/printCertificate';
import { getNextGameInCategory } from '@/lib/utils/game/getNextGameInCategory';
import WhatsAppShareButton from '@/components/shared/buttons/WhatsAppShareButton';
import { useCategoryCompletion } from '@/hooks/shared/progress/useCategoryCompletion';
import { getActiveHoliday } from '@/lib/constants/holidayLanes';
import { useAudioSettingsStore } from '@/lib/stores/audioSettingsStore';

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
  /** Enables 👍/👎 rating buttons and "next game" link. */
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
  const nextGame = useMemo(() => (gameType ? getNextGameInCategory(gameType) : null), [gameType]);
  const isNewRecord = score !== undefined && best !== undefined && score > 0 && score === best;
  const showCertificate = scorePercent !== undefined && scorePercent >= 80;
  const holidayThemesEnabled = useAudioSettingsStore((s) => s.holidayThemesEnabled);
  const holiday = useMemo(() => holidayThemesEnabled ? getActiveHoliday() : null, [holidayThemesEnabled]);

  const categoryTrophy = useCategoryCompletion(gameType);
  const [showTrophyOverlay, setShowTrophyOverlay] = useState(false);
  useEffect(() => {
    if (!categoryTrophy) return;
    setShowTrophyOverlay(true);
    const t = setTimeout(() => setShowTrophyOverlay(false), 4000);
    return () => clearTimeout(t);
  }, [categoryTrophy]);

  return (
    <div
      className={`min-h-screen bg-linear-to-br ${gradientClass} flex items-center justify-center p-4`}
      dir="rtl"
    >
      {(score === undefined || score > 0) && <GameCompletionCelebration />}
      {showTrophyOverlay && categoryTrophy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 cursor-pointer"
          onClick={() => setShowTrophyOverlay(false)}
        >
          <div className="bg-linear-to-br from-yellow-300 to-amber-500 rounded-3xl p-10 text-center shadow-2xl max-w-sm mx-4 motion-safe:animate-bounce">
            <div className="text-7xl mb-4">🏆</div>
            <h2 className="text-3xl font-black text-white mb-2">כל הכבוד!</h2>
            <p className="text-xl text-white/90 font-bold">השלמת את כל משחקי הקטגוריה</p>
            <p className="text-lg text-white mt-1 font-semibold">{categoryTrophy.title}</p>
            <p className="text-sm text-white/75 mt-4">🥇 🌟 🎉</p>
          </div>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full">
        {holiday && (
          <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-l from-amber-400 to-yellow-300 text-amber-900 text-sm font-bold shadow-sm">
            <span>{holiday.emoji}</span>
            <span>חג שמח! {holiday.name}</span>
          </div>
        )}
        <div className={`text-6xl mb-3 ${animateEmoji ? 'motion-safe:animate-bounce' : ''}`}>{emoji}</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{title}</h2>
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
              className="flex-1 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
        {shareText && (
          <>
            <button
              onClick={() => share(shareText)}
              className="mt-3 w-full py-2.5 rounded-2xl border-2 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-[transform,colors]"
            >
              {copied ? '✅ הועתק!' : '📤 שתף את הניקוד'}
            </button>
            <WhatsAppShareButton text={shareText} />
          </>
        )}
        {showCertificate && (
          <button
            onClick={() => printCertificate({ emoji, title, scorePercent: scorePercent! })}
            className="mt-3 w-full py-2.5 rounded-2xl border-2 border-amber-200 text-amber-600 font-semibold text-sm hover:bg-amber-50 active:scale-95 transition-[transform,background-color]"
          >
            🖨️ הדפס תעודה
          </button>
        )}
        {nextGame && (
          <Link
            href={nextGame.href}
            className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl border-2 border-indigo-100 text-indigo-600 font-semibold text-sm hover:bg-indigo-50 active:scale-95 transition-[transform,colors]"
          >
            <span>המשחק הבא: {nextGame.emoji} {nextGame.title}</span>
            <span aria-hidden>←</span>
          </Link>
        )}
        {gameType && (
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            {rating ? (
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {rating === 'up' ? '😊 תודה על המשוב!' : '🙏 תודה! נמשיך להשתפר'}
              </p>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <span className="text-sm text-gray-400 dark:text-gray-500">איך היה המשחק?</span>
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
