import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { HOUSE_GAME_STEPS } from "@/lib/constants/uiConstants";
import { HouseStartScreenProps } from "@/lib/types/startScreen";
import { BaseGameItem } from "@/lib/types/base";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ items: houseItems, onStart, onSpeak }: HouseStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🏠 משחק חפצי הבית 🛋️"
      subTitle="למד חפצי בית דרך האזנה!"
      textColorHeader={gameConfig.house.header}
      textColorSubHeader={gameConfig.house.subHeader}
      gameSteps={HOUSE_GAME_STEPS}
      gameStepsBgClass="bg-sky-100 bg-opacity-90"
      items={houseItems}
      onStart={onStart}
      buttonFromColor={gameConfig.house.button.from}
      buttonToColor={gameConfig.house.button.to}
      backgroundStyle={gameConfig.house.background}
      itemsTitle="כל חפצי הבית שנלמד:"
      itemsDescription="לחץ על חפץ בבית כדי לשמוע את שמו! הכל בבית שלנו"
      itemsDescriptionColor="text-sky-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(houseItem: BaseGameItem) => (
        <GameItem
          key={houseItem.name}
          hebrewText={houseItem.hebrew}
          color={houseItem.color}
          icon={<span className="text-3xl">{houseItem.emoji}</span>}
          shape="circle"
          size="large"
          onClick={() => onSpeak && onSpeak(houseItem.name)}
        />
      )}
    />
  );
}
