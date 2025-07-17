import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { FRUIT_GAME_STEPS } from "@/lib/constants/uiConstants";
import { FruitStartScreenProps } from "@/lib/types/startScreenTypes";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ fruits, onStart }: FruitStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🍎 משחק פירות 🍌"
      subTitle="למד פירות דרך שמיעה!"
      textColorHeader={gameConfig.fruits.header}
      textColorSubHeader={gameConfig.fruits.subHeader}
      gameSteps={FRUIT_GAME_STEPS}
      gameStepsBgClass="bg-orange-100 bg-opacity-90"
      items={fruits}
      onStart={onStart}
      buttonFromColor={gameConfig.fruits.button.from}
      buttonToColor={gameConfig.fruits.button.to}
      backgroundStyle={gameConfig.fruits.background}
      itemsTitle="כל הפירות שנלמד:"
      itemsDescription="לחץ על פרי כדי לשמוע את השם שלו! פירות טעימים ובריאים"
      itemsDescriptionColor="text-orange-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto"
      renderItem={(fruit) => (
        <GameItem
          key={fruit.name}
          hebrewText={fruit.hebrew}
          color={fruit.color}
          icon={<span className="text-3xl">{fruit.emoji}</span>}
          shape="circle"
          size="large"
        />
      )}
    />
  );
}