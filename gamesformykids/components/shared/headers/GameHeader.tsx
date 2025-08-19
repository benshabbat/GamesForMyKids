import UnifiedHeader from "./UnifiedHeader";
import { ComponentTypes } from "@/lib/types";

type GameHeaderProps = ComponentTypes.GameHeaderProps;

/**
 * 🎯 GameHeader עם props אופציונליים
 */
export default function GameHeader({
  score = 0,
  level = 1,
  onHome = () => (window.location.href = "/")
}: GameHeaderProps = {}) {

  return (
    <UnifiedHeader
      title="משחק"
      showScore={true}
      score={score}
      level={level}
      showBackButton={true}
      onBack={onHome}
    />
  );
}
