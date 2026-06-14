"use client";

import Image from "next/image";
import useScrollReveal from "../../hooks/useScrollReveal";
import useCursorFollower from "../../hooks/useCursorFollower";
import { motion } from "framer-motion";

export default function Technologies() {
  const { setPointer, setDefault } = useCursorFollower();

  // Scroll reveal animation for the section
  const sectionRef = useScrollReveal({ y: 50, opacity: 0, duration: 1.0 });

  const techs = [
    {
      name: "JavaScript",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/250px-Unofficial_JavaScript_logo_2.svg.png?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail",
    },
    {
      name: "React",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png",
    },
    {
      name: "Next.js",
      icon: "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
      invert: true,
    },
    {
      name: "Node.js",
      icon: "https://images.icon-icons.com/2415/PNG/512/nodejs_original_logo_icon_146411.png",
    },
    {
      name: "Express",
      icon: "https://www.peanutsquare.com/wp-content/uploads/2024/04/Express.png",
      invert: true,
    },
    {
      name: "MongoDB",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSITHn_TgjDyhdWvePNw0mveDrTUr00GLfv_Q&s",
    },
    {
      name: "Tailwind CSS",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s",
    },
    {
      name: "Git",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToe0l-0KLyx6JieGAzMvk4agH-sjPkWtNs9A&s",
    },
  ];

  // Divide into two groups for two separate rows moving in opposite directions
  const firstRowTechs = techs.slice(0, 4);
  const secondRowTechs = techs.slice(4);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 max-w-[1300px] mx-auto px-gutter overflow-hidden relative"
      id="technologies"
    >
      {/* Background glow behind header */}
      <div className="absolute w-[250px] h-[250px] rounded-full glow-orb-cyan top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0" />

      {/* Section Header */}
      <div className="text-center mb-20 select-none relative z-10">
        <h2 className="text-2xl sm:text-headline-lg font-headline-lg mb-3 text-white tracking-tight">
          Technologies
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mx-auto mb-4" />
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-[0.2em] font-bold">
          My Tech Stack
        </p>
      </div>

      {/* Infinite slider marquees */}
      <div className="relative w-full overflow-hidden py-4 select-none space-y-8 z-10">
        
        {/* Soft Left/Right Edge Blur Vignettes matching deep dark background */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-44 bg-gradient-to-r from-[#030303] via-[#030303]/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-44 bg-gradient-to-l from-[#030303] via-[#030303]/60 to-transparent z-20 pointer-events-none" />
        
        {/* Row 1: Moves Left */}
        <div className="marquee-track flex items-center">
          {/* Main Group */}
          {techs.map((tech, idx) => (
            <div key={`tech-r1-main-${idx}`} className="flex flex-col items-center gap-3 shrink-0">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_10px_25px_-10px_rgba(103,232,249,0.3)]"
                onMouseEnter={setPointer}
                onMouseLeave={setDefault}
              >
                <Image
                  alt={tech.name}
                  className={`w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform duration-500 hover:scale-110 ${tech.invert ? "invert" : ""}`}
                  src={tech.icon}
                  width={44}
                  height={44}
                />
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                {tech.name}
              </span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {techs.map((tech, idx) => (
            <div key={`tech-r1-dup-${idx}`} className="flex flex-col items-center gap-3 shrink-0">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_10px_25px_-10px_rgba(103,232,249,0.3)]"
                onMouseEnter={setPointer}
                onMouseLeave={setDefault}
              >
                <Image
                  alt={tech.name}
                  className={`w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform duration-500 hover:scale-110 ${tech.invert ? "invert" : ""}`}
                  src={tech.icon}
                  width={44}
                  height={44}
                />
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Moves Right */}
        <div className="marquee-track-reverse flex items-center">
          {/* Main Group (reversed order for visual variety) */}
          {[...techs].reverse().map((tech, idx) => (
            <div key={`tech-r2-main-${idx}`} className="flex flex-col items-center gap-3 shrink-0">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center backdrop-blur-md transition-all duration-500 hover:border-secondary/30 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_10px_25px_-10px_rgba(52,211,153,0.25)]"
                onMouseEnter={setPointer}
                onMouseLeave={setDefault}
              >
                <Image
                  alt={tech.name}
                  className={`w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform duration-500 hover:scale-110 ${tech.invert ? "invert" : ""}`}
                  src={tech.icon}
                  width={44}
                  height={44}
                />
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                {tech.name}
              </span>
            </div>
          ))}
          {/* Duplicate */}
          {[...techs].reverse().map((tech, idx) => (
            <div key={`tech-r2-dup-${idx}`} className="flex flex-col items-center gap-3 shrink-0">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center backdrop-blur-md transition-all duration-500 hover:border-secondary/30 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_10px_25px_-10px_rgba(52,211,153,0.25)]"
                onMouseEnter={setPointer}
                onMouseLeave={setDefault}
              >
                <Image
                  alt={tech.name}
                  className={`w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform duration-500 hover:scale-110 ${tech.invert ? "invert" : ""}`}
                  src={tech.icon}
                  width={44}
                  height={44}
                />
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
