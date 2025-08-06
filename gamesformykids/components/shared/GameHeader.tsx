import UnifiedHeader from "./UnifiedHeader";

type GameHeaderProps = {
  score: number;
  level: number;
  onHome: () => void;
  onReset: () => void;
  levelColor?: string; // לדוג' "text-purple-600"
};

/**
 * @deprecated השתמש ב-UnifiedHeader עם variant="game-header" במקום
 * קומפוננט זה נשמר לתאימות לאחור
 */
export default function GameHeader({
  score,
  level,
  onHome,
  onReset,
  levelColor = "text-purple-600",
}: GameHeaderProps) {
  return (
    <UnifiedHeader
      variant="game-header"
      score={score}
      level={level}
      onHome={onHome}
      onReset={onReset}
      levelColor={levelColor}
    />
  );
}
