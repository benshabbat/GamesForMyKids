'use client';
import { MELODY_MAKER_SONGS } from '@/lib/constants/melodyMakerSongs';
import { NOTE_NAMES_HE } from '../useMelodyMaker';

interface Props {
  selectedSong: number | null;
  songProgress: number;
  songComplete: boolean;
  onSelectSong: (index: number) => void;
  onPreview: (index: number) => void;
  onResetSong: () => void;
  onBackToSongList: () => void;
  onExitLearning: () => void;
}

export default function SongGuide({
  selectedSong,
  songProgress,
  songComplete,
  onSelectSong,
  onPreview,
  onResetSong,
  onBackToSongList,
  onExitLearning,
}: Props) {
  if (selectedSong === null) {
    return (
      <div className="flex flex-col items-center gap-3 w-full" dir="rtl">
        <p className="text-purple-700 font-bold text-lg">🎼 בחר שיר ללמידה</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {MELODY_MAKER_SONGS.map((song, i) => (
            <button
              key={song.id}
              onClick={() => onSelectSong(i)}
              className="flex flex-col items-center gap-1 bg-white border-2 border-purple-300 rounded-xl px-4 py-3 hover:bg-purple-50 hover:border-purple-500 transition-all shadow"
            >
              <span className="text-3xl">{song.emoji}</span>
              <span className="font-bold text-purple-800 text-sm">{song.title}</span>
              <span className="text-purple-400 text-xs">{song.notes.length} תווים</span>
            </button>
          ))}
        </div>
        <button
          onClick={onExitLearning}
          className="text-sm text-gray-500 underline mt-1 hover:text-gray-700"
        >
          ← חזור לנגינה חופשית
        </button>
      </div>
    );
  }

  const song = MELODY_MAKER_SONGS[selectedSong];
  if (!song) return null;

  const nextNote = song.notes[songProgress];

  return (
    <div className="flex flex-col items-center gap-3 w-full" dir="rtl">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{song.emoji}</span>
        <span className="font-bold text-purple-800 text-lg">{song.title}</span>
        <button
          onClick={() => onPreview(selectedSong)}
          className="text-xs bg-purple-100 text-purple-700 rounded-full px-3 py-1 hover:bg-purple-200"
        >
          🔊 האזן
        </button>
      </div>

      {songComplete ? (
        <div className="flex flex-col items-center gap-2 bg-green-50 border-2 border-green-400 rounded-xl px-6 py-3">
          <span className="text-3xl">🎉</span>
          <p className="font-bold text-green-700">כל הכבוד! ניגנת את השיר!</p>
          <div className="flex gap-2 mt-1">
            <button
              onClick={onResetSong}
              className="bg-green-500 text-white rounded-lg px-4 py-2 text-sm hover:bg-green-600"
            >
              🔄 שוב
            </button>
            <button
              onClick={onBackToSongList}
              className="bg-purple-500 text-white rounded-lg px-4 py-2 text-sm hover:bg-purple-600"
            >
              🎵 שיר אחר
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-1 flex-wrap justify-center">
            {song.notes.map((noteIdx, i) => (
              <span
                key={i}
                className={[
                  'text-xs font-bold px-2 py-1 rounded-full',
                  i < songProgress ? 'bg-green-400 text-white' :
                  i === songProgress ? 'bg-purple-500 text-white ring-2 ring-purple-300 scale-110' :
                  'bg-gray-200 text-gray-500',
                ].join(' ')}
              >
                {NOTE_NAMES_HE[noteIdx] ?? ''}
              </span>
            ))}
          </div>
          {nextNote !== undefined && (
            <p className="text-purple-700 font-bold text-sm">
              לחץ על: <span className="text-purple-900 text-lg">{NOTE_NAMES_HE[nextNote] ?? ''}</span>
            </p>
          )}
        </>
      )}
      <button
        onClick={onBackToSongList}
        className="text-xs text-gray-400 underline hover:text-gray-600 mt-1"
      >
        ← שנה שיר
      </button>
    </div>
  );
}
