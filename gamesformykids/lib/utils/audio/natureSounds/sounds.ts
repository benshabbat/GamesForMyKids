import { createWhiteNoiseBuffer, wait } from "./helpers";

// ─── קולות בעלי חיים וטבע ───────────────────────────────────────────────────

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

/** 🌧️ גשם — רעש לבן עם פילטר גבוה */
function playRain(ctx: AudioContext): Promise<void> {
  const dur = 1.8;
  const noise = ctx.createBufferSource();
  noise.buffer = createWhiteNoiseBuffer(ctx, dur);

  const hipass = ctx.createBiquadFilter();
  hipass.type = 'highpass';
  hipass.frequency.value = 1200;

  const gain = ctx.createGain();
  const start = ctx.currentTime;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(0.18, start + 0.2);
  gain.gain.setValueAtTime(0.18, start + dur - 0.3);
  gain.gain.linearRampToValueAtTime(0, start + dur);

  noise.connect(hipass);
  hipass.connect(gain);
  gain.connect(ctx.destination);

  noise.start(start);
  noise.stop(start + dur);

  return wait(dur * 1000 + 100);
}

/** 💨 רוח — רעש מסונן עם מודולציה איטית */
function playWind(ctx: AudioContext): Promise<void> {
  const dur = 2.0;
  const noise = ctx.createBufferSource();
  noise.buffer = createWhiteNoiseBuffer(ctx, dur);

  const lopass = ctx.createBiquadFilter();
  lopass.type = 'lowpass';
  lopass.frequency.value = 500;

  const gain = ctx.createGain();
  const start = ctx.currentTime;

  // גל סינוסי איטי ל-"נשיבה"
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.8;
  lfoGain.gain.value = 0.06;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);

  gain.gain.setValueAtTime(0.08, start);
  gain.gain.linearRampToValueAtTime(0.18, start + 0.5);
  gain.gain.setValueAtTime(0.18, start + dur - 0.5);
  gain.gain.linearRampToValueAtTime(0, start + dur);

  noise.connect(lopass);
  lopass.connect(gain);
  gain.connect(ctx.destination);

  lfo.start(start);
  lfo.stop(start + dur);
  noise.start(start);
  noise.stop(start + dur);

  return wait(dur * 1000 + 100);
}

/** 🌊 גלי ים — רעש עם LFO איטי מאוד */
function playOceanWaves(ctx: AudioContext): Promise<void> {
  const dur = 2.5;
  const noise = ctx.createBufferSource();
  noise.buffer = createWhiteNoiseBuffer(ctx, dur);

  const lopass = ctx.createBiquadFilter();
  lopass.type = 'lowpass';
  lopass.frequency.value = 350;

  const envGain = ctx.createGain();
  const start = ctx.currentTime;
  // גל אחד גדול — עלייה וירידה
  envGain.gain.setValueAtTime(0, start);
  envGain.gain.linearRampToValueAtTime(0.22, start + 1.0);
  envGain.gain.linearRampToValueAtTime(0.02, start + dur);

  noise.connect(lopass);
  lopass.connect(envGain);
  envGain.connect(ctx.destination);

  noise.start(start);
  noise.stop(start + dur);

  return wait(dur * 1000 + 100);
}

/** ⛈️ רעם — פצצת רעש בתדר נמוך */
function playThunder(ctx: AudioContext): Promise<void> {
  const dur = 2.0;
  const noise = ctx.createBufferSource();
  noise.buffer = createWhiteNoiseBuffer(ctx, dur);

  const lopass = ctx.createBiquadFilter();
  lopass.type = 'lowpass';
  lopass.frequency.value = 90;
  lopass.Q.value = 2;

  const gain = ctx.createGain();
  const start = ctx.currentTime;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(0.45, start + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

  noise.connect(lopass);
  lopass.connect(gain);
  gain.connect(ctx.destination);

  noise.start(start);
  noise.stop(start + dur);

  return wait(dur * 1000 + 100);
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

/** 💦 מפל — רעש רחב טווח, יציב */
function playWaterfall(ctx: AudioContext): Promise<void> {
  const dur = 2.0;
  const noise = ctx.createBufferSource();
  noise.buffer = createWhiteNoiseBuffer(ctx, dur);

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 900;
  bandpass.Q.value = 0.5;

  const gain = ctx.createGain();
  const start = ctx.currentTime;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(0.2, start + 0.15);
  gain.gain.setValueAtTime(0.2, start + dur - 0.2);
  gain.gain.linearRampToValueAtTime(0, start + dur);

  noise.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);

  noise.start(start);
  noise.stop(start + dur);

  return wait(dur * 1000 + 100);
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

// ─── מפה ציבורית ─────────────────────────────────────────────────────────────

/** מפה מ-name של פריט → פונקציית סינתזה */
export const SYNTH_MAP: Record<string, (ctx: AudioContext) => Promise<void>> = {
  'bird-song':    playBirdSong,
  'rain':         playRain,
  'wind':         playWind,
  'ocean-waves':  playOceanWaves,
  'thunder':      playThunder,
  'cricket':      playCricket,
  'frog':         playFrog,
  'waterfall':    playWaterfall,
  'owl':          playOwl,
  'bee':          playBee,
};
