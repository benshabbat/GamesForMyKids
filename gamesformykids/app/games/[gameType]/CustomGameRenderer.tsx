'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

const GAME_CLIENTS: Record<string, ComponentType> = {
  arithmetic:        dynamic(() => import('../arithmetic/ArithmeticGameClient')),
  'balloon-pop':     dynamic(() => import('../balloon-pop/BalloonPopClient')),
  'brick-breaker':   dynamic(() => import('../brick-breaker/BrickBreakerClient')),
  bubbles:           dynamic(() => import('../bubbles/components/BubbleGame')),
  building:          dynamic(() => import('../building/BuildingGameClient')),
  'catch-fruit':     dynamic(() => import('../catch-fruit/CatchFruitClient')),
  checkers:          dynamic(() => import('../checkers/DamkaClient')),
  chess:             dynamic(() => import('../chess/ChessClient')),
  'color-tap':       dynamic(() => import('../color-tap/ColorTapClient')),
  coloring:          dynamic(() => import('../coloring/ColoringGameClient')),
  'dino-runner':     dynamic(() => import('../dino-runner/DinoRunnerClient')),
  drawing:           dynamic(() => import('../drawing/components/DrawingGameClient')),
  'emoji-math':      dynamic(() => import('../emoji-math/EmojiMathClient')),
  'flappy-bird':     dynamic(() => import('../flappy-bird/FlappyBirdClient')),
  frogger:           dynamic(() => import('../frogger/FroggerClient')),
  geography:         dynamic(() => import('../geography/GeographyClient')),
  'hebrew-letters':  dynamic(() => import('../hebrew-letters/components/hub/HebrewLettersHub')),
  jumper:            dynamic(() => import('../jumper/JumperClient')),
  'math-race':       dynamic(() => import('../math-race/MathRaceClient')),
  memory:            dynamic(() => import('../memory/MemoryClient')),
  'meteor-dodge':    dynamic(() => import('../meteor-dodge/MeteorDodgeClient')),
  multiplication:    dynamic(() => import('../multiplication/MultiplicationGameClient')),
  'number-bubbles':  dynamic(() => import('../number-bubbles/NumberBubblesClient')),
  pong:              dynamic(() => import('../pong/PongClient')),
  puzzles:           dynamic(() => import('../puzzles/PuzzlesClient')),
  reflex:            dynamic(() => import('../reflex/ReflexGameClient')),
  'shesh-besh':      dynamic(() => import('../shesh-besh/SheshBeshClient')),
  simon:             dynamic(() => import('../simon/SimonClient')),
  snake:             dynamic(() => import('../snake/SnakeClient')),
  soccer:            dynamic(() => import('../soccer/SoccerGameClient')),
  'space-defender':  dynamic(() => import('../space-defender/SpaceDefenderClient')),
  stack:             dynamic(() => import('../stack/StackClient')),
  taki:              dynamic(() => import('../taki/TakiClient')),
  tetris:            dynamic(() => import('../tetris/components/TetrisGame')),
  'true-false':      dynamic(() => import('../true-false/TrueFalseClient')),
  tzedakah:          dynamic(() => import('../tzedakah/CharityCoinGame')),
  'whack-a-mole':    dynamic(() => import('../whack-a-mole/WhackAMoleClient')),
  'word-builder':    dynamic(() => import('../word-builder/WordBuilderGameClient')),
  'word-scramble':   dynamic(() => import('../word-scramble/WordScrambleClient')),
};

interface Props { gameType: string; }

export default function CustomGameRenderer({ gameType }: Props) {
  const Component = GAME_CLIENTS[gameType];
  if (!Component) return null;
  return <Component />;
}
