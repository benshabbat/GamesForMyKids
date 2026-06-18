'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import type { SongData } from '../data/songs';

interface Options {
  song: SongData;
  onFinish: () => void;
}

export function useLyricsPlayer({ song, onFinish }: Options) {
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
  }, [cancel, song]);

  useEffect(() => {
    advance(0);
    return cancel;
  }, [advance, cancel]);

  const handleReplay = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    advance(lineIdx);
  }, [advance, lineIdx]);

  const handleNext = useCallback(() => {
    cancel();
    if (lineIdx + 1 >= song.lines.length) {
      onFinishRef.current();
    } else {
      advance(lineIdx + 1);
    }
  }, [cancel, advance, lineIdx, song.lines.length]);

  return { lineIdx, wordIdx, playing, cancel, handleReplay, handleNext };
}
