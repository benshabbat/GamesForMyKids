import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { VEHICLE_GAME_STEPS } from "@/lib/constants/uiConstants";
import { VehicleStartScreenProps } from "@/lib/types/startScreenTypes";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ vehicles, onStart, onSpeak }: VehicleStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🚗 Vehicle Game ✈️"
      subTitle="Learn vehicles through listening!"
      textColorHeader={gameConfig.vehicles.header}
      textColorSubHeader={gameConfig.vehicles.subHeader}
      gameSteps={VEHICLE_GAME_STEPS}
      gameStepsBgClass="bg-blue-100 bg-opacity-90"
      items={vehicles}
      onStart={onStart}
      buttonFromColor={gameConfig.vehicles.button.from}
      buttonToColor={gameConfig.vehicles.button.to}
      backgroundStyle={gameConfig.vehicles.background}
      itemsTitle="All vehicles we'll learn:"
      itemsDescription="Click on a vehicle to hear its name! Fast and fun transportation"
      itemsDescriptionColor="text-blue-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(vehicle) => (
        <GameItem
          key={vehicle.name}
          hebrewText={vehicle.hebrew}
          color={vehicle.color}
          icon={<span className="text-3xl">{vehicle.emoji}</span>}
          shape="circle"
          size="large"
          onClick={() => onSpeak && onSpeak(vehicle.name)}
        />
      )}
    />
  );
}
