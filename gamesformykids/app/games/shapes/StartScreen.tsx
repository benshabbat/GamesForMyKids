import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { SHAPE_ICON_MAP } from "@/lib/constants/ui/shapes";
import { SHAPE_GAME_STEPS } from "@/lib/constants";
import { ShapeStartScreenProps } from "@/lib/types/startScreen";
import { BaseGameItem } from "@/lib/types/base";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";
export default function StartScreen({ items: shapes, onStart }: ShapeStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🔷 משחק צורות 🔷"
      subTitle="למד צורות דרך שמיעה!"
      textColorHeader={gameConfig.shapes.header}
      textColorSubHeader={gameConfig.shapes.subHeader}
      gameSteps={SHAPE_GAME_STEPS}
      items={shapes}
      onStart={onStart}
      buttonFromColor={gameConfig.shapes.button.from}
      buttonToColor={gameConfig.shapes.button.to}
      backgroundStyle={gameConfig.shapes.background}
      itemsTitle="כל הצורות שנלמד:"
      itemsDescription="לחץ על צורה כדי לשמוע את השם שלה! (8 צורות שונות)"
      itemsDescriptionColor="text-green-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(shape: BaseGameItem) => {
        const IconComponent = SHAPE_ICON_MAP[shape.name as keyof typeof SHAPE_ICON_MAP] || SHAPE_ICON_MAP.circle;
        
        return (
          <GameItem
            key={shape.name}
            name={shape.name}
            hebrewText={shape.hebrew}
            color={shape.color}
            icon={<IconComponent size={40} />}
            shape="rounded"
            size="large"
          />
        );
      }}
    />
  );
}
