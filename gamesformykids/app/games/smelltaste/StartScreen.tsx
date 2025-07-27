import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { SMELL_TASTE_GAME_STEPS } from "@/lib/constants";
import { SmellTasteStartScreenProps } from "@/lib/types/startScreen";
import { BaseGameItem } from "@/lib/types/base";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ items: smellTasteItems, onStart }: SmellTasteStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🌸 משחק ריחות וטעמים ☕"
      subTitle="למד ריחות וטעמים דרך הקשבה!"
      textColorHeader={gameConfig.smellTaste.header}
      textColorSubHeader={gameConfig.smellTaste.subHeader}
      gameSteps={SMELL_TASTE_GAME_STEPS}
      gameStepsBgClass="bg-amber-100 bg-opacity-90"
      items={smellTasteItems}
      onStart={onStart}
      buttonFromColor={gameConfig.smellTaste.button.from}
      buttonToColor={gameConfig.smellTaste.button.to}
      backgroundStyle={gameConfig.smellTaste.background}
      itemsTitle="כל הריחות והטעמים שנלמד:"
      itemsDescription="לחץ על ריח או טעם כדי לשמוע את השם שלו! ריחות וטעמים מוכרים ומעניינים"
      itemsDescriptionColor="text-amber-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(smellTasteItem: BaseGameItem) => (
        <GameItem
          key={smellTasteItem.name}
          hebrewText={smellTasteItem.hebrew}
          color={smellTasteItem.color}
          icon={<span className="text-3xl">{smellTasteItem.emoji}</span>}
          shape="circle"
          size="large"
        />
      )}
    />
  );
}
