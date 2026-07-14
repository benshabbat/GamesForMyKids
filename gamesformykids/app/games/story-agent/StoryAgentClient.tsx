'use client';
import { useStoryAgent } from './useStoryAgent';
import StoryAgentMenu from './components/StoryAgentMenu';
import StoryAgentScreen from './components/StoryAgentScreen';

export default function StoryAgentClient() {
  const {
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
  } = useStoryAgent();

  if (phase === 'menu') {
    return <StoryAgentMenu onStart={startStory} />;
  }

  return (
    <StoryAgentScreen
      phase={phase}
      current={current}
      pointsAwarded={pointsAwarded}
      error={error}
      imageUrl={imageUrl}
      imageLoading={imageLoading}
      onChoice={choose}
      onRetry={retry}
      onMenu={returnToMenu}
    />
  );
}
