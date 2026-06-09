'use client';

import { useRef, useEffect } from 'react';

export function useToastTimer(duration: number, onExpire?: () => void) {
  const barRef = useRef<HTMLDivElement>(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!barRef.current || duration <= 0) return;
    const el = barRef.current;
    el.style.transition = 'none';
    el.style.width = '100%';
    void el.offsetWidth;
    el.style.transition = `width ${duration}ms linear`;
    el.style.width = '0%';
  }, [duration]);

  // Auto-dismiss after duration — callback kept fresh via ref so timeout never re-fires
  useEffect(() => {
    if (duration <= 0) return;
    const id = setTimeout(() => onExpireRef.current?.(), duration);
    return () => clearTimeout(id);
  }, [duration]);

  return { barRef };
}
