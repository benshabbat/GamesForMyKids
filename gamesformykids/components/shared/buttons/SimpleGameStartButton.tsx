import { useGameActions } from '@/hooks';

// Game configs name the button colors by Tailwind hue ("teal", "cyan"). Tailwind only
// generates classes it finds spelled out in source, so each hue maps to literal classes
// here; interpolating `from-${hue}-500` would produce a button with no background at all.
// 600→700 keeps the white label readable even on the lighter hues (yellow, lime, amber).
const GRADIENT_FROM: Record<string, string> = {
  red: 'from-red-600', orange: 'from-orange-600', amber: 'from-amber-600', yellow: 'from-yellow-600',
  lime: 'from-lime-600', green: 'from-green-600', emerald: 'from-emerald-600', teal: 'from-teal-600',
  cyan: 'from-cyan-600', sky: 'from-sky-600', blue: 'from-blue-600', indigo: 'from-indigo-600',
  violet: 'from-violet-600', purple: 'from-purple-600', fuchsia: 'from-fuchsia-600', pink: 'from-pink-600',
  rose: 'from-rose-600',
};
const GRADIENT_TO: Record<string, string> = {
  red: 'to-red-700', orange: 'to-orange-700', amber: 'to-amber-700', yellow: 'to-yellow-700',
  lime: 'to-lime-700', green: 'to-green-700', emerald: 'to-emerald-700', teal: 'to-teal-700',
  cyan: 'to-cyan-700', sky: 'to-sky-700', blue: 'to-blue-700', indigo: 'to-indigo-700',
  violet: 'to-violet-700', purple: 'to-purple-700', fuchsia: 'to-fuchsia-700', pink: 'to-pink-700',
  rose: 'to-rose-700',
};

/** Accepts a bare hue ("teal") or a ready-made class ("from-yellow-400"). */
function gradientClass(color: string | undefined, map: Record<string, string>, prefix: string, fallback: string): string {
  if (!color) return fallback;
  if (color.startsWith(prefix)) return color;
  return map[color] ?? fallback;
}

type SimpleGameStartButtonProps = {
  fromColor?: string;
  toColor?: string;
  text?: string;
  customOnStart?: (() => void) | undefined;
};

/**
 * SimpleGameStartButton - כפתור התחלה עם שימוש בקונטקסט
 */
export default function SimpleGameStartButton({ 
  fromColor, 
  toColor, 
  text = "🎮 בואו נתחיל לשחק! 🎮",
  customOnStart
}: SimpleGameStartButtonProps) {
  const { startGame } = useGameActions();
  const fromClass = gradientClass(fromColor, GRADIENT_FROM, 'from-', 'from-blue-600');
  const toClass = gradientClass(toColor, GRADIENT_TO, 'to-', 'to-blue-700');

  const handleStart = () => {
    if (customOnStart) {
      customOnStart();
    } else {
      startGame();
    }
  };
  
  return (
    <div className="mb-8">
      <button
        onClick={handleStart}
        className={`
          px-12 py-4 bg-gradient-to-r ${fromClass} ${toClass} text-white text-2xl font-bold
          rounded-2xl shadow-2xl transform hover:scale-105
          transition-[transform,shadow] duration-300 border-4 border-white
          focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:outline-none
        `}
      >
        {text}
      </button>
    </div>
  );
}
