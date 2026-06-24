'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const LS_KEY = 'gfk_music_enabled';

// C-major pentatonic: C4, E4, G4, A4 — gentle looping arpeggio
const NOTES = [261.63, 329.63, 392.0, 440.0];
const NOTE_DURATION = 0.45; // seconds per note
const NOTE_GAP      = 0.05; // seconds between notes

/**
 * Schedules a looping arpeggio using Web Audio API oscillators.
 * Returns a stop function.
 */
function startAmbientLoop(ctx: AudioContext): () => void {
  let stopped = false;
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.06, ctx.currentTime); // quiet
  masterGain.connect(ctx.destination);

  let noteIndex = 0;
  let nextTime  = ctx.currentTime + 0.1;

  function scheduleNote() {
    if (stopped) return;
    const freq     = NOTES[noteIndex % NOTES.length]!;
    const osc      = ctx.createOscillator();
    const env      = ctx.createGain();
    osc.type       = 'sine';
    osc.frequency.setValueAtTime(freq, nextTime);
    env.gain.setValueAtTime(0, nextTime);
    env.gain.linearRampToValueAtTime(1, nextTime + 0.04);
    env.gain.setValueAtTime(1, nextTime + NOTE_DURATION - 0.06);
    env.gain.linearRampToValueAtTime(0, nextTime + NOTE_DURATION);
    osc.connect(env);
    env.connect(masterGain);
    osc.start(nextTime);
    osc.stop(nextTime + NOTE_DURATION);
    noteIndex++;
    nextTime += NOTE_DURATION + NOTE_GAP;

    // Schedule next note ~100ms before it plays (lookahead scheduling)
    const delay = Math.max(0, (nextTime - ctx.currentTime - 0.1) * 1000);
    setTimeout(scheduleNote, delay);
  }

  scheduleNote();

  return () => {
    stopped = true;
    masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    setTimeout(() => masterGain.disconnect(), 400);
  };
}

export function useAmbientMusic() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(LS_KEY) === 'true';
  });

  const ctxRef    = useRef<AudioContext | null>(null);
  const stopRef   = useRef<(() => void) | null>(null);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const stopMusic = useCallback(() => {
    if (stopRef.current) { stopRef.current(); stopRef.current = null; }
  }, []);

  const startMusic = useCallback(() => {
    if (stopRef.current) return; // already running
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new AudioContext();
    }
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    stopRef.current = startAmbientLoop(ctx);
  }, []);

  // Start/stop based on enabled flag
  useEffect(() => {
    if (enabled) {
      startMusic();
    } else {
      stopMusic();
    }
  }, [enabled, startMusic, stopMusic]);

  // Stop on unmount (page navigation)
  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, [stopMusic]);

  const toggle = useCallback(() => {
    setEnabled((v) => {
      const next = !v;
      localStorage.setItem(LS_KEY, String(next));
      return next;
    });
  }, []);

  return { enabled, toggle };
}
