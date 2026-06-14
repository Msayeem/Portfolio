'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '@/context/CursorContext';

export default function CustomCursor() {
  const { cursorType, cursorLabel } = useCursor();
  const [isMobile, setIsMobile] = useState(true);

  // Position values for the cursor
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring options for smooth follower effect
  const springConfig = { damping: 30, stiffness: 250, mass: 0.4 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect mobile/tablet to disable custom cursor
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Respect user prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (e) => setReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  if (isMobile || reducedMotion) return null;

  // Style configurations for morphing states
  const ringVariants = {
    default: {
      width: 28,
      height: 28,
      backgroundColor: 'rgba(103, 232, 249, 0)', 
      border: '1.5px solid rgba(103, 232, 249, 0.5)', // sleek primary outline
      borderRadius: '50%',
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(103, 232, 249, 0.15)',
      border: '1.5px solid rgba(103, 232, 249, 0.8)',
      borderRadius: '50%',
    },
    project: {
      width: 72,
      height: 72,
      backgroundColor: '#67e8f9', // solid brand primary cyan
      border: 'none',
      borderRadius: '50%',
    },
    text: {
      width: 8,
      height: 32,
      borderRadius: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      border: 'none',
    }
  };

  const dotVariants = {
    default: { scale: 1, opacity: 1 },
    pointer: { scale: 0, opacity: 0 },
    project: { scale: 0, opacity: 0 },
    text: { scale: 0, opacity: 0 },
  };

  const isText = cursorType === 'text';

  return (
    <>
      {/* Outer Spring Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 select-none"
        style={{
          x: ringX,
          y: ringY,
          mixBlendMode: isText ? 'difference' : (cursorType === 'project' ? 'normal' : 'difference'),
        }}
        animate={cursorType}
        variants={ringVariants}
        transition={{ type: 'spring', damping: 25, stiffness: 220, mass: 0.5 }}
      >
        {cursorType === 'project' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
            className="text-black text-[11px] font-bold font-mono tracking-wider"
          >
            {cursorLabel || 'VIEW'}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Direct Dot */}
      <motion.div
        className="fixed w-2.5 h-2.5 bg-secondary rounded-full top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={cursorType}
        variants={dotVariants}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
