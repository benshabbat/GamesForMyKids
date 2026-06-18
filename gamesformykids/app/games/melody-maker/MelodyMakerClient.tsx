'use client';
import { MELODY_MAKER_SONGS } from '@/lib/constants/melodyMakerSongs';
import { useMelodyMaker, NOTE_NAMES_HE } from './useMelodyMaker';
import XylophoneKeys from './components/XylophoneKeys';
import SongGuide from './components/SongGuide';

export default function MelodyMakerClient() {
  const {
    mode, recording, isRecording, isPlayingBack,
    selectedSong, songProgress, songComplete, flashingKey,
    setMode, startRecording, stopRecording,
    selectSong, clearSelectedSong, resetSong,
    tapKey, playbackRecording, previewSong,
  } = useMelodyMaker();

  const songNotes = selectedSong !== null ? (MELODY_MAKER_SONGS[selectedSong]?.notes ?? null) : null;
  const highlightKey =
    mode === 'learning' && songNotes !== null && !songComplete
      ? (songNotes[songProgress] ?? null)
      : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-pink-50 to-yellow-100 flex flex-col items-center py-6 px-4 gap-6" dir="rtl">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-purple-800">🎼 יוצר מנגינות</h1>
        <p className="text-purple-500 text-sm mt-1">נגן, הקלט ולמד שירים עבריים!</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setMode('free')}
          className={[
            'px-4 py-2 rounded-full font-bold text-sm transition',
            mode === 'free'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-purple-600 border-2 border-purple-300 hover:bg-purple-50',
          ].join(' ')}
        >
          🎵 נגינה חופשית
        </button>
        <button
          onClick={() => setMode('learning')}
          className={[
            'px-4 py-2 rounded-full font-bold text-sm transition',
            mode === 'learning'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-purple-600 border-2 border-purple-300 hover:bg-purple-50',
          ].join(' ')}
        >
          📖 לומד שיר
        </button>
      </div>

      <div className="w-full max-w-lg bg-white bg-opacity-70 rounded-2xl p-4 shadow-lg">
        <XylophoneKeys
          onTap={tapKey}
          flashingKey={flashingKey}
          highlightKey={highlightKey}
        />
      </div>

      {mode === 'free' ? (
        <div className="flex flex-col items-center gap-3 w-full max-w-lg">
          <div className="flex gap-3">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-red-500 text-white rounded-xl px-5 py-3 font-bold hover:bg-red-600 shadow flex items-center gap-2"
              >
                🔴 הקלט
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-gray-700 text-white rounded-xl px-5 py-3 font-bold hover:bg-gray-800 shadow flex items-center gap-2 animate-pulse"
              >
                ⏹ עצור
              </button>
            )}
            <button
              onClick={playbackRecording}
              disabled={recording.length === 0 || isPlayingBack}
              className="bg-green-500 text-white rounded-xl px-5 py-3 font-bold hover:bg-green-600 shadow disabled:opacity-40 flex items-center gap-2"
            >
              ▶️ נגן
            </button>
          </div>

          {isRecording && (
            <p className="text-red-500 font-bold text-sm animate-pulse">● מקליט...</p>
          )}

          {recording.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center bg-white bg-opacity-80 rounded-xl p-3 w-full">
              {recording.map((noteIdx, i) => (
                <span key={i} className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">
                  {NOTE_NAMES_HE[noteIdx] ?? ''}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white bg-opacity-70 rounded-2xl p-4 shadow-lg">
          <SongGuide
            selectedSong={selectedSong}
            songProgress={songProgress}
            songComplete={songComplete}
            onSelectSong={selectSong}
            onPreview={previewSong}
            onResetSong={resetSong}
            onBackToSongList={clearSelectedSong}
            onExitLearning={() => setMode('free')}
          />
        </div>
      )}
    </div>
  );
}
