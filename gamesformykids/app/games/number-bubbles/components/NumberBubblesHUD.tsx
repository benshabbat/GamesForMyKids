'use client';

interface Props {
  popped: number;
  total: number;
  level: number;
  elapsed: number;
  next: number;
}

export default function NumberBubblesHUD({ popped, total, level, elapsed, next }: Props) {
  return (
    <>
      <div className="flex gap-5 mb-2 text-center">
        <div>
          <p className="text-2xl font-black text-blue-600">{popped}/{total}</p>
          <p className="text-xs text-blue-400">פוצצו</p>
        </div>
        <div>
          <p className="text-2xl font-black text-sky-600">רמה {level}</p>
        </div>
        <div>
          <p className="text-2xl font-black text-teal-600">{elapsed}s</p>
          <p className="text-xs text-teal-400">זמן</p>
        </div>
      </div>
      <p className="font-bold text-indigo-600 mb-2 text-lg">הבא: <span className="text-3xl">{next}</span></p>
    </>
  );
}
