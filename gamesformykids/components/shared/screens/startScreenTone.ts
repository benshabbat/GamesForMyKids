import { isLightBackground } from '@/lib/utils/backgroundTone';

/** Text/chip classes for content drawn directly on a start screen's background. */
export interface StartScreenTone {
  header: string;
  subHeader: string;
  heading: string;
  body: string;
  muted: string;
  /** Translucent toggle chips (study mode, speed mode, print). */
  chip: string;
}

const ON_LIGHT: StartScreenTone = {
  header: 'text-purple-800',
  subHeader: 'text-purple-700',
  heading: 'text-gray-800',
  body: 'text-gray-700',
  muted: 'text-gray-700',
  chip: 'bg-white/70 border-gray-400/60 text-gray-800 hover:bg-white/90',
};

const ON_DARK: StartScreenTone = {
  header: 'text-white',
  subHeader: 'text-white/90',
  heading: 'text-white',
  body: 'text-white/90',
  muted: 'text-white/80',
  chip: 'bg-white/20 border-white/50 text-white hover:bg-white/30',
};

/**
 * Game configs pair their gradients with hand-picked text colors, and many of those
 * pairs are unreadable (white on pastel, purple on navy). Deriving the text color from
 * the background itself keeps every start screen legible regardless of the config.
 */
export function getStartScreenTone(background: string | undefined): StartScreenTone {
  return isLightBackground(background) ? ON_LIGHT : ON_DARK;
}
