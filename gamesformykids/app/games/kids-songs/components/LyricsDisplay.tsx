'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import type { SongData } from '../data/songs';

interface Props {
  song: SongData;
  onFinish: () => void;
  onBack: () => void;
}

export default function LyricsDisplay({ song, onFinish, onBack }: Props) {
  const [lineIdx, setLineIdx] = useState(0);
  const [wordIdx, setWordIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const advance = useCallback((idx: number) => {
    cancel();
    if (idx >= song.lines.length) {
      onFinishRef.current();
      return;
    }
    setLineIdx(idx);
    setWordIdx(-1);
    setPlaying(true);

    const line = song.lines[idx] ?? '';
    const words = line.split(' ');

    // Precompute char offsets for word-boundary highlighting
    const wordStarts: number[] = [];
    let pos = 0;
    for (const word of words) {
      wordStarts.push(pos);
      pos += word.length + 1;
    }

    const utter = new SpeechSynthesisUtterance(line);
    utter.lang = 'he-IL';
    utter.rate = 0.85;

    utter.onboundary = (e: SpeechSynthesisEvent) => {
      if (e.name !== 'word') return;
      let found = 0;
      for (let i = wordStarts.length - 1; i >= 0; i--) {
        if ((wordStarts[i] ?? 0) <= e.charIndex) { found = i; break; }
      }
      setWordIdx(found);
    };

    utter.onend = () => {
      setWordIdx(-1);
      setPlaying(false);
      timerRef.current = setTimeout(() => advance(idx + 1), 1000);
    };

    utter.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utter);
  }, [song, cancel]);

  useEffect(() => {
    advance(0);
    return cancel;
  }, [advance, cancel]);

  const handleReplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    advance(lineIdx);
  };

  const handleNext = () => {
    cancel();
    if (lineIdx + 1 >= song.lines.length) {
      onFinishRef.current();
    } else {
      advance(lineIdx + 1);
    }
  };

  const handleBack = () => {
    cancel();
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center mb-6 mt-2">
          <button onClick={handleBack} className="text-purple-500 hover:text-purple-700 text-2xl ml-3">→</button>
          <div className="text-4xl mx-3">{song.emoji}</div>
          <h2 className="text-2xl font-bold text-purple-800">{song.title}</h2>
        </div>

        {/* Lyrics card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6" dir="rtl">
          {song.lines.map((line, li) => {
            const isCurrent = li === lineIdx;
            const words = line.split(' ');
            return (
              <div
                key={li}
                className={`text-center py-3 px-4 rounded-xl mb-2 transition duration-300 ${
                  isCurrent
                    ? 'bg-purple-100 scale-105'
                    : li < lineIdx
                    ? 'opacity-40'
                    : 'opacity-25'
                }`}
              >
                {isCurrent ? (
                  <span className={`text-xl font-bold text-purple-900 ${playing ? '' : ''}`}>
                    {words.map((word, wi) => (
                      <span
                        key={wi}
                        className={`inline-block mx-1 transition duration-150 rounded px-1 ${
                          wi === wordIdx
                            ? 'bg-yellow-300 text-yellow-900 scale-110'
                            : 'text-purple-900'
                        }`}
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="text-base text-gray-600">{line}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {song.lines.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                i < lineIdx ? 'bg-purple-500' : i === lineIdx ? 'bg-yellow-400 scale-125' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleReplay}
            className="bg-white border-2 border-purple-400 text-purple-700 px-5 py-2 rounded-xl font-medium hover:bg-purple-50 transition-colors"
          >
            🔄 שוב
          </button>
          <button
            onClick={handleNext}
            className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-purple-700 shadow transition-colors"
          >
            {lineIdx + 1 >= song.lines.length ? '✅ לשאלות' : 'הבא ←'}
          </button>
        </div>
      </div>
    </div>
  );
}
