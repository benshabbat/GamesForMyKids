import { createWhiteNoiseBuffer, wait } from "../helpers";

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

export const WEATHER_SYNTH_MAP: Record<string, (ctx: AudioContext) => Promise<void>> = {
  'rain':        playRain,
  'wind':        playWind,
  'ocean-waves': playOceanWaves,
  'thunder':     playThunder,
  'waterfall':   playWaterfall,
};
