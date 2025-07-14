import { useState, useEffect } from "react";
import { AnimalData, Card } from "@/types/game";

export function useMemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const animals: AnimalData[] = [
    { emoji: "🐱", sound: "meow", name: "חתול" },
    { emoji: "🐶", sound: "woof", name: "כלב" },
    { emoji: "🐰", sound: "hop", name: "ארנב" },
    { emoji: "🦊", sound: "yip", name: "שועל" },
    { emoji: "🐻", sound: "growl", name: "דוב" },
    { emoji: "🐼", sound: "chirp", name: "פנדה" },
  ];

  const emojis: string[] = animals.map((animal) => animal.emoji);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudioContext(
        new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)()
      );
    }
  }, []);

  const playAnimalSound = (emoji: string): void => {
    if (!audioContext) return;
    const frequencies: { [key: string]: number[] } = {
      "🐱": [800, 1000, 600],
      "🐶": [200, 300, 150],
      "🐰": [400, 500, 600],
      "🦊": [600, 800, 500],
      "🐻": [100, 150, 80],
      "🐼": [300, 400, 350],
    };
    const freqs = frequencies[emoji] || [440, 550, 330];
    freqs.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.2);
      osc.type = "sine";
      gain.gain.setValueAtTime(0, audioContext.currentTime + index * 0.2);
      gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + index * 0.2 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.2 + 0.15);
      osc.start(audioContext.currentTime + index * 0.2);
      osc.stop(audioContext.currentTime + index * 0.2 + 0.15);
    });
  };

  const playSuccessSound = (): void => {
    if (!audioContext) return;
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1);
      osc.type = "triangle";
      gain.gain.setValueAtTime(0, audioContext.currentTime + index * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + index * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.08);
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

  return {
    animals,
    cards,
    isGameStarted,
    matchedPairs,
    isGameWon,
    initializeGame,
    handleCardClick,
  };
}