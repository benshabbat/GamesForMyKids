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

const MS_PER_DAY = 86400000;

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/** Whole calendar days from `from` to `to` (local dates; unaffected by DST or time of day). */
function daysBetween(from: Date, to: Date): number {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / MS_PER_DAY);
}

/** `birthday` moved forward by `monthsToAdd` months, clamped to the last day of a shorter month. */
function addMonthsClamped(birthday: Date, monthsToAdd: number): Date {
  const total = birthday.getMonth() + monthsToAdd;
  const year = birthday.getFullYear() + Math.floor(total / 12);
  const month = ((total % 12) + 12) % 12;
  return new Date(year, month, Math.min(birthday.getDate(), daysInMonth(year, month)));
}

/** The birthday in `year`; a 29 Feb birthday falls on 28 Feb in non-leap years. */
function birthdayInYear(birthday: Date, year: number): Date {
  return addMonthsClamped(birthday, (year - birthday.getFullYear()) * 12);
}

/** Parses the `YYYY-MM-DD` value of an `<input type="date">` as a LOCAL date (not UTC midnight). */
export function parseLocalDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(2000, 0, 1);
  date.setFullYear(year, month - 1, day); // setFullYear avoids the 0-99 -> 1900s mapping
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

export function computeAge(birthday: Date, now: Date): AgeResult {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Whole months since birth, never counting a month that has not completed yet.
  // Adding months to the birth date clamps to the end of shorter months (31 Jan + 1 month = 28 Feb),
  // so the leftover days can never be negative.
  let totalMonths = (today.getFullYear() - birthday.getFullYear()) * 12 + (today.getMonth() - birthday.getMonth());
  let lastMonthiversary = addMonthsClamped(birthday, totalMonths);
  if (lastMonthiversary > today) {
    totalMonths -= 1;
    lastMonthiversary = addMonthsClamped(birthday, totalMonths);
  }
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const days = daysBetween(lastMonthiversary, today);

  const msElapsed = now.getTime() - birthday.getTime();
  const totalDays = daysBetween(birthday, today);
  const totalHours = Math.floor(msElapsed / 3600000);
  const liveSeconds = Math.floor(msElapsed / 1000);

  let nextBirthday = birthdayInYear(birthday, today.getFullYear());
  if (nextBirthday < today) nextBirthday = birthdayInYear(birthday, today.getFullYear() + 1);
  const daysUntilBirthday = daysBetween(today, nextBirthday);
  const isBirthdayToday = daysUntilBirthday === 0;

  return { years, months, days, totalDays, totalHours, liveSeconds, daysUntilBirthday, isBirthdayToday };
}

export function useAgeCalculator() {
  const [birthdayInput, setBirthdayInput] = useState('');
  const [result, setResult] = useState<AgeResult | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculate = () => {
    if (!birthdayInput) return;
    const birthday = parseLocalDate(birthdayInput);
    if (!birthday) return;
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
    const birthday = parseLocalDate(birthdayInput);
    if (!birthday) return;
    const interval = setInterval(() => {
      setResult(computeAge(birthday, new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, [calculated, birthdayInput]);

  return { birthdayInput, setBirthdayInput, result, calculated, calculate, reset };
}
