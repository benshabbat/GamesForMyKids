import GenericStartScreen from "@/components/shared/GenericStartScreen";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";
import GameItem from "@/components/shared/GameItem";
import { LETTER_GAME_STEPS } from "@/lib/constants";
import { LetterStartScreenProps } from "@/lib/types/startScreen";
import { BaseGameItem } from "@/lib/types/base";

export default function StartScreen({ items: letters, onStart }: LetterStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🔤 משחק אותיות 🔤"
      subTitle="למד אותיות דרך שמיעה!"
      textColorHeader={gameConfig.letters.header}
      textColorSubHeader={gameConfig.letters.subHeader}
      gameSteps={LETTER_GAME_STEPS}
      gameStepsBgClass="bg-orange-100 bg-opacity-90"
      items={letters}
      onStart={onStart}
      buttonFromColor={gameConfig.letters.button.from}
      buttonToColor={gameConfig.letters.button.to}
      backgroundStyle={gameConfig.letters.background}
      itemsTitle="כל האותיות שנלמד:"
      itemsDescription="לחץ על אות כדי לשמוע את השם שלה! (22 אותיות באלף-בית העברי)"
      itemsDescriptionColor="text-orange-100"
      customItemsRenderer={() => (
        <>
          <div className="flex flex-wrap justify-center gap-3">
            {letters.slice(0, 12).map((letter: BaseGameItem) => (
              <GameItem
                key={letter.name}
                hebrewText={letter.hebrew}
                color="bg-orange-500"
                shape="circle"
                size="small"
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {letters.slice(12, 22).map((letter: BaseGameItem) => (
              <GameItem
                key={letter.name}
                hebrewText={letter.hebrew}
                color="bg-orange-500"
                shape="circle"
                size="small"
              />
            ))}
          </div>
        </>
      )}
    />
  );
}
