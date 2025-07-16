import { useState, useEffect } from "react";
import { AnimalData, Card } from "@/lib/types/game";
import { 
  playAnimalSound as playGenericAnimalSound, 
  playMemorySuccessSound, 
  createShuffledMemoryCards, 
  speakText 
} from "@/lib/utils/gameUtils";
import { 
  MEMORY_GAME_ANIMALS, 
  ANIMAL_SOUND_FREQUENCIES, 
  GAME_CONSTANTS 
} from "@/lib/constants/gameConstants";

export function useMemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // השימוש בקבועים מתוך קובץ הקבועים המשותף
  const animals: AnimalData[] = MEMORY_GAME_ANIMALS;

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
    // שימוש בפונקציה הגנרית להשמעת צליל החיה
    playGenericAnimalSound(audioContext, emoji, ANIMAL_SOUND_FREQUENCIES);
  };

  const playSuccessSound = () => {
    // שימוש בפונקציה הגנרית להשמעת צליל הצלחה
    playMemorySuccessSound(audioContext);
  };

  const createShuffledCards = (): Card[] => {
    // ממיר את תוצאת הפונקציה הגנרית למבנה הנתונים הספציפי של המשחק
    const genericCards = createShuffledMemoryCards(emojis);
    return genericCards.map(card => ({
      id: card.id,
      emoji: card.item as string,
      isFlipped: card.isFlipped,
      isMatched: card.isMatched
    }));
  };

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

  // הוספת פונקציה שמדברת "כל הכבוד!" - שימוש בפונקציה גנרית
  const speakCongrats = () => {
    speakText("כל הכבוד!");
  };

  // הוספת פונקציה שמדברת בסיום המשחק - שימוש בפונקציה גנרית
  const speakGameEnd = () => {
    speakText("מעולה, פתרתם את הכל! האם תרצו משחק נוסף או משחק אחר?");
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
    }, GAME_CONSTANTS.MEMORY_GAME.FLIP_DURATION);
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