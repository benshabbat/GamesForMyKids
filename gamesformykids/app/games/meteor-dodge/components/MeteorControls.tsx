'use client';

interface Props {
  onNudgeLeft: () => void;
  onNudgeRight: () => void;
}

export default function MeteorControls({ onNudgeLeft, onNudgeRight }: Props) {
  return (
    <div className="mt-3 flex gap-4">
      <button
        onPointerDown={onNudgeLeft}
        className="bg-violet-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-violet-500 touch-none"
      >
        ◀
      </button>
      <button
        onPointerDown={onNudgeRight}
        className="bg-violet-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-violet-500 touch-none"
      >
        ▶
      </button>
    </div>
  );
}
