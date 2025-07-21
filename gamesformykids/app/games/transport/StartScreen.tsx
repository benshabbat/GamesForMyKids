import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { TRANSPORT_GAME_STEPS } from "@/lib/constants/uiConstants";
import { TransportStartScreenProps } from "@/lib/types/startScreenTypes";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ transports, onStart }: TransportStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🚗 משחק כלי תחבורה 🚂"
      subTitle="למד על כלי תחבורה דרך שמיעה!"
      textColorHeader={gameConfig.transport.header}
      textColorSubHeader={gameConfig.transport.subHeader}
      gameSteps={TRANSPORT_GAME_STEPS}
      gameStepsBgClass="bg-blue-100 bg-opacity-90"
      items={transports}
      onStart={onStart}
      buttonFromColor={gameConfig.transport.button.from}
      buttonToColor={gameConfig.transport.button.to}
      backgroundStyle={gameConfig.transport.background}
      itemsTitle="כל כלי התחבורה שנלמד:"
      itemsDescription="לחץ על כלי תחבורה כדי לשמוע את השם שלו! מכוניות, רכבות, מטוסים ועוד"
      itemsDescriptionColor="text-blue-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(transport) => (
        <GameItem
          key={transport.name}
          hebrewText={transport.hebrew}
          color={transport.color}
          icon={<span className="text-3xl">{transport.emoji}</span>}
          shape="circle"
          size="large"
        />
      )}
    />
  );
}