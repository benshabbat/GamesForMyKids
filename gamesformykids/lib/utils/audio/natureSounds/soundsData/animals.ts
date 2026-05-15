import { wait } from "../helpers";

/** 🐦 ציוץ ציפור — סדרת צ'ירפים מהירים */
function playBirdSong(ctx: AudioContext): Promise<void> {
  const chirps = [
    { f1: 900, f2: 1400, t: 0.0 },
    { f1: 1000, f2: 1500, t: 0.18 },
    { f1: 850, f2: 1300, t: 0.36 },
    { f1: 950, f2: 1450, t: 0.54 },
  ];
  const chirpDur = 0.12;

  for (const { f1, f2, t } of chirps) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const start = ctx.currentTime + t;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f1, start);
    osc.frequency.exponentialRampToValueAtTime(f2, start + chirpDur * 0.5);
    osc.frequency.exponentialRampToValueAtTime(f1, start + chirpDur);

    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.25, start + 0.01);
    gain.gain.linearRampToValueAtTime(0, start + chirpDur);

    osc.start(start);
    osc.stop(start + chirpDur + 0.01);
  }

  return wait(750);
}

/** 🦗 צרצר — פולסים גבוהים מהירים */
function playCricket(ctx: AudioContext): Promise<void> {
  const pulseCount = 20;
  const pulseDur = 0.02;
  const pulseGap = 0.025;
  const totalDur = pulseCount * (pulseDur + pulseGap);

  for (let i = 0; i < pulseCount; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const t = ctx.currentTime + i * (pulseDur + pulseGap);
    osc.type = 'square';
    osc.frequency.value = 4800 + (i % 3) * 200;

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.003);
    gain.gain.linearRampToValueAtTime(0, t + pulseDur);

    osc.start(t);
    osc.stop(t + pulseDur + 0.005);
  }

  return wait(totalDur * 1000 + 200);
}

/** 🐸 צפרדע — "קוואק קוואק" תקופתי */
function playFrog(ctx: AudioContext): Promise<void> {
  const ribbitPattern = [
    { freq: 220, glide: 320, dur: 0.12, t: 0.0 },
    { freq: 280, glide: 200, dur: 0.12, t: 0.18 },
    { freq: 220, glide: 320, dur: 0.12, t: 0.5 },
    { freq: 280, glide: 200, dur: 0.12, t: 0.68 },
  ];

  for (const { freq, glide, dur, t } of ribbitPattern) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const start = ctx.currentTime + t;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, start);
    osc.frequency.linearRampToValueAtTime(glide, start + dur * 0.4);
    osc.frequency.linearRampToValueAtTime(freq * 0.8, start + dur);

    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.2, start + 0.01);
    gain.gain.linearRampToValueAtTime(0, start + dur);

    osc.start(start);
    osc.stop(start + dur + 0.01);
  }

  return wait(900);
}

/** 🦉 ינשוף — "הו הו" עמוק עם הפסקה */
function playOwl(ctx: AudioContext): Promise<void> {
  const hoots = [
    { freq: 380, dur: 0.35, t: 0.0 },
    { freq: 340, dur: 0.35, t: 0.5 },
  ];

  for (const { freq, dur, t } of hoots) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const start = ctx.currentTime + t;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, start);
    osc.frequency.linearRampToValueAtTime(freq * 0.85, start + dur);

    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.25, start + 0.04);
    gain.gain.setValueAtTime(0.25, start + dur - 0.08);
    gain.gain.linearRampToValueAtTime(0, start + dur);

    osc.start(start);
    osc.stop(start + dur + 0.01);
  }

  return wait(1000);
}

/** 🐝 דבורה — צלצול בתדר בינוני */
function playBee(ctx: AudioContext): Promise<void> {
  const dur = 1.5;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // מודולציית משרעת לאפקט "זמזום"
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 50;
  lfo.type = 'square';
  lfoGain.gain.value = 0.08;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);

  osc.type = 'sawtooth';
  osc.frequency.value = 280;

  const start = ctx.currentTime;
  gain.gain.setValueAtTime(0.1, start);
  gain.gain.linearRampToValueAtTime(0.16, start + 0.3);
  gain.gain.setValueAtTime(0.16, start + dur - 0.3);
  gain.gain.linearRampToValueAtTime(0, start + dur);

  osc.connect(gain);
  gain.connect(ctx.destination);

  lfo.start(start);
  lfo.stop(start + dur);
  osc.start(start);
  osc.stop(start + dur);

  return wait(dur * 1000 + 100);
}

export const ANIMAL_SYNTH_MAP: Record<string, (ctx: AudioContext) => Promise<void>> = {
  'bird-song': playBirdSong,
  'cricket':   playCricket,
  'frog':      playFrog,
  'owl':       playOwl,
  'bee':       playBee,
};
