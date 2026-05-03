'use client';

interface ScrambleLetter {
  idx: number;
  ch: string;
  picked: boolean;
}

interface PickedLetter {
  ch: string;
}

interface WordEntry {
  emoji: string;
  hint: string;
  word: string;
}

interface Props {
  words: WordEntry[];
  wIdx: number;
  letters: ScrambleLetter[];
  picked: (PickedLetter | undefined)[];
  score: number;
  lives: number;
  shake: boolean;
  correct: boolean;
  onPickLetter: (idx: number) => void;
  onUnpick: (i: number) => void;
}

export default function WordScramblePlayScreen({
  words, wIdx, letters, picked, score, lives, shake, correct, onPickLetter, onUnpick,
}: Props) {
  const entry = words[wIdx];
  if (!entry) return null;
  const target = entry.word;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="flex items-center gap-6 mb-4 text-center">
        <div><p className="text-2xl font-black text-green-600">{score}</p><p className="text-xs text-green-400">ניקוד</p></div>
        <div><p className="text-lg font-bold text-gray-500">{wIdx + 1}/{words.length}</p></div>
        <div className="flex gap-1">{Array.from({ length: 3 }).map((_, i) => <span key={i}>{i < lives ? '❤️' : '🖤'}</span>)}</div>
      </div>
      <div className={`bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full text-center transition-all duration-200 ${shake ? 'animate-shake' : ''}`}>
        <div className="text-7xl mb-2">{entry.emoji}</div>
        <p className="text-gray-400 text-sm mb-4">{entry.hint}</p>
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {Array.from({ length: target.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => picked[i] && onUnpick(i)}
              className={`w-12 h-12 rounded-xl border-2 text-xl font-black transition-all
                ${picked[i]
                  ? correct
                    ? 'border-green-400 bg-green-100 text-green-700'
                    : 'border-blue-400 bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200'
                  : 'border-gray-200 bg-gray-50 text-transparent'}`}
            >
              {picked[i]?.ch || '_'}
            </button>
          ))}
        </div>
        {correct && <p className="text-green-600 font-black text-lg mb-2 animate-bounce">✅ יפה מאוד! +20</p>}
        <div className="flex justify-center gap-2 flex-wrap">
          {letters.map(l => (
            <button
              key={l.idx}
              onClick={() => onPickLetter(l.idx)}
              disabled={l.picked}
              className={`w-12 h-12 rounded-xl text-xl font-black transition-all
                ${l.picked
                  ? 'bg-gray-100 text-gray-300 border-2 border-gray-200 cursor-default'
                  : 'bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-md active:scale-90 hover:scale-110 border-2 border-green-600'}`}
            >
              {l.picked ? '' : l.ch}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
