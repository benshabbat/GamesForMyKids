'use client';
import { useChooseAdventure } from './useChooseAdventure';
import StoryMenu from './components/StoryMenu';
import StoryPage from './components/StoryPage';

export default function ChooseAdventureClient() {
  const {
    phase, stories, currentStory, currentNode,
    selectStory, makeChoice, returnToMenu, readAgain, getEndingsCount,
  } = useChooseAdventure();

  if ((phase === 'story' || phase === 'ending') && currentStory && currentNode) {
    return (
      <StoryPage
        story={currentStory}
        node={currentNode}
        phase={phase}
        onChoice={makeChoice}
        onReadAgain={readAgain}
        onMenu={returnToMenu}
      />
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fdf4ff 100%)' }}
    >
      <StoryMenu
        stories={stories}
        getEndingsCount={getEndingsCount}
        onSelect={selectStory}
      />
    </div>
  );
}
