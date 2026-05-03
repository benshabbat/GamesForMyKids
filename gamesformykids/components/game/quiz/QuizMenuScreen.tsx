'use client';

import { type ReactNode } from 'react';
import { QUIZ_THEMES, type QuizTheme } from './quizTheme';

interface Props {
  emoji: string;
  title: string;
  description: string;
  theme: QuizTheme;
  /** Optional preview/example content shown above the button */
  preview?: ReactNode;
  buttonLabel?: string | undefined;
  onStart: () => void;
}

export function QuizMenuScreen({
  emoji,
  title,
  description,
  theme,
  preview,
  buttonLabel = 'התחל לשחק!',
  onStart,
}: Props) {
  const t = QUIZ_THEMES[theme];
  return (
    <div className={`min-h-screen bg-gradient-to-br ${t.gradient} flex flex-col items-center justify-center p-4`} dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-6">{emoji}</div>
        <h1 className={`text-3xl font-bold ${t.text} mb-2`}>{title}</h1>
        <p className="text-gray-500 mb-5">{description}</p>
        {preview && <div className={`${t.card} rounded-2xl p-4 mb-6`}>{preview}</div>}
        <button
          onClick={onStart}
          className={`w-full py-4 rounded-2xl ${t.button} text-white text-xl font-bold transition-all shadow-lg`}
        >
          {emoji} {buttonLabel}
        </button>
      </div>
    </div>
  );
}
