'use client';

import { type ReactNode } from 'react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { QUIZ_THEMES, type QuizTheme } from './quizTheme';
import { GameCompletionCelebration } from '@/components/game/shared/GameCompletionCelebration';
import { useGameRating } from '@/hooks/shared/social/useGameRating';
import { printCertificate } from '@/lib/utils/game/printCertificate';

interface Props {
  onRestart: () => void;
  theme: QuizTheme;
  title?: string;
  /** Replaces the default emoji header when provided */
  headerContent?: ReactNode;
  subtitle?: string;
  /** Override store values for games that don't use quizGameStore */
  correctCount?: number;
  total?: number;
}

export function QuizResultScreen({ onRestart, theme, title = 'כל הכבוד!', headerContent, subtitle, correctCount: correctCountProp, total: totalProp }: Props) {
  const storeScore  = useQuizGameStore(s => s.score);
  const storeTotal  = useQuizGameStore(s => s.total);
  const storeGameType = useQuizGameStore(s => s.gameType);
  const correctCount = correctCountProp ?? storeScore;
  const total        = totalProp ?? storeTotal;
  const t = QUIZ_THEMES[theme];
  const score = correctCount * 10;
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '👍' : '💪';

  const { rating, rate } = useGameRating(storeGameType);
  const showCertificate = pct >= 80;

  return (
    <div
      className={`min-h-screen bg-linear-to-br ${t.gradient} flex flex-col items-center justify-center p-4`}
      dir="rtl"
    >
      {pct >= 60 && <GameCompletionCelebration isPerfect={pct === 100} />}
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        {headerContent ?? <div className="text-8xl mb-4">{emoji}</div>}
        <h2 className={`text-2xl font-bold ${t.text} mb-2`}>{title}</h2>
        <p className="text-gray-600 mb-4">
          {subtitle ?? `ענית נכון על ${correctCount} מתוך ${total} שאלות`}
        </p>
        <div className={`text-5xl font-black ${t.text} mb-1`}>{score}</div>
        <p className="text-gray-400 text-base mb-6">נקודות</p>
        <button
          onClick={onRestart}
          className={`w-full py-3 rounded-2xl ${t.button} text-white font-bold text-lg transition-opacity`}
        >
          שחק שוב
        </button>
        {showCertificate && (
          <button
            onClick={() => printCertificate({ emoji, title, scorePercent: pct })}
            className="mt-3 w-full py-2.5 rounded-2xl border-2 border-amber-200 text-amber-600 font-semibold text-sm hover:bg-amber-50 active:scale-95 transition-[transform,background-color]"
          >
            🖨️ הדפס תעודה
          </button>
        )}
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
      </div>
    </div>
  );
}
