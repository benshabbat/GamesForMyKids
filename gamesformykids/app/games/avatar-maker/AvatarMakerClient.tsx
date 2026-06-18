'use client';
import { useState } from 'react';
import { useAvatarMaker } from './useAvatarMaker';
import AvatarPreview from './components/AvatarPreview';
import AvatarOptionGrid from './components/AvatarOptionGrid';
import { AVATAR_AREAS, AREA_LABELS, type AvatarArea } from '@/lib/constants/avatarParts';

export default function AvatarMakerClient() {
  const { selections, previewRef, handleSelect, exportPNG, shareWhatsApp, reset } = useAvatarMaker();
  const [activeArea, setActiveArea] = useState<AvatarArea>('face');

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center p-4 pb-8"
      style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #e8f5e9 50%, #e3f2fd 100%)' }}
    >
      {/* Header */}
      <div className="text-center mb-4 mt-2">
        <div className="text-5xl mb-1">🧑‍🎨</div>
        <h1 className="text-2xl font-extrabold text-purple-800">יוצר הדמות שלי</h1>
        <p className="text-purple-600 text-sm">בנה דמות מגניבה!</p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        {/* Character Preview */}
        <div className="flex justify-center">
          <AvatarPreview selections={selections} previewRef={previewRef} />
        </div>

        {/* Tab Picker */}
        <div className="flex rounded-2xl overflow-hidden shadow bg-white border border-gray-100">
          {AVATAR_AREAS.map(area => (
            <button
              key={area}
              onClick={() => setActiveArea(area)}
              className={`flex-1 py-2 text-xs font-bold transition-colors ${
                activeArea === area
                  ? 'bg-amber-400 text-white'
                  : 'text-gray-600 hover:bg-amber-50'
              }`}
            >
              {AREA_LABELS[area]}
            </button>
          ))}
        </div>

        {/* Option Grid */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <AvatarOptionGrid
            area={activeArea}
            selectedId={selections[activeArea]}
            onSelect={handleSelect}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={exportPNG}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 rounded-2xl text-sm shadow-md hover:opacity-90 active:scale-95 transition-all"
          >
            📥 שמור כתמונה
          </button>
          <button
            onClick={shareWhatsApp}
            className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 rounded-2xl text-sm shadow-md hover:opacity-90 active:scale-95 transition-all"
          >
            📲 שתף בוואטסאפ
          </button>
        </div>
        <button
          onClick={reset}
          className="w-full bg-white border-2 border-gray-200 text-gray-500 font-bold py-2 rounded-2xl text-sm hover:border-red-200 hover:text-red-400 active:scale-95 transition-all"
        >
          🔄 התחל מחדש
        </button>
      </div>
    </div>
  );
}
