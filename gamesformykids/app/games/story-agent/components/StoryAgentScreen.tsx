'use client';
import { useEffect, useRef } from 'react';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';
import type { StoryResponse } from '@/app/api/story-agent/route';
import type { StoryAgentPhase } from '../useStoryAgent';

interface Props {
  phase: StoryAgentPhase;
  current: StoryResponse | null;
  pointsAwarded: number | null;
  error: string | null;
  imageUrl: string | null;
  imageLoading: boolean;
  onChoice: (choice: string) => void;
  onRetry: () => void;
  onMenu: () => void;
}

export default function StoryAgentScreen({
  phase,
  current,
  pointsAwarded,
  error,
  imageUrl,
  imageLoading,
  onChoice,
  onRetry,
  onMenu,
}: Props) {
  const spokenRef = useRef<string>('');

  useEffect(() => {
    if (current && current.storyText !== spokenRef.current) {
      spokenRef.current = current.storyText;
      speakHebrew(current.storyText);
    }
  }, [current]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fdf4ff 100%)' }}
      dir="rtl"
    >
      <div className="bg-gradient-to-l from-indigo-500 to-purple-500 text-white px-4 py-3 flex items-center gap-3 shadow-md">
        <button
          onClick={onMenu}
          className="text-white/80 hover:text-white text-sm font-semibold px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
        >
          ← תפריט
        </button>
        <span className="text-2xl">🪄</span>
        <h2 className="font-bold text-lg flex-1">סיפור קסום</h2>
        {current && (
          <button
            onClick={() => speakHebrew(current.storyText)}
            className="text-white/80 hover:text-white text-xl"
            aria-label="קרא שוב"
          >
            🔊
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl max-w-sm w-full p-6 flex flex-col items-center gap-5">
          {phase === 'loading' && (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="text-6xl animate-bounce">📖</div>
              <p className="text-gray-500 font-medium">חושב על ההמשך...</p>
            </div>
          )}

          {phase === 'error' && (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="text-5xl">😕</div>
              <p className="text-red-500 font-medium text-center">{error ?? 'משהו השתבש'}</p>
              <button
                onClick={onRetry}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-2xl transition-colors"
              >
                🔄 נסה שוב
              </button>
            </div>
          )}

          {(phase === 'story' || phase === 'ending') && current && (
            <>
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- data: URI, next/image can't optimize it
                <img
                  src={imageUrl}
                  alt=""
                  className="w-full aspect-square rounded-2xl object-cover bg-indigo-50"
                />
              ) : imageLoading ? (
                <div className="w-full aspect-square rounded-2xl bg-indigo-50 flex items-center justify-center animate-pulse">
                  <span className="text-5xl">🎨</span>
                </div>
              ) : (
                <div className="text-7xl">{phase === 'ending' ? '🎉' : '📜'}</div>
              )}
              <p className="text-xl text-gray-700 text-center leading-relaxed font-medium">
                {current.storyText}
              </p>

              {phase === 'ending' ? (
                <div className="flex flex-col items-center gap-4 w-full mt-2">
                  <p className="text-purple-600 font-bold text-lg">🎉 סוף הסיפור!</p>
                  {pointsAwarded !== null && (
                    <p className="text-amber-600 font-bold">⭐ צברת {pointsAwarded} נקודות!</p>
                  )}
                  <button
                    onClick={onMenu}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-2xl transition-colors"
                  >
                    🏠 סיפור חדש
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 w-full mt-2">
                  {current.choices.map((choice, i) => (
                    <button
                      key={i}
                      onClick={() => onChoice(choice)}
                      className="w-full bg-gradient-to-l from-indigo-500 to-purple-500 text-white font-bold py-4 px-5 rounded-2xl text-lg text-right flex items-center gap-3 shadow hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                      <span className="flex-1">{choice}</span>
                      <span className="opacity-70">←</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
