'use client';
import { useEffect, useRef } from 'react';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';
import type { Story, StoryNode } from '@/lib/constants/stories/stories';

interface Props {
  story: Story;
  node: StoryNode;
  phase: 'story' | 'ending';
  onChoice: (nextId: string) => void;
  onReadAgain: () => void;
  onMenu: () => void;
}

export default function StoryPage({ story, node, phase, onChoice, onReadAgain, onMenu }: Props) {
  const spokenRef = useRef<string>('');

  useEffect(() => {
    // Auto-speak when node changes (avoid double-speak on re-render)
    if (node.id !== spokenRef.current) {
      spokenRef.current = node.id;
      speakHebrew(node.text);
    }
  }, [node.id, node.text]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fdf4ff 100%)' }}
      dir="rtl"
    >
      {/* Top bar */}
      <div className={`bg-gradient-to-l ${story.color} text-white px-4 py-3 flex items-center gap-3 shadow-md`}>
        <button
          onClick={onMenu}
          className="text-white/80 hover:text-white text-sm font-semibold px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
        >
          ← תפריט
        </button>
        <span className="text-2xl">{story.emoji}</span>
        <h2 className="font-bold text-lg flex-1">{story.title}</h2>
        <button
          onClick={() => speakHebrew(node.text)}
          className="text-white/80 hover:text-white text-xl"
          aria-label="קרא שוב"
        >
          🔊
        </button>
      </div>

      {/* Story card */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl max-w-sm w-full p-6 flex flex-col items-center gap-5">
          {/* Emoji illustration */}
          <div className="text-8xl">{node.emoji}</div>

          {/* Text */}
          <p className="text-xl text-gray-700 text-center leading-relaxed font-medium">
            {node.text}
          </p>

          {/* Ending or choices */}
          {phase === 'ending' ? (
            <div className="flex flex-col items-center gap-4 w-full mt-2">
              {node.endingEmoji && (
                <div className="text-5xl animate-bounce">{node.endingEmoji}</div>
              )}
              <p className="text-purple-600 font-bold text-lg">🎉 סוף הסיפור!</p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={onReadAgain}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-2xl transition-colors"
                >
                  📖 קרא שוב
                </button>
                <button
                  onClick={onMenu}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-2xl transition-colors"
                >
                  🏠 תפריט
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full mt-2">
              {node.choices?.map((choice) => (
                <button
                  key={choice.nextId}
                  onClick={() => onChoice(choice.nextId)}
                  className={`w-full bg-gradient-to-l ${story.color} text-white font-bold py-4 px-5 rounded-2xl text-lg text-right flex items-center gap-3 shadow hover:scale-[1.02] active:scale-[0.98] transition-transform`}
                >
                  <span className="text-3xl">{choice.emoji}</span>
                  <span className="flex-1">{choice.label}</span>
                  <span className="opacity-70">←</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
