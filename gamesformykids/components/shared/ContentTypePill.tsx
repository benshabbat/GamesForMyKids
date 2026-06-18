import type { ContentType } from '@/lib/types/games/base';

const PILL_CONFIG: Record<ContentType, { label: string; emoji: string; classes: string }> = {
  game:     { label: 'משחק',  emoji: '🎮', classes: 'bg-blue-500/80 text-white' },
  tool:     { label: 'כלי',   emoji: '🎲', classes: 'bg-teal-500/80 text-white' },
  creative: { label: 'יצירה', emoji: '🎨', classes: 'bg-pink-500/80 text-white' },
  riddle:   { label: 'חידה',  emoji: '🤣', classes: 'bg-yellow-500/80 text-gray-900' },
};

interface Props {
  contentType: ContentType;
}

export default function ContentTypePill({ contentType }: Props) {
  const { label, emoji, classes } = PILL_CONFIG[contentType];
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full leading-none ${classes}`}
    >
      <span aria-hidden="true">{emoji}</span>
      <span>{label}</span>
    </span>
  );
}
