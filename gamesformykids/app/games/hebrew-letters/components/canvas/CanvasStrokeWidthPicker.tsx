'use client';

interface CanvasStrokeWidthPickerProps {
  widths: readonly number[];
  currentWidth: number;
  onChange: (width: number) => void;
}

export default function CanvasStrokeWidthPicker({
  widths,
  currentWidth,
  onChange,
}: CanvasStrokeWidthPickerProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center bg-gray-50 p-3 rounded-lg">
      <span className="text-sm font-medium text-gray-700">עובי המכחול:</span>
      {widths.map((strokeWidth) => (
        <button
          key={strokeWidth}
          onClick={() => onChange(strokeWidth)}
          className={`flex items-center justify-center w-14 h-10 rounded-lg border-2 transition-all duration-200 ${
            currentWidth === strokeWidth
              ? 'border-green-500 bg-green-50 shadow-md'
              : 'border-gray-300 hover:border-gray-400 bg-white'
          }`}
          title={`עובי ${strokeWidth} פיקסלים`}
        >
          <div
            className="rounded-full bg-gray-600"
            style={{
              width: `${Math.min(strokeWidth / 2, 10)}px`,
              height: `${Math.min(strokeWidth / 2, 10)}px`,
            }}
          />
        </button>
      ))}
    </div>
  );
}
