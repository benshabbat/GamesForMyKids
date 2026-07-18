import type { DotPoint, DotToDotTheme } from '../types';

export function buildPictureCode(opts: {
  id: string;
  title: string;
  emoji: string;
  theme: DotToDotTheme;
  closed: boolean;
  points: DotPoint[];
}): string {
  const { id, title, emoji, theme, closed, points } = opts;
  const pointsStr = points.map((p) => `{ x: ${p.x}, y: ${p.y} }`).join(', ');
  return `{
    id: '${id || 'my-picture'}',
    title: '${title}',
    emoji: '${emoji}',
    theme: '${theme}',
    viewBox: '0 0 300 300',
    closed: ${closed},
    imageSrc: '/images/dot-to-dot/${id || 'my-picture'}.png',
    points: [${pointsStr}],
  },`;
}
