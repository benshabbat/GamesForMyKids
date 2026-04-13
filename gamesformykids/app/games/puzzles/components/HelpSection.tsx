const COLOR_CLASSES = {
  blue:   { bg: 'bg-blue-50',   title: 'text-blue-800',   content: 'text-blue-700' },
  green:  { bg: 'bg-green-50',  title: 'text-green-800',  content: 'text-green-700' },
  purple: { bg: 'bg-purple-50', title: 'text-purple-800', content: 'text-purple-700' },
  orange: { bg: 'bg-orange-50', title: 'text-orange-800', content: 'text-orange-700' },
} as const;

type HelpSectionColor = keyof typeof COLOR_CLASSES;

interface HelpSectionProps {
  color: HelpSectionColor;
  title: string;
  children: React.ReactNode;
}

export default function HelpSection({ color, title, children }: HelpSectionProps) {
  const c = COLOR_CLASSES[color];
  return (
    <div className={`${c.bg} p-4 rounded-lg`}>
      <h3 className={`font-bold ${c.title} mb-2`}>{title}</h3>
      <div className={c.content}>{children}</div>
    </div>
  );
}
