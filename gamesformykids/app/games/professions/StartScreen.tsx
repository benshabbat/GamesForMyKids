import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { PROFESSION_GAME_STEPS } from "@/lib/constants/uiConstants";
import { ProfessionStartScreenProps } from "@/lib/types/startScreenTypes";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ professions, onStart }: ProfessionStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="👩‍⚕️ משחק מקצועות 👨‍🚒"
      subTitle="למד על מקצועות מעניינים!"
      textColorHeader={gameConfig.professions.header}
      textColorSubHeader={gameConfig.professions.subHeader}
      gameSteps={PROFESSION_GAME_STEPS}
      gameStepsBgClass="bg-purple-100 bg-opacity-90"
      items={professions}
      onStart={onStart}
      buttonFromColor={gameConfig.professions.button.from}
      buttonToColor={gameConfig.professions.button.to}
      backgroundStyle={gameConfig.professions.background}
      itemsTitle="כל המקצועות שנלמד:"
      itemsDescription="לחץ על מקצוע כדי לשמוע את התיאור שלו! כל מקצוע חשוב ומיוחד"
      itemsDescriptionColor="text-purple-100"
      itemsGridClass="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(profession) => (
        <GameItem
          key={profession.id}
          hebrewText={profession.name}
          color={profession.color}
          icon={<span className="text-3xl">{profession.emoji}</span>}
          shape="circle"
          size="large"
        />
      )}
    />
  );
}