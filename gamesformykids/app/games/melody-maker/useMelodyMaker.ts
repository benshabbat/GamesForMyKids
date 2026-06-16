'use client';
import { useCallback, useRef } from 'react';
import { useMelodyMakerStore } from './melodyMakerStore';
import { MELODY_MAKER_SONGS } from '@/lib/constants/melodyMakerSongs';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

export const NOTE_FREQUENCIES: number[] = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
export const NOTE_NAMES_HE: string[] = ['דּוֹ', 'רֵה', 'מִי', 'פָּה', 'סוֹל', 'לָה', 'סִי', 'דּוֹ'];
export const NOTE_COLORS: string[] = [
  'bg-red-500 hover:bg-red-400 active:bg-red-600',
  'bg-orange-500 hover:bg-orange-400 active:bg-orange-600',
  'bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600',
  'bg-green-500 hover:bg-green-400 active:bg-green-600',
  'bg-teal-500 hover:bg-teal-400 active:bg-teal-600',
  'bg-blue-500 hover:bg-blue-400 active:bg-blue-600',
  'bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600',
  'bg-pink-500 hover:bg-pink-400 active:bg-pink-600',
];

function playOscillator(ctx: AudioContext, freq: number, startTime: number, duration: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0.5, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.01);
}

export function useMelodyMaker() {
  const store = useMelodyMakerStore();
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }
    return ctx;
  }, []);

  const tapKey = useCallback((noteIndex: number) => {
    const ctx = getCtx();
    const freq = NOTE_FREQUENCIES[noteIndex] ?? 261.63;
    playOscillator(ctx, freq, ctx.currentTime, 0.5);
    speakHebrew(NOTE_NAMES_HE[noteIndex] ?? '');

    const { isRecording, addToRecording, mode, selectedSong, songProgress, advanceSong, setSongComplete } =
      useMelodyMakerStore.getState();

    if (isRecording) {
      addToRecording(noteIndex);
    }

    if (mode === 'learning' && selectedSong !== null) {
      const song = MELODY_MAKER_SONGS[selectedSong];
      if (!song) return;
      const expected = song.notes[songProgress];
      if (noteIndex === expected) {
        const next = songProgress + 1;
        if (next >= song.notes.length) {
          setSongComplete(true);
        } else {
          advanceSong();
        }
      }
    }
  }, [getCtx]);

  const playbackRecording = useCallback(() => {
    const { recording, isPlayingBack, setPlayingBack } = useMelodyMakerStore.getState();
    if (recording.length === 0 || isPlayingBack) return;
    setPlayingBack(true);
    const ctx = getCtx();
    const now = ctx.currentTime;
    recording.forEach((noteIndex, i) => {
      const freq = NOTE_FREQUENCIES[noteIndex] ?? 261.63;
      playOscillator(ctx, freq, now + i * 0.6, 0.5);
    });
    setTimeout(() => setPlayingBack(false), recording.length * 600 + 200);
  }, [getCtx]);

  const previewSong = useCallback((songIndex: number) => {
    const song = MELODY_MAKER_SONGS[songIndex];
    if (!song) return;
    const { setFlashingKey } = useMelodyMakerStore.getState();
    const ctx = getCtx();
    const now = ctx.currentTime;
    song.notes.forEach((noteIndex, i) => {
      const freq = NOTE_FREQUENCIES[noteIndex] ?? 261.63;
      playOscillator(ctx, freq, now + i * 0.65, 0.5);
      setTimeout(() => setFlashingKey(noteIndex), i * 650);
    });
    setTimeout(() => setFlashingKey(null), song.notes.length * 650 + 200);
  }, [getCtx]);

  return { ...store, tapKey, playbackRecording, previewSong };
}
