import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { WEATHER_GAME_STEPS } from "@/lib/constants/uiConstants";
import { WeatherStartScreenProps } from "@/lib/types/startScreenTypes";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ weathers, onStart }: WeatherStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🌤️ משחק מזג אוויר 🌤️"
      subTitle="למד על מזג האוויר דרך שמיעה!"
      textColorHeader={gameConfig.weather.header}
      textColorSubHeader={gameConfig.weather.subHeader}
      gameSteps={WEATHER_GAME_STEPS}
      gameStepsBgClass="bg-sky-100 bg-opacity-90"
      items={weathers}
      onStart={onStart}
      buttonFromColor={gameConfig.weather.button.from}
      buttonToColor={gameConfig.weather.button.to}
      backgroundStyle={gameConfig.weather.background}
      itemsTitle="כל מזג האוויר שנלמד:"
      itemsDescription="לחץ על מזג אוויר כדי לשמוע את השם שלו! למד על השמש, גשם, שלג ועוד"
      itemsDescriptionColor="text-sky-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(weather) => (
        <GameItem
          key={weather.name}
          hebrewText={weather.hebrew}
          color={weather.color}
          icon={<span className="text-3xl">{weather.emoji}</span>}
          shape="circle"
          size="large"
        />
      )}
    />
  );
}
