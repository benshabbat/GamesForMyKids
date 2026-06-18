'use client';
import type { StoryTemplate, Blank } from '@/lib/quiz/data/storyBuilderData';

interface Props {
  story: StoryTemplate;
  currentBlank: Blank;
  currentBlankIdx: number;
  filledWords: string[];
  onSelect: (word: string) => void;
}

const TYPE_COLORS: Record<string, string> = {
  'פועל':    'bg-blue-100 text-blue-800 border-blue-300',
  'שם עצם': 'bg-green-100 text-green-800 border-green-300',
  'תואר':   'bg-purple-100 text-purple-800 border-purple-300',
  'מספר':   'bg-orange-100 text-orange-800 border-orange-300',
};

export default function StoryBuilderQuestion({ story, currentBlank, currentBlankIdx, filledWords, onSelect }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 flex flex-col items-center gap-5">
        {/* Story title */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">{story.emoji}</span>
          <h2 className="text-xl font-black text-gray-800" dir="rtl">{story.title}</h2>
        </div>

        {/* Story preview with blanks */}
        <div className="bg-amber-50 rounded-2xl p-4 w-full text-base leading-loose text-right" dir="rtl">
          {story.segments.map((seg, i) => (
            <span key={i}>
              <span>{seg}</span>
              {i < story.blanks.length && (
                <span
                  className={`inline-block px-2 py-0.5 mx-0.5 rounded-lg border font-bold text-sm ${
                    i < currentBlankIdx
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : i === currentBlankIdx
                        ? 'bg-yellow-200 text-yellow-800 border-yellow-400 animate-pulse'
                        : 'bg-gray-100 text-gray-400 border-gray-200'
                  }`}
                >
                  {i < currentBlankIdx ? filledWords[i] : i === currentBlankIdx ? `[${story.blanks[i]?.type}]` : '___'}
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Current blank label */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">תן לי</span>
          <span className={`px-3 py-1 rounded-full border font-bold text-sm ${TYPE_COLORS[currentBlank.type] ?? 'bg-gray-100 text-gray-700'}`}>
            {currentBlank.type}
          </span>
        </div>

        {/* Progress */}
        <div className="flex gap-1">
          {story.blanks.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-colors ${
                i < currentBlankIdx ? 'bg-green-400' : i === currentBlankIdx ? 'bg-yellow-400' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Word choices */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {currentBlank.options.map((word) => (
            <button
              key={word}
              onClick={() => onSelect(word)}
              className="py-3 px-4 bg-indigo-100 hover:bg-indigo-200 active:scale-95 text-indigo-900 font-bold rounded-2xl transition-transform text-lg"
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
