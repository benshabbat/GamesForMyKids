import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { NUMBER_GAME_STEPS } from "@/lib/constants/uiConstants";
import { NumberStartScreenProps } from "@/lib/types/startScreenTypes";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ numbers, onStart }: NumberStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🔢 משחק מספרים 🔢"
      subTitle="למד מספרים דרך שמיעה!"
      textColorHeader={gameConfig.numbers.header}
      textColorSubHeader={gameConfig.numbers.subHeader}
      gameSteps={NUMBER_GAME_STEPS}
      gameStepsBgClass="bg-indigo-100 bg-opacity-90"
      items={numbers}
      onStart={onStart}
      buttonFromColor={gameConfig.numbers.button.from}
      buttonToColor={gameConfig.numbers.button.to}
      backgroundStyle={gameConfig.numbers.background}
      itemsTitle="כל המספרים שנלמד:"
      itemsDescription="לחץ על מספר כדי לשמוע את השם שלו! (מספרים 0-9)"
      itemsDescriptionColor="text-indigo-100"
      itemsGridClass="grid grid-cols-5 gap-3 max-w-3xl mx-auto"
      renderItem={(number) => (
        <GameItem
          key={number.name}
          hebrewText={number.hebrew}
          color="bg-indigo-500"
          shape="rounded"
          size="small"
          icon={<span className="text-xl font-bold">{number.digit}</span>}
        />
      )}
    />
  );
}