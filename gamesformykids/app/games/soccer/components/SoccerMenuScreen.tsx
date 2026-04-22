'use client';

import { PitchBackground } from './SoccerShared';
import SoccerCategoryGrid from './SoccerCategoryGrid';

export default function SoccerMenuScreen() {
  return (
    <PitchBackground>
      <div className="flex flex-col items-center justify-center min-h-screen p-6" dir="rtl">
        <div className="text-8xl mb-2 drop-shadow-xl">⚽</div>
        <h1 className="text-5xl font-black text-white mb-1 drop-shadow-lg">כדורגל</h1>
        <p className="text-green-200 mb-8 text-center text-lg">שאלות על ספורט המלכים!</p>
        <SoccerCategoryGrid />
        <div className="flex gap-6 text-3xl">
          {['🥅', '⚽', '🏃', '🧤', '🏆'].map((e, i) => (
            <div key={i} className="text-white opacity-80 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>{e}</div>
          ))}
        </div>
      </div>
    </PitchBackground>
  );
}
