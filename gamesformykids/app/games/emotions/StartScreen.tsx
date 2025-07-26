import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { EMOTION_GAME_STEPS } from "@/lib/constants/uiConstants";
import { EmotionStartScreenProps } from "@/lib/types/startScreen";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ items: emotions, onStart, onSpeak }: EmotionStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="😊 משחק רגשות 😢"
      subTitle="למד רגשות שונים דרך הקשבה!"
      textColorHeader={gameConfig.emotions.header}
      textColorSubHeader={gameConfig.emotions.subHeader}
      gameSteps={EMOTION_GAME_STEPS}
      gameStepsBgClass="bg-yellow-100 bg-opacity-90"
      items={emotions}
      onStart={onStart}
      buttonFromColor={gameConfig.emotions.button.from}
      buttonToColor={gameConfig.emotions.button.to}
      backgroundStyle={gameConfig.emotions.background}
      itemsTitle="כל הרגשות שנלמד:"
      itemsDescription="לחץ על רגש כדי לשמוע את השם שלו! למד על רגשות שונים"
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
