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

  const emojis = animals.map((animal) => animal.emoji);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudioContext(
        new (
          window.AudioContext ||
          (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        )()
      );
    }
  }, []);

  const playAnimalSound = (emoji: string) => {
    if (!audioContext) return;
    const frequencies: Record<string, number[]> = {
      "🐱": [800, 1000, 600],
      "🐶": [200, 300, 150],
      "🐰": [400, 500, 600],
      "🦊": [600, 800, 500],
      "🐻": [100, 150, 80],
      "🐼": [300, 400, 350],
    };
    (frequencies[emoji] || [440, 550, 330]).forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      const t = audioContext.currentTime + i * 0.2;
      osc.frequency.setValueAtTime(freq, t);
      osc.type = "sine";
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
      osc.start(t);
      osc.stop(t + 0.15);
    });
  };

  const playSuccessSound = () => {
    if (!audioContext) return;
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      const t = audioContext.currentTime + i * 0.1;
      osc.frequency.setValueAtTime(freq, t);
      osc.type = "triangle";
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
      osc.start(t);
      osc.stop(t + 0.08);
    });
  };

  const createShuffledCards = (): Card[] =>
    [...emojis, ...emojis]
      .map((emoji, i) => ({
        id: i,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

  const initializeGame = () => {
    setCards(createShuffledCards());
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsGameStarted(true);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    playAnimalSound(card.emoji);
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    if (newFlipped.length === 2) {
      checkForMatch(newFlipped);
    }
  };

  // הוספת פונקציה שמדברת "כל הכבוד!"
  const speakCongrats = () => {
    if (!('speechSynthesis' in window)) return;
    const utter = new SpeechSynthesisUtterance("כל הכבוד!");
    utter.lang = "he-IL";
    utter.rate = 0.9;
    utter.pitch = 1.1;
    window.speechSynthesis.speak(utter);
  };

  // הוספת פונקציה שמדברת בסיום המשחק
  const speakGameEnd = () => {
    if (!('speechSynthesis' in window)) return;
    const utter = new SpeechSynthesisUtterance(
      "מעולה, פתרתם את הכל! האם תרצו משחק נוסף או משחק אחר?"
    );
    utter.lang = "he-IL";
    utter.rate = 0.9;
    utter.pitch = 1.1;
    window.speechSynthesis.speak(utter);
  };

  const checkForMatch = ([firstId, secondId]: number[]) => {
    const firstCard = cards.find((c) => c.id === firstId);
    const secondCard = cards.find((c) => c.id === secondId);
    if (!firstCard || !secondCard) return;

    const isMatch = firstCard.emoji === secondCard.emoji;
    setTimeout(() => {
      if (isMatch) {
        playSuccessSound();
        speakCongrats(); // השמעת "כל הכבוד!" בשמחה
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          )
        );
        setMatchedPairs((prev) => [...prev, firstCard.emoji]);
      } else {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, isFlipped: false }
              : c
          )
        );
      }
      setFlippedCards([]);
    }, 1000);
  };

  const isGameWon = matchedPairs.length === emojis.length;
  useEffect(() => {
    if (isGameWon && isGameStarted) {
      speakGameEnd();
    }
  }, [isGameWon, isGameStarted]);


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