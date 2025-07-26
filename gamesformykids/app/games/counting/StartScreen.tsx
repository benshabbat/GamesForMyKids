import GenericStartScreen from "@/components/shared/GenericStartScreen";
import { COUNTING_GAME_STEPS } from "@/lib/constants/uiConstants";
import { CountingStartScreenProps } from "@/lib/types/startScreen";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ onStart }: CountingStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  // דוגמאות ספירה למסך פתיחה
  const examples = [
    { emojis: "🌟🌟🌟", count: 3 },
    { emojis: "🍎🍎🍎🍎🍎", count: 5 },
    { emojis: "🐶🐶", count: 2 },
    { emojis: "⚽", count: 1 },
  ];

  return (
    <GenericStartScreen
      title="🔢 משחק ספירה 🔢"
      subTitle="ספור אימוג'ים ובחר את המספר הנכון!"
      textColorHeader={gameConfig.counting.header}
      textColorSubHeader={gameConfig.counting.subHeader}
      gameSteps={COUNTING_GAME_STEPS}
      gameStepsBgClass="bg-cyan-100 bg-opacity-90"
      items={examples}
      onStart={onStart}
      buttonFromColor={gameConfig.counting.button.from}
      buttonToColor={gameConfig.counting.button.to}
      backgroundStyle={gameConfig.counting.background}
      itemsTitle="דוגמאות ספירה:"
      itemsDescription="תראה אימוג'ים ותבחר כמה יש! תרגול ספירה מהנה"
      itemsDescriptionColor="text-cyan-100"
      itemsGridClass="grid grid-cols-2 gap-6 max-w-2xl mx-auto"
      renderItem={(example) => (
        <div key={example.count} className="bg-white bg-opacity-90 rounded-2xl p-4 text-center shadow-lg">
          <div className="text-3xl mb-2">{example.emojis}</div>
          <div className="text-xl font-bold text-cyan-700">{example.count}</div>
        </div>
      )}
    />
  );
}
