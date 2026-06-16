'use client';
import type { Scene } from './sceneData';

type Props = {
  scene: Scene;
  targetIds: Set<string>;
  foundIds: Set<string>;
  wrongId: string | null;
  onTap: (id: string) => void;
};

export default function SceneCanvas({ scene, targetIds, foundIds, wrongId, onTap }: Props) {
  return (
    <div className={`relative w-full aspect-[16/9] rounded-3xl bg-gradient-to-br ${scene.bg} border-4 border-white/60 shadow-2xl overflow-hidden`}>
      {scene.objects.map(obj => {
        const isTarget = targetIds.has(obj.id);
        const isFound = foundIds.has(obj.id);
        const isWrong = wrongId === obj.id;

        return (
          <button
            key={obj.id}
            onClick={() => onTap(obj.id)}
            disabled={isFound}
            style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 transition-all duration-200 select-none ${
              isFound
                ? 'opacity-40 cursor-default scale-90'
                : isWrong
                ? 'animate-[shake_0.4s_ease-in-out]'
                : isTarget
                ? 'hover:scale-125 active:scale-110 cursor-pointer drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                : 'hover:scale-115 active:scale-110 cursor-pointer'
            }`}
          >
            <span className="text-3xl sm:text-4xl leading-none drop-shadow-md">
              {obj.emoji}
            </span>
            {isFound && <span className="text-base leading-none">✅</span>}
            <span
              className="text-[10px] sm:text-xs font-bold bg-white/80 rounded-full px-1.5 leading-tight text-gray-700 whitespace-nowrap"
              dir="rtl"
            >
              {obj.label}
            </span>
          </button>
        );
      })}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          25% { transform: translate(calc(-50% + 6px), -50%) rotate(-6deg); }
          75% { transform: translate(calc(-50% - 6px), -50%) rotate(6deg); }
        }
      `}</style>
    </div>
  );
}
