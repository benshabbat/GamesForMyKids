'use client';
import { useSlowSpeech } from '@/hooks/shared/audio/useSlowSpeech';

export default function SlowSpeechButton() {
  const { slowMode, toggle } = useSlowSpeech();
  return (
    <button
      onClick={toggle}
      title={slowMode ? 'חזור למהירות רגילה' : 'דיבור איטי לילדים צעירים'}
      aria-label={slowMode ? 'מהירות רגילה' : 'דיבור איטי'}
      aria-pressed={slowMode}
      className={`
        px-3 py-2 rounded-xl font-bold text-base shadow transition-all
        ${slowMode
          ? 'bg-amber-400 text-amber-900 ring-2 ring-amber-500 scale-110'
          : 'bg-white/80 text-gray-600 hover:bg-amber-50 hover:text-amber-700'}
      `}
    >
      🐢
    </button>
  );
}
