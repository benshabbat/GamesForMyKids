'use client';
import { useCallback, useRef, useState } from 'react';
import type { StoryResponse, StoryAgentRequest, StoryAgentResponse } from '@/app/api/story-agent/route';

export type StoryAgentPhase = 'menu' | 'loading' | 'story' | 'ending' | 'error';

type HistoryEntry = StoryAgentRequest['history'][number];

export function useStoryAgent() {
  const [phase, setPhase] = useState<StoryAgentPhase>('menu');
  const [current, setCurrent] = useState<StoryResponse | null>(null);
  const [pointsAwarded, setPointsAwarded] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const historyRef = useRef<HistoryEntry[]>([]);
  const lastChoiceRef = useRef<string | undefined>(undefined);

  const requestNext = useCallback(async (userChoice: string | undefined) => {
    lastChoiceRef.current = userChoice;
    setPhase('loading');
    setError(null);
    try {
      const res = await fetch('/api/story-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: historyRef.current, userChoice }),
      });
      const data: StoryAgentResponse = await res.json();
      if (!data.success || !data.agentResponse) {
        setError(data.error ?? 'שגיאה לא צפויה, נסה שוב');
        setPhase('error');
        return;
      }
      historyRef.current = [
        ...historyRef.current,
        { role: 'user', parts: [{ text: userChoice ?? 'התחל סיפור חדש' }] },
        { role: 'model', parts: [{ text: JSON.stringify(data.agentResponse) }] },
      ];
      setCurrent(data.agentResponse);
      if (data.actionTriggered === 'awardPointsToUser' && data.actionData) {
        setPointsAwarded(data.actionData.newPointsBalance);
      }
      setPhase(data.agentResponse.isEnding ? 'ending' : 'story');
    } catch {
      setError('בעיה בחיבור לשרת, נסה שוב');
      setPhase('error');
    }
  }, []);

  const startStory = useCallback(() => {
    historyRef.current = [];
    setCurrent(null);
    setPointsAwarded(null);
    requestNext(undefined);
  }, [requestNext]);

  const choose = useCallback((choiceText: string) => {
    requestNext(choiceText);
  }, [requestNext]);

  const retry = useCallback(() => {
    requestNext(lastChoiceRef.current);
  }, [requestNext]);

  const returnToMenu = useCallback(() => {
    historyRef.current = [];
    lastChoiceRef.current = undefined;
    setPhase('menu');
    setCurrent(null);
    setPointsAwarded(null);
    setError(null);
  }, []);

  return { phase, current, pointsAwarded, error, startStory, choose, retry, returnToMenu };
}
