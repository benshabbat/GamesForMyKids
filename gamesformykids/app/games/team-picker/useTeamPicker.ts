'use client';
import { useState, useCallback } from 'react';
import { speakHebrew } from '@/lib/utils/speech/speaker';

function fisherYates<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function splitIntoTeams(names: string[], numTeams: number): string[][] {
  const shuffled = fisherYates(names);
  const teams: string[][] = Array.from({ length: numTeams }, () => []);
  shuffled.forEach((name, i) => { teams[i % numTeams]!.push(name); });
  return teams;
}

export function useTeamPicker() {
  const [namesInput, setNamesInput] = useState('');
  const [numTeams, setNumTeams]     = useState(2);
  const [teams, setTeams]           = useState<string[][] | null>(null);
  const [error, setError]           = useState('');

  const divide = useCallback(() => {
    const names = namesInput.split('\n').map(n => n.trim()).filter(Boolean);
    if (names.length < numTeams) {
      setError(`נדרשים לפחות ${numTeams} שמות לחלוקה ל-${numTeams} קבוצות`);
      return;
    }
    setError('');
    const result = splitIntoTeams(names, numTeams);
    setTeams(result);
    let delay = 300;
    result.forEach((team, i) => {
      setTimeout(() => speakHebrew(`קבוצה ${i + 1}: ${team.join(', ')}`), delay);
      delay += team.length * 600 + 800;
    });
  }, [namesInput, numTeams]);

  const reshuffle = useCallback(() => {
    setTeams(null);
    setTimeout(divide, 50);
  }, [divide]);

  return {
    namesInput, setNamesInput,
    numTeams, setNumTeams,
    teams, setTeams,
    error,
    divide, reshuffle,
  };
}
