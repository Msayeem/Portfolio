"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useRef } from "react";
import gsap from "gsap";
import useScrollReveal from "../../hooks/useScrollReveal";
import useCursorFollower from "../../hooks/useCursorFollower";

// Component for a premium project card with 3D tilt and mouse spotlight
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const { setProject, setDefault, setPointer } = useCursorFollower();

  // Scroll reveal with a stagger delay
  const revealRef = useScrollReveal({
    y: 60,
    opacity: 0,
    duration: 1.0,
    delay: index * 0.15
  });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update glow coordinate css variables
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);

    // Calculate 3D tilt (max 6 degrees for smoother feel)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / (rect.height / 16);
    const rotateY = (x - centerX) / (rect.width / 16);

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1200,
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
      duration: 0.6
    });
  };

  const handleMouseEnter = () => {
    setProject("VIEW");
  };

  return (
    <div ref={revealRef} className="opacity-0 h-full transform-gpu">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="project-card glass-card rounded-2xl overflow-hidden group border border-white/5 bg-white/[0.015] backdrop-blur-xl relative transform-gpu flex flex-col h-full spotlight-border"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Spot border lighting overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at var(--x, 0px) var(--y, 0px), rgba(103, 232, 249, 0.08), transparent 85%)`
          }}
        />

        {/* Project Image Wrapper with Zoom & Glow */}
        <div 
          className="h-56 sm:h-72 overflow-hidden relative transform-gpu w-full bg-neutral-950 border-b border-white/5" 
          style={{ transform: 'translateZ(15px)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent z-10 pointer-events-none" />
          <Image
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            src={project.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div>

        {/* Content Details */}
        <div 
          className="p-8 flex flex-col flex-grow transform-gpu z-20" 
          style={{ transform: 'translateZ(10px)' }}
        >
          <h4 className="text-xl sm:text-2xl font-bold mb-4 text-white tracking-tight group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h4> 

          {/* Cleaned Tech Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag.label}
                className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${tag.bg} ${tag.text} ${tag.border} flex items-center gap-1.5`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${tag.dot}`}></span>
                {tag.label}
              </span>
            ))}
          </div>

          <p className="text-sm sm:text-[15px] text-gray-400 line-clamp-3 mb-8 leading-relaxed flex-grow">
            {project.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-auto">
            <Link
              href={project.github}
              className="bg-white hover:bg-slate-200 transition-all duration-300 px-6 py-2.5 text-black font-bold text-xs rounded-lg flex items-center gap-2 active:scale-95 shadow-md"
              onMouseEnter={setPointer}
              onMouseLeave={handleMouseEnter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-base" />
              <span>Github</span>
            </Link>
            
            <Link
              className="border border-cyan-500/20 hover:bg-cyan-500/5 hover:border-cyan-500/60 transition-all duration-300 text-cyan-400 font-bold text-xs px-6 py-2.5 rounded-lg flex items-center gap-1.5 active:scale-95"
              href={project.link}
              onMouseEnter={setPointer}
              onMouseLeave={handleMouseEnter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Demo</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const headerRef = useScrollReveal({ y: 30, opacity: 0 });

  const projects = [
    {
      title: "Sport-Nest",
      description:
        "Sport-Nest is a full-stack sports facility booking platform where users can discover, book, and manage sports venues — and facility owners can list and manage their own facilities.",
      image: "/sportnest.png",
      tags: [
        { label: "Next.js", bg: "bg-emerald-500/5", text: "text-emerald-400", border: "border-emerald-500/10", dot: "bg-emerald-400" },
        { label: "React", bg: "bg-cyan-500/5", text: "text-cyan-400", border: "border-cyan-500/10", dot: "bg-cyan-400" },
        { label: "Node.js", bg: "bg-green-500/5", text: "text-green-400", border: "border-green-500/10", dot: "bg-green-400" },
        { label: "Express.js", bg: "bg-neutral-500/5", text: "text-neutral-300", border: "border-neutral-500/10", dot: "bg-neutral-400" },
        { label: "MongoDB", bg: "bg-green-600/5", text: "text-green-500", border: "border-green-600/10", dot: "bg-green-500" },
        { label: "Tailwind CSS", bg: "bg-sky-500/5", text: "text-sky-400", border: "border-sky-500/10", dot: "bg-sky-400" },
      ],
      github: "https://github.com/Msayeem/Sport-Nest",
      link: "https://sport-nest-blue.vercel.app"
    },
    {
      title: "Mango Books",
      description:
        "A modern book borrowing platform with smart discovery and secure authentication.",
      image: "/mango.png",
      tags: [
        { label: "Next.js", bg: "bg-emerald-500/5", text: "text-emerald-400", border: "border-emerald-500/10", dot: "bg-emerald-400" },
        { label: "React", bg: "bg-cyan-500/5", text: "text-cyan-400", border: "border-cyan-500/10", dot: "bg-cyan-400" },
        { label: "Tailwind CSS", bg: "bg-sky-500/5", text: "text-sky-400", border: "border-sky-500/10", dot: "bg-sky-400" },
      ],
      github: "https://github.com/Msayeem/mango",
      link: "https://mango-swart-five.vercel.app"
    },
    {
      title: "Keen-keeper",
      description:
        "A personal connection tracker for staying in touch with the people that matter.",
      image: "/keenkeeper.png",
      tags: [
        { label: "Next.js", bg: "bg-emerald-500/5", text: "text-emerald-400", border: "border-emerald-500/10", dot: "bg-emerald-400" },
        { label: "React", bg: "bg-cyan-500/5", text: "text-cyan-400", border: "border-cyan-500/10", dot: "bg-cyan-400" },
        { label: "Tailwind CSS", bg: "bg-sky-500/5", text: "text-sky-400", border: "border-sky-500/10", dot: "bg-sky-400" },
      ],
      github: "https://github.com/Msayeem/Keen-keeper",
      link: "https://msayeem.github.io/Keen-keeper"
    },
    {
      title: "Digi-Tools",
      description:
        "A sleek marketplace connecting users with digital professionals.",
      image: "/digitools.png",
      tags: [
        { label: "React", bg: "bg-cyan-500/5", text: "text-cyan-400", border: "border-cyan-500/10", dot: "bg-cyan-400" },
        { label: "Tailwind CSS", bg: "bg-sky-500/5", text: "text-sky-400", border: "border-sky-500/10", dot: "bg-sky-400" },
      ],
      github: "https://github.com/Msayeem/Digi-Tools",
      link: "https://msayeem.github.io/Digi-Tools"
    },
  ];

  return (
    <section className="py-32 max-w-[1300px] mx-auto px-gutter relative" id="projects">
      {/* Background ambient gradient glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full glow-orb-cyan top-1/2 right-[-150px] pointer-events-none z-0" />

      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-20 select-none opacity-0 relative z-10">
        <h2 className="text-2xl sm:text-headline-lg font-headline-lg mb-3 text-white tracking-tight">Projects</h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mx-auto mb-4" />
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-[0.2em] font-bold">
          Featured Work
        </p>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="project-grid grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 relative z-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}