"use client";

import { AnimalData, Card } from "@/types/game";
import { useState, useEffect } from "react";
import MemoryGameBoard from "./MemoryGameBoard";
import GameWinMessage from "./GameWinMessage";
import GameHeader from "./GameHeader";

export default function MemoryGamePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // נתוני בעלי החיים עם הצלילים שלהם
  const animals: AnimalData[] = [
    { emoji: "🐱", sound: "meow", name: "חתול" },
    { emoji: "🐶", sound: "woof", name: "כלב" },
    { emoji: "🐰", sound: "hop", name: "ארנב" },
    { emoji: "🦊", sound: "yip", name: "שועל" },
    { emoji: "🐻", sound: "growl", name: "דוב" },
    { emoji: "🐼", sound: "chirp", name: "פנדה" },
  ];

  const emojis: string[] = animals.map((animal) => animal.emoji);

  // יצירת AudioContext לצלילים
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudioContext(
        new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)()
      );
    }
  }, []);

  // פונקציה ליצירת צליל סינתטי
  const playAnimalSound = (emoji: string): void => {
    if (!audioContext) return;

    const animal = animals.find((a) => a.emoji === emoji);
    if (!animal) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // הגדרת תדרים שונים לכל בעל חיים
    const frequencies: { [key: string]: number[] } = {
      "🐱": [800, 1000, 600], // מיאו גבוה
      "🐶": [200, 300, 150], // נביחה נמוכה
      "🐰": [400, 500, 600], // קפיצות קלות
      "🦊": [600, 800, 500], // יללה חדה
      "🐻": [100, 150, 80], // שאגה עמוקה
      "🐼": [300, 400, 350], // צרצור חמוד
    };

    const freqs = frequencies[emoji] || [440, 550, 330];

    // השמעת רצף צלילים
    freqs.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.frequency.setValueAtTime(
        freq,
        audioContext.currentTime + index * 0.2
      );
      osc.type = "sine";

      gain.gain.setValueAtTime(0, audioContext.currentTime + index * 0.2);
      gain.gain.linearRampToValueAtTime(
        0.3,
        audioContext.currentTime + index * 0.2 + 0.05
      );
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + index * 0.2 + 0.15
      );

      osc.start(audioContext.currentTime + index * 0.2);
      osc.stop(audioContext.currentTime + index * 0.2 + 0.15);
    });
  };

  // פונקציה להשמעת צליל הצלחה
  const playSuccessSound = (): void => {
    if (!audioContext) return;

    // מנגינת הצלחה עליזה
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6

    notes.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.frequency.setValueAtTime(
        freq,
        audioContext.currentTime + index * 0.1
      );
      osc.type = "triangle";

      gain.gain.setValueAtTime(0, audioContext.currentTime + index * 0.1);
      gain.gain.linearRampToValueAtTime(
        0.2,
        audioContext.currentTime + index * 0.1 + 0.02
      );
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + index * 0.1 + 0.08
      );

      osc.start(audioContext.currentTime + index * 0.1);
      osc.stop(audioContext.currentTime + index * 0.1 + 0.08);
    });
  };

  const initializeGame = (): void => {
    const gameCards: Card[] = [...emojis, ...emojis]
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsGameStarted(true);
  };

  const handleCardClick = (cardId: number): void => {
    if (flippedCards.length >= 2) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // השמעת צליל בעל החיים כשהקלף נהפך
    playAnimalSound(card.emoji);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // זוג נמצא! השמעת צליל הצלחה
        setTimeout(() => {
          playSuccessSound();
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setMatchedPairs((prev) => [...prev, firstCard.emoji]);
          setFlippedCards([]);
        }, 1000);
      } else {
        // לא זוג - החזרת הקלפים
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const isGameWon: boolean = matchedPairs.length === emojis.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          isGameStarted={isGameStarted}
          matchedPairs={matchedPairs.length}
          totalPairs={emojis.length}
          onStart={initializeGame}
        />

        {isGameWon && (
          <GameWinMessage animals={animals} />
        )}

        {isGameStarted && (
          <MemoryGameBoard cards={cards} onCardClick={handleCardClick} />
        )}
      </div>
    </div>
  );
}
