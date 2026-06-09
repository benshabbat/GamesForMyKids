'use client';

interface ModeItem {
  emoji: string;
  label: string;
  desc: string;
}

interface Props<T extends ModeItem> {
  gradient: string;
  titleColor: string;
  subtitleColor: string;
  emoji: string;
  title: string;
  description: string;
  items: readonly T[];
  buttonClassName: string;
  layout?: 'flex' | 'grid-2' | 'grid-3';
  /** When true, renders emoji as a large side icon; otherwise inline with label */
  sideIcon?: boolean;
  onStart: (item: T) => void;
}

export default function GameModeMenuScreen<T extends ModeItem>({
  gradient,
  titleColor,
  subtitleColor,
  emoji,
  title,
  description,
  items,
  buttonClassName,
  layout = 'flex',
  sideIcon = false,
  onStart,
}: Props<T>) {
  const listClass = layout === 'grid-2'
    ? 'grid grid-cols-2 gap-4'
    : layout === 'grid-3'
    ? 'grid grid-cols-3 gap-4'
    : 'flex flex-col gap-4';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} p-4`} dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">{emoji}</div>
          <h1 className={`text-3xl font-bold ${titleColor} mb-2`}>{title}</h1>
          <p className={subtitleColor}>{description}</p>
        </div>
        <div className={listClass}>
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => onStart(item)}
              className={`p-5 rounded-2xl text-white shadow-lg hover:scale-105 active:scale-95 transition-transform text-start ${sideIcon ? 'flex items-center gap-4' : ''} ${buttonClassName}`}
            >
              {sideIcon ? (
                <>
                  <span className="text-4xl">{item.emoji}</span>
                  <div>
                    <div className="text-xl font-bold">{item.label}</div>
                    <div className="text-base opacity-80">{item.desc}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-black mb-1">{item.emoji} {item.label}</div>
                  <div className="text-sm opacity-80">{item.desc}</div>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
