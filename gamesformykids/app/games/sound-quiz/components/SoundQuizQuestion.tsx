'use client';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import type { SoundClip } from '../data/soundClips';
import type { SoundRound } from '../useSoundQuizGame';

interface Props {
  current: SoundRound;
  choicesRevealed: boolean;
  onPlaySound: () => void;
  onReplaySound: () => void;
  onSelect: (clip: SoundClip) => void;
}

export default function SoundQuizQuestion({ current, choicesRevealed, onPlaySound, onReplaySound, onSelect }: Props) {
  const index = useQuizGameStore((s) => s.index);
  const total = useQuizGameStore((s) => s.total);
  const score = useQuizGameStore((s) => s.score);
  const selected = useQuizGameStore((s) => s.selected);
  const isCorrect = useQuizGameStore((s) => s.isCorrect);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-6 p-4" dir="rtl"
      style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)' }}>
      {/* HUD */}
      <div className="flex items-center justify-between w-full max-w-sm mb-4">
        <span className="text-sm font-bold text-teal-700 bg-white rounded-xl px-3 py-1 shadow">
          שאלה {index + 1} / {total}
        </span>
        <span className="text-sm font-bold text-teal-700 bg-white rounded-xl px-3 py-1 shadow">
          ✅ {score}
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-sm flex flex-col items-center gap-4">
        {/* Mystery card */}
        <div className="text-7xl">{choicesRevealed ? current.clip.emoji : '❓'}</div>
        <p className="text-gray-500 text-sm">{choicesRevealed ? 'בחר את מקור הצליל:' : 'לחץ כדי לשמוע את הצליל'}</p>

        {/* Sound button */}
        {!choicesRevealed ? (
          <button
            onClick={onPlaySound}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-extrabold py-5 rounded-2xl text-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
          >
            ▶ שמע!
          </button>
        ) : (
          <button
            onClick={onReplaySound}
            className="text-teal-600 text-sm font-bold border border-teal-200 rounded-xl px-4 py-1.5 hover:bg-teal-50 active:scale-95 transition-all"
          >
            🔄 שמע שוב
          </button>
        )}

        {/* Choices grid */}
        {choicesRevealed && (
          <div className="grid grid-cols-2 gap-3 w-full">
            {current.choices.map((clip) => {
              let cls = 'flex flex-col items-center gap-1 p-3 rounded-2xl border-2 font-bold text-gray-700 transition-all active:scale-95 ';
              if (selected !== null) {
                if (clip.id === current.clip.id) cls += 'border-green-400 bg-green-50 text-green-800';
                else cls += 'border-gray-200 bg-gray-50 opacity-60';
              } else {
                cls += 'border-gray-200 hover:border-teal-300 hover:bg-teal-50 bg-white';
              }
              return (
                <button
                  key={clip.id}
                  onClick={() => selected === null && onSelect(clip)}
                  disabled={selected !== null}
                  className={cls}
                >
                  <span className="text-4xl">{clip.emoji}</span>
                  <span className="text-sm">{clip.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Feedback */}
        {selected !== null && (
          <div className={`text-lg font-extrabold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
            {isCorrect ? '✅ נכון!' : `❌ הצליל היה: ${current.clip.name}`}
          </div>
        )}
      </div>
    </div>
  );
}
