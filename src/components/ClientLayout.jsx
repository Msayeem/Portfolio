'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CursorProvider } from '@/context/CursorContext';
import CustomCursor from './CustomCursor';
import BackgroundEffects from './BackgroundEffects';
import PageLoader from './PageLoader';

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CursorProvider>
      {/* Cinematic intro page loader */}
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {/* Ambient background particles & spotlights */}
      <BackgroundEffects />
      
      {/* Fade-in main portfolio contents after loader completes */}
      <div 
        className={`min-h-screen flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {children}
      </div>

      {/* Modern custom cursor */}
      <CustomCursor />
    </CursorProvider>
  );
}
