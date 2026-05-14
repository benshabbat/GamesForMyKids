import { ANIMAL_SYNTH_MAP } from './soundsData/animals';
import { WEATHER_SYNTH_MAP } from './soundsData/weather';

export const SYNTH_MAP: Record<string, (ctx: AudioContext) => Promise<void>> = {
  ...ANIMAL_SYNTH_MAP,
  ...WEATHER_SYNTH_MAP,
};
