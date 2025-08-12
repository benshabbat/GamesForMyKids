"use client";

/**
 * Memory Game Page
 * 
 * Main page component for the memory card game
 */

import { MemoryProvider, useMemoryContext } from "@/contexts";
import { useGameProgress, useAchievements } from "@/hooks";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import GameHeader from "./GameHeader";
import GameWinMessage from "./GameWinMessage";
import MemoryGameBoard from "./MemoryGameBoard";
import AutoStartScreen from "@/components/shared/AutoStartScreen";
import TipsBox from "@/components/shared/TipsBox";

function MemoryGameContent() {
  const {
    state: { animals, gameStarted, isGameWon, gameStats, timer, difficulty },
    initializeGame,
  } = useMemoryContext();

  const { user } = useAuth();
  const { updateScore, updateLevel, addPlayTime } = useGameProgress('memory');
  const { checkScoreAchievements, checkLevelAchievements } = useAchievements('memory');

  // Track game completion and update progress
  useEffect(() => {
    if (isGameWon && user && gameStats.score > 0) {
      // Update score and level based on difficulty
      updateScore('memory', gameStats.score);
      
      // Map difficulty to level number
      const levelMap = { 'EASY': 1, 'MEDIUM': 2, 'HARD': 3 };
      const currentLevel = levelMap[difficulty] || 1;
      updateLevel('memory', currentLevel);
      
      // Add play time (timer is in seconds)
      if (timer > 0) {
        addPlayTime('memory', timer);
      }

      // Check for achievements
      checkScoreAchievements('memory', gameStats.score);
      checkLevelAchievements('memory', currentLevel);
    }
  }, [isGameWon, user, gameStats.score, timer, difficulty, updateScore, updateLevel, addPlayTime, checkScoreAchievements, checkLevelAchievements]);

  if (!gameStarted) {
    // Convert AnimalData to BaseGameItem for AutoStartScreen
    const gameItems = animals.length > 0 ? animals.map(animal => ({
      name: animal.name,
      hebrew: animal.name,
      english: animal.name,
      emoji: animal.emoji,
      color: '#8B5CF6',
      sound: [],
    })) : [];

    return (
      <AutoStartScreen 
        gameType="memory" 
        items={gameItems} 
        onStart={initializeGame} 
        onSpeak={() => {}} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader />

        {isGameWon && <GameWinMessage />}
        
        {gameStarted && <MemoryGameBoard />}
      </div>

      <TipsBox
        tip="💡 טיפ: נסה לזכור איפה כל חיה מסתתרת!"
        description="לחץ על קלף כדי לחשוף חיה, ונסה למצוא את הזוג שלה. השתמש בזיכרון שלך כדי לזכור מיקומים!"
      />
    </div>
  );
}

export default function MemoryGamePage() {
  return (
    <MemoryProvider>
      <MemoryGameContent />
    </MemoryProvider>
  );
}
