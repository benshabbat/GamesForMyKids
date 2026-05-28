interface Props {
  lives: number;
  max?: number;
  size?: string;
}

export default function LivesDisplay({ lives, max = 3, size = 'text-2xl' }: Props) {
  return (
    <div className="flex gap-1" role="status" aria-live="polite" aria-label={`${lives} חיים`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`${size} transition-all ${i < lives ? '' : 'opacity-20 grayscale'}`}>❤️</span>
      ))}
    </div>
  );
}
