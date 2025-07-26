import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { EMOTION_GAME_STEPS } from "@/lib/constants/uiConstants";
import { BaseGameItem } from "@/lib/types/base";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

interface EmotionStartScreenProps {
  emotions: BaseGameItem[];
  onStart: () => void;
  onSpeak?: (itemName: string) => Promise<void>;
}

export default function StartScreen({ emotions, onStart, onSpeak }: EmotionStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="😊 Emotions Game 😢"
      subTitle="Learn emotions through listening!"
      textColorHeader={gameConfig.emotions.header}
      textColorSubHeader={gameConfig.emotions.subHeader}
      gameSteps={EMOTION_GAME_STEPS}
      gameStepsBgClass="bg-yellow-100 bg-opacity-90"
      items={emotions}
      onStart={onStart}
      buttonFromColor={gameConfig.emotions.button.from}
      buttonToColor={gameConfig.emotions.button.to}
      backgroundStyle={gameConfig.emotions.background}
      itemsTitle="All emotions we'll learn:"
      itemsDescription="Click on an emotion to hear its name! Learn about different feelings"
      itemsDescriptionColor="text-yellow-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(emotion) => (
        <GameItem
          key={emotion.name}
          hebrewText={emotion.hebrew}
          color={emotion.color}
          icon={<span className="text-3xl">{emotion.emoji}</span>}
          shape="circle"
          size="large"
          onClick={() => onSpeak?.(emotion.name)}
        />
      )}
    />
  );
}
