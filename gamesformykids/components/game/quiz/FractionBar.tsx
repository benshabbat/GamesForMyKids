'use client';

import { memo } from 'react';

interface Props {
  numerator: number;
  denominator: number;
  color?: string;
}

function FractionBar({ numerator, denominator, color = '#7c3aed' }: Props) {
  return (
    <div className="flex gap-1 justify-center my-2">
      {Array.from({ length: denominator }).map((_, i) => (
        <div
          key={i}
          className="h-10 rounded border-2 border-purple-400 transition-all"
          style={{
            width: `${Math.min(56 / denominator, 40)}px`,
            backgroundColor: i < numerator ? color : '#f3f4f6',
          }}
        />
      ))}
    </div>
  );
}

export default memo(FractionBar);
