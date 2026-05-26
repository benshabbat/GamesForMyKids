'use client';
import StoryInterludeCard from '@/components/game/shared/StoryInterludeCard';
import { TzaddikStory } from '../data/tzadikim';

interface ResultViewProps {
  story: TzaddikStory;
  storyIndex: number;
  totalStories: number;
  score: number;
  maxScore: number;
  onNextStory: () => void;
}

export default function ResultView({ story, storyIndex, totalStories, score, maxScore, onNextStory }: ResultViewProps) {
  const isLastStory = storyIndex >= totalStories - 1;
  const starsLit = score % 3 === 0 && score > 0 ? 3 : score % 3;

  return (
    <StoryInterludeCard
      gradient={story.bgGradient}
      emoji={story.emoji}
      emojiCircleClass={story.color}
      title="סיימת את הסיפור!"
      subtitle={story.name}
      scoreLine={`סה"כ: ${score} / ${maxScore} נקודות`}
      buttonGradient={story.color}
      nextLabel={isLastStory ? '🎉 לסיכום הסופי!' : `הסיפור הבא: סיפור ${storyIndex + 2} ←`}
      onNext={onNextStory}
      maxWidth="max-w-2xl"
    >
      <div className="bg-amber-50 rounded-2xl p-4 mb-6 text-right">
        <p className="font-bold text-amber-800 mb-1">💡 הלקח:</p>
        <p className="text-amber-700">{story.lesson}</p>
      </div>
      <div className="flex justify-center gap-2 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className={`text-4xl ${i < starsLit ? 'opacity-100' : 'opacity-25'}`}>⭐</span>
        ))}
      </div>
    </StoryInterludeCard>
  );
}
