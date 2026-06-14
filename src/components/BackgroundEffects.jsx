'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion for the particle simulation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    const particleCount = 25; // Keep count modest to preserve GPU performance

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : canvas.height + 10;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = -(Math.random() * 0.2 + 0.08); // slow upward drift
        this.opacity = Math.random() * 0.3 + 0.05;
        this.fadeSpeed = 0.002;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap or reset if particle goes offscreen
        if (this.x < 0 || this.x > canvas.width || this.y < -10) {
          this.reset(false);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 235, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      containerRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Premium SVG fractal noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Interactive Cursor Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(850px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(103, 232, 249, 0.07) 0%, rgba(52, 211, 153, 0.02) 50%, transparent 80%)`,
        }}
      />

      {/* Floating Ambient Glowing Blobs */}
      <div className="absolute w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-cyan-500/[0.035] blur-[130px] top-[-15%] left-[-15%] animate-[float-slow_25s_infinite_alternate]" />
      <div className="absolute w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-emerald-500/[0.025] blur-[110px] bottom-[-10%] right-[-10%] animate-[float-slow_20s_infinite_alternate_reverse]" />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
