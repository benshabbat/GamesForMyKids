'use client';
import { useEffect } from 'react';
import { useLetterDefenderStore } from './letterDefenderStore';
import { speak } from '@/lib/utils/speech/enhancedSpeechUtils';

const TICK_MS  = 900;   // ms between each enemy step
const SPAWN_MS = 1800;  // ms between enemy spawns

export function useLetterDefender() {
  const phase          = useLetterDefenderStore(s => s.phase);
  const wave           = useLetterDefenderStore(s => s.wave);
  const targetWord     = useLetterDefenderStore(s => s.targetWord);
  const enemies        = useLetterDefenderStore(s => s.enemies);
  const enemiesToSpawn = useLetterDefenderStore(s => s.enemiesToSpawn);
  const { tick, spawnNext, advanceWave } = useLetterDefenderStore();

  // TTS: announce target word at start of each wave
  useEffect(() => {
    if (phase === 'playing' && targetWord) {
      speak(`הגן על המילה ${targetWord}!`);
    }
  }, [wave, phase, targetWord]);

  // Game tick — advance enemies one step
  useEffect(() => {
    if (phase !== 'playing') return;
    const id = setInterval(tick, TICK_MS);
    return () => clearInterval(id);
  }, [phase, tick]);

  // Enemy spawner
  useEffect(() => {
    if (phase !== 'playing') return;
    const id = setInterval(() => {
      if (enemiesToSpawn.length > 0) spawnNext();
    }, SPAWN_MS);
    return () => clearInterval(id);
  }, [phase, enemiesToSpawn, spawnNext]);

  // Wave completion: all enemies dead and none left to spawn
  useEffect(() => {
    if (phase !== 'playing') return;
    if (enemiesToSpawn.length > 0) return;
    if (enemies.some(e => !e.dying)) return;
    // Delay slightly so last enemy death animation plays
    const id = setTimeout(advanceWave, 800);
    return () => clearTimeout(id);
  }, [phase, enemies, enemiesToSpawn, advanceWave]);

  return useLetterDefenderStore();
}
