import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { ANIMAL_GAME_STEPS } from "@/lib/constants/uiConstants";
import { AnimalStartScreenProps } from "@/lib/types/startScreenTypes";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ animals, onStart }: AnimalStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🐾 משחק חיות 🐾"
      subTitle="למד חיות דרך שמיעה!"
      textColorHeader={gameConfig.animals.header}
      textColorSubHeader={gameConfig.animals.subHeader}
      gameSteps={ANIMAL_GAME_STEPS}
      gameStepsBgClass="bg-green-100 bg-opacity-90"
      items={animals}
      onStart={onStart}
      buttonFromColor={gameConfig.animals.button.from}
      buttonToColor={gameConfig.animals.button.to}
      backgroundStyle={gameConfig.animals.background}
      itemsTitle="כל החיות שנלמד:"
      itemsDescription="לחץ על חיה כדי לשמוע את השם שלה! חיות חמודות מהחווה"
      itemsDescriptionColor="text-green-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto"
      renderItem={(animal) => (
        <GameItem
          key={animal.name}
          hebrewText={animal.hebrew}
          color={animal.color}
          icon={<span className="text-3xl">{animal.emoji}</span>}
          shape="circle"
          size="large"
        />
      )}
    />
  );
}
