'use client';

import { PitchBackground } from './SoccerShared';
import SoccerCategoryGrid from './SoccerCategoryGrid';
import type { SoccerCategory } from '../data/soccer';

interface Props {
  onStart: (cat: SoccerCategory) => void;
}

export default function SoccerMenuScreen({ onStart }: Props) {
  return (
    <PitchBackground>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-6xl mb-2 drop-shadow-xl">⚽</div>
        <h1 className="text-3xl font-black text-white mb-1 drop-shadow-lg">כדורגל</h1>
        <p className="text-green-200 mb-8 text-center text-lg">שאלות על ספורט המלכים!</p>
        <SoccerCategoryGrid onStart={onStart} />
        <div className="flex gap-6 text-3xl">
          {['🥅', '⚽', '🏃', '🧤', '🏆'].map((e, i) => (
            <div key={i} className="text-white opacity-80 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>{e}</div>
          ))}
        </div>
      </div>
    </PitchBackground>
  );
}
