import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { TOOL_GAME_STEPS } from "@/lib/constants/uiConstants";
import { ToolStartScreenProps } from "@/lib/types/startScreenTypes";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ tools, onStart, onSpeak }: ToolStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🔨 משחק כלי עבודה 🪛"
      subTitle="למד כלי עבודה דרך האזנה!"
      textColorHeader={gameConfig.tools.header}
      textColorSubHeader={gameConfig.tools.subHeader}
      gameSteps={TOOL_GAME_STEPS}
      gameStepsBgClass="bg-yellow-100 bg-opacity-90"
      items={tools}
      onStart={onStart}
      buttonFromColor={gameConfig.tools.button.from}
      buttonToColor={gameConfig.tools.button.to}
      backgroundStyle={gameConfig.tools.background}
      itemsTitle="כל כלי העבודה שנלמד:"
      itemsDescription="לחץ על כלי עבודה כדי לשמוע את שמו! כלי עבודה שימושיים"
      itemsDescriptionColor="text-yellow-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(tool) => (
        <GameItem
          key={tool.name}
          hebrewText={tool.hebrew}
          color={tool.color}
          icon={<span className="text-3xl">{tool.emoji}</span>}
          shape="circle"
          size="large"
          onClick={() => onSpeak && onSpeak(tool.name)}
        />
      )}
    />
  );
}
