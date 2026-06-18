'use client';
import type { SongData } from '../data/songs';
import { useLyricsPlayer } from '../hooks/useLyricsPlayer';

interface Props {
  song: SongData;
  onFinish: () => void;
  onBack: () => void;
}

export default function LyricsDisplay({ song, onFinish, onBack }: Props) {
  const { lineIdx, wordIdx, playing, cancel, handleReplay, handleNext } = useLyricsPlayer({ song, onFinish });

  const handleBack = () => {
    cancel();
    onBack();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 flex flex-col items-center p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center mb-6 mt-2">
          <button onClick={handleBack} className="text-purple-500 hover:text-purple-700 text-2xl me-3">→</button>
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
