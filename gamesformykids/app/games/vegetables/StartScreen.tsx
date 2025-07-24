import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { VEGETABLE_GAME_STEPS } from "@/lib/constants/uiConstants";
import { VegetableStartScreenProps } from "@/lib/types/startScreenTypes";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ vegetables, onStart, onSpeak }: VegetableStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🥕 משחק ירקות 🥬"
      subTitle="למד ירקות באמצעות הקשבה!"
      textColorHeader={gameConfig.vegetables.header}
      textColorSubHeader={gameConfig.vegetables.subHeader}
      gameSteps={VEGETABLE_GAME_STEPS}
      gameStepsBgClass="bg-green-100 bg-opacity-90"
      items={vegetables}
      onStart={onStart}
      buttonFromColor={gameConfig.vegetables.button.from}
      buttonToColor={gameConfig.vegetables.button.to}
      backgroundStyle={gameConfig.vegetables.background}
      itemsTitle="כל הירקות שנלמד:"
      itemsDescription="לחץ על ירק כדי לשמוע את שמו! ירקות בריאים וטעימים"
      itemsDescriptionColor="text-green-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(vegetable) => (
        <GameItem
          key={vegetable.name}
          hebrewText={vegetable.hebrew}
          color={vegetable.color}
          icon={<span className="text-3xl">{vegetable.emoji}</span>}
          shape="circle"
          size="large"
          onClick={() => onSpeak?.(vegetable.name)}
        />
      )}
    />
  );
}
