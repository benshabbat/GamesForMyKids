interface Props {
  emoji?: string;
  emojiClassName?: string;
  emojiStyle?: React.CSSProperties;
  dots?: [string, string, string];
  label?: string;
  labelColor?: string;
  gradientClass?: string;
}

export default function GameSpinnerScreen({
  emoji = '🎮',
  emojiClassName = 'animate-bounce',
  emojiStyle,
  dots = ['bg-purple-400', 'bg-pink-400', 'bg-yellow-400'],
  label = 'טוען...',
  labelColor = 'text-purple-700',
  gradientClass = 'from-purple-100 via-pink-100 to-yellow-100',
}: Props) {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${gradientClass}`}>
      <div className="flex flex-col items-center gap-6">
        <div className={`text-7xl ${emojiClassName}`} style={emojiStyle}>{emoji}</div>
        <div className="flex gap-2">
          <span className={`w-4 h-4 rounded-full ${dots[0]} animate-bounce [animation-delay:0ms]`} />
          <span className={`w-4 h-4 rounded-full ${dots[1]} animate-bounce [animation-delay:150ms]`} />
          <span className={`w-4 h-4 rounded-full ${dots[2]} animate-bounce [animation-delay:300ms]`} />
        </div>
        <p className={`text-xl font-bold ${labelColor}`}>{label}</p>
      </div>
    </div>
  );
}
