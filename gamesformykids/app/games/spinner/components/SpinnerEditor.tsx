'use client';
import { useState } from 'react';
import { PRESET_LABELS, type SegmentPreset } from '../spinnerStore';

interface Props {
  segments: string[];
  onAdd: (text: string) => void;
  onRemove: (index: number) => void;
  onEdit: (index: number, text: string) => void;
  onPreset: (preset: SegmentPreset) => void;
}

export default function SpinnerEditor({ segments, onAdd, onRemove, onEdit, onPreset }: Props) {
  const [newText, setNewText] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  function handleAdd() {
    const trimmed = newText.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setNewText('');
  }

  function startEdit(i: number) {
    setEditingIndex(i);
    setEditingText(segments[i] ?? '');
  }

  function commitEdit(i: number) {
    if (editingText.trim()) onEdit(i, editingText.trim());
    setEditingIndex(null);
  }

  const presets = Object.keys(PRESET_LABELS) as SegmentPreset[];

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm" dir="rtl">
      <h3 className="font-bold text-gray-700 mb-3 text-center">✏️ ערוך קטעים</h3>

      {/* Preset buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => onPreset(p)}
            className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium transition-colors"
          >
            {PRESET_LABELS[p]}
          </button>
        ))}
      </div>

      {/* Segment list */}
      <div className="max-h-48 overflow-y-auto space-y-1 mb-3">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            {editingIndex === i ? (
              <>
                <input
                  autoFocus
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => commitEdit(i)}
                  onKeyDown={(e) => e.key === 'Enter' && commitEdit(i)}
                  className="flex-1 border border-indigo-300 rounded px-2 py-1 text-sm text-right"
                  dir="rtl"
                />
                <button onClick={() => commitEdit(i)} className="text-green-600 text-lg leading-none">✓</button>
              </>
            ) : (
              <>
                <span
                  className="flex-1 text-sm text-gray-700 cursor-pointer hover:text-indigo-600 text-right"
                  onClick={() => startEdit(i)}
                >
                  {seg}
                </span>
                <button onClick={() => startEdit(i)} className="text-gray-400 hover:text-indigo-500 text-sm">✏️</button>
                {segments.length > 2 && (
                  <button onClick={() => onRemove(i)} className="text-gray-400 hover:text-red-500 text-sm">🗑️</button>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add new segment */}
      <div className="flex gap-2">
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="הוסף קטע..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-right focus:outline-none focus:border-indigo-400"
          dir="rtl"
        />
        <button
          onClick={handleAdd}
          disabled={!newText.trim()}
          className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-indigo-600 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
