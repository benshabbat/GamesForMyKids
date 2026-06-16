'use client';
import { useEffect } from 'react';
import { useRobotCoderStore } from './robotCoderStore';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

export function useRobotCoder() {
  const phase          = useRobotCoderStore(s => s.phase);
  const levelIdx       = useRobotCoderStore(s => s.levelIdx);
  const level          = useRobotCoderStore(s => s.level);
  const commands       = useRobotCoderStore(s => s.commands);
  const robotPos       = useRobotCoderStore(s => s.robotPos);
  const collectedLetters = useRobotCoderStore(s => s.collectedLetters);
  const animStep       = useRobotCoderStore(s => s.animStep);
  const { startGame, nextLevel, addCommand, removeCommand, clearCommands, run, executeStep, resetLevel, resetGame } = useRobotCoderStore();

  // Drive step-by-step animation
  useEffect(() => {
    if (phase !== 'running') return;
    if (animStep >= commands.length) return;
    const timer = setTimeout(() => {
      executeStep();
    }, 450);
    return () => clearTimeout(timer);
  }, [phase, animStep, commands.length, executeStep]);

  // Speak feedback on phase change
  useEffect(() => {
    if (phase === 'success') {
      speakHebrew(`${level.targetWord}! כל הכבוד!`);
    } else if (phase === 'fail') {
      speakHebrew('לא הצלחנו — בוא ננסה שוב!');
    }
  }, [phase, level.targetWord]);

  return {
    phase, levelIdx, level, commands, robotPos, collectedLetters, animStep,
    totalLevels: 10,
    startGame, nextLevel, addCommand, removeCommand, clearCommands, run, resetLevel, resetGame,
  };
}
