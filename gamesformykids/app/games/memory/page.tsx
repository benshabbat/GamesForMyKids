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
    state: { gameStarted, isGameWon, gameStats, timer, difficulty },
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
    return (
      <AutoStartScreen />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader />

        {isGameWon && <GameWinMessage />}
        
        {gameStarted && <MemoryGameBoard />}
      </div>

      <TipsBox />
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
