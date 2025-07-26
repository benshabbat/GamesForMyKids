import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { CLOTHING_GAME_STEPS } from "@/lib/constants/uiConstants";
import { ClothingStartScreenProps } from "@/lib/types/startScreen";
import { BaseGameItem } from "@/lib/types/base";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ items: clothingItems, onStart, onSpeak }: ClothingStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="👕 משחק בגדים ואביזרים 👗"
      subTitle="למד על פריטי לבוש שונים!"
      textColorHeader={gameConfig.clothing.header}
      textColorSubHeader={gameConfig.clothing.subHeader}
      gameSteps={CLOTHING_GAME_STEPS}
      gameStepsBgClass="bg-pink-100 bg-opacity-90"
      items={clothingItems}
      onStart={onStart}
      buttonFromColor={gameConfig.clothing.button.from}
      buttonToColor={gameConfig.clothing.button.to}
      backgroundStyle={gameConfig.clothing.background}
      itemsTitle="כל הבגדים שנלמד:"
      itemsDescription="לחץ על פריט לבוש כדי לשמוע את שמו! בגדים יפים ואופנתיים"
      itemsDescriptionColor="text-pink-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(clothingItem: BaseGameItem) => (
        <GameItem
          key={clothingItem.name}
          hebrewText={clothingItem.hebrew}
          color={clothingItem.color}
          icon={<span className="text-3xl">{clothingItem.emoji}</span>}
          shape="circle"
          size="large"
          onClick={() => onSpeak?.(clothingItem.name)}
        />
      )}
    />
  );
}
