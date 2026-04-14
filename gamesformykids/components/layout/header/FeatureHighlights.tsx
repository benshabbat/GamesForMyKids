const FEATURES = [
  { emoji: '🎯', ariaLabel: 'target', title: 'למידה מהנה', description: 'אותיות, מספרים וצורות' },
  { emoji: '🧠', ariaLabel: 'brain', title: 'פיתוח חשיבה', description: 'זיכרון ופתרון בעיות' },
  { emoji: '🎨', ariaLabel: 'art', title: 'יצירתיות', description: 'ציור ובנייה' },
];

export function FeatureHighlights() {
  return (
    <>
      {/* Desktop: 3-column cards */}
      <div className="max-w-4xl mx-auto mb-4 md:mb-8 hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {FEATURES.map(({ emoji, ariaLabel, title, description }) => (
            <div key={title} className="bg-white/70 rounded-2xl p-4 shadow-md">
              <div className="text-3xl mb-2" role="img" aria-label={ariaLabel}>{emoji}</div>
              <h2 className="font-bold text-purple-800">{title}</h2>
              <p className="text-sm text-purple-600">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: compact badges */}
      <div className="flex justify-center gap-2 md:hidden mb-2">
        {FEATURES.map(({ emoji, title }) => (
          <span key={title} className="bg-white/70 rounded-full px-3 py-1 text-xs font-bold text-purple-700 shadow-sm">
            {emoji} {title}
          </span>
        ))}
      </div>
    </>
  );
}
