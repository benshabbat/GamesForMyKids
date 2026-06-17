'use client';
import { useState, useEffect } from 'react';

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  liveSeconds: number;
  daysUntilBirthday: number;
  isBirthdayToday: boolean;
}

function computeAge(birthday: Date, now: Date): AgeResult {
  let years = now.getFullYear() - birthday.getFullYear();
  let months = now.getMonth() - birthday.getMonth();
  let days = now.getDate() - birthday.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const msElapsed = now.getTime() - birthday.getTime();
  const totalDays = Math.floor(msElapsed / 86400000);
  const totalHours = Math.floor(msElapsed / 3600000);
  const liveSeconds = Math.floor(msElapsed / 1000);

  const nextBirthday = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());
  if (nextBirthday < now) nextBirthday.setFullYear(now.getFullYear() + 1);
  const msUntil = nextBirthday.getTime() - now.getTime();
  const daysUntilBirthday = Math.ceil(msUntil / 86400000);
  const isBirthdayToday = daysUntilBirthday === 0 || daysUntilBirthday === 365;

  return { years, months, days, totalDays, totalHours, liveSeconds, daysUntilBirthday, isBirthdayToday };
}

export function useAgeCalculator() {
  const [birthdayInput, setBirthdayInput] = useState('');
  const [result, setResult] = useState<AgeResult | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculate = () => {
    if (!birthdayInput) return;
    const birthday = new Date(birthdayInput);
    if (isNaN(birthday.getTime())) return;
    if (birthday > new Date()) return;
    setResult(computeAge(birthday, new Date()));
    setCalculated(true);
  };

  const reset = () => {
    setCalculated(false);
    setResult(null);
    setBirthdayInput('');
  };

  useEffect(() => {
    if (!calculated || !birthdayInput) return;
    const birthday = new Date(birthdayInput);
    const interval = setInterval(() => {
      setResult(computeAge(birthday, new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, [calculated, birthdayInput]);

  return { birthdayInput, setBirthdayInput, result, calculated, calculate, reset };
}
