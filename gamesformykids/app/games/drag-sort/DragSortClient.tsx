'use client';

import { useDragSortStore } from './dragSortStore';
import { useDragSortDrag } from './useDragSortDrag';
import { DragSortMenuScreen } from './components/DragSortMenuScreen';
import { DragSortResultScreen } from './components/DragSortResultScreen';
import { DragSortPlayScreen } from './components/DragSortPlayScreen';

export default function DragSortClient() {
  const {
    phase, currentLevel, itemStates, score, errors, levelIndex,
    startLevel, restart, goToMenu,
  } = useDragSortStore();

  const { drag, hoverZone, toast, zoneRefs, ghostRef, handlePointerDown } = useDragSortDrag();

  if (phase === 'menu') return <DragSortMenuScreen onStart={startLevel} />;

  if (phase === 'result') {
    return (
      <DragSortResultScreen
        score={score}
        total={currentLevel?.items.length ?? 0}
        errors={errors}
        levelIndex={levelIndex}
        onRestart={restart}
        onNext={() => startLevel(levelIndex + 1)}
        onMenu={goToMenu}
      />
    );
  }

  if (!currentLevel) return null;

  return (
    <DragSortPlayScreen
      currentLevel={currentLevel}
      itemStates={itemStates}
      score={score}
      drag={drag}
      hoverZone={hoverZone}
      toast={toast}
      zoneRefs={zoneRefs}
      ghostRef={ghostRef}
      onPointerDown={handlePointerDown}
    />
  );
}
