'use client';
import { useEffect } from 'react';
import { speak } from '@/lib/utils/speech/enhancedSpeechUtils';
import { resolveText, type Character, type Setting, type StoryTemplate } from '../data/storyTemplates';

interface Props {
  template: StoryTemplate;
  panelIndex: number;
  char1: Character;
  char2: Character;
  setting: Setting;
  onNext: () => void;
}

export default function PuppetStage({ template, panelIndex, char1, char2, setting, onNext }: Props) {
  const rawText = template.panels[panelIndex] ?? '';
  const text = resolveText(rawText, char1, char2, setting);
  const emoji = template.panelEmojis[panelIndex] ?? '🎭';
  const isLast = panelIndex === template.panels.length - 1;

  useEffect(() => {
    const clean = text.replace(/\p{Emoji}/gu, '').trim();
    if (clean) speak(clean);
  }, [panelIndex, text]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      {/* Stage backdrop */}
      <div
        className="w-full rounded-3xl flex flex-col items-center justify-between p-5 shadow-xl"
        style={{ background: 'linear-gradient(160deg, #f3e8ff 0%, #ddd6fe 100%)', minHeight: 260 }}
      >
        {/* Curtains decoration */}
        <div className="flex justify-between w-full text-3xl opacity-40 select-none">
          <span>🎭</span><span>🎭</span>
        </div>

        {/* Panel visual */}
        <div className="text-6xl my-2">{emoji}</div>

        {/* Characters */}
        <div className="flex justify-center gap-6 text-5xl mb-2">
          <span>{char1.emoji}</span>
          <span>{setting.emoji}</span>
          <span>{char2.emoji}</span>
        </div>

        {/* Panel counter */}
        <p className="text-xs text-purple-400">{panelIndex + 1} / {template.panels.length}</p>
      </div>

      {/* Story text */}
      <div
        className="bg-white rounded-2xl px-5 py-4 shadow w-full text-center"
        dir="rtl"
      >
        <p className="text-lg font-semibold text-gray-800 leading-relaxed">{text}</p>
      </div>

      {/* Button */}
      <button
        onClick={onNext}
        className="bg-purple-500 hover:bg-purple-600 active:scale-95 text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg transition"
      >
        {isLast ? '🎬 לשאלות הבנה' : 'הבא ▶'}
      </button>
    </div>
  );
}
