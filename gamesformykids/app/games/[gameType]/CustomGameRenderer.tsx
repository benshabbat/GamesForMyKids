'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import GameSpinnerScreen from '@/components/ui/GameSpinnerScreen';

const ssr = { ssr: false } as const;

const GAME_CLIENTS: Record<string, ComponentType> = {
  arithmetic:        dynamic(() => import('../arithmetic/ArithmeticGameClient'),              ssr),
  'balloon-pop':     dynamic(() => import('../balloon-pop/BalloonPopClient'),                 ssr),
  'brick-breaker':   dynamic(() => import('../brick-breaker/BrickBreakerClient'),             ssr),
  bubbles:           dynamic(() => import('../bubbles/components/BubbleGame')),
  building:          dynamic(() => import('../building/BuildingGameClient'),                   ssr),
  'catch-fruit':     dynamic(() => import('../catch-fruit/CatchFruitClient'),                 ssr),
  checkers:          dynamic(() => import('../checkers/DamkaClient'),                          ssr),
  chess:             dynamic(() => import('../chess/ChessClient'),                             ssr),
  'color-tap':       dynamic(() => import('../color-tap/ColorTapClient'),                     ssr),
  coloring:          dynamic(() => import('../coloring/ColoringGameClient')),
  'dino-runner':     dynamic(() => import('../dino-runner/DinoRunnerClient'),                 ssr),
  drawing:           dynamic(() => import('../drawing/components/DrawingGameClient'),          ssr),
  'emoji-math':      dynamic(() => import('../emoji-math/EmojiMathClient'),                   ssr),
  'flappy-bird':     dynamic(() => import('../flappy-bird/FlappyBirdClient'),                 ssr),
  frogger:           dynamic(() => import('../frogger/FroggerClient'),                        ssr),
  'hebrew-letters':  dynamic(() => import('../hebrew-letters/components/hub/HebrewLettersHub')),
  jumper:            dynamic(() => import('../jumper/JumperClient'),                           ssr),
  'math-race':       dynamic(() => import('../math-race/MathRaceClient'),                     ssr),
  memory:            dynamic(() => import('../memory/MemoryClient'),                           ssr),
  'meteor-dodge':    dynamic(() => import('../meteor-dodge/MeteorDodgeClient'),               ssr),
  multiplication:    dynamic(() => import('../multiplication/MultiplicationGameClient')),
  'number-bubbles':  dynamic(() => import('../number-bubbles/NumberBubblesClient')),
  pong:              dynamic(() => import('../pong/PongClient'),                               ssr),
  puzzles:           dynamic(() => import('../puzzles/PuzzlesClient'),                         ssr),
  reflex:            dynamic(() => import('../reflex/ReflexGameClient'),                       ssr),
  'shesh-besh':      dynamic(() => import('../shesh-besh/SheshBeshClient'),                   ssr),
  simon:             dynamic(() => import('../simon/SimonClient'),                             ssr),
  snake:             dynamic(() => import('../snake/SnakeClient'),                             ssr),
  'space-defender':  dynamic(() => import('../space-defender/SpaceDefenderClient'),           ssr),
  stack:             dynamic(() => import('../stack/StackClient'),                             ssr),
  taki:              dynamic(() => import('../taki/TakiClient'),                               ssr),
  tetris:            dynamic(() => import('../tetris/components/TetrisGame'),                  ssr),
  'true-false':      dynamic(() => import('../true-false/TrueFalseClient')),
  tzedakah:          dynamic(() => import('../tzedakah/CharityCoinGame')),
  'whack-a-mole':    dynamic(() => import('../whack-a-mole/WhackAMoleClient'),               ssr),
  'word-builder':    dynamic(() => import('../word-builder/WordBuilderGameClient')),
  'word-scramble':   dynamic(() => import('../word-scramble/WordScrambleClient')),
};

interface Props { gameType: string; }

export default function CustomGameRenderer({ gameType }: Props) {
  const Component = GAME_CLIENTS[gameType];
  if (!Component) return null;
  return (
    <Suspense fallback={<GameSpinnerScreen />}>
      <Component />
    </Suspense>
  );
}
