'use client';

import { 
  ColorPicker, 
  ShapeCreator, 
  ActionButtons, 
  SettingsPanel, 
  BlockRenderer, 
  ParticleSystem 
} from '@/components/game/building';
import { useBuildingGame } from './hooks';
import { SHAPE_ICONS } from './constants';

export default function BuildingGame() {
  const game = useBuildingGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 p-2 md:p-4 relative overflow-hidden no-select">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl md:text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0s' }}>🌟</div>
        <div className="absolute top-32 right-20 text-2xl md:text-4xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>🎨</div>
        <div className="absolute bottom-20 left-32 text-3xl md:text-5xl opacity-20 animate-bounce" style={{ animationDelay: '2s' }}>🏗️</div>
      </div>

      {/* Particles */}
      <ParticleSystem particles={game.particles} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with score and achievements */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4 drop-shadow-xl animate-pulse">
            🏗️ סטודיו הבנייה הקסום 🏗️
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-6 mb-2 md:mb-4">
            <div className="bg-yellow-400/90 backdrop-blur-sm rounded-xl px-3 py-1 md:px-4 md:py-2">
              <span className="text-lg md:text-xl font-bold text-gray-800">ניקוד: {game.score}</span>
            </div>
            {game.achievements.length > 0 && (
              <div className="bg-purple-400/90 backdrop-blur-sm rounded-xl px-3 py-1 md:px-4 md:py-2">
                <span className="text-white font-bold text-sm md:text-base">🏆 הישגים: {game.achievements.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
          {/* Color Picker */}
          <ColorPicker 
            colors={game.COLORS}
            selectedColor={game.selectedColor}
            onColorSelect={game.handleColorSelect}
          />

          {/* Shape Creation */}
          <ShapeCreator 
            shapes={game.SHAPES}
            shapeIcons={SHAPE_ICONS}
            selectedColor={game.selectedColor}
            selectedTool={game.selectedTool}
            onCreateBlock={game.createBlock}
            onToolSelect={game.handleToolSelect}
          />

          {/* Action Buttons */}
          <ActionButtons 
            historyIndex={game.historyIndex}
            historyLength={game.history.length}
            onMagicShuffle={game.magicShuffle}
            onClearAll={game.clearAll}
            onUndo={game.undo}
            onRedo={game.redo}
          />

          {/* Settings & Save */}
          <SettingsPanel 
            soundEnabled={game.soundEnabled}
            showGrid={game.showGrid}
            animationMode={game.animationMode}
            selectedSize={game.selectedSize}
            selectedBlock={game.selectedBlock}
            onToggleSound={() => game.setSoundEnabled(!game.soundEnabled)}
            onToggleGrid={() => game.setShowGrid(!game.showGrid)}
            onToggleAnimation={() => game.setAnimationMode(!game.animationMode)}
            onSizeChange={game.handleSizeChange}
            onSelectedBlockSizeChange={game.updateSelectedBlockSize}
            onSave={game.saveCreation}
          />
        </div>

        {/* Enhanced Building Canvas */}
        <div
          ref={game.canvasRef}
          className="relative bg-white/10 backdrop-blur-sm rounded-3xl border-4 border-white/30 overflow-hidden shadow-2xl touch-manipulation h-96 md:h-[600px]"
          style={{ 
            width: '100%',
            backgroundImage: game.showGrid ? 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)' : 'none',
            backgroundSize: game.showGrid ? '20px 20px' : 'auto'
          }}
          onMouseMove={game.handleMouseMove}
          onMouseUp={game.handleMouseUp}
          onMouseLeave={game.handleMouseUp}
          onTouchMove={game.handleTouchMove}
          onTouchEnd={game.handleTouchEnd}
          onClick={game.deselectBlock}
        >
          {game.blocks.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white/80">
                <div className="text-6xl md:text-8xl mb-4 md:mb-6 animate-bounce">🎨</div>
                <p className="text-xl md:text-2xl font-bold mb-2">ברוכים הבאים לסטודיו הקסום!</p>
                <p className="text-base md:text-lg">בחר צבע ולחץ על הצורות כדי להתחיל לבנות</p>
                <p className="text-sm md:text-md mt-2 opacity-75">💡 טיפ: לחץ פעמיים על צורה כדי לסובב אותה!</p>
                <p className="text-sm md:text-md mt-1 opacity-75">🎯 טיפ: לחץ פעם אחת על צורה כדי לבחור ולשנות גודל!</p>
              </div>
            </div>
          )}
          
          {game.blocks.map(block => (
            <BlockRenderer 
              key={block.id}
              block={block}
              isDragged={game.dragState?.draggedBlock?.id === block.id}
              isSelected={game.selectedBlock?.id === block.id}
              onMouseDown={game.handleMouseDown}
              onTouchStart={game.handleTouchStart}
              onDoubleClick={game.handleDoubleClick}
              onRotate={game.handleRotate}
              onSelect={game.handleBlockClick}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-4 md:mt-6 text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 inline-block max-w-4xl">
            <h3 className="text-white font-bold text-lg md:text-xl mb-3 md:mb-4">מדריך המשחק המתקדם</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-white/90">
              <div>
                <h4 className="font-semibold mb-2 text-sm md:text-base">🎨 צבעים:</h4>
                <ul className="text-xs md:text-sm space-y-1">
                  <li>• בחר צבע מהפלטה</li>
                  <li>• הצבע הנבחר יושפע על הצורות החדשות</li>
                  <li>• כל צורה תיצבע בצבע הנבחר</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm md:text-base">🎮 בניה:</h4>
                <ul className="text-xs md:text-sm space-y-1">
                  <li>• לחץ על צורות להוספה</li>
                  <li>• גרור צורות עם העכבר/אצבע</li>
                  <li>• לחץ על צורה לבחירה</li>
                  <li>• העבר עכבר על צורה ולחץ על ⟲ לסיבוב</li>
                  <li>• לחץ פעמיים לסיבוב מהיר של 90°</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm md:text-base">📐 גדלים:</h4>
                <ul className="text-xs md:text-sm space-y-1">
                  <li>• קבע גודל לצורות חדשות</li>
                  <li>• בחר צורה ושנה את הגודל</li>
                  <li>• טווח: 0.5x עד 3x</li>
                  <li>• צורה נבחרת מודגשת בכתום</li>
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
