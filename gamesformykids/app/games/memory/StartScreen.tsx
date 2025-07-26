import GenericStartScreen from "@/components/shared/GenericStartScreen";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";
import GameItem from "@/components/shared/GameItem";
import { MEMORY_GAME_STEPS } from "@/lib/constants/uiConstants";
import { MemoryStartScreenProps } from "@/lib/types/startScreenTypes";

export default function StartScreen({ onStart, animals }: MemoryStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🧠 משחק זיכרון 🧠"
      subTitle="מצא זוגות של חיות חמודות!"
      textColorHeader={gameConfig.memory.header}
      textColorSubHeader={gameConfig.memory.subHeader}
      gameSteps={MEMORY_GAME_STEPS}
      gameStepsBgClass="bg-pink-100 bg-opacity-90"
      items={animals}
      onStart={onStart}
      buttonFromColor={gameConfig.memory.button.from}
      buttonToColor={gameConfig.memory.button.to}
      backgroundStyle={gameConfig.memory.background}
      itemsTitle="החיות שתפגוש במשחק:"
      itemsDescription="לחץ על חיה כדי לשמוע את השם שלה! כל זוג חיות זהות מסתתר בין הקלפים"
      itemsDescriptionColor="text-pink-100"
      itemsGridClass="flex flex-wrap justify-center gap-4"
      renderItem={(animal) => (
        <GameItem
          key={animal.name}
          hebrewText={animal.name}
          icon={<span className="text-3xl">{animal.emoji}</span>}
          color="bg-purple-400"
          shape="circle"
          size="large"
        />
      )}
    />
  );
}
