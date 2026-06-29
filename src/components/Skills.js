"use client";

import { useRef } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import useCursorFollower from "../../hooks/useCursorFollower";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

// Animated skill card sub-component
function SkillCard({ num, title, skills, index }) {
  const { setPointer, setDefault } = useCursorFollower();
  const cardRef = useRef(null);
  
  // Reveal card with a slight stagger based on its index
  const revealRef = useScrollReveal({ 
    y: 50, 
    opacity: 0, 
    duration: 0.9, 
    delay: index * 0.15 
  });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);

    // Add subtle 3D tilt effect on hover
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / (rect.height / 18);
    const rotateY = (x - centerX) / (rect.width / 18);

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    setDefault();

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.5
    });
  };

  return (
    <div 
      ref={revealRef}
      className="opacity-0 h-full transform-gpu"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setPointer()}
        onMouseLeave={handleMouseLeave}
        className="glass-card p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.015] backdrop-blur-xl h-full relative overflow-hidden spotlight-border"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Spotlight overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(300px circle at var(--x, 0px) var(--y, 0px), rgba(103, 232, 249, 0.06), transparent 85%)`
          }}
        />

        {/* Numbered Category Badge */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <span className="font-mono text-xs font-bold text-primary tracking-widest">
            {num}
          </span>
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
            Expertise
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white tracking-tight relative z-10">
          {title}
        </h3>
        <div className="w-10 h-[1px] bg-gradient-to-r from-primary to-transparent mb-8 relative z-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
          {skills.map((skill, i) => (
            <motion.div 
              key={skill.name} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: "easeOut" }}
              className="flex items-center gap-3.5 transform-gpu hover:translate-x-1.5 transition-transform duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-primary/20 group-hover:bg-white/[0.06]">
                <Image 
                  src={skill.iconUrl} 
                  alt={`${skill.name} icon`}
                  className="w-5.5 h-5.5 object-contain" 
                  width={22}
                  height={22}
                  unoptimized
                />
              </div>
              <div>
                <p className="text-[14px] sm:text-base font-bold text-white transition-colors duration-300 group-hover:text-primary">{skill.name}</p>
                <p className=" text-[11px] text-on-surface-variant uppercase tracking-wider">
                  {skill.level}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  // Scroll reveal for the section header
  const headerRef = useScrollReveal({ y: 30, opacity: 0 });

  const frontendSkills = [
    { name: "HTML5", level: "Expert", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "NextJS", level: "Intermediate", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Tailwind Css", level: "Intermediate", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "JavaScript", level: "Intermediate", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "ReactJS", level: "Intermediate", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  ];

  const backendSkills = [
    { name: "NodeJS", level: "Intermediate", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "ExpressJS", level: "Intermediate", iconUrl: "https://www.peanutsquare.com/wp-content/uploads/2024/04/Express.png" },
    { name: "MongoDB", level: "Intermediate", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  ];

  return (
    <section className="py-32 max-w-[1300px] mx-auto px-gutter relative overflow-hidden" id="skills">
      {/* Background ambient light */}
      <div className="absolute w-[300px] h-[300px] rounded-full glow-orb-emerald bottom-0 left-[-50px] pointer-events-none z-0" />

      <div ref={headerRef} className="text-center mb-20 select-none opacity-0 relative z-10">
        <h2 className="text-2xl sm:text-headline-lg font-headline-lg mb-3 text-white tracking-tight">Skills</h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mx-auto mb-4" />
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-[0.2em] font-bold">
          My Technical Level
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        <SkillCard num="01 / FRONTEND" title="Frontend Development" skills={frontendSkills} index={0} />
        <SkillCard num="02 / BACKEND" title="Backend Development" skills={backendSkills} index={1} />
      </div>
    </section>
  );
}