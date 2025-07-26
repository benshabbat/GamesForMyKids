import { BaseGameItem } from "@/lib/types/base"; 
import GameItem from "@/components/shared/GameItem";
import IconButton from "@/components/shared/IconButton";

interface EmotionCardProps {
  emotion: BaseGameItem;
  options: BaseGameItem[];
  onAnswer: (emotion: BaseGameItem) => void;
  onSpeak?: (emotionName: string) => Promise<void>;
}

export default function EmotionCard({ 
  emotion, 
  options, 
  onAnswer, 
  onSpeak 
}: EmotionCardProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Instruction Area */}
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-6 mb-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h2 className="text-2xl font-bold text-orange-600">
            Which emotion did you hear?
          </h2>
          <IconButton 
            onClick={() => onSpeak?.(emotion.name)}
            className="text-orange-500 hover:text-orange-600"
            icon="🔊"
          />
        </div>
        <p className="text-lg text-gray-600">
          Listen to the emotion name and click on the correct one!
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {options.map((option) => (
          <GameItem
            key={option.name}
            hebrewText={option.hebrew}
            color={option.color}
            icon={<span className="text-4xl">{option.emoji}</span>}
            shape="rounded"
            size="large"
            onClick={() => onAnswer(option)}
          />
        ))}
      </div>
    </div>
  );
}
