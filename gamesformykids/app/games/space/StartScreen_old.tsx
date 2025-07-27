import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { SPACE_GAME_STEPS } from "@/lib/constants";
import { SpaceStartScreenProps } from "@/lib/types/startScreen";
import { BaseGameItem } from "@/lib/types/base";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ items: spaceObjects, onStart, onSpeak }: SpaceStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🌌 משחק גופי השמים ⭐"
      subTitle="למד על הירח, השמש, כוכבים ועוד!"
      textColorHeader={gameConfig.space.header}
      textColorSubHeader={gameConfig.space.subHeader}
      gameSteps={SPACE_GAME_STEPS}
      gameStepsBgClass="bg-blue-900 bg-opacity-80"
      items={spaceObjects}
      onStart={onStart}
      buttonFromColor={gameConfig.space.button.from}
      buttonToColor={gameConfig.space.button.to}
      backgroundStyle={gameConfig.space.background}
      itemsTitle="כל גופי השמים שנלמד:"
      itemsDescription="לחץ על גוף שמים כדי לשמוע את שמו! חקור את החלל המרהיב"
      itemsDescriptionColor="text-blue-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(spaceObject: BaseGameItem) => (
        <GameItem
          key={spaceObject.name}
          hebrewText={spaceObject.hebrew}
          color={spaceObject.color}
          icon={<span className="text-3xl">{spaceObject.emoji}</span>}
          shape="circle"
          size="large"
          onClick={() => onSpeak?.(spaceObject.name)}
        />
      )}
    />
  );
}
