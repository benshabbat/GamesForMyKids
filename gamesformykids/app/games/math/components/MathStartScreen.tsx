'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface MathStartScreenProps {
  startGame: () => Promise<void>;
  speakQuestion: () => Promise<void>;
}

export default function MathStartScreen({ startGame, speakQuestion }: MathStartScreenProps) {
  return (
    <GameMenuCard
      emoji="🧮"
      title="משחק המתמטיקה"
      description="פתרו תרגילים במתמטיקה ובחרו את התשובה הנכונה!"
      gradientClass="from-yellow-100 via-orange-100 to-red-100"
      buttonClass="from-orange-500 to-red-500"
      startLabel="🚀 התחל משחק"
      onStart={startGame}
      secondaryAction={{ label: '🔊 שמע הוראות', onClick: speakQuestion }}
    >
      <div className="space-y-2 text-center">
        <div className="text-2xl">3 + 2 = ? 🍎</div>
        <div className="text-2xl">5 - 1 = ? 🎈</div>
        <div className="text-2xl">2 + 3 = ? 🌟</div>
        <div className="text-2xl">4 - 2 = ? 🐶</div>
      </div>
    </GameMenuCard>
  );
}
