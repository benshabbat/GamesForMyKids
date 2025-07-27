import GenericStartScreen from "@/components/shared/GenericStartScreen";
import { MATH_GAME_STEPS } from "@/lib/constants";
import { MathStartScreenProps } from "@/lib/types/startScreen";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ onStart }: MathStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  // דוגמאות חשבון למסך פתיחה
  const examples = [
    { problem: "2 + 3", answer: 5, emoji: "🍎", operation: "חיבור" },
    { problem: "5 - 2", answer: 3, emoji: "🌟", operation: "חיסור" },
    { problem: "1 + 4", answer: 5, emoji: "🎈", operation: "חיבור" },
    { problem: "6 - 3", answer: 3, emoji: "🐶", operation: "חיסור" },
  ];

  return (
    <GenericStartScreen
      title="🧮 משחק חשבון 🧮"
      subTitle="למד חיבור וחיסור בדרך כיפית!"
      textColorHeader={gameConfig.math.header}
      textColorSubHeader={gameConfig.math.subHeader}
      gameSteps={MATH_GAME_STEPS}
      gameStepsBgClass="bg-yellow-100 bg-opacity-90"
      items={examples}
      onStart={onStart}
      buttonFromColor={gameConfig.math.button.from}
      buttonToColor={gameConfig.math.button.to}
      backgroundStyle={gameConfig.math.background}
      itemsTitle="דוגמאות חשבון:"
      itemsDescription="תראה בעיות חשבון עם אימוג'ים ותבחר את התשובה הנכונה!"
      itemsDescriptionColor="text-yellow-100"
      itemsGridClass="grid grid-cols-2 gap-6 max-w-2xl mx-auto"
      renderItem={(example) => (
        <div key={example.problem} className="bg-white bg-opacity-90 rounded-2xl p-4 text-center shadow-lg">
          <div className="text-2xl mb-2">{example.emoji} {example.problem} = ?</div>
          <div className="text-lg font-bold text-orange-700">{example.answer}</div>
          <div className="text-sm text-gray-600">{example.operation}</div>
        </div>
      )}
    />
  );
}
