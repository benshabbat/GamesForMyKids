'use client';

import React from 'react';

interface Props<T extends string> {
  gradient: string;
  titleColor: string;
  emoji: string;
  title: string;
  description: string;
  categories: readonly T[];
  categoryClassName: (cat: T) => string;
  categoryLabel?: (cat: T) => React.ReactNode;
  gridCols?: 2 | 3;
  withCard?: boolean;
  onStart: (cat: T) => void;
}

export default function QuizCategoryMenuScreen<T extends string>({
  gradient,
  titleColor,
  emoji,
  title,
  description,
  categories,
  categoryClassName,
  categoryLabel,
  gridCols = 3,
  withCard = true,
  onStart,
}: Props<T>) {
  const gridClass = gridCols === 3
    ? 'grid grid-cols-3 gap-2 mb-6'
    : 'grid grid-cols-2 gap-3 mb-8 w-full max-w-sm';

  const grid = (
    <div className={gridClass}>
      {categories.map(cat => (
        <button key={cat} onClick={() => onStart(cat)} className={categoryClassName(cat)}>
          {categoryLabel ? categoryLabel(cat) : cat}
        </button>
      ))}
    </div>
  );

  if (withCard) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-4`} dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-6">{emoji}</div>
          <h1 className={`text-3xl font-bold ${titleColor} mb-2`}>{title}</h1>
          <p className="text-gray-500 mb-4">{description}</p>
          {grid}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-6`} dir="rtl">
      <div className="text-8xl mb-4">{emoji}</div>
      <h1 className={`text-4xl font-bold ${titleColor} mb-2`}>{title}</h1>
      <p className="text-gray-600 mb-8 text-center">{description}</p>
      {grid}
    </div>
  );
}
