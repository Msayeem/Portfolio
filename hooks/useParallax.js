'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function useParallax(speed = 0.1, type = 'scroll') {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion settings
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (type === 'scroll') {
      gsap.registerPlugin(ScrollTrigger);
      const yVal = speed * 150;
      
      const ctx = gsap.context(() => {
        gsap.fromTo(el,
          { y: -yVal },
          {
            y: yVal,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      });

      return () => ctx.revert();
    } else if (type === 'mouse') {
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        const yPercent = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1

        gsap.to(el, {
          x: xPercent * speed * 40,
          y: yPercent * speed * 40,
          duration: 0.6,
          ease: 'power1.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [speed, type]);

  return ref;
}
