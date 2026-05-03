'use client';

import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useTakiStore } from '../takiGameStore';

export default function TakiMenuScreen() {
  const playerScore = useTakiStore(s => s.playerScore);
  const computerScore = useTakiStore(s => s.computerScore);
  const startGame = useTakiStore(s => s.startGame);

  return (
    <GameMenuCard
      emoji="🃏"
      title="טאקי"
      description="משחק הקלפים הישראלי הקלאסי — שחק נגד המחשב!"
      gradientClass="from-green-50 to-teal-100"
      buttonClass="from-teal-500 to-emerald-600"
      onStart={startGame}
      startLabel="🎮 התחל משחק"
    >
      {(playerScore > 0 || computerScore > 0) && (
        <div className="flex justify-center gap-6 text-gray-700 text-lg font-semibold mb-2">
          <span>🧑 אתה: {playerScore}</span>
          <span>🤖 מחשב: {computerScore}</span>
        </div>
      )}
      <div className="bg-green-50 rounded-xl p-4 text-gray-600 text-sm text-right space-y-1">
        <p className="font-bold text-gray-700 mb-2">כללים בקצרה:</p>
        <p>🃏 <strong>טאקי</strong> — שחק קלפים באותו צבע ולחץ &ldquo;סגור&rdquo;</p>
        <p>✋ <strong>עצור</strong> — המתנגד מדלג תור</p>
        <p>+2 <strong>פלוס</strong> — המתנגד מושך 2 קלפים</p>
        <p>🌈 <strong>שנה צבע</strong> — בחר צבע חדש</p>
        <p>👑 <strong>מלך</strong> — שנה צבע + עצור</p>
        <p>⭐ <strong>סופר טאקי</strong> — טאקי עם כל צבע</p>
      </div>
    </GameMenuCard>
  );
}
