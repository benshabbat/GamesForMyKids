import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { INSTRUMENT_GAME_STEPS } from "@/lib/constants";
import { InstrumentStartScreenProps } from "@/lib/types/startScreen";
import { BaseGameItem } from "@/lib/types/base";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ items: instruments, onStart, onSpeak }: InstrumentStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🎵 משחק כלי נגינה 🎹"
      subTitle="למד כלי נגינה באמצעות הקשבה!"
      textColorHeader={gameConfig.instruments.header}
      textColorSubHeader={gameConfig.instruments.subHeader}
      gameSteps={INSTRUMENT_GAME_STEPS}
      gameStepsBgClass="bg-yellow-100 bg-opacity-90"
      items={instruments}
      onStart={onStart}
      buttonFromColor={gameConfig.instruments.button.from}
      buttonToColor={gameConfig.instruments.button.to}
      backgroundStyle={gameConfig.instruments.background}
      itemsTitle="כל כלי הנגינה שנלמד:"
      itemsDescription="לחץ על כלי נגינה כדי לשמוע את שמו! כלי נגינה יפים ומוזיקליים"
      itemsDescriptionColor="text-yellow-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(instrument: BaseGameItem) => (
        <GameItem
          key={instrument.name}
          hebrewText={instrument.hebrew}
          color={instrument.color}
          icon={<span className="text-3xl">{instrument.emoji}</span>}
          shape="circle"
          size="large"
          onClick={() => onSpeak?.(instrument.name)}
        />
      )}
    />
  );
}
