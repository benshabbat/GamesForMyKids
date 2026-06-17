'use client';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';
import type { DictionaryItem } from '../pictureDictionaryStore';
import { usePictureDictionaryStore } from '../pictureDictionaryStore';

interface Props {
  item: DictionaryItem;
}

export default function DictionaryCard({ item }: Props) {
  const { closeExpanded, toggleCollection, collection } = usePictureDictionaryStore();
  const isSaved = collection.some((c) => c.hebrew === item.hebrew);

  const handleSpeak = () => {
    speakHebrew(item.hebrew);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={closeExpanded}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 flex flex-col items-center gap-4 relative"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeExpanded}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          aria-label="סגור"
        >
          ✕
        </button>

        {/* Emoji */}
        <div
          className={`w-32 h-32 rounded-2xl flex items-center justify-center text-7xl ${item.color ?? 'bg-gradient-to-br from-blue-400 to-purple-500'}`}
        >
          {item.emoji}
        </div>

        {/* Hebrew name */}
        <h2 className="text-4xl font-bold text-gray-800 text-center">{item.hebrew}</h2>

        {/* English name */}
        <p className="text-xl text-gray-500 text-center" dir="ltr">{item.english}</p>

        {/* Category label */}
        <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
          {item.categoryLabel}
        </span>

        {/* Action buttons */}
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={handleSpeak}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-2xl text-lg transition-colors flex items-center justify-center gap-2"
          >
            🔊 הקשב
          </button>
          <button
            onClick={() => toggleCollection(item)}
            className={`flex-1 font-bold py-3 rounded-2xl text-lg transition-colors flex items-center justify-center gap-2 ${
              isSaved
                ? 'bg-yellow-400 hover:bg-yellow-500 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isSaved ? '⭐ נשמר' : '💾 שמור'}
          </button>
        </div>
      </div>
    </div>
  );
}
