'use client';
import { Wand2 } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { MAX_DOTS, MIN_DOTS } from '../editorConstants';

interface Props {
  dotCount: number;
  isDetecting: boolean;
  pointCount: number;
  closed: boolean;
  imageDataUrl: string;
  id: string;
  onAutoDetect: () => void;
  onDotCountChange: (count: number) => void;
  onUndo: () => void;
  onClear: () => void;
  onClosedChange: (closed: boolean) => void;
}

export default function EditorControls({
  dotCount,
  isDetecting,
  pointCount,
  closed,
  imageDataUrl,
  id,
  onAutoDetect,
  onDotCountChange,
  onUndo,
  onClear,
  onClosedChange,
}: Props) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onAutoDetect}
          disabled={isDetecting}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white disabled:opacity-50 transition-all"
        >
          <Wand2 className="w-4 h-4" />
          {isDetecting ? 'מזהה...' : 'זיהוי קווי מתאר אוטומטי'}
        </button>
        <label className="flex items-center gap-2 text-sm text-indigo-200 px-2">
          כמות נקודות: {dotCount}
          <input
            type="range"
            min={MIN_DOTS}
            max={MAX_DOTS}
            value={dotCount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onDotCountChange(Number(e.target.value))}
            className="w-32"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onUndo}
          disabled={pointCount === 0}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 text-indigo-200 hover:bg-white/20 disabled:opacity-40 transition-all"
        >
          ↩️ בטל נקודה אחרונה
        </button>
        <button
          onClick={onClear}
          disabled={pointCount === 0}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 text-indigo-200 hover:bg-white/20 disabled:opacity-40 transition-all"
        >
          🗑️ נקה הכל
        </button>
        <label className="flex items-center gap-2 text-sm text-indigo-200 px-2">
          <input type="checkbox" checked={closed} onChange={(e) => onClosedChange(e.target.checked)} />
          צורה סגורה
        </label>
        <span className="text-sm text-indigo-300">{pointCount} נקודות</span>
        <a
          href={imageDataUrl}
          download={`${id || 'picture'}.png`}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 text-indigo-200 hover:bg-white/20 transition-all"
        >
          💾 הורד תמונה (לשמירה ב-public/images/dot-to-dot/)
        </a>
      </div>
    </>
  );
}
