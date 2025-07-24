import { useState, useEffect } from "react";
import { Tool, ToolGameState } from "@/lib/types/game";
import { initSpeechAndAudio } from "@/lib/utils/enhancedSpeechUtils";
import { 
  delay, 
  playSuccessSound as playSound, 
  generateOptions as generateGameOptions,
  getRandomItem,
  speakItemName,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage
} from "@/lib/utils/gameUtils";
import { GAME_CONSTANTS, TOOL_HEBREW_PRONUNCIATIONS, TOOL_GAME_CONSTANTS } from "@/lib/constants/gameConstants";

export function useToolGame(tools: Tool[]) {
  const [gameState, setGameState] = useState<ToolGameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

  // --- Utility Functions ---
  const getAvailableTools = (): Tool[] => {
    const baseTools = TOOL_GAME_CONSTANTS.BASE_TOOL_COUNT;
    const additionalTools = Math.floor((gameState.level - 1) / TOOL_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * TOOL_GAME_CONSTANTS.TOOL_INCREMENT;
    const totalTools = Math.min(baseTools + additionalTools, tools.length);
    return tools.slice(0, totalTools);
  };

  const generateOptions = (correctTool: Tool): Tool[] => {
    const availableTools = getAvailableTools();
    return generateGameOptions(correctTool, availableTools, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---
  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakToolName = async (toolName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(toolName, (name) => {
        const pronunciation = TOOL_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
    } catch (error) {
      console.error("Error playing tool name:", error);
    }
  };

  const startGame = async () => {
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false,
      options: [],
    });

    await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
    await speakStartMessage();
    
    const availableTools = getAvailableTools();
    const randomTool = getRandomItem(availableTools);
    const options = generateOptions(randomTool);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomTool,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakToolName(randomTool.name);
  };

  const handleToolClick = async (selectedTool: Tool) => {
    if (!gameState.currentChallenge) return;

    if (selectedTool.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableTools = getAvailableTools();
      const randomTool = getRandomItem(availableTools);
      const options = generateOptions(randomTool);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomTool,
          options,
        }));
        
        await delay(300);
        await speakToolName(randomTool.name);
      };
      
      await handleCorrectGameAnswer(gameState, setGameState, onComplete);
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakToolName(gameState.currentChallenge.name);
        }
      });
    }
  };

  const resetGame = () => {
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
      options: [],
    });
  };

  return {
    gameState,
    speakToolName,
    startGame,
    handleToolClick,
    resetGame,
    getAvailableTools,
  };
}
