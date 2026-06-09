'use client';

interface Props {
  emoji: string;
  title: string;
  score: number | string;
  scoreLabel?: string;
  scoreSuffix?: string;
  scoreBgClass: string;
  scoreTextClass: string;
  scoreLabelClass: string;
  best: number | string;
  bestSuffix?: string;
  buttonClass: string;
  onRestart: () => void;
  backdropClass?: string;
  cardClass?: string;
  scoreSize?: string;
  gridMb?: string;
  buttonSizeClass?: string;
}

export default function CanvasGameOverOverlay({
  emoji,
  title,
  score,
  scoreLabel = 'ניקוד',
  scoreSuffix = '',
  scoreBgClass,
  scoreTextClass,
  scoreLabelClass,
  best,
  bestSuffix = '',
  buttonClass,
  onRestart,
  backdropClass = 'bg-black/60',
  cardClass = 'p-7 w-72',
  scoreSize = 'text-3xl',
  gridMb = 'mb-5',
  buttonSizeClass = 'py-4 text-xl',
}: Props) {
  const isNewRecord =
    typeof score === 'number' && typeof best === 'number' && score > 0 && score === best;

  return (
    <div className={`absolute inset-0 flex items-center justify-center rounded-3xl ${backdropClass}`}>
      <div className={`bg-white rounded-3xl text-center shadow-2xl ${cardClass}`}>
        <div className="text-5xl mb-2">{emoji}</div>
        <h2 className="text-2xl font-black text-gray-800 mb-3">{title}</h2>
        {isNewRecord && (
          <div className="mb-3 px-3 py-1.5 rounded-2xl bg-linear-to-l from-yellow-400 to-amber-500 text-white font-black text-base animate-bounce shadow-md">
            🏆 שיא חדש!
          </div>
        )}
        <div className={`grid grid-cols-2 gap-3 ${gridMb}`}>
          <div className={`${scoreBgClass} rounded-2xl p-3`}>
            <p className={`${scoreSize} font-black ${scoreTextClass}`}>{score}{scoreSuffix}</p>
            <p className={`text-sm ${scoreLabelClass}`}>{scoreLabel}</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className={`${scoreSize} font-black text-yellow-500`}>{best}{bestSuffix}</p>
            <p className="text-sm text-yellow-400">שיא</p>
          </div>
        </div>
        <button
          onClick={onRestart}
          className={`w-full ${buttonSizeClass} rounded-2xl ${buttonClass} text-white font-black shadow-lg hover:opacity-90 active:scale-95 transition-[transform,opacity]`}
        >
          🔄 שוב!
        </button>
      </div>
    </div>
  );
}
