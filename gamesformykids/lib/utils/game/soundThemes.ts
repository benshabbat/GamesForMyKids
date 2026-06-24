/**
 * Synthesized sound theme packs using Web Audio API.
 * No audio files — all sounds are generated in real-time.
 */

import type { SoundTheme } from '@/lib/stores/soundThemeStore';

function osc(
  ctx: AudioContext,
  freq: number,
  type: OscillatorType,
  gain: number,
  startAt: number,
  duration: number,
  freqEnd?: number,
) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.connect(g);
  g.connect(ctx.destination);
  o.type = type;
  o.frequency.setValueAtTime(freq, startAt);
  if (freqEnd !== undefined) {
    o.frequency.linearRampToValueAtTime(freqEnd, startAt + duration);
  }
  g.gain.setValueAtTime(0, startAt);
  g.gain.linearRampToValueAtTime(gain, startAt + 0.03);
  g.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
  o.start(startAt);
  o.stop(startAt + duration + 0.01);
}

// ── Default: C-major chord (existing behaviour) ────────────────────────────
function defaultSuccess(ctx: AudioContext) {
  const notes = [261.63, 329.63, 392.0]; // C4 E4 G4
  notes.forEach((freq, i) => osc(ctx, freq, 'sine', 0.1, ctx.currentTime + i * 0.1, 0.3));
}

function defaultWrong(ctx: AudioContext) {
  osc(ctx, 180, 'sawtooth', 0.08, ctx.currentTime, 0.25, 120);
}

function defaultLevelUp(ctx: AudioContext) {
  [261.63, 329.63, 392.0, 523.25].forEach(
    (freq, i) => osc(ctx, freq, 'sine', 0.12, ctx.currentTime + i * 0.12, 0.35),
  );
}

// ── Farm: Cowbell-like ding + muted thud ──────────────────────────────────
function farmSuccess(ctx: AudioContext) {
  const t = ctx.currentTime;
  osc(ctx, 587, 'triangle', 0.12, t, 0.4);       // cowbell high
  osc(ctx, 440, 'triangle', 0.08, t + 0.05, 0.35); // cowbell low
  osc(ctx, 220, 'sine',     0.06, t + 0.1,  0.5);  // warm resonance
}

function farmWrong(ctx: AudioContext) {
  osc(ctx, 110, 'square', 0.06, ctx.currentTime, 0.3, 90); // low oink-ish thud
}

function farmLevelUp(ctx: AudioContext) {
  const t = ctx.currentTime;
  [392, 523, 659, 784].forEach(
    (freq, i) => osc(ctx, freq, 'triangle', 0.1, t + i * 0.1, 0.4),
  );
}

// ── Space: Laser sweep ─────────────────────────────────────────────────────
function spaceSuccess(ctx: AudioContext) {
  const t = ctx.currentTime;
  osc(ctx, 300, 'sawtooth', 0.07, t,       0.25, 900); // laser up
  osc(ctx, 600, 'sine',     0.06, t + 0.2, 0.3,  600); // sparkle
}

function spaceWrong(ctx: AudioContext) {
  osc(ctx, 800, 'sawtooth', 0.07, ctx.currentTime, 0.25, 200); // laser down
}

function spaceLevelUp(ctx: AudioContext) {
  const t = ctx.currentTime;
  osc(ctx, 200, 'sawtooth', 0.08, t,       0.6, 1200);
  osc(ctx, 400, 'sine',     0.06, t + 0.15, 0.5, 800);
  osc(ctx, 800, 'sine',     0.04, t + 0.3,  0.4, 1600);
}

// ── Jungle: Bird chirp ─────────────────────────────────────────────────────
function jungleSuccess(ctx: AudioContext) {
  const t = ctx.currentTime;
  osc(ctx, 1200, 'sine', 0.08, t,       0.12, 1800); // chirp up
  osc(ctx, 1000, 'sine', 0.07, t + 0.15, 0.12, 1400); // second chirp
  osc(ctx, 800,  'sine', 0.06, t + 0.3,  0.15, 1000); // echo
}

function jungleWrong(ctx: AudioContext) {
  osc(ctx, 600, 'sine', 0.07, ctx.currentTime, 0.2, 300); // descending hoot
}

function jungleLevelUp(ctx: AudioContext) {
  const t = ctx.currentTime;
  [1200, 1400, 1600, 2000].forEach(
    (freq, i) => osc(ctx, freq, 'sine', 0.07, t + i * 0.1, 0.2, freq * 1.3),
  );
}

// ── Dispatch table ─────────────────────────────────────────────────────────
type SoundFn = (ctx: AudioContext) => void;

const THEMES: Record<SoundTheme, { success: SoundFn; wrong: SoundFn; levelUp: SoundFn }> = {
  default: { success: defaultSuccess, wrong: defaultWrong, levelUp: defaultLevelUp },
  farm:    { success: farmSuccess,    wrong: farmWrong,    levelUp: farmLevelUp },
  space:   { success: spaceSuccess,   wrong: spaceWrong,   levelUp: spaceLevelUp },
  jungle:  { success: jungleSuccess,  wrong: jungleWrong,  levelUp: jungleLevelUp },
};

export type SoundType = 'success' | 'wrong' | 'levelUp';

export function playThemedSound(
  ctx: AudioContext | null,
  type: SoundType,
  theme: SoundTheme,
): void {
  if (!ctx) return;
  try {
    THEMES[theme][type](ctx);
  } catch {
    // Ignore AudioContext errors (e.g. closed context)
  }
}
