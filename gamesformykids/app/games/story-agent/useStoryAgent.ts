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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const historyRef = useRef<HistoryEntry[]>([]);
  const lastChoiceRef = useRef<string | undefined>(undefined);
  const imageRequestIdRef = useRef(0);

  const fetchImage = useCallback(async (prompt: string) => {
    const requestId = ++imageRequestIdRef.current;
    setImageUrl(null);
    setImageLoading(true);
    try {
      const res = await fetch('/api/story-agent/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data: { success: boolean; imageDataUrl?: string } = await res.json();
      if (requestId !== imageRequestIdRef.current) return;
      if (data.success && data.imageDataUrl) {
        setImageUrl(data.imageDataUrl);
      }
    } catch {
      // Illustration is decorative — a failure here shouldn't block the story.
    } finally {
      if (requestId === imageRequestIdRef.current) setImageLoading(false);
    }
  }, []);

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
      fetchImage(data.agentResponse.imagePrompt);
    } catch {
      setError('בעיה בחיבור לשרת, נסה שוב');
      setPhase('error');
    }
  }, [fetchImage]);

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
    imageRequestIdRef.current++;
    setPhase('menu');
    setCurrent(null);
    setPointsAwarded(null);
    setError(null);
    setImageUrl(null);
    setImageLoading(false);
  }, []);

  return {
    phase,
    current,
    pointsAwarded,
    error,
    imageUrl,
    imageLoading,
    startStory,
    choose,
    retry,
    returnToMenu,
  };
}
