'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  ColorPicker, 
  ShapeCreator, 
  ActionButtons, 
  SettingsPanel, 
  BlockRenderer, 
  ParticleSystem 
} from '@/components/game/building';

interface Block {
  id: string;
  x: number;
  y: number;
  color: string;
  shape: 'square' | 'rectangle' | 'triangle' | 'circle' | 'star' | 'heart' | 'diamond';
  rotation: number;
  scale: number;
  shadow: boolean;
  sparkles: boolean;
}

interface DragState {
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  draggedBlock: Block | null;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
  '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
  '#FD79A8', '#6C5CE7', '#A29BFE', '#74B9FF', '#00B894',
  '#E17055', '#81ECEC', '#74B9FF', '#A29BFE', '#FD79A8'
];

const SHAPES = ['square', 'rectangle', 'triangle', 'circle', 'star', 'heart', 'diamond'] as const;

const SHAPE_ICONS = {
  square: '⬜',
  rectangle: '▬',
  triangle: '🔺',
  circle: '⭕',
  star: '⭐',
  heart: '❤️',
  diamond: '💎'
};

export default function BuildingGame() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [history, setHistory] = useState<Block[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    draggedBlock: null
  });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedTool, setSelectedTool] = useState<'normal' | 'magic' | 'rainbow'>('normal');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [showGrid, setShowGrid] = useState(false);
  const [animationMode, setAnimationMode] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nextId, setNextId] = useState(1);
  const [score, setScore] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);

  // Particle animation
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.5,
          life: p.life - 1,
          size: Math.max(0, p.size - 0.2)
        }))
        .filter(p => p.life > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [particles.length]);

  // Block animation
  useEffect(() => {
    if (!animationMode) return;

    const interval = setInterval(() => {
      setBlocks(prev => prev.map(block => ({
        ...block,
        rotation: (block.rotation + 2) % 360
      })));
    }, 100);

    return () => clearInterval(interval);
  }, [animationMode]);

  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    // Sound effects would be implemented here
  }, [soundEnabled]);

  const addToHistory = useCallback((newBlocks: Block[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newBlocks]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const createParticles = useCallback((x: number, y: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 10; i++) {
      newParticles.push({
        id: `particle-${Date.now()}-${i}`,
        x: x + 30,
        y: y + 30,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * -8 - 2,
        life: 30,
        color,
        size: Math.random() * 4 + 2
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  const getBlockColor = useCallback(() => {
    switch (selectedTool) {
      case 'rainbow':
        return `hsl(${Math.random() * 360}, 80%, 60%)`;
      case 'magic':
        return selectedColor;
      default:
        return selectedColor;
    }
  }, [selectedTool, selectedColor]);

  const createBlock = useCallback((shape: Block['shape']) => {
    const newBlock: Block = {
      id: `block-${nextId}`,
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50,
      color: getBlockColor(),
      shape,
      rotation: selectedTool === 'magic' ? Math.random() * 360 : 0,
      scale: selectedTool === 'magic' ? 0.8 + Math.random() * 0.4 : 1,
      shadow: selectedTool === 'magic',
      sparkles: selectedTool === 'magic'
    };

    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    addToHistory(newBlocks);
    setNextId(prev => prev + 1);
    setScore(prev => prev + 10);
    playSound();
    createParticles(newBlock.x, newBlock.y, newBlock.color);

    // Check achievements
    if (newBlocks.length === 10 && !achievements.includes('builder')) {
      setAchievements(prev => [...prev, 'builder']);
    }
    if (newBlocks.filter(b => b.shape === 'star').length >= 5 && !achievements.includes('star-collector')) {
      setAchievements(prev => [...prev, 'star-collector']);
    }
  }, [nextId, blocks, selectedTool, getBlockColor, addToHistory, achievements, playSound, createParticles]);

  const handleMouseDown = useCallback((e: React.MouseEvent, block: Block) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left - block.x;
    const offsetY = e.clientY - rect.top - block.y;

    setDragState({
      isDragging: true,
      dragOffset: { x: offsetX, y: offsetY },
      draggedBlock: block
    });

    setBlocks(prev => {
      const filtered = prev.filter(b => b.id !== block.id);
      return [...filtered, block];
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedBlock) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newX = e.clientX - rect.left - dragState.dragOffset.x;
    const newY = e.clientY - rect.top - dragState.dragOffset.y;

    setBlocks(prev => prev.map(block =>
      block.id === dragState.draggedBlock!.id
        ? { 
            ...block, 
            x: showGrid ? Math.round(Math.max(0, Math.min(newX, rect.width - 60)) / 20) * 20 : Math.max(0, Math.min(newX, rect.width - 60)),
            y: showGrid ? Math.round(Math.max(0, Math.min(newY, rect.height - 60)) / 20) * 20 : Math.max(0, Math.min(newY, rect.height - 60))
          }
        : block
    ));
  }, [dragState, showGrid]);

  const handleMouseUp = useCallback(() => {
    if (dragState.isDragging && dragState.draggedBlock) {
      addToHistory(blocks);
    }
    setDragState({
      isDragging: false,
      dragOffset: { x: 0, y: 0 },
      draggedBlock: null
    });
  }, [dragState, blocks, addToHistory]);

  const handleDoubleClick = useCallback((block: Block) => {
    setBlocks(prev => prev.map(b => 
      b.id === block.id 
        ? { ...b, rotation: (b.rotation + 90) % 360, sparkles: true }
        : b
    ));
    createParticles(block.x, block.y, block.color);
  }, [createParticles]);

  const handleRotate = useCallback((block: Block) => {
    setBlocks(prev => {
      const newBlocks = prev.map(b => 
        b.id === block.id 
          ? { ...b, rotation: (b.rotation + 45) % 360 }
          : b
      );
      addToHistory(newBlocks);
      return newBlocks;
    });
    createParticles(block.x, block.y, block.color);
  }, [addToHistory, createParticles]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setBlocks([...history[newIndex]]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setBlocks([...history[newIndex]]);
    }
  }, [history, historyIndex]);

  const clearAll = useCallback(() => {
    setBlocks([]);
    addToHistory([]);
    setParticles([]);
    playSound();
  }, [addToHistory, playSound]);

  const magicShuffle = useCallback(() => {
    setBlocks(prev => prev.map(block => ({
      ...block,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
      sparkles: true
    })));
    playSound();
    
    // Create particles for all blocks
    blocks.forEach(block => {
      createParticles(block.x, block.y, block.color);
    });
  }, [blocks, playSound, createParticles]);

  const saveCreation = useCallback(() => {
    const data = {
      blocks,
      timestamp: new Date().toISOString(),
      score
    };
    console.log('Saving creation:', data);
    // Here you would implement actual saving functionality
    alert('יצירה נשמרה! 🎉');
  }, [blocks, score]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0s' }}>🌟</div>
        <div className="absolute top-32 right-20 text-4xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>🎨</div>
        <div className="absolute bottom-20 left-32 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '2s' }}>🏗️</div>
      </div>

      {/* Particles */}
      <ParticleSystem particles={particles} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with score and achievements */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-xl animate-pulse">
            🏗️ סטודיו הבנייה הקסום 🏗️
          </h1>
          <div className="flex justify-center items-center gap-6 mb-4">
            <div className="bg-yellow-400/90 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-xl font-bold text-gray-800">ניקוד: {score}</span>
            </div>
            {achievements.length > 0 && (
              <div className="bg-purple-400/90 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="text-white font-bold">🏆 הישגים: {achievements.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {/* Color Picker */}
          <ColorPicker 
            colors={COLORS}
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />

          {/* Shape Creation */}
          <ShapeCreator 
            shapes={SHAPES}
            shapeIcons={SHAPE_ICONS}
            selectedColor={selectedColor}
            selectedTool={selectedTool}
            onCreateBlock={createBlock}
            onToolSelect={setSelectedTool}
          />

          {/* Action Buttons */}
          <ActionButtons 
            historyIndex={historyIndex}
            historyLength={history.length}
            onMagicShuffle={magicShuffle}
            onClearAll={clearAll}
            onUndo={undo}
            onRedo={redo}
          />

          {/* Settings & Save */}
          <SettingsPanel 
            soundEnabled={soundEnabled}
            showGrid={showGrid}
            animationMode={animationMode}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            onToggleGrid={() => setShowGrid(!showGrid)}
            onToggleAnimation={() => setAnimationMode(!animationMode)}
            onSave={saveCreation}
          />
        </div>

        {/* Enhanced Building Canvas */}
        <div
          ref={canvasRef}
          className="relative bg-white/10 backdrop-blur-sm rounded-3xl border-4 border-white/30 overflow-hidden shadow-2xl"
          style={{ 
            height: '600px', 
            width: '100%',
            backgroundImage: showGrid ? 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)' : 'none',
            backgroundSize: showGrid ? '20px 20px' : 'auto'
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {blocks.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white/80">
                <div className="text-8xl mb-6 animate-bounce">🎨</div>
                <p className="text-2xl font-bold mb-2">ברוכים הבאים לסטודיו הקסום!</p>
                <p className="text-lg">בחר צבע ולחץ על הצורות כדי להתחיל לבנות</p>
                <p className="text-md mt-2 opacity-75">💡 טיפ: לחץ פעמיים על צורה כדי לסובב אותה!</p>
              </div>
            </div>
          )}
          
          {blocks.map(block => (
            <BlockRenderer 
              key={block.id}
              block={block}
              isDragged={dragState.draggedBlock?.id === block.id}
              onMouseDown={handleMouseDown}
              onDoubleClick={handleDoubleClick}
              onRotate={handleRotate}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block max-w-4xl">
            <h3 className="text-white font-bold text-xl mb-4">מדריך המשחק המתקדם</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90">
              <div>
                <h4 className="font-semibold mb-2">🎨 צבעים:</h4>
                <ul className="text-sm space-y-1">
                  <li>• בחר צבע מהפלטה</li>
                  <li>• הצבע הנבחר יושפע על הצורות החדשות</li>
                  <li>• כל צורה תיצבע בצבע הנבחר</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎮 בניה:</h4>
                <ul className="text-sm space-y-1">
                  <li>• לחץ על צורות להוספה</li>
                  <li>• גרור צורות עם העכבר</li>
                  <li>• העבר עכבר על צורה ולחץ על ⟲ לסיבוב</li>
                  <li>• לחץ פעמיים לסיבוב מהיר של 90°</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✨ כלים מיוחדים:</h4>
                <ul className="text-sm space-y-1">
                  <li>• רגיל: צורות עם הצבע הנבחר</li>
                  <li>• קסם: אפקטים מיוחדים</li>
                  <li>• קשת: צבעים אקראיים</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
