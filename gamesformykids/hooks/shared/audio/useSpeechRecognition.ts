'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

interface UseSpeechRecognitionOptions {
  lang?: string;
  onResult?: (result: SpeechRecognitionResult) => void;
  onError?: (error: string) => void;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultItem {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionEvent extends Event {
  results: ArrayLike<SpeechRecognitionResultItem>;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function useSpeechRecognition({
  lang = 'he-IL',
  onResult,
  onError,
}: UseSpeechRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    setIsSupported(getSpeechRecognitionCtor() !== null);
  }, []);

  const startListening = useCallback(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results = Array.from(event.results);
      const best = results[results.length - 1];
      if (best) {
        onResult?.({
          transcript: best[0]!.transcript,
          isFinal: best.isFinal,
        });
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setPermissionDenied(true);
      }
      onError?.(event.error);
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      setIsListening(false);
    }
  }, [lang, onResult, onError]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  return { isListening, isSupported, permissionDenied, startListening, stopListening };
}
