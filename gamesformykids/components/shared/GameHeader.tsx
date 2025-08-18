import UnifiedHeader from "./UnifiedHeader";
import { useUniversalGame } from '@/contexts/UniversalGameContext';

/**
 * 🎯 GameHeader עם קונטקסט - ללא props!
 */
export default function GameHeader() {
  const { score, level, resetGame, config } = useUniversalGame();
  
  const onHome = () => (window.location.href = "/");
  const levelColor = config.colors?.subHeader || "text-purple-600";

  return (
    <UnifiedHeader
      variant="game-header"
      score={score}
      level={level}
      onHome={onHome}
      onReset={resetGame}
      levelColor={levelColor}
    />
  );
}
