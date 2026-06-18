'use client';
import { useSpinner } from './useSpinner';
import SpinnerWheel from './components/SpinnerWheel';
import SpinnerEditor from './components/SpinnerEditor';
import type { SegmentPreset } from './spinnerStore';

export default function SpinnerClient() {
  const {
    segments,
    rotation,
    isSpinning,
    result,
    isEditing,
    spin,
    shareWhatsApp,
    toggleEditing,
    addSegment,
    removeSegment,
    editSegment,
    applyPreset,
  } = useSpinner();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-6 px-4 gap-6"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      dir="rtl"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">🎡 גלגל מזל</h1>
        <p className="text-purple-200 mt-1 text-sm">סובב את הגלגל וגלה את תוצאתך!</p>
      </div>

      {/* Wheel */}
      <div className="flex flex-col items-center gap-4">
        <SpinnerWheel segments={segments} rotation={rotation} size={320} />

        {/* Spin button */}
        <button
          onClick={spin}
          disabled={isSpinning || segments.length < 2}
          className={`
            px-10 py-4 rounded-2xl text-2xl font-extrabold shadow-2xl transition-all duration-200
            ${isSpinning
              ? 'bg-gray-400 text-white cursor-not-allowed scale-95'
              : 'bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-gray-900 hover:shadow-yellow-300/50'}
          `}
        >
          {isSpinning ? '🌀 מסתובב...' : '🎯 סובב!'}
        </button>
      </div>

      {/* Result */}
      {result && !isSpinning && (
        <div className="bg-white rounded-3xl shadow-2xl px-8 py-5 flex flex-col items-center gap-3 animate-bounce-in">
          <p className="text-gray-500 text-sm">הגלגל הראה:</p>
          <p className="text-5xl font-extrabold text-purple-700">{result}</p>
          <button
            onClick={shareWhatsApp}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
          >
            <span>📲</span>
            <span>שתף בוואטסאפ</span>
          </button>
        </div>
      )}

      {/* Edit toggle */}
      <button
        onClick={toggleEditing}
        className="text-purple-200 hover:text-white text-sm underline underline-offset-2 transition-colors"
      >
        {isEditing ? '✕ סגור עריכה' : '✏️ ערוך קטעים'}
      </button>

      {/* Editor panel */}
      {isEditing && (
        <SpinnerEditor
          segments={segments}
          onAdd={addSegment}
          onRemove={removeSegment}
          onEdit={editSegment}
          onPreset={(p: SegmentPreset) => applyPreset(p)}
        />
      )}
    </div>
  );
}
