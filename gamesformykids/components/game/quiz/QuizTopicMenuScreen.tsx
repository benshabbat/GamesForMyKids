'use client';

interface Props<T extends string> {
  gradient: string;
  titleColor: string;
  subtitleColor: string;
  emoji: string;
  title: string;
  description: string;
  topics: readonly T[];
  topicEmoji: (topic: T) => string;
  topicClassName: string;
  allLabel: string;
  allButtonClassName: string;
  onStart: (topic: T | 'all') => void;
}

export default function QuizTopicMenuScreen<T extends string>({
  gradient,
  titleColor,
  subtitleColor,
  emoji,
  title,
  description,
  topics,
  topicEmoji,
  topicClassName,
  allLabel,
  allButtonClassName,
  onStart,
}: Props<T>) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} p-4`} dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">{emoji}</div>
          <h1 className={`text-3xl font-bold ${titleColor} mb-2`}>{title}</h1>
          <p className={subtitleColor}>{description}</p>
        </div>
        <button
          onClick={() => onStart('all')}
          className={`w-full mb-5 p-5 rounded-2xl text-white font-bold text-xl shadow-lg hover:scale-105 active:scale-95 transition-transform bg-gradient-to-l ${allButtonClassName}`}
        >
          {allLabel}
        </button>
        <div className="grid grid-cols-2 gap-3">
          {topics.map(t => (
            <button
              key={t}
              onClick={() => onStart(t)}
              className={`p-4 rounded-2xl font-bold text-start shadow-md hover:scale-105 active:scale-95 transition-transform ${topicClassName}`}
            >
              <div className="text-3xl mb-1">{topicEmoji(t)}</div>
              <div>{t}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
