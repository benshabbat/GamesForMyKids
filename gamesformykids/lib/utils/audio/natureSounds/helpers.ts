/** יוצר מאגר רעש לבן */
export function createWhiteNoiseBuffer(ctx: AudioContext, durationSec: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const frameCount = Math.ceil(sampleRate * durationSec);
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

/** ממתין לפי מילישניות */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
