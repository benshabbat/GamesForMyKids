import type { CardColor, CardValue } from './takiTypes';

export function getColorName(color: CardColor): string {
  const names: Record<CardColor, string> = {
    red: 'אדום', green: 'ירוק', blue: 'כחול', yellow: 'צהוב', wild: 'כל-צבע',
  };
  return names[color];
}

export function getValueLabel(value: CardValue): string {
  if (typeof value === 'number') return String(value);
  const labels: Record<string, string> = {
    taki: 'טאקי', stop: 'עצור', plus: '+2',
    colorChange: 'שנה צבע', superTaki: 'סופר טאקי', king: 'מלך',
  };
  return labels[value] ?? String(value);
}

export function getValueEmoji(value: CardValue): string {
  if (typeof value === 'number') return String(value);
  const emojis: Record<string, string> = {
    taki: '🃏', stop: '✋', plus: '+2', colorChange: '🌈', superTaki: '⭐', king: '👑',
  };
  return emojis[value] ?? '?';
}

export const COLOR_BG: Record<CardColor, string> = {
  red:    'bg-red-500',
  green:  'bg-green-500',
  blue:   'bg-blue-500',
  yellow: 'bg-yellow-400',
  wild:   'bg-gradient-to-br from-purple-500 to-pink-500',
};

export const COLOR_BORDER: Record<CardColor, string> = {
  red:    'border-red-300',
  green:  'border-green-300',
  blue:   'border-blue-300',
  yellow: 'border-yellow-200',
  wild:   'border-purple-300',
};

export const COLOR_TEXT: Record<CardColor, string> = {
  red:    'text-white',
  green:  'text-white',
  blue:   'text-white',
  yellow: 'text-gray-900',
  wild:   'text-white',
};
