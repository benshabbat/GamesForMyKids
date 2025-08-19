import UnifiedHeader from "./UnifiedHeader";

interface GameHeaderProps {
  score?: number;
  level?: number;
  onReset?: () => void;
  onHome?: () => void;
  levelColor?: string;
}

/**
 * 🎯 GameHeader עם props אופציונליים
 */
export default function GameHeader({
  score = 0,
  level = 1,
  onReset,
  onHome = () => (window.location.href = "/"),
  levelColor = "text-purple-600"
}: GameHeaderProps = {}) {

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
