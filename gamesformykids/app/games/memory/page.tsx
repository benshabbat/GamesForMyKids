'use client';

import React, { useState } from 'react';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGamePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const emojis: string[] = ['🐱', '🐶', '🐰', '🦊', '🐻', '🐼'];

  const initializeGame = (): void => {
    const gameCards: Card[] = [...emojis, ...emojis]
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsGameStarted(true);
  };

  const handleCardClick = (cardId: number): void => {
    if (flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true }
              : c
          ));
          setMatchedPairs(prev => [...prev, firstCard.emoji]);
          setFlippedCards([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const isGameWon: boolean = matchedPairs.length === emojis.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">משחק זיכרון 🧠</h1>
          <p className="text-xl text-purple-600 mb-6">מצא את הזוגות הזהים!</p>
          
          {!isGameStarted ? (
            <button
              onClick={initializeGame}
              className="px-8 py-4 bg-pink-500 text-white rounded-full text-2xl font-bold hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              התחל משחק! 🎮
            </button>
          ) : (
            <div className="mb-6">
              <p className="text-lg text-purple-700">
                זוגות שנמצאו: {matchedPairs.length} / {emojis.length}
              </p>
              <button
                onClick={initializeGame}
                className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300"
              >
                משחק חדש
              </button>
            </div>
          )}
        </div>

        {isGameWon && (
          <div className="text-center mb-8 p-6 bg-yellow-200 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-yellow-800 mb-2">🎉 כל הכבוד! 🎉</h2>
            <p className="text-xl text-yellow-700">מצאת את כל הזוגות!</p>
          </div>
        )}

        {isGameStarted && (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`
                  aspect-square rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg
                  ${card.isFlipped || card.isMatched 
                    ? 'bg-white' 
                    : 'bg-gradient-to-br from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500'
                  }
                  ${card.isMatched ? 'ring-4 ring-green-400' : ''}
                `}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {card.isFlipped || card.isMatched ? (
                    <span className="text-4xl md:text-6xl">{card.emoji}</span>
                  ) : (
                    <span className="text-2xl md:text-3xl">❓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}