'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const {
      y = 30,
      x = 0,
      opacity = 0,
      scale = 1,
      duration = 0.8,
      delay = 0,
      ease = 'power3.out',
      start = 'top 85%',
    } = options;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y, x, opacity, scale },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, [options]);

  return ref;
}
