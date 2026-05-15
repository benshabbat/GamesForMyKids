'use client';
import { ReactNode } from 'react';

interface Props {
  /** Full Tailwind gradient classes for the background, e.g. "from-blue-100 to-indigo-200" */
  gradient: string;
  emoji: string;
  /** If set, wraps emoji in a colored circle with bg-gradient-to-br + this class */
  emojiCircleClass?: string;
  title: string;
  subtitle?: string;
  /** Rendered between subtitle and scoreLine, e.g. lesson box or star rating */
  children?: ReactNode;
  scoreLine?: string;
  /** Full Tailwind gradient classes for the next button */
  buttonGradient: string;
  nextLabel: string;
  onNext: () => void;
  maxWidth?: string;
}

export default function StoryInterludeCard({
  gradient,
  emoji,
  emojiCircleClass,
  title,
  subtitle,
  children,
  scoreLine,
  buttonGradient,
  nextLabel,
  onNext,
  maxWidth = 'max-w-md',
}: Props) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} p-4 flex items-center`} dir="rtl">
      <div className={`${maxWidth} mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center`}>
        {emojiCircleClass ? (
          <div className={`w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-5xl bg-gradient-to-br ${emojiCircleClass}`}>
            {emoji}
          </div>
        ) : (
          <div className="text-6xl mb-3">{emoji}</div>
        )}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
        {subtitle && <p className="text-gray-500 mb-4">{subtitle}</p>}
        {children}
        {scoreLine && <p className="text-gray-500 mb-6">{scoreLine}</p>}
        <button
          onClick={onNext}
          className={`w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l ${buttonGradient} shadow-lg hover:opacity-90 active:scale-95 transition-all`}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
