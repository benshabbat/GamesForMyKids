import { useState, useEffect } from 'react';

interface UseBubbleParams {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  frequency: number;
  onPop: (id: number, frequency: number) => void;
}

export function useBubble({ id, x, y, size, speed, frequency, onPop }: UseBubbleParams) {
  const [position, setPosition] = useState({ x, y });
  const [isPopped, setIsPopped] = useState(false);

  // תנועת הבועה כלפי מעלה
  useEffect(() => {
    if (isPopped) return;
    const interval = setInterval(() => {
      setPosition(prev => ({ x: prev.x, y: prev.y - speed }));
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, [speed, isPopped]);

  // הסרה כשיוצאת מהמסך
  useEffect(() => {
    if (position.y < -size) {
      onPop(id, 0);
    }
  }, [position.y, size, id, onPop]);

  const handleClick = () => {
    if (isPopped) return;
    setIsPopped(true);
    onPop(id, frequency);
  };

  return { position, isPopped, handleClick };
}
