'use client';

import { useCursor } from '@/context/CursorContext';

export default function useCursorFollower() {
  const { cursorType, cursorLabel, setCursorType, setCursorLabel } = useCursor();

  const setPointer = () => setCursorType('pointer');
  
  const setProject = (label = 'View') => {
    setCursorType('project');
    setCursorLabel(label);
  };
  
  const setText = () => setCursorType('text');
  
  const setDefault = () => {
    setCursorType('default');
    setCursorLabel('');
  };

  return {
    cursorType,
    cursorLabel,
    setPointer,
    setProject,
    setText,
    setDefault,
    setCursorType,
    setCursorLabel,
  };
}
