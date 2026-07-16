'use client';
import Image from 'next/image';
import { useDotToDot } from './useDotToDot';
import DotToDotMenu from './components/DotToDotMenu';
import DotToDotBoard from './components/DotToDotBoard';
import DotToDotPrintButton from './components/DotToDotPrintButton';
import { GameCompletionCelebration } from '@/components/game/shared/GameCompletionCelebration';

export default function DotToDotClient() {
  const { phase, picture, connected, selectPicture, clickDot, backToMenu, reset } = useDotToDot();

  if (phase === 'menu' || !picture) {
    return <DotToDotMenu onSelectPicture={selectPicture} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center p-4 gap-4" dir="rtl">
      <div className="flex items-center justify-between w-full max-w-sm pt-2">
        <button
          onClick={backToMenu}
          className="px-3 py-1.5 rounded-xl text-sm font-semibold bg-white/10 text-indigo-200 hover:bg-white/20 transition-all"
        >
          ⬅️ תפריט
        </button>
        <span className="text-white font-bold">{picture.emoji} {picture.title}</span>
        <DotToDotPrintButton picture={picture} />
      </div>

      {phase === 'complete' && <GameCompletionCelebration />}

      <DotToDotBoard picture={picture} connected={connected} onDotClick={clickDot} />

      {phase === 'complete' ? (
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl font-black text-yellow-300">🎉 כל הכבוד!</h2>
          {picture.imageSrc && (
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-white shadow-xl">
              <Image src={picture.imageSrc} alt={picture.title} fill sizes="192px" className="object-contain" />
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={reset}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-black rounded-2xl shadow-lg transition-transform active:scale-95"
            >
              🔄 שחק שוב
            </button>
            <button
              onClick={backToMenu}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl shadow-lg transition-transform active:scale-95"
            >
              🖼️ תמונה אחרת
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-indigo-300">חברו את הנקודה הבאה: {connected + 1}/{picture.points.length}</p>
      )}
    </div>
  );
}
