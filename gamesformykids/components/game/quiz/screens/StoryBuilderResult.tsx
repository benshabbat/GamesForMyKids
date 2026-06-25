'use client';
import type { StoryTemplate } from '@/lib/quiz/data/storyBuilderData';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

interface Props {
  story: StoryTemplate;
  completedStory: string;
  onRestart: () => void;
}

export default function StoryBuilderResult({ story, completedStory, onRestart }: Props) {
  const handleRead = () => {
    speakHebrew(completedStory);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 flex flex-col items-center gap-5 text-center">
        <div className="text-5xl">🎉</div>
        <h2 className="text-2xl font-black text-gray-800" dir="rtl">
          {story.emoji} {story.title}
        </h2>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-5 w-full text-lg leading-relaxed font-medium text-gray-800 text-start" dir="rtl">
          {completedStory}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handleRead}
            className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-white font-black text-lg rounded-2xl transition-colors"
          >
            🔊 קרא את הסיפור!
          </button>
          <button
            onClick={onRestart}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-2xl transition-colors"
          >
            📖 סיפור חדש!
          </button>
        </div>
      </div>
    </div>
  );
}
