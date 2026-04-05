'use client';

type HoleState = 'empty' | 'mole' | 'bad' | 'hit' | 'miss';

interface Props {
  holes: HoleState[];
  holeValues: string[];
  onWhack: (index: number) => void;
}

export default function WhackGrid({ holes, holeValues, onWhack }: Props) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 max-w-sm w-full">
        {holes.map((state, i) => (
          <button
            key={i}
            onClick={() => onWhack(i)}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-lg active:scale-90 transition-transform"
            style={{ background: state === 'hit' ? '#FDE68A' : state === 'miss' ? '#FCA5A5' : '#92400e' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[55%] bg-black/60 rounded-full absolute bottom-0" />
            </div>
            {(state === 'mole' || state === 'bad') && (
              <div className="absolute inset-0 flex items-end justify-center pb-1 animate-[slideUp_0.15s_ease-out]">
                <span className="text-5xl">{holeValues[i]}</span>
              </div>
            )}
            {state === 'hit' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl animate-bounce">⭐</span>
              </div>
            )}
            {state === 'miss' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">💥</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(60%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
