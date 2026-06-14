'use client';

import { createContext, useContext, useState } from 'react';

const CursorContext = createContext({
  cursorType: 'default',
  cursorLabel: '',
  setCursorType: () => {},
  setCursorLabel: () => {},
});

export function CursorProvider({ children }) {
  const [cursorType, setCursorType] = useState('default');
  const [cursorLabel, setCursorLabel] = useState('');

  return (
    <CursorContext.Provider value={{ cursorType, cursorLabel, setCursorType, setCursorLabel }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
