'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PageLoader({ onComplete }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Lock scrollbars immediately on mount
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Fast, smooth loading simulation (takes about 1.2s total)
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // When counter hits 100, trigger exit after a short pause
  useEffect(() => {
    if (percent === 100) {
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [percent, onComplete]);

  const logoText = "{Sayem}";

  return (
    <motion.div
      initial={{ 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' 
      }}
      exit={{
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        transition: { 
          duration: 0.85, 
          ease: [0.86, 0, 0.07, 1], // Premium cinematic ease
        }
      }}
      onAnimationComplete={(definition) => {
        // Unlock scrollbars after exit animation finishes
        if (definition === 'exit' || (typeof definition === 'object' && definition.clipPath)) {
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }
      }}
      className="fixed inset-0 bg-[#050505] z-[99999] flex flex-col items-center justify-center select-none"
    >
      {/* Background ambient lighting in loader */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Cinematic staggered text reveal */}
      <div className="relative overflow-hidden mb-6 h-16 flex items-center justify-center">
        <div className="flex gap-0.5">
          {logoText.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 80, opacity: 0, rotate: 10 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Apple easeOutExpo
                delay: index * 0.05,
              }}
              className="text-4xl sm:text-5xl md:text-6xl font-black font-sans text-white drop-shadow-[0_0_30px_rgba(103,232,249,0.3)] tracking-tight"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-48 h-[2px] bg-white/5 relative overflow-hidden rounded-full mb-3">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary"
          style={{ width: `${percent}%` }}
          transition={{ ease: 'easeOut', duration: 0.1 }}
        />
      </div>

      {/* Counter Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="text-[11px] font-mono text-white tracking-[0.25em] uppercase font-bold"
      >
        Initializing / {percent}%
      </motion.div>
    </motion.div>
  );
}
