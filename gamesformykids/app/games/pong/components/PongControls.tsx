'use client';

interface Props {
  onNudgeLeft: () => void;
  onNudgeRight: () => void;
}

export default function PongControls({ onNudgeLeft, onNudgeRight }: Props) {
  return (
    <div className="mt-3 flex gap-4">
      <button
        onPointerDown={onNudgeLeft}
        className="bg-slate-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-slate-500 touch-none"
      >
        ◄
      </button>
      <button
        onPointerDown={onNudgeRight}
        className="bg-slate-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-slate-500 touch-none"
      >
        ►
      </button>
    </div>
  );
}
