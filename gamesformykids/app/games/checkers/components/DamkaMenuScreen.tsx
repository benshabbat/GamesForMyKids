'use client';

import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface DamkaMenuScreenProps {
  playerScore: number;
  computerScore: number;
  onStart: () => void;
}

export default function DamkaMenuScreen({ playerScore, computerScore, onStart }: DamkaMenuScreenProps) {
  return (
    <GameMenuCard
      emoji="♟️"
      title="דמקה"
      description="משחק הדמקה הקלאסי נגד המחשב!"
      gradientClass="from-amber-900 to-stone-950"
      buttonClass="from-amber-400 to-amber-500"
      onStart={onStart}
      startLabel="🎮 התחל משחק"
    >
      {(playerScore > 0 || computerScore > 0) && (
        <div className="flex justify-center gap-6 text-gray-700 text-lg font-semibold mb-2">
          <span>🔴 אתה: {playerScore}</span>
          <span>⚪ מחשב: {computerScore}</span>
        </div>
      )}
      <div className="bg-amber-50 rounded-xl p-4 text-gray-600 text-sm text-right space-y-1">
        <p className="font-bold text-gray-700 mb-2">כללים:</p>
        <p>🔴 האסימונים שלך = אדום (מלמטה↑)</p>
        <p>⚪ המחשב = לבן (מלמעלה↓)</p>
        <p>👑 הגע לצד השני להפוך למלך (זז בכל כיוון)</p>
        <p>⚡ חובה לקפוץ כשיש הזדמנות!</p>
        <p>🏆 נצח כשלמחשב אין אסימונים או מהלכים</p>
      </div>
    </GameMenuCard>
  );
}
