/**
 * Audio utilities — WebAudio API sound helpers
 */
import { AUDIO_CONSTANTS } from '../../constants/core';
import { MEMORY_GAME_CONSTANTS } from '../../constants';

/**
 * פונקציה ליצירת צליל הצלחה - אקורד דו מז'ור
 */
export function playSuccessSound(audioContext: AudioContext | null): void {
  if (!audioContext) return;

  const notes = AUDIO_CONSTANTS.SUCCESS_CHORD;

  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const startTime = audioContext.currentTime + index * 0.1;

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.3);
  });
}

/**
 * פונקציה גנרית ליצירת צליל מותאם אישית
 */
export function playCustomSound(
  audioContext: AudioContext | null,
  frequencies: number[],
  type: OscillatorType = 'sine',
  gainValue: number = 0.3,
  durationMs: number = 150,
): void {
  if (!audioContext) return;

  frequencies.forEach((freq, i) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    const t = audioContext.currentTime + i * 0.2;
    osc.frequency.setValueAtTime(freq, t);
    osc.type = type;

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(gainValue, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, t + durationMs / 1000);

    osc.start(t);
    osc.stop(t + durationMs / 1000);
  });
}

/**
 * פונקציה להשמעת צליל של חיה
 */
export function playAnimalSound(
  audioContext: AudioContext | null,
  emoji: string,
  frequencies: Record<string, number[]>,
): void {
  const animalFreqs = frequencies[emoji] || frequencies['default'];
  playCustomSound(audioContext, animalFreqs);
}

/**
 * פונקציה להשמעת צליל הצלחה במשחק הזיכרון
 */
export function playMemorySuccessSound(
  audioContext: AudioContext | null,
  frequencies: number[] = MEMORY_GAME_CONSTANTS.SUCCESS_SOUND_FREQUENCIES,
): void {
  playCustomSound(audioContext, frequencies, 'triangle', 0.2, 80);
}
