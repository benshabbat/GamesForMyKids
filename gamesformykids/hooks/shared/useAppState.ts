/**
 * Simple global state management for games
 * Lightweight alternative to Redux for small app state
 */

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// Global app state interface
interface AppState {
  // Audio settings
  audioSettings: {
    masterVolume: number;
    soundEffectsVolume: number;
    musicVolume: number;
    speechVolume: number;
    muted: boolean;
  };
  
  // User preferences
  userPreferences: {
    theme: 'light' | 'dark' | 'auto';
    fontSize: 'small' | 'medium' | 'large';
    animations: boolean;
    language: 'he' | 'en';
  };
  
  // Game progress
  gameProgress: {
    totalGamesPlayed: number;
    totalTimePlayed: number;
    favoriteGames: string[];
    achievements: string[];
    lastPlayedGame: string | null;
  };
  
  // UI state
  uiState: {
    isLoading: boolean;
    currentGame: string | null;
    showTutorial: boolean;
    sidebarOpen: boolean;
  };
}

// Action types
type AppAction =
  | { type: 'SET_AUDIO_VOLUME'; payload: { type: keyof AppState['audioSettings']; volume: number } }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'SET_THEME'; payload: AppState['userPreferences']['theme'] }
  | { type: 'SET_FONT_SIZE'; payload: AppState['userPreferences']['fontSize'] }
  | { type: 'TOGGLE_ANIMATIONS' }
  | { type: 'SET_LANGUAGE'; payload: AppState['userPreferences']['language'] }
  | { type: 'INCREMENT_GAMES_PLAYED' }
  | { type: 'ADD_FAVORITE_GAME'; payload: string }
  | { type: 'REMOVE_FAVORITE_GAME'; payload: string }
  | { type: 'ADD_ACHIEVEMENT'; payload: string }
  | { type: 'SET_LAST_PLAYED_GAME'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_GAME'; payload: string | null }
  | { type: 'TOGGLE_TUTORIAL' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'RESET_GAME_PROGRESS' }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

// Initial state
const initialState: AppState = {
  audioSettings: {
    masterVolume: 0.7,
    soundEffectsVolume: 0.5,
    musicVolume: 0.3,
    speechVolume: 0.8,
    muted: false,
  },
  userPreferences: {
    theme: 'light',
    fontSize: 'medium',
    animations: true,
    language: 'he',
  },
  gameProgress: {
    totalGamesPlayed: 0,
    totalTimePlayed: 0,
    favoriteGames: [],
    achievements: [],
    lastPlayedGame: null,
  },
  uiState: {
    isLoading: false,
    currentGame: null,
    showTutorial: false,
    sidebarOpen: false,
  },
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_AUDIO_VOLUME':
      return {
        ...state,
        audioSettings: {
          ...state.audioSettings,
          [action.payload.type]: action.payload.volume,
        },
      };
      
    case 'TOGGLE_MUTE':
      return {
        ...state,
        audioSettings: {
          ...state.audioSettings,
          muted: !state.audioSettings.muted,
        },
      };
      
    case 'SET_THEME':
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          theme: action.payload,
        },
      };
      
    case 'SET_FONT_SIZE':
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          fontSize: action.payload,
        },
      };
      
    case 'TOGGLE_ANIMATIONS':
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          animations: !state.userPreferences.animations,
        },
      };
      
    case 'SET_LANGUAGE':
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          language: action.payload,
        },
      };
      
    case 'INCREMENT_GAMES_PLAYED':
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          totalGamesPlayed: state.gameProgress.totalGamesPlayed + 1,
        },
      };
      
    case 'ADD_FAVORITE_GAME':
      if (state.gameProgress.favoriteGames.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          favoriteGames: [...state.gameProgress.favoriteGames, action.payload],
        },
      };
      
    case 'REMOVE_FAVORITE_GAME':
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          favoriteGames: state.gameProgress.favoriteGames.filter(
            game => game !== action.payload
          ),
        },
      };
      
    case 'ADD_ACHIEVEMENT':
      if (state.gameProgress.achievements.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          achievements: [...state.gameProgress.achievements, action.payload],
        },
      };
      
    case 'SET_LAST_PLAYED_GAME':
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          lastPlayedGame: action.payload,
        },
      };
      
    case 'SET_LOADING':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          isLoading: action.payload,
        },
      };
      
    case 'SET_CURRENT_GAME':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          currentGame: action.payload,
        },
      };
      
    case 'TOGGLE_TUTORIAL':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          showTutorial: !state.uiState.showTutorial,
        },
      };
      
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          sidebarOpen: !state.uiState.sidebarOpen,
        },
      };
      
    case 'RESET_GAME_PROGRESS':
      return {
        ...state,
        gameProgress: initialState.gameProgress,
      };
      
    case 'LOAD_STATE':
      return {
        ...state,
        ...action.payload,
      };
      
    default:
      return state;
  }
}

// Context
const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
interface AppStateProviderProps {
  children: ReactNode;
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('gfmk_app_state');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      }
    } catch (error) {
      console.error('Failed to load app state:', error);
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('gfmk_app_state', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save app state:', error);
    }
  }, [state]);

  return React.createElement(
    AppStateContext.Provider,
    { value: { state, dispatch } },
    children
  );
}

// Hook to use app state
export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
}

// Convenience hooks for specific parts of state
export function useAudioSettings() {
  const { state, dispatch } = useAppState();
  
  return {
    audioSettings: state.audioSettings,
    setVolume: (type: keyof AppState['audioSettings'], volume: number) =>
      dispatch({ type: 'SET_AUDIO_VOLUME', payload: { type, volume } }),
    toggleMute: () => dispatch({ type: 'TOGGLE_MUTE' }),
  };
}

export function useUserPreferences() {
  const { state, dispatch } = useAppState();
  
  return {
    preferences: state.userPreferences,
    setTheme: (theme: AppState['userPreferences']['theme']) =>
      dispatch({ type: 'SET_THEME', payload: theme }),
    setFontSize: (fontSize: AppState['userPreferences']['fontSize']) =>
      dispatch({ type: 'SET_FONT_SIZE', payload: fontSize }),
    toggleAnimations: () => dispatch({ type: 'TOGGLE_ANIMATIONS' }),
    setLanguage: (language: AppState['userPreferences']['language']) =>
      dispatch({ type: 'SET_LANGUAGE', payload: language }),
  };
}

export function useGameProgress() {
  const { state, dispatch } = useAppState();
  
  return {
    progress: state.gameProgress,
    incrementGamesPlayed: () => dispatch({ type: 'INCREMENT_GAMES_PLAYED' }),
    addFavoriteGame: (game: string) => dispatch({ type: 'ADD_FAVORITE_GAME', payload: game }),
    removeFavoriteGame: (game: string) => dispatch({ type: 'REMOVE_FAVORITE_GAME', payload: game }),
    addAchievement: (achievement: string) => dispatch({ type: 'ADD_ACHIEVEMENT', payload: achievement }),
    setLastPlayedGame: (game: string) => dispatch({ type: 'SET_LAST_PLAYED_GAME', payload: game }),
    resetProgress: () => dispatch({ type: 'RESET_GAME_PROGRESS' }),
  };
}

export function useUIState() {
  const { state, dispatch } = useAppState();
  
  return {
    uiState: state.uiState,
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setCurrentGame: (game: string | null) => dispatch({ type: 'SET_CURRENT_GAME', payload: game }),
    toggleTutorial: () => dispatch({ type: 'TOGGLE_TUTORIAL' }),
    toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
  };
}
