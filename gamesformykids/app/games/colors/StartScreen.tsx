import GenericStartScreen from "@/components/shared/GenericStartScreen";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";
import GameItem from "@/components/shared/GameItem";
import { COLOR_GAME_STEPS } from "@/lib/constants/uiConstants";
import { ColorStartScreenProps } from "@/lib/types/startScreen";

export default function StartScreen({ colors, onStart }: ColorStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🎨 משחק צבעים 🎨"
      subTitle="למד צבעים דרך משחק!"
      textColorHeader={gameConfig.colors.header}
      textColorSubHeader={gameConfig.colors.subHeader}
      gameSteps={COLOR_GAME_STEPS}
      items={colors}
      onStart={onStart}
      buttonFromColor={gameConfig.colors.button.from}
      buttonToColor={gameConfig.colors.button.to}
      backgroundStyle={gameConfig.colors.background}
      itemsTitle="הצבעים שנלמד:"
      itemsDescription="לחץ על צבע כדי לשמוע את השם שלו!"
      itemsGridClass="flex flex-wrap justify-center gap-4"
      renderItem={(color) => (
        <GameItem
          key={color.name}
          hebrewText={color.hebrew}
          color={color.color}
          shape="circle"
          size="large"
        />
      )}
    />
  );
}
