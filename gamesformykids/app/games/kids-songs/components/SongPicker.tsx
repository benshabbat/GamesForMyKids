'use client';
import { SONGS, type SongData } from '../data/songs';

interface Props {
  onSelect: (song: SongData) => void;
}

export default function SongPicker({ onSelect }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-2 mt-6">🎵 שירי ילדים</h1>
      <p className="text-purple-600 mb-8 text-center">בחר שיר, האזן ולמד!</p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {SONGS.map((song) => (
          <button
            key={song.id}
            onClick={() => onSelect(song)}
            className={`bg-gradient-to-br ${song.color} text-white rounded-2xl p-5 shadow-lg hover:scale-105 active:scale-95 transition-transform text-center`}
          >
            <div className="text-4xl mb-2">{song.emoji}</div>
            <div className="text-lg font-bold">{song.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
