/**
 * ===============================================
 * Drawing Operations - פעולות ציור
 * ===============================================
 * 
 * מכיל את כל הפעולות הקשורות לציור ולקנבס
 */

import { useCallback } from 'react';
import { DrawingState } from '../../types/hebrew-letters';
import { DEFAULT_DRAWING_STATE } from '../../constants/hebrewLettersConstants';

export const useDrawingOperations = (
  drawingState: DrawingState,
  setDrawingState: React.Dispatch<React.SetStateAction<DrawingState>>
) => {
  
  // ========================================================================================
  // BASIC DRAWING STATE OPERATIONS
  // ========================================================================================
  
  const updateDrawingState = useCallback((updates: Partial<DrawingState>) => {
    setDrawingState(prev => ({ ...prev, ...updates }));
  }, [setDrawingState]);

  const clearCanvas = useCallback(() => {
    setDrawingState(prev => ({
      ...prev,
      paths: [],
      isDrawing: false
    }));
  }, [setDrawingState]);

  const saveCanvasState = useCallback((imageData: ImageData) => {
    setDrawingState(prev => ({
      ...prev,
      paths: [...prev.paths, imageData]
    }));
  }, [setDrawingState]);

  const undoLastAction = useCallback(() => {
    setDrawingState(prev => ({
      ...prev,
      paths: prev.paths.slice(0, -1)
    }));
  }, [setDrawingState]);

  // ========================================================================================
  // ADVANCED CANVAS OPERATIONS
  // ========================================================================================

  const initializeCanvas = useCallback((width: number, height: number, backgroundColor = '#ffffff') => {
    updateDrawingState({
      canvasWidth: width,
      canvasHeight: height,
      backgroundColor,
      paths: [],
      isDrawing: false,
      lastDrawPosition: null
    });
  }, [updateDrawingState]);

  const startDrawing = useCallback((x: number, y: number) => {
    updateDrawingState({
      isDrawing: true,
      lastDrawPosition: { x, y }
    });
  }, [updateDrawingState]);

  const continueDrawing = useCallback((x: number, y: number) => {
    if (!drawingState.isDrawing) return;
    updateDrawingState({
      lastDrawPosition: { x, y }
    });
  }, [drawingState.isDrawing, updateDrawingState]);

  const stopDrawing = useCallback(() => {
    updateDrawingState({
      isDrawing: false,
      lastDrawPosition: null
    });
  }, [updateDrawingState]);

  const downloadCanvas = useCallback(() => {
    // This would be implemented by the component using the context
    console.log('Download canvas functionality - to be implemented by component');
  }, []);

  const getCanvasPosition = useCallback((event: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      clientX = event.touches[0]?.clientX || 0;
      clientY = event.touches[0]?.clientY || 0;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }, []);

  const resetCanvas = useCallback(() => {
    setDrawingState(DEFAULT_DRAWING_STATE);
  }, [setDrawingState]);

  // ========================================================================================
  // DRAWING STYLE OPERATIONS
  // ========================================================================================

  const updateStrokeColor = useCallback((color: string) => {
    updateDrawingState({ currentStrokeColor: color });
  }, [updateDrawingState]);

  const updateStrokeWidth = useCallback((width: number) => {
    updateDrawingState({ currentStrokeWidth: width });
  }, [updateDrawingState]);

  const updateBackgroundColor = useCallback((color: string) => {
    updateDrawingState({ backgroundColor: color });
  }, [updateDrawingState]);

  return {
    // Basic operations
    updateDrawingState,
    clearCanvas,
    saveCanvasState,
    undoLastAction,
    
    // Canvas operations
    initializeCanvas,
    startDrawing,
    continueDrawing,
    stopDrawing,
    downloadCanvas,
    getCanvasPosition,
    resetCanvas,
    
    // Style operations
    updateStrokeColor,
    updateStrokeWidth,
    updateBackgroundColor
  };
};
