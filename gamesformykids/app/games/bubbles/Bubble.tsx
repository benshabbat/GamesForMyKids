import { useEffect, useState } from 'react';

interface BubbleProps {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  frequency: number;
  onPop: (id: number, frequency: number) => void;
}

export default function Bubble({ id, x, y, size, color, speed, frequency, onPop }: BubbleProps) {
  const [position, setPosition] = useState({ x, y });
  const [isPopped, setIsPopped] = useState(false);

  useEffect(() => {
    if (isPopped) return;

    const interval = setInterval(() => {
      setPosition(prev => ({
        x: prev.x,
        y: prev.y - speed
      }));
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [speed, isPopped]);

  // הסרת בועה כשהיא יוצאת מהמסך
  useEffect(() => {
    if (position.y < -size) {
      onPop(id, 0); // ללא צליל כשהבועה יוצאת מהמסך
    }
  }, [position.y, size, id, onPop]);

  const handleClick = () => {
    if (isPopped) return;
    
    setIsPopped(true);
    onPop(id, frequency);
  };

  if (isPopped) {
    return null;
  }

  return (
    <div
      className="absolute cursor-pointer transform hover:scale-110 transition-transform duration-200"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
      }}
      onClick={handleClick}
    >
      <div
        className="w-full h-full rounded-full shadow-lg animate-pulse"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${color})`,
          border: `2px solid rgba(255,255,255,0.3)`,
        }}
      >
        {/* אפקט ברק על הבועה */}
        <div
          className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60"
          style={{ width: size * 0.15, height: size * 0.15 }}
        />
      </div>
    </div>
  );
}